import { type Metadata } from "next";
import Link from "next/link";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { Calendar, MapPin, Users, Clock } from "lucide-react";

import { api } from "~/trpc/server";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Entdecke kommende Events und Veranstaltungen des Jugendforums Grafing.",
};

export default async function EventsPage() {
  const events = await api.event.getAll();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Events</h1>
        <p className="mt-2 text-muted-foreground">
          Entdecke kommende Veranstaltungen und melde dich an!
        </p>
      </div>

      {events.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">Keine Events geplant</h3>
            <p className="mt-2 text-muted-foreground">
              Momentan sind keine Events geplant. Schau später wieder vorbei!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card
              key={event.id}
              className="flex flex-col transition-shadow hover:shadow-lg"
            >
              {event.imageUrl && (
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="line-clamp-2">{event.title}</CardTitle>
                  {event.maxParticipants && (
                    <Badge variant="secondary">
                      {event.currentParticipants ?? 0}/{event.maxParticipants}
                    </Badge>
                  )}
                </div>
                {event.description && (
                  <CardDescription className="line-clamp-2">
                    {event.description}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {format(new Date(event.date), "EEEE, dd. MMMM yyyy", {
                        locale: de,
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>
                      {format(new Date(event.date), "HH:mm", { locale: de })}{" "}
                      Uhr
                    </span>
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/events/${event.id}`}>Details anzeigen</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
