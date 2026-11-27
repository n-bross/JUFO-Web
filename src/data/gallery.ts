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
      src: '/images/unsplash/photo-1529156069898-49953e39b3ac-w1400.webp',
      webp: '/images/unsplash/photo-1529156069898-49953e39b3ac-w1400.webp',
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
      src: '/images/unsplash/photo-1517048676732-d65bc937f952-w1400.webp',
      webp: '/images/unsplash/photo-1517048676732-d65bc937f952-w1400.webp',
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
      src: '/images/unsplash/photo-1511882150382-421056c89033-w1400.webp',
      webp: '/images/unsplash/photo-1511882150382-421056c89033-w1400.webp',
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
      src: '/images/unsplash/photo-1478720568477-152d9b164e26-w1400.webp',
      webp: '/images/unsplash/photo-1478720568477-152d9b164e26-w1400.webp',
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
      src: '/images/unsplash/photo-1552664730-d307ca884978-w1400.webp',
      webp: '/images/unsplash/photo-1552664730-d307ca884978-w1400.webp',
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
      src: '/images/unsplash/photo-1547347298-4074fc3086f0-w1400.webp',
      webp: '/images/unsplash/photo-1547347298-4074fc3086f0-w1400.webp',
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
      src: '/images/unsplash/photo-1494172961521-33799ddd43a5-w1400.webp',
      webp: '/images/unsplash/photo-1494172961521-33799ddd43a5-w1400.webp',
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
      src: '/images/unsplash/photo-1589903308904-1010c2294adc-w1400.webp',
      webp: '/images/unsplash/photo-1589903308904-1010c2294adc-w1400.webp',
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
      src: '/images/unsplash/photo-1542751371-adc38448a05e-w1400.webp',
      webp: '/images/unsplash/photo-1542751371-adc38448a05e-w1400.webp',
      alt: 'Gaming-Stationen bei einem Jugendturnier',
    },
  },
];
