"use client";

import { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Share2,
  Play,
  Trophy,
  Users,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

interface TournamentPageProps {
  params: Promise<{ id: string }>;
}

const statusConfig = {
  setup: { label: "Vorbereitung", variant: "secondary" as const },
  "in-progress": { label: "Läuft", variant: "default" as const },
  completed: { label: "Beendet", variant: "outline" as const },
};

export default function TournamentPage({ params }: TournamentPageProps) {
  const { id } = use(params);
  const tournamentId = parseInt(id);

  if (isNaN(tournamentId)) {
    notFound();
  }

  const {
    data: tournament,
    isLoading,
    refetch,
  } = api.tournament.getById.useQuery({
    id: tournamentId,
  });

  const [selectedMatch, setSelectedMatch] = useState<{
    id: string;
    participant1Name: string;
    participant2Name: string;
    score1: number | null;
    score2: number | null;
  } | null>(null);
  const [score1, setScore1] = useState<string>("");
  const [score2, setScore2] = useState<string>("");

  const startMutation = api.tournament.start.useMutation({
    onSuccess: () => {
      toast.success("Turnier gestartet!");
      void refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Fehler beim Starten");
    },
  });

  const updateMatchMutation = api.tournament.updateMatch.useMutation({
    onSuccess: () => {
      toast.success("Ergebnis gespeichert!");
      setSelectedMatch(null);
      setScore1("");
      setScore2("");
      void refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Fehler beim Speichern");
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      </div>
    );
  }

  if (!tournament) {
    notFound();
  }

  const getParticipantName = (id: string | null) => {
    if (!id) return "TBD";
    const participant = tournament.participants?.find((p) => p.id === id);
    return participant?.name ?? "Unbekannt";
  };

  const handleShareLink = async () => {
    const url = `${window.location.origin}/tools/tournament/${tournament.id}/public`;
    await navigator.clipboard.writeText(url);
    toast.success("Link kopiert!");
  };

  const handleMatchClick = (
    match: NonNullable<typeof tournament.matches>[number],
  ) => {
    if (tournament.status === "completed" || match.status === "completed")
      return;
    if (!match.participant1Id || !match.participant2Id) return;

    setSelectedMatch({
      id: match.id,
      participant1Name: getParticipantName(match.participant1Id),
      participant2Name: getParticipantName(match.participant2Id),
      score1: match.score1,
      score2: match.score2,
    });
    setScore1(match.score1?.toString() ?? "");
    setScore2(match.score2?.toString() ?? "");
  };

  const handleSaveScore = async () => {
    if (!selectedMatch) return;

    const s1 = parseInt(score1);
    const s2 = parseInt(score2);

    if (isNaN(s1) || isNaN(s2) || s1 < 0 || s2 < 0) {
      toast.error("Bitte gib gültige Punktzahlen ein");
      return;
    }

    if (s1 === s2) {
      toast.error("Unentschieden nicht erlaubt");
      return;
    }

    await updateMatchMutation.mutateAsync({
      tournamentId: tournament.id,
      matchId: selectedMatch.id,
      score1: s1,
      score2: s2,
    });
  };

  const status =
    statusConfig[tournament.status as keyof typeof statusConfig] ??
    statusConfig.setup;

  // Group matches by round
  const matchesByRound: Record<number, typeof tournament.matches> = {};
  tournament.matches?.forEach((match) => {
    if (!matchesByRound[match.round]) {
      matchesByRound[match.round] = [];
    }
    matchesByRound[match.round]!.push(match);
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/tools/tournament">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Zurück
        </Link>
      </Button>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">
              {tournament.name}
            </h1>
            <Badge variant={status.variant}>{status.label}</Badge>
          </div>
          <p className="mt-1 text-muted-foreground">
            {tournament.type === "single-elimination" && "K.O.-System"}
            {tournament.type === "round-robin" && "Jeder gegen Jeden"}
            {tournament.type === "swiss" && "Schweizer System"}
            {" • "}
            {tournament.participants?.length ?? 0} Teilnehmer
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleShareLink}>
            <Share2 className="mr-2 h-4 w-4" />
            Link teilen
          </Button>
          {tournament.status === "setup" && (
            <Button onClick={() => startMutation.mutate({ id: tournament.id })}>
              <Play className="mr-2 h-4 w-4" />
              Turnier starten
            </Button>
          )}
        </div>
      </div>

      {/* Bracket View */}
      <Card>
        <CardHeader>
          <CardTitle>Spielplan</CardTitle>
          <CardDescription>
            {tournament.status === "setup"
              ? "Starte das Turnier, um Ergebnisse einzutragen."
              : "Klicke auf ein Match, um das Ergebnis einzutragen."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="flex gap-8 min-w-fit pb-4">
              {Object.entries(matchesByRound)
                .sort(([a], [b]) => parseInt(a) - parseInt(b))
                .map(([round, matches]) => (
                  <div
                    key={round}
                    className="flex flex-col gap-4 min-w-[250px]"
                  >
                    <h3 className="font-semibold text-center text-sm text-muted-foreground">
                      {parseInt(round) === Object.keys(matchesByRound).length
                        ? "Finale"
                        : `Runde ${round}`}
                    </h3>
                    <div className="flex flex-col gap-4 justify-around flex-1">
                      {matches?.map((match) => {
                        const isClickable =
                          tournament.status === "in-progress" &&
                          match.status !== "completed" &&
                          match.participant1Id &&
                          match.participant2Id;

                        return (
                          <div
                            key={match.id}
                            onClick={() =>
                              isClickable && handleMatchClick(match)
                            }
                            className={`rounded-lg border bg-card ${
                              isClickable
                                ? "cursor-pointer hover:border-primary"
                                : ""
                            }`}
                          >
                            <div
                              className={`flex items-center justify-between p-3 border-b ${
                                match.winnerId === match.participant1Id
                                  ? "bg-green-50 dark:bg-green-950/20"
                                  : ""
                              }`}
                            >
                              <span className="truncate font-medium">
                                {getParticipantName(match.participant1Id)}
                              </span>
                              <span className="ml-2 font-bold">
                                {match.score1 ?? "-"}
                              </span>
                            </div>
                            <div
                              className={`flex items-center justify-between p-3 ${
                                match.winnerId === match.participant2Id
                                  ? "bg-green-50 dark:bg-green-950/20"
                                  : ""
                              }`}
                            >
                              <span className="truncate font-medium">
                                {getParticipantName(match.participant2Id)}
                              </span>
                              <span className="ml-2 font-bold">
                                {match.score2 ?? "-"}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Participants List */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Teilnehmer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {tournament.participants?.map((participant) => (
              <div
                key={participant.id}
                className="flex items-center gap-2 rounded-lg border p-2"
              >
                <span className="text-sm text-muted-foreground w-6">
                  #{participant.seed}
                </span>
                <span className="truncate">{participant.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Score Dialog */}
      <Dialog
        open={!!selectedMatch}
        onOpenChange={(open) => !open && setSelectedMatch(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ergebnis eintragen</DialogTitle>
            <DialogDescription>
              Gib das Ergebnis für dieses Match ein.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label className="text-right truncate">
                {selectedMatch?.participant1Name}
              </Label>
              <Input
                type="number"
                min="0"
                value={score1}
                onChange={(e) => setScore1(e.target.value)}
                className="text-center"
              />
              <div />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label className="text-right truncate">
                {selectedMatch?.participant2Name}
              </Label>
              <Input
                type="number"
                min="0"
                value={score2}
                onChange={(e) => setScore2(e.target.value)}
                className="text-center"
              />
              <div />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setSelectedMatch(null)}>
              Abbrechen
            </Button>
            <Button onClick={handleSaveScore}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Speichern
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
