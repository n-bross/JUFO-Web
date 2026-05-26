import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Trophy, Trash2, Play, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { loadTournaments, deleteTournament, type Tournament } from '@/lib/tournament';

const statusConfig: Record<Tournament['status'], { label: string; icon: React.ReactNode; color: string }> = {
  setup: { label: 'Vorbereitung', icon: <Clock className="w-3.5 h-3.5" />, color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
  'in-progress': { label: 'Läuft', icon: <Play className="w-3.5 h-3.5" />, color: 'bg-blue-100 text-blue-700 border-blue-300' },
  completed: { label: 'Abgeschlossen', icon: <CheckCircle className="w-3.5 h-3.5" />, color: 'bg-green-100 text-green-700 border-green-300' },
};

const typeLabels: Record<Tournament['type'], string> = {
  'single-elimination': 'K.O.-System',
  'round-robin': 'Jeder gegen jeden',
};

export default function TurnierListPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);

  useEffect(() => {
    setTournaments(loadTournaments().sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
  }, []);

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Turnier "${name}" wirklich löschen?`)) {
      deleteTournament(id);
      setTournaments((prev) => prev.filter((t) => t.id !== id));
    }
  };

  return (
    <div className="pt-16 min-h-screen">
      <section className="py-12 px-6">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start justify-between mb-10 flex-wrap gap-4"
          >
            <div>
              <p className="text-sm font-bold text-black/50 uppercase tracking-widest mb-2">
                <Link to="/tools" className="hover:text-black">Tools</Link>
                {' / '}Turnierplanner
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold flex items-center gap-3">
                <Trophy className="w-10 h-10 text-brand-yellow" />
                Turniere
              </h1>
            </div>
            <Button asChild variant="accent" size="lg">
              <Link to="/tools/turnier/neu">
                <Plus className="w-5 h-5 mr-2" />
                Neues Turnier
              </Link>
            </Button>
          </motion.div>

          {tournaments.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-white rounded-[2rem] border-2 border-black border-dashed"
            >
              <Trophy className="w-16 h-16 mx-auto text-black/20 mb-4" />
              <p className="text-xl font-extrabold text-black/40">Noch keine Turniere</p>
              <p className="text-sm text-black/30 mt-2 mb-6">Erstelle dein erstes Turnier und lege los!</p>
              <Button asChild variant="accent">
                <Link to="/tools/turnier/neu">
                  <Plus className="w-4 h-4 mr-2" /> Jetzt erstellen
                </Link>
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {tournaments.map((t, i) => {
                const sc = statusConfig[t.status];
                return (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-white rounded-[1.5rem] border-2 border-black shadow-[4px_4px_0_#000] p-6 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#000] transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${sc.color}`}>
                        {sc.icon} {sc.label}
                      </span>
                      <button
                        onClick={() => handleDelete(t.id, t.name)}
                        className="p-1.5 text-black/30 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label="Löschen"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <h3 className="text-xl font-extrabold mb-1">{t.name}</h3>
                    {t.description && (
                      <p className="text-sm text-black/50 mb-3 line-clamp-2">{t.description}</p>
                    )}
                    <div className="flex items-center gap-3 text-xs text-black/50 font-medium mb-4">
                      <span>{typeLabels[t.type]}</span>
                      <span>•</span>
                      <span>{t.participants.length} Teilnehmer</span>
                      {t.teamBased && <><span>•</span><span>Teams</span></>}
                    </div>
                    <Button asChild variant={t.status === 'setup' ? 'accent' : 'primary'} size="sm" className="w-full">
                      <Link to={`/tools/turnier/${t.id}`}>
                        {t.status === 'setup' ? 'Vorbereiten & Starten' : 'Zum Turnier'}
                      </Link>
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
