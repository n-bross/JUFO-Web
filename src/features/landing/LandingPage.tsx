import { Link } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Users, Calendar, MapPin, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { BearSilhouette } from '@/components/ui/BearSilhouette';
import { EventCard } from '@/features/aktionen/EventCard';
import { events } from '@/data/events';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const upcomingEvents = events.filter((e) => e.registrationOpen).slice(0, 3);

const stats = [
  { value: '50+', label: 'aktive Mitglieder' },
  { value: '12', label: 'Aktionen pro Jahr' },
  { value: 'Seit 2018', label: 'in Grafing aktiv' },
];

export default function LandingPage() {
  return (
    <div className="overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────── */}
      <section className="relative pt-28 pb-24 min-h-[90vh] flex items-center">
        <div className="absolute -top-[12%] -left-[18%] w-[680px] h-[680px] bg-brand-yellow rounded-full -z-10" />
        <div className="absolute top-[2%] -right-[22%] w-[780px] h-[780px] bg-brand-yellow rounded-full -z-10" />

        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-12 items-center w-full">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 bg-white border-2 border-black rounded-full px-4 py-1.5 text-sm font-bold shadow-[2px_2px_0_#000]">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Jetzt aktiv in Grafing
              </span>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex h-32 w-32 items-center justify-center rounded-[1.5rem] border-4 border-black bg-brand-yellow shadow-[5px_5px_0_#000] md:hidden"
            >
              <BearSilhouette className="h-24 w-24 text-black" />
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-6xl md:text-[5.5rem] font-extrabold leading-[0.95] tracking-tight text-black"
            >
              Deine<br />
              Stimme.<br />
              Dein<br />
              Grafing.
            </motion.h1>

            <motion.p variants={fadeUp} className="text-base text-black/65 max-w-sm leading-relaxed">
              Das Jugendforum Grafing vertritt die Interessen junger Menschen gegenüber der Stadtpolitik.
              Wir planen Events, setzen Projekte um und gestalten Grafing aktiv mit.
            </motion.p>

            <motion.div variants={fadeUp} className="flex items-center gap-3 flex-wrap">
              <Button asChild variant="accent" size="lg">
                <Link to="/aktionen">
                  Aktionen entdecken
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="primary" size="lg">
                <Link to="/mitmachen">Mitmachen</Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative h-[460px] hidden md:flex items-center justify-center"
          >
            <div className="absolute inset-x-10 top-12 h-72 rotate-3 rounded-[2rem] border-4 border-black bg-brand-yellow shadow-[8px_8px_0_#000]" />
            <div className="absolute inset-x-20 bottom-8 h-28 -rotate-2 rounded-[1.5rem] border-4 border-black bg-white shadow-[5px_5px_0_#000]" />

            <BearSilhouette className="relative z-20 h-[360px] w-[360px] text-black drop-shadow-[8px_8px_0_rgba(0,0,0,0.18)]" />

            <div className="absolute left-0 top-20 z-30 max-w-[170px] -rotate-6 rounded-[1rem] border-2 border-black bg-white px-4 py-3 shadow-[4px_4px_0_#000]">
              <p className="text-xs font-bold uppercase tracking-wider text-black/50">Grafing</p>
              <p className="text-lg font-extrabold leading-tight">Junge Ideen sichtbar machen</p>
            </div>

            <div className="absolute right-4 bottom-24 z-30 rotate-6 rounded-[1rem] border-2 border-black bg-brand-lilac px-4 py-3 shadow-[4px_4px_0_#000]">
              <p className="text-3xl font-extrabold leading-none">50+</p>
              <p className="text-xs font-bold uppercase tracking-wider text-black/60">aktive Stimmen</p>
            </div>

            <div className="absolute left-[36%] top-[2%] z-30 h-7 w-7 rounded-full border-[3px] border-black bg-white" />
            <div className="absolute right-[12%] top-[9%] z-30 h-12 w-12 rounded-full border-4 border-black bg-brand-lilac" />
            <div className="absolute left-[8%] bottom-[12%] z-30 h-10 w-10 rounded-full border-[3px] border-black bg-brand-yellow" />
          </motion.div>
        </div>
      </section>

      {/* ── Stats Strip ───────────────────────────── */}
      <section className="bg-black text-white py-8 border-y-2 border-black">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-3 gap-4 divide-x divide-white/20">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center px-4"
              >
                <p className="text-3xl md:text-4xl font-extrabold text-brand-yellow">{stat.value}</p>
                <p className="text-xs md:text-sm text-white/60 mt-1 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Upcoming Events ───────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <p className="text-sm font-bold text-black/50 uppercase tracking-widest mb-2">Demnächst</p>
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Kommende<br />Aktionen
              </h2>
            </div>
            <Button asChild variant="ghost" className="hidden md:flex items-center gap-1.5 font-bold">
              <Link to="/aktionen">
                Alle anzeigen
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.1 }}
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex md:hidden justify-center">
            <Button asChild variant="primary">
              <Link to="/aktionen">Alle Aktionen anzeigen <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── About Teaser ──────────────────────────── */}
      <section className="py-20 px-6 bg-brand-black text-white relative overflow-hidden">
        <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-brand-yellow/10" />
        <div className="absolute -left-20 bottom-0 w-64 h-64 rounded-full bg-brand-lilac/10" />
        <BearSilhouette className="pointer-events-none absolute -bottom-24 right-4 h-80 w-80 text-white/5" />

        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <p className="text-sm font-bold text-brand-yellow uppercase tracking-widest">Über uns</p>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Was ist das<br />Jugendforum<br />Grafing?
            </h2>
            <p className="text-white/70 leading-relaxed max-w-md">
              Das Jugendforum Grafing ist ein gewähltes Gremium junger Menschen aus Grafing und Umgebung.
              Wir vertreten die Interessen von Jugendlichen gegenüber der Stadtpolitik und setzen uns für
              ein lebenswertes Grafing ein – mit konkreten Projekten, Events und politischem Engagement.
            </p>
            <div className="flex gap-8 pt-2">
              <div>
                <p className="text-2xl font-extrabold text-brand-yellow">Monatlich</p>
                <p className="text-xs text-white/50 mt-0.5">Treffen & Austausch</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-brand-yellow">Offen</p>
                <p className="text-xs text-white/50 mt-0.5">für alle 13–25 Jährigen</p>
              </div>
            </div>
            <Button asChild variant="accent" className="mt-2">
              <Link to="/ueber-uns">
                Mehr erfahren <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative h-80 hidden md:block"
          >
            <div className="w-full h-full rounded-[2rem] overflow-hidden border-4 border-white/20">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80"
                alt="Jugendforum Treffen"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-brand-yellow text-black rounded-[1rem] border-2 border-black shadow-[4px_4px_0_rgba(255,255,255,0.3)] px-5 py-3">
              <p className="text-xs font-bold uppercase tracking-wider">Nächstes Treffen</p>
              <p className="text-base font-extrabold mt-0.5 flex items-center gap-1.5">
                <Calendar className="w-4 h-4" /> Jeden Monat
              </p>
              <p className="text-xs text-black/60 flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5" /> Jugendtreff Grafing
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-14"
          >
            <p className="text-sm font-bold text-black/50 uppercase tracking-widest mb-2">So funktioniert's</p>
            <h2 className="text-4xl md:text-5xl font-extrabold">In 3 Schritten dabei</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Bewerben',
                description: 'Füll unser kurzes Bewerbungsformular aus. Alter 13–25, wohnhaft in Grafing oder Umgebung.',
                color: 'bg-brand-yellow',
              },
              {
                step: '02',
                title: 'Kennenlernen',
                description: 'Komm zu einem unserer offenen Treffen. Wir lernen uns kennen und du erfährst, wie das Jufo funktioniert.',
                color: 'bg-brand-lilac',
              },
              {
                step: '03',
                title: 'Mitmachen',
                description: 'Du bist Teil des Teams! Plane Events, bringe Ideen ein und gestalte Grafing mit.',
                color: 'bg-white',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.12 }}
                className={`${item.color} rounded-[1.5rem] border-2 border-black shadow-[4px_4px_0_#000] p-7 space-y-4 hover:-translate-y-1 hover:shadow-[6px_6px_0_#000] transition-all`}
              >
                <span className="text-5xl font-extrabold text-black/20">{item.step}</span>
                <h3 className="text-xl font-extrabold">{item.title}</h3>
                <p className="text-sm text-black/60 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────── */}
      <section className="px-6 pb-20">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            className="relative overflow-hidden bg-brand-yellow rounded-[2rem] border-2 border-black shadow-[6px_6px_0_#000] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <BearSilhouette className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 text-black/10" />
            <div className="relative z-10 space-y-3 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Logo size={40} />
                <h2 className="text-3xl md:text-4xl font-extrabold">Mach deine Stimme gehört!</h2>
              </div>
              <p className="text-black/70 max-w-md">
                Werde Teil des Jugendforums Grafing und gestalte aktiv mit.
                Deine Ideen, deine Stadt.
              </p>
              <div className="flex items-center gap-2 text-sm font-bold">
                <Users className="w-4 h-4" />
                Offen für alle 13–25 Jährigen aus Grafing
              </div>
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row gap-3">
              <Button asChild variant="secondary" size="lg">
                <Link to="/mitmachen">
                  Jetzt bewerben <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="primary" size="lg">
                <Link to="/aktionen">Aktionen entdecken</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
