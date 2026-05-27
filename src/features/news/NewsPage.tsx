import { Link } from 'react-router-dom';
import { getPublishedPosts } from '@/data/posts';

export default function NewsPage() {
  const posts = getPublishedPosts();

  return (
    <section className="max-w-[1000px] mx-auto px-6 pt-28 pb-20">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-3">News</h1>
      <p className="text-black/60 mb-10">Aktuelles aus dem Jugendforum Grafing.</p>

      <div className="grid gap-6">
        {posts.map((post) => (
          <article key={post.id} className="border-2 border-black rounded-2xl overflow-hidden bg-white shadow-[4px_4px_0_#000]">
            {post.cover_image && <img src={post.cover_image} alt={post.title} className="w-full h-56 object-cover" />}
            <div className="p-6">
              <p className="text-xs uppercase tracking-wider text-black/50 mb-2">
                {new Date(post.published_at ?? '').toLocaleDateString('de-DE')} · {post.author}
              </p>
              <h2 className="text-2xl font-extrabold mb-2">{post.title}</h2>
              <p className="text-black/70 mb-4">{post.excerpt}</p>
              <Link className="font-bold underline" to={`/news/${post.slug}`}>Zum Beitrag</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
