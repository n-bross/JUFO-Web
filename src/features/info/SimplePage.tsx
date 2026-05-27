import type { ReactNode } from 'react';

type Section = {
  title: string;
  content: ReactNode;
};

export default function SimplePage({ title, intro, sections }: { title: string; intro: string; sections: Section[] }) {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">{title}</h1>
          <p className="text-black/70 leading-relaxed">{intro}</p>
        </header>

        <div className="space-y-6">
          {sections.map((section) => (
            <section key={section.title} className="bg-white border-2 border-black rounded-2xl p-6 space-y-3">
              <h2 className="text-xl font-extrabold">{section.title}</h2>
              <div className="text-black/80 leading-relaxed">{section.content}</div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
