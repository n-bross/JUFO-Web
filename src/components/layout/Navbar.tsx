import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/aktionen', label: 'Aktionen' },
  { href: '/ueber-uns', label: 'Über uns' },
  { href: '/mitmachen', label: 'Mitmachen' },
  { href: '/kontakt', label: 'Kontakt' },
  { href: '/admin', label: 'Admin' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b-2 border-black shadow-[0_2px_0_#000]'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2.5 font-extrabold text-lg tracking-tight hover:opacity-80 transition-opacity"
        >
          <Logo size={36} />
          <span className="hidden sm:inline">Jufo Grafing</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'text-sm font-semibold transition-colors',
                location.pathname === link.href
                  ? 'text-black underline decoration-2 underline-offset-4'
                  : 'text-black/60 hover:text-black'
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild variant="accent" size="sm">
            <Link to="/mitmachen">Jetzt mitmachen</Link>
          </Button>
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-black/5 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Menü öffnen"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-white border-t-2 border-black px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'text-base font-semibold py-3 border-b border-black/10 flex items-center justify-between',
                location.pathname === link.href ? 'text-black' : 'text-black/70'
              )}
            >
              {link.label}
              {location.pathname === link.href && (
                <span className="w-2 h-2 rounded-full bg-brand-yellow border border-black" />
              )}
            </Link>
          ))}
          <Button asChild variant="accent" className="w-full mt-3">
            <Link to="/mitmachen">Jetzt mitmachen</Link>
          </Button>
        </div>
      )}
    </header>
  );
}
