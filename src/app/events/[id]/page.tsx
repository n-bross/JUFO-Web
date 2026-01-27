import { type Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { Calendar, MapPin, Users, Clock, ArrowLeft } from "lucide-react";

import { api } from "~/trpc/server";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { EventRegistrationButton } from "~/components/features/event-registration-button";

interface EventPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { id } = await params;
  const event = await api.event.getById({ id: parseInt(id) });

  if (!event) {
    return {
      title: "Event nicht gefunden",
    };
  }

  return {
    title: event.title,
    description:
      event.description ??
      `Event am ${format(new Date(event.date), "dd.MM.yyyy")}`,
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params;
  const eventId = parseInt(id);

  if (isNaN(eventId)) {
    notFound();
  }

  const event = await api.event.getById({ id: eventId });

  if (!event) {
    notFound();
  }

  const spotsLeft = event.maxParticipants
    ? event.maxParticipants - (event.currentParticipants ?? 0)
    : null;

  const isFull = spotsLeft !== null && spotsLeft <= 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/events">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Zurück zu Events
        </Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {event.imageUrl && (
            <div className="mb-6 aspect-video overflow-hidden rounded-lg">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <h1 className="text-3xl font-bold tracking-tight">{event.title}</h1>

          {event.description && (
            <div className="mt-4 prose prose-gray dark:prose-invert max-w-none">
              <p className="text-muted-foreground whitespace-pre-wrap">
                {event.description}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Event-Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">
                    {format(new Date(event.date), "EEEE, dd. MMMM yyyy", {
                      locale: de,
                    })}
                  </p>
                  {event.endDate && (
                    <p className="text-sm text-muted-foreground">
                      bis{" "}
                      {format(new Date(event.endDate), "EEEE, dd. MMMM yyyy", {
                        locale: de,
                      })}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <p className="font-medium">
                  {format(new Date(event.date), "HH:mm", { locale: de })} Uhr
                  {event.endDate && (
                    <>
                      {" "}
                      -{" "}
                      {format(new Date(event.endDate), "HH:mm", {
                        locale: de,
                      })}{" "}
                      Uhr
                    </>
                  )}
                </p>
              </div>

              {event.location && (
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <p className="font-medium">{event.location}</p>
                </div>
              )}

              {event.maxParticipants && (
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div className="flex items-center gap-2">
                    <p className="font-medium">
                      {event.currentParticipants ?? 0} / {event.maxParticipants}{" "}
                      Plätze
                    </p>
                    {isFull ? (
                      <Badge variant="destructive">Ausgebucht</Badge>
                    ) : (
                      spotsLeft && (
                        <Badge variant="secondary">Noch {spotsLeft} frei</Badge>
                      )
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <EventRegistrationButton eventId={eventId} isFull={isFull} />
        </div>
      </div>
    </div>
  );
}
