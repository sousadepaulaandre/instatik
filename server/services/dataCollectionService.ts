/**
 * Data Collection Service
 * Handles collection and processing of product and seller data from various platforms
 */

import { getDb } from "../db";
import {
  products,
  sellers,
  metrics,
  collectionHistory,
  InsertProduct,
  InsertSeller,
  InsertMetric,
  InsertCollectionHistory,
} from "../../drizzle/schema";

interface ProductData {
  productId: string;
  productName: string;
  platform: "tiktok_shop" | "instagram";
  sellerId: string;
  sellerName: string;
  price: string;
  currency?: string;
  soldCount: number;
  rating?: string;
  reviewCount: number;
  description?: string;
  imageUrl?: string;
  productUrl?: string;
  category?: string;
  costOfGoods?: number;
}

interface SellerData {
  sellerId: string;
  sellerName: string;
  platform: "tiktok_shop" | "instagram";
  rating?: string;
  reviewCount: number;
  itemsSoldCount: number;
  shopPerformanceValue?: number;
  sellerUrl?: string;
  profileImageUrl?: string;
  description?: string;
}

/**
 * Calculate estimated revenue and profit
 */
export function calculateMetrics(
  price: number,
  soldCount: number,
  costOfGoods: number = 0,
) {
  const estimatedRevenue = price * soldCount;
  const estimatedProfit = estimatedRevenue - costOfGoods * soldCount;

  return {
    estimatedRevenue,
    estimatedProfit,
  };
}

/**
 * Process and store product data
 */
export async function processProductData(productData: ProductData) {
  const db = await getDb();
  if (!db) {
    console.warn("[DataCollection] Database not available");
    return null;
  }

  try {
    const price = parseFloat(productData.price.replace(/[^0-9.]/g, "")) || 0;
    const { estimatedRevenue, estimatedProfit } = calculateMetrics(
      price,
      productData.soldCount,
      productData.costOfGoods || 0,
    );

    // First, ensure seller exists
    const sellerData: InsertSeller = {
      sellerId: productData.sellerId,
      sellerName: productData.sellerName,
      platform: productData.platform,
      rating: productData.rating,
      reviewCount: productData.reviewCount,
      itemsSoldCount: productData.soldCount,
      totalRevenue: estimatedRevenue,
      totalProfit: estimatedProfit,
    };

    // Upsert seller
    await db
      .insert(sellers)
      .values(sellerData)
      .onDuplicateKeyUpdate({
        set: {
          rating: productData.rating,
          reviewCount: productData.reviewCount,
          itemsSoldCount: productData.soldCount,
          totalRevenue: estimatedRevenue,
          totalProfit: estimatedProfit,
          lastUpdated: new Date(),
        },
      });

    // Get seller ID for product insertion
    const { eq } = await import("drizzle-orm");
    const sellerResult = await db
      .select()
      .from(sellers)
      .where(eq(sellers.sellerId, productData.sellerId))
      .limit(1);

    if (sellerResult.length === 0) {
      throw new Error(
        `Failed to create/retrieve seller: ${productData.sellerId}`,
      );
    }

    const sellerId = sellerResult[0].id;

    // Insert/update product
    const productInsert: InsertProduct = {
      productId: productData.productId,
      productName: productData.productName,
      platform: productData.platform,
      sellerId,
      price: productData.price,
      currency: productData.currency || "USD",
      soldCount: productData.soldCount,
      rating: productData.rating,
      reviewCount: productData.reviewCount,
      description: productData.description,
      imageUrl: productData.imageUrl,
      productUrl: productData.productUrl,
      category: productData.category,
      estimatedRevenue,
      estimatedProfit,
      costOfGoods: productData.costOfGoods || 0,
    };

    await db
      .insert(products)
      .values(productInsert)
      .onDuplicateKeyUpdate({
        set: {
          soldCount: productData.soldCount,
          rating: productData.rating,
          reviewCount: productData.reviewCount,
          estimatedRevenue,
          estimatedProfit,
          lastUpdated: new Date(),
        },
      });

    // Get product ID for metrics insertion
    const { eq: eq2 } = await import("drizzle-orm");
    const productResult = await db
      .select()
      .from(products)
      .where(eq2(products.productId, productData.productId))
      .limit(1);

    if (productResult.length === 0) {
      throw new Error(
        `Failed to create/retrieve product: ${productData.productId}`,
      );
    }

    const productId = productResult[0].id;

    // Record metrics
    const metricInsert: InsertMetric = {
      productId,
      sellerId,
      soldCount: productData.soldCount,
      revenue: estimatedRevenue,
      profit: estimatedProfit,
      rating: productData.rating,
      reviewCount: productData.reviewCount,
    };

    await db.insert(metrics).values(metricInsert);

    return {
      ...productInsert,
      id: productId,
    };
  } catch (error) {
    console.error("[DataCollection] Error processing product data:", error);
    throw error;
  }
}

/**
 * Log collection history
 */
export async function logCollectionHistory(
  platform: "tiktok_shop" | "instagram",
  collectionType: "products" | "sellers" | "metrics",
  status: "pending" | "in_progress" | "completed" | "failed",
  recordsCollected: number = 0,
  errorMessage?: string,
) {
  const db = await getDb();
  if (!db) {
    console.warn("[DataCollection] Database not available for logging");
    return null;
  }

  try {
    const historyData: InsertCollectionHistory = {
      platform,
      collectionType,
      status,
      recordsCollected,
      errorMessage,
      startedAt: new Date(),
      completedAt:
        status === "completed" || status === "failed" ? new Date() : undefined,
    };

    const result = await db.insert(collectionHistory).values(historyData);
    return result;
  } catch (error) {
    console.error("[DataCollection] Error logging collection history:", error);
    throw error;
  }
}

/**
 * Batch process multiple products
 */
export async function batchProcessProducts(productsData: ProductData[]) {
  const results = [];
  let successCount = 0;
  let errorCount = 0;

  for (const productData of productsData) {
    try {
      const result = await processProductData(productData);
      results.push(result);
      successCount++;
    } catch (error) {
      console.error(
        `Error processing product ${productData.productId}:`,
        error,
      );
      errorCount++;
    }
  }

  return {
    total: productsData.length,
    successCount,
    errorCount,
    results,
  };
}
