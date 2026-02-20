import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Users, Package, AlertCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import {
  mockProducts,
  mockSellers,
  mockNotifications,
  mockInsights,
} from "@/data/mockData";
import {
  SalesTrendChartWithFilter,
  PlatformComparisonChartWithFilter,
  CategoryDistributionChartWithFilter,
  RevenueBySellerChartWithFilter,
  SeasonalityChartWithFilter,
  ProductPerformanceChartWithFilter,
} from "@/components/ChartComponentsWithFilter";
import { DateRangeFilter } from "@/components/DateRangeFilter";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const [platform, setPlatform] = useState<
    "tiktok_shop" | "instagram" | undefined
  >(undefined);

  // Filter mock data based on platform
  const filteredProducts = platform
    ? mockProducts.filter((p) => p.platform === platform)
    : mockProducts;

  const filteredSellers = platform
    ? mockSellers.filter((s) => s.platform === platform)
    : mockSellers;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Social Commerce Monitor</CardTitle>
            <CardDescription>
              Monitore produtos e vendedores em destaque nas principais redes
              sociais
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Faça login para acessar o dashboard completo com análises,
              notificações e insights.
            </p>
            <Button
              className="w-full"
              size="lg"
              onClick={() => (window.location.href = "/login")}
            >
              Fazer Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Bem-vindo, {user?.name}!</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={platform === "tiktok_shop" ? "default" : "outline"}
                onClick={() =>
                  setPlatform(
                    platform === "tiktok_shop" ? undefined : "tiktok_shop",
                  )
                }
              >
                TikTok Shop
              </Button>
              <Button
                variant={platform === "instagram" ? "default" : "outline"}
                onClick={() =>
                  setPlatform(
                    platform === "instagram" ? undefined : "instagram",
                  )
                }
              >
                Instagram
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Produtos Monitorados
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredProducts.length}
              </div>
              <p className="text-xs text-muted-foreground">Total de produtos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Vendedores Monitorados
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredSellers.length}</div>
              <p className="text-xs text-muted-foreground">
                Total de vendedores
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Notificações
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockNotifications.filter((n) => !n.read).length}
              </div>
              <p className="text-xs text-muted-foreground">Não lidas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Insights</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockInsights.length}</div>
              <p className="text-xs text-muted-foreground">Gerados</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="products" className="space-y-4">
          <TabsList>
            <TabsTrigger value="products">Produtos em Destaque</TabsTrigger>
            <TabsTrigger value="sellers">Top Vendedores</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Produtos Mais Vendidos</CardTitle>
                <CardDescription>
                  Produtos com maior volume de vendas nas últimas 24 horas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredProducts.map((product: any, index: number) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-lg text-blue-600">
                            #{index + 1}
                          </span>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {product.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {product.soldCount.toLocaleString()} vendas • ⭐{" "}
                              {product.rating}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right mr-4">
                        <p className="font-semibold text-gray-900">
                          R${" "}
                          {product.estimatedRevenue.toLocaleString("pt-BR", {
                            maximumFractionDigits: 2,
                          })}
                        </p>
                        <p className="text-sm text-green-600">
                          Lucro: R${" "}
                          {product.estimatedProfit.toLocaleString("pt-BR", {
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Ver Detalhes
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sellers Tab */}
          <TabsContent value="sellers">
            <Card>
              <CardHeader>
                <CardTitle>Top Vendedores</CardTitle>
                <CardDescription>
                  Vendedores com maior volume de vendas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredSellers.map((seller: any, index: number) => (
                    <div
                      key={seller.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-lg text-blue-600">
                            #{index + 1}
                          </span>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {seller.sellerName}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {seller.itemsSoldCount.toLocaleString()} vendas •
                              ⭐ {seller.rating} • Performance:{" "}
                              {seller.shopPerformanceValue}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right mr-4">
                        <p className="font-semibold text-gray-900">
                          R$ {seller.totalRevenue.toLocaleString("pt-BR")}
                        </p>
                        <p className="text-sm text-green-600">
                          Lucro: R$ {seller.totalProfit.toLocaleString("pt-BR")}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Ver Perfil
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            {/* Insights Text */}
            <Card>
              <CardHeader>
                <CardTitle>Insights Recentes</CardTitle>
                <CardDescription>
                  Análises geradas automaticamente sobre tendências e
                  oportunidades
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockInsights.map((insight: any) => (
                    <div
                      key={insight.id}
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">
                          {insight.title}
                        </h3>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          Confiança: {insight.confidence}%
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">
                        {insight.content}
                      </p>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-gray-500">
                          {new Date(insight.generatedAt).toLocaleDateString(
                            "pt-BR",
                          )}
                        </p>
                        <Button variant="outline" size="sm">
                          Ler Completo
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Charts Section */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Análises Visuais
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  <SalesTrendChartWithFilter />
                </div>
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
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
