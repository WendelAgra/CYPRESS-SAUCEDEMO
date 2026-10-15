class InventoryPage {
    getItems() {
        return cy.get('.inventory_item')
    }

    getItemPrices() {
        return cy.get('.inventory_item_price')
    }

    getItemNames() {
        return cy.get('.inventory_item_name')
    }

    selectSort(option) {
        cy.get('[data-test="product-sort-container"]').select(option)
    }

    addItemToCart(itemSlug) {
        cy.get(`[data-test="add-to-cart-${itemSlug}"]`).click()
    }

    removeItemFromCart(itemSlug) {
        cy.get(`[data-test="remove-${itemSlug}"]`).click()
    }

    getCartBadge() {
        return cy.get('.shopping_cart_badge')
    }

    goToCart() {
        cy.get('.shopping_cart_link').click()
    }

    openMenu() {
        cy.get('#react-burger-menu-btn').click()
    }

    logout() {
        this.openMenu()
        cy.get('#logout_sidebar_link').should('be.visible').click()
    }

    resetAppState() {
        this.openMenu()
        cy.get('#reset_sidebar_link').click()
    }
}

export default new InventoryPage()
