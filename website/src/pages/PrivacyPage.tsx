import { Shield } from 'lucide-react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <Shield className="w-12 h-12 text-accent animate-float" />
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary">
              Datenschutz
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="bg-dark-surface rounded-2xl p-8 border-4 border-accent hard-shadow prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-text-primary mb-4">
            Datenschutzerklärung
          </h2>
          
          <h3 className="text-xl font-bold text-text-primary mt-6 mb-3">
            1. Verantwortlicher
          </h3>
          <p className="text-text-secondary mb-4">
            Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br />
            Jufo Grafing<br />
            Grafing bei München<br />
            E-Mail: info@jufo-grafing.de
          </p>

          <h3 className="text-xl font-bold text-text-primary mt-6 mb-3">
            2. Erhebung und Speicherung personenbezogener Daten
          </h3>
          <p className="text-text-secondary mb-4">
            Beim Besuch unserer Website werden automatisch Informationen durch Ihren Browser an unseren Server gesendet. Diese Informationen werden temporär in einem sogenannten Logfile gespeichert.
          </p>

          <h3 className="text-xl font-bold text-text-primary mt-6 mb-3">
            3. Kontaktformular & Anmeldung
          </h3>
          <p className="text-text-secondary mb-4">
            Bei Nutzung unserer Kontakt- und Anmeldeformulare werden die von Ihnen eingegebenen Daten (Name, E-Mail, etc.) an Formspree übermittelt und gespeichert. Die Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet.
          </p>

          <h3 className="text-xl font-bold text-text-primary mt-6 mb-3">
            4. Eingebettete Inhalte
          </h3>
          <p className="text-text-secondary mb-4">
            Diese Website kann externe Inhalte einbetten (z.B. Google Calendar, Turnier-System). Diese Inhalte werden erst nach Ihrer ausdrücklichen Zustimmung geladen. Bitte beachten Sie die Datenschutzerklärungen der jeweiligen Anbieter.
          </p>

          <h3 className="text-xl font-bold text-text-primary mt-6 mb-3">
            5. Ihre Rechte
          </h3>
          <p className="text-text-secondary mb-4">
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten. Kontaktieren Sie uns hierfür unter info@jufo-grafing.de.
          </p>

          <h3 className="text-xl font-bold text-text-primary mt-6 mb-3">
            6. Hosting
          </h3>
          <p className="text-text-secondary mb-4">
            Diese Website wird über GitHub Pages gehostet. Die Datenschutzerklärung von GitHub finden Sie unter: https://docs.github.com/de/site-policy/privacy-policies/github-privacy-statement
          </p>

          <p className="text-text-secondary text-sm mt-8">
            Stand: Januar 2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
