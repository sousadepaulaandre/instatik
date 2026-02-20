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
  ExternalLink,
} from "lucide-react";
import { useState, useEffect } from "react";
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
import { useAuth } from "@/hooks/useAuth";
import {
  ImprovedSalesTrendChart,
  ImprovedPlatformComparison,
  ImprovedCategoryDistribution,
  ImprovedProductPerformance,
} from "@/components/ImprovedCharts";

export default function DashboardExpandedV2() {
  const { user } = useAuth();
  const [platform, setPlatform] = useState<
    "tiktok_shop" | "instagram" | undefined
  >(undefined);
  const [location, setLocation] = useState<"BR" | "INT" | undefined>(undefined);
  const [products, setProducts] = useState<Product[]>(expandedMockProducts);
  const [sellers, setSellers] = useState<Seller[]>(expandedMockSellers);
  const [lastSync, setLastSync] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filter products based on platform and location
  let filteredProducts = products;
  if (platform)
    filteredProducts = filterProductsByPlatform(filteredProducts, platform);
  if (location)
    filteredProducts = filterProductsByLocation(filteredProducts, location);

  // Filter sellers based on platform and location
  let filteredSellers = sellers;
  if (platform)
    filteredSellers = filterSellersByPlatform(filteredSellers, platform);
  if (location)
    filteredSellers = filterSellersByLocation(filteredSellers, location);

  const topProducts = getTopProducts(filteredProducts, 10);
  const topSellers = getTopSellers(filteredSellers, 10);

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

  const getLocationLabel = (loc: "BR" | "INT") =>
    loc === "BR" ? "🇧🇷 Brasil" : "🌍 Internacional";

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
              <div className="text-2xl font-bold">
                {filteredProducts.length}
              </div>
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
              <div className="text-2xl font-bold">{filteredSellers.length}</div>
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
                  filteredProducts.reduce((sum, p) => sum + p.revenue, 0) /
                  1000000
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

        {/* Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium self-center">Plataforma:</span>
            <Button
              variant={platform === undefined ? "default" : "outline"}
              onClick={() => setPlatform(undefined)}
              size="sm"
            >
              Todas
            </Button>
            <Button
              variant={platform === "tiktok_shop" ? "default" : "outline"}
              onClick={() => setPlatform("tiktok_shop")}
              size="sm"
            >
              TikTok Shop
            </Button>
            <Button
              variant={platform === "instagram" ? "default" : "outline"}
              onClick={() => setPlatform("instagram")}
              size="sm"
            >
              Instagram
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium self-center">
              Localização:
            </span>
            <Button
              variant={location === undefined ? "default" : "outline"}
              onClick={() => setLocation(undefined)}
              size="sm"
            >
              Todas
            </Button>
            <Button
              variant={location === "BR" ? "default" : "outline"}
              onClick={() => setLocation("BR")}
              size="sm"
            >
              🇧🇷 Brasil
            </Button>
            <Button
              variant={location === "INT" ? "default" : "outline"}
              onClick={() => setLocation("INT")}
              size="sm"
            >
              🌍 Internacional
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
                            : "📸 Instagram"}{" "}
                          • {getLocationLabel(product.location)}
                        </div>
                      </div>
                      <div className="text-right mr-4">
                        <div className="font-bold text-green-600">
                          R$ {(product.revenue / 1000).toFixed(1)}k
                        </div>
                        <div className="text-sm text-gray-600">
                          Lucro: R$ {(product.profit / 1000).toFixed(1)}k
                        </div>
                      </div>
                      <a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                        title="Abrir no site externo"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
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
                            : "📸 Instagram"}{" "}
                          • {getLocationLabel(seller.location)}
                        </div>
                      </div>
                      <div className="text-right mr-4">
                        <div className="font-bold text-green-600">
                          R$ {(seller.totalRevenue / 1000).toFixed(1)}k
                        </div>
                        <div className="text-sm text-gray-600">
                          Lucro: R$ {(seller.totalProfit / 1000).toFixed(1)}k
                        </div>
                      </div>
                      <a
                        href={seller.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                        title="Abrir no site externo"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <ImprovedSalesTrendChart />
            <ImprovedPlatformComparison />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ImprovedCategoryDistribution />
              <ImprovedProductPerformance />
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
