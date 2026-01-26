import { useState, useEffect } from 'react';
import { Loader2, ExternalLink, Monitor } from 'lucide-react';

interface TournamentEmbedProps {
  url?: string;
}

const TournamentEmbed: React.FC<TournamentEmbedProps> = ({ 
  url = 'https://jufo-web.onrender.com' 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setLoadError(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setLoadError(true);
  };

  const openInNewTab = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Mobile fallback - show button instead of iframe
  if (isMobile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8 bg-dark-surface rounded-2xl border-4 border-secondary hard-shadow">
        <Monitor className="w-16 h-16 text-secondary mb-4 animate-float" />
        <h3 className="text-2xl font-bold text-text-primary mb-2 text-center">
          Turnier-Seite
        </h3>
        <p className="text-text-secondary text-center mb-6 max-w-md">
          Für das beste Erlebnis öffne die Turnier-Seite im Vollbild-Modus.
        </p>
        <button
          onClick={openInNewTab}
          className="btn-bouncy flex items-center gap-3 px-6 py-4 bg-primary text-white font-bold rounded-xl border-4 border-black hard-shadow"
        >
          <ExternalLink className="w-5 h-5" />
          Turnier im Vollbild öffnen
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-[600px] rounded-2xl overflow-hidden border-4 border-secondary hard-shadow bg-dark-surface">
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark-bg z-10">
          <div className="relative">
            <Loader2 className="w-16 h-16 text-primary animate-spin" />
            <div className="absolute inset-0 rounded-full animate-pulse-glow" />
          </div>
          <h3 className="mt-6 text-xl font-bold text-text-primary animate-bounce-in">
            Turnier-Engine fährt hoch...
          </h3>
          <p className="mt-2 text-text-secondary text-center max-w-md px-4">
            Der Server startet. Das kann bis zu 30 Sekunden dauern, wenn er längere Zeit nicht verwendet wurde.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      )}

      {/* Error State */}
      {loadError && !isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark-bg z-10">
          <div className="text-danger text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-text-primary mb-2">
            Verbindungsproblem
          </h3>
          <p className="text-text-secondary text-center max-w-md px-4 mb-4">
            Die Turnier-Seite konnte nicht geladen werden. Bitte versuche es erneut.
          </p>
          <button
            onClick={() => {
              setIsLoading(true);
              setLoadError(false);
            }}
            className="btn-bouncy px-6 py-3 bg-secondary text-white font-bold rounded-xl border-4 border-black hard-shadow"
          >
            Erneut versuchen
          </button>
        </div>
      )}

      {/* Iframe */}
      <iframe
        src={url}
        title="Jufo Grafing Turnier"
        className="w-full h-[600px] border-0"
        onLoad={handleIframeLoad}
        onError={handleIframeError}
        allow="fullscreen"
      />

      {/* Fullscreen Button */}
      {!isLoading && !loadError && (
        <div className="absolute bottom-4 right-4">
          <button
            onClick={openInNewTab}
            className="btn-bouncy flex items-center gap-2 px-4 py-2 bg-dark-elevated text-text-primary rounded-lg border-2 border-secondary hover:bg-secondary transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Vollbild
          </button>
        </div>
      )}
    </div>
  );
};

export default TournamentEmbed;
