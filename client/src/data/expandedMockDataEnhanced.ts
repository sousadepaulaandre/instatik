/**
 * Enhanced mock data with external URLs and location information
 */

export interface Product {
  id: string;
  name: string;
  platform: "tiktok_shop" | "instagram";
  category: string;
  price: number;
  sales: number;
  rating: number;
  trend: number;
  revenue: number;
  profit: number;
  seller: string;
  lastUpdated: Date;
  url: string;
  location: "BR" | "INT";
}

export interface Seller {
  id: string;
  name: string;
  platform: "tiktok_shop" | "instagram";
  totalProducts: number;
  totalSales: number;
  totalRevenue: number;
  totalProfit: number;
  rating: number;
  followers: number;
  joinDate: Date;
  lastUpdated: Date;
  url: string;
  location: "BR" | "INT";
}

const productNames = [
  "Fone Bluetooth Wireless Premium",
  "Mochila Impermeável para Viagem",
  "Luminária LED Inteligente RGB",
  "Garrafa Térmica 1L Aço Inoxidável",
  "Webcam Full HD com Microfone",
  "Teclado Mecânico RGB",
  "Mouse Gamer Sem Fio",
  'Monitor 27" Curvo 144Hz',
  "Headset Gamer 7.1 Surround",
  "Mousepad Grande XL",
  "Suporte para Celular Ajustável",
  "Carregador Rápido 65W USB-C",
  "Cabo USB-C Reforçado 2m",
  "Hub USB 7 Portas",
  "Adaptador HDMI 4K",
  "Cooler para Notebook",
  "Pasta Térmica Premium",
  "Limpador de Tela Eletrônico",
  "Suporte para Monitor Duplo",
  "Organizador de Cabos",
];

const sellerNames = [
  "Beauty Glow",
  "TechPro Store",
  "Fashion Plus",
  "Home Essentials",
  "Sports World",
  "Digital Hub",
  "Smart Living",
  "Premium Tech",
  "Eco Store",
  "Luxury Goods",
];

const categories = [
  "Eletrônicos",
  "Viagem",
  "Iluminação",
  "Bebidas",
  "Tecnologia",
  "Moda",
  "Casa",
  "Esportes",
  "Beleza",
  "Saúde",
];

const platforms: ("tiktok_shop" | "instagram")[] = ["tiktok_shop", "instagram"];
const locations: ("BR" | "INT")[] = ["BR", "INT"];

function generateProduct(index: number): Product {
  const platform = platforms[Math.floor(Math.random() * platforms.length)];
  const seller = sellerNames[index % sellerNames.length];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const price = Math.floor(Math.random() * 1000) + 50;
  const sales = Math.floor(Math.random() * 5000) + 100;
  const rating = Math.random() * 2 + 3.5;
  const trend = Math.random() * 30 - 10;
  const location = locations[Math.floor(Math.random() * locations.length)];

  const productId = `prod-${index}`;
  const baseUrl =
    platform === "tiktok_shop"
      ? "https://www.tiktok.com/shop/product"
      : "https://www.instagram.com/shopping/product";

  return {
    id: productId,
    name: productNames[index % productNames.length],
    platform,
    category,
    price,
    sales,
    rating: Math.round(rating * 10) / 10,
    trend: Math.round(trend * 10) / 10,
    revenue: price * sales,
    profit: price * sales * 0.5,
    seller,
    lastUpdated: new Date(),
    url: `${baseUrl}/${productId}`,
    location,
  };
}

