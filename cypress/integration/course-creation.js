// Add the following in the root file outside of it block inside describe block
// beforeEach( () => {
// cy.visit('/') // this root will take the baseURL from the cypress.json file
// })

describe("Login to the staging setup", () => {
  it("login as admin", () => {
    cy.visit("https://adarsh.staging.tveacher.com/backstage/courses");
    cy.url().should("include", "/sign_in");

    const adminEmail = "adarsh@cloudyuga.guru";
    const adminPassword = "test1234";

    cy.get('input[name="user[email]"]')
      .type(adminEmail)
      .should("have.value", adminEmail);

    // Login As Student

    cy.get('input[name="user[password]"]')
      .type(adminPassword)
      .should("have.value", adminPassword);

    cy.get('input[value="Login"]').click();
  });
});

describe("Create a new course with all the course parameters modified", () => {

  it("create new course", () => {
    cy.contains("Create New Course").click();
    console.log("HELLO WORLD");
  });

  it("add basic info", () => {
    const courseName = "Test Cypress";

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

  it("tick few authors if found", () => {
    let i = 1;
    cy.contains("Author Information").click({ force: true });
    cy.get('input[name="authorInfo.assignedAuthorIds"]').each((author) => {
      author.click();

      // Select only the first two authors
      if (++i == 3){
          return false;
      }
    });
  });

  it("add pricing and validity", () => {
    cy.contains("Pricing and Validity").click({ force: true });

    cy.get('select[name="pricingAndValidityInfo.priceCurrency"]')
      .select('INR')

    cy.get('input[name="pricingAndValidityInfo.price"]')
      .clear()
      .type('10')
    
    cy.get('input[name="pricingAndValidityInfo.strikedPrice"]')
      .clear()  
      .type("20")
  });

  it("modify configurable parameters", () => {
    cy.contains("Configurable Parameters")
    .click({force: true})

  cy.get('input[name="configurableParameters.active"]')
    .click()
  });

  it("fill course show page information", () => {});

  it("add tags", () => {});

  it("check feature flage", () => {});
});

describe("Check how describe block works", () => {
    console.log("NEw describe");
});
