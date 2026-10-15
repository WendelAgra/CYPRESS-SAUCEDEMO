import inventoryPage from '../../support/pages/InventoryPage'
import cartPage from '../../support/pages/CartPage'

describe('Funcionalidade: Gerenciamento do Carrinho de Compras', () => {

    beforeEach(() => {
        cy.login()
    })

    it('Deve adicionar um produto ao carrinho', () => {
        inventoryPage.addItemToCart('sauce-labs-backpack')
        inventoryPage.getCartBadge().should('contain', '1')
    })

    it('Deve remover um produto do catálogo e atualizar o contador', () => {
        inventoryPage.addItemToCart('sauce-labs-backpack')
        inventoryPage.removeItemFromCart('sauce-labs-backpack')
        inventoryPage.getCartBadge().should('not.exist')
    })

    it('Deve permitir adicionar múltiplos produtos ao carrinho', () => {
        inventoryPage.addItemToCart('sauce-labs-backpack')
        inventoryPage.addItemToCart('sauce-labs-bike-light')
        inventoryPage.getCartBadge().should('contain', '2')
    })

    it('Deve permitir remover múltiplos produtos do catálogo', () => {
        inventoryPage.addItemToCart('sauce-labs-backpack')
        inventoryPage.addItemToCart('sauce-labs-bike-light')
        inventoryPage.removeItemFromCart('sauce-labs-backpack')
        inventoryPage.removeItemFromCart('sauce-labs-bike-light')
        inventoryPage.getCartBadge().should('not.exist')
    })

    it('Deve navegar para a página do carrinho e exibir os itens adicionados', () => {
        inventoryPage.addItemToCart('sauce-labs-backpack')
        inventoryPage.goToCart()
        cy.url().should('include', '/cart.html')
        cartPage.getCartItems().should('have.length', 1)
        cy.get('.inventory_item_name').should('contain', 'Sauce Labs Backpack')
    })

    it('Deve permitir continuar comprando a partir do carrinho', () => {
        inventoryPage.addItemToCart('sauce-labs-backpack')
        inventoryPage.goToCart()
        cartPage.continueShopping()
        cy.url().should('include', '/inventory.html')
        cy.contains('Products').should('be.visible')
    })

    it('Deve permitir remover itens diretamente pela página do carrinho', () => {
        inventoryPage.addItemToCart('sauce-labs-backpack')
        inventoryPage.addItemToCart('sauce-labs-bike-light')
        inventoryPage.goToCart()
        cartPage.removeItem('sauce-labs-backpack')
        cartPage.removeItem('sauce-labs-bike-light')
        cartPage.getCartItems().should('not.exist')
        inventoryPage.getCartBadge().should('not.exist')
    })
})
