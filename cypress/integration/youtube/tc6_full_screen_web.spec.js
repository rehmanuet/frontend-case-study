/// <reference types="cypress" />

const youtube = require("../../support/selectors");

describe("Open Youtube", () => {
  before(() => {
    cy.visit("/");
    cy.searchVideo("movingimage");
    cy.get(youtube.selectors.video).first().click();
  });

  it("validates the full-screen functionality", () => {
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
