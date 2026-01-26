import { FileText } from 'lucide-react';

const ImprintPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <FileText className="w-12 h-12 text-warning animate-float" />
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary">
              Impressum
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="bg-dark-surface rounded-2xl p-8 border-4 border-warning hard-shadow">
          <h2 className="text-2xl font-bold text-text-primary mb-4">
            Angaben gemäß § 5 TMG
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-text-primary mb-2">
                Anbieter
              </h3>
              <p className="text-text-secondary">
                Jufo Grafing<br />
                Grafing bei München<br />
                Deutschland
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-text-primary mb-2">
                Kontakt
              </h3>
              <p className="text-text-secondary">
                E-Mail: info@jufo-grafing.de
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-text-primary mb-2">
                Verantwortlich für den Inhalt
              </h3>
              <p className="text-text-secondary">
                Der Vorstand von Jufo Grafing
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-text-primary mb-2">
                Haftungsausschluss
              </h3>
              <p className="text-text-secondary mb-4">
                <strong>Haftung für Inhalte:</strong> Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
              </p>
              <p className="text-text-secondary">
                <strong>Haftung für Links:</strong> Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-text-primary mb-2">
                Urheberrecht
              </h3>
              <p className="text-text-secondary">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImprintPage;
