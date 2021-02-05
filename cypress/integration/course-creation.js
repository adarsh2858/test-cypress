
// Add the following in the root file outside of it block inside describe block
// beforeEach( () => {
    // cy.visit('/') // this root will take the baseURL from the cypress.json file
// })


describe("Login to the staging setup", () => {

    it("login as admin", () => {
        cy.visit("https://adarsh.staging.tveacher.com/backstage/courses");
        cy.url().should("include", "/sign_in");

        const adminEmail = "adarsh@cloudyuga.guru";
        const adminPassword = "test1234";

        cy.get('input[name="user[email]"]')
            .type(adminEmail)
            .should("have.value", adminEmail);

        // Login As Student

        cy.get('input[name="user[password]"]')
            .type(adminPassword)
            .should("have.value", adminPassword);

        cy.get('input[value="Login"]').click();
    })
})

describe("Create a new course with all the course parameters modified", () => {

    it('add basic info', () => {
        
    })

    it('tick few authors if found', () => {
        
    })

    it('add pricing and validity', () => {
        
    })

    it('modify configurable parameters', () => {
        
    })

    it('fill course show page information', () => {
        
    })

    it('add tags', () => {
        
    })

    it('check feature flage', () => {
        
    })
})