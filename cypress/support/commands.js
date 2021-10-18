const youtube = require("../support/selectors");

/**
 * Custom and reuseable commands for scalability
 * @author Abdur Rehman <rehmanuet@yahoo.com>
 */


// Overwrte the visit implementation to open the YouTube always in Ennglish,
Cypress.Commands.overwrite("visit", (originalFn, url, options) => {
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

Cypress.Commands.add("searchVideo", (videoLabel) => {
  cy.get(youtube.selectors.searchBar)
    .should("be.visible")
    .type(videoLabel);
  cy.get(youtube.selectors.searchButton).click({force:"true"});
});

/**
 * Created the custom generic command to increase the volume by percentage,
 * @param {Integer} percentValue - Value to increase the volume.
 */
Cypress.Commands.add("increaseVolumeTo", (percentValue) => {
  cy.get(youtube.selectors.volume).then((ele) => {
    if (ele.length > 0) {
      for (let index = 0; index < percentValue / 5; index++) {
        cy.get(youtube.selectors.volume)
        .trigger("mouseover")
        .type("{uparrow}");
      }
    }
  });
});

/**
 * Created the custom generic command to decrease the volume by percentage,
 * @param {Integer} percentValue - Value to decrease the volume.
 */
Cypress.Commands.add("decreaseVolumeTo", (percentValue) => {
  cy.get(youtube.selectors.volume).then((ele) => {
    if (ele.length > 0) {
      for (let index = 0; index < percentValue / 5; index++) {
        cy.get(youtube.selectors.volume)
          .trigger("mouseover")
          .type("{downarrow}");
      }
    }
  });
});

Cypress.Commands.add("openSetting", () => {
  cy.get(youtube.selectors.settingButton).should("be.visible").click();
});