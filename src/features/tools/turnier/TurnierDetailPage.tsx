import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Trophy, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import {
  getTournament,
  startTournament,
  recordMatchResult,
  getParticipantName,
  getRoundRobinStandings,
  type Tournament,
  type Match,
} from '@/lib/tournament';

function ScoreModal({
  match,
  tournament,
  onSave,
  onClose,
}: {
  match: Match;
  tournament: Tournament;
  onSave: (s1: number, s2: number) => void;
  onClose: () => void;
}) {
  const [s1, setS1] = useState(match.score1?.toString() ?? '');
  const [s2, setS2] = useState(match.score2?.toString() ?? '');
  const p1 = getParticipantName(tournament, match.participant1Id);
  const p2 = getParticipantName(tournament, match.participant2Id);
  const valid = s1 !== '' && s2 !== '' && Number(s1) !== Number(s2);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 16 }}
        className="relative bg-white rounded-[1.5rem] border-2 border-black shadow-[6px_6px_0_#000] w-full max-w-sm p-6"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 hover:bg-black/5 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>
        <h3 className="font-extrabold text-lg mb-5">Ergebnis eingeben</h3>
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 text-center">
            <p className="font-bold text-sm truncate">{p1}</p>
            <input
              type="number"
              min="0"
              value={s1}
              onChange={(e) => setS1(e.target.value)}
              autoFocus
              className="mt-2 w-full border-2 border-black rounded-xl px-3 py-2.5 text-2xl font-extrabold text-center focus:outline-none focus:ring-2 focus:ring-brand-yellow"
            />
          </div>
          <span className="font-extrabold text-2xl text-black/30">:</span>
          <div className="flex-1 text-center">
            <p className="font-bold text-sm truncate">{p2}</p>
            <input
              type="number"
              min="0"
              value={s2}
              onChange={(e) => setS2(e.target.value)}
              className="mt-2 w-full border-2 border-black rounded-xl px-3 py-2.5 text-2xl font-extrabold text-center focus:outline-none focus:ring-2 focus:ring-brand-yellow"
            />
          </div>
        </div>
        {!valid && s1 !== '' && s2 !== '' && (
          <p className="text-xs text-orange-600 font-medium mb-3">Unentschieden nicht erlaubt.</p>
        )}
        <Button
          variant="accent"
          className="w-full"
          disabled={!valid}
          onClick={() => onSave(Number(s1), Number(s2))}
        >
          <Check className="w-4 h-4 mr-2" /> Ergebnis speichern
        </Button>
      </motion.div>
    </div>
  );
}

