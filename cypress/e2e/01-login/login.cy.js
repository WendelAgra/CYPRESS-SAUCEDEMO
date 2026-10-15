import loginPage from '../../support/pages/LoginPage'

describe('Funcionalidade: Login e Autenticação', () => {

    let users

    before(() => {
        cy.fixture('users').then(data => { users = data })
    })

    it('Deve fazer login com sucesso com credenciais válidas', () => {
        loginPage.login(users.standard.username, users.standard.password)
        cy.url().should('include', '/inventory.html')
        cy.contains('Products').should('be.visible')
        cy.contains('Swag Labs').should('be.visible')
    })

    it('Deve falhar o login com credenciais inválidas', () => {
        loginPage.login('invalid_user', 'wrong_password')
        loginPage.getErrorMessage()
            .should('be.visible')
            .and('contain', 'Epic sadface: Username and password do not match any user in this service')
    })

    it('Deve exibir mensagem de erro para usuário bloqueado (locked_out_user)', () => {
        loginPage.login(users.lockedOut.username, users.lockedOut.password)
        loginPage.getErrorMessage()
            .should('be.visible')
            .and('contain', 'Epic sadface: Sorry, this user has been locked out.')
    })

    it('Deve bloquear acesso direto a páginas internas sem autenticação (Proteção de Rotas)', () => {
        cy.visit('/inventory.html', { failOnStatusCode: false })
        loginPage.getErrorMessage()
            .should('be.visible')
            .and('contain', "Epic sadface: You can only access '/inventory.html' when you are logged in.")
    })

    it('Deve exibir mensagem de erro ao tentar login sem preencher os campos', () => {
        loginPage.visit()
        loginPage.submit()
        loginPage.getErrorMessage()
            .should('be.visible')
            .and('contain', 'Epic sadface: Username is required')
    })

    it('Deve exibir mensagem de erro ao tentar login com senha vazia', () => {
        loginPage.visit()
        loginPage.fillUsername(users.standard.username)
        loginPage.submit()
        loginPage.getErrorMessage()
            .should('be.visible')
            .and('contain', 'Epic sadface: Password is required')
    })

    it('Deve exibir mensagem de erro ao tentar login com usuário vazio', () => {
        loginPage.visit()
        loginPage.fillPassword(users.standard.password)
        loginPage.submit()
        loginPage.getErrorMessage()
            .should('be.visible')
            .and('contain', 'Epic sadface: Username is required')
    })

    it('Deve fechar a mensagem de erro ao clicar no botão X', () => {
        loginPage.visit()
        loginPage.submit()
        loginPage.getErrorMessage().should('be.visible')
        loginPage.closeErrorMessage()
        loginPage.getErrorMessage().should('not.exist')
    })
})
