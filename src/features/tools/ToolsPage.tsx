import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, CalendarDays, ArrowRight, Wrench } from 'lucide-react';

const tools = [
  {
    href: '/tools/turnier',
    icon: <Trophy className="w-8 h-8" />,
    title: 'Turnierplanner',
    description:
      'Erstelle und verwalte Turniere – Single Elimination oder Round Robin. Trage Ergebnisse ein und verfolge den Bracket live.',
    color: 'bg-brand-yellow',
    badge: 'Verfügbar',
  },
  {
    href: '/tools/events',
    icon: <CalendarDays className="w-8 h-8" />,
    title: 'Event-Verwaltung',
    description:
      'Erstelle neue Events und Aktionen für die öffentliche Website. Verwalte Termine, Beschreibungen und Anmeldungen.',
    color: 'bg-brand-lilac',
    badge: 'Verfügbar',
  },
];

export default function ToolsPage() {
  return (
    <div className="pt-16 min-h-screen">
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-yellow rounded-full -z-10 opacity-60" />
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-brand-black text-brand-yellow rounded-xl border-2 border-black flex items-center justify-center">
                <Wrench className="w-5 h-5" />
              </div>
              <p className="text-sm font-bold text-black/50 uppercase tracking-widest">Mitglieder-Bereich</p>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">Tools</h1>
            <p className="mt-4 text-base text-black/60 max-w-lg leading-relaxed">
              Hier findest du alle internen Werkzeuge des Jugendforums Grafing.
              Nur für eingeloggte Mitglieder sichtbar.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.href}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={tool.href} className="block group">
                <div className="bg-white rounded-[2rem] border-2 border-black shadow-[5px_5px_0_#000] p-7 h-full hover:-translate-y-1 hover:shadow-[7px_7px_0_#000] transition-all">
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-16 h-16 ${tool.color} rounded-2xl border-2 border-black flex items-center justify-center shadow-[3px_3px_0_#000]`}>
                      {tool.icon}
                    </div>
                    <span className="text-xs font-bold bg-green-100 text-green-700 border border-green-300 px-3 py-1 rounded-full">
                      {tool.badge}
                    </span>
                  </div>
                  <h2 className="text-2xl font-extrabold mb-2">{tool.title}</h2>
                  <p className="text-sm text-black/60 leading-relaxed mb-5">{tool.description}</p>
                  <div className="flex items-center gap-1.5 text-sm font-bold group-hover:gap-2.5 transition-all">
                    Öffnen <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
