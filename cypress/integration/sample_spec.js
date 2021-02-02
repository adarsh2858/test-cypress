// Cypress.Commands.add('login', (overrides = {}) => {
  Cypress.Commands.add('login', (csrfToken) => {
  Cypress.log({
    name: 'loginViaAuth0',
  });

  cy.request({
    method: 'POST',
    url: 'https://adarsh.staging.tveacher.com/devise/users/sign_in',
    failOnStatusCode: false, // dont fail so we can make assertions
    form: true, // we are submitting a regular form body
    body: {
      username:"adarsh@cloudyuga.guru",
      password:"test1234",
      _csrf: csrfToken, // insert this as part of form body
    },
  })

  // const options = {
  //   method: 'POST',
  //   url: Cypress.env('auth_url'),
  //   body: {
  //     grant_type: 'password',
  //     username: Cypress.env('auth_username'),
  //     password: Cypress.env('auth_password'),
  //     audience: Cypress.env('auth_audience'),
  //     scope: 'openid profile email',
  //     client_id: Cypress.env('auth_client_id'),
  //     client_secret: Cypress.env('auth_client_secret'),
  //   },
  // };
  // cy.request(options);
});

describe("My first test", function() {
    it("Visit", function() {
        // Arrange - setup initial app state
        // - visit a web page
        // Act - take an action
        // - query for an element
        // interact with that element
        // Assert - make an assertion
        // make an asssertion about page content

        // expect(true).to.equal(true);
        
        cy.visit("https://adarsh.staging.tveacher.com/backstage/courses")
        // cy.request("https://adarsh.staging.tveacher.com/devise/users/sign_in")
        // cy.contains('foobar').click()

        cy.url()
          .should('include', '/sign_in')

        // Login As Admin

        cy.get('input[name="user[email]"]')
          .type("adarsh@cloudyuga.guru")
          .should('have.value', "adarsh@cloudyuga.guru")

        // Login As Student

        // cy.get('input[name="user[email]"]')
        //   .type("adarsh2858@gmail.com")
        //   .should('have.value', "adarsh2858@gmail.com")
        
        cy.get('input[name="user[password]"]')
          .type("test1234")
          .should('have.value', "test1234")

        // cy.clearCookies()

        // cy.login()
        cy.get('input[value="Login"]').click()
        // cy.visit("https://adarsh.staging.tveacher.com/backstage/courses")


        cy.url()
          .should('include', '/backstage')

        
        // cy.visit("https://adarsh.staging.tveacher.com/explore")
        // cy.url()
        //   .should('include', '/explore')

        
        // cy.scrollTo('bottom')
        // cy.wait(100)
        
        // cy.contains('Get More Info')
        //   .scrollIntoView()
        //   .then( () =>
        //     cy.contains('Get More Info')
        //       .should('be.visible')
        //       .click({force: true})
        //   )


        // cy.contains('Test Clone Supporting Files Chapter').scrollIntoView()
        // cy.contains('Test Clone Supporting Files Chapter').click({force: true })
        
        // cy.url()
        //   .should('include', '/interactive')

        // cy.contains('Next').click()
        // cy.contains('Previous').click()

        // cy.contains('FAQ').click()

        // cy.url()
        //   .should('include', '/backstage/faqs')

        // cy.contains("Homepage Builder").click()
        // cy.contains("Build Homepage").click()
        // cy.url()
        //   .should('include', '/home_page_builder')


        // cy.contains("Homepage Builder").click()
        // cy.contains("About Us").click()
        // cy.url()
        //   .should('include', '/about_us')
        //   .should('include', '/edit')


        // cy.contains("Homepage Builder").click()
        // cy.contains("Testimonials").click()
        // cy.url()
        //   .should('include', '/testimonials')


        // cy.contains("Homepage Builder").click()
        // cy.contains("Site Announcements").click()
        // cy.url()
        //   .should('include', '/site_announcements')


        // cy.contains("Homepage Builder").click()
        // cy.contains("Site Quiz").click()
        // cy.url()
        //   .should('include', '/backstage/site_quizzes')


        cy.contains("Courses").click()
        cy.contains("Create New Course").click()

        cy.get('input[name="basicInfo.title"]')
          .type("Test Cypress")
          .should('have.value', "Test Cypress")
        
        cy.get('input[name="basicInfo.shortDescription"]')
          .type("Test Cypress")
          .should('have.value', "Test Cypress")

        cy.get('div[data-placeholder="Enter long description"]')
          .type("Test Cypress")
          .should('have.value', "Test Cypress")
        
        cy.get('input[name="basicInfo.courseIdSymlink"]')
          .clear({force: true})
          .type("Test Cypress")
          .should('have.value', "Test Cypress")

        cy.contains('Save').click({force: true})
        cy.contains('Test Cypress')
          .parent()
          .contains('Add/Edit Content')
          .click({force: true})
        
        cy.contains('Add Section')
          .click()
        
        cy.contains('Untitled Section')
          .click()
        
        cy.contains('Add Chapter')
          .click()

        cy.contains('Chapter 1')
          .click()
        
        cy.get('input[name="sections.0.chapters.0.name"]')
          .clear({force: true})
          .type("Test Cypress")
          .should('have.value', "Test Cypress")

        cy.get('div[data-placeholder="Enter the content here"]')
          .clear()
          .type("Test Cypress")

        cy.get('input[name = "sections.0.chapters.0.published"]')
          .click({force: true})

        cy.contains("Save").click()

        cy.contains("Preview Course").click({force: true})

        // cy.contains("User Management")
        //   .click()
        
        // cy.contains("Authors")
        //   .click()
        
        // cy.contains("Add New Author")
        //   .click()
        
        // cy.get('input[name = "author[name]"]')
        //   .type("Emma Watson")

        // The click on checkbox is not working
        
        // cy.get('input[name = "author[show_on_homepage]"]')[0]
        //   ?.click({force: true})

        // Upload image

        // cy.get('input[name = "author[image]"]')
        //   .click()
        
      })
})
