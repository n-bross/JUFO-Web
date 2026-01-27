import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { ClerkClientProvider } from "~/components/providers/clerk-provider";
import { Header, Footer } from "~/components/layout";
import { Toaster } from "~/components/ui/sonner";

export const metadata: Metadata = {
  title: {
    default: "Jugendforum Grafing",
    template: "%s | Jugendforum Grafing",
  },
  description:
    "Beteiligungsplattform für Jugendliche (12-27 Jahre) zur Mitgestaltung der Stadt Grafing bei München.",
  keywords: [
    "Jugendforum",
    "Grafing",
    "München",
    "Jugendliche",
    "Beteiligung",
    "Partizipation",
  ],
  authors: [{ name: "Jugendforum Grafing" }],
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${geist.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ClerkClientProvider>
          <TRPCReactProvider>
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </TRPCReactProvider>
        </ClerkClientProvider>
      </body>
    </html>
  );
}
