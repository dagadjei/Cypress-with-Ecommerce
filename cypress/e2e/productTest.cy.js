import { faker } from '@faker-js/faker'
import user from '../fixtures/user.json'
import products from '../fixtures/products.json'

let productCount 


describe('Product page tests', () => {
    beforeEach(() => {
      cy.visit('https://automationexercise.com/')
    })
    
    it('Verify Products and Product detail page', () => {
      cy.goToProductPage()
      cy.get('.choose')
        .first()
        .find('a[href^="/product_details/1"]')
        .click()
      cy.url().should('include', '/product_details/1')
      cy.get('.product-information').should('be.visible')
    })

    it('Product Search', () => {
        cy.goToProductPage()
        const searchItem = Math.random() > 0.5 ? faker.commerce.productName() : 'dress'
        cy.get('#search_product').type(searchItem)
        cy.get('button[id="submit_search"]').click()
        cy.contains('h2', 'Searched Products').should('be.visible')
        cy.get('body').then(($body) => {
            if ($body.find('.features_items').length > 0) {
              cy.get('.features_items').then(($grid) => {
                const products = $grid.find('.col-sm-4').length
                if(products > 0){
                    cy.get('.col-sm-4').should('be.visible')
                }
                else{
                    cy.get('.features_items').find('.col-sm-4').should('have.length', 0)
                }
              }) 
            }
            else{
              cy.get('.features_items').should('be.empty')
            }
        })
      })

    it('erify products Added to Cart', () => {
        const firstTableRowHeader = 1
        cy.goToProductPage()
        cy.get('a[data-product-id="1"]').first().click()
        cy.get('.modal-footer > .btn').click()
        cy.get('a[data-product-id="2"]').first().click()
        cy.get('a[href="/view_cart"]').first().click()
        cy.get('tr').should('have.length', 2 + firstTableRowHeader)
        cy.fixture('products').then((products) => {
            products.forEach((product, index) => {
                cy.get('tr').eq(index+1).within(() => {
                    cy.get('.cart_description h4').contains(product.name).should('exist')
                    cy.get('.cart_description p').contains(product.description).should('exist')
                    cy.get('.cart_price p').contains(product.price).should('exist')
                    cy.get('.cart_quantity button').contains(product.quantity).should('exist')
                    cy.get('.cart_total p').contains(product.total).should('exist')
                })
            })
    })
    })

    it('Verify Product Quantity Added to Cart', () => {
        cy.goToProductPage()
        cy.get('.features_items .col-sm-4').then(($items) => {
            productCount = $items.length
            let productSelected = Math.floor(Math.random() * productCount)
           cy.get(`.choose a[href="/product_details/${productSelected}"]`).click()
           const productQuantity = Math.floor(Math.random() * 10) + 1
           cy.get('#quantity').clear().type(productQuantity)
           cy.contains('Add to cart').click()
           cy.get('.modal-footer > .btn').click()
           cy.get('a[href="/view_cart"]').first().click()
           cy.get('.disabled').should('contain', productQuantity.toString())
        })
    })
    
    it('Register during Checkout', () => {
        
        let newUserFirstName = faker.person.firstName()
        let newUserEmail = faker.internet.email()

        cy.addItemsToCart()
        cy.get('li a[href="/view_cart"]').click()
        cy.proceedToCheckout()
        cy.get('.modal-body a[href="/login"]').click() 
        cy.registerUser(newUserFirstName, newUserEmail)
        cy.get('li a[href="/view_cart"]').click()
        cy.proceedToCheckout()
        cy.makePayment()
    })

    it('Regiser before checkout', () => {
        cy.contains('Signup').click()
        cy.registerUser(faker.person.firstName(), faker.internet.email())
        cy.addItemsToCart()
        cy.get('li a[href="/view_cart"]').click()
        cy.url().should('include', '/view_cart')
        cy.proceedToCheckout()
        cy.makePayment()
    })

    it('Login before checkout', () => {
        cy.login()
        cy.contains('Logged in').should('be.visible')
        cy.addItemsToCart()
        cy.get('li a[href="/view_cart"]').click()
        cy.proceedToCheckout()
        cy.makePayment()
    })
    
    it('Remove items from cart', () => {
        cy.addItemsToCart()
        cy.get('li a[href="/view_cart"]').click()
        cy.get('tr').then(($rows) => {
            let itemsInCart = $rows.length - 1
            for(let i = 0; i < itemsInCart; i++){
                cy.get('tr[id^="product"]').eq(i).within(() => {
                    cy.get('.cart_delete').click()
                })
            }
        })
    })
})
