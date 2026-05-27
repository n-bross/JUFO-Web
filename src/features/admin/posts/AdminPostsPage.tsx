import { FormEvent, useMemo, useState } from 'react';
import { getPosts, Post, PostStatus, upsertPost } from '@/data/posts';

type FormState = Pick<Post, 'title' | 'slug' | 'excerpt' | 'content' | 'cover_image' | 'author' | 'status'>;

const initialForm: FormState = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  cover_image: '',
  author: '',
  status: 'draft',
};

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>(() => getPosts());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(initialForm);

  const sorted = useMemo(
    () => [...posts].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()),
    [posts]
  );

  const reset = () => {
    setEditingId(null);
    setForm(initialForm);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const now = new Date().toISOString();
    const previous = posts.find((p) => p.id === editingId);
    const next: Post = {
      id: editingId ?? crypto.randomUUID(),
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt,
      content: form.content,
      cover_image: form.cover_image,
      author: form.author,
      status: form.status,
      published_at: form.status === 'published' ? previous?.published_at ?? now : null,
      created_at: previous?.created_at ?? now,
      updated_at: now,
    };

    upsertPost(next);
    setPosts(getPosts());
    reset();
  };

  const editPost = (post: Post) => {
    setEditingId(post.id);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      cover_image: post.cover_image,
      author: post.author,
      status: post.status,
    });
  };

  return (
    <section className="max-w-[1100px] mx-auto px-6 pt-28 pb-20 grid md:grid-cols-[1.1fr_1fr] gap-8">
      <div>
        <h1 className="text-4xl font-extrabold mb-2">Admin · Posts</h1>
        <p className="text-black/60 mb-8">Erstellen, bearbeiten und veröffentlichen.</p>

        <form onSubmit={onSubmit} className="space-y-4 border-2 border-black rounded-2xl p-5">
          {(['title', 'slug', 'author', 'cover_image'] as const).map((field) => (
            <input
              key={field}
              required={field !== 'cover_image'}
              value={form[field]}
              onChange={(e) => setForm((old) => ({ ...old, [field]: e.target.value }))}
              placeholder={field}
              className="w-full border-2 border-black rounded-lg px-3 py-2"
            />
          ))}
          <textarea required value={form.excerpt} onChange={(e) => setForm((old) => ({ ...old, excerpt: e.target.value }))} placeholder="excerpt" className="w-full border-2 border-black rounded-lg px-3 py-2 min-h-20" />
          <textarea required value={form.content} onChange={(e) => setForm((old) => ({ ...old, content: e.target.value }))} placeholder="content" className="w-full border-2 border-black rounded-lg px-3 py-2 min-h-40" />

          <div className="flex gap-2">
            {(['draft', 'published'] as PostStatus[]).map((status) => (
              <button type="button" key={status} onClick={() => setForm((old) => ({ ...old, status }))} className={`px-3 py-2 rounded-lg border-2 border-black font-semibold ${form.status === status ? 'bg-brand-yellow' : 'bg-white'}`}>
                {status === 'draft' ? 'Entwurf' : 'Veröffentlicht'}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button type="submit" className="px-4 py-2 border-2 border-black rounded-lg font-bold bg-brand-yellow">{editingId ? 'Aktualisieren' : 'Post erstellen'}</button>
            {editingId && <button type="button" onClick={reset} className="px-4 py-2 border-2 border-black rounded-lg">Abbrechen</button>}
          </div>
        </form>
      </div>

      <div className="space-y-3">
        {sorted.map((post) => (
          <article key={post.id} className="border-2 border-black rounded-xl p-4 bg-white">
            <p className="text-xs uppercase text-black/60">{post.status === 'draft' ? 'Entwurf' : 'Veröffentlicht'}</p>
            <h2 className="font-extrabold text-xl mt-1">{post.title}</h2>
            <p className="text-sm text-black/70 mt-2">/{post.slug}</p>
            <div className="mt-3 flex gap-2">
              <button onClick={() => editPost(post)} className="px-3 py-1.5 border-2 border-black rounded-lg text-sm font-semibold">Bearbeiten</button>
              {post.status !== 'published' && (
                <button
                  onClick={() => {
                    upsertPost({ ...post, status: 'published', published_at: new Date().toISOString(), updated_at: new Date().toISOString() });
                    setPosts(getPosts());
                  }}
                  className="px-3 py-1.5 border-2 border-black rounded-lg text-sm font-semibold bg-brand-yellow"
                >
                  Veröffentlichen
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
