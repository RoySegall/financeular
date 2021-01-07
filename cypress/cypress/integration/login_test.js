describe('Login.', () => {

  const loginAsUser = (userInfo) => {
    const {email, password, name} = userInfo;
    cy.visit('/login');

    cy.verifyElementContainText('header > div', 'Welcome Guest');

    // Set the username and password.
    cy.setUsernameAndPassword(email, password);
    cy.get('button.button-submit').click();

    // Verify the login appears.
    cy.verifyElementContainText('section.success', 'You are logged in successfully');

    // waiting a second and verify the upper menu has changed.
    cy.wait(1000);
    cy.verifyElementContainText('header > div', `Hello ${name}`);
  }

  it('Verify login with correct username and password', function () {
    loginAsUser(this.users.john);
  });

  it('Log in and log out between different users an verify the text changes',  function () {
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
