/**
 * Expanded historical data for 90 days of analysis
 */

function generateSalesTrendData(days: number) {
  const data = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // Generate realistic sales data with some variation
    const baseMultiplier = 1 + Math.sin(i / 10) * 0.3;
    const tiktokShop = Math.floor(2000 + Math.random() * 3000 * baseMultiplier);
    const instagram = Math.floor(1500 + Math.random() * 2500 * baseMultiplier);

    data.push({
      date: `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}`,
      tiktokShop,
      instagram,
      total: tiktokShop + instagram,
      fullDate: date.toISOString().split("T")[0],
    });
  }

  return data;
}

export const salesTrendData90Days = generateSalesTrendData(90);
export const salesTrendData30Days = generateSalesTrendData(30);
export const salesTrendData7Days = generateSalesTrendData(7);

/**
 * Function to filter data by date range
 */
export function filterDataByDays(days: number) {
  if (days === 7) {
    return salesTrendData7Days;
  } else if (days === 30) {
    return salesTrendData30Days;
  } else {
    return salesTrendData90Days;
  }
}

/**
 * Generate seasonal data based on day of week
 */
export const seasonalityData = [
  { period: "Segunda", vendas: 4200, percentual: 12 },
  { period: "Terça", vendas: 4800, percentual: 14 },
  { period: "Quarta", vendas: 5100, percentual: 15 },
  { period: "Quinta", vendas: 5400, percentual: 16 },
  { period: "Sexta", vendas: 6200, percentual: 18 },
  { period: "Sábado", vendas: 6800, percentual: 20 },
  { period: "Domingo", vendas: 6500, percentual: 19 },
];

/**
 * Generate monthly comparison data
 */
export function generateMonthlyComparisonData(days: number) {
  const months = [
    { name: "Janeiro", tiktok: 45000, instagram: 32000 },
    { name: "Fevereiro", tiktok: 52000, instagram: 38000 },
    { name: "Março", tiktok: 48000, instagram: 35000 },
    { name: "Abril", tiktok: 61000, instagram: 44000 },
    { name: "Maio", tiktok: 58000, instagram: 42000 },
    { name: "Junho", tiktok: 67000, instagram: 49000 },
  ];

  if (days === 7) {
    return months.slice(-1);
  } else if (days === 30) {
    return months.slice(-1);
  } else {
    return months;
  }
}

/**
 * Generate revenue metrics based on period
 */
export function generateRevenueMetrics(days: number) {
  const baseRevenue = 50000;
  const multiplier = days === 7 ? 0.15 : days === 30 ? 0.5 : 1;

  return {
    totalRevenue: Math.floor(baseRevenue * multiplier),
    totalProfit: Math.floor(baseRevenue * multiplier * 0.5),
    averageDailyRevenue: Math.floor((baseRevenue * multiplier) / days),
    topProductRevenue: Math.floor(baseRevenue * multiplier * 0.25),
  };
}

/**
 * Generate growth percentage based on period
 */
export function generateGrowthMetrics(days: number) {
  const baseGrowth = 12;
  const variance = Math.random() * 8 - 4;

  return {
    revenueGrowth: (baseGrowth + variance).toFixed(1),
    salesGrowth: (baseGrowth + variance + 2).toFixed(1),
    sellerGrowth: (baseGrowth + variance - 3).toFixed(1),
  };
}

/**
 * Category distribution data
 */
export const categoryDistributionData = [
  { name: "Eletronicos", value: 28, color: "#3b82f6" },
  { name: "Viagem", value: 18, color: "#10b981" },
  { name: "Iluminacao", value: 15, color: "#f59e0b" },
  { name: "Bebidas", value: 22, color: "#ef4444" },
  { name: "Tecnologia", value: 17, color: "#8b5cf6" },
];

/**
 * Revenue by seller data
 */
export const revenueBySellerData = [
  { name: "Beauty Glow", revenue: 1876543, profit: 938271 },
  { name: "TechPro Store", revenue: 1254300, profit: 627150 },
  { name: "Fashion Plus", revenue: 876500, profit: 438250 },
  { name: "Home Essentials", revenue: 654300, profit: 327150 },
  { name: "Sports World", revenue: 543210, profit: 271605 },
];

/**
 * Product performance data
 */
export const productPerformanceData = [
  { name: "Fone Bluetooth", vendas: 2543, rating: 4.8, tendencia: 12 },
  { name: "Mochila Impermeavel", vendas: 1876, rating: 4.6, tendencia: 8 },
  { name: "Luminaria LED", vendas: 1654, rating: 4.7, tendencia: 5 },
  { name: "Garrafa Termica", vendas: 3421, rating: 4.9, tendencia: 15 },
  { name: "Webcam Full HD", vendas: 987, rating: 4.5, tendencia: 3 },
];
