"use client";

import { useState } from "react";
import { useUser, SignInButton, useAuth } from "@clerk/nextjs";
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

interface EventRegistrationButtonProps {
  eventId: number;
  isFull: boolean;
}

export function EventRegistrationButton({
  eventId,
  isFull,
}: EventRegistrationButtonProps) {
  const { isSignedIn, user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState("");

  const utils = api.useUtils();

  const { data: isRegistered, isLoading: checkingRegistration } =
    api.event.isRegistered.useQuery({ eventId }, { enabled: isSignedIn });

  const registerMutation = api.event.register.useMutation({
    onSuccess: () => {
      toast.success("Erfolgreich angemeldet!");
      void utils.event.isRegistered.invalidate({ eventId });
      void utils.event.getById.invalidate({ id: eventId });
    },
    onError: (error) => {
      toast.error(error.message || "Fehler bei der Anmeldung");
    },
  });

  const unregisterMutation = api.event.unregister.useMutation({
    onSuccess: () => {
      toast.success("Abmeldung erfolgreich");
      void utils.event.isRegistered.invalidate({ eventId });
      void utils.event.getById.invalidate({ id: eventId });
    },
    onError: (error) => {
      toast.error(error.message || "Fehler bei der Abmeldung");
    },
  });

  const handleRegister = async () => {
    if (!userName.trim()) {
      toast.error("Bitte gib deinen Namen ein");
      return;
    }

    setIsLoading(true);
    try {
      await registerMutation.mutateAsync({
        eventId,
        userName: userName.trim(),
        userEmail: user?.primaryEmailAddress?.emailAddress,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnregister = async () => {
    setIsLoading(true);
    try {
      await unregisterMutation.mutateAsync({ eventId });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isSignedIn) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Anmelden</CardTitle>
          <CardDescription>
            Melde dich an, um dich für dieses Event zu registrieren.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInButton mode="modal">
            <Button className="w-full">Jetzt anmelden</Button>
          </SignInButton>
        </CardContent>
      </Card>
    );
  }

  if (checkingRegistration) {
    return (
      <Card>
        <CardContent className="py-6">
          <div className="flex justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isRegistered) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-green-600">Du bist angemeldet!</CardTitle>
          <CardDescription>
            Du hast dich erfolgreich für dieses Event registriert.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleUnregister}
            disabled={isLoading}
          >
            {isLoading ? "Wird abgemeldet..." : "Abmelden"}
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (isFull) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-destructive">Ausgebucht</CardTitle>
          <CardDescription>
            Dieses Event ist leider bereits ausgebucht.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Jetzt anmelden</CardTitle>
        <CardDescription>
          Sichere dir deinen Platz bei diesem Event.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="userName">Dein Name</Label>
          <Input
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder={user?.fullName ?? "Dein Name"}
            defaultValue={user?.fullName ?? ""}
          />
        </div>
        <Button
          className="w-full"
          onClick={handleRegister}
          disabled={isLoading || !userName.trim()}
        >
          {isLoading ? "Wird angemeldet..." : "Jetzt anmelden"}
        </Button>
      </CardContent>
    </Card>
  );
}
