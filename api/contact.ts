import { DatabaseSync } from 'node:sqlite';

type ContactBody = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  honeypot?: string;
};

type ApiRequest = {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  socket?: { remoteAddress?: string };
  body?: ContactBody;
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (payload: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

const db = new DatabaseSync(process.env.CONTACT_DB_PATH ?? './contact.sqlite');

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = Number(process.env.CONTACT_RATE_LIMIT_MAX ?? 5);
const RATE_LIMIT_WINDOW_MS = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MS ?? 10 * 60 * 1000);

function getClientIp(req: ApiRequest): string {
  const forwardedFor = req.headers['x-forwarded-for'];
  if (typeof forwardedFor === 'string' && forwardedFor.length > 0) {
    return forwardedFor.split(',')[0].trim();
  }
  return req.socket?.remoteAddress ?? 'unknown';
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const existing = rateLimitStore.get(ip);

  if (!existing || now > existing.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (existing.count >= RATE_LIMIT_MAX) {
    return false;
  }

  existing.count += 1;
  rateLimitStore.set(ip, existing);
  return true;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function ensureTable(): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS contact_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new'
    )
  `);
}

async function sendNotificationEmail(payload: Required<Omit<ContactBody, 'honeypot'>>): Promise<void> {
  const resendApiKey = process.env.RESEND_API_KEY;
  const teamEmail = process.env.CONTACT_TEAM_EMAIL;

  if (!resendApiKey || !teamEmail) {
    return;
  }

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? 'Kontaktformular <onboarding@resend.dev>',
      to: [teamEmail],
      subject: `[Kontaktformular] ${payload.subject}`,
      text: `Neue Kontaktanfrage\n\nName: ${payload.name}\nE-Mail: ${payload.email}\nBetreff: ${payload.subject}\n\nNachricht:\n${payload.message}`,
    }),
  });
}

export default async function handler(req: ApiRequest, res: ApiResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const ip = getClientIp(req);
  if (!checkRateLimit(ip)) {
    res.status(429).json({ error: 'Zu viele Anfragen. Bitte versuche es später erneut.' });
    return;
  }

  const body = (req.body ?? {}) as ContactBody;
  const name = body.name?.trim() ?? '';
  const email = body.email?.trim() ?? '';
  const subject = body.subject?.trim() ?? '';
  const message = body.message?.trim() ?? '';
  const honeypot = body.honeypot?.trim() ?? '';

  if (honeypot.length > 0) {
    res.status(200).json({ ok: true });
    return;
  }

  if (!name || !email || !subject || !message) {
    res.status(400).json({ error: 'Bitte fülle alle Pflichtfelder aus.' });
    return;
  }

  if (!isValidEmail(email)) {
    res.status(400).json({ error: 'Bitte gib eine gültige E-Mail-Adresse ein.' });
    return;
  }

  if (name.length > 120 || email.length > 254 || subject.length > 200 || message.length > 5000) {
    res.status(400).json({ error: 'Eine oder mehrere Eingaben sind zu lang.' });
    return;
  }

  try {
    ensureTable();

    const stmt = db.prepare(
      'INSERT INTO contact_requests (name, email, subject, message, status) VALUES (?, ?, ?, ?, ?)',
    );
    stmt.run(name, email, subject, message, 'new');

    await sendNotificationEmail({ name, email, subject, message });

    res.status(201).json({ ok: true, message: 'Nachricht erfolgreich gesendet.' });
  } catch (error) {
    console.error('contact api error', error);
    res.status(500).json({ error: 'Interner Fehler beim Speichern der Anfrage.' });
  }
}
