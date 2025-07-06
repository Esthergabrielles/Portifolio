# Portfólio Esther Gabrielle - QA Tester

Este é o portfólio profissional da Esther Gabrielle, uma QA Tester Júnior especializada em testes de qualidade e processos organizacionais.

## 🚀 Configuração do Supabase

Para que o portfólio funcione corretamente com dados reais, você precisa configurar o Supabase:

### 1. Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Crie uma conta ou faça login
3. Clique em "New Project"
4. Escolha sua organização
5. Dê um nome ao projeto (ex: "portfolio-esther")
6. Defina uma senha para o banco de dados
7. Escolha uma região próxima ao Brasil
8. Clique em "Create new project"

### 2. Executar Migrações

1. No painel do Supabase, vá para "SQL Editor"
2. Execute o arquivo `supabase/migrations/20250706205747_white_shrine.sql`
3. Execute o arquivo `supabase/migrations/populate_initial_data.sql`

### 3. Configurar Variáveis de Ambiente

1. No painel do Supabase, vá para "Settings" > "API"
2. Copie a "Project URL" e "anon public" key
3. Edite o arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=sua_project_url_aqui
VITE_SUPABASE_ANON_KEY=sua_anon_key_aqui
```

### 4. Criar Usuário Admin

1. No painel do Supabase, vá para "Authentication" > "Users"
2. Clique em "Add user"
3. Adicione:
   - Email: seu_email@exemplo.com
   - Password: sua_senha_segura
4. Confirme o email se necessário

### 5. Configurar RLS (Row Level Security)

As políticas de segurança já estão configuradas nas migrações:
- **Leitura pública**: Qualquer pessoa pode ver o portfólio
- **Escrita restrita**: Apenas usuários autenticados podem modificar dados

## 🛠️ Funcionalidades

- ✅ **Portfólio Público**: Visitantes podem ver todos os projetos, certificados, habilidades
- ✅ **Painel Admin**: Área administrativa para gerenciar conteúdo
- ✅ **Dados Persistentes**: Todas as alterações são salvas no banco de dados
- ✅ **Autenticação Real**: Sistema de login via Supabase Auth
- ✅ **Responsivo**: Funciona perfeitamente em desktop e mobile
- ✅ **Interface Postman**: Demonstração interativa de habilidades em API testing

## 🔐 Acesso Administrativo

Após configurar o Supabase e criar um usuário:

1. Acesse `/admin` no seu site
2. Faça login com as credenciais criadas no Supabase
3. Gerencie projetos, certificados, habilidades e mais

## 🚀 Deploy

O projeto está pronto para deploy em qualquer plataforma que suporte React:

- **Netlify**: Conecte seu repositório GitHub
- **Vercel**: Deploy automático via Git
- **GitHub Pages**: Para sites estáticos

Lembre-se de configurar as variáveis de ambiente na plataforma de deploy!

## 📱 Tecnologias Utilizadas

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Animações**: Framer Motion
- **Backend**: Supabase (PostgreSQL)
- **Autenticação**: Supabase Auth
- **Deploy**: Netlify/Vercel ready

## 🎯 Próximos Passos

1. Configure o Supabase seguindo as instruções acima
2. Personalize o conteúdo através do painel admin
3. Adicione seus próprios projetos e certificados
4. Faça o deploy para produção

---

**Desenvolvido com ❤️ por Esther Gabrielle**