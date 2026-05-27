import { createHash, randomUUID } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { ApplicationInput, ApplicationRecord, ApplicationStatus } from '../types/application';

const APPLICATION_FILE = path.join(process.cwd(), '.data', 'applications.json');

type ValidationResult =
  | { success: true; data: ApplicationInput }
  | { success: false; errors: string[] };

const isNonEmptyString = (value: unknown, min = 1, max = 2000): value is string =>
  typeof value === 'string' && value.trim().length >= min && value.trim().length <= max;

export const validateApplicationPayload = (payload: unknown): ValidationResult => {
  const errors: string[] = [];

  if (typeof payload !== 'object' || payload === null) {
    return { success: false, errors: ['Ungültiger Request-Body.'] };
  }

  const data = payload as Record<string, unknown>;

  if (!isNonEmptyString(data.vorname, 2, 80)) errors.push('Vorname muss zwischen 2 und 80 Zeichen lang sein.');
  if (!isNonEmptyString(data.nachname, 2, 80)) errors.push('Nachname muss zwischen 2 und 80 Zeichen lang sein.');

  const email = typeof data.email === 'string' ? data.email.trim() : '';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) {
    errors.push('E-Mail-Adresse ist ungültig.');
  }

  const alter = typeof data.alter === 'string' ? Number.parseInt(data.alter, 10) : Number.NaN;
  if (Number.isNaN(alter) || alter < 13 || alter > 25) {
    errors.push('Alter muss zwischen 13 und 25 liegen.');
  }

  if (!isNonEmptyString(data.wohnort, 2, 120)) errors.push('Wohnort muss zwischen 2 und 120 Zeichen lang sein.');
  if (!isNonEmptyString(data.motivation, 20, 4000)) errors.push('Motivation muss mindestens 20 Zeichen enthalten.');
  if (data.consent !== true) errors.push('Datenschutzeinwilligung ist erforderlich.');

  if (errors.length > 0) return { success: false, errors };

  return {
    success: true,
    data: {
      vorname: (data.vorname as string).trim(),
      nachname: (data.nachname as string).trim(),
      email,
      alter: String(alter),
      wohnort: (data.wohnort as string).trim(),
      motivation: (data.motivation as string).trim(),
      consent: true,
    },
  };
};

const ensureDataDir = async () => {
  await fs.mkdir(path.dirname(APPLICATION_FILE), { recursive: true });
};

const readApplications = async (): Promise<ApplicationRecord[]> => {
  try {
    const raw = await fs.readFile(APPLICATION_FILE, 'utf-8');
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as ApplicationRecord[]) : [];
  } catch {
    return [];
  }
};

const writeApplications = async (applications: ApplicationRecord[]) => {
  await ensureDataDir();
  await fs.writeFile(APPLICATION_FILE, JSON.stringify(applications, null, 2), 'utf-8');
};

export const createApplication = async (
  input: ApplicationInput,
  ipAddress: string,
  status: ApplicationStatus = 'new'
): Promise<ApplicationRecord> => {
  const nowIso = new Date().toISOString();
  const ip_hash = createHash('sha256').update(ipAddress || 'unknown').digest('hex');

  const record: ApplicationRecord = {
    id: randomUUID(),
    created_at: nowIso,
    consent_timestamp: nowIso,
    ip_hash,
    status,
    ...input,
  };

  const applications = await readApplications();
  applications.push(record);
  await writeApplications(applications);

  return record;
};

export const listApplications = async (status?: ApplicationStatus): Promise<ApplicationRecord[]> => {
  const applications = await readApplications();
  return status ? applications.filter((application) => application.status === status) : applications;
};
