<p align="center">
  <a href="https://nextjs.org" target="blank"><img src="https://vercel.com/vc-ap-vercel-marketing/_next/static/media/nextjs-logo-dark.c32f567e.svg" width="100" alt="Next.js Logo" /></a>
</p>

<p align="center">Frontend da aplicação de recrutamento, construído com <strong>Next.js</strong>, autenticação via <strong>NextAuth</strong> e integração com API <strong>NestJS</strong>.</p>

<p align="center">
  <a href="https://nextjs.org" target="_blank"><img src="https://img.shields.io/badge/Next.js-13+-black.svg" alt="Next.js Version" /></a>
  <a href="https://www.mongodb.com/" target="_blank"><img src="https://img.shields.io/badge/Database-MongoDB-green" alt="MongoDB" /></a>
</p>

---

## 🧾 Descrição

Este repositório contém a aplicação **Frontend** do sistema de recrutamento, desenvolvido com **Next.js** e **TailwindCSS**. Utiliza **NextAuth** para autenticação e integra com a API do backend (**NestJS**) para funcionalidades como upload de currículo, consulta de vagas e análise de perfil.

---

## ⚙️ Tecnologias Utilizadas

- **Next.js** — Framework React com SSR e SSG.
- **NextAuth.js** — Autenticação com provedor customizado e MongoDB.
- **Tailwind CSS** — Framework de utilitários para estilização.
- **ShadCN/UI** — Conjunto de componentes UI acessíveis e prontos para uso com Tailwind.
- **Axios** — Requisições HTTP à API NestJS.
- **MongoDB** — Persistência de dados de sessão/autenticação.
- **React Hook Form** + **Zod** — Validação e controle de formulários.

---

## ✅ Pré-requisitos

- Node.js v18+
- npm ou yarn
- MongoDB local ou hospedado (ex: Atlas)
- Backend NestJS rodando localmente (para chamadas API)

---

## 📦 Instalação

```bash
# Clonar o repositório
git clone https://github.com/fstech-digital/alvaro_rh.git

# Entrar na pasta do frontend
cd alvaro_rh/recrutamento-frontend

# Instalar as dependências
npm install
```

---

## ▶️ Execução do Projeto

```bash
# Executar em modo desenvolvimento
npm run dev

# Acessar em: http://localhost:3000
```

---

## 🔐 Autenticação

A autenticação é feita via **NextAuth.js**, com sessões armazenadas em **MongoDB**. Ao realizar login, os dados são salvos e o token é gerenciado via cookies.

---

## 🌐 Integração com Backend

As funcionalidades como **upload de currículos**, **consulta de vagas** e **dados do candidato** são consumidas via chamadas à API NestJS.

---

## 🧭 Diagrama de Fluxo

![Fluxo da Aplicação Frontend](/docs/Diagramas/Diagrama%20de%20Fluxo%20Frontend.png)

---

## 📌 Observações

- Certifique-se de que o backend esteja rodando antes de iniciar o frontend.
- Atualize as variáveis de ambiente `.env.local` com as URLs e chaves necessárias (ex: `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `MONGODB_URI`).
