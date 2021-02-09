// Look for a way to import the similar function defined in the course-creation file
// It should not run the entire file's describe/it blocks
// import { userLogin } from './course-creation';
// console.log(userLogin)

const studentEmail = "nilam2267@gmail.com";

const userLogin = (currentEmail) => {
    cy.visit("https://adarsh.staging.tveacher.com/backstage/courses");
  
      cy.url().should("include", "/sign_in");
  
      const adminPassword = Cypress.env("user_password");
  
      cy.get('input[name="user[email]"]')
        .type(currentEmail)
        .should("have.value", currentEmail);
  
      // Login As Student
  
      cy.get('input[name="user[password]"]')
        .type(adminPassword)
        .should("have.value", adminPassword);
  
      cy.get('input[value="Login"]').click();
  }

describe("Login to the staging setup", () => {
    it("logs in as a student", () => {
      userLogin(studentEmail);
    });

    it('checks for the error message', () => {
        cy.get('div[id="flash_alert"]')
          .should((content) => {
              expect(content).to.contain('Unauthorized Access!')
          })
    })
  });

describe("Visit the homepage and interact with different elements", () => {
    before(() => userLogin(studentEmail));

    beforeEach(() => {
        Cypress.Cookies.preserveOnce("_cloudyuga_session");
      })
    it("visits the my courses page then the homepage", () => {
        cy.contains("My Courses").click();
        cy.url()
          .should("include", '/my/courses')
        cy.contains("Home").click();
        cy.url()
          .should("include", '/explore')
    });

    it ("views the course overview page of all the courses", () => {
    })
})
