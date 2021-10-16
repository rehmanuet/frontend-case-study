/// <reference types="cypress" />

const youtube = require("../../support/selectors");

describe("Open Youtube", () => {
  before(() => {
    cy.visit("/");
  });

  xit("verifies the presence of all button & toggle on video player", () => {
    cy.searchVideo("movingimage");
    cy.get(youtube.selectors.video).first().click();

    cy.get(youtube.selectors.playButton).should("be.visible");
    cy.get(youtube.selectors.nextButton).should("be.visible");

    cy.get(youtube.selectors.muteButton).trigger("mouseover");
    cy.get(youtube.selectors.muteButton).should("be.visible");
    cy.get(youtube.selectors.volumeSlider).should("be.visible");

    cy.get(youtube.selectors.timeDisplay).should("be.visible");
    cy.get(youtube.selectors.currentTime).should("be.visible");
    cy.get(youtube.selectors.totalTime).should("be.visible");

    cy.get(youtube.selectors.toogleButton).should("be.visible");

    cy.get(youtube.selectors.settingButton).should("be.visible");
    cy.get(youtube.selectors.settingButton).click();
    cy.get(youtube.selectors.annotationToggle).should("be.visible");
    cy.get(youtube.selectors.qualityLabel).should("be.visible");
    cy.get(youtube.selectors.qualityOption).should("be.visible");
    cy.get(youtube.selectors.playBackSpeedLabel).should("be.visible");
    cy.get(youtube.selectors.playBackSpeedOption).should("be.visible");
    cy.get(youtube.selectors.settingButton).click();
    cy.get(youtube.selectors.videoPlayer).trigger("mouseover");
    cy.get(youtube.selectors.miniPlayerButton).should("be.visible");
  });

  it("verifies the mute functionality", () => {
    cy.get(youtube.selectors.muteButton)
      .trigger("mouseover")
      .should("be.visible");
    cy.get(youtube.selectors.muteButton)
      .trigger("mouseover")
      .click()
      .should("have.attr", "aria-label", "Unmute (m)");
    cy.get(youtube.selectors.muteButton)
      .trigger("mouseover")
      .click()
      .should("have.attr", "aria-label", "Mute (m)");
  });

  it("verifies the volume slider functionality", () => {
    cy.get(youtube.selectors.muteButton).trigger("mouseover");

    cy.increaseVolumeTo(100);

    cy.get(youtube.selectors.volume)
      .trigger("mouseover")
      .should("have.attr", "aria-valuenow", "100");

    cy.decreaseVolumeTo(50);

    cy.get(youtube.selectors.volume)
      .trigger("mouseover")
      .should("have.attr", "aria-valuenow", "50");
  });
});
