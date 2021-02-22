describe("User registration process", () => {
  it("fills in the details on the sign up page", () => {
    cy.visit("/explore");
    cy.contains("Sign Up").click();

    const password = Cypress.env("user_password");

    cy.get('input[name="user[email]"]')
      .type("adarsh2858@gmail.com")
      .should("have.value", "adarsh2858@gmail.com");
    cy.get('input[name="user[first_name]"]')
      .type("John")
      .should("have.value", "John");
    cy.get('input[name="user[last_name]"]')
      .type("Doe")
      .should("have.value", "Doe");;

    cy.scrollTo('center').wait(500);

    cy.get('input[name="user[password]"]').type(password);

    // Work on bypassing the captcha verification during the sign up process
    // cy.get('span[role="checkbox"]').click()
    // cy.get('div[class="recaptcha-checkbox-border"]').click()
  });
});
