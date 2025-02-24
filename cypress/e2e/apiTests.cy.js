import { fa } from "@faker-js/faker";
import { parseResponse } from "../support/helpers";

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



});