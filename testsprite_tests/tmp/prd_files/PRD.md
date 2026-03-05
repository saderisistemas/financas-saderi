# Product Requirements Document (PRD)

## 1. Visão Geral (Overview)

O **APP Finanças 2026** é um aplicativo financeiro pessoal focado em organização, acompanhamento de metas, definição de regras e auxílio de IA (AI Coach). A aplicação é voltada para auxiliar usuários a planejarem seus gastos, estipularem tetos orçamentários, criarem regras de proteção financeira e contarem com assistência de IA para tomada de decisões inteligentes através de uma interface moderna e mobile-first.

## 2. Objetivos do Produto (Product Goals)

- Centralizar a visualização das finanças pessoais do usuário através de um Dashboard interativo.
- Fornecer um assistente de inteligência artificial (AI Coach) para sugestão de economia, auxílio e acompanhamento de rotina financeira.
- Permitir a categorização, estipulação de metas detalhadas (com suporte a assistentes - _Goal Wizard_) e acompanhamento de transações e despesas.
- Automatizar ações ou apresentar restrições programáticas através de regras definidas pelo usuário ("Proteção").

## 3. Público-Alvo (Target Audience)

- Pessoas buscando melhor gestão financeira pessoal.
- Usuários que necessitam de organização visual moderna e dicas ativas de inteligência artificial para entender melhor para onde vai o seu dinheiro e o que precisam fazer para alcançar seus objetivos financeiros.
- Usuários de smartphone buscando uma experiência mobile limpa, por meio do web-app adaptável (com *BottomNav*).

## 4. Escopo e Funcionalidades Core (Scope and Core Features)

O escopo base e as funcionalidades chave, baseados na implementação atual, incluem:

### 1. Autenticação e Perfis:
- **Auth (Login/Cadastro)**: Integração com o Supabase para gerenciamento seguro e rápido do fluxo de entrada ao sistema.
- **Perfil de Avatar**: Upload e gerência de foto de perfil (`AvatarUpload`), permitindo uma experiência personalizada.

### 2. Dashboard - Resumo Geral:
- Visão unificada que resume saldos, metas em andamento e alertas (caso o orçamento seja estourado).

### 3. Gestão de Transações (Gastos):
- Módulo para o registro e listagem das despesas/entradas financeiras recentes do usuário.

### 4. Orçamento (Budget):
- Definição de estimativas e controle focado por área do fluxo de caixa do usuário.

### 5. Metas Financeiras (Goals):
- Funcionalidade que permite ao usuário criar, editar e monitorar metas (curto, médio, longo prazo).
- **Goal Wizard**: Elemento de UI para guiar o usuário na criação ou gerenciamento fácil da meta.

### 6. Proteções Financeiras (Rules):
- Sistema de restrições ou alertas para garantir que o usuário não saia do planejamento estipulado (ex.: limites por categoria, alertas antes da data de fechamento do cartão de crédito).

### 7. AI Coach:
- **Inteligência Artificial (Google Generative AI)**: Integrado na aplicação para apoiar o usuário como um conselheiro ou guia que mapeia comportamentos do painel e interage enviando sugestões, dicas de planejamento financeiro e reações.

## 5. Arquitetura e Stack Tecnológica (Architecture and Tech Stack)

O projeto usa ferramentas modernas focadas em performance e experiência do desenvolvedor (DX):

- **Linguagem**: TypeScript (Strict typing).
- **Interface / Framework**: React 19 executado em ambiente Vite, utilizando Router.
- **Ecossistema UI / Estilização**:
  - Tailwind CSS v4 para estilização com classes utilitárias.
  - Animações refinadas via Framer Motion.
  - Componentes gráficos baseados na Radix UI e lucide-react (ícones SVG).
- **Gerência de Formulários**: Form validation e manuseio tipado usando `react-hook-form` e zod (para esquema).
- **Backend / BaaS**:
  - Banco de Dados PostgreSQL & Autenticação viabilizados através do [Supabase](https://supabase.com).
- **Inteligência Artificial**: API do Google (`@google/generative-ai`) para processamento das queries de LLM no Coach.
- **Infra / Ferramentas**:
  - ESM Configuration, ESLint setup configurado de forma rigorosa para checagem estática, npm package manager.

## 6. Requisitos Não Funcionais (Non-Functional Requirements)

- **Mobile First e Responsividade**: Devido à bottom interface navegacional (`BottomNav.tsx`), a UI deve escalar perfeitamente em Web/Tablet/Mobile.
- **Desempenho (Performance)**: App renderizado via SPA por Vite + pacote ES Module build em sub-segundos.
- **Segurança (Security)**: RLS no Supabase a nível de banco de dados e roteamento bloqueado caso o usuário não esteja assinado. O acesso ao Gemini deve vir de chamadas seguras.
- **Usabilidade**: Adoção de tooltips (`InfoTooltip`), validações reativas e animações (Framer Motion) para micro-feedback, assegurando extrema fluidez e baixa curva de aprendizado.

## 7. Próximos Passos (Next Steps)

Para a progressão atual do desenvolvimento:
1. Avaliar as _queries_ ou chamadas Supabase dos Módulos para garantir que aderem às Row Level Securities.
2. Personalizar o `GoalWizard` de forma inteligente, criando ramificações visuais e orientações de LLM diferentes por tipos de metas e horizontes de tempo.
3. Teste em Dispositivos Móveis Reais e revisão do design nas visões de 'Rules' e 'AICoach'.
4. Implantação de ambiente ou Pipeline pelo Netlify.
