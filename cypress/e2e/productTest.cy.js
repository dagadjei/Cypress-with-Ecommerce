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
        cy.get('#search_product').type(faker.commerce.productName())
        cy.get('button[id="submit_search"]').click()
        cy.contains('h2', 'Searched Products')
      })
  })
  