export type TournamentType = 'single-elimination' | 'round-robin';
export type TournamentStatus = 'setup' | 'in-progress' | 'completed';
export type MatchStatus = 'pending' | 'completed';

export interface Participant {
  id: string;
  name: string;
  seed: number;
}

export interface Match {
  id: string;
  round: number;
  position: number;
  participant1Id: string | null;
  participant2Id: string | null;
  score1: number | null;
  score2: number | null;
  winnerId: string | null;
  status: MatchStatus;
}

export interface Tournament {
  id: string;
  name: string;
  type: TournamentType;
  teamBased: boolean;
  description?: string;
  status: TournamentStatus;
  participants: Participant[];
  matches: Match[];
  createdAt: string;
}

const STORAGE_KEY = 'jufo_tournaments';

function nanoid(): string {
  return Math.random().toString(36).slice(2, 10);
}

// ── Persistence ────────────────────────────────────────────────────
export function loadTournaments(): Tournament[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as Tournament[];
  } catch {
    return [];
  }
}

export function saveTournaments(tournaments: Tournament[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tournaments));
}

export function getTournament(id: string): Tournament | undefined {
  return loadTournaments().find((t) => t.id === id);
}

export function persistTournament(tournament: Tournament): void {
  const all = loadTournaments().filter((t) => t.id !== tournament.id);
  saveTournaments([...all, tournament]);
}

export function deleteTournament(id: string): void {
  saveTournaments(loadTournaments().filter((t) => t.id !== id));
}

// ── Bracket generation ─────────────────────────────────────────────
function generateSingleElimination(participants: Participant[]): Match[] {
  const matches: Match[] = [];
  const n = participants.length;
  const rounds = Math.ceil(Math.log2(n));
  const totalSlots = Math.pow(2, rounds);

  const seeded = [...participants].sort((a, b) => a.seed - b.seed);

  // Pad with nulls for byes
  const slots: (Participant | null)[] = Array(totalSlots).fill(null);
  seeded.forEach((p, i) => { slots[i] = p; });

  let matchPos = 0;
  const firstRound: Match[] = [];
  for (let i = 0; i < totalSlots / 2; i++) {
    const p1 = slots[i];
    const p2 = slots[totalSlots - 1 - i];
    const isBye = (p1 && !p2) || (!p1 && p2);
    firstRound.push({
      id: nanoid(),
      round: 1,
      position: matchPos++,
      participant1Id: p1?.id ?? null,
      participant2Id: p2?.id ?? null,
      score1: null,
      score2: null,
      winnerId: isBye ? (p1?.id ?? p2?.id ?? null) : null,
      status: isBye ? 'completed' : 'pending',
    });
  }
  matches.push(...firstRound);

  for (let round = 2; round <= rounds; round++) {
    const count = Math.pow(2, rounds - round);
    for (let i = 0; i < count; i++) {
      matches.push({
        id: nanoid(),
        round,
        position: i,
        participant1Id: null,
        participant2Id: null,
        score1: null,
        score2: null,
        winnerId: null,
        status: 'pending',
      });
    }
  }
  return matches;
}

function generateRoundRobin(participants: Participant[]): Match[] {
  const matches: Match[] = [];
  const n = participants.length;
  let pos = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      matches.push({
        id: nanoid(),
        round: 1,
        position: pos++,
        participant1Id: participants[i]!.id,
        participant2Id: participants[j]!.id,
        score1: null,
        score2: null,
        winnerId: null,
        status: 'pending',
      });
    }
  }
  return matches;
}

// ── Tournament operations ──────────────────────────────────────────
export function createTournament(data: {
  name: string;
  type: TournamentType;
  teamBased: boolean;
  description?: string;
  participantNames: string[];
}): Tournament {
  const participants: Participant[] = data.participantNames
    .filter((n) => n.trim())
    .map((name, i) => ({ id: nanoid(), name: name.trim(), seed: i + 1 }));

  const tournament: Tournament = {
    id: nanoid(),
    name: data.name,
    type: data.type,
    teamBased: data.teamBased,
    description: data.description,
    status: 'setup',
    participants,
    matches: [],
    createdAt: new Date().toISOString(),
  };
  persistTournament(tournament);
  return tournament;
}

export function startTournament(id: string): Tournament {
  const t = getTournament(id);
  if (!t) throw new Error('Turnier nicht gefunden');
  if (t.participants.length < 2) throw new Error('Mindestens 2 Teilnehmer erforderlich');

  const matches =
    t.type === 'single-elimination'
      ? generateSingleElimination(t.participants)
      : generateRoundRobin(t.participants);

  const updated: Tournament = { ...t, status: 'in-progress', matches };
  persistTournament(updated);
  return updated;
}

export function recordMatchResult(
  tournamentId: string,
  matchId: string,
  score1: number,
  score2: number
): Tournament {
  const t = getTournament(tournamentId);
  if (!t) throw new Error('Turnier nicht gefunden');

  const matchIdx = t.matches.findIndex((m) => m.id === matchId);
  if (matchIdx === -1) throw new Error('Match nicht gefunden');

  const match = t.matches[matchIdx]!;
  const winnerId = score1 > score2 ? match.participant1Id : match.participant2Id;

  const updatedMatches = [...t.matches];
  updatedMatches[matchIdx] = { ...match, score1, score2, winnerId, status: 'completed' };

  // For single-elimination: propagate winner to next round
  if (t.type === 'single-elimination' && winnerId) {
    const nextRound = match.round + 1;
    const nextPosition = Math.floor(match.position / 2);
    const nextMatchIdx = updatedMatches.findIndex(
      (m) => m.round === nextRound && m.position === nextPosition
    );
    if (nextMatchIdx !== -1) {
      const nm = updatedMatches[nextMatchIdx]!;
      if (match.position % 2 === 0) {
        updatedMatches[nextMatchIdx] = { ...nm, participant1Id: winnerId };
      } else {
        updatedMatches[nextMatchIdx] = { ...nm, participant2Id: winnerId };
      }
    }
  }

  const allDone = updatedMatches.every((m) => m.status === 'completed');
  const updated: Tournament = {
    ...t,
    matches: updatedMatches,
    status: allDone ? 'completed' : 'in-progress',
  };
  persistTournament(updated);
  return updated;
}

// ── Helpers ────────────────────────────────────────────────────────
export function getParticipantName(t: Tournament, id: string | null): string {
  if (!id) return 'Freilos';
  return t.participants.find((p) => p.id === id)?.name ?? '?';
}

export function getRoundRobinStandings(t: Tournament) {
  const stats: Record<string, { name: string; wins: number; losses: number; draws: number; points: number }> = {};
  t.participants.forEach((p) => {
    stats[p.id] = { name: p.name, wins: 0, losses: 0, draws: 0, points: 0 };
  });

  t.matches.forEach((m) => {
    if (m.status !== 'completed' || m.score1 == null || m.score2 == null) return;
    const s1 = stats[m.participant1Id ?? ''];
    const s2 = stats[m.participant2Id ?? ''];
    if (!s1 || !s2) return;
    if (m.score1 > m.score2) { s1.wins++; s1.points += 3; s2.losses++; }
    else if (m.score2 > m.score1) { s2.wins++; s2.points += 3; s1.losses++; }
    else { s1.draws++; s1.points++; s2.draws++; s2.points++; }
  });

  return Object.entries(stats)
    .map(([id, s]) => ({ id, ...s }))
    .sort((a, b) => b.points - a.points || b.wins - a.wins);
}
