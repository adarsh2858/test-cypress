// import { userLogin } from './course-creation'

const adminEmail = "adarsh@cloudyuga.guru";

const userLogin = (currentEmail) => {
  cy.visit("https://adarsh.staging.tveacher.com/backstage/courses");

  cy.url().should("include", "/sign_in");

  cy.get('div[id="flash_alert"]').should((content) => {
    expect(content).to.contain(
      "You need to sign in or sign up before continuing."
    );
  });

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

describe("add course content", () => {
  before(() => userLogin(adminEmail));

  beforeEach(() => {
    Cypress.Cookies.preserveOnce("_cloudyuga_session");
  });

  it("adds new section and chapter to a course on its course-contents page", () => {
    cy.contains("Test Cypress")
      .parent()
      .contains("Add/Edit Content")
      .click({ force: true });

    cy.contains("Add Section").click();

    cy.contains("Untitled Section").click();
    cy.get('input[name="sections.0.name"]')
      .clear()
      .type("Test Cypress Section");

    cy.contains("Add Chapter").click({ force: true });

  });

  it("adds content to an existing chapter", () => {
    cy.contains("Chapter 1").click({ force: true });

    cy.get('input[name="sections.0.chapters.0.name"]')
      .clear({ force: true })
      .type("Test Cypress Chapter")
      .should("have.value", "Test Cypress Chapter");

    // cy.get('div[data-placeholder="Enter the content here"]')
    //   .clear({ force: true })
    //   .type("Test Cypress");

    cy.get('div[class="codex-editor__redactor"]')
      .click()
      .type("Test Cypress content {enter}");
    
    cy.get('div[class="codex-editor__redactor"]')
      .click()
      .type("Test Cypress content {enter}");

    // cy.visualSnapshot("Course contents page");

    cy.get('input[name = "sections.0.chapters.0.published"]').click({
      force: true,
    });

    cy.contains("Save").click();

    cy.contains("Preview Course").click({ force: true });
  })
});
