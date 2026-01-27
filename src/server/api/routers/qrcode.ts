import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { qrCodes } from "~/server/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import { customAlphabet } from "nanoid";

// Generate a short, readable code
const generateShortCode = customAlphabet("ABCDEFGHJKLMNPQRSTUVWXYZ23456789", 6);

export const qrCodeRouter = createTRPCRouter({
  // Public: Resolve short code to URL
  resolve: publicProcedure
    .input(z.object({ shortCode: z.string() }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.db
        .select()
        .from(qrCodes)
        .where(eq(qrCodes.shortCode, input.shortCode.toUpperCase()))
        .limit(1);

      if (!result[0] || !result[0].isActive) {
        return null;
      }

      // Increment click count
      await ctx.db
        .update(qrCodes)
        .set({ clickCount: sql`${qrCodes.clickCount} + 1` })
        .where(eq(qrCodes.id, result[0].id));

      return result[0].targetUrl;
    }),

  // Protected: Create dynamic QR code
  create: protectedProcedure
    .input(
      z.object({
        targetUrl: z.string().url(),
        title: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const shortCode = generateShortCode();

      const result = await ctx.db
        .insert(qrCodes)
        .values({
          shortCode,
          targetUrl: input.targetUrl,
          title: input.title,
          createdBy: ctx.userId,
        })
        .returning();

      return result[0];
    }),

  // Protected: Get user's QR codes
  getMyQRCodes: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .select()
      .from(qrCodes)
      .where(eq(qrCodes.createdBy, ctx.userId))
      .orderBy(desc(qrCodes.createdAt));
  }),

  // Protected: Update QR code target URL
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        targetUrl: z.string().url().optional(),
        title: z.string().optional(),
        isActive: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;

      const qrCode = await ctx.db
        .select()
        .from(qrCodes)
        .where(eq(qrCodes.id, id))
        .limit(1);

      if (!qrCode[0]) {
        throw new Error("QR-Code nicht gefunden");
      }

      const role = ctx.auth.sessionClaims?.metadata?.role;
      if (qrCode[0].createdBy !== ctx.userId && role !== "admin") {
        throw new Error("Keine Berechtigung");
      }

      const result = await ctx.db
        .update(qrCodes)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(qrCodes.id, id))
        .returning();

      return result[0];
    }),

  // Protected: Delete QR code
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const qrCode = await ctx.db
        .select()
        .from(qrCodes)
        .where(eq(qrCodes.id, input.id))
        .limit(1);

      if (!qrCode[0]) {
        throw new Error("QR-Code nicht gefunden");
      }

      const role = ctx.auth.sessionClaims?.metadata?.role;
      if (qrCode[0].createdBy !== ctx.userId && role !== "admin") {
        throw new Error("Keine Berechtigung");
      }

      await ctx.db.delete(qrCodes).where(eq(qrCodes.id, input.id));

      return { success: true };
    }),

  // Protected: Get QR code stats
  getStats: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const qrCode = await ctx.db
        .select()
        .from(qrCodes)
        .where(eq(qrCodes.id, input.id))
        .limit(1);

      if (!qrCode[0]) {
        throw new Error("QR-Code nicht gefunden");
      }

      const role = ctx.auth.sessionClaims?.metadata?.role;
      if (qrCode[0].createdBy !== ctx.userId && role !== "admin") {
        throw new Error("Keine Berechtigung");
      }

      return {
        clickCount: qrCode[0].clickCount ?? 0,
        createdAt: qrCode[0].createdAt,
      };
    }),
});
