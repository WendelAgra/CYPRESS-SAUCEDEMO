# 🚀 Projeto de Testes Automatizados no SauceDemo

Este projeto contém uma suíte de testes de automação de ponta a ponta (E2E) para o site de demonstração [SauceDemo](https://www.saucedemo.com/). O objetivo é validar as principais funcionalidades do fluxo de e-commerce utilizando a ferramenta **Cypress**.

## 🧪 Tecnologias Utilizadas

* **Cypress:** O framework principal para a escrita e execução dos testes E2E.
* **JavaScript:** Linguagem base para a escrita dos scripts de teste.
* **Node.js / npm:** Ambiente de execução e gerenciamento de pacotes.

---

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de que você tem os seguintes softwares instalados:

* [Node.js](https://nodejs.org/en/) (que inclui o npm)
* [Cypress](https://www.cypress.io/) (será instalado junto com o projeto)

---

## 🔧 Instalação

1.  **Clone o repositório** (se aplicável):
    ```bash
    git clone [https://seu-repositorio-aqui.git](https://seu-repositorio-aqui.git)
    cd seu-projeto
    ```

2.  **Instale as dependências** (incluindo o Cypress):
    ```bash
    npm install
    ```

---

## ▶️ Como Executar os Testes

Você pode executar os testes de duas formas:

1.  **Modo Interativo (Test Runner):**
    Abre a interface gráfica do Cypress, onde você pode ver os testes rodando em tempo real.
    ```bash
    npx cypress open
    ```

2.  **Modo Headless (Terminal):**
    Executa todos os testes em segundo plano, ideal para integração contínua (CI).
    ```bash
    npx cypress run
    ```

---

## 📋 Funcionalidades Validadas

Esta suíte de testes cobre de forma abrangente o fluxo de usuário no site SauceDemo. As principais áreas validadas incluem:

* **Autenticação:** Testes para login bem-sucedido, falhas de login (usuário/senha inválidos) e validação de campos obrigatórios.
* **Inventário e Visualização de Produtos:** Garante que todos os produtos são carregados e que as funcionalidades de ordenação (por preço e por nome) funcionam corretamente.
* **Gerenciamento do Carrinho:** Cobre o ciclo de vida completo do carrinho, incluindo adicionar um ou múltiplos produtos, remover itens e navegar entre o carrinho e a loja.
* **Fluxo de Checkout (Finalização de Compra):** Valida o processo completo de checkout, desde o preenchimento dos dados do cliente, verificação dos totais (subtotal e taxas) até a confirmação final do pedido.
* **Gerenciamento de Sessão:** Confirma que a funcionalidade de logout redireciona o usuário corretamente para a página de login.