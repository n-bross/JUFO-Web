import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Home, Trophy, Users, Calendar, MessageCircle, UserPlus } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/turnier', label: 'Turnier', icon: Trophy },
    { path: '/mitglieder', label: 'Mitglieder', icon: Users },
    { path: '/kalender', label: 'Kalender', icon: Calendar },
    { path: '/kontakt', label: 'Kontakt', icon: MessageCircle },
    { path: '/anmeldung', label: 'Anmeldung', icon: UserPlus },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Desktop Navigation - Floating Island */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block">
        <div className="floating-nav px-6 py-3 rounded-full hard-shadow">
          <ul className="flex items-center gap-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-text-secondary hover:text-text-primary hover:bg-dark-elevated'
                    }`
                  }
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={toggleMenu}
          className="btn-bouncy p-3 bg-dark-surface rounded-full border-2 border-secondary hard-shadow-sm"
          aria-label={isOpen ? 'Menü schließen' : 'Menü öffnen'}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-text-primary" />
          ) : (
            <Menu className="w-6 h-6 text-text-primary" />
          )}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 modal-overlay"
          onClick={toggleMenu}
        >
          <div
            className="absolute top-20 right-4 bg-dark-surface rounded-2xl border-4 border-secondary hard-shadow p-4 animate-bounce-in"
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="flex flex-col gap-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={toggleMenu}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-primary text-white'
                          : 'text-text-secondary hover:text-text-primary hover:bg-dark-elevated'
                      }`
                    }
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
