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
import { InlineDateRangeFilter } from "@/components/DateRangeFilter";
import { useState } from "react";
import {
  filterDataByDays,
  categoryDistributionData,
  revenueBySellerData,
  seasonalityData,
  productPerformanceData,
  generateRevenueMetrics,
  generateGrowthMetrics,
} from "@/data/expandedChartData";

export function SalesTrendChartWithFilter() {
  const [dateRange, setDateRange] = useState<7 | 30 | 90>(30);
  const data = filterDataByDays(dateRange);
  const metrics = generateRevenueMetrics(dateRange);
  const growth = generateGrowthMetrics(dateRange);

  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Tendência de Vendas</CardTitle>
            <CardDescription>
              Evolução de vendas diárias por plataforma
            </CardDescription>
          </div>
          <InlineDateRangeFilter
            onDateRangeChange={setDateRange}
            currentRange={dateRange}
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="bg-blue-50 p-3 rounded">
            <p className="text-xs text-gray-600">Receita Total</p>
            <p className="text-lg font-bold text-blue-600">
              R$ {(metrics.totalRevenue / 1000).toFixed(0)}k
            </p>
          </div>
          <div className="bg-green-50 p-3 rounded">
            <p className="text-xs text-gray-600">Lucro Bruto</p>
            <p className="text-lg font-bold text-green-600">
              R$ {(metrics.totalProfit / 1000).toFixed(0)}k
            </p>
          </div>
          <div className="bg-purple-50 p-3 rounded">
            <p className="text-xs text-gray-600">Crescimento Receita</p>
            <p className="text-lg font-bold text-purple-600">
              +{growth.revenueGrowth}%
            </p>
          </div>
          <div className="bg-orange-50 p-3 rounded">
            <p className="text-xs text-gray-600">Crescimento Vendas</p>
            <p className="text-lg font-bold text-orange-600">
              +{growth.salesGrowth}%
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
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
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="instagram"
              stroke="#E4405F"
              name="Instagram"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#3b82f6"
              name="Total"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function PlatformComparisonChartWithFilter() {
  const [dateRange, setDateRange] = useState<7 | 30 | 90>(30);

  const platformData = [
    {
      name: "TikTok Shop",
      totalVendas:
        87543 * (dateRange === 7 ? 0.15 : dateRange === 30 ? 0.5 : 1),
      totalReceita:
        1254300 * (dateRange === 7 ? 0.15 : dateRange === 30 ? 0.5 : 1),
      color: "#000000",
    },
    {
      name: "Instagram",
      totalVendas:
        54321 * (dateRange === 7 ? 0.15 : dateRange === 30 ? 0.5 : 1),
      totalReceita:
        876500 * (dateRange === 7 ? 0.15 : dateRange === 30 ? 0.5 : 1),
      color: "#E4405F",
    },
  ];

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Comparação Entre Plataformas</CardTitle>
            <CardDescription>
              Métricas principais de cada plataforma
            </CardDescription>
          </div>
          <InlineDateRangeFilter
            onDateRangeChange={setDateRange}
            currentRange={dateRange}
          />
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={platformData}>
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

export function CategoryDistributionChartWithFilter() {
  const [dateRange, setDateRange] = useState<7 | 30 | 90>(30);
  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  return (
    <Card className="col-span-full lg:col-span-1">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Distribuição por Categoria</CardTitle>
            <CardDescription>
              Percentual de produtos por categoria
            </CardDescription>
          </div>
          <InlineDateRangeFilter
            onDateRangeChange={setDateRange}
            currentRange={dateRange}
          />
        </div>
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
              {categoryDistributionData.map((entry: any, index: number) => (
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

export function RevenueBySellerChartWithFilter() {
  const [dateRange, setDateRange] = useState<7 | 30 | 90>(30);

  const scaledData = revenueBySellerData.map((seller: any) => ({
    ...seller,
    revenue:
      seller.revenue * (dateRange === 7 ? 0.15 : dateRange === 30 ? 0.5 : 1),
    profit:
      seller.profit * (dateRange === 7 ? 0.15 : dateRange === 30 ? 0.5 : 1),
  }));

  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Receita por Vendedor</CardTitle>
            <CardDescription>
              Top 5 vendedores por receita total
            </CardDescription>
          </div>
          <InlineDateRangeFilter
            onDateRangeChange={setDateRange}
            currentRange={dateRange}
          />
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={scaledData}>
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

export function SeasonalityChartWithFilter() {
  const [dateRange, setDateRange] = useState<7 | 30 | 90>(30);

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Padrão de Sazonalidade</CardTitle>
            <CardDescription>
              Distribuição de vendas por dia da semana
            </CardDescription>
          </div>
          <InlineDateRangeFilter
            onDateRangeChange={setDateRange}
            currentRange={dateRange}
          />
        </div>
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

export function ProductPerformanceChartWithFilter() {
  const [dateRange, setDateRange] = useState<7 | 30 | 90>(30);

  const scaledData = productPerformanceData.map((product: any) => ({
    ...product,
    vendas: Math.floor(
      product.vendas * (dateRange === 7 ? 0.15 : dateRange === 30 ? 0.5 : 1),
    ),
  }));

  return (
    <Card className="col-span-full lg:col-span-1">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Performance de Produtos</CardTitle>
            <CardDescription>
              Top 5 produtos por volume de vendas
            </CardDescription>
          </div>
          <InlineDateRangeFilter
            onDateRangeChange={setDateRange}
            currentRange={dateRange}
          />
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={scaledData} layout="vertical" margin={{ left: 150 }}>
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
