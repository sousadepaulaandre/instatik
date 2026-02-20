import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  salesTrendData,
  platformComparisonData,
  categoryDistributionData,
  revenueBySellerData,
  seasonalityData,
  productPerformanceData,
} from "@/data/chartData";

export function SalesTrendChart() {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Tendência de Vendas</CardTitle>
        <CardDescription>
          Evolução de vendas diárias por plataforma nos últimos 16 dias
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesTrendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              formatter={(value) => value.toLocaleString("pt-BR")}
              labelFormatter={(label) => `Data: ${label}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="tiktokShop"
              stroke="#000000"
              name="TikTok Shop"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="instagram"
              stroke="#E4405F"
              name="Instagram"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#3b82f6"
              name="Total"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function PlatformComparisonChart() {
  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle>Comparação Entre Plataformas</CardTitle>
        <CardDescription>
          Métricas principais de cada plataforma
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={platformComparisonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip
              formatter={(value: any) => {
                if (typeof value === "number" && value > 1000) {
                  return `R$ ${(value / 1000).toFixed(1)}k`;
                }
                return typeof value === "number"
                  ? value.toLocaleString("pt-BR")
                  : value;
              }}
            />
            <Legend />
            <Bar
              yAxisId="left"
              dataKey="totalVendas"
              fill="#3b82f6"
              name="Total de Vendas"
            />
            <Bar
              yAxisId="right"
              dataKey="totalReceita"
              fill="#10b981"
              name="Receita (R$)"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function CategoryDistributionChart() {
  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  return (
    <Card className="col-span-full lg:col-span-1">
      <CardHeader>
        <CardTitle>Distribuição por Categoria</CardTitle>
        <CardDescription>Percentual de produtos por categoria</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryDistributionData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {categoryDistributionData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function RevenueBySellerChart() {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Receita por Vendedor</CardTitle>
        <CardDescription>Top 5 vendedores por receita total</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={revenueBySellerData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip
              formatter={(value: any) =>
                typeof value === "number"
                  ? `R$ ${(value / 1000).toFixed(1)}k`
                  : value
              }
            />
            <Legend />
            <Bar
              yAxisId="left"
              dataKey="revenue"
              fill="#3b82f6"
              name="Receita Total"
            />
            <Bar
              yAxisId="right"
              dataKey="profit"
              fill="#10b981"
              name="Lucro Bruto"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function SeasonalityChart() {
  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle>Padrão de Sazonalidade</CardTitle>
        <CardDescription>
          Distribuição de vendas por dia da semana
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={seasonalityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip formatter={(value) => value.toLocaleString("pt-BR")} />
            <Legend />
            <Bar
              yAxisId="left"
              dataKey="vendas"
              fill="#f59e0b"
              name="Quantidade de Vendas"
            />
            <Bar
              yAxisId="right"
              dataKey="percentual"
              fill="#ef4444"
              name="Percentual (%)"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function ProductPerformanceChart() {
  return (
    <Card className="col-span-full lg:col-span-1">
      <CardHeader>
        <CardTitle>Performance de Produtos</CardTitle>
        <CardDescription>Top 5 produtos por volume de vendas</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={productPerformanceData}
            layout="vertical"
            margin={{ left: 150 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={140} />
            <Tooltip formatter={(value) => value.toLocaleString("pt-BR")} />
            <Legend />
            <Bar dataKey="vendas" fill="#3b82f6" name="Vendas" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
