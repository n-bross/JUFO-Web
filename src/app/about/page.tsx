import { type Metadata } from "next";
import { Users, Heart, Lightbulb, MessageCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "Erfahre mehr über das Jugendforum Grafing und wie du mitmachen kannst.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight">Über uns</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Das Jugendforum Grafing ist die offizielle Jugendvertretung der Stadt
          Grafing bei München.
        </p>

        <div className="mt-12 space-y-8">
          {/* Mission */}
          <section>
            <h2 className="text-2xl font-semibold">Unsere Mission</h2>
            <p className="mt-4 text-muted-foreground">
              Wir setzen uns dafür ein, dass die Stimmen junger Menschen in
              Grafing gehört werden. Als Brücke zwischen Jugendlichen und
              Kommunalpolitik bringen wir eure Ideen, Wünsche und Anliegen
              direkt in die Entscheidungsprozesse ein.
            </p>
          </section>

          {/* Values */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Wofür wir stehen</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg mt-2">Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Wir engagieren uns ehrenamtlich für eine bessere Zukunft in
                    unserer Gemeinde.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg mt-2">Gemeinschaft</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Zusammen erreichen wir mehr – bei uns ist jeder willkommen.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Lightbulb className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg mt-2">Innovation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Neue Ideen und frische Perspektiven treiben uns an.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <MessageCircle className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg mt-2">Dialog</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Offener Austausch zwischen Jugendlichen und Erwachsenen.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* How to participate */}
          <section id="mitmachen">
            <h2 className="text-2xl font-semibold">Mitmachen</h2>
            <p className="mt-4 text-muted-foreground">
              Du bist zwischen 12 und 27 Jahren alt und hast Lust, dich für
              Grafing zu engagieren? Dann bist du bei uns genau richtig!
            </p>

            <div className="mt-6 rounded-lg border bg-muted/50 p-6">
              <h3 className="font-semibold">So kannst du dabei sein:</h3>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                  Komm einfach zu unseren offenen Treffen
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                  Melde dich für unsere Events an
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                  Bringe deine Ideen und Projekte ein
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                  Hilf bei der Organisation von Veranstaltungen
                </li>
              </ul>
            </div>

            <p className="mt-6 text-muted-foreground">
              Keine Sorge – du musst nicht bei jedem Treffen dabei sein und
              kannst dich so viel einbringen, wie es dir passt. Schreib uns
              einfach eine Nachricht oder komm zu einem unserer Events!
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold">Kontakt</h2>
            <p className="mt-4 text-muted-foreground">
              Du hast Fragen oder möchtest mehr erfahren? Schreib uns!
            </p>
            <div className="mt-4">
              <a
                href="mailto:jugendforum@grafing.de"
                className="text-primary hover:underline"
              >
                jugendforum@grafing.de
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
