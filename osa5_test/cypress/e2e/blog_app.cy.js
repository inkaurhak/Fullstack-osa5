describe('Blog app ', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user1 = {
      name: 'Amelia Lawson',
      username: 'amelie',
      password: 'salasana'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user1)

    const user2 = {
      name: 'Ethan Parker',
      username: 'ethanp',
      password: 'salasana'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user2)

    cy.visit('')
  })
  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.login({ username: 'amelie', password: 'salasana'})

      cy.get('html').should('contain', 'Amelia Lawson logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('amelie')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').contains('wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'amelie', password: 'salasana'})
    })

    it('a blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('React patterns')
      cy.get('#author').type('Michael Chan')
      cy.get('#url').type('https://reactpatterns.com/')

      cy.get('#create-button').click()
      cy.contains('React patterns Michael Chan')
        .should('contain', 'view')
    })

    describe('When there are blogs', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'React patterns',
          author: 'Michael Chan',
          url: 'https://reactpatterns.com/'
        })

        cy.createBlog({
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
        })
      })

      it('a blog can be liked', function() {
        cy.contains('Go To Statement Considered Harmful')
          .contains('view')
          .click()

        cy.contains('0')
        cy.get('#like').click()
        cy.contains('1')
      })

      it('a blog can be removed by the person who added it', function() {
        cy.contains('React patterns Michael Chan')
          .contains('view')
          .click()

        cy.contains('remove')
          .click()
        
        cy.contains('React patterns Michael Chan').should('not.exist')
      })

      it('remove button is only seen by the user that added the blog', function() {
        cy.get('#logout').click()
        cy.login({ username: 'ethanp', password: 'salasana'})

        cy.contains('React patterns Michael Chan')
          .contains('view')
          .click()

        cy.contains('Amelia Lawson')
          .should('not.contain', 'remove')
      })
      
      it('blogs are in order of likes', function() {
        cy.contains('React patterns')
          .get('#view').click()
        cy.contains('Go To Statement Considered Harmful')
          .get('#view').click()

        cy.get('.blogVisible').eq(0).as('topBlog')
        cy.get('@topBlog').contains('React patterns')
        cy.get('@topBlog').contains('0')

        cy.get('.blogVisible').eq(1).as('secondBlog')
        cy.get('@secondBlog').contains('Go To Statement Considered Harmful')
        cy.get('@secondBlog').contains('0')
        cy.get('@secondBlog').contains('like')
          .click()
          .click()

        cy.get('.blogVisible').eq(0).as('newTopBlog')
        cy.get('@newTopBlog').contains('Go To Statement Considered Harmful')
        cy.get('@newTopBlog').contains('2')
      })
    })
  })
})