function generateSeller(index: number): Seller {
  const platform = platforms[Math.floor(Math.random() * platforms.length)];
  const totalProducts = Math.floor(Math.random() * 50) + 5;
  const totalSales = Math.floor(Math.random() * 50000) + 5000;
  const rating = Math.random() * 1 + 4;
  const followers = Math.floor(Math.random() * 500000) + 10000;
  const location = locations[Math.floor(Math.random() * locations.length)];

  const sellerId = `seller-${index}`;
  const baseUrl =
    platform === "tiktok_shop"
      ? "https://www.tiktok.com/shop/seller"
      : "https://www.instagram.com/shop/seller";

  return {
    id: sellerId,
    name: sellerNames[index % sellerNames.length],
    platform,
    totalProducts,
    totalSales,
    totalRevenue: totalSales * (Math.random() * 200 + 100),
    totalProfit: totalSales * (Math.random() * 100 + 50),
    rating: Math.round(rating * 10) / 10,
    followers,
    joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
    lastUpdated: new Date(),
    url: `${baseUrl}/${sellerId}`,
    location,
  };
}

export function generateProducts(count: number = 120): Product[] {
  const products: Product[] = [];
  for (let i = 0; i < count; i++) {
    products.push(generateProduct(i));
  }
  return products;
}

export function generateSellers(count: number = 100): Seller[] {
  const sellers: Seller[] = [];
  for (let i = 0; i < count; i++) {
    sellers.push(generateSeller(i));
  }
  return sellers;
}

export function getTopProducts(
  products: Product[],
  limit: number = 10,
): Product[] {
  return [...products].sort((a, b) => b.sales - a.sales).slice(0, limit);
}

export function getTopSellers(sellers: Seller[], limit: number = 10): Seller[] {
  return [...sellers]
    .sort((a, b) => b.totalRevenue - a.totalRevenue)
    .slice(0, limit);
}

export function filterProductsByPlatform(
  products: Product[],
  platform: "tiktok_shop" | "instagram",
): Product[] {
  return products.filter((p) => p.platform === platform);
}

export function filterSellersByPlatform(
  sellers: Seller[],
  platform: "tiktok_shop" | "instagram",
): Seller[] {
  return sellers.filter((s) => s.platform === platform);
}

export function filterProductsByLocation(
  products: Product[],
  location: "BR" | "INT",
): Product[] {
  return products.filter((p) => p.location === location);
}

export function filterSellersByLocation(
  sellers: Seller[],
  location: "BR" | "INT",
): Seller[] {
  return sellers.filter((s) => s.location === location);
}

export function searchProducts(products: Product[], query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery) ||
      p.seller.toLowerCase().includes(lowerQuery),
  );
}

export function getProductsByCategory(
  products: Product[],
  category: string,
): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductsBySeller(
  products: Product[],
  seller: string,
): Product[] {
  return products.filter((p) => p.seller === seller);
}

export function updateProductData(product: Product): Product {
  const salesChange = Math.floor(Math.random() * 200) - 100;
  const priceChange = Math.random() * 20 - 10;

  return {
    ...product,
    sales: Math.max(0, product.sales + salesChange),
    price: Math.max(10, product.price + priceChange),
    rating: Math.min(
      5,
      Math.max(3, product.rating + (Math.random() * 0.2 - 0.1)),
    ),
    trend: Math.random() * 30 - 10,
    lastUpdated: new Date(),
  };
}

export function updateSellerData(seller: Seller): Seller {
  const salesChange = Math.floor(Math.random() * 1000) - 500;
  const followerChange = Math.floor(Math.random() * 500) - 250;

  return {
    ...seller,
    totalSales: Math.max(0, seller.totalSales + salesChange),
    totalRevenue: Math.max(
      0,
      seller.totalRevenue + salesChange * (Math.random() * 200 + 100),
    ),
    totalProfit: Math.max(
      0,
      seller.totalProfit + salesChange * (Math.random() * 100 + 50),
    ),
    followers: Math.max(0, seller.followers + followerChange),
    rating: Math.min(
      5,
      Math.max(3, seller.rating + (Math.random() * 0.1 - 0.05)),
    ),
    lastUpdated: new Date(),
  };
}

export const expandedMockProducts = generateProducts(120);
export const expandedMockSellers = generateSellers(100);
