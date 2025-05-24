<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">Uma aplicação backend escalável usando <a href="https://nestjs.com" target="_blank">NestJS</a>, com banco de dados <strong>MongoDB</strong> e integração com <strong>Twilio WhatsApp API</strong>.</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
  <a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
  <a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
</p>

---

## 🧾 Descrição

Este projeto tem como objetivo a construção de uma API RESTful utilizando o framework **NestJS**, com persistência de dados em **MongoDB** e comunicação com clientes através da **API do WhatsApp via Twilio**, além de usar a **API da OpenAI** para analisar os currículos e mensagens. A aplicação foi pensada para facilitar integrações automatizadas com mensageria em tempo real.

---

## ⚙️ Stack Utilizada

- **NestJS** — Framework progressivo para Node.js com suporte a TypeScript e arquitetura modular.
- **MongoDB** — Banco de dados NoSQL orientado a documentos.
- **Twilio WhatsApp API** — Plataforma para envio e recebimento de mensagens via WhatsApp.
- **API da OpenAI** - Serviço de inteligência artificial.

---

## ✅ Pré-requisitos

- Node.js v18+
- npm ou yarn
- Conta e número verificado na [Twilio](https://www.twilio.com/)
- MongoDB local ou hospedado (ex.: Atlas)
- Docker (opcional, para rodar o MongoDB localmente)

---

## 📦 Instalação

```bash
# Clonar o repositório
git clone https://github.com/fstech-digital/alvaro_rh.git

# Entrar na pasta do projeto
cd alvaro_rh

# Instalar as dependências
npm install
```

## ▶️ Execução do projeto

```bash
# Modo de desenvolvimento
npm run start:dev

# Modo de produção
npm run start:prod
```

## 🧪 Testes
```bash
# Testes unitários
npm run test

# Testes end-to-end
npm run test:e2e

# Cobertura de testes
npm run test:cov

```

## 🧭 Diagrama de Fluxo
![Conexões](/docs/Diagramas/Fluxograma%201.png)
![Mensagens](/docs/Diagramas/Fluxograma%202.png)