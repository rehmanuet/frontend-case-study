# Front QA Case Study | Cypress | CircleCI

Introduction:
---------------
This Test Automation Framework is created using Cypress which can be used to fot functional testing. Covered all the mandatory & high-level functionality. Created few custom commands for the best practices.

Stack
---------------
<img src="https://s4-recruiting.cdn.greenhouse.io/external_greenhouse_job_boards/logos/400/113/000/original/Cypress.io_Round_Logo.png?1618514359?raw=true" width="100" height="100"/><img src="https://seeklogo.com/images/N/nodejs-logo-FBE122E377-seeklogo.com.png?raw=true" width="100" height="100"/><img src="https://images.ctfassets.net/k62me4xboi1l/55FkKC6k4E6I80qOOu2A0M/4b03468aed1c04a639acfa2c513cbcae/angular-sdk-03.svg" width="110" height="100" />

Prerequisites:
---------------
*	node and npm
*	npm
*	Please refer for any help in node and npm.
* 	https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/

Execution
---------------
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

```
git clone git@github.com:rehmanuet/frontend-case-study.git
npm install
npm run 
```

Coverage
---------------
This framework covers following functionality

#### Test Cases Breakdown
|    <sub>Feature</sub>  |    <sub>Functionality Covered</sub> |
| :-:  | :-: |
|    <b> <sub>Element</sub> </b>   | <sub>All player elements/buttons/options</sub>  |
|    <b> <sub>Player</sub> </b>   | <sub>Autoplay/Play/Pause & Play/Pause at specific time</sub>  |
|    <b> <sub>Mute</sub> </b>   | <sub>Mute/Unmute</sub>  |
|    <b> <sub>Volume</sub> </b>   | <sub>Increase/Decrease Volume at specific %</sub>  
|    <b> <sub>Mini-Player</sub> </b>   | <sub>Minimize/Maximize Player</sub>  
|    <b> <sub>Full-Screen</sub> </b>   | <sub>Full/Normal Screen</sub>  

Notes
---------------
1- Created some custom commands for scalibility purpose eg. ( All commands could be found at `cypress/support/commands.js`
```
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
```
2- Full Screen Testing of video player is not yet supported by Cypress ([ref:#1213](https://github.com/cypress-io/cypress/issues/1213)) but I managed to test with a workaround

3- Used [moment.js](https://momentjs.com/) library for calculating time and testing play/pause functionality. eg
```
/*
 * If video is playing then its current time is greater than start time
 * difference(seconds) = (videoCurrentTime - videoStartTime)/1000
 */
cy.get(youtube.selectors.currentTime)
  .text()
  .then((value) => {
    let videoStartTime = "0:00";
    let videoCurrentTime = value;
    let diff =
      (moment(videoCurrentTime, "mm:ss") -moment(videoStartTime, "mm:ss")) / 1000;
    cy.get(youtube.selectors.currentTime)
      .text()
      .should("not.be", videoStartTime);
    expect(diff).to.be.greaterThan(0);
  });
cy.get(youtube.selectors.currentTime).trigger("mouseover");
```
#### Results
Video recording are available at `cypress/videos/`
<img src="https://github.com/rehmanuet/DataEssential/blob/master/junk/resultfe.png?raw=true" width="600" height="400" />

Sometime testcase fails intermittently on CI because of headless mode ([ref:cypress:issue](https://github.com/cypress-io/cypress/issues/5098))

_contact:`rehmanuet[at]yahoo[dot]com`_ *or* _[LinkedIn](https://www.linkedin.com/in/rehmanuet/)_
