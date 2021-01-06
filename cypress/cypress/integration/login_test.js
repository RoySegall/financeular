describe('Login.', () => {

  it('Verify login with correct username and password', function () {
    const {email, password, name} = this.users.john;
    cy.visit('/login');

    // Set the username and password.
    cy.setUsernameAndPassword(email, password);
    cy.get('button.button-submit').click();

    // Verify the login appears.
    cy.get('section.success').should('be.visible').then(($success) => {
      expect($success.first()).to.contain('You are logged in successfully')
    });

    // Verify the upper menu has changed.
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
