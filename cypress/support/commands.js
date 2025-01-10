import user from '../fixtures/user.json'

Cypress.Commands.add('login', () => {
    cy.contains('Login').click()
    cy.get('[data-qa="login-email"]').type(user.email)
    cy.get('[data-qa="login-password"]').type(user.password)
    cy.get('[data-qa="login-button"]').click()
})