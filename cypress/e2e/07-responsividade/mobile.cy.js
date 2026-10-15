import inventoryPage from '../../support/pages/InventoryPage'
import cartPage from '../../support/pages/CartPage'

describe('Funcionalidade: Testes Responsivos e Viewports', () => {

    it('Deve exibir layout e navegação adaptados para Mobile (iPhone X)', () => {
        cy.viewport('iphone-x')
        cy.login()
        cy.get('.inventory_item').should('have.length', 6)
        inventoryPage.openMenu()
        cy.get('#inventory_sidebar_link').should('be.visible')
        cy.get('#logout_sidebar_link').should('be.visible')
    })

    it('Deve permitir adicionar item ao carrinho em resolução Tablet (iPad)', () => {
        cy.viewport('ipad-2')
        cy.login()
        inventoryPage.addItemToCart('sauce-labs-backpack')
        inventoryPage.getCartBadge().should('contain', '1')
        inventoryPage.goToCart()
        cy.url().should('include', '/cart.html')
        cartPage.getCartItems().should('have.length', 1)
    })
})
