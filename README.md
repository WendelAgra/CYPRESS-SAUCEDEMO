# 🚀 Projeto de Testes Automatizados no SauceDemo

Este projeto contém uma suíte profissional e modular de testes automatizados de ponta a ponta (E2E) para o e-commerce de demonstração [SauceDemo](https://www.saucedemo.com/), utilizando o framework **Cypress**, arquitetura **Page Object Model (POM)**, massa de dados via **Fixtures** e organização em **módulos/pastas independentes**.

---

## 🧪 Tecnologias e Padrões Utilizados

* **[Cypress](https://www.cypress.io/) (v16.2.0):** Framework principal para escrita e execução dos testes E2E.
* **Page Object Model (POM):** Padrão de design para desacoplar a lógica dos testes da estrutura dos seletores da página.
* **Fixtures:** Centralização de dados e credenciais em arquivos JSON estruturados.
* **Estrutura Modular por Domínio:** Cada funcionalidade reside em sua própria pasta e arquivo spec dedicado.
* **JavaScript:** Linguagem base para escrita dos scripts.
* **Node.js / npm:** Ambiente de execução e gerenciamento de dependências.

---

## 📁 Arquitetura do Projeto

```text
cypress/
├── fixtures/
│   ├── users.json                     # Credenciais e personas de teste
│   └── checkoutData.json              # Dados de clientes e cenários de formulário
├── e2e/                               # Suíte modular ordenada por numeração
│   ├── 01-login/
│   │   └── login.cy.js                # Testes de autenticação e proteção de rotas
│   ├── 02-catalogo/
│   │   └── catalogo.cy.js             # Listagem, ordenações, detalhes do produto e rodapé
│   ├── 03-carrinho/
│   │   └── carrinho.cy.js             # Adição, remoção e ciclo de vida do carrinho
│   ├── 04-checkout/
│   │   └── checkout.cy.js             # Fluxo de compra, cálculos financeiros e cancelamentos
│   ├── 05-menu/
│   │   └── menu-usuario.cy.js         # Testes do menu lateral (Logout, Reset App State, About)
│   ├── 06-personas/
│   │   └── personas.cy.js             # Detecção de bugs intencionais (problem_user, performance_glitch_user)
│   ├── 07-responsividade/
│   │   └── mobile.cy.js               # Validação em dispositivos móveis e tablets
│   └── 08-casos-de-borda/
│       └── resiliencia.cy.js          # Persistência com reload, caracteres especiais e edge cases
├── support/
│   ├── pages/                         # Page Objects (POM)
│   │   ├── LoginPage.js
│   │   ├── InventoryPage.js
│   │   ├── CartPage.js
│   │   └── CheckoutPage.js
│   ├── commands.js                    # Comandos customizados Cypress (cy.login)
│   └── e2e.js                         # Ponto de entrada do Cypress support
├── cypress.config.js                  # Configurações globais (baseUrl, viewports)
└── package.json                       # Scripts de execução e dependências
```

---

## ⚙️ Pré-requisitos

* [Node.js](https://nodejs.org/en/) (v18 ou superior)
* [npm](https://www.npmjs.com/)

---

## 🔧 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/WendelAgra/CYPRESS-SAUCEDEMO.git
   cd CYPRESS-SAUCEDEMO
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

---

## ▶️ Como Executar os Testes

| Comando | Descrição |
| :--- | :--- |
| `npm test` | Executa todas as 8 specs em modo headless no terminal |
| `npm run cypress:open` | Abre a interface gráfica interativa do Cypress (com a árvore de pastas) |
| `npm run cypress:run` | Executa os testes em segundo plano (modo headless) |
| `npm run cypress:chrome` | Executa os testes no navegador Google Chrome |

---

## 📋 Cobertura dos Testes (43 Cenários Automatizados em 8 Módulos)

### 1. 📁 `01-login/login.cy.js` (8 testes)
* Login com credenciais válidas (`standard_user`).
* Falha de login com credenciais inválidas.
* Validação de conta bloqueada (`locked_out_user`).
* Proteção de rotas internas contra acessos não autenticados (ex: acessar `/inventory.html` sem login).
* Validação de campos obrigatórios (usuário vazio, senha vazia, ambos vazios).
* Dispensar mensagem de erro ao clicar no botão "X".

### 2. 📁 `02-catalogo/catalogo.cy.js` (9 testes)
* Exibição completa dos 6 produtos do catálogo.
* Ordenação por preço do menor para o maior (Low to High).
* Ordenação por preço do maior para o menor (High to Low).
* Ordenação por nome de A a Z.
* Ordenação por nome de Z a A.
* Navegação para a página de detalhes do produto (`/inventory-item.html?id=4`) e retorno via "Back to products".
* Adição de produtos ao carrinho diretamente pela página de detalhes.
* Validação dos links externos de redes sociais (Twitter/X, Facebook, LinkedIn) com `target="_blank"`.
* Validação do texto de copyright e termos de serviço.

### 3. 📁 `03-carrinho/carrinho.cy.js` (7 testes)
* Adição e remoção de produto com atualização dinâmica do badge.
* Adição e remoção de múltiplos produtos.
* Persistência dos produtos adicionados ao acessar a página do carrinho (`/cart.html`).
* Navegação de retorno via "Continue Shopping".
* Remoção de produtos diretamente pela interface do carrinho.

### 4. 📁 `04-checkout/checkout.cy.js` (8 testes)
* Fluxo completo de compra de ponta a ponta (adicionar item, preencher dados, confirmar e finalizar).
* Validação individual e granular de campos obrigatórios (`First Name`, `Last Name`, `Postal Code`).
* Validação matemática completa do pedido (Subtotal dos itens + Taxa de 8% = Total final).
* Cancelamento no Passo 1 (retorno ao carrinho preservando itens).
* Cancelamento no Passo 2 (retorno ao catálogo).
* Botão "Back Home" pós-compra, redirecionando ao catálogo e zerando o carrinho.

### 5. 📁 `05-menu/menu-usuario.cy.js` (3 testes)
* Logout com sucesso e redirecionamento para a página inicial.
* Reset do estado da aplicação e esvaziamento do carrinho via menu lateral ("Reset App State").
* Validação do link externo "About" no menu lateral apontando para `https://saucelabs.com/`.

### 6. 📁 `06-personas/personas.cy.js` (3 testes)
* Detecção de anomalia do `problem_user`: imagens de produtos substituídas pelo asset 404 (`sl-404`).
* Detecção de anomalia do `problem_user`: bloqueio do campo de sobrenome no checkout disparando `Error: Last Name is required`.
* Resiliência e tolerância a atrasos de rede com `performance_glitch_user` utilizando timeout customizado de 10s.

### 7. 📁 `07-responsividade/mobile.cy.js` (2 testes)
* Layout e navegação adaptados para Mobile (**iPhone X** - 375x812).
* Validação de catálogo e adição ao carrinho em resolução Tablet (**iPad-2** - 768x1024).

### 8. 📁 `08-casos-de-borda/resiliencia.cy.js` (3 testes)
* Persistência dos itens no carrinho após recarregamento forçado da página (`cy.reload()`).
* Aceitação de caracteres especiais e acentos nos dados do cliente no checkout (`José-Maria & Co.`, `O'Connor`).
* Tentativa de avançar para checkout com carrinho vazio (Edge Case do SauceDemo).