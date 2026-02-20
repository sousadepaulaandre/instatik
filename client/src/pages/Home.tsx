import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  TrendingUp,
  Users,
  Package,
  Zap,
  BarChart3,
  Bell,
  ExternalLink,
} from "lucide-react";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Inspirado no Kalodata */}
      <header className="border-b border-border bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663099864448/cTilbyDKtcpYybHF.png"
              alt="Instatik"
              className="h-16"
            />
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() =>
                isAuthenticated
                  ? setLocation("/dashboard")
                  : (window.location.href = getLoginUrl())
              }
            >
              {isAuthenticated ? "Dashboard" : "Log in"}
            </Button>
            <Button
              onClick={() =>
                isAuthenticated
                  ? setLocation("/dashboard")
                  : (window.location.href = getLoginUrl())
              }
              className="bg-primary hover:bg-primary/90"
            >
              {isAuthenticated ? "Ir para Dashboard" : "Sign up"}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section - Estilo Kalodata */}
      <section className="bg-gradient-to-br from-secondary via-white to-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              A <span className="text-primary">Melhor Ferramenta</span> para
              <br />
              Monitorar TikTok e Instagram
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Análise de produtos em tendência, colaboração com influenciadores,
              inspiração de vídeos, design de livestreams, otimização de
              anúncios, insights de competidores
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Nós ajudamos você a aproveitar cada oportunidade no TikTok e
              Instagram!
            </p>
            <Button
              size="lg"
              className="text-lg px-10 py-7 bg-primary hover:bg-primary/90 shadow-lg"
              onClick={() =>
                isAuthenticated
                  ? setLocation("/dashboard")
                  : (window.location.href = getLoginUrl())
              }
            >
              {isAuthenticated
                ? "Ir para Dashboard"
                : "Começar Teste Gratuito de 7 Dias"}
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Não é necessário cartão de crédito
            </p>
          </div>

          {/* Estatísticas - Estilo Kalodata */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">120+</div>
              <div className="text-base text-muted-foreground">
                Dados de Produtos
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">100+</div>
              <div className="text-base text-muted-foreground">
                Dados de Vendedores
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">
                R$ 150M+
              </div>
              <div className="text-base text-muted-foreground">
                Receita Monitorada
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

          {/* Logos de Marcas (Placeholder) */}
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-40 grayscale">
            <div className="text-2xl font-bold">TikTok</div>
            <div className="text-2xl font-bold">Instagram</div>
            <div className="text-2xl font-bold">Shopify</div>
            <div className="text-2xl font-bold">WooCommerce</div>
          </div>
        </div>
      </section>

      {/* Features Section - Cards Limpos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h3 className="text-4xl font-bold text-center text-foreground mb-16">
          Por que escolher o Instatik?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border border-border shadow-sm hover:shadow-md transition-all">
            <CardHeader>
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Package className="w-7 h-7 text-primary" />
              </div>
              <CardTitle className="text-xl">
                Análise de Produtos em Tendência
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                Identifique produtos mais vendidos, analise tendências de preço
                e volume, e descubra oportunidades de nicho antes da
                concorrência.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border border-border shadow-sm hover:shadow-md transition-all">
            <CardHeader>
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-7 h-7 text-accent" />
              </div>
              <CardTitle className="text-xl">
                Colaboração com Influenciadores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                Encontre os melhores creators para parcerias, analise
                performance histórica e conecte-se diretamente através de
                múltiplas plataformas.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border border-border shadow-sm hover:shadow-md transition-all">
            <CardHeader>
              <div className="w-14 h-14 bg-chart-3/10 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-7 h-7 text-chart-3" />
              </div>
              <CardTitle className="text-xl">Otimização de Anúncios</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                Analise ROI de campanhas, identifique ads de alta performance e
                otimize seus gastos com dados precisos de conversão.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border border-border shadow-sm hover:shadow-md transition-all">
            <CardHeader>
              <div className="w-14 h-14 bg-chart-4/10 rounded-xl flex items-center justify-center mb-4">
                <BarChart3 className="w-7 h-7 text-chart-4" />
              </div>
              <CardTitle className="text-xl">
                Insights de Competidores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                Monitore estratégias de vendas da concorrência, analise mix de
                produtos e identifique gaps de mercado para explorar.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border border-border shadow-sm hover:shadow-md transition-all">
            <CardHeader>
              <div className="w-14 h-14 bg-chart-5/10 rounded-xl flex items-center justify-center mb-4">
                <Bell className="w-7 h-7 text-chart-5" />
              </div>
              <CardTitle className="text-xl">
                Notificações Inteligentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                Receba alertas automáticos quando produtos entram no top 10,
                preços mudam ou vendedores atingem marcos importantes.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border border-border shadow-sm hover:shadow-md transition-all">
            <CardHeader>
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-7 h-7 text-primary" />
              </div>
              <CardTitle className="text-xl">Análise com IA</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                Receba insights automáticos sobre padrões de vendas,
                sazonalidade e recomendações de nichos promissores gerados por
                IA.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section - Estilo Kalodata */}
      <section className="bg-gradient-to-r from-primary to-accent py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h3 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto para Começar?
          </h3>
          <p className="text-xl mb-10 opacity-95">
            Junte-se a centenas de vendedores que já estão usando dados para
            tomar decisões melhores e aumentar suas vendas no e-commerce social.
          </p>
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-gray-100 text-lg px-12 py-7 shadow-xl"
            onClick={() =>
              isAuthenticated
                ? setLocation("/dashboard")
                : (window.location.href = getLoginUrl())
            }
          >
            {isAuthenticated ? "Acessar Dashboard" : "Começar Teste Gratuito"}
            <ExternalLink className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-foreground mb-4">Explorar</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Categorias
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Lojas
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Creators
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Produto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Recursos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Preços
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Sobre
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contato
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Termos de Uso
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Sitemap
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>
              &copy; 2026 Social Commerce Monitor. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
