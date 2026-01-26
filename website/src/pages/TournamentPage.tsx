import { Trophy, Info } from 'lucide-react';
import TournamentEmbed from '../components/TournamentEmbed';

const TournamentPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <Trophy className="w-12 h-12 text-primary animate-float" />
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary">
              Turnier
            </h1>
          </div>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Melde dich an, stelle Teams zusammen und kämpfe um den Sieg!
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-dark-surface rounded-2xl border-4 border-warning p-6 mb-8 hard-shadow">
          <div className="flex items-start gap-4">
            <Info className="w-6 h-6 text-warning flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-text-primary mb-2">
                Hinweis zum Laden
              </h3>
              <p className="text-text-secondary">
                Die Turnier-Engine läuft auf einem externen Server. Falls sie längere Zeit 
                nicht genutzt wurde, kann der Start bis zu 30 Sekunden dauern. Bitte hab 
                etwas Geduld – das Warten lohnt sich! 🎮
              </p>
            </div>
          </div>
        </div>

        {/* Tournament Embed */}
        <TournamentEmbed url="https://jufo-web.onrender.com" />

        {/* Additional Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Anmeldung',
              description: 'Registriere dich mit deinem Namen und E-Mail.',
              color: '#f97316',
            },
            {
              title: 'Teams',
              description: 'Bilde Teams oder werde einem zugewiesen.',
              color: '#8b5cf6',
            },
            {
              title: 'Spielen',
              description: 'Kämpfe in spannenden Matches um den Sieg!',
              color: '#22d3ee',
            },
          ].map((step, index) => (
            <div
              key={step.title}
              className="bg-dark-surface rounded-xl p-6 border-2 border-dark-elevated"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold mb-3"
                style={{ backgroundColor: step.color, color: '#0f172a' }}
              >
                {index + 1}
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">
                {step.title}
              </h3>
              <p className="text-text-secondary text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TournamentPage;
