import { userLogin } from './Utils';

const adminEmail = "adarsh@cloudyuga.guru";
const studentEmail = "nilam2267@gmail.com";

describe("Testing site quiz button on the homepage", () => {
  it("clicks on the site quiz button as a new user", () => {
    cy.visit("/explore");
    cy.contains("Quizzes").scrollIntoView().wait(1000);

    cy.contains("Take Quiz").click()

    cy.url().should("include", "/devise/users/sign_in")
  });

  it("clicks on the site quiz button as an admin", () => {
    userLogin(adminEmail);

    cy.visit("/explore");
    cy.contains("Quizzes").scrollIntoView().wait(1000);

    cy.contains("Take Quiz").click()

    cy.url().should("include", "/site_quizzes")
  });

  it("clicks on the site quiz button as a student", () => {
    userLogin(studentEmail);

    cy.visit("/explore");
    cy.contains("Quizzes").scrollIntoView().wait(1000);

    cy.contains("Take Quiz").click()

    cy.url().should("include", "/site_quizzes")
  });
});
