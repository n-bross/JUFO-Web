import { useState } from 'react';
import { UserPlus, Send, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

const SignUpPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!privacyAccepted) {
      setError('Bitte akzeptiere die Datenschutzerklärung.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      // Replace 'YOUR_FORMSPREE_ID' with your actual Formspree form ID
      const response = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error('Fehler beim Senden');
      }
    } catch {
      setError('Es gab einen Fehler. Bitte versuche es später erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center">
        <div className="max-w-md w-full text-center animate-bounce-in">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-4">
            Willkommen bei Jufo Grafing! 🎉
          </h1>
          <p className="text-text-secondary mb-8">
            Deine Anmeldung ist eingegangen. Wir melden uns bald mit weiteren
            Informationen bei dir!
          </p>
          <div className="flex items-center justify-center gap-2 text-secondary">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">Schön, dass du dabei bist!</span>
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <UserPlus className="w-12 h-12 text-primary animate-float" />
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary">
              Mitglied werden
            </h1>
          </div>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Werde Teil unserer Community und erlebe gemeinsam mit uns unvergessliche Momente!
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {[
            { emoji: '🎮', text: 'Gaming Events' },
            { emoji: '🏆', text: 'Turniere' },
            { emoji: '🤝', text: 'Neue Freunde' },
          ].map((benefit) => (
            <div
              key={benefit.text}
              className="bg-dark-surface rounded-xl p-4 text-center border-2 border-dark-elevated"
            >
              <div className="text-3xl mb-2">{benefit.emoji}</div>
              <div className="text-text-primary font-medium">{benefit.text}</div>
            </div>
          ))}
        </div>

        {/* Sign Up Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-dark-surface rounded-2xl p-8 border-4 border-primary hard-shadow"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-text-primary font-medium mb-2"
              >
                Vorname *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                className="w-full px-4 py-3 bg-dark-elevated rounded-xl border-2 border-dark-elevated focus:border-primary focus:outline-none text-text-primary transition-colors"
                placeholder="Max"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-text-primary font-medium mb-2"
              >
                Nachname *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                className="w-full px-4 py-3 bg-dark-elevated rounded-xl border-2 border-dark-elevated focus:border-primary focus:outline-none text-text-primary transition-colors"
                placeholder="Mustermann"
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-text-primary font-medium mb-2"
            >
              E-Mail *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 bg-dark-elevated rounded-xl border-2 border-dark-elevated focus:border-primary focus:outline-none text-text-primary transition-colors"
              placeholder="max@beispiel.de"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="birthdate"
                className="block text-text-primary font-medium mb-2"
              >
                Geburtsdatum
              </label>
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                className="w-full px-4 py-3 bg-dark-elevated rounded-xl border-2 border-dark-elevated focus:border-primary focus:outline-none text-text-primary transition-colors"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-text-primary font-medium mb-2"
              >
                Telefon
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-4 py-3 bg-dark-elevated rounded-xl border-2 border-dark-elevated focus:border-primary focus:outline-none text-text-primary transition-colors"
                placeholder="+49 123 456789"
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="interests"
              className="block text-text-primary font-medium mb-2"
            >
              Was interessiert dich am meisten?
            </label>
            <select
              id="interests"
              name="interests"
              className="w-full px-4 py-3 bg-dark-elevated rounded-xl border-2 border-dark-elevated focus:border-primary focus:outline-none text-text-primary transition-colors"
            >
              <option value="">Bitte wählen...</option>
              <option value="gaming">Gaming & Turniere</option>
              <option value="community">Community & Events</option>
              <option value="workshops">Workshops & Lernen</option>
              <option value="all">Alles!</option>
            </select>
          </div>

          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-text-primary font-medium mb-2"
            >
              Möchtest du uns etwas mitteilen?
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              className="w-full px-4 py-3 bg-dark-elevated rounded-xl border-2 border-dark-elevated focus:border-primary focus:outline-none text-text-primary transition-colors resize-none"
              placeholder="Erzähl uns von dir..."
            />
          </div>

          {/* Privacy Checkbox */}
          <div className="mb-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={privacyAccepted}
                onChange={(e) => setPrivacyAccepted(e.target.checked)}
                className="w-5 h-5 mt-0.5 rounded bg-dark-elevated border-2 border-dark-elevated checked:bg-primary checked:border-primary cursor-pointer"
              />
              <span className="text-text-secondary text-sm">
                Ich habe die{' '}
                <a
                  href="/datenschutz"
                  className="text-primary hover:underline"
                  target="_blank"
                >
                  Datenschutzerklärung
                </a>{' '}
                gelesen und stimme der Verarbeitung meiner Daten zu. *
              </span>
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-danger/20 border-2 border-danger rounded-xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-danger flex-shrink-0" />
              <p className="text-danger text-sm">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-bouncy w-full flex items-center justify-center gap-3 px-6 py-4 bg-primary text-white font-bold rounded-xl border-4 border-black hard-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Wird gesendet...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Anmeldung absenden
              </>
            )}
          </button>

          <p className="text-text-secondary text-xs text-center mt-4">
            * Pflichtfelder
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
