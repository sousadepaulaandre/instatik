import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  ExternalLink,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import {
  expandedMockProducts,
  type Product,
} from "@/data/expandedMockDataEnhanced";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ProductComparison() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();

  // Get selected product IDs from URL query params
  const urlParams = new URLSearchParams(window.location.search);
  const selectedIds = urlParams.get("ids")?.split(",") || [];

  // Get selected products
  const selectedProducts = expandedMockProducts.filter((p) =>
    selectedIds.includes(p.id.toString()),
  );

  if (selectedProducts.length === 0) {
    return (
      <div className="min-h-screen bg-secondary/30 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Nenhum produto selecionado</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Selecione produtos no dashboard para compará-los.
            </p>
            <Button onClick={() => setLocation("/dashboard")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Prepare comparison data
  const comparisonData = selectedProducts.map((p) => ({
    name: p.name.substring(0, 20) + "...",
    vendas: p.sales,
    receita: p.revenue / 1000, // em milhares
    lucro: p.profit / 1000,
    rating: p.rating,
  }));

  // Prepare trend data (simulated 7-day trend)
  const trendData = Array.from({ length: 7 }, (_, i) => {
    const day = `Dia ${i + 1}`;
    const dataPoint: any = { day };
    selectedProducts.forEach((p) => {
      // Simulate trend with some variation
      const baseValue = p.sales / 7;
      const variation = (Math.random() - 0.5) * baseValue * 0.3;
      dataPoint[p.name.substring(0, 15)] = Math.round(baseValue + variation);
    });
    return dataPoint;
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value * 1000);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("pt-BR").format(value);
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
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
            <Button variant="outline" onClick={() => setLocation("/dashboard")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Comparação de Produtos
          </h1>
          <p className="text-muted-foreground">
            Comparando {selectedProducts.length} produto
            {selectedProducts.length > 1 ? "s" : ""}
          </p>
        </div>

        {/* Comparison Table */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Métricas Comparativas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">
                      Métrica
                    </th>
                    {selectedProducts.map((p) => (
                      <th
                        key={p.id}
                        className="text-left py-3 px-4 font-semibold"
                      >
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">Plataforma</td>
                    {selectedProducts.map((p) => (
                      <td key={p.id} className="py-3 px-4">
                        {p.platform === "tiktok_shop"
                          ? "🎵 TikTok Shop"
                          : "📸 Instagram"}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">Vendas</td>
                    {selectedProducts.map((p) => (
                      <td key={p.id} className="py-3 px-4 font-mono">
                        {formatNumber(p.sales)}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">Receita</td>
                    {selectedProducts.map((p) => (
                      <td
                        key={p.id}
                        className="py-3 px-4 font-mono text-primary font-semibold"
                      >
                        {formatCurrency(p.revenue)}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">Lucro</td>
                    {selectedProducts.map((p) => (
                      <td
                        key={p.id}
                        className="py-3 px-4 font-mono text-green-600 font-semibold"
                      >
                        {formatCurrency(p.profit)}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">Avaliação</td>
                    {selectedProducts.map((p) => (
                      <td key={p.id} className="py-3 px-4">
                        ⭐ {p.rating.toFixed(1)}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">Categoria</td>
                    {selectedProducts.map((p) => (
                      <td key={p.id} className="py-3 px-4">
                        {p.category}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">Localização</td>
                    {selectedProducts.map((p) => (
                      <td key={p.id} className="py-3 px-4">
                        {p.location === "BR" ? "🇧🇷 Brasil" : "🌍 Internacional"}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">Link</td>
                    {selectedProducts.map((p) => (
                      <td key={p.id} className="py-3 px-4">
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline inline-flex items-center gap-1"
                        >
                          Ver produto
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Sales Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Comparação de Vendas</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="vendas"
                    fill="hsl(var(--primary))"
                    name="Vendas"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Revenue & Profit Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Receita vs Lucro (em milhares)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number) => `R$ ${value.toFixed(1)}k`}
                  />
                  <Legend />
                  <Bar
                    dataKey="receita"
                    fill="hsl(var(--primary))"
                    name="Receita"
                  />
                  <Bar dataKey="lucro" fill="#10b981" name="Lucro" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Trend Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Tendência de Vendas (últimos 7 dias)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                {selectedProducts.map((p, index) => {
                  const colors = [
                    "hsl(var(--primary))",
                    "#10b981",
                    "#f59e0b",
                    "#ef4444",
                    "#8b5cf6",
                  ];
                  return (
                    <Line
                      key={p.id}
                      type="monotone"
                      dataKey={p.name.substring(0, 15)}
                      stroke={colors[index % colors.length]}
                      strokeWidth={2}
                      name={p.name.substring(0, 20)}
                    />
                  );
                })}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
