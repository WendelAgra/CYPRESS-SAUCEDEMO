import inventoryPage from '../../support/pages/InventoryPage'

describe('Funcionalidade: Catálogo de Produtos e Ordenação', () => {

    beforeEach(() => {
        cy.login()
    })

    it('Deve exibir todos os 6 produtos disponíveis no catálogo', () => {
        inventoryPage.getItems().should('have.length', 6)
    })

    it('Deve ordenar os produtos por preço do menor para o maior (Low to High)', () => {
        inventoryPage.selectSort('lohi')
        inventoryPage.getItemPrices().first().should('contain', '7.99')

        inventoryPage.getItemPrices().then($prices => {
            const priceValues = [...$prices].map(p => parseFloat(p.innerText.replace('$', '')))
            const sortedPrices = [...priceValues].sort((a, b) => a - b)
            expect(priceValues).to.deep.equal(sortedPrices)
        })
    })

    it('Deve ordenar os produtos por preço do maior para o menor (High to Low)', () => {
        inventoryPage.selectSort('hilo')
        inventoryPage.getItemPrices().first().should('contain', '49.99')

        inventoryPage.getItemPrices().then($prices => {
            const priceValues = [...$prices].map(p => parseFloat(p.innerText.replace('$', '')))
            const sortedPrices = [...priceValues].sort((a, b) => b - a)
            expect(priceValues).to.deep.equal(sortedPrices)
        })
    })

    it('Deve ordenar os produtos por nome de A a Z', () => {
        inventoryPage.selectSort('az')
        inventoryPage.getItemNames().then($names => {
            const nameValues = [...$names].map(n => n.innerText)
            const sortedNames = [...nameValues].sort()
            expect(nameValues).to.deep.equal(sortedNames)
        })
    })

    it('Deve ordenar os produtos por nome de Z a A', () => {
        inventoryPage.selectSort('za')
        inventoryPage.getItemNames().first().should('contain', 'Test.allTheThings() T-Shirt (Red)')

        inventoryPage.getItemNames().then($names => {
            const nameValues = [...$names].map(n => n.innerText)
            const sortedNames = [...nameValues].sort().reverse()
            expect(nameValues).to.deep.equal(sortedNames)
        })
    })

    it('Deve navegar para os detalhes do produto e retornar ao catálogo', () => {
        inventoryPage.getItemNames().contains('Sauce Labs Backpack').click()
        cy.url().should('include', '/inventory-item.html?id=4')
        cy.get('.inventory_details_name').should('have.text', 'Sauce Labs Backpack')
        cy.get('[data-test="back-to-products"]').click()
        cy.url().should('include', '/inventory.html')
    })

    it('Deve permitir adicionar produto ao carrinho a partir da página de detalhes', () => {
        inventoryPage.getItemNames().contains('Sauce Labs Bike Light').click()
        cy.get('[data-test="add-to-cart"]').click()
        inventoryPage.getCartBadge().should('contain', '1')
        cy.get('[data-test="remove"]').should('be.visible')
    })

    it('Deve validar os links externos de redes sociais no rodapé', () => {
        cy.get('[data-test="social-x"]')
            .should('have.attr', 'href', 'https://x.com/saucelabs')
            .and('have.attr', 'target', '_blank')

        cy.get('[data-test="social-facebook"]')
            .should('have.attr', 'href', 'https://www.facebook.com/saucelabs')
            .and('have.attr', 'target', '_blank')

        cy.get('[data-test="social-linkedin"]')
            .should('have.attr', 'href', 'https://www.linkedin.com/company/sauce-labs/')
            .and('have.attr', 'target', '_blank')
    })

    it('Deve exibir o texto de copyright e termos no rodapé', () => {
        cy.get('[data-test="footer-copy"]')
            .should('be.visible')
            .and('contain', 'Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy')
    })
})
