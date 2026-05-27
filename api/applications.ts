import { isApplicationStatus } from '../src/types/application';
import { createHash, randomUUID } from 'node:crypto';
import { getPool } from './db.js';
import { validateApplicationPayload } from '../src/server/applications';
import type { ApplicationInput, ApplicationStatus } from '../src/types/application';

type ApiRequest = {
  method?: string;
  body?: unknown;
  query?: Record<string, string | string[] | undefined>;
  headers: Record<string, string | string[] | undefined>;
  socket?: { remoteAddress?: string };
};

type ApiResponse = {
  status: (statusCode: number) => ApiResponse;
  json: (payload: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

const getIpAddress = (req: ApiRequest) => {
  const forwarded = req.headers['x-forwarded-for'];
  if (Array.isArray(forwarded)) return forwarded[0];
  if (typeof forwarded === 'string') return forwarded.split(',')[0]?.trim() ?? '';
  return req.socket?.remoteAddress ?? '';
};

const ensureApplicationsTable = async () => {
  await getPool().query(`
    CREATE TABLE IF NOT EXISTS applications (
      id UUID PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      consent_timestamp TIMESTAMPTZ NOT NULL,
      ip_hash TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new',
      vorname TEXT NOT NULL,
      nachname TEXT NOT NULL,
      email TEXT NOT NULL,
      alter TEXT NOT NULL,
      wohnort TEXT NOT NULL,
      motivation TEXT NOT NULL,
      consent BOOLEAN NOT NULL DEFAULT TRUE
    )
  `);
};

const createApplication = async (input: ApplicationInput, ipAddress: string, status: ApplicationStatus = 'new') => {
  await ensureApplicationsTable();

  const id = randomUUID();
  const nowIso = new Date().toISOString();
  const ipHash = createHash('sha256').update(ipAddress || 'unknown').digest('hex');

  await getPool().query(
    `INSERT INTO applications (
       id, created_at, consent_timestamp, ip_hash, status,
       vorname, nachname, email, alter, wohnort, motivation, consent
     )
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
    [
      id,
      nowIso,
      nowIso,
      ipHash,
      status,
      input.vorname,
      input.nachname,
      input.email,
      input.alter,
      input.wohnort,
      input.motivation,
      input.consent,
    ],
  );

  return { id };
};

const listApplications = async (status?: ApplicationStatus) => {
  await ensureApplicationsTable();

  const result = await getPool().query(
    `SELECT id, created_at, consent_timestamp, ip_hash, status,
            vorname, nachname, email, alter, wohnort, motivation, consent
       FROM applications
      WHERE ($1::text IS NULL OR status = $1)
      ORDER BY created_at DESC`,
    [status ?? null],
  );

  return result.rows;
};

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method === 'POST') {
    const validation = validateApplicationPayload(req.body);

    if (!validation.success) {
      return res.status(400).json({ message: 'Validierung fehlgeschlagen.', errors: validation.errors });
    }

    const created = await createApplication(validation.data, getIpAddress(req));
    return res.status(201).json({ message: 'Bewerbung erfolgreich gespeichert.', id: created.id });
  }

  if (req.method === 'GET') {
    const statusRaw = req.query?.status;
    const statusParam = typeof statusRaw === 'string' ? statusRaw : undefined;

    if (statusParam && !isApplicationStatus(statusParam)) {
      return res.status(400).json({
        message: 'Ungültiger Status-Filter.',
        allowed: ['new', 'in_review', 'accepted', 'rejected'],
      });
    }

    const applications = await listApplications(statusParam);
    return res.status(200).json({ applications, count: applications.length, filter: { status: statusParam ?? null } });
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ message: 'Methode nicht erlaubt.' });
}
