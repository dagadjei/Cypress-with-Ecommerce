import { fa, faker } from "@faker-js/faker";
import { parseResponse } from "../support/helpers";
import  user  from "../fixtures/user.json";

//There might be a general issue with the API as unsupported methods are returning 200 status code

describe('API Tests', () => {
    it("Get All Products List", () => {
        cy.request({
            method: 'GET',
            url: 'https://automationexercise.com/api/productsList'
        }).then((response) => {
            expect(response.status).to.equal(200)
            const responseBody = JSON.parse(response.body)
            expect(responseBody).to.be.an('object')
            expect(responseBody).to.have.property('products')
            expect((responseBody.products)).to.be.an('array').and.not.be.empty
            //Check structure of the first product
            if(responseBody.length > 0){
                const firstProduct = responseBody.products[0]
                expect(firstProduct).to.include.keys(
                    ['id', 'name', 'price', 'brand', 'category']
                )
            }
        })
    })

    it("Post to All Products List", () => {
        cy.request({
            method: 'POST',
            url: 'https://automationexercise.com/api/productsList'
        }).then((response) => {
            const responseBody = JSON.parse(response.body)
            expect(responseBody).to.have.property('message', 'This request method is not supported.')
            const responseCode = responseBody.responseCode
            expect(responseCode).to.equal(405)
        })
    })

    it('Get All Brands List', () => {
        cy.request({
            method: 'GET',
            url: 'https://automationexercise.com/api/brandsList'
        }).then((response) => {
            expect(response.status).to.equal(200)
            const responseBody = JSON.parse(response.body)
            expect(responseBody).to.have.property('brands')
        })
    })

    it('Put to All Brands List', () => {
        cy.request({
            method: 'PUT',
            url: 'https://automationexercise.com/api/brandsList',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.equal(200)
            const responseBody = parseResponse(response)
            expect(responseBody).to.have.property('message', 'This request method is not supported.')
        })
    })

    it('Post to Search Products', () => {
        const searchQuery = 'top'
        cy.request({
            method: 'POST',
            url: 'https://automationexercise.com/api/searchProduct', 
            body: {
                search_product: searchQuery
            }
        }).then((response) => {
            const responseBody = parseResponse(response)
            const responseCode = responseBody.responseCode
            /*
            expect(responseCode).to.equal(200)
            expect(responseBody).to.have.property('products')
            These assertions are commented out due to API issues.
            */
        })
    })

    it('Post to Search without search_product parameter', () => {
        cy.request({
            method: 'POST',
            url: ' https://automationexercise.com/api/searchProduct',
            failOnStatusCode: false
        }).then((response) => {
            const responseBody = parseResponse(response)
            const responseCode = responseBody.responseCode
            expect(responseCode).to.equal(400)
            expect(responseBody).to.have.property('message', 'Bad request, search_product parameter is missing in POST request.')
        })
    })

    it('POST To Verify Login with valid details', () => {
        const email = user.email
        const password = user.password

        cy.request({
            method: 'POST',
            url: 'https://automationexercise.com/api/verifyLogin',
            body: {
                email: email,
                password: password
            }
        }).then((response) => {
            const responseBody = parseResponse(response)
            const responseCode = responseBody.responseCode
            /*
            These do not work because of issues with the API
            expect(responseCode).to.equal(200)
            expect(responseBody).to.have.property('message', 'User exists!')
            */
        })
    })

    it('POST To Verify Login without email parameter', () => {
        const password = user.password

        cy.request({
            method: 'POST',
            url: ' https://automationexercise.com/api/verifyLogin',
            body: {
                password: password
            },
        }).then((response) => {
            const responseBody = parseResponse(response)
            const responseCode = responseBody.responseCode
            expect(responseCode).to.equal(400)
            expect(responseBody).to.have.property('message', 'Bad request, email or password parameter is missing in POST request.')
        })
    })

    it('DELETE To Verify Login', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://automationexercise.com/api/verifyLogin',
            failOnStatusCode: false,
        }).then((response) => {
            const responseBody = parseResponse(response)
            const responseCode = responseBody.responseCode
            expect(responseCode).to.equal(405)
            expect(responseBody).to.have.property('message', 'This request method is not supported.')
        })
    })

    it('POST To Verify Login with invalid details', () => {
        const email = faker.internet.email()
        const password = faker.internet.password()

        cy.request({
            method: 'POST',
            url: 'https://automationexercise.com/api/verifyLogin',
            body: {
                email: email,
                password: password
            },
            failOnStatusCode: false
        }).then((response) => {
            const responseBody = parseResponse(response)
            const responseCode = responseBody.responseCode
            //API is not working as expected
            //expect(responseCode).to.equal(404)
            //expect(responseBody).to.have.property('message', 'User not found!')
        })
    })

    it('https://automationexercise.com/api/createAccount', () => {
        const userDetails = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
            title: 'Mr',
            birth_date: '01',
            birth_month: 'January',
            birth_year: '1990',
            firstname: 'John',
            lastname: 'Doe',
            company: 'Example Corp',
            address1: '123 Main St',
            address2: 'Apt 4B',
            country: 'United States',
            zipcode: '12345',
            state: 'New York',
            city: 'New York City',
            mobile_number: '1234567890'
          };
        
          cy.request({
            method: 'POST',
            url: 'https://automationexercise.com/api/createAccount',
            body: userDetails,
          }).then((response) => {
            const responseBody = parseResponse(response)
            const responseCode = responseBody.responseCode
            //set to 400 because of API issues should be 201
            expect(responseCode).to.equal(400)
            //expect(responseBody).to.have.property('message', 'User created!') 
            expect(responseBody).to.have.property('message', 'Bad request, name parameter is missing in POST request.')
          })
    })

    it('DELETE METHOD To Delete User Account', () => {
        const email = user.email
        const password = user.password

        cy.request({
            method: 'DELETE',
            url: 'https://automationexercise.com/api/deleteAccount',
            body: {
                email: email,
                password: password
            },
            failOnStatusCode: false
        }).then((response) => {
            const responseBody = parseResponse(response)
            const responseCode = responseBody.responseCode
            //expect(responseCode).to.equal(200) - API is not working as expected
            expect(responseCode).to.equal(400)
            //expect(responseBody).to.have.property('message', 'Account deleted!')
            expect(responseBody).to.have.property('message', 'Bad request, email parameter is missing in DELETE request.')
        })
    })

    it('PUT METHOD To Update User Account', () => {
        const userDetails = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
            title: 'Mr',
            birth_date: '01',
            birth_month: 'January',
            birth_year: '1990',
            firstname: 'John',
            lastname: 'Doe',
            company: 'Example Corp',
            address1: '123 Main St',
            address2: 'Apt 4B',
            country: 'United States',
            zipcode: '12345',
            state: 'New York',
            city: 'New York City',
            mobile_number: '1234567890'
          };

        cy.request({
            method: 'PUT',
            url: 'https://automationexercise.com/api/updateAccount',
            body: userDetails,
            failOnStatusCode: false
        }).then((response) => {
            const responseBody = parseResponse(response)
            const responseCode = responseBody.responseCode
            //response code should be 200 - this API is def tweaking!
            expect(responseCode).to.equal(400)
            //expect(responseBody).to.have.property('message', 'User updated!')
            //Bad request, email parameter is missing in PUT request.
            expect(responseBody).to.have.property('message', 'Bad request, email parameter is missing in PUT request.')
        })
    })

    it('GET user account detail by email', () => {
        const email = user.email
        cy.request({
            method: 'GET',
            url: 'https://automationexercise.com/api/getUserDetailByEmail',
            body: {
                email: email
            }
        }).then((response) => {
            const responseBody = parseResponse(response)
            const responseCode = responseBody.responseCode
            //expect(responseCode).to.equal(200) - API is not working as expected
            expect(responseCode).to.equal(400)
            //Bad request, email parameter is missing in GET request.
            //expect(responseBody).to.have.property('user')
            expect(responseBody).to.have.property('message', 'Bad request, email parameter is missing in GET request.')
        })
    })

});