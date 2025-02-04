//Tests for Accessibility for the page

describe('Accessibility Tests', () => {
    beforeEach(() => {
        cy.visit('https://automationexercise.com/')
    })
    
    it('Scroll to Bottom', () => {
        cy.scrollTo('bottom')
        cy.get('h2').contains('Subscription').should('be.visible')
        cy.scrollTo('top')
        cy.get('h2').contains('Full-Fledged practice website for Automation Engineers').should('be.visible')
    })

    it('Scroll Up Using up Arrow', () => {
        cy.scrollTo('bottom')
        cy.get('#scrollUp > .fa').click()
    })
});