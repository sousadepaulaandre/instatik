/**
 * Instagram API Service
 * Integração com Instagram Graph API para coleta de dados de negócios
 */

interface InstagramUser {
  id: string;
  username: string;
  name: string;
  biography: string;
  website?: string;
  profilePictureUrl?: string;
  followerCount?: number;
  followsCount?: number;
  mediaCount?: number;
}

interface InstagramMedia {
  id: string;
  caption: string;
  mediaType: "CAROUSEL" | "IMAGE" | "VIDEO";
  mediaUrl?: string;
  permalink: string;
  timestamp: string;
  likeCount?: number;
  commentsCount?: number;
}

interface InstagramInsights {
  impressions: number;
  reach: number;
  profileViews: number;
  followerCount: number;
}

export class InstagramService {
  private accessToken: string;
  private apiVersion: string = "v18.0";
  private baseUrl: string = "https://graph.instagram.com";

  constructor(accessToken?: string) {
    this.accessToken = accessToken || process.env.INSTAGRAM_ACCESS_TOKEN || "";
  }

  /**
   * Fazer requisição para Instagram Graph API
   */
  private async makeRequest(
    endpoint: string,
    method: string = "GET",
    data?: Record<string, any>
  ): Promise<any> {
    try {
      if (!this.accessToken) {
        throw new Error(
          "Instagram access token not configured. Set INSTAGRAM_ACCESS_TOKEN environment variable."
        );
      }

      const url = new URL(
        `${this.baseUrl}/${this.apiVersion}${endpoint}`
      );
      url.searchParams.append("access_token", this.accessToken);

      const options: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (data && (method === "POST" || method === "PUT")) {
        options.body = JSON.stringify(data);
      }

      const response = await fetch(url.toString(), options);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          `Instagram API error: ${error.error?.message || response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error(`Instagram API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  /**
   * Obter informações do perfil de negócio
   */
  async getUserInfo(userId: string): Promise<InstagramUser | null> {
    try {
      const fields =
        "id,username,name,biography,website,profile_picture_url,followers_count,follows_count,media_count";
      const response = await this.makeRequest(
        `/${userId}?fields=${fields}`
      );

      return {
        id: response.id,
        username: response.username,
        name: response.name,
        biography: response.biography || "",
        website: response.website,
        profilePictureUrl: response.profile_picture_url,
        followerCount: response.followers_count,
        followsCount: response.follows_count,
        mediaCount: response.media_count,
      };
    } catch (error) {
      console.error(`Error fetching Instagram user info for ${userId}:`, error);
      return null;
    }
  }

  /**
   * Obter posts recentes de um usuário
   */
  async getUserMedia(
    userId: string,
    limit: number = 10
  ): Promise<InstagramMedia[]> {
    try {
      const fields =
        "id,caption,media_type,media_url,permalink,timestamp,like_count,comments_count";
      const response = await this.makeRequest(
        `/${userId}/media?fields=${fields}&limit=${limit}`
      );

      return (response.data || []).map((item: any) => ({
        id: item.id,
        caption: item.caption || "",
        mediaType: item.media_type,
        mediaUrl: item.media_url,
        permalink: item.permalink,
        timestamp: item.timestamp,
        likeCount: item.like_count,
        commentsCount: item.comments_count,
      }));
    } catch (error) {
      console.error(`Error fetching Instagram media for ${userId}:`, error);
      return [];
    }
  }

  /**
   * Obter insights de um usuário (requer permissões de negócio)
   */
  async getUserInsights(userId: string): Promise<InstagramInsights | null> {
    try {
      const metrics =
        "impressions,reach,profile_views,follower_count";
      const response = await this.makeRequest(
        `/${userId}/insights?metric=${metrics}&period=day`
      );

      const data = response.data || [];
      const insights: InstagramInsights = {
        impressions: 0,
        reach: 0,
        profileViews: 0,
        followerCount: 0,
      };

      data.forEach((item: any) => {
        switch (item.name) {
          case "impressions":
            insights.impressions = item.values?.[0]?.value || 0;
            break;
          case "reach":
            insights.reach = item.values?.[0]?.value || 0;
            break;
          case "profile_views":
            insights.profileViews = item.values?.[0]?.value || 0;
            break;
          case "follower_count":
            insights.followerCount = item.values?.[0]?.value || 0;
            break;
        }
      });

      return insights;
    } catch (error) {
      console.error(
        `Error fetching Instagram insights for ${userId}:`,
        error
      );
      return null;
    }
  }

  /**
   * Buscar hashtags
   */
  async searchHashtag(hashtag: string): Promise<string | null> {
    try {
      const response = await this.makeRequest(
        `/ig_hashtag_search?user_id=${process.env.INSTAGRAM_USER_ID}&fields=id,name&search_string=${hashtag}`
      );

      return response.data?.[0]?.id || null;
    } catch (error) {
      console.error(`Error searching hashtag ${hashtag}:`, error);
      return null;
    }
  }

  /**
   * Obter posts com uma hashtag específica
   */
  async getHashtagMedia(
    hashtagId: string,
    limit: number = 10
  ): Promise<InstagramMedia[]> {
    try {
      const fields =
        "id,caption,media_type,media_url,permalink,timestamp,like_count,comments_count";
      const response = await this.makeRequest(
        `/${hashtagId}/recent_media?fields=${fields}&limit=${limit}`
      );

      return (response.data || []).map((item: any) => ({
        id: item.id,
        caption: item.caption || "",
        mediaType: item.media_type,
        mediaUrl: item.media_url,
        permalink: item.permalink,
        timestamp: item.timestamp,
        likeCount: item.like_count,
        commentsCount: item.comments_count,
      }));
    } catch (error) {
      console.error(
        `Error fetching hashtag media for ${hashtagId}:`,
        error
      );
      return [];
    }
  }

  /**
   * Analisar performance de um negócio
   */
  async analyzeBusinessPerformance(userId: string) {
    try {
      // Obter informações do usuário
      const userInfo = await this.getUserInfo(userId);
      if (!userInfo) {
        return null;
      }

      // Obter posts recentes
      const media = await this.getUserMedia(userId, 10);

      // Obter insights (se disponível)
      const insights = await this.getUserInsights(userId);

      // Calcular métricas
      const avgEngagement =
        media.length > 0
          ? media.reduce(
              (sum, post) =>
                sum + ((post.likeCount || 0) + (post.commentsCount || 0)),
              0
            ) / media.length
          : 0;

      return {
        user: userInfo,
        topPosts: media.slice(0, 5),
        insights,
        metrics: {
          avgEngagement: Math.round(avgEngagement),
          engagementRate: userInfo.followerCount
            ? (avgEngagement / userInfo.followerCount) * 100
            : 0,
          totalEngagement: media.reduce(
            (sum, post) =>
              sum + ((post.likeCount || 0) + (post.commentsCount || 0)),
            0
          ),
          postsCount: media.length,
        },
      };
    } catch (error) {
      console.error(`Error analyzing business ${userId}:`, error);
      return null;
    }
  }

  /**
   * Configurar novo token de acesso
   */
  setAccessToken(token: string): void {
    this.accessToken = token;
  }
}

export const instagramService = new InstagramService();
