import { faker } from '@faker-js/faker'
import user from '../fixtures/user.json'

describe('User Registration and Login', () => {

  beforeEach(() => {
    cy.visit('https://automationexercise.com/')
  })
  
  it('Register', () => {
   cy.registerUser(faker.person.firstName(), faker.internet.email())
  })
  
  it('Login with valid Credentials', () => {
    cy.login()
    cy.contains('Logged in').should('be.visible')
  })

  it('Login with invalid credentials', () => {
    cy.contains('Login').click()
    cy.get('[data-qa="login-email"]').type(faker.internet.email())
    cy.get('[data-qa="login-password"]').type(faker.internet.password())
    cy.get('[data-qa="login-button"]').click()
    cy.get('.login-form > form > p').contains('Your email or password is incorrect');
  })

  it('Logout user', () => {
    cy.login()
    cy.contains('Logout').click()
    cy.url().should('include', '/login')
  })

  it('Register with existing email', () => {
    cy.contains('Signup').click()
    cy.get('[data-qa="signup-name"]').type(user.name)
    cy.get('[data-qa="signup-email"]').type(user.email)
    cy.get('[data-qa="signup-button"]').click()
    cy.contains('Email Address already exist!').should('be.visible')
  })
})


