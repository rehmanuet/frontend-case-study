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
    it(`validates the play & pause functionality for viewport ${sizes}`,{ defaultCommandTimeout: 20000 },() => {
        if (Cypress._.isArray(sizes)) {
          cy.viewport(sizes[0], sizes[1]);
        } else {cy.viewport(sizes);  }
        /*
         * Testcase: Validate the auto-playing functionality.
         * While video is playing, the player does not show the "play"
         * button instead it shows the "pause" button.
         */

        cy.get(youtube.selectors.videoPlayer).dblclick();

        cy.openSetting();
        cy.get(youtube.selectors.currentTime).should("be.visible");
        cy.get(youtube.selectors.playButton)
          .trigger("mouseover")
          .should("have.attr", "aria-label", "Pause (k)")
          .should("not.have.attr", "aria-label", "Play (k)");
        cy.get(youtube.selectors.currentTime).trigger("mouseover");

        /*
         * Testcase: Validate the video playing functionality.
         * If video is playing then its current time is greater than start time
         * difference(seconds) = (videoCurrentTime - videoStartTime)/1000
         */
        cy.get(youtube.selectors.currentTime)
          .text()
          .then((value) => {
            let videoStartTime = "0:00";
            let videoCurrentTime = value;
            let diff =
              (moment(videoCurrentTime, "mm:ss") -
                moment(videoStartTime, "mm:ss")) /
              1000;
            cy.get(youtube.selectors.currentTime)
              .text()
              .should("not.be", videoStartTime);
            expect(diff).to.be.greaterThan(0);
          });
        cy.get(youtube.selectors.currentTime).trigger("mouseover");

        /*
         * Testcase: Validate the video pause functionality.
         * Pause the video at 0:15a seconds and then validate whether
         * video get paused or not.
         */
        cy.get(youtube.selectors.currentTime).trigger("mouseover");
        cy.waitUntil(() =>
            cy.get(youtube.selectors.currentTime).text().should("eq", "0:15"),
          { 
            errorMsg:"The loading time was too long even for this crazy playback time thing!",
            timeout: 20000
          }).then(() => {
            cy.get(youtube.selectors.playButton)
            .click()
            .should("have.attr", "aria-label", "Play (k)");
          cy.get(youtube.selectors.currentTime).text().should("eq", "0:15");
        });
        cy.reload();
      }
    );
  });
});
