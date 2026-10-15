class CheckoutPage {
    fillCustomerInfo(firstName, lastName, postalCode) {
        if (firstName) cy.get('[data-test="firstName"]').clear().type(firstName)
        if (lastName) cy.get('[data-test="lastName"]').clear().type(lastName)
        if (postalCode) cy.get('[data-test="postalCode"]').clear().type(postalCode)
    }

    continue() {
        cy.get('[data-test="continue"]').click()
    }

    cancel() {
        cy.get('[data-test="cancel"]').click()
    }

    finish() {
        cy.get('[data-test="finish"]').click()
    }

    backHome() {
        cy.get('[data-test="back-to-products"]').click()
    }

    getErrorMessage() {
        return cy.get('[data-test="error"]')
    }

    getPaymentInfo() {
        return cy.get('[data-test="payment-info-value"]')
    }

    getShippingInfo() {
        return cy.get('[data-test="shipping-info-value"]')
    }

    getSubtotal() {
        return cy.get('[data-test="subtotal-label"]')
    }

    getTax() {
        return cy.get('[data-test="tax-label"]')
    }

    getTotal() {
        return cy.get('[data-test="total-label"]')
    }
}

export default new CheckoutPage()
