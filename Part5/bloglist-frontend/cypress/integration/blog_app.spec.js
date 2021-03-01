describe('Blog app', function() {

    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('Log in to application')
        cy.contains('username')
        cy.contains('password')
        cy.contains('login')
    })

    describe('Login',function() {

        it('Succeeds with correct credentials', function() {
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()
            cy.contains('Matti Luukkainen logged in')
        })

        it('Fails with wrong credentials', function() {
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()
            cy.contains('Wrong username or password')
        })
    })

    describe('When logged in', function() {

        beforeEach(function() {
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()
        })

        it('A blog can be created', function() {
            cy.contains('create new blog').click()
            cy.get('#newTitle').type('Test Blog')
            cy.get('#newAuthor').type('Cypress')
            cy.get('#newUrl').type('https://www.blogtest.com')
            cy.contains('add').click()
            cy.contains('New blog: Test Blog by Cypress')
            cy.contains('show')
        })

        describe('When there is a blog created', function(){

            beforeEach(function() {
                cy.contains('create new blog').click()
                cy.get('#newTitle').type('Test Blog')
                cy.get('#newAuthor').type('Cypress')
                cy.get('#newUrl').type('https://www.blogtest.com')
                cy.contains('add').click()
            })

            it('A blog can be liked', function() {
                cy.contains('show').click()
                cy.contains('likes 0')
                cy.contains('like').click()
                cy.contains('likes 1')
            })

            it('A blog can be deleted', function() {
                cy.contains('show').click()
                cy.contains('like').click()
                cy.contains('remove').click()
                cy.visit('http://localhost:3000')
                cy.contains('Test Blog').should('not.exist')
            })
        })
    })
})