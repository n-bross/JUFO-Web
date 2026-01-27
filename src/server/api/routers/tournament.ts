import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { tournaments } from "~/server/db/schema";
import type {
  TournamentParticipant,
  TournamentMatch,
} from "~/server/db/schema";
import { eq, desc } from "drizzle-orm";
import { nanoid } from "nanoid";

// Generate matches for single elimination bracket
function generateSingleEliminationMatches(
  participants: TournamentParticipant[],
): TournamentMatch[] {
  const matches: TournamentMatch[] = [];
  const n = participants.length;

  // Calculate number of rounds
  const rounds = Math.ceil(Math.log2(n));
  const totalSlots = Math.pow(2, rounds);
  const byes = totalSlots - n;

  // Seed participants (higher seeds get byes)
  const seededParticipants = [...participants].sort(
    (a, b) => (a.seed ?? 999) - (b.seed ?? 999),
  );

  // First round matches
  let matchIndex = 0;
  const firstRoundMatches: TournamentMatch[] = [];

  for (let i = 0; i < totalSlots / 2; i++) {
    const p1Index = i;
    const p2Index = totalSlots - 1 - i;

    const p1 = seededParticipants[p1Index];
    const p2 = seededParticipants[p2Index];

    firstRoundMatches.push({
      id: nanoid(),
      round: 1,
      position: matchIndex++,
      participant1Id: p1?.id ?? null,
      participant2Id: p2?.id ?? null,
      score1: null,
      score2: null,
      winnerId: null,
      status: p1 && p2 ? "pending" : "completed", // Auto-complete byes
    });
  }

  matches.push(...firstRoundMatches);

  // Generate subsequent rounds
  for (let round = 2; round <= rounds; round++) {
    const matchesInRound = Math.pow(2, rounds - round);
    for (let i = 0; i < matchesInRound; i++) {
      matches.push({
        id: nanoid(),
        round,
        position: i,
        participant1Id: null,
        participant2Id: null,
        score1: null,
        score2: null,
        winnerId: null,
        status: "pending",
      });
    }
  }

  return matches;
}

// Generate round-robin matches
function generateRoundRobinMatches(
  participants: TournamentParticipant[],
): TournamentMatch[] {
  const matches: TournamentMatch[] = [];
  const n = participants.length;

  // Each participant plays against every other participant
  let round = 1;
  let position = 0;

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      matches.push({
        id: nanoid(),
        round,
        position: position++,
        participant1Id: participants[i]!.id,
        participant2Id: participants[j]!.id,
        score1: null,
        score2: null,
        winnerId: null,
        status: "pending",
      });
    }
  }

  return matches;
}

