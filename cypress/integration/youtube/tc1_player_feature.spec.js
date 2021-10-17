/// <reference types="cypress" />

const youtube = require("../../support/selectors");
const moment = require("moment");

describe("Open Youtube", () => {
  before(() => {
    cy.visit("/");
    cy.searchVideo("movingimage");
    cy.get(youtube.selectors.video).first().click();
  });
  it("validates the presence of all button, toggle and options on video player", () => {
    /*
     * Testcase: Search the video by given label and click on first video.
     * Created the custom generic command i.e cy.searchVideo(videoLabel); to search the video.
     * and then click on first video
     */

    /*
     * Testcase: Validate the presence of all the button, toggles & options
     * of video player by assertions.
     */
    cy.get(youtube.selectors.playButton).should("be.visible");
    cy.get(youtube.selectors.nextButton).should("be.visible");

    cy.get(youtube.selectors.muteButton)
      .trigger("mouseover")
      .should("be.visible");
    cy.get(youtube.selectors.volumeSlider).should("be.visible");

    cy.get(youtube.selectors.timeDisplay).should("be.visible");
    cy.get(youtube.selectors.currentTime).should("be.visible");
    cy.get(youtube.selectors.totalTime).should("be.visible");

    cy.get(youtube.selectors.toogleButton).should("be.visible");
    cy.get(youtube.selectors.fullScreenButton).should("be.visible");

    cy.get(youtube.selectors.miniPlayerButton)
      .trigger("mouseover")
      .should("be.visible");

    cy.get(youtube.selectors.settingButton).should("be.visible");
    cy.get(youtube.selectors.settingButton).click();
    cy.get(youtube.selectors.annotationToggle).should("be.visible");
    cy.get(youtube.selectors.qualityLabel).should("be.visible");
    cy.get(youtube.selectors.qualityOption).should("be.visible");
    cy.get(youtube.selectors.playBackSpeedLabel).should("be.visible");
    cy.get(youtube.selectors.playBackSpeedOption).should("be.visible");
    cy.get(youtube.selectors.videoPlayer).trigger("mouseover");
  });
});
