import { type Metadata } from "next";
import Link from "next/link";
import { Plus, Trophy, Clock, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";

import { api } from "~/trpc/server";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";

export const metadata: Metadata = {
  title: "Turnier-Planer",
  description: "Erstelle und verwalte Turniere mit verschiedenen Formaten.",
};

const statusConfig = {
  setup: { label: "Vorbereitung", variant: "secondary" as const, icon: Clock },
  "in-progress": {
    label: "Läuft",
    variant: "default" as const,
    icon: Trophy,
  },
  completed: {
    label: "Beendet",
    variant: "outline" as const,
    icon: CheckCircle,
  },
};

const typeLabels: Record<string, string> = {
  "single-elimination": "K.O.-System",
  "round-robin": "Jeder gegen Jeden",
  swiss: "Schweizer System",
};

export default async function TournamentListPage() {
  const tournaments = await api.tournament.getMyTournaments();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Turnier-Planer</h1>
          <p className="mt-2 text-muted-foreground">
            Erstelle und verwalte Turniere mit Live-Scores.
          </p>
        </div>
        <Button asChild>
          <Link href="/tools/tournament/new">
            <Plus className="mr-2 h-4 w-4" />
            Neues Turnier
          </Link>
        </Button>
      </div>

      {tournaments.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Trophy className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">Keine Turniere</h3>
            <p className="mt-2 text-muted-foreground">
              Du hast noch keine Turniere erstellt.
            </p>
            <Button asChild className="mt-4">
              <Link href="/tools/tournament/new">
                <Plus className="mr-2 h-4 w-4" />
                Erstes Turnier erstellen
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tournaments.map((tournament) => {
            const status =
              statusConfig[tournament.status as keyof typeof statusConfig] ??
              statusConfig.setup;
            const StatusIcon = status.icon;

            return (
              <Link
                key={tournament.id}
                href={`/tools/tournament/${tournament.id}`}
              >
                <Card className="h-full transition-shadow hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="line-clamp-1">
                        {tournament.name}
                      </CardTitle>
                      <Badge variant={status.variant}>
                        <StatusIcon className="mr-1 h-3 w-3" />
                        {status.label}
                      </Badge>
                    </div>
                    <CardDescription>
                      {typeLabels[tournament.type] ?? tournament.type}
                      {tournament.teamBased && " • Teams"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      <p>{tournament.participants?.length ?? 0} Teilnehmer</p>
                      <p className="mt-1">
                        Erstellt am{" "}
                        {tournament.createdAt &&
                          format(new Date(tournament.createdAt), "dd.MM.yyyy", {
                            locale: de,
                          })}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
