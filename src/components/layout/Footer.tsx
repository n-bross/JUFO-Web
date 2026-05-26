import { Link } from 'react-router-dom';
import { Instagram, Mail, MessageCircle } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

const navLinks = [
  { href: '/aktionen', label: 'Aktionen' },
  { href: '/ueber-uns', label: 'Über uns' },
  { href: '/mitmachen', label: 'Mitmachen' },
  { href: '/kontakt', label: 'Kontakt' },
];

export function Footer() {
  return (
    <footer className="bg-brand-yellow border-t-2 border-black">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-3">
            <Link to="/" className="flex items-center gap-2.5">
              <Logo size={36} />
              <span className="font-extrabold text-lg">Jufo Grafing</span>
            </Link>
            <p className="text-sm text-black/70 max-w-[200px] leading-relaxed">
              Deine Stimme für Grafing – Jugendpolitik, Events und Mitgestaltung.
            </p>
          </div>

          <div>
            <h4 className="font-extrabold text-sm mb-4 uppercase tracking-wider">Seiten</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm font-medium hover:underline underline-offset-4 decoration-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-sm mb-4 uppercase tracking-wider">Kontakt</h4>
            <p className="text-sm text-black/70 mb-4">
              Schreib uns auf Instagram oder per E-Mail – wir freuen uns von dir zu hören!
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/jufo.grafing"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-black text-brand-yellow rounded-full flex items-center justify-center hover:scale-110 transition-transform border-2 border-black"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="mailto:info@jufo-grafing.de"
                className="w-10 h-10 bg-black text-brand-yellow rounded-full flex items-center justify-center hover:scale-110 transition-transform border-2 border-black"
                aria-label="E-Mail"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/49"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-black text-brand-yellow rounded-full flex items-center justify-center hover:scale-110 transition-transform border-2 border-black"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t-2 border-black/20 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-black/60 font-medium">
          <span>© 2026 Jugendforum Grafing. Alle Rechte vorbehalten.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Impressum</a>
            <a href="#" className="hover:underline">Datenschutz</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
