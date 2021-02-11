// Add the following in the root file outside of it block inside describe block
// beforeEach( () => {
// cy.visit('/') // this root will take the baseURL from the cypress.json file
// })

const adminEmail = "adarsh@cloudyuga.guru";
const studentEmail = "adarsh2858@gmail.com";

const userLogin = (currentEmail) => {
  cy.visit("https://adarsh.staging.tveacher.com/backstage/courses");

    cy.url().should("include", "/sign_in");

    cy.get('div[id="flash_alert"]')
      .should((content) => {
        expect(content).to.contain('You need to sign in or sign up before continuing.');
    })

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
  it("logs in as an admin", () => {
    userLogin(adminEmail);
  });

  it("logs in as a student", () => {
    userLogin(studentEmail);
  });
});

describe("Create a new course with all the course parameters modified", () => {
  before(() => userLogin(adminEmail));

  beforeEach(() => {
    Cypress.Cookies.preserveOnce("_cloudyuga_session");
  })

  it("creates a new course", () => {
    cy.contains("Create New Course").click();
    console.log("HELLO WORLD");
  });

  it("adds a basic info for the course", () => {
    const courseName = "Test Cypress 1";

    cy.get('input[name="basicInfo.title"]')
      .type(courseName)
      .should("have.value", courseName);

    cy.get('input[name="basicInfo.shortDescription"]')
      .type(courseName)
      .should("have.value", courseName);

    cy.get('div[data-placeholder="Enter long description"]').type(courseName);

    cy.get('input[name="basicInfo.courseIdSymlink"]')
      .clear({ force: true })
      .type(courseName)
      .should("have.value", courseName);
  });

  it("ticks two authors if found", () => {
    let i = 1;
    cy.contains("Author Information").click({ force: true });

    cy.get('input[name="authorInfo.assignedAuthorIds"]').each((author) => {
      author.click();

      // Select only the first two authors
      if (++i == 3) {
        return false;
      }
    });
  });

  it("adds different pricing and validity", () => {
    cy.contains("Pricing and Validity").click({ force: true });

    cy.scrollTo("center").wait(1000);

    cy.get('select[name="pricingAndValidityInfo.priceCurrency"]').select("INR");

    cy.get('input[name="pricingAndValidityInfo.price"]').clear().type("10");

    cy.get('input[name="pricingAndValidityInfo.strikedPrice"]')
      .clear()
      .type("20");
  });

  it("modifies switch in the configurable parameters", () => {
    cy.contains("Configurable Parameters").click({ force: true });

    cy.get('input[name="configurableParameters.active"]').click({
      force: true,
    });
  });

  it("fills the course show page information", () => {});

  it("adds few tags", () => {
    cy.contains("Tags").click({ force: true });

    cy.scrollTo("bottom").wait(1000);

    cy.get('input[name="tags.tagList"]').type(
      "testing, cypress, hello-world-app"
    );
  });

  it("checks for feature flags", () => {
    cy.contains("Feature Flags").click({ force: true });

    cy.scrollTo("bottom").wait(1000);

    cy.get('input[value="requires_container"]').click();
  });

  it("saves the course", () => {
    cy.scrollTo("bottom").wait(1000);

    cy.contains("Save").click().wait(2000);

    cy.url().should("include", "/backstage/courses");
  });

  // it("deletes the course", () => {

  //   cy.reload();

  //   cy.contains("Test Cypress 1")
  //     .parent()
  //     .parent()
  //     .parent()
  //     .children().then(($child) =>{
  //       cy.get($child)
  //         .children()
  //         .find('img[title="Delete Course"]')
  //         .click({force: true});
  //     });

  //   cy.url().should("include", "/backstage/courses");
  // });
});

// describe("Check how describe block works", () => {
//   console.log("NEw describe");
//   Try using .type('{enter}') to simulate pressing enter key
// });
