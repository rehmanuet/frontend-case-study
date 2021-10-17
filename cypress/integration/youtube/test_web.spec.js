/// <reference types="cypress" />

const youtube = require("../../support/selectors");
const moment = require("moment");

describe("Open Youtube", () => {
  before(() => {cy.visit("/");
  });

  it("validates the presence of all button, toggle and options on video player", () => {

   /*
    * Testcase: Search the video by given label and click on first video.
    * Created the custom generic command i.e cy.searchVideo(videoLabel); to search the video.
    * and then click on first video
    */
    cy.searchVideo("movingimage");
    cy.get(youtube.selectors.video).first().click();


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

  it("validates the play & pause functionality",{defaultCommandTimeout: 20000},() => {
      
   /*
    * Testcase: Validate the auto-playing functionality.
    * While video is playing, the player does not show the "play"
    * button instead it shows the "pause" button.
    */
   cy.get(youtube.selectors.currentTime).should("be.visible");
    cy.get(youtube.selectors.playButton)
       .trigger("mouseover")
       .should("have.attr", "aria-label", "Pause (k)")
       .should("not.have.attr","aria-label", "Play (k)");
       cy.get(youtube.selectors.currentTime).trigger("mouseover");;

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
          let diff = (moment(videoCurrentTime, "mm:ss") - moment(videoStartTime, "mm:ss"))/1000;
          cy.get(youtube.selectors.currentTime).text().should("not.be", videoStartTime);
          expect(diff).to.be.greaterThan(0);
        });
        cy.get(youtube.selectors.currentTime).trigger("mouseover");;

   /*
    * Testcase: Validate the video pause functionality.
    * Pause the video at 0:10 seconds and then validate whether
    * video get paused or not.
    */    
   cy.get(youtube.selectors.currentTime).trigger("mouseover");;
    cy.waitUntil(() => 
    cy.get(youtube.selectors.currentTime).text().should("eq", "0:20"),{
          errorMsg: "The loading time was too long even for this crazy thing!",
          timeout: 300000,
          interval: 200,
        }).then(() => {
        cy.get(youtube.selectors.playButton)
          .click()
          .should("have.attr", "aria-label", "Play (k)");
          cy.get(youtube.selectors.currentTime).text().should("eq", "0:20");
      });
    }

  );

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

  it("validates the volume slider functionality", () => {
    cy.get(youtube.selectors.muteButton).trigger("mouseover");

   /*
    * Testcase: Validate the volume increase functionality.
    * Created the custom generic command i.e cy.increaseVolumeTo(percentValue)
    * to increase the volume then validates the result from DOM attr
    */ 
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


  it("validates the miniplayer and multiplayer functionality", () => {
   
   /*
    * Testcase: Validate the miniplayer functionality.
    * Verify that player is maximize by-default and then click on
    * mini-player button to minimize and assert the result from DOM attr
    */ 
    cy.get(youtube.selectors.miniPlayerUi)
      .should("have.attr","style","display: none;");
    cy.get(youtube.selectors.miniPlayerButton)
      .trigger("mouseover")
      .click();
    cy.get(youtube.selectors.miniPlayerUi)
      .should("have.attr","style","");
   
   /*
    * Testcase: Validate the maximize the miniplayer functionality.
    * Verify that player is minimize and then click on maximize
    * mini-player button to maximize and assert the result from DOM attr.
    */ 
    cy.get(youtube.selectors.miniPlayerUi)
      .should("have.attr","style","");
    cy.get(youtube.selectors.maximizeMiniPlayer)
      .trigger("mouseover")
      .click();
    cy.get(youtube.selectors.miniPlayerUi)
    .should("have.attr","style","display: none;");

  });


  it("validates the full-screen functionality", () => {

    /*
     * Full Screen is not supported by Cypress, So I used workaround. 
     * Testcase: Validate the miniplayer functionality.
     * Verify that player is maximize by-default and then press "f"
     * keystroke to minimize and assert the result from DOM attr.
     */ 

    let fullScreenAlias= 'f';
    // checks default behaviour
    cy.get(youtube.selectors.fullScreenButton).should("have.attr","aria-label","Full screen (f)");

    // open full screen and validates the DOM element
    cy.realPress(fullScreenAlias);
    cy.get(youtube.selectors.fullScreenButton)
      .should("have.attr","aria-label","Exit full screen (f)");
    cy.realPress(fullScreenAlias) ;
 
   });
});
