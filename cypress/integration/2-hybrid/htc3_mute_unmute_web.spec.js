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
  it(`validates the mute/unmute functionality for viewport ${sizes}`, () => {
    if (Cypress._.isArray(sizes)) {
      cy.viewport(sizes[0], sizes[1]);
    } else {cy.viewport(sizes);  }

    cy.get(youtube.selectors.muteButton)
      .trigger("mouseover")
      .should("be.visible");

    /*
     * Testcase: Validate the mute functionality.
     * Mute the video by clicking the mute button and
     * validate the results from DOM attr.
     */
    cy.get(youtube.selectors.muteButton)
      .trigger("mouseover")
      .click()
      .should("have.attr", "aria-label", "Unmute (m)");

    /*
     * Testcase: Validate the unmute functionality.
     * Unmute the video by clicking the unmute button and
     * validate the results from DOM attr.
     */
    cy.get(youtube.selectors.muteButton)
      .trigger("mouseover")
      .click()
      .should("have.attr", "aria-label", "Mute (m)");
  });
});});
