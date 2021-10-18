/// <reference types="cypress" />

const youtube = require("../../support/selectors");
const moment = require("moment");

describe("Open Youtube", () => {
  const sizes = [[1024, 768], "iphone-xr"];

  before(() => {
    cy.visit("/");
    cy.searchVideo("movingimage");
    cy.get(youtube.selectors.video).first().click();
  });

  sizes.forEach((sizes) => {
  it(`validates the volume slider functionality for viewport ${sizes}`, () => {
    if (Cypress._.isArray(sizes)) {
      cy.viewport(sizes[0], sizes[1]);
    } else {cy.viewport(sizes);  }
    cy.get(youtube.selectors.muteButton).trigger("mouseover");

   /*
    * Testcase: Validate the volume increase functionality.
    * Created the custom generic command i.e cy.increaseVolumeTo(percentValue)
    * to increase the volume then validates the result from DOM attr
    */ 
   cy.get(youtube.selectors.videoPlayer).click()
    cy.increaseVolumeTo(100);
    cy.get(youtube.selectors.volume)
      .trigger("mouseover")
      .should("have.attr", "aria-valuenow", "100");

   /*
    * Testcase: Validate the volume decrease functionality.
    * Created the custom generic command i.e cy.decreaseVolumeTo(percentValue)
    * to decrease the volume then validates the result from DOM attr
    */ 
    cy.decreaseVolumeTo(50);
    cy.get(youtube.selectors.volume)
      .trigger("mouseover")
      .should("have.attr", "aria-valuenow", "50");
  });

});
});
