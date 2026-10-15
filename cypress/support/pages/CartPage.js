class CartPage {
    getCartItems() {
        return cy.get('.cart_item')
    }

    removeItem(itemSlug) {
        cy.get(`[data-test="remove-${itemSlug}"]`).click()
    }

    continueShopping() {
        cy.get('[data-test="continue-shopping"]').click()
    }

    proceedToCheckout() {
        cy.get('[data-test="checkout"]').click()
    }
}

export default new CartPage()
