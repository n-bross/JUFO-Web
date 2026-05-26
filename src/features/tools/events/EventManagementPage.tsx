import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, CalendarDays, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import {
  type JufoEvent,
  type EventCategory,
  events as defaultEvents,
  categoryLabels,
  categoryColors,
  formatDate,
} from '@/data/events';

const STORAGE_KEY = 'jufo_managed_events';

function loadEvents(): JufoEvent[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as JufoEvent[]) : defaultEvents;
  } catch {
    return defaultEvents;
  }
}

function saveEvents(evts: JufoEvent[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(evts));
}

function nanoid() {
  return Math.random().toString(36).slice(2, 10);
}

const emptyEvent = (): Partial<JufoEvent> => ({
  title: '',
  date: '',
  time: '14:00',
  location: '',
  description: '',
  category: 'event',
  spots: 30,
  spotsLeft: 30,
  image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
  registrationOpen: true,
});

function EventForm({
  initial,
  onSave,
  onClose,
}: {
  initial: Partial<JufoEvent>;
  onSave: (e: JufoEvent) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Partial<JufoEvent>>(initial);

  const set = (field: keyof JufoEvent, value: unknown) =>
    setForm((f) => ({ ...f, [field]: value }));

  const isValid = form.title?.trim() && form.date && form.location?.trim() && form.description?.trim();

  const handleSave = () => {
    if (!isValid) return;
    onSave({
      id: form.id ?? nanoid(),
      title: form.title!.trim(),
      date: form.date!,
      time: form.time ?? '14:00',
      endTime: form.endTime,
      location: form.location!.trim(),
      address: form.address,
      description: form.description!.trim(),
      longDescription: form.longDescription,
      category: form.category ?? 'event',
      spots: form.spots,
      spotsLeft: form.spotsLeft ?? form.spots,
      image: form.image ?? '',
      registrationOpen: form.registrationOpen ?? true,
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative bg-white rounded-[1.5rem] border-2 border-black shadow-[6px_6px_0_#000] w-full max-w-lg my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b-2 border-black">
          <h2 className="font-extrabold text-lg">{form.id ? 'Event bearbeiten' : 'Neues Event'}</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-black/5 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider">Titel *</label>
            <input
              type="text"
              value={form.title ?? ''}
              onChange={(e) => set('title', e.target.value)}
              className="w-full border-2 border-black rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow"
              placeholder="z.B. Stadtrat-Besuch"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider">Datum *</label>
              <input
                type="date"
                value={form.date ?? ''}
                onChange={(e) => set('date', e.target.value)}
                className="w-full border-2 border-black rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider">Uhrzeit *</label>
              <input
                type="time"
                value={form.time ?? '14:00'}
                onChange={(e) => set('time', e.target.value)}
                className="w-full border-2 border-black rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider">Ort *</label>
            <input
              type="text"
              value={form.location ?? ''}
              onChange={(e) => set('location', e.target.value)}
              className="w-full border-2 border-black rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow"
              placeholder="z.B. Rathaus Grafing"
            />
          </div>
          <div>
            <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider">Kategorie</label>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(categoryLabels) as EventCategory[]).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => set('category', cat)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all',
                    form.category === cat
                      ? `${categoryColors[cat]} border-black shadow-[2px_2px_0_#000]`
                      : 'bg-white border-black/20 hover:border-black/50'
                  )}
                >
                  {categoryLabels[cat]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider">Beschreibung *</label>
            <textarea
              rows={3}
              value={form.description ?? ''}
              onChange={(e) => set('description', e.target.value)}
              className="w-full border-2 border-black rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow resize-none"
              placeholder="Kurze Beschreibung für die Event-Karte"
            />
          </div>
          <div>
            <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider">Bild-URL</label>
            <input
              type="url"
              value={form.image ?? ''}
              onChange={(e) => set('image', e.target.value)}
              className="w-full border-2 border-black rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow"
              placeholder="https://…"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider">Plätze gesamt</label>
              <input
                type="number"
                min="1"
                value={form.spots ?? ''}
                onChange={(e) => set('spots', Number(e.target.value))}
                className="w-full border-2 border-black rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider">Noch frei</label>
              <input
                type="number"
                min="0"
                value={form.spotsLeft ?? ''}
                onChange={(e) => set('spotsLeft', Number(e.target.value))}
                className="w-full border-2 border-black rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="regOpen"
              checked={form.registrationOpen ?? true}
              onChange={(e) => set('registrationOpen', e.target.checked)}
              className="w-5 h-5 rounded border-2 border-black accent-brand-yellow"
            />
            <label htmlFor="regOpen" className="text-sm font-semibold">Anmeldung geöffnet</label>
          </div>
        </div>
        <div className="flex gap-3 p-6 border-t-2 border-black">
          <Button variant="primary" className="flex-1" onClick={onClose}>Abbrechen</Button>
          <Button variant="accent" className="flex-1" disabled={!isValid} onClick={handleSave}>
            <Check className="w-4 h-4 mr-2" /> Speichern
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default function EventManagementPage() {
  const [events, setEvents] = useState<JufoEvent[]>([]);
  const [editEvent, setEditEvent] = useState<Partial<JufoEvent> | null>(null);

  useEffect(() => {
    setEvents(loadEvents().sort((a, b) => a.date.localeCompare(b.date)));
  }, []);

  const handleSave = (evt: JufoEvent) => {
    const updated = events.some((e) => e.id === evt.id)
      ? events.map((e) => (e.id === evt.id ? evt : e))
      : [...events, evt];
    setEvents(updated.sort((a, b) => a.date.localeCompare(b.date)));
    saveEvents(updated);
    setEditEvent(null);
  };

  const handleDelete = (id: string, title: string) => {
    if (!confirm(`Event "${title}" wirklich löschen?`)) return;
    const updated = events.filter((e) => e.id !== id);
    setEvents(updated);
    saveEvents(updated);
  };

  return (
    <div className="pt-16 min-h-screen">
      <section className="py-12 px-6">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start justify-between mb-8 flex-wrap gap-4"
          >
            <div>
              <p className="text-sm font-bold text-black/50 uppercase tracking-widest mb-2">
                <a href="/tools" className="hover:text-black">Tools</a> / Event-Verwaltung
              </p>
              <h1 className="text-4xl font-extrabold flex items-center gap-3">
                <CalendarDays className="w-9 h-9 text-brand-lilac" />
                Events verwalten
              </h1>
            </div>
            <Button variant="accent" size="lg" onClick={() => setEditEvent(emptyEvent())}>
              <Plus className="w-5 h-5 mr-2" /> Neues Event
            </Button>
          </motion.div>

          <div className="space-y-3">
            {events.map((evt, i) => (
              <motion.div
                key={evt.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="bg-white rounded-xl border-2 border-black shadow-[3px_3px_0_#000] p-4 flex items-center gap-4"
              >
                <img
                  src={evt.image}
                  alt=""
                  className="w-14 h-14 rounded-lg object-cover border-2 border-black flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={cn('text-xs font-bold px-2 py-0.5 rounded-full border', categoryColors[evt.category])}>
                      {categoryLabels[evt.category]}
                    </span>
                    {!evt.registrationOpen && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full border bg-black/10 text-black/50">
                        Geschlossen
                      </span>
                    )}
                  </div>
                  <p className="font-extrabold text-sm mt-1 truncate">{evt.title}</p>
                  <p className="text-xs text-black/50">
                    {formatDate(evt.date)} · {evt.time} Uhr · {evt.location}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => setEditEvent(evt)}
                    className="p-2 hover:bg-black/5 rounded-lg transition-colors"
                    aria-label="Bearbeiten"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(evt.id, evt.title)}
                    className="p-2 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors"
                    aria-label="Löschen"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {editEvent && (
          <EventForm
            initial={editEvent}
            onSave={handleSave}
            onClose={() => setEditEvent(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
