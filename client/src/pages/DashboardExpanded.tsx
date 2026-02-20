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
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  expandedMockProducts,
  expandedMockSellers,
  getTopProducts,
  getTopSellers,
  filterProductsByPlatform,
  filterSellersByPlatform,
  updateProductData,
  updateSellerData,
  type Product,
  type Seller,
} from "@/data/expandedMockData";
import { useAuth } from "@/hooks/useAuth";
import {
  SalesTrendChartWithFilter,
  PlatformComparisonChartWithFilter,
  CategoryDistributionChartWithFilter,
  RevenueBySellerChartWithFilter,
  SeasonalityChartWithFilter,
  ProductPerformanceChartWithFilter,
} from "@/components/ChartComponentsWithFilter";

export default function DashboardExpanded() {
  const { user } = useAuth();
  const [platform, setPlatform] = useState<
    "tiktok_shop" | "instagram" | undefined
  >(undefined);
  const [products, setProducts] = useState<Product[]>(expandedMockProducts);
  const [sellers, setSellers] = useState<Seller[]>(expandedMockSellers);
  const [lastSync, setLastSync] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filter products based on platform
  const filteredProducts = platform
    ? filterProductsByPlatform(products, platform)
    : products;

  // Filter sellers based on platform
  const filteredSellers = platform
    ? filterSellersByPlatform(sellers, platform)
    : sellers;

  const topProducts = getTopProducts(filteredProducts, 10);
  const topSellers = getTopSellers(filteredSellers, 10);

  // Simulate data refresh every 8 hours
  useEffect(() => {
    const interval = setInterval(
      () => {
        handleRefresh();
      },
      8 * 60 * 60 * 1000,
    ); // 8 hours

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Update products and sellers with new data
    setProducts((prevProducts) =>
      prevProducts.map((p) => updateProductData(p)),
    );

    setSellers((prevSellers) => prevSellers.map((s) => updateSellerData(s)));

    setLastSync(new Date());
    setIsRefreshing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard de Monitoramento
          </h1>
          <p className="text-gray-600">
            Bem-vindo, {user?.name || "Usuário"}! Monitorando {products.length}{" "}
            produtos e {sellers.length} vendedores.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Produtos Monitorados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
              <p className="text-xs text-gray-500 mt-1">Total de produtos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Vendedores Monitorados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sellers.length}</div>
              <p className="text-xs text-gray-500 mt-1">Total de vendedores</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Receita Total Estimada
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                R${" "}
                {(
                  products.reduce((sum, p) => sum + p.revenue, 0) / 1000000
                ).toFixed(1)}
                M
              </div>
              <p className="text-xs text-gray-500 mt-1">Todos os produtos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Última Sincronização
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-mono">
                {lastSync.toLocaleTimeString("pt-BR")}
              </div>
              <p className="text-xs text-gray-500 mt-1">Próxima em 8h</p>
            </CardContent>
          </Card>
        </div>

        {/* Platform Filter */}
        <div className="mb-6 flex gap-2">
          <Button
            variant={platform === undefined ? "default" : "outline"}
            onClick={() => setPlatform(undefined)}
          >
            Todas as Plataformas
          </Button>
          <Button
            variant={platform === "tiktok_shop" ? "default" : "outline"}
            onClick={() => setPlatform("tiktok_shop")}
          >
            TikTok Shop
          </Button>
          <Button
            variant={platform === "instagram" ? "default" : "outline"}
            onClick={() => setPlatform("instagram")}
          >
            Instagram
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="ml-auto"
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
            />
            {isRefreshing ? "Atualizando..." : "Atualizar Agora"}
          </Button>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products">
              Produtos em Destaque ({filteredProducts.length})
            </TabsTrigger>
            <TabsTrigger value="sellers">
              Top Vendedores ({filteredSellers.length})
            </TabsTrigger>
            <TabsTrigger value="insights">Análises Visuais</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Produtos Mais Vendidos</CardTitle>
                <CardDescription>
                  Top 10 produtos com maior volume de vendas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">
                          #{index + 1} {product.name}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {product.sales.toLocaleString("pt-BR")} vendas • ⭐{" "}
                          {product.rating} •{" "}
                          {product.platform === "tiktok_shop"
                            ? "🎵 TikTok"
                            : "📸 Instagram"}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">
                          R$ {(product.revenue / 1000).toFixed(1)}k
                        </div>
                        <div className="text-sm text-gray-600">
                          Lucro: R$ {(product.profit / 1000).toFixed(1)}k
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sellers Tab */}
          <TabsContent value="sellers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Vendedores</CardTitle>
                <CardDescription>
                  Vendedores com maior receita total
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topSellers.map((seller, index) => (
                    <div
                      key={seller.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">
                          #{index + 1} {seller.name}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {seller.totalSales.toLocaleString("pt-BR")} vendas •
                          ⭐ {seller.rating} •{" "}
                          {seller.platform === "tiktok_shop"
                            ? "🎵 TikTok"
                            : "📸 Instagram"}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">
                          R$ {(seller.totalRevenue / 1000).toFixed(1)}k
                        </div>
                        <div className="text-sm text-gray-600">
                          Lucro: R$ {(seller.totalProfit / 1000).toFixed(1)}k
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <SalesTrendChartWithFilter />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <PlatformComparisonChartWithFilter />
              <CategoryDistributionChartWithFilter />
            </div>

            <div className="grid grid-cols-1 gap-6">
              <RevenueBySellerChartWithFilter />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <SeasonalityChartWithFilter />
              <ProductPerformanceChartWithFilter />
            </div>
          </TabsContent>
        </Tabs>

        {/* Sync Status */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900">
                Sincronização Automática
              </h3>
              <p className="text-sm text-blue-800 mt-1">
                Os dados são sincronizados automaticamente a cada 8 horas.
                Última sincronização: {lastSync.toLocaleString("pt-BR")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
