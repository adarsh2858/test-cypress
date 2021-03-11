import { userLogin } from './Utils';

const studentEmail = "nilam2267@gmail.com";

describe("Check for the correct links on the account dropdown for a student", ()=> {
    
    it("checks for the account dropdown", () => {
        userLogin(studentEmail);

        cy.get('.relative > .text-white').contains("N", { matchCase: false });

        cy.get('.relative > .text-white').click()

        cy.get('.pb-2 > .text-gray-800').click()

        cy.url().should("include", "/my/password/edit")

        cy.get('.relative > .text-white').click()
        cy.get('span > .w-full').click()

        // The toast message comes up too fast and vanishes so cypress is unable to detect it.
        // cy.contains("You have been successfully logged out.")

        cy.url().should("include", "/explore")

    })
})
