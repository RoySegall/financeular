describe('Testing all the docker compose setup.', () => {

  it('Verify the login mutation is sent with the correct payloads.', () => {

    cy.visit('/');
    cy.get('a#login').click();

    // The password and username are not important for this test.
    cy.get('#username').type('foo@gmail.com');
    cy.get('#password').type('passwordbar');

    // Setting an interceptor for the graphql.
    cy.intercept('POST', '**/graphql').as('graphql');

    // Clicking on the login button to trigger the mutation.
    cy.get('button.button-submit').click();

    // Verifying the request contains the dummy client secret and ID.
    cy.wait('@graphql').should(({ request, response }) => {
      expect(request.body.query).to.include('client_secret: "4af37737-a903-47e6-a26e-a339c3b764f4"');
      expect(request.body.query).to.include('client_id: "50"');
    });
  })
})