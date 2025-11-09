/**
 * Comando customizado para fazer login no SauceDemo.
 * @param {string} username - O nome de usuário.
 * @param {string} password - A senha.
 */
Cypress.Commands.add('login', (username, password) => {
  cy.get('[data-test="username"]').type(username)
  cy.get('[data-test="password"]').type(password)
  cy.get('[data-test="login-button"]').click()
})