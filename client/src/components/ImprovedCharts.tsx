import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
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

// Dados de exemplo para tendência de vendas
const trendData = [
  {
    date: "20/01",
    tiktok_vendas: 1200,
    instagram_vendas: 1000,
    tiktok_receita: 120000,
    instagram_receita: 100000,
  },
  {
    date: "21/01",
    tiktok_vendas: 1500,
    instagram_vendas: 1300,
    tiktok_receita: 150000,
    instagram_receita: 130000,
  },
  {
    date: "22/01",
    tiktok_vendas: 1800,
    instagram_vendas: 1600,
    tiktok_receita: 180000,
    instagram_receita: 160000,
  },
  {
    date: "23/01",
    tiktok_vendas: 1400,
    instagram_vendas: 1200,
    tiktok_receita: 140000,
    instagram_receita: 120000,
  },
  {
    date: "24/01",
    tiktok_vendas: 2000,
    instagram_vendas: 1800,
    tiktok_receita: 200000,
    instagram_receita: 180000,
  },
];

// Dados de comparação entre plataformas
const platformData = [
  { name: "TikTok Shop", vendas: 2500, receita: 250000 },
  { name: "Instagram", vendas: 2200, receita: 220000 },
];

// Dados de distribuição por categoria
const categoryData = [
  {
    name: "Eletrônicos",
    value: 28,
    produtos: ["Fone Bluetooth", "Teclado RGB", 'Monitor 27"'],
  },
  {
    name: "Moda",
    value: 22,
    produtos: ["Camiseta Premium", "Jaqueta Inverno", "Calça Jeans"],
  },
  {
    name: "Casa",
    value: 18,
    produtos: ["Luminária LED", "Tapete Persa", "Almofada Veludo"],
  },
  {
    name: "Tecnologia",
    value: 15,
    produtos: ["Smartwatch", "Câmera HD", "Drone"],
  },
  { name: "Outros", value: 17, produtos: ["Diversos", "Variados", "Sortidos"] },
];

