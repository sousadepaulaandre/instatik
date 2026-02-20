# Deploy no Vercel - Social Commerce Monitor

Este guia explica como fazer deploy do Social Commerce Monitor no Vercel.

## Opção 1: Deploy via GitHub (Recomendado)

### Passo 1: Criar repositório no GitHub
1. Acesse [github.com/new](https://github.com/new)
2. Crie um repositório chamado `social-commerce-monitor`
3. Não inicialize com README (vamos fazer push do código existente)

### Passo 2: Fazer push do código
```bash
cd social_commerce_monitor
git remote add origin https://github.com/SEU_USUARIO/social-commerce-monitor.git
git branch -M main
git push -u origin main
```

### Passo 3: Conectar ao Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Selecione "Import Git Repository"
4. Selecione seu repositório `social-commerce-monitor`
5. Clique em "Import"

### Passo 4: Configurar Build
- **Framework**: Vite
- **Build Command**: `pnpm build`
- **Output Directory**: `dist/public`
- Clique em "Deploy"

## Opção 2: Deploy via CLI

### Passo 1: Instalar Vercel CLI
```bash
npm install -g vercel
```

### Passo 2: Fazer Deploy
```bash
cd social_commerce_monitor
vercel
```

### Passo 3: Responder às perguntas
- "Set up and deploy?": `y`
- "Which scope?": Selecione sua conta
- "Link to existing project?": `n`
- "What's your project's name?": `social-commerce-monitor`
- "In which directory is your code?": `.`
- "Want to modify these settings?": `n`

## Opção 3: Deploy via Upload ZIP

1. Compacte a pasta: `zip -r social_commerce_monitor.zip social_commerce_monitor/`
2. Acesse [vercel.com/new](https://vercel.com/new)
3. Clique em "Upload"
4. Selecione o arquivo ZIP
5. Aguarde o deploy

## Variáveis de Ambiente (Opcional)

Se quiser usar APIs externas, configure as variáveis no Vercel:

1. Acesse seu projeto no Vercel
2. Vá para "Settings" → "Environment Variables"
3. Adicione as variáveis:
   - `VITE_OAUTH_PORTAL_URL`
   - `VITE_APP_ID`
   - `VITE_OWNER_OPEN_ID`
   - `OPENAI_API_KEY`
   - etc.

## Verificar Deploy

Após o deploy, você receberá uma URL como:
```
https://social-commerce-monitor.vercel.app
```

## Troubleshooting

### Build falha com erro de módulos
- Verifique se `pnpm` está instalado
- Verifique se `package.json` está correto
- Limpe cache: `vercel env pull` e `vercel build --prod`

### Site não carrega
- Verifique se `dist/public` contém `index.html`
- Verifique se `vite.config.ts` está correto
- Verifique os logs no Vercel Dashboard

### Problemas com importações
- Verifique se todos os caminhos estão corretos
- Verifique se aliases `@/` e `@shared/` estão configurados

## Próximos Passos

1. **Domínio Personalizado**: Configure um domínio no Vercel
2. **CI/CD**: Configure GitHub Actions para deploy automático
3. **Monitoramento**: Configure alertas e monitoramento
4. **Backend**: Implemente o backend quando estiver pronto

## Suporte

Para mais informações, consulte:
- [Documentação Vercel](https://vercel.com/docs)
- [Documentação Vite](https://vitejs.dev)
- [README.md](./README.md)
