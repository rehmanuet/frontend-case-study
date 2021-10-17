/// <reference types="cypress" />

const youtube = require("../../support/selectors");
const moment = require("moment");

describe("Open Youtube", () => {
  before(() => {
    cy.visit("/");
    cy.searchVideo("movingimage");
    cy.get(youtube.selectors.video).first().click();
  });

  it("validates the mute/unmute functionality", () => {
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
});
