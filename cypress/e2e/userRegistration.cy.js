describe('User Registration and Login', () => {
  it('Register', () => {
    cy.visit('https://automationexercise.com/')
    cy.contains('Signup').click()
    cy.get('[data-qa="signup-name"]').type('deetest')
    cy.get('[data-qa="signup-email"]').type('adjeidag+90@gmail.com')
    cy.get('[data-qa="signup-button"]').click()
    cy.get('[data-qa="password"]').type('autoexerpass123')
  })
})