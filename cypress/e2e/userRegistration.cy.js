import { faker } from '@faker-js/faker'
import user from '../fixtures/user.json'

let randomFirstname = faker.name.firstName()
let randomLastname = faker.name.lastName()
let randomCompanyName = faker.company.name()
let randomAddress = faker.address.streetAddress()
let randomAptNum = faker.address.buildingNumber()
let randomDayInMonth = Math.floor(Math.random() * (31) + 1);
let randomMonthValue = Math.floor(Math.random() * (12) + 1);
//let randomYear = Math.floor(Math.random() * (100) + 1) + 1900


describe('User Registration and Login', () => {

  beforeEach(() => {
    cy.visit('https://automationexercise.com/')
  })

  it('Register', () => {
    cy.contains('Signup').click()
    cy.get('[data-qa="signup-name"]').type(randomFirstname)
    cy.get('[data-qa="signup-email"]').type(faker.internet.email())
    cy.get('[data-qa="signup-button"]').click()
    cy.get('[data-qa="password"]').type('autoexerpass123')
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
  })

  it('Login with valid Credentials', () => {
    cy.contains('Login').click()
    cy.get('[data-qa="login-email"]').type(user.email)
    cy.get('[data-qa="login-password"]').type(user.password)
    cy.get('[data-qa="login-button"]').click()
  })

  it('Login with invalid credentials', () => {
    cy.contains('Login').click()
    cy.get('[data-qa="login-email"]').type(faker.internet.email())
    cy.get('[data-qa="login-password"]').type(faker.internet.password())
    cy.get('[data-qa="login-button"]').click()
    cy.get('.login-form > form > p').contains('Your email or password is incorrect');
  })
})


