import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CalendarDays, MapPin, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  type JufoEvent,
  events as defaultEvents,
  categoryColors,
  categoryLabels,
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

const WEEKDAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

const MONTH_NAMES = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

function toDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export default function KalenderPage() {
  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const allEvents = useMemo(() => loadEvents(), []);

  const eventsByDate = useMemo(() => {
    const map: Record<string, JufoEvent[]> = {};
    for (const evt of allEvents) {
      if (!map[evt.date]) map[evt.date] = [];
      map[evt.date].push(evt);
    }
    return map;
  }, [allEvents]);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
    setSelectedDay(null);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
    setSelectedDay(null);
  };

  const todayKey = toDateKey(now.getFullYear(), now.getMonth(), now.getDate());

  const monthEvents = useMemo(() => {
    const prefix = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}`;
    return allEvents
      .filter(e => e.date.startsWith(prefix))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [allEvents, viewYear, viewMonth]);

  const selectedEvents = selectedDay ? (eventsByDate[selectedDay] ?? []) : null;

  return (
    <div className="pt-16 min-h-screen">
      <section className="relative py-12 px-6 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-brand-lilac rounded-full -z-10 opacity-40" />
        <div className="max-w-[1200px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-brand-black text-brand-lilac rounded-xl border-2 border-black flex items-center justify-center">
                <CalendarDays className="w-5 h-5" />
              </div>
              <p className="text-sm font-bold text-black/50 uppercase tracking-widest">Mitglieder-Bereich</p>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">Kalender</h1>
            <p className="mt-4 text-base text-black/60 max-w-lg leading-relaxed">
              Alle Events und Aktionen des Jugendforums auf einen Blick.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">

          {/* Calendar Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-[2rem] border-2 border-black shadow-[5px_5px_0_#000] overflow-hidden"
          >
            {/* Month navigation */}
            <div className="flex items-center justify-between px-6 py-5 border-b-2 border-black bg-brand-yellow">
              <button
                onClick={prevMonth}
                className="w-9 h-9 rounded-xl border-2 border-black bg-white hover:shadow-[2px_2px_0_#000] transition-all flex items-center justify-center"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="font-extrabold text-xl">
                {MONTH_NAMES[viewMonth]} {viewYear}
              </h2>
              <button
                onClick={nextMonth}
                className="w-9 h-9 rounded-xl border-2 border-black bg-white hover:shadow-[2px_2px_0_#000] transition-all flex items-center justify-center"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 border-b-2 border-black">
              {WEEKDAYS.map(d => (
                <div key={d} className="py-3 text-center text-xs font-extrabold uppercase tracking-wider text-black/40">
                  {d}
                </div>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7">
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="min-h-[80px] border-b border-r border-black/5 bg-black/[0.02]" />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const key = toDateKey(viewYear, viewMonth, day);
                const dayEvents = eventsByDate[key] ?? [];
                const isToday = key === todayKey;
                const isSelected = key === selectedDay;
                const hasEvents = dayEvents.length > 0;
                const colIndex = (firstDay + i) % 7;
                const isLastCol = colIndex === 6;
                const rowIndex = Math.floor((firstDay + i) / 7);
                const totalRows = Math.ceil((firstDay + daysInMonth) / 7);
                const isLastRow = rowIndex === totalRows - 1;

                return (
                  <button
                    key={key}
                    onClick={() => setSelectedDay(isSelected ? null : key)}
                    className={cn(
                      'min-h-[80px] p-2 text-left flex flex-col gap-1 transition-all',
                      !isLastCol && 'border-r border-black/10',
                      !isLastRow && 'border-b border-black/10',
                      isSelected ? 'bg-brand-yellow/30' : hasEvents ? 'hover:bg-brand-yellow/10' : 'hover:bg-black/[0.02]',
                    )}
                  >
                    <span className={cn(
                      'w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold self-start',
                      isToday ? 'bg-black text-brand-yellow' : 'text-black/70',
                      isSelected && !isToday && 'bg-brand-yellow text-black border-2 border-black',
                    )}>
                      {day}
                    </span>
                    <div className="flex flex-col gap-0.5 w-full">
                      {dayEvents.slice(0, 2).map(evt => (
                        <span
                          key={evt.id}
                          className={cn(
                            'text-[10px] font-bold px-1.5 py-0.5 rounded truncate block',
                            categoryColors[evt.category],
                            'border border-black/20'
                          )}
                        >
                          {evt.title}
                        </span>
                      ))}
                      {dayEvents.length > 2 && (
                        <span className="text-[10px] font-bold text-black/40 px-1">
                          +{dayEvents.length - 2} mehr
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Sidebar */}
          <div className="flex flex-col gap-4">
            <AnimatePresence mode="wait">
              {selectedDay && selectedEvents ? (
                <motion.div
                  key={selectedDay}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-[1.5rem] border-2 border-black shadow-[4px_4px_0_#000] overflow-hidden"
                >
                  <div className="px-5 py-4 border-b-2 border-black bg-brand-yellow">
                    <p className="text-xs font-bold uppercase tracking-wider text-black/60 mb-0.5">Ausgewählt</p>
                    <p className="font-extrabold text-lg">{formatDate(selectedDay)}</p>
                  </div>
                  {selectedEvents.length === 0 ? (
                    <div className="px-5 py-6 text-sm text-black/40 font-medium text-center">
                      Keine Events an diesem Tag.
                    </div>
                  ) : (
                    <div className="divide-y divide-black/10">
                      {selectedEvents.map(evt => (
                        <div key={evt.id} className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={cn('text-xs font-bold px-2 py-0.5 rounded-full border border-black/20', categoryColors[evt.category])}>
                              {categoryLabels[evt.category]}
                            </span>
                          </div>
                          <p className="font-extrabold text-sm">{evt.title}</p>
                          <div className="mt-1.5 space-y-1">
                            <p className="text-xs text-black/50 flex items-center gap-1.5">
                              <Clock className="w-3 h-3" />
                              {evt.time} Uhr{evt.endTime && ` – ${evt.endTime} Uhr`}
                            </p>
                            <p className="text-xs text-black/50 flex items-center gap-1.5">
                              <MapPin className="w-3 h-3" />
                              {evt.location}
                            </p>
                          </div>
                          <p className="text-xs text-black/60 mt-2 leading-relaxed">{evt.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ) : null}
            </AnimatePresence>

            {/* Month agenda */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-[1.5rem] border-2 border-black shadow-[4px_4px_0_#000] overflow-hidden"
            >
              <div className="px-5 py-4 border-b-2 border-black">
                <p className="font-extrabold">Events im {MONTH_NAMES[viewMonth]}</p>
              </div>
              {monthEvents.length === 0 ? (
                <div className="px-5 py-6 text-sm text-black/40 font-medium text-center">
                  Keine Events in diesem Monat.
                </div>
              ) : (
                <div className="divide-y divide-black/10">
                  {monthEvents.map(evt => {
                    const day = new Date(evt.date).getDate();
                    const isActive = evt.date === selectedDay;
                    return (
                      <button
                        key={evt.id}
                        onClick={() => setSelectedDay(isActive ? null : evt.date)}
                        className={cn(
                          'w-full text-left p-4 flex items-start gap-3 transition-all hover:bg-black/[0.02]',
                          isActive && 'bg-brand-yellow/20'
                        )}
                      >
                        <div className="w-10 h-10 rounded-xl border-2 border-black flex flex-col items-center justify-center flex-shrink-0 bg-black/5">
                          <span className="text-xs font-bold text-black/40 leading-none">{MONTH_NAMES[viewMonth].slice(0, 3)}</span>
                          <span className="text-lg font-extrabold leading-none">{day}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className={cn('text-[10px] font-bold px-1.5 py-0.5 rounded-full', categoryColors[evt.category])}>
                              {categoryLabels[evt.category]}
                            </span>
                          </div>
                          <p className="font-extrabold text-sm truncate">{evt.title}</p>
                          <p className="text-xs text-black/50">{evt.time} Uhr · {evt.location}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
