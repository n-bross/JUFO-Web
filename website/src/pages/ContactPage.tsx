import { useState } from 'react';
import { MessageCircle, Send, CheckCircle, AlertCircle, Mail, MapPin, Clock } from 'lucide-react';

const ContactPage: React.FC = () => {
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
          <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-4">
            Nachricht gesendet! 🎉
          </h1>
          <p className="text-text-secondary mb-8">
            Vielen Dank für deine Nachricht. Wir melden uns so schnell wie möglich bei dir!
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setPrivacyAccepted(false);
            }}
            className="btn-bouncy px-6 py-3 bg-secondary text-white font-bold rounded-xl border-4 border-black hard-shadow"
          >
            Neue Nachricht schreiben
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <MessageCircle className="w-12 h-12 text-success animate-float" />
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary">
              Kontakt
            </h1>
          </div>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Hast du Fragen oder Anregungen? Wir freuen uns von dir zu hören!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            {[
              {
                icon: Mail,
                title: 'E-Mail',
                content: 'info@jufo-grafing.de',
                color: '#f97316',
              },
              {
                icon: MapPin,
                title: 'Adresse',
                content: 'Grafing bei München',
                color: '#8b5cf6',
              },
              {
                icon: Clock,
                title: 'Treffen',
                content: 'Jeden 1. Samstag im Monat',
                color: '#22d3ee',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-dark-surface rounded-xl p-6 border-2"
                style={{ borderColor: item.color }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: item.color + '20' }}
                  >
                    <item.icon className="w-6 h-6" style={{ color: item.color }} />
                  </div>
                  <div>
                    <h3 className="text-sm text-text-secondary uppercase tracking-wide">
                      {item.title}
                    </h3>
                    <p className="text-text-primary font-medium">{item.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-dark-surface rounded-2xl p-8 border-4 border-success hard-shadow"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-text-primary font-medium mb-2"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-dark-elevated rounded-xl border-2 border-dark-elevated focus:border-success focus:outline-none text-text-primary transition-colors"
                    placeholder="Dein Name"
                  />
                </div>
                <div>
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
                    className="w-full px-4 py-3 bg-dark-elevated rounded-xl border-2 border-dark-elevated focus:border-success focus:outline-none text-text-primary transition-colors"
                    placeholder="deine@email.de"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="subject"
                  className="block text-text-primary font-medium mb-2"
                >
                  Betreff
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 bg-dark-elevated rounded-xl border-2 border-dark-elevated focus:border-success focus:outline-none text-text-primary transition-colors"
                  placeholder="Worum geht es?"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-text-primary font-medium mb-2"
                >
                  Nachricht *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-dark-elevated rounded-xl border-2 border-dark-elevated focus:border-success focus:outline-none text-text-primary transition-colors resize-none"
                  placeholder="Deine Nachricht..."
                />
              </div>

              {/* Privacy Checkbox */}
              <div className="mb-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privacyAccepted}
                    onChange={(e) => setPrivacyAccepted(e.target.checked)}
                    className="w-5 h-5 mt-0.5 rounded bg-dark-elevated border-2 border-dark-elevated checked:bg-success checked:border-success cursor-pointer"
                  />
                  <span className="text-text-secondary text-sm">
                    Ich habe die{' '}
                    <a
                      href="/datenschutz"
                      className="text-success hover:underline"
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
                className="btn-bouncy w-full flex items-center justify-center gap-3 px-6 py-4 bg-success text-dark-bg font-bold rounded-xl border-4 border-black hard-shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-dark-bg border-t-transparent rounded-full animate-spin" />
                    Wird gesendet...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Nachricht senden
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
