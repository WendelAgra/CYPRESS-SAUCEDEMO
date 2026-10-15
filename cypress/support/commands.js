/**
 * Comando customizado para fazer login no SauceDemo.
 * @param {string} username - O nome de usuário.
 * @param {string} password - A senha.
 */
Cypress.Commands.add('login', (username = 'standard_user', password = 'secret_sauce') => {
  cy.visit('/')
  cy.get('[data-test="username"]').clear().type(username)
  cy.get('[data-test="password"]').clear().type(password)
  cy.get('[data-test="login-button"]').click()
})