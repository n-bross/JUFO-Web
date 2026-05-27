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
);

CREATE INDEX IF NOT EXISTS idx_applications_status_created_at
  ON applications(status, created_at DESC);
