/**
 * Expanded mock data generator for 100+ products and sellers
 * This data is used for development and testing
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
  'Bolsa para Notebook 15"',
  "Mochila para Câmera Profissional",
  "Tripé Profissional Alumínio",
  "Anel de Luz LED 26cm",
  "Microfone Condensador USB",
  "Pop Filter para Microfone",
  "Espuma Acústica Painéis",
  "Painel Acústico Decorativo",
  "Cortina Blackout Profissional",
  "Luminária de Mesa LED Ajustável",
  "Abajur Inteligente WiFi",
  "Lâmpada Inteligente E27 RGB",
  "Fita LED RGB 5050 10m",
  "Controle Remoto Universal",
  "Tomada Inteligente WiFi",
  "Sensor de Movimento PIR",
  "Campainha Inteligente WiFi",
  "Fechadura Digital Biométrica",
  "Câmera Segurança 1080p WiFi",
  "Gravador DVR 8 Canais",
  "Roteador WiFi 6 Mesh",
  "Repetidor WiFi Amplificador",
  "Modem Roteador 4G LTE",
  "Antena WiFi Direcional",
  "Cabo Ethernet Cat6 30m",
  "Switch Ethernet 8 Portas",
  "Fonte Modular 850W 80+ Gold",
  "Estabilizador de Tensão 2000VA",
  "Nobreak 1500VA",
  "Bateria Externa 50000mAh",
  "Carregador Solar Portátil",
  "Ventilador Portátil USB",
  "Umidificador de Ar Ultrassônico",
  "Purificador de Ar HEPA",
  "Desumidificador Eletrônico",
  "Aquecedor Cerâmico Portátil",
  "Ar Condicionado Portátil 12000 BTU",
  "Ventilador de Teto Silencioso",
  "Exaustor de Banheiro 150mm",
  "Secador de Cabelo Profissional",
  "Escova Alisadora Elétrica",
  "Prancha de Cabelo Profissional",
  "Babyliss Rotativo",
  "Cortador de Cabelo Profissional",
  "Barbeador Elétrico Recarregável",
  "Escova de Dentes Elétrica",
  "Irrigador Oral Portátil",
  "Massageador Facial Ultrassônico",
  "Dermaplaning Elétrico",
  "Depilador Elétrico Feminino",
  "Alisador de Sobrancelha",
  "Aparador de Pelos Nasal",
  "Cortador de Unhas Elétrico",
  "Lixadeira de Pés Eletrônica",
  "Massageador Cervical Shiatsu",
  "Almofada Massageadora Aquecida",
  "Tapete Massageador Reflexologia",
  "Cinto Massageador Abdominal",
  "Aparelho TENS Portátil",
  "Medidor de Pressão Digital",
  "Oxímetro de Dedo Portátil",
  "Termômetro Infravermelho",
  "Balança Digital Inteligente",
  "Relógio Inteligente Smartwatch",
  "Pulseira Fitness Rastreadora",
  "Fone Bluetooth Esportivo",
  "Caixa de Som Bluetooth Portátil",
  "Alto-falante Inteligente Alexa",
  "Soundbar 2.1 Bluetooth",
  "Subwoofer Ativo 200W",
  "Amplificador Bluetooth 50W",
  "Equalizador Gráfico Digital",
  "Processador de Áudio Profissional",
  "Mixer de Áudio 4 Canais",
  "Controladora DJ 2 Decks",
  "Teclado Sintetizador 61 Teclas",
  "Guitarra Elétrica Iniciante",
  "Baixo Elétrico 4 Cordas",
  "Amplificador Guitarra 20W",
  "Pedal Distorção Guitarra",
  "Metrônomo Digital",
  "Afinador Cromático Portátil",
  "Suporte para Instrumento",
  "Estante para Livros Ajustável",
  "Prateleira Flutuante Magnética",
  "Cabideiro Parede Adesivo",
  "Espelho de Parede Decorativo",
  "Quadro Decorativo Moderno",
  "Painel de Fotos Magnético",
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
  "Quick Shop",
  "Value Market",
  "Elite Brands",
  "Modern Home",
  "Tech Zone",
  "Fashion Hub",
  "Beauty World",
  "Sports Plus",
  "Gaming Pro",
  "Audio Masters",
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

/**
 * Generate a single product
 */
function generateProduct(index: number): Product {
  const platform = platforms[Math.floor(Math.random() * platforms.length)];
  const seller = sellerNames[Math.floor(Math.random() * sellerNames.length)];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const price = Math.floor(Math.random() * 1000) + 50;
  const sales = Math.floor(Math.random() * 5000) + 100;
  const rating = Math.random() * 2 + 3.5; // 3.5 to 5.5
  const trend = Math.random() * 30 - 10; // -10 to 20

  return {
    id: `prod-${index}`,
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
  };
}

/**
 * Generate a single seller
 */
function generateSeller(index: number): Seller {
  const platform = platforms[Math.floor(Math.random() * platforms.length)];
  const totalProducts = Math.floor(Math.random() * 50) + 5;
  const totalSales = Math.floor(Math.random() * 50000) + 5000;
  const rating = Math.random() * 1 + 4;
  const followers = Math.floor(Math.random() * 500000) + 10000;

  return {
    id: `seller-${index}`,
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
  };
}

/**
 * Generate 100+ products
 */
export function generateProducts(count: number = 120): Product[] {
  const products: Product[] = [];
  for (let i = 0; i < count; i++) {
    products.push(generateProduct(i));
  }
  return products;
}

/**
 * Generate 100+ sellers
 */
export function generateSellers(count: number = 100): Seller[] {
  const sellers: Seller[] = [];
  for (let i = 0; i < count; i++) {
    sellers.push(generateSeller(i));
  }
  return sellers;
}

/**
 * Get top products by sales
 */
export function getTopProducts(
  products: Product[],
  limit: number = 10,
): Product[] {
  return [...products].sort((a, b) => b.sales - a.sales).slice(0, limit);
}

/**
 * Get top sellers by revenue
 */
export function getTopSellers(sellers: Seller[], limit: number = 10): Seller[] {
  return [...sellers]
    .sort((a, b) => b.totalRevenue - a.totalRevenue)
    .slice(0, limit);
}

/**
 * Filter products by platform
 */
export function filterProductsByPlatform(
  products: Product[],
  platform: "tiktok_shop" | "instagram",
): Product[] {
  return products.filter((p) => p.platform === platform);
}

/**
 * Filter sellers by platform
 */
export function filterSellersByPlatform(
  sellers: Seller[],
  platform: "tiktok_shop" | "instagram",
): Seller[] {
  return sellers.filter((s) => s.platform === platform);
}

/**
 * Search products by name
 */
export function searchProducts(products: Product[], query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery) ||
      p.seller.toLowerCase().includes(lowerQuery),
  );
}

/**
 * Get products by category
 */
export function getProductsByCategory(
  products: Product[],
  category: string,
): Product[] {
  return products.filter((p) => p.category === category);
}

/**
 * Get products by seller
 */
export function getProductsBySeller(
  products: Product[],
  seller: string,
): Product[] {
  return products.filter((p) => p.seller === seller);
}

/**
 * Update product data with new values (simulating real-time updates)
 */
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

/**
 * Update seller data with new values (simulating real-time updates)
 */
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

// Generate initial data
export const expandedMockProducts = generateProducts(120);
export const expandedMockSellers = generateSellers(100);
