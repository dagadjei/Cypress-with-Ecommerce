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
            expect(response.status).to.equal(200)
            const responseBody = JSON.parse(response.body)
            expect(responseBody).to.have.property('message', 'This request method is not supported.')
        })
    })
});