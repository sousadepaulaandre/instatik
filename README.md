# Social Commerce Monitor

Uma plataforma de monitoramento de produtos e vendedores em redes sociais de comércio, com análises de vendas, insights de IA e notificações automáticas.

## 🚀 Características

- **Dashboard Interativo**: Visualize produtos mais vendidos, vendedores em destaque e métricas de performance
- **Análise de Dados**: Gráficos de tendências, distribuição por categoria e comparação entre plataformas
- **Insights com IA**: Geração automática de insights sobre padrões de vendas e recomendações
- **Notificações**: Alertas automáticos para produtos no top 10 e marcos de performance
- **Perfis de Vendedores**: Informações detalhadas sobre vendedores e histórico de performance
- **Comparação de Produtos**: Compare múltiplos produtos lado a lado

## 📋 Pré-requisitos

- Node.js 18+ ou superior
- pnpm 10.4.1+ ou superior
- MySQL 8.0+ ou TiDB
- Git

## 🔧 Instalação

### 1. Clonar o Repositório

```bash
git clone <repository-url>
cd social_commerce_monitor
```

### 2. Instalar Dependências

```bash
pnpm install
```

### 3. Configurar Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env.local` e configure as variáveis:

```bash
cp .env.example .env.local
```

Edite `.env.local` com suas configurações:

```env
# Database
DATABASE_URL=mysql://user:password@localhost:3306/social_commerce

# OAuth Configuration
VITE_OAUTH_PORTAL_URL=https://oauth.example.com
VITE_APP_ID=your-app-id
VITE_OWNER_OPEN_ID=owner-open-id

# API Configuration
VITE_API_URL=/api
BUILT_IN_FORGE_API_URL=https://api.example.com
BUILT_IN_FORGE_API_KEY=your-api-key

# LLM Configuration
OPENAI_API_KEY=your-openai-key

# Apify Configuration
APIFY_API_TOKEN=your-apify-token
```

### 4. Configurar Banco de Dados

```bash
# Executar migrations
pnpm db:push
```

## 🏃 Executar o Projeto

### Modo Desenvolvimento

```bash
pnpm dev
```

O projeto estará disponível em `http://localhost:5173` (cliente) e `http://localhost:3000` (servidor).

### Build para Produção

```bash
pnpm build
```

### Iniciar em Produção

```bash
pnpm start
```

## 📁 Estrutura do Projeto

```
project/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── pages/         # Páginas da aplicação
│   │   ├── hooks/         # Custom hooks
│   │   ├── contexts/      # Context API
│   │   ├── lib/           # Utilitários
│   │   ├── data/          # Dados mockados
│   │   ├── App.tsx        # Componente principal
│   │   └── main.tsx       # Entry point
│   └── public/            # Assets estáticos
├── server/                # Backend Express + tRPC
│   ├── routers/          # Routers tRPC
│   ├── services/         # Lógica de negócio
│   ├── index.ts          # Entry point do servidor
│   ├── trpc.ts           # Configuração tRPC
│   ├── db.ts             # Conexão com banco
│   └── env.ts            # Variáveis de ambiente
├── shared/               # Código compartilhado
│   ├── const.ts          # Constantes
│   └── errors.ts         # Tipos de erro
├── drizzle/              # Migrations e schema
│   ├── schema.ts         # Schema do banco
│   ├── relations.ts      # Relações entre tabelas
│   └── migrations/       # Arquivos de migration
├── package.json
├── vite.config.ts
├── tsconfig.json
└── drizzle.config.ts
```

## 🛠️ Scripts Disponíveis

| Script         | Descrição                                 |
| -------------- | ----------------------------------------- |
| `pnpm dev`     | Inicia o servidor em modo desenvolvimento |
| `pnpm build`   | Faz build para produção                   |
| `pnpm start`   | Inicia o servidor em produção             |
| `pnpm check`   | Valida tipos TypeScript                   |
| `pnpm format`  | Formata código com Prettier               |
| `pnpm test`    | Executa testes com Vitest                 |
| `pnpm db:push` | Executa migrations do banco de dados      |

## 🔐 Autenticação

O projeto utiliza OAuth para autenticação. Configure as variáveis de ambiente OAuth para ativar o login.

### Fluxo de Autenticação

1. Usuário clica em "Fazer Login"
2. Redirecionado para portal OAuth
3. Após autenticação, retorna para `/api/oauth/callback`
4. Token JWT é gerado e armazenado em cookie
5. Usuário é autenticado na aplicação

## 📊 Banco de Dados

### Tabelas Principais

- **users**: Usuários da plataforma
- **products**: Produtos monitorados
- **sellers**: Vendedores
- **metrics**: Métricas de vendas
- **collection_history**: Histórico de coleta de dados
- **notifications**: Notificações do sistema
- **ai_insights**: Insights gerados por IA

## 🤖 Integração com IA

O projeto integra-se com OpenAI para gerar insights automáticos sobre:

- Padrões de vendas
- Tendências de sazonalidade
- Recomendações de produtos promissores
- Análise de performance de vendedores

## 📱 Responsividade

O projeto é totalmente responsivo e funciona em:

- Desktop (1920px+)
- Tablet (768px - 1024px)
- Mobile (320px - 767px)

## 🧪 Testes

```bash
# Executar testes
pnpm test

# Executar testes com cobertura
pnpm test:coverage
```

## 📝 Documentação

Para mais informações sobre a estrutura e desenvolvimento, consulte:

- [PROBLEMAS_ENCONTRADOS.md](./PROBLEMAS_ENCONTRADOS.md) - Problemas corrigidos
- [MELHORIAS_SUGERIDAS.md](./MELHORIAS_SUGERIDAS.md) - Melhorias futuras
- [todo.md](./todo.md) - Tarefas em progresso

## 🐛 Reportar Bugs

Se encontrar um bug, por favor abra uma issue descrevendo:

1. O problema
2. Passos para reproduzir
3. Comportamento esperado
4. Comportamento atual
5. Screenshots (se aplicável)

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

## 👥 Autores

- **Seu Nome** - Desenvolvimento inicial

## 🙏 Agradecimentos

- Comunidade React
- Comunidade Node.js
- Contribuidores do projeto

## 📞 Suporte

Para suporte, envie um email para support@example.com ou abra uma issue no GitHub.

## 🗺️ Roadmap

- [ ] Implementar coleta de dados de TikTok Shop
- [ ] Implementar coleta de dados de Instagram
- [ ] Sincronização de dados em tempo real
- [ ] Exportação de relatórios em PDF
- [ ] Integração com mais plataformas
- [ ] Dark mode
- [ ] Notificações via email/SMS
- [ ] API pública para integrações

---

**Última atualização**: Fevereiro 2026
