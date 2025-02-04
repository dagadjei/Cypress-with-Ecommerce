import { faker} from '@faker-js/faker'
import categories from '../fixtures/categories.json'
import brands from '../fixtures/brands.json'

let productCount 

describe('Accessibility Tests', () => {
    beforeEach(() => {
        cy.visit('https://automationexercise.com/')
    })

    it('Scroll to Bottom', () => {
        cy.scrollTo('bottom')
    })
});