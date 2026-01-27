import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  adminProcedure,
} from "~/server/api/trpc";
import { pages } from "~/server/db/schema";
import { eq, and } from "drizzle-orm";

export const pageRouter = createTRPCRouter({
  // Public: Get published page by slug
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.db
        .select()
        .from(pages)
        .where(and(eq(pages.slug, input.slug), eq(pages.published, true)))
        .limit(1);
      return result[0] ?? null;
    }),

  // Public: Get all published pages (for navigation)
  getPublished: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .select({
        id: pages.id,
        slug: pages.slug,
        title: pages.title,
        excerpt: pages.excerpt,
        sortOrder: pages.sortOrder,
      })
      .from(pages)
      .where(eq(pages.published, true))
      .orderBy(pages.sortOrder);
  }),

  // Admin: Get all pages
  getAll: adminProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(pages).orderBy(pages.sortOrder);
  }),

  // Admin: Get single page by ID
  getById: adminProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.db
        .select()
        .from(pages)
        .where(eq(pages.id, input.id))
        .limit(1);
      return result[0] ?? null;
    }),

  // Admin: Create page
  create: adminProcedure
    .input(
      z.object({
        slug: z
          .string()
          .min(1)
          .regex(/^[a-z0-9-]+$/),
        title: z.string().min(1),
        content: z.string().min(1),
        excerpt: z.string().optional(),
        published: z.boolean().default(false),
        sortOrder: z.number().default(0),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db
        .insert(pages)
        .values({
          ...input,
          createdBy: ctx.userId,
          updatedBy: ctx.userId,
        })
        .returning();

      return result[0];
    }),

  // Admin: Update page
  update: adminProcedure
    .input(
      z.object({
        id: z.number(),
        slug: z
          .string()
          .min(1)
          .regex(/^[a-z0-9-]+$/)
          .optional(),
        title: z.string().min(1).optional(),
        content: z.string().min(1).optional(),
        excerpt: z.string().optional(),
        published: z.boolean().optional(),
        sortOrder: z.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;

      const result = await ctx.db
        .update(pages)
        .set({
          ...data,
          updatedBy: ctx.userId,
          updatedAt: new Date(),
        })
        .where(eq(pages.id, id))
        .returning();

      return result[0];
    }),

  // Admin: Delete page
  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(pages).where(eq(pages.id, input.id));
      return { success: true };
    }),
});
