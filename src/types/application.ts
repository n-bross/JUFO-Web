export const applicationStatuses = ['new', 'in_review', 'accepted', 'rejected'] as const;

export type ApplicationStatus = (typeof applicationStatuses)[number];

export type ApplicationInput = {
  vorname: string;
  nachname: string;
  email: string;
  alter: string;
  wohnort: string;
  motivation: string;
  consent: boolean;
};

export type ApplicationRecord = ApplicationInput & {
  id: string;
  created_at: string;
  consent_timestamp: string;
  ip_hash: string;
  status: ApplicationStatus;
};

export const isApplicationStatus = (value: unknown): value is ApplicationStatus =>
  typeof value === 'string' && applicationStatuses.includes(value as ApplicationStatus);
