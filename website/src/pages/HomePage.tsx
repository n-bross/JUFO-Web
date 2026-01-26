import { Link } from 'react-router-dom';
import { Trophy, Users, Calendar, Sparkles, ArrowRight, Star } from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: Trophy,
      title: 'Turniere',
      description: 'Spannende Wettbewerbe und Events für alle Skill-Levels.',
      color: '#f97316',
      link: '/turnier',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Lerne neue Leute kennen und finde dein Team.',
      color: '#8b5cf6',
      link: '/mitglieder',
    },
    {
      icon: Calendar,
      title: 'Events',
      description: 'Regelmäßige Treffen, Workshops und gemeinsame Aktivitäten.',
      color: '#22d3ee',
      link: '/kalender',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 pt-24 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-accent/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-dark-surface rounded-full border-2 border-secondary mb-8 animate-bounce-in">
            <Star className="w-4 h-4 text-warning" />
            <span className="text-text-secondary text-sm font-medium">
              Jugendverein seit 2018
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-bounce-in">
            <span className="text-primary">Jufo</span>{' '}
            <span className="text-text-primary">Grafing</span>{' '}
            <Sparkles className="inline-block w-12 h-12 text-warning animate-float" />
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-text-secondary mb-8 max-w-2xl mx-auto animate-bounce-in" style={{ animationDelay: '100ms' }}>
            Dein Jugendverein für{' '}
            <span className="text-primary font-bold">Gaming</span>,{' '}
            <span className="text-secondary font-bold">Events</span> und{' '}
            <span className="text-accent font-bold">jede Menge Spaß</span>!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-bounce-in" style={{ animationDelay: '200ms' }}>
            <Link
              to="/anmeldung"
              className="btn-bouncy flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl border-4 border-black hard-shadow"
            >
              Jetzt mitmachen
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/turnier"
              className="btn-bouncy flex items-center gap-2 px-8 py-4 bg-dark-surface text-text-primary font-bold rounded-xl border-4 border-secondary hard-shadow"
            >
              <Trophy className="w-5 h-5" />
              Zum Turnier
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Was wir <span className="text-secondary">bieten</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link
                key={feature.title}
                to={feature.link}
                className="group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className="bg-dark-surface rounded-2xl border-4 p-8 hard-shadow btn-bouncy h-full"
                  style={{ borderColor: feature.color }}
                >
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: feature.color + '20' }}
                  >
                    <feature.icon
                      className="w-8 h-8"
                      style={{ color: feature.color }}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary">{feature.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-dark-surface">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50+', label: 'Mitglieder', color: '#f97316' },
              { value: '12', label: 'Turniere/Jahr', color: '#8b5cf6' },
              { value: '6', label: 'Jahre aktiv', color: '#22d3ee' },
              { value: '∞', label: 'Spaß', color: '#22c55e' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="text-4xl md:text-5xl font-bold mb-2"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </div>
                <div className="text-text-secondary text-sm uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Bereit, <span className="text-primary">dabei</span> zu sein?
          </h2>
          <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
            Werde Teil unserer Community und erlebe unvergessliche Momente mit
            Gleichgesinnten!
          </p>
          <Link
            to="/anmeldung"
            className="btn-bouncy inline-flex items-center gap-2 px-8 py-4 bg-secondary text-white font-bold rounded-xl border-4 border-black hard-shadow"
          >
            Mitglied werden
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
