"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Users, Gamepad2 } from "lucide-react";
import { toast } from "sonner";

import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Switch } from "~/components/ui/switch";

export default function NewTournamentPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [type, setType] = useState<
    "single-elimination" | "round-robin" | "swiss"
  >("single-elimination");
  const [teamBased, setTeamBased] = useState(false);
  const [participantsText, setParticipantsText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createMutation = api.tournament.create.useMutation({
    onSuccess: (tournament) => {
      toast.success("Turnier erstellt!");
      router.push(`/tools/tournament/${tournament?.id}`);
    },
    onError: (error) => {
      toast.error(error.message || "Fehler beim Erstellen des Turniers");
      setIsSubmitting(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const participantNames = participantsText
      .split("\n")
      .map((name) => name.trim())
      .filter((name) => name.length > 0);

    if (!name.trim()) {
      toast.error("Bitte gib einen Namen für das Turnier ein");
      return;
    }

    if (participantNames.length < 2) {
      toast.error("Mindestens 2 Teilnehmer erforderlich");
      return;
    }

    setIsSubmitting(true);

    await createMutation.mutateAsync({
      name: name.trim(),
      type,
      teamBased,
      participantNames,
    });
  };

  const participantCount = participantsText
    .split("\n")
    .filter((line) => line.trim().length > 0).length;

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/tools/tournament">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Zurück
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Neues Turnier erstellen</CardTitle>
          <CardDescription>
            Erstelle ein Turnier und lade Teilnehmer ein.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tournament Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Turniername *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="z.B. FIFA Turnier 2026"
                required
              />
            </div>

            {/* Tournament Type */}
            <div className="space-y-2">
              <Label htmlFor="type">Turnierformat *</Label>
              <Select
                value={type}
                onValueChange={(v) =>
                  setType(v as "single-elimination" | "round-robin" | "swiss")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Format auswählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single-elimination">
                    K.O.-System (Single Elimination)
                  </SelectItem>
                  <SelectItem value="round-robin">
                    Jeder gegen Jeden (Round Robin)
                  </SelectItem>
                  <SelectItem value="swiss" disabled>
                    Schweizer System (Coming Soon)
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {type === "single-elimination" &&
                  "Verlierer scheiden direkt aus. Perfekt für schnelle Turniere."}
                {type === "round-robin" &&
                  "Jeder spielt gegen jeden. Ideal für kleinere Gruppen."}
                {type === "swiss" &&
                  "Mehrere Runden, ähnlich starke Gegner. Gut für große Gruppen."}
              </p>
            </div>

            {/* Team Based Toggle */}
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="teamBased" className="text-base">
                  Team-Turnier
                </Label>
                <p className="text-sm text-muted-foreground">
                  Aktiviere diese Option für Team-basierte Turniere
                </p>
              </div>
              <Switch
                id="teamBased"
                checked={teamBased}
                onCheckedChange={setTeamBased}
              />
            </div>

            {/* Participants */}
            <div className="space-y-2">
              <Label htmlFor="participants">
                {teamBased ? "Teams" : "Teilnehmer"} *
              </Label>
              <Textarea
                id="participants"
                value={participantsText}
                onChange={(e) => setParticipantsText(e.target.value)}
                placeholder={
                  teamBased
                    ? "Ein Team pro Zeile:\nTeam A\nTeam B\nTeam C"
                    : "Ein Name pro Zeile:\nMax Mustermann\nErika Musterfrau\nJohn Doe"
                }
                className="min-h-[150px] font-mono"
                required
              />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {teamBased ? (
                  <Gamepad2 className="h-4 w-4" />
                ) : (
                  <Users className="h-4 w-4" />
                )}
                <span>
                  {participantCount}{" "}
                  {teamBased
                    ? participantCount === 1
                      ? "Team"
                      : "Teams"
                    : participantCount === 1
                      ? "Teilnehmer"
                      : "Teilnehmer"}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || participantCount < 2}
            >
              {isSubmitting ? "Wird erstellt..." : "Turnier erstellen"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
