export type GalleryCategory = 'Events' | 'Workshops' | 'Turniere';

export interface GalleryImage {
  id: string;
  title: string;
  date: string;
  photographer: string;
  event: string;
  category: GalleryCategory;
  image: {
    src: string;
    webp?: string;
    alt: string;
  };
}

export const galleryCategories: Array<GalleryCategory | 'Alle'> = ['Alle', 'Events', 'Workshops', 'Turniere'];

export const galleryImages: GalleryImage[] = [
  {
    id: 'e-1',
    title: 'Sommerfest am Marktplatz',
    date: '2025-07-12',
    photographer: 'Mia Schneider',
    event: 'Jufo Sommerfest',
    category: 'Events',
    image: {
      src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=80',
      webp: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=80&fm=webp',
      alt: 'Jugendliche feiern gemeinsam auf einem Stadtfest',
    },
  },
  {
    id: 'w-1',
    title: 'Design Thinking Session',
    date: '2025-10-06',
    photographer: 'Noah Bauer',
    event: 'Workshop-Woche',
    category: 'Workshops',
    image: {
      src: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1400&q=80',
      webp: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1400&q=80&fm=webp',
      alt: 'Team arbeitet an Post-its in einem Workshopraum',
    },
  },
  {
    id: 't-1',
    title: 'Kicker-Turnier Finale',
    date: '2025-11-22',
    photographer: 'Lea Brandl',
    event: 'Winter Games',
    category: 'Turniere',
    image: {
      src: 'https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&w=1400&q=80',
      webp: 'https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&w=1400&q=80&fm=webp',
      alt: 'Spannender Kicker-Moment während eines Jugendturniers',
    },
  },
  {
    id: 'e-2',
    title: 'Open-Air Kinoabend',
    date: '2024-08-30',
    photographer: 'Tim Krüger',
    event: 'Sommernächte',
    category: 'Events',
    image: {
      src: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1400&q=80',
      webp: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1400&q=80&fm=webp',
      alt: 'Open-Air Leinwand bei einem Abend-Event',
    },
  },
  {
    id: 'w-2',
    title: 'Social Media Basics',
    date: '2024-09-14',
    photographer: 'Sofia Wagner',
    event: 'Creator Lab',
    category: 'Workshops',
    image: {
      src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80',
      webp: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80&fm=webp',
      alt: 'Jugendliche diskutieren in einem Medienworkshop',
    },
  },
  {
    id: 't-2',
    title: 'Volleyball Cup',
    date: '2024-06-01',
    photographer: 'Lukas Huber',
    event: 'Sport am See',
    category: 'Turniere',
    image: {
      src: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=1400&q=80',
      webp: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=1400&q=80&fm=webp',
      alt: 'Volleyballspiel bei einem Outdoor-Turnier',
    },
  },
  {
    id: 'e-3',
    title: 'Jugenddialog im Rathaus',
    date: '2025-03-18',
    photographer: 'Julia Reiter',
    event: 'Stadtgespräch',
    category: 'Events',
    image: {
      src: 'https://images.unsplash.com/photo-1494172961521-33799ddd43a5?auto=format&fit=crop&w=1400&q=80',
      webp: 'https://images.unsplash.com/photo-1494172961521-33799ddd43a5?auto=format&fit=crop&w=1400&q=80&fm=webp',
      alt: 'Jugendliche im Gespräch bei einer öffentlichen Diskussion',
    },
  },
  {
    id: 'w-3',
    title: 'DIY Podcast Setup',
    date: '2025-01-25',
    photographer: 'Anton Meier',
    event: 'Medienwerkstatt',
    category: 'Workshops',
    image: {
      src: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?auto=format&fit=crop&w=1400&q=80',
      webp: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?auto=format&fit=crop&w=1400&q=80&fm=webp',
      alt: 'Podcast-Aufnahme mit Mikrofonen in einem Workshop',
    },
  },
  {
    id: 't-3',
    title: 'E-Sports Abend',
    date: '2025-02-15',
    photographer: 'Emilia Haas',
    event: 'Gaming Night',
    category: 'Turniere',
    image: {
      src: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1400&q=80',
      webp: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1400&q=80&fm=webp',
      alt: 'Gaming-Stationen bei einem Jugendturnier',
    },
  },
];
