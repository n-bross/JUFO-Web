import { Link } from 'react-router-dom';
import SimplePage from '@/features/info/SimplePage';
import { LEGAL_STAND, privacyConfig } from '@/legal/operator';
import { OperatorAddress, OperatorContact } from './ImpressumPage';

const List = ({ items }: { items: React.ReactNode[] }) => (
  <ul className="list-disc pl-5 space-y-1">
    {items.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
);


const processorDb = `${privacyConfig.datenbankAnbieter} (Datenbank-Hosting)`;

export default function DatenschutzPage() {
  return (
    <SimplePage
      title="Datenschutzerklärung"
      intro="Hier erfährst du, welche personenbezogenen Daten beim Besuch dieser Website verarbeitet werden, wofür und welche Rechte du hast."
      sections={[
        {
          title: '1. Verantwortlicher',
          content: (
            <div className="space-y-2">
              <p>Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der DSGVO ist:</p>
              <OperatorAddress />
              <OperatorContact />
              <p>
                Die Website wird privat und ehrenamtlich für das Jugendforum Grafing betrieben. Ein Datenschutzbeauftragter
                ist nicht benannt, da hierfür keine gesetzliche Pflicht besteht.
              </p>
            </div>
          ),
        },
        {
          title: '2. Hosting und Server-Logfiles',
          content: (
            <div className="space-y-2">
              <p>
                Diese Website und ihre Serverfunktionen (Formularverarbeitung) werden bei der Vercel Inc., 440 N Barranca
                Ave #4133, Covina, CA 91723, USA gehostet. Beim Aufruf der Website verarbeitet Vercel automatisch technisch
                notwendige Daten in Server-Logfiles:
              </p>
              <List
                items={[
                  'IP-Adresse des anfragenden Geräts',
                  'Datum und Uhrzeit des Zugriffs',
                  'aufgerufene Seite bzw. Datei und HTTP-Statuscode',
                  'Browser, Betriebssystem (User-Agent) und ggf. die zuvor besuchte Seite (Referrer)',
                ]}
              />
              <p>
                Zweck ist die sichere und stabile Auslieferung der Website sowie die Abwehr von Angriffen. Rechtsgrundlage ist
                Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren Betrieb). Vercel ist als
                Auftragsverarbeiter tätig (Art. 28 DSGVO). Dabei können Daten in die USA übermittelt werden; Vercel ist
                unter dem EU-US Data Privacy Framework zertifiziert (Angemessenheitsbeschluss der EU-Kommission, Art. 45
                DSGVO). Die Logfiles werden von Vercel nur für einen begrenzten Zeitraum gespeichert und danach automatisch
                gelöscht.
              </p>
            </div>
          ),
        },
        {
          title: '3. Kontaktformular',
          content: (
            <div className="space-y-2">
              <p>
                Wenn du uns über das <Link className="underline underline-offset-4" to="/kontakt">Kontaktformular</Link>{' '}
                schreibst, verarbeiten wir folgende Angaben: Name, E-Mail-Adresse, Betreff und Nachricht sowie den
                Zeitpunkt der Anfrage.
              </p>
              <List
                items={[
                  <>
                    <strong>Zweck:</strong> Bearbeitung und Beantwortung deiner Anfrage.
                  </>,
                  <>
                    <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse, Anfragen zu
                    beantworten) bzw. Art. 6 Abs. 1 lit. b DSGVO, wenn deine Anfrage auf eine Teilnahme oder Mitarbeit
                    abzielt.
                  </>,
                  <>
                    <strong>Missbrauchsschutz:</strong> Zum Schutz vor Spam wird deine IP-Adresse kurzzeitig im
                    Arbeitsspeicher der Serverfunktion gezählt (max. 10 Minuten, keine dauerhafte Speicherung); Rechtsgrundlage
                    Art. 6 Abs. 1 lit. f DSGVO.
                  </>,
                  <>
                    <strong>Empfänger / Auftragsverarbeiter:</strong> Vercel (Hosting, s. o.), {processorDb}
                    {privacyConfig.kontaktMailUeberResend ? (
                      <>
                        {' '}
                        sowie Resend, Inc. (USA) für die Zustellung einer
                        Benachrichtigungs-E-Mail mit dem Inhalt deiner Anfrage an das Team. Die Übermittlung in die USA
                        erfolgt auf Grundlage des EU-US Data Privacy Framework bzw. von EU-Standardvertragsklauseln
                        (Art. 46 DSGVO)
                      </>
                    ) : null}
                    .
                  </>,
                  <>
                    <strong>Speicherdauer:</strong> Wir löschen deine Anfrage, sobald sie abschließend bearbeitet ist,
                    spätestens nach 6 Monaten, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
                  </>,
                ]}
              />
            </div>
          ),
        },
        {
          title: '4. Bewerbung zum Mitmachen',
          content: (
            <div className="space-y-2">
              <p>
                Über das Formular auf der Seite <Link className="underline underline-offset-4" to="/mitmachen">Mitmachen</Link>{' '}
                kannst du dich für eine Mitarbeit im Jugendforum bewerben. Wir verarbeiten: Vorname, Nachname,
                E-Mail-Adresse, Alter, Wohnort, deine Motivation, deine Einwilligung mit Zeitstempel sowie einen
                SHA-256-Hashwert deiner IP-Adresse als Nachweis der Einwilligung und zum Schutz vor Missbrauch.
              </p>
              <List
                items={[
                  <>
                    <strong>Zweck:</strong> Prüfung deiner Bewerbung, Kontaktaufnahme und Organisation deiner Mitwirkung.
                  </>,
                  <>
                    <strong>Rechtsgrundlage:</strong> deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sowie Art. 6 Abs. 1
                    lit. b DSGVO (Durchführung vorvertraglicher Maßnahmen auf deine Anfrage). Für den IP-Hash: Art. 6 Abs. 1
                    lit. f DSGVO (Nachweis der Einwilligung, Missbrauchsschutz).
                  </>,
                  <>
                    <strong>Empfänger / Auftragsverarbeiter:</strong> Vercel (Hosting, s. o.), {processorDb}. Innerhalb des
                    Jugendforums haben nur die Personen Zugriff, die Bewerbungen bearbeiten.
                  </>,
                  <>
                    <strong>Speicherdauer:</strong> Bei einer Absage bzw. wenn du nicht mitmachst, löschen wir deine Daten
                    spätestens 6 Monate nach Abschluss des Verfahrens. Wenn du mitmachst, speichern wir sie für die Dauer deiner
                    Mitwirkung und löschen sie spätestens 6 Monate nach deinem Ausscheiden.
                  </>,
                ]}
              />
              <p>
                Du kannst deine Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen, z. B. per E-Mail an die oben
                genannte Adresse. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt unberührt.
              </p>
            </div>
          ),
        },
        {
          title: '5. Anmeldung zu Aktionen und Events',
          content: (
            <div className="space-y-2">
              <p>
                Wenn du dich auf der Seite <Link className="underline underline-offset-4" to="/aktionen">Aktionen</Link> zu
                einer Veranstaltung anmeldest, verarbeiten wir: die gewählte Veranstaltung, deinen Namen, deine
                E-Mail-Adresse, eine optionale Anmerkung und den Zeitpunkt der Anmeldung.
              </p>
              <List
                items={[
                  <>
                    <strong>Zweck:</strong> Organisation der Veranstaltung (Teilnehmerliste, Platzkontingent, Vermeidung von
                    Doppelanmeldungen, Rückfragen und kurzfristige Infos).
                  </>,
                  <>
                    <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Durchführung der Teilnahme auf deine
                    Anfrage).
                  </>,
                  <>
                    <strong>Empfänger / Auftragsverarbeiter:</strong> Vercel (Hosting, s. o.), {processorDb}.
                  </>,
                  <>
                    <strong>Speicherdauer:</strong> Wir löschen deine Anmeldung spätestens 3 Monate nach der Veranstaltung.
                  </>,
                ]}
              />
            </div>
          ),
        },
        {
          title: '6. Hinweis für Kinder und Jugendliche',
          content: (
            <div className="space-y-2">
              <p>
                Das Jugendforum richtet sich an junge Menschen. Bewerbungen sind ab 13 Jahren möglich, Anmeldungen zu Aktionen
                können auch von Jugendlichen kommen. Wenn du jünger als 16 Jahre bist, sprich bitte vor dem Absenden eines
                Formulars mit deinen Eltern bzw. Erziehungsberechtigten. Soweit die Verarbeitung auf deiner Einwilligung
                beruht, ist bei unter 16-Jährigen die Zustimmung der Erziehungsberechtigten erforderlich (Art. 8 DSGVO); wir
                können dich in diesem Fall bitten, diese nachzureichen.
              </p>
              <p>
                Eltern bzw. Erziehungsberechtigte können die unten genannten Rechte auch für ihr Kind geltend machen.
              </p>
            </div>
          ),
        },
        {
          title: '7. Lokale Speicherung im Browser (localStorage)',
          content: (
            <div className="space-y-2">
              <p>Diese Website setzt keine Cookies. Sie nutzt den lokalen Speicher deines Browsers (localStorage) für:</p>
              <List
                items={[
                  <>
                    <code>jufo_posts</code> – zwischengespeicherte Inhalte der News-Beiträge, damit die News-Übersicht
                    angezeigt werden kann.
                  </>,
                  <>
                    <code>jufo-user-role</code> – nur im internen Admin-Bereich: die gewählte Rolle des Redaktionsteams.
                  </>,
                ]}
              />
              <p>
                Diese Einträge bleiben auf deinem Gerät, werden nicht an uns übertragen und enthalten keine Angaben zu deiner
                Person. Die Speicherung ist unbedingt erforderlich, um die von dir aufgerufenen Funktionen bereitzustellen
                (§ 25 Abs. 2 Nr. 2 TDDDG); eine Einwilligung ist daher nicht nötig. Du kannst die Einträge jederzeit über die
                Einstellungen deines Browsers löschen.
              </p>
            </div>
          ),
        },
        {
          title: '8. Schriften und Bilder',
          content: (
            <p>
              Schriftarten und Bilder werden direkt von unserem Hosting-Anbieter ausgeliefert. Es werden dafür keine
              Verbindungen zu Drittanbietern (z. B. Google Fonts oder Bilddatenbanken) aufgebaut.
            </p>
          ),
        },
        {
          title: '9. Links zu Instagram, WhatsApp und E-Mail',
          content: (
            <div className="space-y-2">
              <p>
                Auf dieser Website befinden sich einfache Links zu unserem Instagram-Profil und zu WhatsApp (beide angeboten von
                der Meta Platforms Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Irland). Es handelt sich nicht um
                eingebettete Inhalte oder Plugins: Beim bloßen Besuch dieser Website werden keine Daten an Meta übertragen.
                Erst wenn du auf einen Link klickst, wirst du zum jeweiligen Dienst weitergeleitet; dort gelten dessen
                Datenschutzbestimmungen.
              </p>
              <p>
                Wenn du uns per E-Mail (mailto-Link) schreibst, verarbeiten wir deine E-Mail-Adresse und den Inhalt deiner
                Nachricht zur Beantwortung (Art. 6 Abs. 1 lit. f DSGVO) und löschen sie, sobald die Anfrage erledigt ist.
              </p>
            </div>
          ),
        },
        {
          title: '10. Deine Rechte',
          content: (
            <div className="space-y-2">
              <p>Du hast gegenüber dem Verantwortlichen folgende Rechte hinsichtlich deiner personenbezogenen Daten:</p>
              <List
                items={[
                  'Auskunft (Art. 15 DSGVO)',
                  'Berichtigung (Art. 16 DSGVO)',
                  'Löschung (Art. 17 DSGVO)',
                  'Einschränkung der Verarbeitung (Art. 18 DSGVO)',
                  'Datenübertragbarkeit (Art. 20 DSGVO)',
                  'Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)',
                ]}
              />
              <p>
                <strong>Widerspruchsrecht (Art. 21 DSGVO):</strong> Soweit wir Daten auf Grundlage von Art. 6 Abs. 1 lit. f
                DSGVO verarbeiten, kannst du aus Gründen, die sich aus deiner besonderen Situation ergeben, jederzeit
                widersprechen.
              </p>
              <p>Eine formlose Nachricht an die oben genannte E-Mail-Adresse genügt.</p>
            </div>
          ),
        },
        {
          title: '11. Beschwerderecht bei der Aufsichtsbehörde',
          content: (
            <p>
              Du hast das Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Zuständig ist das Bayerische
              Landesamt für Datenschutzaufsicht (BayLDA), Promenade 18, 91522 Ansbach,{' '}
              <a className="underline underline-offset-4" href="https://www.lda.bayern.de" target="_blank" rel="noopener noreferrer">
                www.lda.bayern.de
              </a>
              .
            </p>
          ),
        },
        {
          title: 'Stand',
          content: <p>{LEGAL_STAND}</p>,
        },
      ]}
    />
  );
}