export const tournamentRouter = createTRPCRouter({
  // Public: Get tournament by ID
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.db
        .select()
        .from(tournaments)
        .where(eq(tournaments.id, input.id))
        .limit(1);
      return result[0] ?? null;
    }),

  // Public: Get all tournaments
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .select()
      .from(tournaments)
      .orderBy(desc(tournaments.createdAt));
  }),

  // Protected: Create tournament
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        type: z.enum(["single-elimination", "round-robin", "swiss"]),
        teamBased: z.boolean().default(false),
        participantNames: z.array(z.string().min(1)).min(2),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Create participants with IDs
      const participants: TournamentParticipant[] = input.participantNames.map(
        (name, index) => ({
          id: nanoid(),
          name,
          seed: index + 1,
        }),
      );

      // Generate matches based on tournament type
      let matches: TournamentMatch[] = [];

      if (input.type === "single-elimination") {
        matches = generateSingleEliminationMatches(participants);
      } else if (input.type === "round-robin") {
        matches = generateRoundRobinMatches(participants);
      }
      // Swiss system would need more complex logic

      const result = await ctx.db
        .insert(tournaments)
        .values({
          name: input.name,
          type: input.type,
          teamBased: input.teamBased,
          participants,
          matches,
          createdBy: ctx.userId,
        })
        .returning();

      return result[0];
    }),

  // Protected: Update match score
  updateMatch: protectedProcedure
    .input(
      z.object({
        tournamentId: z.number(),
        matchId: z.string(),
        score1: z.number().min(0),
        score2: z.number().min(0),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const tournament = await ctx.db
        .select()
        .from(tournaments)
        .where(eq(tournaments.id, input.tournamentId))
        .limit(1);

      if (!tournament[0]) {
        throw new Error("Turnier nicht gefunden");
      }

      const role = ctx.auth.sessionClaims?.metadata?.role;
      if (tournament[0].createdBy !== ctx.userId && role !== "admin") {
        throw new Error("Keine Berechtigung");
      }

      const matches = tournament[0].matches ?? [];
      const matchIndex = matches.findIndex((m) => m.id === input.matchId);

      if (matchIndex === -1) {
        throw new Error("Match nicht gefunden");
      }

      const match = matches[matchIndex]!;

      // Determine winner
      let winnerId: string | null = null;
      if (input.score1 > input.score2 && match.participant1Id) {
        winnerId = match.participant1Id;
      } else if (input.score2 > input.score1 && match.participant2Id) {
        winnerId = match.participant2Id;
      }

      // Update match
      matches[matchIndex] = {
        ...match,
        score1: input.score1,
        score2: input.score2,
        winnerId,
        status: "completed",
      };

      // For single elimination, advance winner to next round
      if (tournament[0].type === "single-elimination" && winnerId) {
        const nextRound = match.round + 1;
        const nextPosition = Math.floor(match.position / 2);
        const nextMatchIndex = matches.findIndex(
          (m) => m.round === nextRound && m.position === nextPosition,
        );

        if (nextMatchIndex !== -1) {
          const nextMatch = matches[nextMatchIndex]!;
          if (match.position % 2 === 0) {
            matches[nextMatchIndex] = {
              ...nextMatch,
              participant1Id: winnerId,
            };
          } else {
            matches[nextMatchIndex] = {
              ...nextMatch,
              participant2Id: winnerId,
            };
          }
        }
      }

      // Update tournament status
      const allCompleted = matches.every((m) => m.status === "completed");
      const hasInProgress = matches.some(
        (m) => m.status === "in-progress" || m.status === "completed",
      );

      let status = tournament[0].status;
      if (allCompleted) {
        status = "completed";
      } else if (hasInProgress) {
        status = "in-progress";
      }

      await ctx.db
        .update(tournaments)
        .set({
          matches,
          status,
          updatedAt: new Date(),
        })
        .where(eq(tournaments.id, input.tournamentId));

      return { success: true };
    }),

  // Protected: Start tournament
  start: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const tournament = await ctx.db
        .select()
        .from(tournaments)
        .where(eq(tournaments.id, input.id))
        .limit(1);

      if (!tournament[0]) {
        throw new Error("Turnier nicht gefunden");
      }

      const role = ctx.auth.sessionClaims?.metadata?.role;
      if (tournament[0].createdBy !== ctx.userId && role !== "admin") {
        throw new Error("Keine Berechtigung");
      }

      await ctx.db
        .update(tournaments)
        .set({ status: "in-progress", updatedAt: new Date() })
        .where(eq(tournaments.id, input.id));

      return { success: true };
    }),

  // Protected: Delete tournament
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const tournament = await ctx.db
        .select()
        .from(tournaments)
        .where(eq(tournaments.id, input.id))
        .limit(1);

      if (!tournament[0]) {
        throw new Error("Turnier nicht gefunden");
      }

      const role = ctx.auth.sessionClaims?.metadata?.role;
      if (tournament[0].createdBy !== ctx.userId && role !== "admin") {
        throw new Error("Keine Berechtigung");
      }

      await ctx.db.delete(tournaments).where(eq(tournaments.id, input.id));

      return { success: true };
    }),

  // Protected: Get user's tournaments
  getMyTournaments: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .select()
      .from(tournaments)
      .where(eq(tournaments.createdBy, ctx.userId))
      .orderBy(desc(tournaments.createdAt));
  }),
});
