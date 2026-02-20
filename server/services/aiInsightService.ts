/**
 * AI Insight Service
 * Generates insights about sales patterns, seasonality, and niche recommendations using LLM
 */

import { invokeLLM } from "./llm";
import { getDb } from "../db";
import {
  aiInsights,
  InsertAiInsight,
  metrics,
  products,
  sellers,
} from "../../drizzle/schema";

interface SalesData {
  productName: string;
  soldCount: number;
  revenue: number;
  rating: number;
  category: string;
  platform: string;
}

/**
 * Generate trend analysis insight
 */
export async function generateTrendAnalysis(
  userId: number,
  salesData: SalesData[],
): Promise<string | null> {
  try {
    const dataContext = JSON.stringify(salesData, null, 2);

    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content:
            "You are an e-commerce analyst expert. Analyze sales data and provide insights about trending products and categories. Be concise and actionable.",
        },
        {
          role: "user",
          content: `Analyze this sales data and identify key trends:\n\n${dataContext}\n\nProvide insights about:\n1. Top performing categories\n2. Emerging trends\n3. Seasonal patterns if visible\n4. Recommendations for sellers`,
        },
      ],
    });

    const content = response.choices?.[0]?.message?.content;
    if (!content) return null;

    const insight: InsertAiInsight = {
      userId,
      insightType: "trend_analysis",
      title: "Análise de Tendências de Vendas",
      content: typeof content === "string" ? content : JSON.stringify(content),
      confidence: 85,
    };

    const db = await getDb();
    if (db) {
      await db.insert(aiInsights).values(insight);
    }

    return content as string;
  } catch (error) {
    console.error("[AIInsight] Error generating trend analysis:", error);
    return null;
  }
}

/**
 * Generate niche recommendation insight
 */
export async function generateNicheRecommendation(
  userId: number,
  salesData: SalesData[],
): Promise<string | null> {
  try {
    const dataContext = JSON.stringify(salesData, null, 2);

    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content:
            "You are a market research expert specializing in e-commerce niches. Identify untapped niches and opportunities based on sales data.",
        },
        {
          role: "user",
          content: `Based on this sales data, identify promising niches:\n\n${dataContext}\n\nFor each niche, provide:\n1. Market opportunity\n2. Competition level\n3. Estimated demand\n4. Entry difficulty\n5. Profit potential`,
        },
      ],
    });

    const content = response.choices?.[0]?.message?.content;
    if (!content) return null;

    const insight: InsertAiInsight = {
      userId,
      insightType: "niche_recommendation",
      title: "Recomendações de Nichos Promissores",
      content: typeof content === "string" ? content : JSON.stringify(content),
      confidence: 80,
    };

    const db = await getDb();
    if (db) {
      await db.insert(aiInsights).values(insight);
    }

    return content as string;
  } catch (error) {
    console.error("[AIInsight] Error generating niche recommendation:", error);
    return null;
  }
}

/**
 * Generate seasonality analysis
 */
export async function generateSeasonalityAnalysis(
  userId: number,
  historicalData: Array<{
    date: Date;
    category: string;
    sales: number;
  }>,
): Promise<string | null> {
  try {
    const dataContext = JSON.stringify(historicalData, null, 2);

    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content:
            "You are a data analyst expert in seasonality patterns. Analyze historical sales data to identify seasonal trends and patterns.",
        },
        {
          role: "user",
          content: `Analyze this historical sales data for seasonality patterns:\n\n${dataContext}\n\nProvide:\n1. Seasonal peaks and valleys\n2. Peak months for each category\n3. Year-over-year growth patterns\n4. Recommendations for inventory planning`,
        },
      ],
    });

    const content = response.choices?.[0]?.message?.content;
    if (!content) return null;

    const insight: InsertAiInsight = {
      userId,
      insightType: "seasonality",
      title: "Análise de Sazonalidade",
      content: typeof content === "string" ? content : JSON.stringify(content),
      confidence: 75,
    };

    const db = await getDb();
    if (db) {
      await db.insert(aiInsights).values(insight);
    }

    return content as string;
  } catch (error) {
    console.error("[AIInsight] Error generating seasonality analysis:", error);
    return null;
  }
}

/**
 * Generate competitor analysis
 */
export async function generateCompetitorAnalysis(
  userId: number,
  competitorData: Array<{
    sellerName: string;
    productCount: number;
    averageRating: number;
    totalSales: number;
    platform: string;
  }>,
): Promise<string | null> {
  try {
    const dataContext = JSON.stringify(competitorData, null, 2);

    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content:
            "You are a competitive intelligence analyst. Analyze competitor data and provide strategic insights.",
        },
        {
          role: "user",
          content: `Analyze this competitor data:\n\n${dataContext}\n\nProvide:\n1. Market leaders and their strategies\n2. Competitive advantages\n3. Market gaps and opportunities\n4. Recommendations for differentiation`,
        },
      ],
    });

    const content = response.choices?.[0]?.message?.content;
    if (!content) return null;

    const insight: InsertAiInsight = {
      userId,
      insightType: "competitor_analysis",
      title: "Análise Competitiva",
      content: typeof content === "string" ? content : JSON.stringify(content),
      confidence: 80,
    };

    const db = await getDb();
    if (db) {
      await db.insert(aiInsights).values(insight);
    }

    return content as string;
  } catch (error) {
    console.error("[AIInsight] Error generating competitor analysis:", error);
    return null;
  }
}

/**
 * Get user insights
 */
export async function getUserInsights(userId: number, limit: number = 10) {
  const db = await getDb();
  if (!db) {
    console.warn("[AIInsight] Database not available");
    return [];
  }

  try {
    const { eq, desc } = await import("drizzle-orm");
    const insights = await db
      .select()
      .from(aiInsights)
      .where(eq(aiInsights.userId, userId))
      .orderBy(desc(aiInsights.generatedAt))
      .limit(limit);
    return insights;
  } catch (error) {
    console.error("[AIInsight] Error fetching user insights:", error);
    return [];
  }
}
