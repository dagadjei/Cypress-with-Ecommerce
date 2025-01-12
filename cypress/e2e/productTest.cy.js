import { faker } from '@faker-js/faker'
import user from '../fixtures/user.json'


describe('Product page tests', () => {
    beforeEach(() => {
      cy.visit('https://automationexercise.com/')
    })
  
    it('Verify Products and Product detail page', () => {
      cy.contains('Products').click()
      cy.url().should('include', '/products')
      cy.contains('h2', 'All Products')
      cy.get('.choose')
        .first()
        .find('a[href^="/product_details/1"]')
        .click()
      cy.url().should('include', '/product_details/1')
      cy.get('.product-information').should('be.visible')
    })

    it('Verify Products and Product detail page', () => {
        cy.contains('Products').click()
        cy.url().should('include', '/products')
        cy.contains('h2', 'All Products')
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

    it('Add products to Cart', () => {

    })
  })
  
