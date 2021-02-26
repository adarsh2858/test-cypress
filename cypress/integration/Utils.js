export const userLogin = (currentEmail) => {
  cy.visit("/explore");

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