// Dados de performance de produtos (em ordem decrescente)
const performanceData = [
  { nome: "Fone Bluetooth", vendas: 5073, url: "https://tiktok.com/product/1" },
  { nome: "Teclado RGB", vendas: 4856, url: "https://tiktok.com/product/2" },
  { nome: 'Monitor 27"', vendas: 4723, url: "https://tiktok.com/product/3" },
  { nome: "Smartwatch", vendas: 4512, url: "https://tiktok.com/product/4" },
  { nome: "Câmera HD", vendas: 4301, url: "https://tiktok.com/product/5" },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export function ImprovedSalesTrendChart() {
  const [viewType, setViewType] = useState<"vendas" | "receita">("vendas");
  const [platform, setPlatform] = useState<"tiktok" | "instagram" | "ambas">(
    "ambas",
  );

  const getDataKey = (): string => {
    if (viewType === "vendas") {
      return platform === "tiktok" ? "tiktok_vendas" : "instagram_vendas";
    } else {
      return platform === "tiktok" ? "tiktok_receita" : "instagram_receita";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tendência de Vendas</CardTitle>
        <CardDescription>
          Evolução de{" "}
          {viewType === "vendas"
            ? "quantidade de vendas (unidades)"
            : "receita (R$)"}{" "}
          por plataforma
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <div>
            <span className="text-sm font-medium mr-2">Visualizar:</span>
            <Button
              variant={viewType === "vendas" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewType("vendas")}
            >
              Vendas (un.)
            </Button>
            <Button
              variant={viewType === "receita" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewType("receita")}
            >
              Receita (R$)
            </Button>
          </div>
          <div>
            <span className="text-sm font-medium mr-2">Plataforma:</span>
            <Button
              variant={platform === "tiktok" ? "default" : "outline"}
              size="sm"
              onClick={() => setPlatform("tiktok")}
            >
              TikTok
            </Button>
            <Button
              variant={platform === "instagram" ? "default" : "outline"}
              size="sm"
              onClick={() => setPlatform("instagram")}
            >
              Instagram
            </Button>
            <Button
              variant={platform === "ambas" ? "default" : "outline"}
              size="sm"
              onClick={() => setPlatform("ambas")}
            >
              Ambas
            </Button>
          </div>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-900 mb-4">
          <strong>Eixo X:</strong> Data | <strong>Eixo Y:</strong>{" "}
          {viewType === "vendas"
            ? "Quantidade de vendas (unidades)"
            : "Receita em reais (R$)"}
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis
              label={{
                value: viewType === "vendas" ? "Vendas (un.)" : "Receita (R$)",
                angle: -90,
                position: "insideLeft",
              }}
              domain={["auto", "auto"]}
            />
            <Tooltip
              formatter={(value) =>
                viewType === "vendas"
                  ? `${value} un.`
                  : `R$ ${value.toLocaleString("pt-BR")}`
              }
            />
            <Legend />
            {platform === "ambas" && (
              <Line
                type="monotone"
                dataKey={
                  viewType === "vendas" ? "tiktok_vendas" : "tiktok_receita"
                }
                stroke="#0ea5e9"
                strokeWidth={4}
                name="TikTok Shop"
                dot={{ r: 5, fill: "#0ea5e9" }}
                activeDot={{ r: 7 }}
              />
            )}
            {platform === "ambas" && (
              <Line
                type="monotone"
                dataKey={
                  viewType === "vendas"
                    ? "instagram_vendas"
                    : "instagram_receita"
                }
                stroke="#ec4899"
                strokeWidth={4}
                name="Instagram"
                dot={{ r: 5, fill: "#ec4899" }}
                activeDot={{ r: 7 }}
              />
            )}
            {platform !== "ambas" && (
              <Line
                type="monotone"
                dataKey={getDataKey()}
                stroke="#3b82f6"
                strokeWidth={3}
                name={platform === "tiktok" ? "TikTok Shop" : "Instagram"}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function ImprovedPlatformComparison() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Comparação Entre Plataformas</CardTitle>
        <CardDescription>
          Vendas em unidades e Receita em reais (R$)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={platformData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              yAxisId="left"
              label={{
                value: "Vendas (un.)",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              label={{
                value: "Receita (R$)",
                angle: 90,
                position: "insideRight",
              }}
            />
            <Tooltip
              formatter={(value, name) => {
                if (name === "vendas") return [`${value} un.`, "Vendas"];
                if (name === "receita")
                  return [`R$ ${value.toLocaleString("pt-BR")}`, "Receita"];
                return value;
              }}
            />
            <Legend />
            <Bar
              yAxisId="left"
              dataKey="vendas"
              fill="#3b82f6"
              name="Vendas (un.)"
            />
            <Bar
              yAxisId="right"
              dataKey="receita"
              fill="#10b981"
              name="Receita (R$)"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function ImprovedCategoryDistribution() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição por Categoria</CardTitle>
        <CardDescription>
          Percentual de produtos por categoria (passe o mouse para ver
          principais produtos)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={(_, index) =>
                setHoveredCategory(categoryData[index].name)
              }
              onMouseLeave={() => setHoveredCategory(null)}
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        {hoveredCategory && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-sm mb-2">
              Principais produtos em {hoveredCategory}:
            </h4>
            <ul className="text-sm space-y-1">
              {categoryData
                .find((c) => c.name === hoveredCategory)
                ?.produtos.map((p, i) => (
                  <li key={i} className="text-gray-700">
                    • {p}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function ImprovedProductPerformance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance de Produtos</CardTitle>
        <CardDescription>
          Top 5 produtos por volume de vendas (em ordem decrescente)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={performanceData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 200, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              label={{
                value: "Vendas (unidades)",
                position: "insideBottomRight",
                offset: -5,
              }}
            />
            <YAxis dataKey="nome" type="category" width={190} />
            <Tooltip formatter={(value) => `${value} un.`} />
            <Bar dataKey="vendas" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-6 space-y-2">
          <h4 className="font-semibold text-sm mb-3">Links para produtos:</h4>
          {performanceData.map((product, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 border rounded hover:bg-gray-50"
            >
              <span className="text-sm">
                {index + 1}. {product.nome}
              </span>
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Ver no site ↗
              </a>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
