import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
  adminProcedure,
} from "~/server/api/trpc";
import { events, eventRegistrations } from "~/server/db/schema";
import { eq, desc, gte, and, sql } from "drizzle-orm";

export const eventRouter = createTRPCRouter({
  // Public: Get all upcoming events
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .select()
      .from(events)
      .where(and(eq(events.isPublic, true), gte(events.date, new Date())))
      .orderBy(events.date);
  }),

  // Public: Get all events (including past)
  getAllIncludingPast: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .select()
      .from(events)
      .where(eq(events.isPublic, true))
      .orderBy(desc(events.date));
  }),

  // Public: Get single event by ID
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.db
        .select()
        .from(events)
        .where(eq(events.id, input.id))
        .limit(1);
      return result[0] ?? null;
    }),

  // Public: Get event registrations count
  getRegistrationCount: publicProcedure
    .input(z.object({ eventId: z.number() }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.db
        .select({ count: sql<number>`count(*)` })
        .from(eventRegistrations)
        .where(eq(eventRegistrations.eventId, input.eventId));
      return result[0]?.count ?? 0;
    }),

  // Protected: Check if user is registered
  isRegistered: protectedProcedure
    .input(z.object({ eventId: z.number() }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.db
        .select()
        .from(eventRegistrations)
        .where(
          and(
            eq(eventRegistrations.eventId, input.eventId),
            eq(eventRegistrations.userId, ctx.userId),
          ),
        )
        .limit(1);
      return result.length > 0;
    }),

  // Protected: Register for event
  register: protectedProcedure
    .input(
      z.object({
        eventId: z.number(),
        userName: z.string().min(1),
        userEmail: z.string().email().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Check if already registered
      const existing = await ctx.db
        .select()
        .from(eventRegistrations)
        .where(
          and(
            eq(eventRegistrations.eventId, input.eventId),
            eq(eventRegistrations.userId, ctx.userId),
          ),
        )
        .limit(1);

      if (existing.length > 0) {
        throw new Error("Du bist bereits für dieses Event angemeldet");
      }

      // Check if event exists and has space
      const event = await ctx.db
        .select()
        .from(events)
        .where(eq(events.id, input.eventId))
        .limit(1);

      if (!event[0]) {
        throw new Error("Event nicht gefunden");
      }

      if (
        event[0].maxParticipants &&
        (event[0].currentParticipants ?? 0) >= event[0].maxParticipants
      ) {
        throw new Error("Event ist ausgebucht");
      }

      // Register user
      await ctx.db.insert(eventRegistrations).values({
        eventId: input.eventId,
        userId: ctx.userId,
        userName: input.userName,
        userEmail: input.userEmail,
      });

      // Update participant count
      await ctx.db
        .update(events)
        .set({
          currentParticipants: sql`${events.currentParticipants} + 1`,
        })
        .where(eq(events.id, input.eventId));

      return { success: true };
    }),

  // Protected: Unregister from event
  unregister: protectedProcedure
    .input(z.object({ eventId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db
        .delete(eventRegistrations)
        .where(
          and(
            eq(eventRegistrations.eventId, input.eventId),
            eq(eventRegistrations.userId, ctx.userId),
          ),
        )
        .returning();

      if (result.length > 0) {
        await ctx.db
          .update(events)
          .set({
            currentParticipants: sql`GREATEST(${events.currentParticipants} - 1, 0)`,
          })
          .where(eq(events.id, input.eventId));
      }

      return { success: true };
    }),

  // Protected: Create event
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().optional(),
        date: z.date(),
        endDate: z.date().optional(),
        location: z.string().optional(),
        maxParticipants: z.number().positive().optional(),
        imageUrl: z.string().url().optional(),
        isPublic: z.boolean().default(true),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db
        .insert(events)
        .values({
          ...input,
          createdBy: ctx.userId,
        })
        .returning();
      return result[0];
    }),

  // Protected: Update event
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().min(1).optional(),
        description: z.string().optional(),
        date: z.date().optional(),
        endDate: z.date().optional(),
        location: z.string().optional(),
        maxParticipants: z.number().positive().optional(),
        imageUrl: z.string().url().optional(),
        isPublic: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;

      // Check ownership or admin
      const event = await ctx.db
        .select()
        .from(events)
        .where(eq(events.id, id))
        .limit(1);

      if (!event[0]) {
        throw new Error("Event nicht gefunden");
      }

      const role = ctx.auth.sessionClaims?.metadata?.role;
      if (event[0].createdBy !== ctx.userId && role !== "admin") {
        throw new Error("Keine Berechtigung");
      }

      const result = await ctx.db
        .update(events)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(events.id, id))
        .returning();

      return result[0];
    }),

  // Admin: Delete event
  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(events).where(eq(events.id, input.id));
      return { success: true };
    }),

  // Admin: Get all events for management
  adminGetAll: adminProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(events).orderBy(desc(events.date));
  }),

  // Protected: Get registrations for an event
  getRegistrations: protectedProcedure
    .input(z.object({ eventId: z.number() }))
    .query(async ({ ctx, input }) => {
      // Check ownership or admin
      const event = await ctx.db
        .select()
        .from(events)
        .where(eq(events.id, input.eventId))
        .limit(1);

      if (!event[0]) {
        throw new Error("Event nicht gefunden");
      }

      const role = ctx.auth.sessionClaims?.metadata?.role;
      if (event[0].createdBy !== ctx.userId && role !== "admin") {
        throw new Error("Keine Berechtigung");
      }

      return await ctx.db
        .select()
        .from(eventRegistrations)
        .where(eq(eventRegistrations.eventId, input.eventId))
        .orderBy(eventRegistrations.registeredAt);
    }),
});
