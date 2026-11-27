import { Link } from 'react-router-dom';
import SimplePage from '@/features/info/SimplePage';
import { operator } from '@/legal/operator';

export function OperatorAddress() {
  return (
    <address className="not-italic">
      {operator.name}
      <br />
      {operator.strasse}
      <br />
      {operator.plzOrt}
    </address>
  );
}

export function OperatorContact() {
  return (
    <p>
      E-Mail:{' '}
      <a className="underline underline-offset-4" href={`mailto:${operator.email}`}>
        {operator.email}
      </a>
      {operator.telefon ? (
        <>
          <br />
          Telefon: {operator.telefon}
        </>
      ) : null}
    </p>
  );
}

export default function ImpressumPage() {
  return (
    <SimplePage
      title="Impressum"
      intro="Diese Website wird privat und ehrenamtlich für das Jugendforum Grafing betrieben."
      sections={[
        {
          title: 'Angaben gemäß § 5 DDG',
          content: <OperatorAddress />,
        },
        {
          title: 'Kontakt',
          content: (
            <>
              <OperatorContact />
              <p className="mt-2">
                Alternativ erreichst du uns über das <Link className="underline underline-offset-4" to="/kontakt">Kontaktformular</Link>.
              </p>
            </>
          ),
        },
        {
          title: 'Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV',
          content: <OperatorAddress />,
        },
        {
          title: 'Haftung für Inhalte',
          content: (
            <p>
              Die Inhalte dieser Website werden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit
              und Aktualität der Inhalte kann jedoch keine Gewähr übernommen werden. Als Diensteanbieter bin ich für eigene
              Inhalte nach den allgemeinen Gesetzen verantwortlich. Sobald mir eine Rechtsverletzung bekannt wird, entferne
              ich die betreffenden Inhalte umgehend.
            </p>
          ),
        },
        {
          title: 'Haftung für Links',
          content: (
            <p>
              Diese Website enthält Links zu externen Websites Dritter (z. B. Instagram, WhatsApp), auf deren Inhalte ich
              keinen Einfluss habe. Für diese fremden Inhalte ist stets der jeweilige Anbieter oder Betreiber der Seiten
              verantwortlich. Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar. Werden mir Rechtsverletzungen
              bekannt, entferne ich derartige Links umgehend.
            </p>
          ),
        },
        {
          title: 'Datenschutz',
          content: (
            <p>
              Informationen zur Verarbeitung personenbezogener Daten findest du in der{' '}
              <Link className="underline underline-offset-4" to="/datenschutz">Datenschutzerklärung</Link>.
            </p>
          ),
        },
      ]}
    />
  );
}
