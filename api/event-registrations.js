import { getPool } from './db.js';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Nur POST ist erlaubt.' });
  }

  const { eventId, name, email, message } = req.body ?? {};

  if (!eventId || !name || !email) {
    return res.status(400).json({ message: 'Bitte eventId, Name und E-Mail angeben.' });
  }

  if (typeof eventId !== 'string' || typeof name !== 'string' || typeof email !== 'string') {
    return res.status(400).json({ message: 'Ungültige Datentypen in der Anfrage.' });
  }

  const normalizedEmail = email.trim().toLowerCase();
  if (!isValidEmail(normalizedEmail)) {
    return res.status(400).json({ message: 'Bitte gib eine gültige E-Mail-Adresse ein.' });
  }

  try {
    const pool = getPool();
    const eventCheck = await pool.query('SELECT id FROM events WHERE id = $1 LIMIT 1', [eventId]);

    if (eventCheck.rowCount === 0) {
      return res.status(404).json({ message: 'Das angegebene Event wurde nicht gefunden.' });
    }

    const insert = await pool.query(
      `INSERT INTO event_registrations (event_id, name, email, message, status)
       VALUES ($1, $2, $3, $4, 'confirmed')
       RETURNING id`,
      [eventId, name.trim(), normalizedEmail, message?.trim() || null],
    );

    return res.status(201).json({
      message: 'Anmeldung erfolgreich gespeichert.',
      registrationId: insert.rows[0].id,
    });
  } catch (error) {
    if (error && error.code === '23505') {
      return res.status(409).json({
        message: 'Du bist für dieses Event mit dieser E-Mail bereits angemeldet.',
      });
    }

    return res.status(500).json({ message: 'Interner Serverfehler bei der Anmeldung.' });
  }
}
