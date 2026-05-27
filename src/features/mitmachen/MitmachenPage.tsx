import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Send, Star, Users, Calendar, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const benefits = [
  { icon: <Star className="w-5 h-5" />, text: 'Mitgestaltung der Stadtpolitik in Grafing' },
  { icon: <Users className="w-5 h-5" />, text: 'Tolles Team und neue Freundschaften' },
  { icon: <Calendar className="w-5 h-5" />, text: 'Planung und Umsetzung eigener Events' },
  { icon: <Lightbulb className="w-5 h-5" />, text: 'Workshops und politische Bildung' },
];

type FormState = {
  vorname: string;
  nachname: string;
  email: string;
  alter: string;
  wohnort: string;
  motivation: string;
  consent: boolean;
};

export default function MitmachenPage() {
  const [form, setForm] = useState<FormState>({
    vorname: '',
    nachname: '',
    email: '',
    alter: '',
    wohnort: '',
    motivation: '',
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const result = (await response.json()) as { message?: string; errors?: string[] };

      if (!response.ok) {
        const message = result.errors?.join(' ') || result.message || 'Bewerbung konnte nicht gesendet werden.';
        throw new Error(message);
      }

      setSubmitted(true);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unbekannter Fehler beim Senden der Bewerbung.');
    } finally {
      setLoading(false);
    }
  };

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
            <p className="text-sm font-bold text-black/50 uppercase tracking-widest mb-3">Werde Teil des Teams</p>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              Mitmachen<br />beim Jufo
            </h1>
            <p className="mt-4 text-base text-black/60 max-w-lg leading-relaxed">
              Du bist zwischen 13 und 25 Jahre alt und wohnst in Grafing oder Umgebung?
              Dann bewirb dich jetzt und werde Teil des Jugendforums Grafing!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits + Form */}
      <section className="py-8 px-6 pb-20">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-[1fr_2fr] gap-10">
          {/* Left: Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-extrabold mb-4">Warum mitmachen?</h2>
              <div className="space-y-3">
                {benefits.map((b, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-white rounded-xl border-2 border-black shadow-[3px_3px_0_#000] p-3.5"
                  >
                    <div className="w-9 h-9 bg-brand-yellow rounded-lg border-2 border-black flex items-center justify-center flex-shrink-0">
                      {b.icon}
                    </div>
                    <p className="text-sm font-semibold leading-snug">{b.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-brand-black text-white rounded-[1.5rem] border-2 border-black shadow-[4px_4px_0_#000] p-6 space-y-3">
              <h3 className="font-extrabold text-base">Voraussetzungen</h3>
              <ul className="text-sm text-white/70 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-brand-yellow mt-0.5">✓</span>
                  Alter: 13 bis 25 Jahre
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-yellow mt-0.5">✓</span>
                  Wohnhaft in Grafing oder näherer Umgebung
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-yellow mt-0.5">✓</span>
                  Lust, Grafing aktiv mitzugestalten
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-yellow mt-0.5">✓</span>
                  Bereitschaft, an Treffen teilzunehmen
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {!submitted ? (
              <div className="bg-white rounded-[2rem] border-2 border-black shadow-[6px_6px_0_#000] p-8">
                <h2 className="text-2xl font-extrabold mb-6">Bewerbungsformular</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider">
                        Vorname *
                      </label>
                      <input
                        type="text"
                        name="vorname"
                        required
                        value={form.vorname}
                        onChange={handleChange}
                        className="w-full border-2 border-black rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                        placeholder="Max"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider">
                        Nachname *
                      </label>
                      <input
                        type="text"
                        name="nachname"
                        required
                        value={form.nachname}
                        onChange={handleChange}
                        className="w-full border-2 border-black rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                        placeholder="Mustermann"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider">
                      E-Mail Adresse *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full border-2 border-black rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                      placeholder="max@beispiel.de"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider">
                        Alter *
                      </label>
                      <select
                        name="alter"
                        required
                        value={form.alter}
                        onChange={handleChange}
                        className="w-full border-2 border-black rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow bg-white"
                      >
                        <option value="">Bitte wählen</option>
                        {Array.from({ length: 13 }, (_, i) => i + 13).map((age) => (
                          <option key={age} value={age}>
                            {age} Jahre
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider">
                        Wohnort *
                      </label>
                      <input
                        type="text"
                        name="wohnort"
                        required
                        value={form.wohnort}
                        onChange={handleChange}
                        className="w-full border-2 border-black rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                        placeholder="Grafing"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider">
                      Warum möchtest du mitmachen? *
                    </label>
                    <textarea
                      name="motivation"
                      required
                      rows={4}
                      value={form.motivation}
                      onChange={handleChange}
                      className="w-full border-2 border-black rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow resize-none"
                      placeholder="Erzähl uns kurz, warum du Teil des Jugendforums werden möchtest und was du einbringen willst..."
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="consent"
                      id="consent"
                      required
                      checked={form.consent}
                      onChange={handleChange}
                      className="mt-0.5 w-4 h-4 border-2 border-black rounded accent-brand-yellow"
                    />
                    <label htmlFor="consent" className="text-xs text-black/60 leading-relaxed">
                      Ich stimme zu, dass meine Daten zur Bearbeitung meiner Bewerbung gespeichert werden.
                      Die Daten werden nicht an Dritte weitergegeben. *
                    </label>
                  </div>


                  {errorMessage ? (
                    <div className="rounded-xl border-2 border-red-500 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                      {errorMessage}
                    </div>
                  ) : null}

                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
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
                        <Send className="w-5 h-5" />
                        Bewerbung absenden
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-[2rem] border-2 border-black shadow-[6px_6px_0_#000] p-10 flex flex-col items-center text-center gap-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center border-2 border-green-400 shadow-[3px_3px_0_#16a34a]">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold">Bewerbung erhalten!</h3>
                  <p className="text-black/60 leading-relaxed max-w-sm">
                    Danke, <strong>{form.vorname}</strong>! Wir haben deine Bewerbung erhalten und
                    melden uns bald per E-Mail bei dir an <strong>{form.email}</strong>.
                  </p>
                </div>
                <div className="bg-brand-yellow rounded-xl border-2 border-black p-4 text-left w-full max-w-xs">
                  <p className="text-xs font-bold uppercase tracking-wider mb-2">Wie geht's weiter?</p>
                  <ol className="text-sm space-y-1.5 text-black/70">
                    <li>1. Wir schauen uns deine Bewerbung an</li>
                    <li>2. Du bekommst eine E-Mail von uns</li>
                    <li>3. Einladung zu einem Schnupptertreffen</li>
                  </ol>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
