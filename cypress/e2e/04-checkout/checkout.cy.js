import inventoryPage from '../../support/pages/InventoryPage'
import cartPage from '../../support/pages/CartPage'
import checkoutPage from '../../support/pages/CheckoutPage'

describe('Funcionalidade: Fluxo de Checkout e Finalização de Compra', () => {

    let checkoutData

    before(() => {
        cy.fixture('checkoutData').then(data => { checkoutData = data })
    })

    beforeEach(() => {
        cy.login()
    })

    it('Deve completar uma compra de ponta a ponta com sucesso', () => {
        inventoryPage.addItemToCart('sauce-labs-backpack')
        inventoryPage.goToCart()
        cartPage.proceedToCheckout()
        checkoutPage.fillCustomerInfo(checkoutData.validCustomer.firstName, checkoutData.validCustomer.lastName, checkoutData.validCustomer.postalCode)
        checkoutPage.continue()
        cy.url().should('include', '/checkout-step-two.html')
        checkoutPage.finish()
        cy.url().should('include', '/checkout-complete.html')
        cy.contains('Thank you for your order!').should('be.visible')
    })

    it('Deve exibir mensagem de erro quando o Primeiro Nome não for preenchido', () => {
        inventoryPage.addItemToCart('sauce-labs-backpack')
        inventoryPage.goToCart()
        cartPage.proceedToCheckout()
        checkoutPage.continue()
        checkoutPage.getErrorMessage()
            .should('be.visible')
            .and('contain', 'Error: First Name is required')
    })

    it('Deve exibir mensagem de erro quando o Sobrenome não for preenchido', () => {
        inventoryPage.addItemToCart('sauce-labs-backpack')
        inventoryPage.goToCart()
        cartPage.proceedToCheckout()
        checkoutPage.fillCustomerInfo(checkoutData.validCustomer.firstName, null, null)
        checkoutPage.continue()
        checkoutPage.getErrorMessage()
            .should('be.visible')
            .and('contain', 'Error: Last Name is required')
    })

    it('Deve exibir mensagem de erro quando o Código Postal não for preenchido', () => {
        inventoryPage.addItemToCart('sauce-labs-backpack')
        inventoryPage.goToCart()
        cartPage.proceedToCheckout()
        checkoutPage.fillCustomerInfo(checkoutData.validCustomer.firstName, checkoutData.validCustomer.lastName, null)
        checkoutPage.continue()
        checkoutPage.getErrorMessage()
            .should('be.visible')
            .and('contain', 'Error: Postal Code is required')
    })

    it('Deve calcular e exibir corretamente o Subtotal, Taxa e Total final da compra', () => {
        // Adiciona Mochila ($29.99) e Lanterna ($9.99)
        inventoryPage.addItemToCart('sauce-labs-backpack')
        inventoryPage.addItemToCart('sauce-labs-bike-light')
        inventoryPage.goToCart()
        cartPage.proceedToCheckout()
        checkoutPage.fillCustomerInfo(checkoutData.validCustomer.firstName, checkoutData.validCustomer.lastName, checkoutData.validCustomer.postalCode)
        checkoutPage.continue()

        // Validações do resumo do pedido usando seletores oficiais data-test
        checkoutPage.getPaymentInfo().should('contain', 'SauceCard #31337')
        checkoutPage.getShippingInfo().should('contain', 'Free Pony Express Delivery!')
        checkoutPage.getSubtotal().should('contain', 'Item total: $39.98')
        checkoutPage.getTax().should('contain', 'Tax: $3.20')
        checkoutPage.getTotal().should('contain', 'Total: $43.18')
    })

    it('Deve permitir cancelar o checkout no Passo 1 e retornar ao carrinho', () => {
        inventoryPage.addItemToCart('sauce-labs-backpack')
        inventoryPage.goToCart()
        cartPage.proceedToCheckout()
        checkoutPage.cancel()
        cy.url().should('include', '/cart.html')
        cartPage.getCartItems().should('have.length', 1)
    })

    it('Deve permitir cancelar o checkout no Passo 2 e retornar ao catálogo', () => {
        inventoryPage.addItemToCart('sauce-labs-backpack')
        inventoryPage.goToCart()
        cartPage.proceedToCheckout()
        checkoutPage.fillCustomerInfo(checkoutData.validCustomer.firstName, checkoutData.validCustomer.lastName, checkoutData.validCustomer.postalCode)
        checkoutPage.continue()
        checkoutPage.cancel()
        cy.url().should('include', '/inventory.html')
    })

    it('Deve retornar ao catálogo e zerar o carrinho após finalizar a compra clicando em Back Home', () => {
        inventoryPage.addItemToCart('sauce-labs-backpack')
        inventoryPage.goToCart()
        cartPage.proceedToCheckout()
        checkoutPage.fillCustomerInfo(checkoutData.validCustomer.firstName, checkoutData.validCustomer.lastName, checkoutData.validCustomer.postalCode)
        checkoutPage.continue()
        checkoutPage.finish()
        checkoutPage.backHome()
        cy.url().should('include', '/inventory.html')
        inventoryPage.getCartBadge().should('not.exist')
    })
})
