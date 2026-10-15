class LoginPage {
    visit() {
        cy.visit('/')
    }

    fillUsername(username) {
        cy.get('[data-test="username"]').clear().type(username)
    }

    fillPassword(password) {
        cy.get('[data-test="password"]').clear().type(password)
    }

    submit() {
        cy.get('[data-test="login-button"]').click()
    }

    login(username = 'standard_user', password = 'secret_sauce') {
        this.visit()
        if (username) this.fillUsername(username)
        if (password) this.fillPassword(password)
        this.submit()
    }

    getErrorMessage() {
        return cy.get('[data-test="error"]')
    }

    closeErrorMessage() {
        cy.get('[data-test="error-button"]').click()
    }
}

export default new LoginPage()
