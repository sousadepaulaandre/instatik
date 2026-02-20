# Guia Completo: Deploy Permanente do Social Commerce Monitor

## 📋 Resumo

Seu projeto **Social Commerce Monitor** está pronto para ser deployado como um site permanente. Este guia fornece instruções passo a passo.

## 🚀 Opção Recomendada: Vercel (Gratuito)

### Por que Vercel?
- ✅ Gratuito para projetos pequenos/médios
- ✅ Deploy automático via GitHub
- ✅ SSL/HTTPS incluído
- ✅ CDN global
- ✅ Suporte a Vite nativo
- ✅ Domínio `.vercel.app` automático

### Passos para Deploy:

#### 1. Criar conta no Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Sign Up"
3. Escolha "Continue with GitHub" (recomendado)
4. Autorize o Vercel a acessar sua conta GitHub

#### 2. Criar repositório no GitHub
1. Acesse [github.com/new](https://github.com/new)
2. Nome: `social-commerce-monitor`
3. Descrição: "Social Commerce Monitor - Dashboard de análise de vendas"
4. Selecione "Public" ou "Private"
5. Clique em "Create repository"

#### 3. Fazer push do código
```bash
cd /home/ubuntu/social_commerce_monitor
git remote add origin https://github.com/SEU_USUARIO/social-commerce-monitor.git
git branch -M main
git push -u origin main
```

#### 4. Conectar ao Vercel
1. No Vercel Dashboard, clique em "Add New..." → "Project"
2. Selecione "Import Git Repository"
3. Selecione seu repositório `social-commerce-monitor`
4. Clique em "Import"

#### 5. Configurar Build
- **Framework**: Vite
- **Build Command**: `pnpm build`
- **Output Directory**: `dist/public`
- **Install Command**: `pnpm install`
- Clique em "Deploy"

#### 6. Aguardar Deploy
- O Vercel fará o build automaticamente
- Você receberá uma URL como: `https://social-commerce-monitor.vercel.app`
- O site estará disponível em minutos!

## 🌐 Configurar Domínio Personalizado (Opcional)

### Usar domínio próprio
1. No Vercel Dashboard, vá para "Settings" → "Domains"
2. Clique em "Add Domain"
3. Digite seu domínio (ex: `social-commerce.com`)
4. Siga as instruções para configurar DNS

### Usar subdomínio
1. Mesmo processo, mas use: `monitor.seudominio.com`
2. Configure o CNAME no seu provedor DNS

## 🔐 Variáveis de Ambiente

Se precisar usar APIs externas:

1. No Vercel Dashboard, vá para "Settings" → "Environment Variables"
2. Adicione as variáveis:

```
VITE_OAUTH_PORTAL_URL=https://oauth.example.com
VITE_APP_ID=seu-app-id
VITE_OWNER_OPEN_ID=seu-owner-id
OPENAI_API_KEY=sua-chave-openai
```

3. Clique em "Save"
4. O site será redeployado automaticamente

## 📊 Monitorar Deploy

### Ver logs
1. No Vercel Dashboard, clique em seu projeto
2. Vá para "Deployments"
3. Clique no deploy mais recente
4. Veja os logs em "Build Logs"

### Ver analytics
1. Vá para "Analytics"
2. Veja estatísticas de uso, performance, etc.

## 🔄 Deploy Automático

Após conectar ao GitHub, cada push para `main` fará deploy automático:

```bash
git add .
git commit -m "Update: Melhorias no dashboard"
git push origin main
```

O Vercel detectará a mudança e fará deploy automaticamente!

## 🛠️ Alternativas de Deploy

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### GitHub Pages
```bash
npm run build
# Fazer push da pasta dist/public
```

### AWS Amplify
1. Conectar repositório GitHub
2. Configurar build settings
3. Deploy automático

### Seu próprio servidor
```bash
# Build
pnpm build

# Upload dist/public para seu servidor
scp -r dist/public user@server:/var/www/social-commerce

# Configurar nginx/apache para servir a pasta
```

## 📱 Verificar Site

Após deploy:
1. Acesse a URL fornecida
2. Verifique se carrega corretamente
3. Teste responsividade (mobile, tablet, desktop)
4. Teste funcionalidades principais

## 🐛 Troubleshooting

### Build falha
- Verifique `package.json`
- Verifique `vite.config.ts`
- Limpe cache: `pnpm install --force`

### Site não carrega
- Verifique se `dist/public/index.html` existe
- Verifique console do navegador (F12)
- Verifique logs do Vercel

### Importações faltando
- Verifique aliases em `vite.config.ts`
- Verifique caminhos de importação
- Verifique se arquivos existem

## 📈 Próximos Passos

1. ✅ Deploy no Vercel
2. ⬜ Configurar domínio personalizado
3. ⬜ Adicionar analytics
4. ⬜ Implementar backend
5. ⬜ Conectar banco de dados
6. ⬜ Configurar CI/CD avançado

## 📞 Suporte

- [Documentação Vercel](https://vercel.com/docs)
- [Documentação Vite](https://vitejs.dev)
- [Documentação React](https://react.dev)
- [README.md](./README.md)

## ✅ Checklist Final

- [ ] Repositório criado no GitHub
- [ ] Código feito push para GitHub
- [ ] Conta Vercel criada
- [ ] Projeto importado no Vercel
- [ ] Build configurado corretamente
- [ ] Deploy realizado com sucesso
- [ ] Site acessível via URL
- [ ] Domínio personalizado configurado (opcional)
- [ ] Variáveis de ambiente configuradas (se necessário)
- [ ] Testes realizados no site ao vivo

---

**Parabéns! Seu site está permanente! 🎉**

Agora você tem um site profissional, escalável e sempre disponível na internet.
