// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("verifyElementContainText", (selector, text) => {
  cy.get(selector).should('be.visible').then(($element) => {
    expect($element.first()).to.contain(text);
  });
});

Cypress.Commands.add("verifyErrorText", (text) => {
  cy.verifyElementContainText('section.error', text);
});

Cypress.Commands.add("verifySuccessText", (text) => {
  cy.verifyElementContainText('section.success', text);
});

Cypress.Commands.add("login", (user) => {
  // const {email, password} = user;
  //
  // const query = {
  //   "variables": {"username":email,"password": password},
  //   "query": `mutation ($username: String!, $password: String!) {
  //     login(
  //       email: $username
  //       password: $password
  //       client_id: "50"
  //       client_secret: "4af37737-a903-47e6-a26e-a339c3b764f4"
  //     ) {
  //       accessToken
  //       expires
  //     }
  //   }
  // `};
  //
  // cy.request({
  //   url: `${Cypress.config('backendUrl')}/graphql`,
  //   method: 'POST',
  //   body: query,
  // }).then((response) => {
  //   const {data} = response.body;
  //   const {accessToken, expires} = data.login;
  //
  //   const date = new Date();
  //   window.localStorage.setItem('accessToken', accessToken);
  //   window.localStorage.setItem('expires', Math.round(date.getTime() / 1000) + expires);
  // })
});
