import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, X, Trophy, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { createTournament, type TournamentType } from '@/lib/tournament';

const typeOptions: { value: TournamentType; label: string; description: string }[] = [
  {
    value: 'single-elimination',
    label: 'K.O.-System',
    description: 'Wer verliert, scheidet aus. Schnell und spannend.',
  },
  {
    value: 'round-robin',
    label: 'Jeder gegen jeden',
    description: 'Alle spielen gegeneinander. Gerechter, aber länger.',
  },
];

export default function NewTurnierPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [type, setType] = useState<TournamentType>('single-elimination');
  const [teamBased, setTeamBased] = useState(false);
  const [description, setDescription] = useState('');
  const [participantsText, setParticipantsText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const participantLines = participantsText
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || participantLines.length < 2) return;
    setSubmitting(true);
    setTimeout(() => {
      const t = createTournament({
        name: name.trim(),
        type,
        teamBased,
        description: description.trim() || undefined,
        participantNames: participantLines,
      });
      navigate(`/tools/turnier/${t.id}`);
    }, 300);
  };

  return (
    <div className="pt-16 min-h-screen">
      <section className="py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/tools/turnier" className="flex items-center gap-1.5 text-sm font-semibold text-black/50 hover:text-black mb-6 w-fit">
              <ArrowLeft className="w-4 h-4" /> Zurück zu Turnieren
            </Link>

            <h1 className="text-4xl font-extrabold flex items-center gap-3 mb-8">
              <Trophy className="w-9 h-9 text-brand-yellow" />
              Neues Turnier
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white rounded-[2rem] border-2 border-black shadow-[5px_5px_0_#000] p-7 space-y-5">
                <h2 className="font-extrabold text-lg">Allgemein</h2>

                <div>
                  <label className="block text-xs font-bold mb-2 uppercase tracking-wider">Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border-2 border-black rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                    placeholder="z.B. Sommerturnier 2026"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-2 uppercase tracking-wider">Beschreibung</label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border-2 border-black rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow resize-none"
                    placeholder="Optional: Ort, Datum, Regeln…"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-3 uppercase tracking-wider">Turniermodus *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {typeOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setType(opt.value)}
                        className={`text-left p-4 rounded-xl border-2 transition-all ${
                          type === opt.value
                            ? 'border-black bg-brand-yellow shadow-[3px_3px_0_#000]'
                            : 'border-black/20 hover:border-black/50 bg-white'
                        }`}
                      >
                        <p className="font-extrabold text-sm">{opt.label}</p>
                        <p className="text-xs text-black/60 mt-0.5">{opt.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="teamBased"
                    checked={teamBased}
                    onChange={(e) => setTeamBased(e.target.checked)}
                    className="w-5 h-5 rounded border-2 border-black accent-brand-yellow"
                  />
                  <label htmlFor="teamBased" className="text-sm font-semibold">
                    Team-Turnier (Teilnehmer sind Teams, keine Einzelpersonen)
                  </label>
                </div>
              </div>

              <div className="bg-white rounded-[2rem] border-2 border-black shadow-[5px_5px_0_#000] p-7 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-extrabold text-lg">
                    {teamBased ? 'Teams' : 'Teilnehmer'}
                  </h2>
                  {participantLines.length > 0 && (
                    <span className="text-xs font-bold bg-brand-yellow px-3 py-1 rounded-full border border-black">
                      {participantLines.length} {teamBased ? 'Teams' : 'Teilnehmer'}
                    </span>
                  )}
                </div>
                <p className="text-sm text-black/50">Einen {teamBased ? 'Teamnamen' : 'Namen'} pro Zeile eingeben.</p>
                <textarea
                  rows={8}
                  value={participantsText}
                  onChange={(e) => setParticipantsText(e.target.value)}
                  className="w-full border-2 border-black rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow font-mono resize-none"
                  placeholder={teamBased
                    ? 'Team Alpha\nTeam Bravo\nTeam Charlie\nTeam Delta'
                    : 'Max Mustermann\nAnna Beispiel\nKlaus Meier\nLisa Schmidt'
                  }
                />
                {participantLines.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {participantLines.map((p, i) => (
                      <span key={i} className="flex items-center gap-1.5 bg-black/5 rounded-full px-3 py-1 text-xs font-semibold">
                        {p}
                        <button
                          type="button"
                          onClick={() => {
                            const lines = participantsText.split('\n');
                            lines.splice(i, 1);
                            setParticipantsText(lines.join('\n'));
                          }}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                {participantLines.length < 2 && participantsText.length > 0 && (
                  <p className="text-xs text-orange-600 font-medium">Mindestens 2 Teilnehmer erforderlich.</p>
                )}
              </div>

              <Button
                type="submit"
                variant="accent"
                size="lg"
                className="w-full"
                disabled={!name.trim() || participantLines.length < 2 || submitting}
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Wird erstellt…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Turnier erstellen
                  </span>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
