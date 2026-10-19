<div align="center">

# 🐻 JUFO-Web — Jugendforum Grafing

**Offizielle Full-Stack-Webplattform & digitales Vereinsportal für das Jugendforum Grafing**

[![React 18](https://img.shields.io/badge/React_18-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite 6](https://img.shields.io/badge/Vite_6-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Vercel](https://img.shields.io/badge/Vercel_Serverless-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com/)

</div>

---

## 🎯 Überblick

**JUFO-Web** ist die zentrale Webanwendung für das **Jugendforum Grafing**. Sie verbindet eine moderne, barrierearme öffentliche Vereins-Website mit Serverless-API-Endpunkten (PostgreSQL + Resend) sowie einem geschützten Admin-Bereich für Event-Anmeldungen, Redaktionsbeiträge und Turnierplanung.

### ✨ Kernfunktionen

- **📅 Aktionen & Event-Anmeldung:** Übersicht aktueller Jugendforum-Veranstaltungen mit direkter Online-Anmeldung, dynamischer Restplatzberechnung und Dublettenprüfung (`POST /api/event-registrations`).
- **🤝 Mitmachen & Mitgliedsanträge:** Mehrstufiges Bewerbungsformular mit serverseitiger Validierung, DSGVO-Consent-Protokollierung (gehashter IP-Nachweis) und geschütztem Admin-Abruf (`GET / POST /api/applications`).
- **📬 Kontaktformular mit Spam- & Rate-Limit-Schutz:** Integrierter Honeypot, IP-basiertes Rate-Limiting, Persistierung in PostgreSQL und automatische E-Mail-Benachrichtigung über die **Resend API** (`POST /api/contact`).
- **🖼️ Kategorisierte Mediengalerie & News-System:** Filterbare Galerie mit Lightbox-Ansicht sowie ein Redaktionssystem für Neuigkeiten und Rückblicke.
- **🛠️ Admin-Bereich & Turnierplaner:** Verwaltung von Anmeldungen (inkl. CSV-/JSON-Export), Beitrags-CRUD sowie automatische Team- und Spielplan-Generierung (Single-Elimination & Gruppenphase).

---

## 🏗️ Projektstruktur

```text
JUFO-Web/
├── api/                         # Vercel Serverless API Functions (Node.js / TypeScript)
│   ├── applications.ts          # Mitgliedsanträge (POST öffentlich, GET mit Admin-Bearer-Token)
│   ├── contact.ts               # Kontaktformular mit Rate-Limiting, Honeypot & Resend-Mail
│   ├── event-registrations.js   # Event-Anmeldungen mit Kapazitäts- & Dublettenprüfung
│   └── db.js                    # PostgreSQL Connection Pool (pg) mit TLS-Konfiguration
├── db/migrations/               # SQL-Schemata für Events, Kontaktanfragen & Bewerbungen
├── src/
│   ├── components/              # Wiederverwendbare UI- & Layout-Komponenten (Navbar, Footer, Cards)
│   ├── features/                # Feature-Module (landing, aktionen, galerie, news, mitmachen, kontakt, admin)
│   ├── data/                    # Statische Initialdaten & Content-Modelle
│   ├── server/                  # Geteilte Validierungslogik für API-Payloads
│   └── types/                   # TypeScript-Domänentypen
└── vercel.json                  # Routing- & Deployment-Konfiguration
```

---

## 🚀 Lokale Entwicklung & Setup

### 1. Abhängigkeiten installieren

```bash
npm install
```

### 2. Umgebungsvariablen konfigurieren

Erstelle eine `.env.local`-Datei im Projektwurzelverzeichnis:

```dotenv
DATABASE_URL="postgresql://user:password@localhost:5432/jufo"
ADMIN_API_TOKEN="dein-sicheres-admin-token"
RESEND_API_KEY="re_..."
CONTACT_TEAM_EMAIL="team@jugendforum-grafing.de"
CONTACT_FROM_EMAIL="Kontaktformular <noreply@jugendforum-grafing.de>"
```

### 3. Datenbank-Migrationen einspielen

```bash
psql "$DATABASE_URL" -f db/migrations/001_event_registrations.sql
psql "$DATABASE_URL" -f db/migrations/002_contact_requests.sql
psql "$DATABASE_URL" -f db/migrations/003_applications.sql
```

### 4. Entwicklungsserver starten

```bash
npm run dev
```

Für einen Produktions-Build inklusive TypeScript-Prüfung:

```bash
npm run build
npm run lint
```

---

## 🔒 Sicherheit & Datenschutz

- **Authentifizierung:** Der Abruf gespeicherter Bewerbungen (`GET /api/applications`) ist durch ein Bearer-Token (`ADMIN_API_TOKEN`) mit konstant-zeitlichem Vergleich (`crypto.timingSafeEqual`) geschützt.
- **DSGVO-Sparsamkeit:** IP-Adressen bei Formularen werden ausschließlich als SHA-256-Hash zur Missbrauchsprävention und Einwilligungsdokumentation gespeichert.
- **Datenbanksicherheit:** Alle Datenbankabfragen nutzen parametrisierte SQL-Statements (`$1, $2, ...`) über `pg.Pool` sowie erzwungene TLS-Zertifikatsprüfung in Produktionsumgebungen.
