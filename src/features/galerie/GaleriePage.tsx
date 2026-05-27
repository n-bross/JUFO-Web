import { useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { galleryCategories, galleryImages, type GalleryCategory, type GalleryImage } from '@/data/gallery';

const formatDate = (value: string) => new Intl.DateTimeFormat('de-DE', {
  day: '2-digit', month: 'long', year: 'numeric',
}).format(new Date(value));

function ImageMeta({ image }: { image: GalleryImage }) {
  return (
    <div className="mt-3 text-sm text-black/70 space-y-0.5">
      <p><span className="font-semibold text-black">Titel:</span> {image.title}</p>
      <p><span className="font-semibold text-black">Datum:</span> {formatDate(image.date)}</p>
      <p><span className="font-semibold text-black">Fotograf:</span> {image.photographer}</p>
      <p><span className="font-semibold text-black">Event:</span> {image.event}</p>
    </div>
  );
}

export default function GaleriePage() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | 'Alle'>('Alle');
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);

  const filteredImages = useMemo(
    () => activeCategory === 'Alle'
      ? galleryImages
      : galleryImages.filter((image) => image.category === activeCategory),
    [activeCategory],
  );

  return (
    <div className="pt-28 pb-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-8">
          <p className="text-sm font-bold text-black/50 uppercase tracking-widest mb-2">Einblicke</p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Galerie</h1>
          <p className="mt-3 text-black/70 max-w-2xl">
            Fotos aus unseren Events, Workshops und Turnieren – inklusive strukturierter Bilddaten für
            Event-Bezug und Urheberrechte.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {galleryCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-sm font-bold rounded-full border-2 border-black transition ${
                activeCategory === category ? 'bg-black text-white' : 'bg-white text-black hover:bg-black/5'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <button
              key={image.id}
              onClick={() => setActiveImage(image)}
              className="text-left rounded-2xl border-2 border-black p-3 bg-white shadow-[3px_3px_0_#000] hover:-translate-y-1 transition"
            >
              <div className="h-52 overflow-hidden rounded-xl bg-black">
                <picture>
                  {image.image.webp && <source srcSet={image.image.webp} type="image/webp" />}
                  <img
                    src={image.image.src}
                    alt={image.image.alt}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </picture>
              </div>
              <ImageMeta image={image} />
              <p className="mt-2 text-xs uppercase tracking-wider font-bold text-black/50">{image.category}</p>
            </button>
          ))}
        </div>
      </div>

      {activeImage && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 px-4 py-6 flex items-center justify-center"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-white rounded-2xl border-2 border-black p-4 md:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full border-2 border-black flex items-center justify-center"
              aria-label="Lightbox schließen"
            >
              <X className="w-4 h-4" />
            </button>
            <picture>
              {activeImage.image.webp && <source srcSet={activeImage.image.webp} type="image/webp" />}
              <img
                src={activeImage.image.src}
                alt={activeImage.image.alt}
                className="w-full max-h-[65vh] object-cover rounded-xl"
              />
            </picture>
            <ImageMeta image={activeImage} />
          </div>
        </div>
      )}
    </div>
  );
}
