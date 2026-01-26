import { Calendar } from 'lucide-react';
import PrivacyWrapper from '../components/PrivacyWrapper';

const CalendarPage: React.FC = () => {
  // Replace this with your actual Google Calendar embed URL
  const calendarEmbedUrl = 'https://calendar.google.com/calendar/embed?src=your-calendar-id%40group.calendar.google.com&ctz=Europe%2FBerlin';

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <Calendar className="w-12 h-12 text-accent animate-float" />
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary">
              Kalender
            </h1>
          </div>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Alle unsere Events und Veranstaltungen auf einen Blick.
          </p>
        </div>

        {/* Calendar with Privacy Wrapper */}
        <PrivacyWrapper
          title="Kalender laden"
          description="Um den Kalender anzuzeigen, wird eine Verbindung zu Google Calendar hergestellt."
          provider="Google"
          privacyPolicyUrl="https://policies.google.com/privacy"
        >
          <div className="w-full h-[600px] rounded-2xl overflow-hidden border-4 border-accent hard-shadow">
            <iframe
              src={calendarEmbedUrl}
              title="Jufo Grafing Kalender"
              className="w-full h-full border-0"
              style={{ backgroundColor: '#1e293b' }}
            />
          </div>
        </PrivacyWrapper>

        {/* Upcoming Events (Static Fallback) */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6">
            Kommende Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Monatliches Treffen',
                date: 'Jeden 1. Samstag',
                description: 'Unser reguläres Mitgliedertreffen mit Gaming und Austausch.',
                color: '#f97316',
              },
              {
                title: 'Sommer-Turnier',
                date: 'August 2024',
                description: 'Das große Jahres-Event mit Preisen und viel Spaß!',
                color: '#8b5cf6',
              },
              {
                title: 'Workshop: Streaming',
                date: 'Nächster Termin TBA',
                description: 'Lerne alles über Streaming und Content Creation.',
                color: '#22d3ee',
              },
            ].map((event) => (
              <div
                key={event.title}
                className="bg-dark-surface rounded-xl p-6 border-2"
                style={{ borderColor: event.color }}
              >
                <div
                  className="text-xs font-bold uppercase tracking-wider mb-2"
                  style={{ color: event.color }}
                >
                  {event.date}
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">
                  {event.title}
                </h3>
                <p className="text-text-secondary text-sm">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
