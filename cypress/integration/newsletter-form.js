describe("Fill the newsletter form and submit", () => {
  it("enters the email and submit", () => {
    cy.visit("/explore");
    cy.contains("Subscribe to our Newsletter").scrollIntoView().wait(1000);
    cy.get(".flex > .px-2").type("test@cypress.com");
    cy.get('.flex > span > .py-1').click()
    // cy.contains("We've sent you an email. Please click the link provided to confirm your email")
    cy.contains("You have been subscribed to our mailing list already");
  });
});
