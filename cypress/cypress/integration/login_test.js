describe('Login.', () => {

  it('Verify login with correct username and password', function () {
    const {email, password, name} = this.users.john;
    cy.visit('/login');

    cy.get('header > div').should(($div) => {
      expect($div.first()).to.contain('Welcome Guest')
    });

    // Set the username and password.
    cy.setUsernameAndPassword(email, password);
    cy.get('button.button-submit').click();

    // Verify the login appears.
    cy.get('section.success').should('be.visible').then(($success) => {
      expect($success.first()).to.contain('You are logged in successfully')
    });

    // Verify the upper menu has changed.
    cy.get('header > div').should(($div) => {
      expect($div.first()).to.contain(`Hello ${name}`)
    });
  });

  it('Log in and log out between different users an verify the text changes',  function () {

    // todo: merge with the prev test.
    const loginAsUser = (userInfo) => {
      const {email, password, name} = userInfo;
      cy.visit('/login');

      cy.get('header > div').should(($div) => {
        expect($div.first()).to.contain('Welcome Guest')
      });

      // Set the username and password.
      cy.setUsernameAndPassword(email, password);
      cy.get('button.button-submit').click();

      cy.get('header > div').should(($div) => {
        expect($div.first()).to.contain(`Hello ${name}`)
      });
    };

    const {john, tom} = this.users;

    loginAsUser(john);

    // Logout.
    cy.visit('/logout');

    // Verify a proper login as another user.
    loginAsUser(tom);
  });

  // it('Login as wrong username but correct password', function () {
  //   expect(1).to.be(2);
  // });
  // it('Login as correct username but wrong password', function () {
  //   expect(1).to.be(2);
  // });
  // it('Verify the user is logged in when the token exists in the local storage', function () {
  //   expect(1).to.be(2);
  // });
  // it('Verify the user need to login again after the token is expired', function() {
  //   expect(1).to.be(2);
  // });
})
