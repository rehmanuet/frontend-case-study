/// <reference types="cypress" />

const youtube = require("../../support/selectors");

describe("Open Youtube", () => {
  const sizes = [[1024, 768], "iphone-xr"];

  before(() => {
    cy.visit("/");
    cy.searchVideo("movingimage");
    cy.get(youtube.selectors.video).first().click();
  });

  sizes.forEach((sizes) => {
    it("validates the full-screen functionality", () => {
      if (Cypress._.isArray(sizes)) {
        cy.viewport(sizes[0], sizes[1]);
      } else {cy.viewport(sizes);  }
    /*
     * Full Screen is not supported by Cypress, So I used workaround.
     * Testcase: Validate the miniplayer functionality.
     * Verify that player is maximize by-default and then press "f"
     * keystroke to minimize and assert the result from DOM attr.
     */

    let fullScreenAlias = "f";
    // checks default behaviour
    cy.get(youtube.selectors.fullScreenButton).should(
      "have.attr",
      "aria-label",
      "Full screen (f)"
    );

    // open full screen and validates the DOM element
    cy.realPress(fullScreenAlias);
    cy.get(youtube.selectors.fullScreenButton).should(
      "have.attr",
      "aria-label",
      "Exit full screen (f)"
    );
    cy.realPress(fullScreenAlias);
  });
  });
});
