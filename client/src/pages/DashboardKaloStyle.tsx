import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUp,
  Users,
  Package,
  RefreshCw,
  ExternalLink,
  Filter,
  Calendar,
  GitCompare,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import {
  AdvancedProductSearch,
  type SearchFilters,
} from "@/components/AdvancedProductSearch";
import {
  expandedMockProducts,
  expandedMockSellers,
  getTopProducts,
  getTopSellers,
  filterProductsByPlatform,
  filterSellersByPlatform,
  filterProductsByLocation,
  filterSellersByLocation,
  updateProductData,
  updateSellerData,
  type Product,
  type Seller,
} from "@/data/expandedMockDataEnhanced";
import { getTopInsights, type ProductInsight } from "@/data/insightsData";
import { useAuth } from "@/hooks/useAuth";
import {
  ImprovedSalesTrendChart,
  ImprovedPlatformComparison,
  ImprovedCategoryDistribution,
  ImprovedProductPerformance,
} from "@/components/ImprovedCharts";
import { LineChart, Line } from "recharts";

export default function DashboardKaloStyle() {
  const { user } = useAuth();
  const [platform, setPlatform] = useState<
    "tiktok_shop" | "instagram" | undefined
  >(undefined);
  const [locationFilter, setLocationFilter] = useState<
    "BR" | "INT" | undefined
  >(undefined);
  const [products, setProducts] = useState<Product[]>(expandedMockProducts);
  const [sellers, setSellers] = useState<Seller[]>(expandedMockSellers);
  const [lastSync, setLastSync] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    searchTerm: "",
    category: "all",
    minPrice: 0,
    maxPrice: 10000,
  });
  const [, navigate] = useLocation();

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const handleCompare = () => {
    if (selectedProducts.length > 0) {
      navigate(`/compare?ids=${selectedProducts.join(",")}`);
    }
  };

  // Filter products based on platform, location, and search
  let filteredProducts = products;
  if (platform)
    filteredProducts = filterProductsByPlatform(filteredProducts, platform);
  if (locationFilter)
    filteredProducts = filterProductsByLocation(
      filteredProducts,
      locationFilter,
    );

  // Apply search filters
  if (searchFilters.searchTerm) {
    filteredProducts = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(searchFilters.searchTerm.toLowerCase()),
    );
  }
  if (searchFilters.category !== "all") {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === searchFilters.category,
    );
  }
  filteredProducts = filteredProducts.filter(
    (p) =>
      p.price >= searchFilters.minPrice && p.price <= searchFilters.maxPrice,
  );

  // Filter sellers based on platform and location
  let filteredSellers = sellers;
  if (platform)
    filteredSellers = filterSellersByPlatform(filteredSellers, platform);
  if (locationFilter)
    filteredSellers = filterSellersByLocation(filteredSellers, locationFilter);

  const topProducts = getTopProducts(filteredProducts, 10);
  const topSellers = getTopSellers(filteredSellers, 10);

  // Calculate total revenue
  const totalRevenue = filteredProducts.reduce((sum, p) => sum + p.revenue, 0);

  // Simulate data refresh every 8 hours
  useEffect(() => {
    const interval = setInterval(
      () => {
        handleRefresh();
      },
      8 * 60 * 60 * 1000,
    );

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setProducts((prevProducts) =>
      prevProducts.map((p) => updateProductData(p)),
    );

    setSellers((prevSellers) => prevSellers.map((s) => updateSellerData(s)));

    setLastSync(new Date());
    setIsRefreshing(false);
  };

  // Generate mini trend data for products
  const generateMiniTrend = (sales: number) => {
    const baseValue = sales / 30;
    return Array.from({ length: 7 }, (_, i) => ({
      value: baseValue * (0.8 + Math.random() * 0.4),
    }));
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header - Estilo Kalodata */}
      <header className="border-b border-border bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663099864448/cTilbyDKtcpYybHF.png"
              alt="Instatik"
              className="h-10"
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Olá, {user?.name || "Usuário"}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw
                className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
              />
              Atualizar
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Stats - Estilo Kalodata */}
      <section className="bg-gradient-to-br from-secondary via-white to-secondary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">
                {filteredProducts.length}
              </div>
              <div className="text-base text-muted-foreground">
                Produtos Monitorados
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">
                {filteredSellers.length}
              </div>
              <div className="text-base text-muted-foreground">
                Vendedores Ativos
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2 whitespace-nowrap">
                R${(totalRevenue / 1000000).toFixed(1)}M
              </div>
              <div className="text-base text-muted-foreground">
                Receita Total
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">
                90 Dias
              </div>
              <div className="text-base text-muted-foreground">
                Dados Históricos
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Sidebar de Filtros - Estilo Kalodata */}
          <aside className="w-64 flex-shrink-0">
            <Card className="sticky top-24 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Filter className="w-5 h-5" />
                  Filtros
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Date Filter */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Período</span>
                  </div>
                  <select className="w-full px-3 py-2 border border-border rounded-lg text-sm">
                    <option>Últimos 7 dias</option>
                    <option>Últimos 30 dias</option>
                    <option>Últimos 90 dias</option>
                  </select>
                </div>

                {/* Platform Filter */}
                <div>
                  <span className="text-sm font-medium mb-3 block">
                    Plataforma
                  </span>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="platform"
                        checked={platform === undefined}
                        onChange={() => setPlatform(undefined)}
                        className="text-primary"
                      />
                      <span className="text-sm">Todas</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="platform"
                        checked={platform === "tiktok_shop"}
                        onChange={() => setPlatform("tiktok_shop")}
                        className="text-primary"
                      />
                      <span className="text-sm">🎵 TikTok Shop</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="platform"
                        checked={platform === "instagram"}
                        onChange={() => setPlatform("instagram")}
                        className="text-primary"
                      />
                      <span className="text-sm">📸 Instagram</span>
                    </label>
                  </div>
                </div>

                {/* Location Filter */}
                <div>
                  <span className="text-sm font-medium mb-3 block">
                    Localização
                  </span>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="location"
                        checked={locationFilter === undefined}
                        onChange={() => setLocationFilter(undefined)}
                        className="text-primary"
                      />
                      <span className="text-sm">Todas</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="location"
                        checked={locationFilter === "BR"}
                        onChange={() => setLocationFilter("BR")}
                        className="text-primary"
                      />
                      <span className="text-sm">🇧🇷 Brasil</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="location"
                        checked={locationFilter === "INT"}
                        onChange={() => setLocationFilter("INT")}
                        className="text-primary"
                      />
                      <span className="text-sm">🌍 Internacional</span>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Advanced Search Component */}
            <div className="mt-4">
              <AdvancedProductSearch
                onSearch={setSearchFilters}
                categories={[
                  "Eletrônicos",
                  "Moda",
                  "Beleza",
                  "Casa",
                  "Esportes",
                  "Brinquedos",
                  "Livros",
                  "Alimentos",
                  "Pet",
                  "Automotivo",
                ]}
              />
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            <Tabs defaultValue="products" className="space-y-6">
              <TabsList className="bg-white border border-border shadow-sm">
                <TabsTrigger
                  value="products"
                  className="data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  Produtos em Tendência
                </TabsTrigger>
                <TabsTrigger
                  value="sellers"
                  className="data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  Top Vendedores
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  Análises Visuais
                </TabsTrigger>
                <TabsTrigger
                  value="insights"
                  className="data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  Insights
                </TabsTrigger>
              </TabsList>

              {/* Products Tab */}
              <TabsContent value="products" className="space-y-4">
                <Card className="shadow-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Produtos Mais Vendidos</CardTitle>
                        <CardDescription>
                          Top {topProducts.length} produtos com maior volume de
                          vendas
                        </CardDescription>
                      </div>
                      {selectedProducts.length > 0 && (
                        <Button
                          onClick={handleCompare}
                          className="bg-primary hover:bg-primary/90"
                        >
                          <GitCompare className="w-4 h-4 mr-2" />
                          Comparar ({selectedProducts.length})
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {topProducts.map((product, index) => {
                      const trendData = generateMiniTrend(product.sales);
                      return (
                        <div
                          key={product.id}
                          className="flex items-center gap-4 p-4 border border-border rounded-lg hover:shadow-md transition-shadow bg-white"
                        >
                          {/* Checkbox */}
                          <Checkbox
                            checked={selectedProducts.includes(
                              product.id.toString(),
                            )}
                            onCheckedChange={() =>
                              toggleProductSelection(product.id.toString())
                            }
                            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />

                          {/* Rank */}
                          <div className="text-2xl font-bold text-muted-foreground w-8">
                            #{index + 1}
                          </div>

                          {/* Product Info */}
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground mb-1">
                              {product.name}
                            </h4>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <span>
                                {product.sales.toLocaleString("pt-BR")} vendas
                              </span>
                              <span>⭐ {product.rating.toFixed(1)}</span>
                              <span>
                                {product.platform === "tiktok_shop"
                                  ? "🎵 TikTok"
                                  : "📸 Instagram"}
                              </span>
                              <span>
                                {product.location === "BR"
                                  ? "🇧🇷 Brasil"
                                  : "🌍 Internacional"}
                              </span>
                            </div>
                          </div>

                          {/* Mini Trend Chart */}
                          <div className="w-24 h-12">
                            <LineChart width={96} height={48} data={trendData}>
                              <Line
                                type="monotone"
                                dataKey="value"
                                stroke="hsl(var(--primary))"
                                strokeWidth={2}
                                dot={false}
                              />
                            </LineChart>
                          </div>

                          {/* Revenue */}
                          <div className="text-right">
                            <div className="text-xl font-bold text-primary whitespace-nowrap">
                              R${(product.revenue / 1000).toFixed(1)}k
                            </div>
                            <div className="text-xs text-muted-foreground whitespace-nowrap">
                              Lucro: R${(product.profit / 1000).toFixed(1)}k
                            </div>
                          </div>

                          {/* Link */}
                          <a
                            href={product.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Sellers Tab */}
              <TabsContent value="sellers" className="space-y-4">
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle>Vendedores com Melhor Performance</CardTitle>
                    <CardDescription>
                      Top {topSellers.length} vendedores por receita total
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {topSellers.map((seller, index) => {
                      const trendData = generateMiniTrend(seller.totalSales);
                      return (
                        <div
                          key={seller.id}
                          className="flex items-center gap-4 p-4 border border-border rounded-lg hover:shadow-md transition-shadow bg-white"
                        >
                          {/* Rank */}
                          <div className="text-2xl font-bold text-muted-foreground w-8">
                            #{index + 1}
                          </div>

                          {/* Avatar */}
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                            {seller.name.charAt(0)}
                          </div>

                          {/* Seller Info */}
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground mb-1">
                              {seller.name}
                            </h4>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <span>
                                {seller.totalSales.toLocaleString("pt-BR")}{" "}
                                vendas
                              </span>
                              <span>⭐ {seller.rating.toFixed(1)}</span>
                              <span>
                                {seller.platform === "tiktok_shop"
                                  ? "🎵 TikTok"
                                  : "📸 Instagram"}
                              </span>
                              <span>
                                {seller.location === "BR"
                                  ? "🇧🇷 Brasil"
                                  : "🌍 Internacional"}
                              </span>
                            </div>
                          </div>

                          {/* Mini Trend Chart */}
                          <div className="w-24 h-12">
                            <LineChart width={96} height={48} data={trendData}>
                              <Line
                                type="monotone"
                                dataKey="value"
                                stroke="hsl(var(--accent))"
                                strokeWidth={2}
                                dot={false}
                              />
                            </LineChart>
                          </div>

                          {/* Revenue */}
                          <div className="text-right">
                            <div className="text-xl font-bold text-accent whitespace-nowrap">
                              R${(seller.totalRevenue / 1000).toFixed(1)}k
                            </div>
                            <div className="text-xs text-muted-foreground whitespace-nowrap">
                              Lucro: R${(seller.totalProfit / 1000).toFixed(1)}k
                            </div>
                          </div>

                          {/* Link */}
                          <a
                            href={seller.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="space-y-6">
                {/* Botão Aplicar Filtros */}
                <div className="flex justify-end">
                  <Button
                    onClick={() => {
                      // Filtros já são aplicados automaticamente via state
                      // Este botão serve para feedback visual
                      const message = `Filtros aplicados: ${platform ? (platform === "tiktok_shop" ? "TikTok Shop" : "Instagram") : "Todas as plataformas"}, ${locationFilter ? (locationFilter === "BR" ? "Brasil" : "Internacional") : "Todas as localizações"}`;
                      alert(message);
                    }}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Aplicar Filtros
                  </Button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="shadow-sm">
                    <CardHeader>
                      <CardTitle>Tendência de Vendas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ImprovedSalesTrendChart />
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm">
                    <CardHeader>
                      <CardTitle>Comparação entre Plataformas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ImprovedPlatformComparison />
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm">
                    <CardHeader>
                      <CardTitle>Distribuição por Categoria</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ImprovedCategoryDistribution />
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm">
                    <CardHeader>
                      <CardTitle>Performance de Produtos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ImprovedProductPerformance />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Insights Tab */}
              <TabsContent value="insights" className="space-y-4">
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle>Produtos Promissores</CardTitle>
                    <CardDescription>
                      Sugestões de produtos com alto potencial de crescimento
                      baseadas em análise de tendências
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm text-muted-foreground mb-4">
                      Nossa IA analisa padrões de vendas, tendências de mercado
                      e nível de competição para identificar produtos com maior
                      probabilidade de sucesso.
                    </div>
                    {getTopInsights(10).map((insight, index) => (
                      <div
                        key={insight.id}
                        className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow bg-white"
                      >
                        <div className="flex items-start gap-4">
                          {/* Rank e Probabilidade */}
                          <div className="flex flex-col items-center">
                            <div className="text-2xl font-bold text-muted-foreground">
                              #{index + 1}
                            </div>
                            <div className="mt-2 text-center">
                              <div className="text-3xl font-bold text-primary">
                                {insight.successProbability}%
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Sucesso
                              </div>
                            </div>
                          </div>

                          {/* Conteúdo Principal */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-semibold text-foreground text-lg">
                                  {insight.name}
                                </h4>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                  <span className="px-2 py-1 bg-secondary rounded text-xs">
                                    {insight.category}
                                  </span>
                                  <span>
                                    {insight.platform === "tiktok_shop"
                                      ? "🎵 TikTok"
                                      : "📸 Instagram"}
                                  </span>
                                  <span className="px-2 py-1 bg-accent/10 text-accent rounded text-xs">
                                    Crescimento: +{insight.projectedGrowth}%
                                  </span>
                                </div>
                              </div>
                            </div>

                            <p className="text-sm text-muted-foreground mb-3">
                              {insight.reasoning}
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-3">
                              <div>
                                <div className="text-xs text-muted-foreground">
                                  Vendas Atuais
                                </div>
                                <div className="font-semibold">
                                  {insight.currentSales.toLocaleString("pt-BR")}{" "}
                                  un.
                                </div>
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground">
                                  Faixa de Preço
                                </div>
                                <div className="font-semibold">
                                  {insight.priceRange}
                                </div>
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground">
                                  Competição
                                </div>
                                <div className="font-semibold capitalize">
                                  {insight.competitionLevel === "low"
                                    ? "🟢 Baixa"
                                    : insight.competitionLevel === "medium"
                                      ? "🟡 Média"
                                      : "🔴 Alta"}
                                </div>
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground">
                                  Público-Alvo
                                </div>
                                <div className="font-semibold text-xs">
                                  {insight.targetAudience}
                                </div>
                              </div>
                            </div>

                            <div>
                              <div className="text-xs text-muted-foreground mb-1">
                                Tendências
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {insight.trends.map((trend, i) => (
                                  <span
                                    key={i}
                                    className="px-2 py-1 bg-primary/10 text-primary rounded text-xs"
                                  >
                                    {trend}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Sync Info */}
            <div className="mt-6 text-center text-sm text-muted-foreground">
              Última sincronização: {lastSync.toLocaleString("pt-BR")} • Próxima
              em 8h
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
