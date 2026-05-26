import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { type JufoEvent, categoryLabels, categoryColors, formatDateShort } from '@/data/events';

interface EventCardProps {
  event: JufoEvent;
  onRegister?: (event: JufoEvent) => void;
}

export function EventCard({ event, onRegister }: EventCardProps) {
  const spotsPercent =
    event.spots && event.spotsLeft != null
      ? Math.round(((event.spots - event.spotsLeft) / event.spots) * 100)
      : null;

  const isAlmostFull = spotsPercent !== null && spotsPercent >= 70;

  return (
    <div className="bg-white rounded-[1.5rem] border-2 border-black shadow-[4px_4px_0_#000] overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-[6px_6px_0_#000] transition-all duration-200">
      <div className="relative h-44 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span
            className={cn(
              'px-3 py-1 rounded-full text-xs font-bold border-2 border-black',
              categoryColors[event.category]
            )}
          >
            {categoryLabels[event.category]}
          </span>
          {!event.registrationOpen && (
            <span className="px-3 py-1 rounded-full text-xs font-bold border-2 border-black bg-black text-white">
              Demnächst
            </span>
          )}
        </div>
        <div className="absolute bottom-3 right-3 bg-white border-2 border-black rounded-xl px-3 py-1.5 text-center shadow-[2px_2px_0_#000]">
          <p className="text-base font-extrabold leading-none">{formatDateShort(event.date)}</p>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1 gap-3">
        <h3 className="font-extrabold text-lg leading-tight">{event.title}</h3>
        <p className="text-sm text-black/60 leading-relaxed line-clamp-2">{event.description}</p>

        <div className="flex flex-col gap-1.5 text-xs text-black/60 font-medium">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 flex-shrink-0" />
            {event.time}{event.endTime ? ` – ${event.endTime}` : ''} Uhr
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            {event.location}
          </span>
          {event.spotsLeft != null && (
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 flex-shrink-0" />
              <span className={cn(isAlmostFull && 'text-orange-600 font-bold')}>
                Noch {event.spotsLeft} Plätze frei
              </span>
            </span>
          )}
        </div>

        {spotsPercent !== null && (
          <div className="w-full bg-black/10 rounded-full h-1.5 overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all',
                isAlmostFull ? 'bg-orange-500' : 'bg-brand-yellow'
              )}
              style={{ width: `${spotsPercent}%` }}
            />
          </div>
        )}

        <div className="mt-auto pt-2">
          {event.registrationOpen ? (
            <Button
              variant="accent"
              size="sm"
              className="w-full"
              onClick={() => onRegister?.(event)}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Jetzt anmelden
            </Button>
          ) : (
            <Button variant="primary" size="sm" className="w-full opacity-60 cursor-not-allowed" disabled>
              Anmeldung folgt
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
