import {
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Products table - stores product information from various social platforms
export const products = mysqlTable("products", {
  id: int("id").autoincrement().primaryKey(),
  productId: varchar("productId", { length: 255 }).notNull().unique(),
  productName: text("productName").notNull(),
  platform: mysqlEnum("platform", ["tiktok_shop", "instagram"]).notNull(),
  sellerId: int("sellerId").notNull(),
  price: varchar("price", { length: 50 }).notNull(),
  currency: varchar("currency", { length: 10 }).default("USD").notNull(),
  soldCount: int("soldCount").default(0).notNull(),
  rating: varchar("rating", { length: 10 }),
  reviewCount: int("reviewCount").default(0).notNull(),
  description: text("description"),
  imageUrl: text("imageUrl"),
  productUrl: text("productUrl"),
  category: varchar("category", { length: 255 }),
  estimatedRevenue: int("estimatedRevenue").default(0).notNull(),
  estimatedProfit: int("estimatedProfit").default(0).notNull(),
  costOfGoods: int("costOfGoods").default(0),
  lastUpdated: timestamp("lastUpdated").defaultNow().onUpdateNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

// Sellers table - stores seller/shop information
export const sellers = mysqlTable("sellers", {
  id: int("id").autoincrement().primaryKey(),
  sellerId: varchar("sellerId", { length: 255 }).notNull().unique(),
  sellerName: varchar("sellerName", { length: 255 }).notNull(),
  platform: mysqlEnum("platform", ["tiktok_shop", "instagram"]).notNull(),
  rating: varchar("rating", { length: 10 }),
  reviewCount: int("reviewCount").default(0).notNull(),
  itemsSoldCount: int("itemsSoldCount").default(0).notNull(),
  shopPerformanceValue: int("shopPerformanceValue").default(0),
  sellerUrl: text("sellerUrl"),
  profileImageUrl: text("profileImageUrl"),
  description: text("description"),
  totalRevenue: int("totalRevenue").default(0).notNull(),
  totalProfit: int("totalProfit").default(0).notNull(),
  lastUpdated: timestamp("lastUpdated").defaultNow().onUpdateNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Seller = typeof sellers.$inferSelect;
export type InsertSeller = typeof sellers.$inferInsert;

// Metrics table - stores historical metrics for tracking trends
export const metrics = mysqlTable("metrics", {
  id: int("id").autoincrement().primaryKey(),
  productId: int("productId").notNull(),
  sellerId: int("sellerId").notNull(),
  date: timestamp("date").defaultNow().notNull(),
  soldCount: int("soldCount").notNull(),
  revenue: int("revenue").notNull(),
  profit: int("profit").notNull(),
  rating: varchar("rating", { length: 10 }),
  reviewCount: int("reviewCount").notNull(),
});

export type Metric = typeof metrics.$inferSelect;
export type InsertMetric = typeof metrics.$inferInsert;

// Collection history - tracks when data was collected
export const collectionHistory = mysqlTable("collectionHistory", {
  id: int("id").autoincrement().primaryKey(),
  platform: mysqlEnum("platform", ["tiktok_shop", "instagram"]).notNull(),
  collectionType: mysqlEnum("collectionType", [
    "products",
    "sellers",
    "metrics",
  ]).notNull(),
  status: mysqlEnum("status", ["pending", "in_progress", "completed", "failed"])
    .default("pending")
    .notNull(),
  recordsCollected: int("recordsCollected").default(0).notNull(),
  errorMessage: text("errorMessage"),
  startedAt: timestamp("startedAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
});

export type CollectionHistory = typeof collectionHistory.$inferSelect;
export type InsertCollectionHistory = typeof collectionHistory.$inferInsert;

// Notifications table - stores notification history
export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  type: mysqlEnum("type", [
    "top_product",
    "seller_milestone",
    "price_drop",
    "trend_alert",
  ]).notNull(),
  productId: int("productId"),
  sellerId: int("sellerId"),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  isRead: int("isRead").default(0).notNull(),
  sentAt: timestamp("sentAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;

// AI Insights table - stores insights generated by LLM
export const aiInsights = mysqlTable("aiInsights", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  insightType: mysqlEnum("insightType", [
    "trend_analysis",
    "niche_recommendation",
    "seasonality",
    "competitor_analysis",
  ]).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  relatedProductIds: text("relatedProductIds"),
  relatedSellerIds: text("relatedSellerIds"),
  confidence: int("confidence").default(0),
  generatedAt: timestamp("generatedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AiInsight = typeof aiInsights.$inferSelect;
export type InsertAiInsight = typeof aiInsights.$inferInsert;
