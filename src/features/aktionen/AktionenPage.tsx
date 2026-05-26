import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Clock, Users, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { EventCard } from './EventCard';
import { events, formatDate, type JufoEvent } from '@/data/events';

type Filter = 'alle' | 'workshop' | 'event' | 'social' | 'sport';

const filterLabels: Record<Filter, string> = {
  alle: 'Alle',
  workshop: 'Workshops',
  event: 'Events',
  social: 'Social',
  sport: 'Sport',
};

function RegisterModal({
  event,
  onClose,
}: {
  event: JufoEvent;
  onClose: () => void;
}) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative bg-white rounded-[1.5rem] border-2 border-black shadow-[6px_6px_0_#000] w-full max-w-md overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 transition-colors z-10"
          aria-label="Schließen"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <>
            <div className="h-36 relative overflow-hidden">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-5 text-white">
                <h2 className="text-xl font-extrabold">{event.title}</h2>
                <div className="flex items-center gap-3 text-xs mt-1 text-white/80">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(event.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {event.time} Uhr
                  </span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider">
                  Dein Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full border-2 border-black rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow transition-shadow"
                  placeholder="Max Mustermann"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider">
                  E-Mail Adresse *
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full border-2 border-black rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow transition-shadow"
                  placeholder="max@beispiel.de"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider">
                  Anmerkung (optional)
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  rows={2}
                  className="w-full border-2 border-black rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow transition-shadow resize-none"
                  placeholder="Fragen oder Besonderheiten?"
                />
              </div>
              {event.spotsLeft != null && (
                <p className="text-xs text-black/50 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  Noch {event.spotsLeft} Plätze verfügbar
                </p>
              )}
              <Button
                type="submit"
                variant="accent"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Wird gesendet...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Anmeldung absenden
                  </span>
                )}
              </Button>
            </form>
          </>
        ) : (
          <div className="p-8 flex flex-col items-center text-center gap-5">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center border-2 border-green-500">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-extrabold">Anmeldung erfolgreich!</h3>
              <p className="text-sm text-black/60 leading-relaxed">
                Danke, <strong>{form.name}</strong>! Wir haben deine Anmeldung für <strong>{event.title}</strong> erhalten
                und melden uns per E-Mail an <strong>{form.email}</strong>.
              </p>
            </div>
            <div className="bg-brand-yellow rounded-xl border-2 border-black p-4 w-full text-left space-y-1.5">
              <p className="text-xs font-bold uppercase tracking-wider">Details</p>
              <p className="text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4" /> {formatDate(event.date)}, {event.time} Uhr
              </p>
              <p className="text-sm font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4" /> {event.location}
              </p>
            </div>
            <Button variant="primary" className="w-full" onClick={onClose}>
              Schließen
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function AktionenPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>('alle');
  const [registerEvent, setRegisterEvent] = useState<JufoEvent | null>(null);

  const filtered =
    activeFilter === 'alle'
      ? events
      : events.filter((e) => e.category === activeFilter);

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-yellow rounded-full -z-10" />
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-bold text-black/50 uppercase tracking-widest mb-3">Jufo Grafing</p>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              Unsere<br />Aktionen
            </h1>
            <p className="mt-4 text-base text-black/60 max-w-lg leading-relaxed">
              Von Workshops über Events bis hin zu Sportturnieren – hier findest du alle Aktionen des
              Jugendforums Grafing. Meld dich an und sei dabei!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="px-6 mb-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-2 flex-wrap">
            {(Object.keys(filterLabels) as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-bold border-2 border-black transition-all ${
                  activeFilter === f
                    ? 'bg-black text-white shadow-[2px_2px_0_#FFC300]'
                    : 'bg-white text-black hover:bg-black/5'
                }`}
              >
                {filterLabels[f]}
              </button>
            ))}
            <span className="ml-auto text-sm text-black/40 font-medium">
              {filtered.length} {filtered.length === 1 ? 'Aktion' : 'Aktionen'}
            </span>
          </div>
        </div>
      </section>

      {/* Event Grid */}
      <section className="px-6 pb-20">
        <div className="max-w-[1200px] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onRegister={setRegisterEvent}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-black/40">
              <p className="text-5xl mb-4">🤷</p>
              <p className="font-bold text-lg">Keine Aktionen in dieser Kategorie</p>
              <p className="text-sm mt-1">Schau bald wieder vorbei!</p>
            </div>
          )}
        </div>
      </section>

      {/* Register Modal */}
      <AnimatePresence>
        {registerEvent && (
          <RegisterModal
            event={registerEvent}
            onClose={() => setRegisterEvent(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
