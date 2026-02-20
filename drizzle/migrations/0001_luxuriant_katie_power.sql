CREATE TABLE `aiInsights` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`insightType` enum('trend_analysis','niche_recommendation','seasonality','competitor_analysis') NOT NULL,
	`title` varchar(255) NOT NULL,
	`content` text NOT NULL,
	`relatedProductIds` text,
	`relatedSellerIds` text,
	`confidence` int DEFAULT 0,
	`generatedAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `aiInsights_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `collectionHistory` (
	`id` int AUTO_INCREMENT NOT NULL,
	`platform` enum('tiktok_shop','instagram') NOT NULL,
	`collectionType` enum('products','sellers','metrics') NOT NULL,
	`status` enum('pending','in_progress','completed','failed') NOT NULL DEFAULT 'pending',
	`recordsCollected` int NOT NULL DEFAULT 0,
	`errorMessage` text,
	`startedAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	CONSTRAINT `collectionHistory_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `metrics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`productId` int NOT NULL,
	`sellerId` int NOT NULL,
	`date` timestamp NOT NULL DEFAULT (now()),
	`soldCount` int NOT NULL,
	`revenue` int NOT NULL,
	`profit` int NOT NULL,
	`rating` varchar(10),
	`reviewCount` int NOT NULL,
	CONSTRAINT `metrics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`type` enum('top_product','seller_milestone','price_drop','trend_alert') NOT NULL,
	`productId` int,
	`sellerId` int,
	`title` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`isRead` int NOT NULL DEFAULT 0,
	`sentAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`productId` varchar(255) NOT NULL,
	`productName` text NOT NULL,
	`platform` enum('tiktok_shop','instagram') NOT NULL,
	`sellerId` int NOT NULL,
	`price` varchar(50) NOT NULL,
	`currency` varchar(10) NOT NULL DEFAULT 'USD',
	`soldCount` int NOT NULL DEFAULT 0,
	`rating` varchar(10),
	`reviewCount` int NOT NULL DEFAULT 0,
	`description` text,
	`imageUrl` text,
	`productUrl` text,
	`category` varchar(255),
	`estimatedRevenue` int NOT NULL DEFAULT 0,
	`estimatedProfit` int NOT NULL DEFAULT 0,
	`costOfGoods` int DEFAULT 0,
	`lastUpdated` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `products_id` PRIMARY KEY(`id`),
	CONSTRAINT `products_productId_unique` UNIQUE(`productId`)
);
--> statement-breakpoint
CREATE TABLE `sellers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sellerId` varchar(255) NOT NULL,
	`sellerName` varchar(255) NOT NULL,
	`platform` enum('tiktok_shop','instagram') NOT NULL,
	`rating` varchar(10),
	`reviewCount` int NOT NULL DEFAULT 0,
	`itemsSoldCount` int NOT NULL DEFAULT 0,
	`shopPerformanceValue` int DEFAULT 0,
	`sellerUrl` text,
	`profileImageUrl` text,
	`description` text,
	`totalRevenue` int NOT NULL DEFAULT 0,
	`totalProfit` int NOT NULL DEFAULT 0,
	`lastUpdated` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `sellers_id` PRIMARY KEY(`id`),
	CONSTRAINT `sellers_sellerId_unique` UNIQUE(`sellerId`)
);
