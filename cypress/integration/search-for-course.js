describe("Search for a course", () => {
  it("searches for a course", () => {
    cy.visit("/explore");
    cy.get("#all-courses").scrollIntoView().wait(1000);

    cy.get("input[placeholder='Search Courses']").type("test");

    cy.get(".search-courses")
      .children()
      .then(($child) => {
        if ($child.children().length > 0) {
          let totalCourses = $child.children().length;

          while (totalCourses) {
            cy.get(
              `.featured-courses > :nth-child(${totalCourses--}) > .featured-card > .px-4 > .font-display`
            ).contains("Test", { matchCase: false });
          }
        } else console.log("No courses found");
      });
  });
});
