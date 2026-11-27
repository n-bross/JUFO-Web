/**
 * Zentrale Angaben für Impressum und Datenschutzerklärung.
 *
 * ⚠️ Vor dem Livegang ALLE {{…}}-Platzhalter ersetzen.
 *    Prüfen mit: npm run check:legal
 *
 * Die Website wird von einer Privatperson ehrenamtlich für das
 * Jugendforum Grafing betrieben (kein Verein, kein Gewerbe, keine USt-ID).
 */
export const operator = {
  name: '{{IMPRESSUM_NAME}}',
  strasse: '{{IMPRESSUM_STRASSE}}',
  plzOrt: '{{IMPRESSUM_PLZ_ORT}}',
  email: '{{IMPRESSUM_EMAIL}}',
  /** Optional. Auf `null` setzen, um die Telefonnummer überall auszublenden. */
  telefon: '{{IMPRESSUM_TELEFON}}' as string | null,
};

/**
 * Technische Angaben für die Datenschutzerklärung, die sich nicht aus dem Code
 * ablesen lassen (DATABASE_URL ist eine generische PostgreSQL-Verbindung).
 */
export const privacyConfig = {
  /** Anbieter + Serverregion der PostgreSQL-Datenbank, z. B. "Neon Inc., USA (Region AWS eu-central-1, Frankfurt)". */
  datenbankAnbieter: '{{DATENBANK_ANBIETER}}',
  /**
   * Ob Kontaktanfragen zusätzlich per E-Mail über Resend zugestellt werden
   * (nur aktiv, wenn RESEND_API_KEY und CONTACT_TEAM_EMAIL in Vercel gesetzt sind).
   */
  kontaktMailUeberResend: true,
};

export const LEGAL_STAND = 'November 2026';
