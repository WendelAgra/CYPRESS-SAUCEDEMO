import inventoryPage from '../../support/pages/InventoryPage'

describe('Funcionalidade: Menu do Usuário (Sidebar)', () => {

    beforeEach(() => {
        cy.login()
    })

    it('Deve fazer logout com sucesso e redirecionar para a página inicial', () => {
        inventoryPage.logout()
        cy.get('[data-test="login-button"]').should('be.visible')
        cy.url().should('eq', Cypress.config().baseUrl + '/')
    })

    it('Deve resetar o estado da aplicação e esvaziar o carrinho via Reset App State', () => {
        inventoryPage.addItemToCart('sauce-labs-backpack')
        inventoryPage.getCartBadge().should('contain', '1')
        inventoryPage.resetAppState()
        inventoryPage.getCartBadge().should('not.exist')
        cy.reload()
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').should('be.visible')
    })

    it('Deve validar que o link About aponta para o site oficial da Sauce Labs', () => {
        inventoryPage.openMenu()
        cy.get('#about_sidebar_link')
            .should('have.attr', 'href', 'https://saucelabs.com/')
    })
})
