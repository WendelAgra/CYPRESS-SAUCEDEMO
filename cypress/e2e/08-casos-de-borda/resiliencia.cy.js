import inventoryPage from '../../support/pages/InventoryPage'
import cartPage from '../../support/pages/CartPage'
import checkoutPage from '../../support/pages/CheckoutPage'

describe('Funcionalidade: Casos de Borda e Resiliência', () => {

    let checkoutData

    before(() => {
        cy.fixture('checkoutData').then(data => { checkoutData = data })
    })

    beforeEach(() => {
        cy.login()
    })

    it('Deve manter os itens no carrinho após recarregar a página (cy.reload)', () => {
        inventoryPage.addItemToCart('sauce-labs-backpack')
        inventoryPage.getCartBadge().should('contain', '1')
        cy.reload()
        inventoryPage.getCartBadge().should('contain', '1')
        inventoryPage.goToCart()
        cartPage.getCartItems().should('have.length', 1)
    })

    it('Deve aceitar caracteres especiais e acentos nos dados do cliente no Checkout', () => {
        inventoryPage.addItemToCart('sauce-labs-backpack')
        inventoryPage.goToCart()
        cartPage.proceedToCheckout()
        checkoutPage.fillCustomerInfo(
            checkoutData.specialCharactersCustomer.firstName,
            checkoutData.specialCharactersCustomer.lastName,
            checkoutData.specialCharactersCustomer.postalCode
        )
        checkoutPage.continue()
        cy.url().should('include', '/checkout-step-two.html')
        checkoutPage.finish()
        cy.contains('Thank you for your order!').should('be.visible')
    })

    it('Deve permitir acessar checkout mesmo com carrinho vazio (Edge Case do SauceDemo)', () => {
        inventoryPage.goToCart()
        cartPage.getCartItems().should('not.exist')
        cartPage.proceedToCheckout()
        cy.url().should('include', '/checkout-step-one.html')
    })
})
