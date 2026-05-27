import { Link } from 'react-router-dom';
import { Instagram, Mail, MessageCircle } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

const navLinks = [
  { href: '/aktionen', label: 'Aktionen' },
  { href: '/ueber-uns', label: 'Über uns' },
  { href: '/mitmachen', label: 'Mitmachen' },
  { href: '/kontakt', label: 'Kontakt' },
];

const infoLinks = [
  { href: '/termine', label: 'Termine/Kalender' },
  { href: '/team', label: 'Team/Ansprechpersonen' },
  { href: '/protokolle', label: 'Protokolle/Transparenz' },
  { href: '/partner', label: 'Partner/Sponsoren' },
  { href: '/faq', label: 'FAQ' },
  { href: '/content-roadmap', label: 'Content-Roadmap' },
];

const legalLinks = [
  { href: '/impressum', label: 'Impressum' },
  { href: '/datenschutz', label: 'Datenschutz' },
  { href: '/barrierefreiheit', label: 'Barrierefreiheit' },
];

export function Footer() {
  return (
    <footer className="bg-brand-yellow border-t-2 border-black">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-3">
            <Link to="/" className="flex items-center gap-2.5">
              <Logo size={36} />
              <span className="font-extrabold text-lg">Jufo Grafing</span>
            </Link>
            <p className="text-sm text-black/70 max-w-[240px] leading-relaxed">
              Deine Stimme für Grafing – Jugendpolitik, Events und Mitgestaltung.
            </p>
          </div>

          <div>
            <h4 className="font-extrabold text-sm mb-4 uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm font-medium hover:underline underline-offset-4 decoration-2">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-sm mb-4 uppercase tracking-wider">Infos</h4>
            <ul className="space-y-2">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm font-medium hover:underline underline-offset-4 decoration-2">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-sm mb-4 uppercase tracking-wider">Kontakt</h4>
            <p className="text-sm text-black/70 mb-4">info@jufo-grafing.de · Instagram @jufo.grafing</p>
            <div className="flex gap-3 mb-4">
              <a href="https://instagram.com/jufo.grafing" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-black text-brand-yellow rounded-full flex items-center justify-center hover:scale-110 transition-transform border-2 border-black" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="mailto:info@jufo-grafing.de" className="w-10 h-10 bg-black text-brand-yellow rounded-full flex items-center justify-center hover:scale-110 transition-transform border-2 border-black" aria-label="E-Mail">
                <Mail className="w-4 h-4" />
              </a>
              <a href="https://wa.me/49" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-black text-brand-yellow rounded-full flex items-center justify-center hover:scale-110 transition-transform border-2 border-black" aria-label="WhatsApp">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
            <ul className="space-y-1">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm font-semibold underline underline-offset-4 decoration-2">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t-2 border-black/20 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-black/60 font-medium">
          <span>© 2026 Jugendforum Grafing. Alle Rechte vorbehalten.</span>
          <span>Kontakt: info@jufo-grafing.de</span>
        </div>
      </div>
    </footer>
  );
}
