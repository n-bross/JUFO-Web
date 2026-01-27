"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { deDE } from "@clerk/localizations";

interface ProvidersProps {
  children: React.ReactNode;
}

export function ClerkClientProvider({ children }: ProvidersProps) {
  return (
    <ClerkProvider
      localization={deDE}
      appearance={{
        elements: {
          formButtonPrimary:
            "bg-primary text-primary-foreground hover:bg-primary/90",
          card: "shadow-none",
          headerTitle: "text-foreground",
          headerSubtitle: "text-muted-foreground",
          socialButtonsBlockButton:
            "border-input bg-background hover:bg-accent hover:text-accent-foreground",
          formFieldInput: "border-input bg-background text-foreground",
          footerActionLink: "text-primary hover:text-primary/90",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
