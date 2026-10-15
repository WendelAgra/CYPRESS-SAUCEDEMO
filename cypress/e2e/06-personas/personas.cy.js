import loginPage from '../../support/pages/LoginPage'
import inventoryPage from '../../support/pages/InventoryPage'
import cartPage from '../../support/pages/CartPage'
import checkoutPage from '../../support/pages/CheckoutPage'

describe('Funcionalidade: Personas Especiais e Detecção de Bugs', () => {

    let users

    before(() => {
        cy.fixture('users').then(data => { users = data })
    })

    it('Deve detectar que problem_user carrega imagens com erro no catálogo', () => {
        loginPage.login(users.problem.username, users.problem.password)
        cy.url().should('include', '/inventory.html')
        cy.get('.inventory_item_img img').each($img => {
            expect($img.attr('src')).to.include('sl-404')
        })
    })

    it('Deve detectar anomalia de checkout com problem_user (Sobrenome bloqueado)', () => {
        loginPage.login(users.problem.username, users.problem.password)
        inventoryPage.addItemToCart('sauce-labs-backpack')
        inventoryPage.goToCart()
        cartPage.proceedToCheckout()
        checkoutPage.fillCustomerInfo('John', 'Doe', '12345')
        checkoutPage.continue()
        // problem_user intencionalmente não aceita o Last Name
        checkoutPage.getErrorMessage()
            .should('be.visible')
            .and('contain', 'Error: Last Name is required')
    })

    it('Deve tolerar latência do performance_glitch_user com timeout configurado', () => {
        loginPage.visit()
        loginPage.fillUsername(users.performanceGlitch.username)
        loginPage.fillPassword(users.performanceGlitch.password)
        loginPage.submit()
        // Configura timeout de 10s para acomodar o atraso simulado de rede
        cy.url({ timeout: 10000 }).should('include', '/inventory.html')
        cy.contains('Products').should('be.visible')
    })
})
