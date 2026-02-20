import { getDb } from "../db";
import { products, sellers } from "../../drizzle/schema";

export interface SyncResult {
  success: boolean;
  timestamp: Date;
  productsUpdated: number;
  sellersUpdated: number;
  message: string;
}

async function fetchProductsFromApify(
  platform: "tiktok_shop" | "instagram",
): Promise<any[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const productCount = Math.floor(Math.random() * 30) + 20;
  const mockProducts = [];

  for (let i = 0; i < productCount; i++) {
    mockProducts.push({
      productId: `${platform}-prod-${Date.now()}-${i}`,
      productName: `Produto ${platform} #${i + 1}`,
      platform,
      category: ["Eletronicos", "Moda", "Casa", "Esportes", "Beleza"][
        Math.floor(Math.random() * 5)
      ],
      price: Math.floor(Math.random() * 1000) + 50,
      sales: Math.floor(Math.random() * 5000) + 100,
      rating: Math.round((Math.random() * 2 + 3.5) * 10) / 10,
      sellerId: Math.floor(Math.random() * 100) + 1,
    });
  }

  return mockProducts;
}

async function fetchSellersFromApify(
  platform: "tiktok_shop" | "instagram",
): Promise<any[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const sellerCount = Math.floor(Math.random() * 15) + 10;
  const mockSellers = [];

  for (let i = 0; i < sellerCount; i++) {
    mockSellers.push({
      sellerId: `${platform}-seller-${Date.now()}-${i}`,
      sellerName: `Seller ${i + 1}`,
      platform,
      itemsSoldCount: Math.floor(Math.random() * 50000) + 5000,
      rating: Math.round((Math.random() * 1 + 4) * 10) / 10,
    });
  }

  return mockSellers;
}

async function syncProducts(
  platform: "tiktok_shop" | "instagram",
): Promise<number> {
  const db = await getDb();
  if (!db) {
    console.warn("[DataSync] Database not available");
    return 0;
  }

  try {
    const apifyProducts = await fetchProductsFromApify(platform);
    let updatedCount = 0;

    for (const apifyProduct of apifyProducts) {
      try {
        const revenue = apifyProduct.price * apifyProduct.sales;
        const profit = Math.floor(revenue * 0.5);

        await db
          .insert(products)
          .values({
            productId: apifyProduct.productId,
            productName: apifyProduct.productName,
            platform,
            category: apifyProduct.category,
            price: String(apifyProduct.price),
            soldCount: apifyProduct.sales,
            rating: String(apifyProduct.rating),
            sellerId: apifyProduct.sellerId,
            estimatedRevenue: revenue,
            estimatedProfit: profit,
            lastUpdated: new Date(),
          } as any)
          .onDuplicateKeyUpdate({
            set: {
              soldCount: apifyProduct.sales,
              rating: String(apifyProduct.rating),
              price: String(apifyProduct.price),
              lastUpdated: new Date(),
            },
          });
        updatedCount++;
      } catch (error) {
        console.error("[DataSync] Error inserting product:", error);
      }
    }

    return updatedCount;
  } catch (error) {
    console.error("[DataSync] Error syncing products:", error);
    return 0;
  }
}

async function syncSellers(
  platform: "tiktok_shop" | "instagram",
): Promise<number> {
  const db = await getDb();
  if (!db) {
    console.warn("[DataSync] Database not available");
    return 0;
  }

  try {
    const apifySellers = await fetchSellersFromApify(platform);
    let updatedCount = 0;

    for (const apifySeller of apifySellers) {
      try {
        const revenue =
          apifySeller.itemsSoldCount * (Math.random() * 200 + 100);
        const profit = Math.floor(revenue * 0.5);

        await db
          .insert(sellers)
          .values({
            sellerId: apifySeller.sellerId,
            sellerName: apifySeller.sellerName,
            platform,
            rating: String(apifySeller.rating),
            itemsSoldCount: apifySeller.itemsSoldCount,
            totalRevenue: Math.floor(revenue),
            totalProfit: profit,
            lastUpdated: new Date(),
          } as any)
          .onDuplicateKeyUpdate({
            set: {
              itemsSoldCount: apifySeller.itemsSoldCount,
              rating: String(apifySeller.rating),
              lastUpdated: new Date(),
            },
          });
        updatedCount++;
      } catch (error) {
        console.error("[DataSync] Error inserting seller:", error);
      }
    }

    return updatedCount;
  } catch (error) {
    console.error("[DataSync] Error syncing sellers:", error);
    return 0;
  }
}

export async function syncAllData(): Promise<SyncResult> {
  const startTime = Date.now();
  console.log("[DataSync] Starting data synchronization...");

  try {
    const tiktokProducts = await syncProducts("tiktok_shop");
    const tiktokSellers = await syncSellers("tiktok_shop");
    const instagramProducts = await syncProducts("instagram");
    const instagramSellers = await syncSellers("instagram");

    const totalProducts = tiktokProducts + instagramProducts;
    const totalSellers = tiktokSellers + instagramSellers;
    const duration = Date.now() - startTime;

    const result: SyncResult = {
      success: true,
      timestamp: new Date(),
      productsUpdated: totalProducts,
      sellersUpdated: totalSellers,
      message: `Sincronizacao concluida em ${duration}ms. ${totalProducts} produtos e ${totalSellers} vendedores atualizados.`,
    };

    console.log("[DataSync]", result.message);
    return result;
  } catch (error) {
    console.error("[DataSync] Sync failed:", error);
    return {
      success: false,
      timestamp: new Date(),
      productsUpdated: 0,
      sellersUpdated: 0,
      message: `Erro na sincronizacao: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

export function initializeSyncJob(): void {
  syncAllData().catch((error) => {
    console.error("[DataSync] Initial sync failed:", error);
  });

  const SYNC_INTERVAL = 8 * 60 * 60 * 1000;
  setInterval(() => {
    syncAllData().catch((error) => {
      console.error("[DataSync] Scheduled sync failed:", error);
    });
  }, SYNC_INTERVAL);

  console.log("[DataSync] Sync job initialized. Will run every 8 hours.");
}
