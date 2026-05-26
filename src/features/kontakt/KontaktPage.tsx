import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Instagram, MessageCircle, Send, CheckCircle, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const contactInfo = [
  {
    icon: <Instagram className="w-5 h-5" />,
    label: 'Instagram',
    value: '@jufo.grafing',
    href: 'https://instagram.com/jufo.grafing',
    color: 'bg-pink-100',
  },
  {
    icon: <Mail className="w-5 h-5" />,
    label: 'E-Mail',
    value: 'info@jufo-grafing.de',
    href: 'mailto:info@jufo-grafing.de',
    color: 'bg-blue-100',
  },
  {
    icon: <MessageCircle className="w-5 h-5" />,
    label: 'WhatsApp',
    value: 'Schreib uns!',
    href: 'https://wa.me/49',
    color: 'bg-green-100',
  },
];

export default function KontaktPage() {
  const [form, setForm] = useState({ name: '', email: '', betreff: '', nachricht: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-brand-lilac rounded-full -z-10 opacity-60" />
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-bold text-black/50 uppercase tracking-widest mb-3">Wir freuen uns von dir zu hören</p>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              Kontakt
            </h1>
            <p className="mt-4 text-base text-black/60 max-w-lg leading-relaxed">
              Fragen, Ideen oder Feedback? Schreib uns einfach – wir melden uns schnellstmöglich zurück.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards + Form */}
      <section className="py-8 px-6 pb-20">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-[1fr_2fr] gap-10">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-xl font-extrabold">Direkt erreichen</h2>
            {contactInfo.map((item, i) => (
              <a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white rounded-xl border-2 border-black shadow-[3px_3px_0_#000] p-4 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#000] transition-all"
              >
                <div className={`w-10 h-10 ${item.color} rounded-lg border-2 border-black flex items-center justify-center flex-shrink-0`}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs font-bold text-black/50 uppercase tracking-wider">{item.label}</p>
                  <p className="text-sm font-semibold">{item.value}</p>
                </div>
              </a>
            ))}

            <div className="bg-brand-yellow rounded-[1.5rem] border-2 border-black shadow-[4px_4px_0_#000] p-5 space-y-3 mt-4">
              <h3 className="font-extrabold">Unser Treffpunkt</h3>
              <p className="text-sm text-black/70 flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Jugendtreff Grafing<br />
                Bahnhofstr. 5<br />
                85567 Grafing b. München
              </p>
              <p className="text-sm text-black/70 flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Treffen nach Ankündigung<br />
                (auf Instagram und hier)
              </p>
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
                <h2 className="text-2xl font-extrabold mb-6">Nachricht senden</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider">
                        Dein Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border-2 border-black rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                        placeholder="Max Mustermann"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider">
                        E-Mail *
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
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider">
                      Betreff *
                    </label>
                    <input
                      type="text"
                      name="betreff"
                      required
                      value={form.betreff}
                      onChange={handleChange}
                      className="w-full border-2 border-black rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                      placeholder="Worum geht es?"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider">
                      Nachricht *
                    </label>
                    <textarea
                      name="nachricht"
                      required
                      rows={5}
                      value={form.nachricht}
                      onChange={handleChange}
                      className="w-full border-2 border-black rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow resize-none"
                      placeholder="Deine Nachricht an das Jugendforum Grafing..."
                    />
                  </div>

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
                        Nachricht absenden
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-[2rem] border-2 border-black shadow-[6px_6px_0_#000] p-10 flex flex-col items-center text-center gap-5">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center border-2 border-green-400">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-extrabold">Nachricht erhalten!</h3>
                  <p className="text-sm text-black/60 leading-relaxed max-w-sm">
                    Danke für deine Nachricht, <strong>{form.name}</strong>! Wir melden uns bald per E-Mail
                    an <strong>{form.email}</strong> bei dir.
                  </p>
                </div>
                <Button
                  variant="primary"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', email: '', betreff: '', nachricht: '' });
                  }}
                >
                  Neue Nachricht
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
