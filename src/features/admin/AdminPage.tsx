import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { clearStoredRole, getStoredRole, setStoredRole, type UserRole } from '@/lib/admin';

type RegistrationStatus = 'neu' | 'bestätigt' | 'warteliste';
type TournamentFormat = 'single-elimination' | 'group-stage';

type Registration = {
  id: string;
  name: string;
  event: string;
  age: number;
  createdAt: string;
  status: RegistrationStatus;
  preferredTeam: string;
};

type Team = { name: string; players: string[] };

const MOCK_REGISTRATIONS: Registration[] = [
  { id: 'a1', name: 'Lea Sommer', event: 'Volleyball', age: 15, createdAt: '2026-05-01T10:10:00Z', status: 'bestätigt', preferredTeam: 'Blue Hawks' },
  { id: 'a2', name: 'Noah Klein', event: 'Fußball', age: 16, createdAt: '2026-05-03T11:15:00Z', status: 'neu', preferredTeam: 'Red Lions' },
  { id: 'a3', name: 'Mila Bauer', event: 'Volleyball', age: 14, createdAt: '2026-05-02T09:10:00Z', status: 'warteliste', preferredTeam: 'Blue Hawks' },
  { id: 'a4', name: 'Finn Maier', event: 'Basketball', age: 17, createdAt: '2026-05-04T14:00:00Z', status: 'bestätigt', preferredTeam: 'Court Kings' },
  { id: 'a5', name: 'Luca Hoffmann', event: 'Fußball', age: 15, createdAt: '2026-05-05T14:00:00Z', status: 'bestätigt', preferredTeam: 'Red Lions' },
  { id: 'a6', name: 'Emma Richter', event: 'Basketball', age: 16, createdAt: '2026-05-05T08:00:00Z', status: 'neu', preferredTeam: 'Court Kings' },
];

function buildTeams(registrations: Registration[]): Team[] {
  const grouped = registrations.reduce<Record<string, string[]>>((acc, reg) => {
    if (!acc[reg.preferredTeam]) acc[reg.preferredTeam] = [];
    acc[reg.preferredTeam].push(reg.name);
    return acc;
  }, {});

  return Object.entries(grouped).map(([name, players]) => ({ name, players }));
}

function renderBrackets(teams: Team[]) {
  const pairs: Array<[Team | undefined, Team | undefined]> = [];
  for (let i = 0; i < teams.length; i += 2) pairs.push([teams[i], teams[i + 1]]);
  return pairs;
}

