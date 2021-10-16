const youtube = require("../support/selectors");

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.overwrite("visit", (originalFn, url, options) => {
  console.log("calling cy.visit");
  const opts = {
    onBeforeLoad: (win) => {
      Object.defineProperty(win.navigator, "language", { value: "en_US" });
      Object.defineProperty(win.navigator, "languages", { value: ["en"] });
      Object.defineProperty(win.navigator, "accept_languages", {
        value: ["en"],
      });
    },
    headers: {
      "Accept-Language": "en",
    },
  };
  return originalFn(url, opts);
});

Cypress.Commands.add("searchVideo", (label) => {
  cy.get('[id="search-input"]').should("be.visible").type(`${label}{enter}`);
  cy.get('span[id="title"][class*="ytd-shelf-renderer"]')
    .first()
    .should("contain", label);
});

Cypress.Commands.add("increaseVolumeTo", (num) => {
  cy.get(youtube.selectors.volume).then((ele) => {
    if (ele.length > 0) {
      for (let index = 0; index < num / 5; index++) {
        cy.get(youtube.selectors.volume).trigger("mouseover").type("{uparrow}");
      }
    }
  });
});

Cypress.Commands.add("decreaseVolumeTo", (num) => {
  cy.get(youtube.selectors.volume).then((ele) => {
    if (ele.length > 0) {
      for (let index = 0; index < num / 5; index++) {
        cy.get(youtube.selectors.volume)
          .trigger("mouseover")
          .type("{downarrow}");
      }
    }
  });
});
