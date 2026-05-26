import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Lightbulb, Vote, Users, Megaphone } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const values = [
  {
    icon: <Vote className="w-6 h-6" />,
    title: 'Demokratie leben',
    description: 'Wir sind demokratisch gewählt und vertreten die Stimmen junger Grafinger gegenüber dem Stadtrat.',
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: 'Ideen umsetzen',
    description: 'Wir bringen Ideen von Jugendlichen in die Stadtpolitik ein und setzen konkrete Projekte um.',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Gemeinschaft stärken',
    description: 'Durch Events und Aktionen schaffen wir Begegnungen und stärken den Zusammenhalt in Grafing.',
  },
  {
    icon: <Megaphone className="w-6 h-6" />,
    title: 'Laut sein',
    description: 'Wir machen Jugendthemen sichtbar und sorgen dafür, dass junge Stimmen gehört werden.',
  },
];

const timeline = [
  { year: '2018', event: 'Gründung des Jugendforums Grafing auf Initiative der Stadtjugendpflege.' },
  { year: '2019', event: 'Erste eigenständige Jugendnacht mit über 100 Teilnehmerinnen und Teilnehmern.' },
  { year: '2021', event: 'Beteiligung am Stadtentwicklungsplan: Jufo-Ideen fließen offiziell ein.' },
  { year: '2023', event: 'Neugestaltung des Skaterparks – ein Jufo-Projekt wird Wirklichkeit.' },
  { year: '2025', event: 'Erweiterung auf 50+ aktive Mitglieder, mehr Aktionen denn je.' },
];

export default function UeberUnsPage() {
  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <section className="relative py-16 px-6 overflow-hidden bg-brand-black text-white">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-brand-yellow/20 rounded-full" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-brand-lilac/20 rounded-full" />
        <div className="max-w-[1200px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-bold text-brand-yellow uppercase tracking-widest mb-3">Wer wir sind</p>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              Über das<br />Jugendforum<br />Grafing
            </h1>
            <p className="mt-5 text-white/70 max-w-lg leading-relaxed text-base">
              Ein gewähltes Gremium junger Menschen, das sich für die Interessen von Jugendlichen
              in Grafing einsetzt – mit Herzblut, Energie und konkreten Ideen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-6">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <p className="text-sm font-bold text-black/50 uppercase tracking-widest">Unsere Mission</p>
            <h2 className="text-4xl font-extrabold leading-tight">
              Grafing durch<br />Jugend stärken
            </h2>
            <p className="text-black/65 leading-relaxed">
              Das Jugendforum Grafing wurde gegründet, um jungen Menschen eine politische Stimme zu geben.
              Wir sind kein Verein im klassischen Sinne – wir sind ein demokratisch legitimiertes Gremium,
              das direkt mit dem Grafinger Stadtrat zusammenarbeitet.
            </p>
            <p className="text-black/65 leading-relaxed">
              Unsere Themen reichen von Freizeitangeboten und öffentlichem Nahverkehr bis hin zu
              Klimaschutz und digitaler Infrastruktur. Alles, was das Leben in Grafing für junge Menschen
              besser macht, interessiert uns.
            </p>
            <Button asChild variant="accent">
              <Link to="/mitmachen">
                Werde Teil des Jufo <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            <div className="rounded-[2rem] overflow-hidden border-2 border-black shadow-[6px_6px_0_#000] h-72 md:h-80">
              <img
                src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80"
                alt="Jugendforum Treffen"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-brand-lilac rounded-[1rem] border-2 border-black shadow-[4px_4px_0_#000] px-5 py-3">
              <p className="text-sm font-extrabold">Aktiv seit 2018</p>
              <p className="text-xs text-black/60">in Grafing, Bayern</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 bg-[#F5F3EF]">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-sm font-bold text-black/50 uppercase tracking-widest mb-2">Was uns antreibt</p>
            <h2 className="text-4xl md:text-5xl font-extrabold">Unsere Werte</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-[1.5rem] border-2 border-black shadow-[4px_4px_0_#000] p-6 flex gap-4 hover:-translate-y-1 hover:shadow-[6px_6px_0_#000] transition-all"
              >
                <div className="w-12 h-12 bg-brand-yellow rounded-xl border-2 border-black flex items-center justify-center flex-shrink-0">
                  {val.icon}
                </div>
                <div>
                  <h3 className="font-extrabold text-base mb-1.5">{val.title}</h3>
                  <p className="text-sm text-black/60 leading-relaxed">{val.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="text-sm font-bold text-black/50 uppercase tracking-widest mb-2">Geschichte</p>
            <h2 className="text-4xl md:text-5xl font-extrabold">Unser Weg</h2>
          </motion.div>

          <div className="relative pl-8 border-l-2 border-black space-y-10">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-[2.55rem] top-0 w-5 h-5 bg-brand-yellow rounded-full border-2 border-black" />
                <div className="bg-white rounded-[1rem] border-2 border-black shadow-[3px_3px_0_#000] p-5">
                  <span className="text-xs font-extrabold text-brand-black/40 uppercase tracking-wider">{item.year}</span>
                  <p className="mt-1 font-semibold text-sm leading-relaxed">{item.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="py-20 px-6 bg-brand-black text-white">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-5 max-w-xl mx-auto"
          >
            <h2 className="text-4xl font-extrabold">Wie wir arbeiten</h2>
            <p className="text-white/70 leading-relaxed">
              Wir treffen uns regelmäßig im Jugendtreff Grafing. Bei unseren Treffen besprechen wir aktuelle
              Themen, planen Events und stimmen über Ideen ab. Alle Mitglieder haben eine Stimme – egal wie
              lange sie dabei sind.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              {[
                { icon: '📅', label: 'Regelmäßige Treffen', sub: 'im Jugendtreff Grafing' },
                { icon: '🗳️', label: 'Demokratisch', sub: 'Alle Mitglieder entscheiden mit' },
                { icon: '🚀', label: 'Projektorientiert', sub: 'Ideen werden umgesetzt' },
              ].map((item, i) => (
                <div key={i} className="bg-white/10 rounded-xl p-5 text-center">
                  <span className="text-3xl">{item.icon}</span>
                  <p className="font-bold text-sm mt-2">{item.label}</p>
                  <p className="text-xs text-white/50 mt-1">{item.sub}</p>
                </div>
              ))}
            </div>
            <Button asChild variant="accent" size="lg" className="mt-4">
              <Link to="/mitmachen">
                Jetzt mitmachen <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
