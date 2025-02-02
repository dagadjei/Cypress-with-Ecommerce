import user from '../fixtures/user.json'
import { faker } from '@faker-js/faker'


let randomFirstname = faker.name.firstName()
let randomLastname = faker.name.lastName()
let randomCompanyName = faker.company.name()
let randomAddress = faker.address.streetAddress()
let randomAptNum = faker.address.buildingNumber()
let randomPassword = faker.internet.password()
let randomDayInMonth = Math.floor(Math.random() * (31) + 1);
let randomMonthValue = Math.floor(Math.random() * (12) + 1);

Cypress.env('randomAddress', randomAddress)
//let randomYear = Math.floor(Math.random() * (100) + 1) + 1900

Cypress.Commands.add('login', () => {
    cy.contains('Login').click()
    cy.get('[data-qa="login-email"]').type(user.email)
    cy.get('[data-qa="login-password"]').type(user.password)
    cy.get('[data-qa="login-button"]').click()
})

Cypress.Commands.add('registerUser', (name, email) => {
    cy.get('[data-qa="signup-name"]').type(name)
    cy.get('[data-qa="signup-email"]').type(email)
    cy.get('[data-qa="signup-button"]').click()
    cy.get('[data-qa="password"]').type(randomPassword)
    cy.get('[data-qa="days"]').select(randomDayInMonth)
    cy.get('[data-qa="months"]').select(randomMonthValue)
    cy.get('[data-qa="years"]')
      .select('1988')
    cy.get('label[for="first_name"]').type(randomFirstname)
    cy.get('label[for="last_name"]').type(randomLastname)
    cy.get('[data-qa="company"]').type(randomCompanyName)
    cy.get('[data-qa="address"]').type(randomAddress)
    cy.get('[data-qa="address2"]').type(randomAptNum)
    cy.get('[data-qa="country"]').select([Math.floor(Math.random() * 6) + 1])
    cy.get('[data-qa="state"]').type(faker.address.state())
    cy.get('[data-qa="city"]').type(faker.address.city())
    cy.get('[data-qa="zipcode"]').type(faker.address.zipCode())
    cy.get('[data-qa="mobile_number"]').type(faker.phone.number())
    cy.get('[data-qa="create-account"]').click()
    cy.contains('Account Created').should('be.visible')
    cy.get('[data-qa="continue-button"]').click()
})

Cypress.Commands.add('goToProductPage', () => {
    cy.contains('Products').click()
    cy.url().should('include', '/products')
    cy.contains('h2', 'All Products')
})

Cypress.Commands.add('proceedToCheckout', () => {
    cy.get('.col-sm-6 a').click()
})

Cypress.Commands.add('addItemsToCart', () => {
    cy.get('.features_items .col-sm-4').then(($items) => {
        let totalProducts = $items.length
        const numOfItemsToAddToCart = Math.floor(Math.random() * 4) + 1
        for(let i = 0; i < numOfItemsToAddToCart; i++){
            const randomProduct = Math.floor(Math.random() * totalProducts)
            cy.get('.features_items .col-sm-4').eq(randomProduct).within(() => {
                cy.get('a[data-product-id]').first().click()
            })
            cy.contains('Continue Shopping').click()
        }
    })
})

Cypress.Commands.add('makePayment', () => {

    let newUserFirstName = faker.person.firstName()
    let newUserEmail = faker.internet.email()
    let randomMonthValue = Math.floor(Math.random() * 12) + 1
    let randomYear = Math.floor(Math.random() * (2030 - 2025) + 1) + 2025
    
    cy.url().should('include', '/checkout')
    cy.get('.form-control').type(faker.lorem.sentence(10))
    cy.get('.container a[href="/payment"]').click()
    cy.get('[data-qa="name-on-card"]').type(newUserFirstName)
    cy.get('[data-qa="card-number"]').type(faker.finance.creditCardNumber())
    cy.get('[data-qa="cvc"]').type(faker.finance.creditCardCVV())
    cy.get('[data-qa="expiry-month"]').type(randomMonthValue)
    cy.get('[data-qa="expiry-year"]').type(randomYear)
    cy.get('[data-qa="pay-button"]').click()
    cy.url().should('include', '/payment_done')
})

Cypress.Commands.add('continueAfterMakeingPayment', () => {
    cy.get('[data-qa="continue-button"]').click()
})

Cypress.Commands.add('downloadInvoice', () => {
    cy.get('.col-sm-9 > .btn-default').click()
})