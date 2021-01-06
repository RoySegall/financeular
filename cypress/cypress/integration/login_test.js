describe('Login.', () => {

  it('Verify login with correct username and password', function () {
    const {email, password, name} = this.users.john;
    cy.visit('/login');

    // Set the username and password.

    // Verify the login appears.

    // Verify the upper menu has changed.
  });

  it('Login as wrong username but correct password', function () {
    expect(1).to.be(2);
  });
  it('Login as correct username but wrong password', function () {
    expect(1).to.be(2);
  });
  it('Verify the user is logged in when the token exists in the local storage', function () {
    expect(1).to.be(2);
  });
  it('Verify the user need to login again after the token is expired', function() {
    expect(1).to.be(2);
  });
})
