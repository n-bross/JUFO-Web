export type PostStatus = 'draft' | 'published';

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  published_at: string | null;
  author: string;
  status: PostStatus;
  created_at: string;
  updated_at: string;
};

const STORAGE_KEY = 'jufo_posts';

const seedPosts: Post[] = [
  {
    id: '1',
    title: 'Jugendbeteiligung 2026 gestartet',
    slug: 'jugendbeteiligung-2026-gestartet',
    excerpt: 'Mit neuen Workshops und Mitmachformaten startet das Jugendforum in das Jahr 2026.',
    content:
      'Wir starten mit frischen Ideen in das neue Jahr. In mehreren Workshops sammeln wir eure Vorschläge für Grafing und setzen erste Projekte direkt gemeinsam um.',
    cover_image:
      '/images/unsplash/photo-1521737604893-d14cc237f11d-w1200.webp',
    published_at: '2026-04-10T09:30:00.000Z',
    author: 'JuFo Team',
    status: 'published',
    created_at: '2026-04-07T09:00:00.000Z',
    updated_at: '2026-04-10T09:30:00.000Z',
  },
];

const hasWindow = typeof window !== 'undefined';

export function getPosts(): Post[] {
  if (!hasWindow) return seedPosts;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedPosts));
    return seedPosts;
  }

  try {
    const stored = JSON.parse(raw) as Post[];
    // Ältere Browser-Speicherstände verweisen beim Beispielbeitrag noch auf ein extern
    // gehostetes Titelbild. Auf die lokal ausgelieferte Datei umstellen, damit kein
    // Request an einen Drittanbieter entsteht.
    let migrated = false;
    const next = stored.map((post) => {
      const seed = seedPosts.find((s) => s.id === post.id && s.slug === post.slug);
      if (seed && /^https?:\/\//.test(post.cover_image) && post.cover_image !== seed.cover_image) {
        migrated = true;
        return { ...post, cover_image: seed.cover_image };
      }
      return post;
    });
    if (migrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return next;
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedPosts));
    return seedPosts;
  }
}

function savePosts(posts: Post[]) {
  if (!hasWindow) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export function upsertPost(post: Post) {
  const posts = getPosts();
  const exists = posts.find((p) => p.id === post.id);
  const next = exists ? posts.map((p) => (p.id === post.id ? post : p)) : [post, ...posts];
  savePosts(next);
}

export function getPostBySlug(slug: string) {
  return getPosts().find((post) => post.slug === slug);
}

export function getLatestPublishedPosts(limit = 3) {
  return getPosts()
    .filter((post) => post.status === 'published' && post.published_at)
    .sort((a, b) => new Date(b.published_at ?? 0).getTime() - new Date(a.published_at ?? 0).getTime())
    .slice(0, limit);
}

export function getPublishedPosts() {
  return getPosts()
    .filter((post) => post.status === 'published' && post.published_at)
    .sort((a, b) => new Date(b.published_at ?? 0).getTime() - new Date(a.published_at ?? 0).getTime());
}
