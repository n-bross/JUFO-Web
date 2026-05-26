export type EventCategory = 'workshop' | 'event' | 'meeting' | 'social' | 'sport';

export interface JufoEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  endTime?: string;
  location: string;
  address?: string;
  description: string;
  longDescription?: string;
  category: EventCategory;
  spots?: number;
  spotsLeft?: number;
  image: string;
  registrationOpen: boolean;
}

export const categoryLabels: Record<EventCategory, string> = {
  workshop: 'Workshop',
  event: 'Event',
  meeting: 'Treffen',
  social: 'Social',
  sport: 'Sport',
};

export const categoryColors: Record<EventCategory, string> = {
  workshop: 'bg-brand-lilac text-black',
  event: 'bg-brand-yellow text-black',
  meeting: 'bg-white text-black',
  social: 'bg-pink-200 text-black',
  sport: 'bg-green-200 text-black',
};

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('de-DE', { day: 'numeric', month: 'short' });
}

export const events: JufoEvent[] = [
  {
    id: 'stadtrat-besuch-2026',
    title: 'Stadtrat-Besuch',
    date: '2026-06-10',
    time: '18:00',
    endTime: '20:00',
    location: 'Rathaus Grafing',
    address: 'Rathausplatz 1, 85567 Grafing',
    description: 'Erlebe live, wie Politik in Grafing gemacht wird. Wir besuchen eine Stadtratssitzung und diskutieren danach über unsere Ideen.',
    longDescription: 'Hast du dich schon mal gefragt, wie Entscheidungen in Grafing getroffen werden? Beim Stadtrat-Besuch schauen wir gemeinsam hinter die Kulissen der Lokalpolitik. Wir sitzen live in einer Stadtratssitzung und lernen, wie wir als Jugendforum unsere eigenen Anträge einbringen können.',
    category: 'event',
    spots: 20,
    spotsLeft: 8,
    image: 'https://images.unsplash.com/photo-1577415124269-fc1140a69e91?auto=format&fit=crop&w=800&q=80',
    registrationOpen: true,
  },
  {
    id: 'workshop-mein-grafing',
    title: 'Workshop: Mein Grafing 2030',
    date: '2026-06-24',
    time: '15:00',
    endTime: '18:00',
    location: 'Jugendtreff Grafing',
    address: 'Bahnhofstr. 5, 85567 Grafing',
    description: 'Wie soll Grafing in 10 Jahren aussehen? In diesem Workshop entwickeln wir gemeinsam Ideen für mehr Lebensqualität für Jugendliche.',
    longDescription: 'Was fehlt dir in Grafing? Mehr Treffpunkte, bessere Radwege, mehr Events? In diesem kreativen Workshop sammeln wir eure Ideen und erarbeiten konkrete Vorschläge, die wir an die Stadtpolitik weitergeben. Eure Stimme zählt!',
    category: 'workshop',
    spots: 25,
    spotsLeft: 12,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
    registrationOpen: true,
  },
  {
    id: 'sommerfest-2026',
    title: 'Sommerfest am See',
    date: '2026-07-12',
    time: '14:00',
    endTime: '22:00',
    location: 'Grünsee Grafing',
    description: 'Unser jährliches Sommerfest mit Musik, Grillen, Volleyball und jeder Menge Spaß. Für alle Jugendlichen aus Grafing und Umgebung!',
    longDescription: 'Das größte Event des Jahres! Komm mit Freunden ans Wasser, grill mit uns, höre Live-Musik und mach mit bei unseren Sportevents. Eintritt frei, Anmeldung hilft uns bei der Planung.',
    category: 'social',
    spots: 150,
    spotsLeft: 87,
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80',
    registrationOpen: true,
  },
  {
    id: 'basketball-turnier-2026',
    title: '3×3 Basketball-Turnier',
    date: '2026-07-26',
    time: '10:00',
    endTime: '17:00',
    location: 'Sportanlage Grafing-Bahnhof',
    address: 'Am Sportplatz 3, 85567 Grafing',
    description: 'Meld dich mit deinem Team für unser großes 3×3 Basketball-Turnier an. Für alle Levels, Anfänger ausdrücklich willkommen!',
    longDescription: 'Teams aus 3 Personen treten gegeneinander an. Wir spielen nach offiziellen FIBA 3x3-Regeln. Es gibt Pokale für die Top-3-Teams und Preise für alle Teilnehmer. Anmeldung als Team oder Einzelperson (wir suchen dann ein Team für dich).',
    category: 'sport',
    spots: 48,
    spotsLeft: 24,
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80',
    registrationOpen: true,
  },
  {
    id: 'jugendnacht-2026',
    title: 'Jugendnacht Grafing',
    date: '2026-09-05',
    time: '20:00',
    endTime: '00:00',
    location: 'Kulturhalle Grafing',
    description: 'Eine Nacht voller Musik, Tanz und Begegnungen. Mit lokalen Bands und DJs aus der Region.',
    longDescription: 'Die Jugendnacht Grafing ist unser jährliches Highlight! Lokale Bands und DJs sorgen für die Musik. Wir organisieren Spiele, Workshops und eine Fotobox. Junge Menschen ab 14 Jahren sind herzlich willkommen.',
    category: 'social',
    spots: 200,
    spotsLeft: 134,
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    registrationOpen: false,
  },
  {
    id: 'planspiel-lokalpolitik',
    title: 'Planspiel: Lokalpolitik',
    date: '2026-10-17',
    time: '09:00',
    endTime: '17:00',
    location: 'Realschule Grafing',
    address: 'Schulweg 2, 85567 Grafing',
    description: 'In diesem ganztägigen Planspiel simulieren wir eine Stadtratssitzung. Du lernst, wie Anträge funktionieren und Mehrheiten entstehen.',
    longDescription: 'Dieses ganztägige Planspiel gibt dir einen tiefen Einblick in die Mechanismen der Lokalpolitik. Du übernimmst eine Rolle im fiktiven Stadtrat und vertrittst eine Fraktion. Am Ende weißt du, wie politische Entscheidungen wirklich getroffen werden.',
    category: 'workshop',
    spots: 30,
    spotsLeft: 22,
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    registrationOpen: false,
  },
];
