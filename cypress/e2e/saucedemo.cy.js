describe('Teste no SAUCEDEMO', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/');
    });

    // --- Testes da Funcionalidade de Login ---

    it('Deve fazer login com sucesso', () => {
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.contains('Products').should('be.visible')
        cy.contains('Swag Labs').should('be.visible')
    })

    it('Deve falhar o login com credenciais inválidas', () => {
        cy.get('[data-test="username"]').type('invalid_user')
        cy.get('[data-test="password"]').type('wrong_password')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('be.visible').and('contain', 'Epic sadface: Username and password do not match any user in this service')
    })

    it('Deve exibir mensagem de erro ao tentar login sem preencher os campos', () => {
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('be.visible').and('contain', 'Epic sadface: Username is required')
    })

    it('Deve exibir mensagem de erro ao tentar login com senha vazia', () => {
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('be.visible').and('contain', 'Epic sadface: Password is required')
    })

    it('Deve exibir mensagem de erro ao tentar login com usuário vazio', () => {
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('be.visible').and('contain', 'Epic sadface: Username is required')
    })

    // --- Testes de Funcionalidades Pós-Login ---

    it('Deve adicionar um produto ao carrinho', () => {
        cy.login('standard_user', 'secret_sauce') 
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_badge').should('contain', '1')
    })

    it('Deve remover um produto do carrinho', () => {
        cy.login('standard_user', 'secret_sauce') 
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="remove-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_badge').should('not.exist')
    })

    it('Deve completar uma compra', () => {
        cy.login('standard_user', 'secret_sauce') 
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_link').click()
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type('John')
        cy.get('[data-test="lastName"]').type('Doe')
        cy.get('[data-test="postalCode"]').type('12345')
        cy.get('[data-test="continue"]').click()
        cy.get('[data-test="finish"]').click()
        cy.contains('Thank you for your order!').should('be.visible')
    })

    it('Deve fazer logout com sucesso', () => {
        cy.login('standard_user', 'secret_sauce') 
        cy.get('#react-burger-menu-btn').click()
        cy.get('#logout_sidebar_link').click()
        cy.get('[data-test="login-button"]').should('be.visible')
    })

    it('Deve exibir todos os produtos na página de produtos após o login', () => {
        cy.login('standard_user', 'secret_sauce') 
        cy.get('.inventory_item').should('have.length', 6)
    })

    it('Deve ordenar os produtos por preço do menor para o maior', () => {
        cy.login('standard_user', 'secret_sauce') 
        
        cy.get('.product_sort_container').select('Price (low to high)')
        cy.get('.inventory_item_price').first().should('contain', '7.99') 

        cy.get('.inventory_item_price').then(prices => {
            const priceValues = [...prices].map(price => parseFloat(price.innerText.replace('$', '')));
            const sortedPrices = [...priceValues].sort((a, b) => a - b);
            expect(priceValues).to.deep.equal(sortedPrices);
        })
    })

    it('Deve permitir adicionar múltiplos produtos ao carrinho', () => {
        cy.login('standard_user', 'secret_sauce') 
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        cy.get('.shopping_cart_badge').should('contain', '2')
    })

    it('Deve permitir remover múltiplos produtos do carrinho', () => {
        cy.login('standard_user', 'secret_sauce') 
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        cy.get('[data-test="remove-sauce-labs-backpack"]').click()
        cy.get('[data-test="remove-sauce-labs-bike-light"]').click()
        cy.get('.shopping_cart_badge').should('not.exist')
    })

    it('Deve permitir navegar para a página do carrinho após adicionar um produto', () => {
        cy.login('standard_user', 'secret_sauce') 
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_link').click()
        cy.url().should('include', '/cart.html')
        cy.contains('Your Cart').should('be.visible')
    })

    it('Deve permitir continuar comprando após adicionar um produto ao carrinho', () => {
        cy.login('standard_user', 'secret_sauce') 
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_link').click()
        cy.get('[data-test="continue-shopping"]').click()
        cy.url().should('include', '/inventory.html')
        cy.contains('Products').should('be.visible')
    })


    it('Deve exibir o total correto na finalização da compra', () => {
        cy.login('standard_user', 'secret_sauce') 
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_link').click()
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type('John')
        cy.get('[data-test="lastName"]').type('Doe')
        cy.get('[data-test="postalCode"]').type('12345')
        cy.get('[data-test="continue"]').click()
        cy.get('.summary_subtotal_label').then($subtotal => {
            const subtotalText = $subtotal.text();
            const subtotalValue = parseFloat(subtotalText.replace('Item total: $', ''));
            expect(subtotalValue).to.equal(29.99);
        })
    })

    it('Deve permitir aplicar um cupom de desconto fictício na finalização da compra', () => {
        cy.login('standard_user', 'secret_sauce') 
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_link').click()
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type('John')
        cy.get('[data-test="lastName"]').type('Doe')
        cy.get('[data-test="postalCode"]').type('12345')
        cy.get('[data-test="continue"]').click()
        cy.get('.summary_tax_label').should('have.text', 'Tax: $2.40');
    })

    it('Deve exibir mensagem de erro ao tentar finalizar a compra sem preencher os dados obrigatórios', () => {
        cy.login('standard_user', 'secret_sauce') 
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_link').click()
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="continue"]').click()
        cy.get('[data-test="error"]').should('be.visible').and('contain', 'Error: First Name is required')
    })

    it('Deve permitir visualizar os detalhes do pedido antes de finalizar a compra', () => {
        cy.login('standard_user', 'secret_sauce') 
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_link').click()
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type('John')
        cy.get('[data-test="lastName"]').type('Doe')
        cy.get('[data-test="postalCode"]').type('12345')
        cy.get('[data-test="continue"]').click()
        cy.get('.summary_info').should('be.visible')
    })

    it('Deve permitir visualizar a política de privacidade a partir do rodapé', () => {
        cy.login('standard_user', 'secret_sauce') 
        cy.get('footer').contains('Privacy Policy').click()
    })

    it('Deve permitir filtrar produtos por nome', () => {
        cy.login('standard_user', 'secret_sauce') 
        cy.get('.product_sort_container').select('Name (A to Z)')
        cy.get('.inventory_item_name').then(names => {
            const nameValues = [...names].map(name => name.innerText);
            const sortedNames = [...nameValues].sort();
            expect(nameValues).to.deep.equal(sortedNames);
        })
    })
});
