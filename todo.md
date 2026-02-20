# Social Commerce Monitor - TODO

## Fase 1: Estrutura de Dados e Schema

- [x] Criar tabelas de produtos (products)
- [x] Criar tabelas de vendedores (sellers)
- [x] Criar tabelas de métricas (metrics)
- [x] Criar tabelas de histórico de coleta (collection_history)
- [x] Criar tabelas de notificações (notifications)
- [x] Criar tabelas de análises com LLM (ai_insights)

## Fase 2: Backend - Integração de APIs

- [x] Configurar integração com Apify API
- [ ] Implementar coleta de dados de TikTok Shop
- [ ] Implementar coleta de dados de Instagram
- [ ] Criar sistema de sincronização de dados
- [x] Implementar cálculo de métricas (receita, lucro bruto)
- [x] Criar procedimentos tRPC para dados de produtos
- [x] Criar procedimentos tRPC para dados de vendedores

## Fase 3: Sistema de Notificações e LLM

- [x] Configurar sistema de notificações por email
- [x] Implementar alertas de produtos no top 10
- [x] Implementar alertas de marcos de performance de vendedores
- [x] Integrar LLM para análise de padrões de vendas
- [x] Criar gerador de insights automáticos
- [ ] Implementar agendamento de análises periódicas

## Fase 4: Frontend - Dashboard

- [x] Criar layout do dashboard com sidebar
- [x] Implementar visualizações de produtos mais vendidos
- [ ] Implementar gráficos de tendências por rede social
- [x] Criar tabelas interativas de rankings
- [x] Implementar sistema de filtros
- [ ] Implementar busca de produtos

## Fase 5: Perfis de Vendedores

- [x] Criar página de perfil de vendedor
- [ ] Implementar histórico de performance
- [ ] Criar visualizações de produtos do vendedor
- [ ] Implementar timeline de eventos importantes

## Fase 6: Testes e Otimizações

- [x] Escrever testes unitários do backend
- [ ] Escrever testes de integração
- [ ] Otimizar queries do banco de dados
- [ ] Testar fluxos de notificação
- [ ] Testar integração com APIs
- [x] Preparar para publicação

## Fase 7: Entrega Final

- [x] Criar checkpoint final
- [x] Documentar uso da plataforma
- [x] Apresentar resultados ao usuário

## Melhorias de UX Identificadas

- [ ] Adicionar dados de exemplo ao dashboard para demonstração
- [ ] Implementar gráficos de tendências com Recharts
- [ ] Melhorar layout responsivo para mobile
- [ ] Adicionar animações de carregamento mais intuitivas
- [ ] Criar página de configurações de usuário
- [ ] Implementar busca e filtros avançados

## Gráficos de Tendências (Concluído)

- [x] Criar dados históricos de vendas para gráficos
- [x] Implementar gráfico de linha de tendências de vendas
- [x] Implementar gráfico de comparação entre plataformas
- [x] Implementar gráfico de distribuição de produtos por categoria
- [x] Testar responsividade dos gráficos
- [x] Implementar gráfico de receita por vendedor
- [x] Implementar gráfico de padrão de sazonalidade
- [x] Implementar gráfico de performance de produtos

## Filtros de Data (Concluído)

- [x] Criar dados históricos expandidos (90 dias)
- [x] Implementar componente de filtro de data
- [x] Integrar filtro aos gráficos
- [x] Testar filtros com diferentes períodos

## Expansão de Dados (Em Progresso)

- [ ] Criar gerador de 100+ produtos realistas
- [ ] Criar gerador de 100+ vendedores realistas
- [ ] Expandir dados históricos para suportar volume maior
- [ ] Implementar job agendado de sincronização (8 horas)
- [ ] Testar performance com 100+ produtos
- [ ] Testar atualização automática de dados

## Melhorias de UX (Concluído)

- [x] Adicionar links externos para produtos
- [x] Adicionar links externos para vendedores
- [x] Criar filtro por localização (Brasil vs Internacional)
- [x] Melhorar gráfico de tendências com explicações
- [x] Separar gráfico de tendências por produto/vendedor
- [x] Corrigir unidades nos gráficos (vendas em quantidade, receita em R$)
- [x] Adicionar tooltips na distribuição de categorias
- [x] Ordenar performance de produtos em ordem decrescente
- [x] Adicionar links externos na performance de produtos

## Redesign Inspirado no Kalodata (Concluído)

- [x] Analisar design visual do Kalodata
- [x] Analisar estrutura de navegação do Kalodata
- [x] Analisar visualizações de dados do Kalodata
- [x] Identificar elementos de UX a serem replicados
- [x] Redesenhar landing page
- [x] Redesenhar dashboard principal
- [x] Melhorar paleta de cores
- [x] Melhorar tipografia
- [x] Adicionar mini-gráficos inline
- [x] Testar novo design

## Rebranding Instatik e Correções (Concluído)

- [x] Copiar logo Instatik para o projeto
- [x] Atualizar paleta de cores (roxo/magenta/azul escuro da logo)
- [x] Mudar nome do site para "Instatik" em todos os lugares
- [x] Adicionar botão "Aplicar Filtros" na seção de análises visuais
- [x] Corrigir bug do gráfico de tendências quando "Ambas" está selecionado
- [x] Recriar aba "Insights" com sugestões de produtos promissores
- [x] Adicionar probabilidade de sucesso para cada produto sugerido
- [x] Testar todas as funcionalidades

## Correção da Logo (Concluído)

- [x] Verificar caminho da logo no DashboardKaloStyle.tsx
- [x] Verificar caminho da logo no Home.tsx
- [x] Atualizar caminhos para usar URL da CDN
- [x] Testar logo em todas as páginas

## Atualização da Logo (Concluído)

- [x] Fazer upload da nova logo (Logofundobranco.png) para CDN
- [x] Atualizar caminhos da logo em Home.tsx
- [x] Atualizar caminhos da logo em DashboardKaloStyle.tsx
- [x] Remover ícone de seta para cima ao lado do ícone
- [x] Testar nova logo em todas as páginas

## Comparação de Produtos (Concluído)

- [x] Adicionar checkbox de seleção nos cards de produtos
- [x] Criar botão "Comparar Produtos" que aparece quando produtos são selecionados
- [x] Criar página de comparação (/compare)
- [x] Implementar tabela comparativa de métricas
- [x] Adicionar gráficos de comparação (vendas, receita, crescimento)
- [x] Implementar visualização de tendências lado a lado
- [ ] Adicionar opção de exportar comparação
- [x] Testar funcionalidade com múltiplos produtos

## Correções de Formatação e UX (Concluído)

- [x] Substituir "🇧🇷 BR" por "🇧🇷 Brasil" em todos os lugares
- [x] Corrigir formatação de valores em R$ que estão quebrando linha (receita total, receita de produtos/vendedores)
- [x] Recolocar botão "Aplicar Filtros" na seção de análises visuais
- [x] Corrigir gráfico de tendências de vendas quando "Ambas" está selecionado
- [x] Aumentar tamanho da logo Instatik na página principal (Home)
- [x] Testar todas as correções
- [x] Corrigir problema do gráfico de tendências com "Ambas" (CORRIGIDO - fragmento React substituído por renderização condicional)

## Busca Avançada de Produtos (Concluído)

- [x] Criar componente de campo de busca por nome
- [x] Criar filtro de seleção de categoria
- [x] Criar filtro de faixa de preço (slider ou inputs)
- [x] Implementar lógica de filtragem combinada
- [x] Adicionar botão "Limpar Filtros"
- [x] Integrar busca ao dashboard
- [x] Testar busca com diferentes combinações de filtros
