import { Link, Navigate, useParams } from 'react-router-dom';
import { getPostBySlug } from '@/data/posts';

export default function NewsDetailPage() {
  const { slug = '' } = useParams();
  const post = getPostBySlug(slug);

  if (!post || post.status !== 'published') return <Navigate to="/news" replace />;

  return (
    <article className="max-w-[900px] mx-auto px-6 pt-28 pb-20">
      <Link to="/news" className="text-sm font-bold underline">← Zurück zur News-Übersicht</Link>
      <h1 className="text-4xl md:text-5xl font-extrabold mt-5 mb-3">{post.title}</h1>
      <p className="text-black/60 mb-8">{new Date(post.published_at ?? '').toLocaleDateString('de-DE')} · {post.author}</p>
      {post.cover_image && <img src={post.cover_image} alt={post.title} className="w-full h-72 object-cover rounded-2xl border-2 border-black mb-8" />}
      <p className="text-lg leading-relaxed whitespace-pre-wrap">{post.content}</p>
    </article>
  );
}
