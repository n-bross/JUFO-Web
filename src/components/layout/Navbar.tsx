import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogIn, LogOut, Wrench, CalendarDays } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const publicLinks = [
  { href: '/aktionen', label: 'Aktionen' },
  { href: '/ueber-uns', label: 'Über uns' },
  { href: '/mitmachen', label: 'Mitmachen' },
  { href: '/kontakt', label: 'Kontakt' },
];

const memberLinks = [
  { href: '/tools', label: 'Tools', icon: <Wrench className="w-3.5 h-3.5" /> },
  { href: '/kalender', label: 'Kalender', icon: <CalendarDays className="w-3.5 h-3.5" /> },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const allLinks = [...publicLinks, ...(isAuthenticated ? memberLinks : [])];

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

        <div className="hidden md:flex items-center gap-5">
          {publicLinks.map((link) => (
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

          {isAuthenticated && (
            <div className="flex items-center gap-3 ml-1 pl-4 border-l-2 border-black/10">
              {memberLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'flex items-center gap-1.5 text-sm font-semibold transition-colors px-3 py-1.5 rounded-full border-2 border-transparent',
                    location.pathname.startsWith(link.href)
                      ? 'bg-brand-yellow border-black text-black shadow-[2px_2px_0_#000]'
                      : 'text-black/60 hover:text-black hover:bg-black/5'
                  )}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          <div className="ml-1">
            {isAuthenticated ? (
              <Button variant="ghost" size="sm" onClick={handleLogout} className="flex items-center gap-1.5 text-sm">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            ) : (
              <Button asChild variant="accent" size="sm">
                <Link to="/mitmachen">Jetzt mitmachen</Link>
              </Button>
            )}
          </div>
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
          {allLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'text-base font-semibold py-3 border-b border-black/10 flex items-center justify-between',
                location.pathname.startsWith(link.href) ? 'text-black' : 'text-black/70'
              )}
            >
              {link.label}
              {location.pathname.startsWith(link.href) && (
                <span className="w-2 h-2 rounded-full bg-brand-yellow border border-black" />
              )}
            </Link>
          ))}
          <div className="mt-3">
            {isAuthenticated ? (
              <Button variant="primary" className="w-full flex items-center gap-2" onClick={handleLogout}>
                <LogOut className="w-4 h-4" /> Ausloggen
              </Button>
            ) : (
              <div className="flex flex-col gap-2">
                <Button asChild variant="accent" className="w-full">
                  <Link to="/mitmachen">Jetzt mitmachen</Link>
                </Button>
                <Button asChild variant="ghost" className="w-full flex items-center gap-2">
                  <Link to="/login"><LogIn className="w-4 h-4" /> Mitglieder-Login</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
