/**
 * TikTok API Service
 * Integração com TikTok para coleta de dados de vendedores e produtos
 */

import { ApiClient } from "@manus/data-api";

interface TikTokUser {
  id: string;
  uniqueId: string;
  secUid: string;
  nickname: string;
  signature: string;
  verified: boolean;
  followerCount: number;
  followingCount: number;
  heartCount: number;
  videoCount: number;
  avatarUrl?: string;
}

interface TikTokVideo {
  awemeId: string;
  desc: string;
  playCount: number;
  commentCount: number;
  shareCount: number;
  diggCount: number;
  authorId: string;
  authorUniqueId: string;
  createTime: number;
  videoUrl?: string;
}

interface TikTokUserPopularPosts {
  posts: TikTokVideo[];
  hasMore: boolean;
  cursor: string;
}

export class TikTokService {
  private apiClient: ApiClient;

  constructor() {
    this.apiClient = new ApiClient();
  }

  /**
   * Buscar informações de um usuário TikTok
   * @param uniqueId Username do usuário (ex: "manusaiofficial")
   */
  async getUserInfo(uniqueId: string): Promise<TikTokUser | null> {
    try {
      const response = await this.apiClient.call_api("Tiktok/get_user_info", {
        query: { uniqueId },
      });

      if (!response || !response.userInfo) {
        return null;
      }

      const user = response.userInfo.user || {};
      const stats = response.userInfo.stats || {};

      return {
        id: user.id || "",
        uniqueId: user.uniqueId || uniqueId,
        secUid: user.secUid || "",
        nickname: user.nickname || "",
        signature: user.signature || "",
        verified: user.verified || false,
        followerCount: stats.followerCount || 0,
        followingCount: stats.followingCount || 0,
        heartCount: stats.heartCount || 0,
        videoCount: stats.videoCount || 0,
        avatarUrl: user.avatarMedium || user.avatarLarger,
      };
    } catch (error) {
      console.error(`Error fetching TikTok user info for ${uniqueId}:`, error);
      return null;
    }
  }

  /**
   * Buscar vídeos por palavra-chave
   * @param keyword Termo de busca (ex: "produtos", "loja online")
   * @param cursor Para paginação
   */
  async searchVideos(
    keyword: string,
    cursor?: number
  ): Promise<{ videos: TikTokVideo[]; cursor?: number; hasMore?: boolean }> {
    try {
      const query: Record<string, any> = { keyword };
      if (cursor !== undefined) {
        query.cursor = cursor;
      }

      const response = await this.apiClient.call_api(
        "Tiktok/search_tiktok_video_general",
        { query }
      );

      if (!response || !response.data) {
        return { videos: [] };
      }

      const videos: TikTokVideo[] = (response.data || []).map((item: any) => ({
        awemeId: item.aweme_id || "",
        desc: item.desc || "",
        playCount: item.statistics?.playCount || 0,
        commentCount: item.statistics?.commentCount || 0,
        shareCount: item.statistics?.shareCount || 0,
        diggCount: item.statistics?.diggCount || 0,
        authorId: item.author?.id || "",
        authorUniqueId: item.author?.uniqueId || "",
        createTime: item.createTime || 0,
        videoUrl: item.video?.downloadAddr || item.video?.playAddr,
      }));

      return {
        videos,
        cursor: response.cursor,
        hasMore: response.hasMore,
      };
    } catch (error) {
      console.error(`Error searching TikTok videos for "${keyword}":`, error);
      return { videos: [] };
    }
  }

  /**
   * Obter posts populares de um usuário
   * @param secUid Security UID do usuário
   * @param count Número de posts (máximo 35)
   * @param cursor Para paginação
   */
  async getUserPopularPosts(
    secUid: string,
    count: number = 10,
    cursor: string = "0"
  ): Promise<TikTokUserPopularPosts> {
    try {
      const response = await this.apiClient.call_api(
        "Tiktok/get_user_popular_posts",
        {
          query: {
            secUid,
            count: Math.min(count, 35),
            cursor,
          },
        }
      );

      if (!response || !response.data) {
        return { posts: [], hasMore: false, cursor: "" };
      }

      const data = response.data || {};
      const posts: TikTokVideo[] = (data.itemList || []).map((item: any) => ({
        awemeId: item.id || "",
        desc: item.desc || "",
        playCount: item.stats?.playCount || 0,
        commentCount: item.stats?.commentCount || 0,
        shareCount: item.stats?.shareCount || 0,
        diggCount: item.stats?.diggCount || 0,
        authorId: item.author?.id || "",
        authorUniqueId: item.author?.uniqueId || "",
        createTime: item.createTime || 0,
        videoUrl: item.video?.downloadAddr || item.video?.playAddr,
      }));

      return {
        posts,
        hasMore: data.hasMore || false,
        cursor: data.cursor || "",
      };
    } catch (error) {
      console.error(
        `Error fetching popular posts for user ${secUid}:`,
        error
      );
      return { posts: [], hasMore: false, cursor: "" };
    }
  }

  /**
   * Analisar performance de um vendedor
   * Coleta múltiplos dados para análise completa
   */
  async analyzeSellerPerformance(uniqueId: string) {
    try {
      // Obter informações do usuário
      const userInfo = await this.getUserInfo(uniqueId);
      if (!userInfo) {
        return null;
      }

      // Obter posts populares
      const popularPosts = await this.getUserPopularPosts(
        userInfo.secUid,
        10
      );

      // Calcular métricas
      const avgEngagement =
        popularPosts.posts.length > 0
          ? popularPosts.posts.reduce(
              (sum, post) =>
                sum + (post.diggCount + post.commentCount + post.shareCount),
              0
            ) / popularPosts.posts.length
          : 0;

      const avgViews =
        popularPosts.posts.length > 0
          ? popularPosts.posts.reduce((sum, post) => sum + post.playCount, 0) /
            popularPosts.posts.length
          : 0;

      return {
        user: userInfo,
        topPosts: popularPosts.posts.slice(0, 5),
        metrics: {
          avgEngagement: Math.round(avgEngagement),
          avgViews: Math.round(avgViews),
          engagementRate: userInfo.followerCount
            ? (avgEngagement / userInfo.followerCount) * 100
            : 0,
          totalEngagement: popularPosts.posts.reduce(
            (sum, post) =>
              sum + (post.diggCount + post.commentCount + post.shareCount),
            0
          ),
        },
      };
    } catch (error) {
      console.error(`Error analyzing seller ${uniqueId}:`, error);
      return null;
    }
  }
}

export const tiktokService = new TikTokService();
