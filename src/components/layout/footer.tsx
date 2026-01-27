import Link from "next/link";
import { Mail, MapPin, Instagram, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                JF
              </div>
              <span className="font-semibold">Jugendforum Grafing</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Eine Beteiligungsplattform für Jugendliche (12-27 Jahre) zur
              Mitgestaltung der Stadt Grafing bei München.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Navigation</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <Link
                href="/events"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Events
              </Link>
              <Link
                href="/tools"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Tools
              </Link>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Über uns
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold">Kontakt</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a
                href="mailto:jugendforum@grafing.de"
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                jugendforum@grafing.de
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>
                  Stadt Grafing b. München
                  <br />
                  Marktplatz 18
                  <br />
                  85567 Grafing bei München
                </span>
              </div>
            </div>
          </div>

          {/* Social & Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold">Folge uns</h3>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/jugendforum_grafing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
            <div className="space-y-2 text-sm">
              <Link
                href="/impressum"
                className="text-muted-foreground hover:text-foreground transition-colors block"
              >
                Impressum
              </Link>
              <Link
                href="/datenschutz"
                className="text-muted-foreground hover:text-foreground transition-colors block"
              >
                Datenschutz
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Jugendforum Stadt Grafing bei München.
            Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
