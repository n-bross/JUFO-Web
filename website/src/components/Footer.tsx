import { Heart, Github, Instagram, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto bg-dark-surface border-t-4 border-secondary">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4">
              🎮 Jufo Grafing
            </h3>
            <p className="text-text-secondary mb-4">
              Dein Jugendverein für Gaming, Events und jede Menge Spaß!
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-dark-elevated rounded-full hover:bg-secondary transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-text-primary" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-dark-elevated rounded-full hover:bg-secondary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-text-primary" />
              </a>
              <a
                href="mailto:info@jufo-grafing.de"
                className="p-2 bg-dark-elevated rounded-full hover:bg-secondary transition-colors"
                aria-label="E-Mail"
              >
                <Mail className="w-5 h-5 text-text-primary" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-text-primary mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/turnier"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Turnier
                </Link>
              </li>
              <li>
                <Link
                  to="/mitglieder"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Mitglieder
                </Link>
              </li>
              <li>
                <Link
                  to="/kalender"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Kalender
                </Link>
              </li>
              <li>
                <Link
                  to="/anmeldung"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Mitglied werden
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-bold text-text-primary mb-4">
              Rechtliches
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/datenschutz"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link
                  to="/impressum"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Impressum
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-dark-elevated text-center">
          <p className="text-text-secondary text-sm flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-danger" /> by Jufo Grafing
            {' '}© {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
