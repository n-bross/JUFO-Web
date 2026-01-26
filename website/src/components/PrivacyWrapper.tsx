import { useState } from 'react';
import { Calendar, Shield, ExternalLink } from 'lucide-react';

interface PrivacyWrapperProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  provider?: string;
  privacyPolicyUrl?: string;
}

const PrivacyWrapper: React.FC<PrivacyWrapperProps> = ({
  children,
  title = 'Kalender laden',
  description = 'Durch das Laden des Kalenders werden Daten an Google übertragen.',
  provider = 'Google',
  privacyPolicyUrl = 'https://policies.google.com/privacy',
}) => {
  const [isConsented, setIsConsented] = useState(false);

  if (isConsented) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 bg-dark-surface rounded-2xl border-4 border-accent hard-shadow">
      {/* Icon */}
      <div className="relative mb-6">
        <Calendar className="w-20 h-20 text-accent animate-float" />
        <Shield className="w-8 h-8 text-success absolute -bottom-2 -right-2" />
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-text-primary mb-4 text-center">
        {title}
      </h3>

      {/* Description */}
      <p className="text-text-secondary text-center mb-6 max-w-lg">
        {description}
      </p>

      {/* Privacy Info Box */}
      <div className="bg-dark-elevated rounded-xl p-4 mb-6 max-w-lg w-full border-2 border-dark-elevated">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-text-secondary text-sm">
              <strong className="text-text-primary">Datenschutz-Hinweis:</strong>{' '}
              Durch Klick auf "Laden" wird eine Verbindung zu {provider} hergestellt. 
              Dabei werden möglicherweise personenbezogene Daten wie Ihre IP-Adresse übermittelt.
            </p>
            <a
              href={privacyPolicyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-accent hover:text-primary transition-colors text-sm mt-2"
            >
              Datenschutzerklärung von {provider}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Consent Button */}
      <button
        onClick={() => setIsConsented(true)}
        className="btn-bouncy flex items-center gap-3 px-8 py-4 bg-accent text-dark-bg font-bold rounded-xl border-4 border-black hard-shadow"
      >
        <Calendar className="w-5 h-5" />
        Lade Kalender ({provider})
      </button>

      {/* Additional Info */}
      <p className="text-text-secondary text-xs mt-4 text-center max-w-md">
        Ihre Zustimmung gilt nur für diese Sitzung und wird nicht gespeichert.
      </p>
    </div>
  );
};

export default PrivacyWrapper;
