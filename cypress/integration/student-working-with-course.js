// Look for a way to import the similar function defined in the course-creation file
// It should not run the entire file's describe/it blocks
// import { userLogin } from './course-creation';
// console.log(userLogin)

const studentEmail = "nilam2267@gmail.com";

const userLogin = (currentEmail) => {
  cy.visit("/");

  cy.contains("Log In").click();

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
};

describe("Login to the staging setup", () => {
  it("logs in as a student", () => {
    userLogin(studentEmail);
  });

  it("checks for the error message", () => {
    cy.get('div[id="flash_alert"]').should((content) => {
      expect(content).to.contain("Unauthorized Access!");
    });
  });
});

describe("Visit the homepage and interact with different elements", () => {
  before(() => userLogin(studentEmail));

  beforeEach(() => {
    Cypress.Cookies.preserveOnce("_cloudyuga_session");
  });
  it("visits the my courses page then the homepage", () => {
    cy.contains("My Courses").click();
    cy.url().should("include", "/my/courses");
    cy.contains("Home").click();
    cy.url().should("include", "/explore");
  });

  it("views the course overview page of all the courses", () => {});

  it.only("enrolls to a course", () => {
    cy.contains("Home").click();
    cy.scrollTo("center").wait(1000);
    cy.get("div")
      .contains("Test Cypress 1")
      .parent()
      .contains("Get More Info")
      .click({ force: true });

    cy.get(
      'a[class="cursor-pointer inline-flex uppercase no-underline hover:no-underline justify-center py-1 px-3 border-2 hover:border-blue-600 hover:text-white leading-5 text-xs font-medium rounded-full hover:bg-blue-600 focus:outline-none focus:border-blue-600 focus:shadow-outline-indigo active:bg-blue-600 transition duration-150 ease-in-out hover:whitener w-full mb-2"]'
    ).click({ force: true });
    cy.url().should("include", "/confirm_enrollment");

    cy.get(
      'a[class="cursor-pointer inline-flex uppercase no-underline hover:no-underline justify-center py-2 px-4 border border-transparent leading-5 font-medium rounded-full text-xs text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:shadow-outline-indigo active:bg-blue-700 transition duration-150 ease-in-out my-3"]'
    ).click();
    cy.url().should("include", "/my/courses");
  });

  it("access the course which the student enrolled", () => {
    cy.contains("Test Cypress 1")
      .parent()
      .parent()
      .parent()
      .children()
      .children()
      .then(($child) => {
        cy.scrollTo("center").wait(1000);

        cy.get($child[1]).children().contains("Access Course").click();
      });

    cy.contains("Previous").click();

    cy.get('div[class="Toastify__toast-body"]').should((content) => {
      expect(content).to.contain("Beginning of the course");
    });

    cy.contains("Next").click();
  });
});
