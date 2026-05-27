import { Link } from 'react-router-dom';
import SimplePage from './SimplePage';

export function ImpressumPage() {
  return (
    <SimplePage
      title="Impressum"
      intro="Angaben gemäß § 5 TMG für das Jugendforum Grafing."
      sections={[
        { title: 'Anbieter', content: <p>Jugendforum Grafing, Rathausplatz 1, 85567 Grafing b. München.</p> },
        { title: 'Kontakt', content: <p>E-Mail: info@jufo-grafing.de · Instagram: @jufo.grafing</p> },
        { title: 'Verantwortlich für Inhalte', content: <p>Vorstand Jugendforum Grafing.</p> },
      ]}
    />
  );
}

export function DatenschutzPage() {
  return (
    <SimplePage
      title="Datenschutz"
      intro="Wir verarbeiten personenbezogene Daten sparsam und zweckgebunden."
      sections={[
        { title: 'Welche Daten', content: <p>Kontaktanfragen, freiwillige Formularangaben und technisch notwendige Nutzungsdaten.</p> },
        { title: 'Wofür', content: <p>Zur Kommunikation, Organisation von Aktionen und sicheren Bereitstellung der Website.</p> },
        { title: 'Deine Rechte', content: <p>Auskunft, Berichtigung, Löschung und Widerspruch. Kontakt: datenschutz@jufo-grafing.de.</p> },
      ]}
    />
  );
}

export function BarrierefreiheitPage() {
  return (
    <SimplePage
      title="Barrierefreiheitserklärung"
      intro="Wir möchten die Website für alle Menschen nutzbar machen."
      sections={[
        { title: 'Stand der Vereinbarkeit', content: <p>Diese Website ist teilweise mit den Anforderungen der BITV vereinbar.</p> },
        { title: 'Bekannte Hürden', content: <p>Einzelne Kontraste, Alt-Texte und Tastaturnavigation werden laufend verbessert.</p> },
        { title: 'Feedback', content: <p>Melde Barrieren an: barrierefreiheit@jufo-grafing.de.</p> },
      ]}
    />
  );
}

export function FAQPage() {
  return (
    <SimplePage
      title="FAQ"
      intro="Die häufigsten Fragen rund um das Jugendforum."
      sections={[
        { title: 'Wie kann ich mitmachen?', content: <p>Über die Seite <Link className="underline" to="/mitmachen">Mitmachen</Link> oder per DM auf Instagram.</p> },
        { title: 'Kostet Mitmachen etwas?', content: <p>Nein, die Teilnahme ist kostenlos.</p> },
        { title: 'Wer darf teilnehmen?', content: <p>Alle jungen Menschen aus Grafing und Umgebung.</p> },
      ]}
    />
  );
}

export function TerminePage() {
  return (
    <SimplePage
      title="Termine & Kalender"
      intro="Alle anstehenden Treffen, Aktionen und Deadlines im Überblick."
      sections={[
        { title: 'Nächste Termine', content: <p>Monatliches Plenum, AG-Treffen und Projekt-Workshops.</p> },
        { title: 'Kalender-Abo', content: <p>iCal-Link folgt. Bis dahin veröffentlichen wir Termine zusätzlich auf Instagram.</p> },
      ]}
    />
  );
}

export function TeamPage() {
  return (
    <SimplePage
      title="Team & Ansprechpersonen"
      intro="Hier findest du die aktuellen Ansprechpartner:innen des Jugendforums."
      sections={[
        { title: 'Koordination', content: <p>Vorstandsteam Jugendforum Grafing · kontakt@jufo-grafing.de</p> },
        { title: 'Arbeitsgruppen', content: <p>Aktionen, Kommunikation, Schule & Stadtentwicklung.</p> },
      ]}
    />
  );
}

export function ProtokollePage() {
  return (
    <SimplePage
      title="Protokolle & Transparenz"
      intro="Wir dokumentieren Entscheidungen nachvollziehbar und offen."
      sections={[
        { title: 'Sitzungsprotokolle', content: <p>Protokolle der Plena werden nach Freigabe veröffentlicht.</p> },
        { title: 'Beschlüsse', content: <p>Wichtige Beschlüsse und Projektstände werden fortlaufend ergänzt.</p> },
      ]}
    />
  );
}

export function PartnerPage() {
  return (
    <SimplePage
      title="Partner & Sponsoren"
      intro="Danke an alle, die unsere Projekte ideell, finanziell oder mit Know-how unterstützen."
      sections={[
        { title: 'Partner', content: <p>Stadt Grafing, lokale Vereine und Bildungseinrichtungen.</p> },
        { title: 'Sponsoring', content: <p>Interesse an einer Zusammenarbeit? Schreib an sponsoring@jufo-grafing.de.</p> },
      ]}
    />
  );
}

export function ContentRoadmapPage() {
  return (
    <SimplePage
      title="Content-Roadmap"
      intro="Diese Übersicht zeigt, welche Inhalte statisch bleiben und welche im CMS gepflegt werden."
      sections={[
        {
          title: 'Statisch (selten geändert)',
          content: (
            <ul className="list-disc pl-5 space-y-1">
              <li>Impressum, Datenschutz, Barrierefreiheitserklärung</li>
              <li>Grundlegende FAQ (Organisation, Teilnahme, Kontaktwege)</li>
              <li>Rechtelinks und feste Kontaktinfos im Footer</li>
            </ul>
          ),
        },
        {
          title: 'CMS-gepflegt (laufend aktualisiert)',
          content: (
            <ul className="list-disc pl-5 space-y-1">
              <li>Termine/Kalender-Einträge</li>
              <li>Team/Ansprechpersonen inklusive Rollen</li>
              <li>Protokolle, Beschlüsse und Transparenz-Updates</li>
              <li>Partner/Sponsoren inklusive Logos und Kurzprofilen</li>
            </ul>
          ),
        },
      ]}
    />
  );
}
