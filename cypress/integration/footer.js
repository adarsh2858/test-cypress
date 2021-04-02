describe("Check for the working footer links", () => {
  it("clicks on the email", () => {
    cy.visit("/");
    cy.scrollTo("bottom");
    cy.get(".bg-brand > .container")
      .children()
      .children()
      .then((child) => {
        console.log(child);
          cy.get(child).children().then((grandChild) => {
            console.log(grandChild);
            // grandChild.contains("Contact Us");
          })
        //   console.log("Success");
        // else console.log("Failure");
      });
    cy.get(".col-span-3").children().then;
  });
});
