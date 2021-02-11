const adminEmail = "adarsh@cloudyuga.guru";

const userLogin = (currentEmail) => {
  cy.visit("/backstage/courses");

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

describe("Remove all the data created during testing", () => {
  before(() => userLogin(adminEmail));

  beforeEach(() => {
    Cypress.Cookies.preserveOnce("_cloudyuga_session");
  });

  it("deletes the created courses during testing", () => {
    cy.reload();

    cy.contains("Test Cypress 1")
      .parent()
      .parent()
      .parent()
      .children()
      .then(($child) => {
        cy.get($child)
          .children()
          .find('img[title="Delete Course"]')
          .click({ force: true });
      });

    cy.url().should("include", "/backstage/courses");

    cy.reload();

    cy.contains("Test Cypress 2")
      .parent()
      .parent()
      .parent()
      .children()
      .then(($child) => {
        cy.get($child)
          .children()
          .find('img[title="Delete Course"]')
          .click({ force: true });
      });

    cy.url().should("include", "/backstage/courses");
  });
});
