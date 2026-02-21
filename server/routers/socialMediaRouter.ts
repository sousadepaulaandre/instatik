/**
 * Social Media Router
 * Endpoints TRPC para integração com TikTok e Instagram
 */

import { router, publicProcedure } from "@/server/trpc";
import { z } from "zod";
import { tiktokService } from "@/server/services/tiktokService";
import { instagramService } from "@/server/services/instagramService";

export const socialMediaRouter = router({
  // ============= TikTok Endpoints =============

  /**
   * Buscar informações de um vendedor TikTok
   */
  tiktok: router({
    getUserInfo: publicProcedure
      .input(z.object({ uniqueId: z.string() }))
      .query(async ({ input }) => {
        const userInfo = await tiktokService.getUserInfo(input.uniqueId);
        return userInfo;
      }),

    /**
     * Buscar vídeos por palavra-chave
     */
    searchVideos: publicProcedure
      .input(
        z.object({
          keyword: z.string(),
          cursor: z.number().optional(),
        })
      )
      .query(async ({ input }) => {
        const result = await tiktokService.searchVideos(
          input.keyword,
          input.cursor
        );
        return result;
      }),

    /**
     * Obter posts populares de um vendedor
     */
    getPopularPosts: publicProcedure
      .input(
        z.object({
          secUid: z.string(),
          count: z.number().default(10),
          cursor: z.string().default("0"),
        })
      )
      .query(async ({ input }) => {
        const result = await tiktokService.getUserPopularPosts(
          input.secUid,
          input.count,
          input.cursor
        );
        return result;
      }),

    /**
     * Analisar performance de um vendedor TikTok
     */
    analyzePerformance: publicProcedure
      .input(z.object({ uniqueId: z.string() }))
      .query(async ({ input }) => {
        const analysis = await tiktokService.analyzeSellerPerformance(
          input.uniqueId
        );
        return analysis;
      }),
  }),

  // ============= Instagram Endpoints =============

  instagram: router({
    /**
     * Buscar informações de um negócio Instagram
     * Requer: Instagram access token configurado
     */
    getUserInfo: publicProcedure
      .input(z.object({ userId: z.string() }))
      .query(async ({ input }) => {
        const userInfo = await instagramService.getUserInfo(input.userId);
        return userInfo;
      }),

    /**
     * Obter posts recentes de um negócio
     */
    getUserMedia: publicProcedure
      .input(
        z.object({
          userId: z.string(),
          limit: z.number().default(10),
        })
      )
      .query(async ({ input }) => {
        const media = await instagramService.getUserMedia(
          input.userId,
          input.limit
        );
        return media;
      }),

    /**
     * Obter insights de um negócio (requer permissões)
     */
    getInsights: publicProcedure
      .input(z.object({ userId: z.string() }))
      .query(async ({ input }) => {
        const insights = await instagramService.getUserInsights(input.userId);
        return insights;
      }),

    /**
     * Buscar hashtag
     */
    searchHashtag: publicProcedure
      .input(z.object({ hashtag: z.string() }))
      .query(async ({ input }) => {
        const hashtagId = await instagramService.searchHashtag(input.hashtag);
        return { hashtagId };
      }),

    /**
     * Obter posts com hashtag específica
     */
    getHashtagMedia: publicProcedure
      .input(
        z.object({
          hashtagId: z.string(),
          limit: z.number().default(10),
        })
      )
      .query(async ({ input }) => {
        const media = await instagramService.getHashtagMedia(
          input.hashtagId,
          input.limit
        );
        return media;
      }),

    /**
     * Analisar performance de um negócio Instagram
     */
    analyzePerformance: publicProcedure
      .input(z.object({ userId: z.string() }))
      .query(async ({ input }) => {
        const analysis = await instagramService.analyzeBusinessPerformance(
          input.userId
        );
        return analysis;
      }),

    /**
     * Configurar novo token de acesso
     */
    setAccessToken: publicProcedure
      .input(z.object({ token: z.string() }))
      .mutation(async ({ input }) => {
        instagramService.setAccessToken(input.token);
        return { success: true };
      }),
  }),

  // ============= Endpoints de Comparação =============

  /**
   * Comparar performance entre TikTok e Instagram
   */
  comparePerformance: publicProcedure
    .input(
      z.object({
        tiktokUsername: z.string().optional(),
        instagramUserId: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const results: any = {};

      if (input.tiktokUsername) {
        results.tiktok = await tiktokService.analyzeSellerPerformance(
          input.tiktokUsername
        );
      }

      if (input.instagramUserId) {
        results.instagram = await instagramService.analyzeBusinessPerformance(
          input.instagramUserId
        );
      }

      return results;
    }),

  /**
   * Buscar produtos em ambas plataformas
   */
  searchProducts: publicProcedure
    .input(z.object({ keyword: z.string() }))
    .query(async ({ input }) => {
      const [tiktokResults, instagramResults] = await Promise.all([
        tiktokService.searchVideos(input.keyword),
        // Instagram search requer hashtag search
        instagramService.searchHashtag(input.keyword),
      ]);

      return {
        tiktok: tiktokResults,
        instagram: instagramResults,
      };
    }),
});
