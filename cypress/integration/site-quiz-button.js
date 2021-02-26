describe("Testing site quiz", () => {
  it("clicks on the site quiz button", () => {
    cy.visit("/explore");
    cy.contains("Quizzes").scrollIntoView().wait(1000);

    cy.contains("Take Quiz").click()

    cy.url().should("include", "/devise/users/sign_in")
  });
});
