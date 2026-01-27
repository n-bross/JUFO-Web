import Link from "next/link";
import {
  Calendar,
  Users,
  Wrench,
  ArrowRight,
  QrCode,
  Trophy,
  Megaphone,
} from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Gestalte <span className="text-primary">deine Stadt</span> mit!
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
              Das Jugendforum Grafing ist deine Plattform für Beteiligung.
              Bringe deine Ideen ein, organisiere Events und gestalte die
              Zukunft unserer Gemeinde aktiv mit.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <Link href="/events">
                  <Calendar className="mr-2 h-5 w-5" />
                  Kommende Events
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about">
                  Mehr erfahren
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">Was wir bieten</h2>
          <p className="mt-4 text-muted-foreground">
            Entdecke die vielfältigen Möglichkeiten, dich einzubringen und
            mitzumachen.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="mt-4">Events & Aktivitäten</CardTitle>
              <CardDescription>
                Von Workshops bis zu Jugendveranstaltungen – entdecke spannende
                Events in Grafing.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="ghost" className="p-0">
                <Link href="/events" className="flex items-center">
                  Zu den Events
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="mt-4">Turnier-Planer</CardTitle>
              <CardDescription>
                Erstelle und verwalte Turniere mit Live-Scores – perfekt für
                Gaming-Events oder Sportwettbewerbe.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="ghost" className="p-0">
                <Link href="/tools/tournament" className="flex items-center">
                  Turnier erstellen
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <QrCode className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="mt-4">QR-Code Generator</CardTitle>
              <CardDescription>
                Erstelle QR-Codes für Events, Flyer oder Plakate – statisch oder
                mit Tracking.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="ghost" className="p-0">
                <Link href="/tools/qr-generator" className="flex items-center">
                  QR-Code erstellen
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="mt-4">Mitglied werden</CardTitle>
              <CardDescription>
                Werde Teil des Jugendforums und gestalte aktiv die Zukunft
                unserer Stadt mit.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="ghost" className="p-0">
                <Link href="/about#mitmachen" className="flex items-center">
                  Mitmachen
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Megaphone className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="mt-4">Deine Stimme zählt</CardTitle>
              <CardDescription>
                Bringe deine Ideen ein und beeinflusse Entscheidungen, die
                Jugendliche in Grafing betreffen.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="ghost" className="p-0">
                <Link href="/contact" className="flex items-center">
                  Kontakt aufnehmen
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Wrench className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="mt-4">Event-Tools</CardTitle>
              <CardDescription>
                Nutze unsere Tools zur Planung und Organisation deiner eigenen
                Events.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="ghost" className="p-0">
                <Link href="/tools" className="flex items-center">
                  Alle Tools
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Bereit mitzumachen?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Melde dich an und werde Teil einer aktiven Gemeinschaft junger
              Menschen, die Grafing mitgestalten.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/sign-up">
                  Jetzt anmelden
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
