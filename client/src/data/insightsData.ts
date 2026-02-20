// Dados de insights com produtos promissores e probabilidade de sucesso

export interface ProductInsight {
  id: string;
  name: string;
  category: string;
  platform: "tiktok_shop" | "instagram";
  currentSales: number;
  projectedGrowth: number; // Percentual de crescimento projetado
  successProbability: number; // 0-100
  reasoning: string;
  trends: string[];
  competitionLevel: "low" | "medium" | "high";
  priceRange: string;
  targetAudience: string;
}

export const productInsights: ProductInsight[] = [
  {
    id: "1",
    name: "Garrafa Térmica Inteligente com Display LED",
    category: "Tecnologia & Saúde",
    platform: "tiktok_shop",
    currentSales: 1250,
    projectedGrowth: 180,
    successProbability: 92,
    reasoning:
      "Produto combina tecnologia e bem-estar, duas tendências em alta. Baixa concorrência no nicho específico.",
    trends: ["Saúde e bem-estar", "Gadgets inteligentes", "Sustentabilidade"],
    competitionLevel: "low",
    priceRange: "R$ 89 - R$ 149",
    targetAudience: "Jovens adultos 25-40 anos, fitness enthusiasts",
  },
  {
    id: "2",
    name: "Kit Organizador de Gavetas Modular",
    category: "Casa & Organização",
    platform: "instagram",
    currentSales: 980,
    projectedGrowth: 165,
    successProbability: 88,
    reasoning:
      'Tendência de organização residencial crescendo 45% ao mês. Produto viral em vídeos de "organize comigo".',
    trends: ["Organização", "Minimalismo", "Home office"],
    competitionLevel: "medium",
    priceRange: "R$ 49 - R$ 89",
    targetAudience:
      "Mulheres 25-45 anos, donas de casa, profissionais home office",
  },
  {
    id: "3",
    name: "Luminária de Mesa com Carregador Wireless",
    category: "Eletrônicos",
    platform: "tiktok_shop",
    currentSales: 1450,
    projectedGrowth: 155,
    successProbability: 85,
    reasoning:
      "Produto 2-em-1 com alta demanda. Crescimento de 38% em buscas relacionadas nos últimos 30 dias.",
    trends: ["Tecnologia", "Praticidade", "Design moderno"],
    competitionLevel: "medium",
    priceRange: "R$ 129 - R$ 199",
    targetAudience: "Profissionais 25-40 anos, estudantes universitários",
  },
  {
    id: "4",
    name: "Tapete de Yoga Ecológico Premium",
    category: "Fitness & Bem-estar",
    platform: "instagram",
    currentSales: 820,
    projectedGrowth: 145,
    successProbability: 82,
    reasoning:
      "Mercado de yoga crescendo 52% ao ano. Produtos sustentáveis têm 3x mais engajamento.",
    trends: ["Fitness", "Sustentabilidade", "Mindfulness"],
    competitionLevel: "high",
    priceRange: "R$ 149 - R$ 249",
    targetAudience: "Mulheres 25-45 anos, praticantes de yoga e pilates",
  },
  {
    id: "5",
    name: "Suporte para Notebook Ajustável Ergonômico",
    category: "Escritório & Tecnologia",
    platform: "tiktok_shop",
    currentSales: 1120,
    projectedGrowth: 140,
    successProbability: 80,
    reasoning:
      "Home office permanente aumentou demanda por ergonomia. Produto com ROI de marketing de 4.2x.",
    trends: ["Ergonomia", "Home office", "Produtividade"],
    competitionLevel: "high",
    priceRange: "R$ 79 - R$ 139",
    targetAudience: "Profissionais 25-50 anos, freelancers, estudantes",
  },
  {
    id: "6",
    name: "Ventilador Portátil Recarregável USB-C",
    category: "Eletrônicos Portáteis",
    platform: "instagram",
    currentSales: 1580,
    projectedGrowth: 135,
    successProbability: 78,
    reasoning:
      "Sazonalidade positiva (verão se aproximando). Produto compacto ideal para viagens e eventos.",
    trends: ["Portabilidade", "Verão", "Praticidade"],
    competitionLevel: "medium",
    priceRange: "R$ 39 - R$ 79",
    targetAudience: "Público geral 18-50 anos, viajantes",
  },
  {
    id: "7",
    name: "Massageador Facial Elétrico com LED",
    category: "Beleza & Cuidados Pessoais",
    platform: "instagram",
    currentSales: 690,
    projectedGrowth: 175,
    successProbability: 86,
    reasoning:
      "Nicho de skincare tech crescendo exponencialmente. Influencers de beleza impulsionando vendas.",
    trends: ["Skincare", "Tecnologia de beleza", "Autocuidado"],
    competitionLevel: "low",
    priceRange: "R$ 119 - R$ 189",
    targetAudience: "Mulheres 20-40 anos, entusiastas de skincare",
  },
  {
    id: "8",
    name: "Mochila Antifurto com Porta USB",
    category: "Acessórios & Viagem",
    platform: "tiktok_shop",
    currentSales: 1340,
    projectedGrowth: 125,
    successProbability: 75,
    reasoning:
      "Segurança e tecnologia combinadas. Retorno de viagens pós-pandemia aumentando demanda.",
    trends: ["Segurança", "Viagens", "Tecnologia"],
    competitionLevel: "high",
    priceRange: "R$ 149 - R$ 249",
    targetAudience: "Viajantes 20-45 anos, estudantes, profissionais",
  },
  {
    id: "9",
    name: "Difusor de Aromas Ultrassônico Smart",
    category: "Casa & Bem-estar",
    platform: "instagram",
    currentSales: 950,
    projectedGrowth: 150,
    successProbability: 83,
    reasoning:
      "Aromaterapia em alta. Produtos smart home crescendo 60% ao ano no Brasil.",
    trends: ["Aromaterapia", "Smart home", "Bem-estar"],
    competitionLevel: "medium",
    priceRange: "R$ 99 - R$ 169",
    targetAudience: "Mulheres 25-50 anos, interessados em bem-estar",
  },
  {
    id: "10",
    name: "Fone de Ouvido com Cancelamento de Ruído",
    category: "Áudio & Tecnologia",
    platform: "tiktok_shop",
    currentSales: 2100,
    projectedGrowth: 115,
    successProbability: 72,
    reasoning:
      "Mercado saturado mas demanda constante. Diferencial em preço competitivo pode gerar volume alto.",
    trends: ["Áudio", "Produtividade", "Entretenimento"],
    competitionLevel: "high",
    priceRange: "R$ 199 - R$ 349",
    targetAudience: "Público geral 18-45 anos, profissionais, estudantes",
  },
];

// Função para obter insights ordenados por probabilidade de sucesso
export function getTopInsights(limit: number = 10): ProductInsight[] {
  return [...productInsights]
    .sort((a, b) => b.successProbability - a.successProbability)
    .slice(0, limit);
}

// Função para filtrar insights por plataforma
export function filterInsightsByPlatform(
  insights: ProductInsight[],
  platform: "tiktok_shop" | "instagram",
): ProductInsight[] {
  return insights.filter((insight) => insight.platform === platform);
}

// Função para filtrar insights por nível de competição
export function filterInsightsByCompetition(
  insights: ProductInsight[],
  level: "low" | "medium" | "high",
): ProductInsight[] {
  return insights.filter((insight) => insight.competitionLevel === level);
}
