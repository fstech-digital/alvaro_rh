# Documento de Riscos do Projeto 

**Tecnologias utilizadas:**
- Backend: NestJS
- Frontend: Next.js
- Banco de Dados: MongoDB
- Integração de mensagens: Twilio (WhatsApp Business)
- Inteligência Artificial: API da OpenAI

## 1. Riscos Técnicos

### 1.1 Integração com Twilio – Detalhamento por Tipo de Conversa

| Tipo de Conversa       | Custo por Conversa (USD) | Descrição                                                                                      | Risco                                               | Impacto | Probabilidade | Mitigação                                                                 |
|------------------------|---------------------------|------------------------------------------------------------------------------------------------|-----------------------------------------------------|---------|---------------|----------------------------------------------------------------------------|
| **Utilidade**          | $0,008                    | Notificações de transações, como lembretes de cobrança.                                       | Custos recorrentes com envio em massa.             | Médio   | Alto          | Monitorar volume mensal e agrupar notificações.                           |
| **Autenticação**       | $0,0315                   | Envio de senhas únicas (OTP).                                                                 | Alto custo para grande volume de logins.            | Alto    | Médio         | Limitar uso a ações críticas e evitar reenvios desnecessários.            |
| **Marketing**          | $0,0625                   | Promoções, convites ou atualizações não transacionais.                                        | Custo alto e risco de classificação indevida.      | Alto    | Alto          | Controlar e revisar conteúdos. Aprovar templates com cuidado.             |
| **Serviço** (até 1000) | $0,00                     | Iniciada pelo usuário, como atendimentos de suporte.                                          | Limitação mensal gratuita pode ser excedida.        | Médio   | Médio         | Estimar volume de atendimento e configurar alertas de uso.                |

> [!NOTE]
> Conversas de serviço são gratuitas até 1.000 por mês. Após isso, aplica-se tarifação escalonada.
> Os valores apresentados são apenas uma estimativa, baseada em pesquisas com os preços atuais da API do WhatsApp via Twilio. Podem sofrer alterações conforme a política da plataforma ou a região de envio.

### 1.2 Dependência de Estabilidade Externa

| Risco                        | Impacto | Probabilidade | Mitigação                                                       |
|-----------------------------|---------|---------------|-----------------------------------------------------------------|
| Twilio fora do ar           | Alto    | Baixo         | Adicionar fallback com e-mail ou log local das tentativas.     |
| Latência elevada na API     | Médio   | Médio         | Monitorar tempo de resposta. Usar timeouts e tentativas automáticas. |

---

## 2. Riscos com Banco de Dados (MongoDB)

| Risco                                 | Impacto | Probabilidade | Mitigação                                                               |
|--------------------------------------|---------|---------------|-------------------------------------------------------------------------|
| Inconsistência em escrita concorrente| Médio   | Baixo          | Aplicar locks ou versionamento nas operações críticas.                  |
| Exposição de dados sensíveis         | Alto    | Médio         | Aplicar criptografia (em trânsito e em repouso).                        |
| Perda de dados por erro de schema    | Médio   | Baixo         | Implementar validações rígidas com Class Validator ou Mongoose.                     |
| Escalabilidade em altos volumes      | Médio   | Médio         | Criar índices, particionar coleções e revisar modelo de dados.          |

---

## 3. Gestão de Riscos – API da OpenAI


| Risco                                                        | Impacto  | Probabilidade | Mitigação                                                                 |
|-------------------------------------------------------------|----------|---------------|---------------------------------------------------------------------------|
| **Custo variável por uso**                                  | Alto     | Médio         | Estabelecer limites de uso na API, monitorar o consumo e aplicar cache.  |
| **Dependência de terceiros (vendor lock-in)**               | Médio    | Alto          | Considerar arquitetura flexível e abstrair integrações com provedores.  |
| **Latência nas respostas**                                  | Médio    | Médio         | Utilizar fallback, loading states e otimizar chamadas com pré-processamento. |
| **Indisponibilidade da API (downtime ou limite de uso)**    | Alto     | Baixo         | Implementar mecanismos de retry e logs para análise.                     |
| **Retorno de respostas inadequadas ou enviesadas**          | Médio    | Médio         | Validar respostas críticas e usar prompt engineering adequado.           |


---

## 4. Backend (NestJS)

| Risco                           | Impacto | Probabilidade | Mitigação                                                  |
|--------------------------------|---------|---------------|------------------------------------------------------------|
| Baixo desempenho sob carga     | Alto    | Médio         | Adotar cache, balanceamento e profiling de endpoints.      |
| Crescimento desorganizado      | Médio   | Alto          | Seguir arquitetura modular, aplicar testes e linting.      |
| Falta de logs e monitoramento  | Alto    | Médio         | Integrar com ferramentas como Sentry e Prometheus.         |

---

## 5. Requisitos Legais (LGPD)

| Risco                                      | Impacto | Probabilidade | Mitigação                                                                          |
|-------------------------------------------|---------|---------------|------------------------------------------------------------------------------------|
| Coleta de dados sem consentimento explícito| Alto    | Médio         | Implementar consentimento explícito (mensagem de aceite).                  |
| Compartilhamento com terceiros (ex: Twilio)| Alto    | Baixo          | Garantir que todos os termos e políticas de uso estejam visíveis ao usuário.      |
| Armazenamento de dados sensíveis           | Alto    | Médio         | Criptografar dados, definir prazos de retenção e anonimizar informações críticas. |

---

## 6. Resumo de Riscos Classificados

| Risco                                             | Impacto | Probabilidade | Categoria             |
|--------------------------------------------------|---------|---------------|------------------------|
| Custos com marketing/autenticação no Twilio      | Alto    | Alto          | Técnico/Financeiro     |
| Exceder limite gratuito de conversas de serviço  | Médio   | Médio         | Técnico/Financeiro     |
| Classificação incorreta da conversa              | Alto    | Médio         | Operacional            |
| Instabilidade na API Twilio                      | Médio   | Médio         | Técnico                |
| Violação de LGPD por má configuração             | Alto    | Baixo         | Legal/Operacional      |

---

## Referências

- [Twilio WhatsApp Pricing](https://www.twilio.com/en-us/whatsapp/pricing)
- [Documentação NestJS](https://docs.nestjs.com/)
- [Documentação MongoDB](https://www.mongodb.com/docs/)
- [API da OpenAI](https://platform.openai.com/docs/)  
- [Lei Geral de Proteção de Dados (LGPD)](https://www.gov.br/cidadania/pt-br/acesso-a-informacao/lgpd)