function BracketView({ tournament, onMatchClick }: { tournament: Tournament; onMatchClick: (m: Match) => void }) {
  const rounds = [...new Set(tournament.matches.map((m) => m.round))].sort((a, b) => a - b);

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-4 min-w-max">
        {rounds.map((round) => {
          const matches = tournament.matches
            .filter((m) => m.round === round)
            .sort((a, b) => a.position - b.position);
          return (
            <div key={round} className="flex flex-col gap-3">
              <p className="text-xs font-extrabold uppercase tracking-widest text-black/40 text-center mb-1">
                {round === Math.max(...rounds) ? 'Finale' : `Runde ${round}`}
              </p>
              <div
                className="flex flex-col gap-3"
                style={{ justifyContent: 'space-around', minHeight: `${matches.length * 80}px` }}
              >
                {matches.map((match) => {
                  const p1 = getParticipantName(tournament, match.participant1Id);
                  const p2 = getParticipantName(tournament, match.participant2Id);
                  const isDone = match.status === 'completed';
                  const canEdit = tournament.status === 'in-progress' && match.participant1Id && match.participant2Id;
                  return (
                    <button
                      key={match.id}
                      onClick={() => canEdit && onMatchClick(match)}
                      disabled={!canEdit}
                      className={cn(
                        'w-44 rounded-xl border-2 border-black overflow-hidden text-left transition-all',
                        isDone ? 'bg-black/5' : 'bg-white',
                        canEdit && 'hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#000] cursor-pointer shadow-[2px_2px_0_#000]'
                      )}
                    >
                      {[
                        { id: match.participant1Id, name: p1, score: match.score1 },
                        { id: match.participant2Id, name: p2, score: match.score2 },
                      ].map((side, si) => (
                        <div
                          key={si}
                          className={cn(
                            'flex items-center justify-between px-3 py-2 text-sm',
                            si === 0 && 'border-b border-black/10',
                            isDone && side.id === match.winnerId && 'bg-brand-yellow font-extrabold'
                          )}
                        >
                          <span className="truncate max-w-[100px] font-semibold">{side.name}</span>
                          {isDone && <span className="font-extrabold ml-2">{side.score}</span>}
                        </div>
                      ))}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RoundRobinView({ tournament, onMatchClick }: { tournament: Tournament; onMatchClick: (m: Match) => void }) {
  const standings = getRoundRobinStandings(tournament);
  const pending = tournament.matches.filter((m) => m.status === 'pending' && tournament.status === 'in-progress');
  const done = tournament.matches.filter((m) => m.status === 'completed');

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-[1.5rem] border-2 border-black shadow-[4px_4px_0_#000] overflow-hidden">
        <div className="px-6 py-4 border-b-2 border-black bg-brand-yellow">
          <h3 className="font-extrabold">Tabelle</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/10">
                <th className="text-left px-4 py-3 font-bold text-black/50 w-8">#</th>
                <th className="text-left px-4 py-3 font-bold text-black/50">Name</th>
                <th className="px-4 py-3 font-bold text-black/50">S</th>
                <th className="px-4 py-3 font-bold text-black/50">U</th>
                <th className="px-4 py-3 font-bold text-black/50">N</th>
                <th className="px-4 py-3 font-bold text-black/50">Pkt</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((row, i) => (
                <tr key={row.id} className={cn('border-b border-black/5', i === 0 && 'bg-brand-yellow/20 font-bold')}>
                  <td className="px-4 py-3 font-extrabold text-black/30">{i + 1}</td>
                  <td className="px-4 py-3 font-semibold">{row.name}</td>
                  <td className="px-4 py-3 text-center">{row.wins}</td>
                  <td className="px-4 py-3 text-center">{row.draws}</td>
                  <td className="px-4 py-3 text-center">{row.losses}</td>
                  <td className="px-4 py-3 text-center font-extrabold">{row.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {pending.length > 0 && (
        <div>
          <h3 className="font-extrabold mb-3">Ausstehende Spiele</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {pending.map((m) => (
              <button
                key={m.id}
                onClick={() => onMatchClick(m)}
                className="bg-white rounded-xl border-2 border-black shadow-[3px_3px_0_#000] p-4 text-left hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#000] transition-all"
              >
                <p className="font-semibold text-sm">
                  {getParticipantName(tournament, m.participant1Id)}
                  <span className="text-black/30 mx-2">vs.</span>
                  {getParticipantName(tournament, m.participant2Id)}
                </p>
                <p className="text-xs text-black/40 mt-1">Klicken zum Eintragen</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {done.length > 0 && (
        <div>
          <h3 className="font-extrabold mb-3">Abgeschlossene Spiele</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {done.map((m) => (
              <div key={m.id} className="bg-black/5 rounded-xl border border-black/10 p-4">
                <p className="font-semibold text-sm">
                  <span className={m.winnerId === m.participant1Id ? 'font-extrabold' : ''}>
                    {getParticipantName(tournament, m.participant1Id)}
                  </span>
                  <span className="mx-2 font-extrabold">{m.score1} : {m.score2}</span>
                  <span className={m.winnerId === m.participant2Id ? 'font-extrabold' : ''}>
                    {getParticipantName(tournament, m.participant2Id)}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function TurnierDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [scoreMatch, setScoreMatch] = useState<Match | null>(null);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    if (id) {
      const t = getTournament(id);
      if (!t) { navigate('/tools/turnier', { replace: true }); return; }
      setTournament(t);
    }
  }, [id, navigate]);

  if (!tournament) return null;

  const handleStart = () => {
    setStarting(true);
    setTimeout(() => {
      try {
        setTournament(startTournament(tournament.id));
      } catch (e) {
        alert((e as Error).message);
      }
      setStarting(false);
    }, 400);
  };

  const handleSaveScore = (s1: number, s2: number) => {
    if (!scoreMatch) return;
    const updated = recordMatchResult(tournament.id, scoreMatch.id, s1, s2);
    setTournament(updated);
    setScoreMatch(null);
  };

  const winner =
    tournament.status === 'completed' && tournament.type === 'single-elimination'
      ? (() => {
          const finalMatch = tournament.matches.reduce((a, b) => (a.round > b.round ? a : b));
          return getParticipantName(tournament, finalMatch.winnerId);
        })()
      : null;

  const rrWinner =
    tournament.status === 'completed' && tournament.type === 'round-robin'
      ? getRoundRobinStandings(tournament)[0]?.name
      : null;

  return (
    <div className="pt-16 min-h-screen">
      <section className="py-10 px-6">
        <div className="max-w-[1200px] mx-auto">
          <Link to="/tools/turnier" className="flex items-center gap-1.5 text-sm font-semibold text-black/50 hover:text-black mb-6 w-fit">
            <ArrowLeft className="w-4 h-4" /> Alle Turniere
          </Link>

          <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold">{tournament.name}</h1>
              {tournament.description && (
                <p className="text-sm text-black/50 mt-1">{tournament.description}</p>
              )}
              <div className="flex gap-3 mt-2 text-xs text-black/40 font-medium">
                <span>{tournament.type === 'single-elimination' ? 'K.O.-System' : 'Jeder gegen jeden'}</span>
                <span>•</span>
                <span>{tournament.participants.length} Teilnehmer</span>
              </div>
            </div>

            {tournament.status === 'setup' && (
              <Button variant="accent" size="lg" onClick={handleStart} disabled={starting}>
                {starting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Startet…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Play className="w-5 h-5" /> Turnier starten
                  </span>
                )}
              </Button>
            )}
          </div>

          {(winner || rrWinner) && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-brand-yellow rounded-[1.5rem] border-2 border-black shadow-[5px_5px_0_#000] p-6 flex items-center gap-4 mb-8"
            >
              <Trophy className="w-10 h-10 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-black/60">Turnier beendet – Gewinner</p>
                <p className="text-2xl font-extrabold">{winner ?? rrWinner} 🏆</p>
              </div>
            </motion.div>
          )}

          {tournament.status === 'setup' && (
            <div className="bg-white rounded-[2rem] border-2 border-black shadow-[4px_4px_0_#000] p-8">
              <h2 className="font-extrabold text-xl mb-4">Teilnehmer ({tournament.participants.length})</h2>
              <div className="flex flex-wrap gap-2">
                {tournament.participants.map((p) => (
                  <span key={p.id} className="bg-black/5 rounded-full px-4 py-1.5 text-sm font-semibold">
                    #{p.seed} {p.name}
                  </span>
                ))}
              </div>
              <p className="text-sm text-black/50 mt-4">Klicke auf „Turnier starten", um den Bracket zu generieren.</p>
            </div>
          )}

          {tournament.status !== 'setup' && (
            <>
              {tournament.type === 'single-elimination' ? (
                <BracketView tournament={tournament} onMatchClick={setScoreMatch} />
              ) : (
                <RoundRobinView tournament={tournament} onMatchClick={setScoreMatch} />
              )}
            </>
          )}
        </div>
      </section>

      <AnimatePresence>
        {scoreMatch && (
          <ScoreModal
            match={scoreMatch}
            tournament={tournament}
            onSave={handleSaveScore}
            onClose={() => setScoreMatch(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
