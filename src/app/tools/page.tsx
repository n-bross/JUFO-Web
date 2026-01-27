import { type Metadata } from "next";
import Link from "next/link";
import { Trophy, QrCode, Calendar, ArrowRight, Wrench } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export const metadata: Metadata = {
  title: "Tools",
  description: "Nützliche Tools für die Event-Planung und Organisation.",
};

const tools = [
  {
    title: "Turnier-Planer",
    description:
      "Erstelle und verwalte Turniere mit verschiedenen Formaten (Single Elimination, Round Robin) und Live-Score-Updates.",
    icon: Trophy,
    href: "/tools/tournament",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    title: "QR-Code Generator",
    description:
      "Erstelle statische QR-Codes oder dynamische QR-Codes mit Tracking und änderbarem Ziel.",
    icon: QrCode,
    href: "/tools/qr-generator",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
];

export default function ToolsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Tools</h1>
        <p className="mt-2 text-muted-foreground">
          Nützliche Tools für die Event-Planung und Organisation.
        </p>
      </div>

      <SignedIn>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Card
                key={tool.href}
                className="group transition-shadow hover:shadow-lg"
              >
                <CardHeader>
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-lg ${tool.bgColor}`}
                  >
                    <Icon className={`h-6 w-6 ${tool.color}`} />
                  </div>
                  <CardTitle className="mt-4">{tool.title}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="ghost" className="p-0">
                    <Link href={tool.href} className="flex items-center">
                      Tool öffnen
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </SignedIn>

      <SignedOut>
        <Card className="max-w-lg mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Wrench className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="mt-4">Anmeldung erforderlich</CardTitle>
            <CardDescription>
              Um die Tools nutzen zu können, musst du angemeldet sein.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild>
              <Link href="/sign-in">Jetzt anmelden</Link>
            </Button>
          </CardContent>
        </Card>
      </SignedOut>
    </div>
  );
}
