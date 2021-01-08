describe('Login.', () => {

  const setUsernameAndPassword = (username, password) => {
    cy.get('#username').type(username);
    cy.get('#password').type(password);
  };

  afterEach(() => {
    cy.visit('/logout');
  });

  const loginAsUser = (userInfo) => {
    const {email, password, name} = userInfo;
    cy.visit('/login');

    cy.verifyElementContainText('header > div', 'Welcome Guest');

    // Set the username and password.
    setUsernameAndPassword(email, password);
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

  it('Login as wrong username but correct password', function () {
    cy.visit('/login');

    setUsernameAndPassword('wrong_username', '1234');
    cy.get('button.button-submit').click();

    cy.verifyElementContainText('section.error', 'The password or user are incorrect');
  });

  it('Login as correct username but wrong password', function () {
    cy.visit('/login');

    setUsernameAndPassword(this.users.john.email, 'wrong password');
    cy.get('button.button-submit').click();

    cy.verifyElementContainText('section.error', 'The password or user are incorrect');
  });
})
