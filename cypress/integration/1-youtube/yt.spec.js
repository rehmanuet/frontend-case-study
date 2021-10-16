/// <reference types="cypress" />

describe("Open Youtube", () => {
  beforeEach(() => {
    cy.visit("https://www.youtube.com");
  });

  it("displays two todo items by default", () => {
    cy.searchVideo("movingimage");
    cy.get('[id="video-title"] yt-formatted-string').first().click();
    cy.wait(1000);
    cy.get(".ytp-settings-button").click();
    cy.xpath("//div[contains(text(),'Annotations')]").should("be.visible");
    // cy.get(".ytp-play-button").click();
    cy.get('[class="video-stream html5-main-video"]').scrollIntoView()
  });

  xit("can add new todo items", () => {
    const newItem = "Feed the cat";
    cy.get("[data-test=new-todo]").type(`${newItem}{enter}`);

    cy.get(".todo-list li")
      .should("have.length", 3)
      .last()
      .should("have.text", newItem);
  });

  xit("can check off an item as completed", () => {
    cy.contains("Pay electric bill")
      .parent()
      .find("input[type=checkbox]")
      .check();

    cy.contains("Pay electric bill")
      .parents("li")
      .should("have.class", "completed");
  });
});