export default function AdminPage() {
  const [role, setRole] = useState<UserRole | null>(() => getStoredRole());
  const [registrations] = useState<Registration[]>(MOCK_REGISTRATIONS);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [eventFilter, setEventFilter] = useState('alle');
  const [statusFilter, setStatusFilter] = useState<'alle' | RegistrationStatus>('alle');
  const [teamFilter, setTeamFilter] = useState('alle');
  const [ageSort, setAgeSort] = useState<'asc' | 'desc'>('asc');
  const [timeSort, setTimeSort] = useState<'asc' | 'desc'>('desc');

  const [plannerInput, setPlannerInput] = useState<Registration[]>([]);
  const [format, setFormat] = useState<TournamentFormat>('single-elimination');

  const filtered = useMemo(() => {
    return registrations
      .filter((r) => (eventFilter === 'alle' ? true : r.event === eventFilter))
      .filter((r) => (statusFilter === 'alle' ? true : r.status === statusFilter))
      .filter((r) => (teamFilter === 'alle' ? true : r.preferredTeam === teamFilter))
      .sort((a, b) => {
        const age = ageSort === 'asc' ? a.age - b.age : b.age - a.age;
        if (age !== 0) return age;
        return timeSort === 'asc'
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [registrations, eventFilter, statusFilter, teamFilter, ageSort, timeSort]);

  const selected = filtered.filter((r) => selectedIds.includes(r.id));
  const plannerTeams = useMemo(() => buildTeams(plannerInput), [plannerInput]);

  const handleExport = (type: 'csv' | 'json') => {
    const rows = selected.length ? selected : filtered;
    if (!rows.length) return;

    const content =
      type === 'json'
        ? JSON.stringify(rows, null, 2)
        : [
            'id,name,event,age,createdAt,status,preferredTeam',
            ...rows.map((r) =>
              [r.id, r.name, r.event, r.age, r.createdAt, r.status, r.preferredTeam]
                .map((v) => `"${String(v).replace(/"/g, '""')}"`)
                .join(',')
            ),
          ].join('\n');

    const blob = new Blob([content], { type: type === 'json' ? 'application/json' : 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `anmeldungen-export.${type}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const sendToPlanner = () => {
    setPlannerInput(selected.length ? selected : filtered);
  };

  if (role !== 'admin') {
    return (
      <section className="max-w-2xl mx-auto px-6 py-20 space-y-6">
        <Card className="bg-white text-black border-2 border-black">
          <CardHeader>
            <CardTitle>Admin-Bereich geschützt</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Nur Nutzer:innen mit Rolle <strong>admin</strong> dürfen auf <code>/admin</code> zugreifen.</p>
            <div className="flex flex-wrap gap-3">
              <Button size="sm" onClick={() => { setStoredRole('admin'); setRole('admin'); }}>Als Admin anmelden</Button>
              <Button size="sm" variant="secondary" onClick={() => { setStoredRole('editor'); setRole('editor'); }}>Als Editor testen</Button>
              <Button size="sm" variant="ghost" onClick={() => { clearStoredRole(); setRole(null); }}>Abmelden</Button>
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 space-y-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-4xl font-extrabold">Admin Dashboard</h1>
        <Button variant="ghost" size="sm" onClick={() => { clearStoredRole(); setRole(null); }}>Logout</Button>
      </div>

      <Card className="bg-white text-black border-2 border-black">
        <CardHeader><CardTitle>Tool 1: Anmeldungsübersicht</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-5 gap-3">
            <select className="border rounded px-3 py-2" value={eventFilter} onChange={(e) => setEventFilter(e.target.value)}>
              {['alle', ...new Set(registrations.map((r) => r.event))].map((e) => <option key={e}>{e}</option>)}
            </select>
            <select className="border rounded px-3 py-2" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as 'alle' | RegistrationStatus)}>
              {['alle', 'neu', 'bestätigt', 'warteliste'].map((s) => <option key={s}>{s}</option>)}
            </select>
            <select className="border rounded px-3 py-2" value={teamFilter} onChange={(e) => setTeamFilter(e.target.value)}>
              {['alle', ...new Set(registrations.map((r) => r.preferredTeam))].map((team) => <option key={team}>{team}</option>)}
            </select>
            <select className="border rounded px-3 py-2" value={ageSort} onChange={(e) => setAgeSort(e.target.value as 'asc' | 'desc')}>
              <option value="asc">Alter ↑</option><option value="desc">Alter ↓</option>
            </select>
            <select className="border rounded px-3 py-2" value={timeSort} onChange={(e) => setTimeSort(e.target.value as 'asc' | 'desc')}>
              <option value="desc">Zeitpunkt neueste zuerst</option><option value="asc">Zeitpunkt älteste zuerst</option>
            </select>
          </div>

          <div className="overflow-auto border rounded-lg">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50"><tr>{['', 'Name', 'Event', 'Alter', 'Zeitpunkt', 'Status', 'Teamwunsch'].map((h) => <th className="text-left p-2" key={h}>{h}</th>)}</tr></thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-t">
                    <td className="p-2"><input type="checkbox" checked={selectedIds.includes(r.id)} onChange={() => setSelectedIds((prev) => prev.includes(r.id) ? prev.filter((id) => id !== r.id) : [...prev, r.id])} /></td>
                    <td className="p-2">{r.name}</td><td className="p-2">{r.event}</td><td className="p-2">{r.age}</td><td className="p-2">{new Date(r.createdAt).toLocaleString('de-DE')}</td><td className="p-2">{r.status}</td><td className="p-2">{r.preferredTeam}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button size="sm" onClick={() => handleExport('csv')}>Tool 2: Export CSV</Button>
            <Button size="sm" variant="secondary" onClick={() => handleExport('json')}>Tool 2: Export JSON</Button>
            <Button size="sm" variant="accent" onClick={sendToPlanner}>In Turnierplaner importieren</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white text-black border-2 border-black">
        <CardHeader><CardTitle>Tool 3: Turnierplaner</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4 items-center">
            <select className="border rounded px-3 py-2" value={format} onChange={(e) => setFormat(e.target.value as TournamentFormat)}>
              <option value="single-elimination">Single-Elimination</option>
              <option value="group-stage">Gruppenphase (Start)</option>
            </select>
            <p>{plannerInput.length} importierte Anmeldungen · {plannerTeams.length} Teams erzeugt</p>
          </div>

          {format === 'group-stage' && (
            <div className="grid md:grid-cols-2 gap-3">
              {plannerTeams.map((team, index) => (
                <div key={team.name} className="border rounded p-3">
                  <p className="font-bold">Gruppe {String.fromCharCode(65 + (index % 4))} · {team.name}</p>
                  <p className="text-sm text-gray-600">{team.players.join(', ')}</p>
                </div>
              ))}
            </div>
          )}

          {format === 'single-elimination' && (
            <div className="space-y-2">
              {renderBrackets(plannerTeams).map(([home, away], i) => (
                <div key={i} className="border rounded p-3 flex justify-between">
                  <span>{home?.name ?? 'Freilos'}</span>
                  <span>vs.</span>
                  <span>{away?.name ?? 'Freilos'}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
