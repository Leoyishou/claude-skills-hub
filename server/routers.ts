import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { 
  getAllCategories, 
  getAllSkills, 
  getSkillsByCategory, 
  getSkillById,
  bulkUpsertCategories,
  bulkUpsertSkills,
  upsertSkill,
  deleteSkill
} from "./db";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Categories API
  categories: router({
    list: publicProcedure.query(async () => {
      return await getAllCategories();
    }),
  }),

  // Skills API
  skills: router({
    list: publicProcedure.query(async () => {
      return await getAllSkills();
    }),
    
    byCategory: publicProcedure
      .input(z.object({ categoryId: z.string() }))
      .query(async ({ input }) => {
        return await getSkillsByCategory(input.categoryId);
      }),
    
    byId: publicProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input }) => {
        return await getSkillById(input.id);
      }),

    // Admin operations (protected)
    create: protectedProcedure
      .input(z.object({
        id: z.string(),
        titleEn: z.string(),
        titleZh: z.string(),
        descriptionEn: z.string().optional(),
        descriptionZh: z.string().optional(),
        scenarioEn: z.string().optional(),
        scenarioZh: z.string().optional(),
        category: z.string(),
        tagsEn: z.array(z.string()).optional(),
        tagsZh: z.array(z.string()).optional(),
        source: z.enum(["official", "community"]).optional(),
        author: z.string().optional(),
        url: z.string().optional(),
        sortOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        await upsertSkill(input);
        return { success: true };
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ input }) => {
        await deleteSkill(input.id);
        return { success: true };
      }),

    // Bulk seed operation (protected)
    bulkSeed: protectedProcedure
      .input(z.object({
        categories: z.array(z.object({
          id: z.string(),
          nameEn: z.string(),
          nameZh: z.string(),
          descEn: z.string().optional(),
          descZh: z.string().optional(),
          color: z.string().optional(),
          icon: z.string().optional(),
          sortOrder: z.number().optional(),
        })),
        skills: z.array(z.object({
          id: z.string(),
          titleEn: z.string(),
          titleZh: z.string(),
          descriptionEn: z.string().optional(),
          descriptionZh: z.string().optional(),
          scenarioEn: z.string().optional(),
          scenarioZh: z.string().optional(),
          category: z.string(),
          tagsEn: z.array(z.string()).optional(),
          tagsZh: z.array(z.string()).optional(),
          source: z.enum(["official", "community"]).optional(),
          author: z.string().optional(),
          url: z.string().optional(),
          sortOrder: z.number().optional(),
        })),
      }))
      .mutation(async ({ input }) => {
        await bulkUpsertCategories(input.categories);
        await bulkUpsertSkills(input.skills);
        return { success: true, categoriesCount: input.categories.length, skillsCount: input.skills.length };
      }),
  }),
});

export type AppRouter = typeof appRouter;
