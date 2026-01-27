import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  boolean,
  jsonb,
} from "drizzle-orm/pg-core";

// Events
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  date: timestamp("date").notNull(),
  endDate: timestamp("end_date"),
  location: text("location"),
  maxParticipants: integer("max_participants"),
  currentParticipants: integer("current_participants").default(0),
  imageUrl: text("image_url"),
  isPublic: boolean("is_public").default(true),
  createdBy: text("created_by").notNull(), // Clerk User ID
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Event Registrations
export const eventRegistrations = pgTable("event_registrations", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id")
    .references(() => events.id, { onDelete: "cascade" })
    .notNull(),
  userId: text("user_id").notNull(),
  userName: text("user_name").notNull(),
  userEmail: text("user_email"),
  registeredAt: timestamp("registered_at").defaultNow(),
});

// Tournament Participant Type
export type TournamentParticipant = {
  id: string;
  name: string;
  seed?: number;
};

// Tournament Match Type
export type TournamentMatch = {
  id: string;
  round: number;
  position: number;
  participant1Id: string | null;
  participant2Id: string | null;
  score1: number | null;
  score2: number | null;
  winnerId: string | null;
  status: "pending" | "in-progress" | "completed";
};

// Tournaments
export const tournaments = pgTable("tournaments", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // "single-elimination" | "round-robin" | "swiss"
  teamBased: boolean("team_based").default(false),
  status: text("status").default("setup"), // "setup" | "in-progress" | "completed"
  participants: jsonb("participants")
    .$type<TournamentParticipant[]>()
    .notNull(),
  matches: jsonb("matches").$type<TournamentMatch[]>(),
  currentRound: integer("current_round").default(1),
  createdBy: text("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// QR Codes (Dynamic)
export const qrCodes = pgTable("qr_codes", {
  id: serial("id").primaryKey(),
  shortCode: text("short_code").notNull().unique(), // z.B. "ABC123"
  targetUrl: text("target_url").notNull(),
  title: text("title"),
  clickCount: integer("click_count").default(0),
  isActive: boolean("is_active").default(true),
  createdBy: text("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Info Pages (CMS)
export const pages = pgTable("pages", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  content: text("content").notNull(), // Markdown
  excerpt: text("excerpt"),
  published: boolean("published").default(false),
  sortOrder: integer("sort_order").default(0),
  createdBy: text("created_by"),
  updatedBy: text("updated_by"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Type exports for use in routers
export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;
export type EventRegistration = typeof eventRegistrations.$inferSelect;
export type NewEventRegistration = typeof eventRegistrations.$inferInsert;
export type Tournament = typeof tournaments.$inferSelect;
export type NewTournament = typeof tournaments.$inferInsert;
export type QRCode = typeof qrCodes.$inferSelect;
export type NewQRCode = typeof qrCodes.$inferInsert;
export type Page = typeof pages.$inferSelect;
export type NewPage = typeof pages.$inferInsert;
