import 'cypress-file-upload';

describe('Uploading a file', () => {

  beforeEach(function() {
    const {john} = this.users;
    cy.login(john);
  });

  it('Verify error when upload in an unsupported format', () => {
    cy.visit('/upload');
    cy.get('[type="file"]').attachFile('kitten.jpg');
    cy.get('.button-submit').click();

    cy.verifyErrorText('The uploaded file is not supported');
  });

  it('verify an error will be raised for a valid format file with corrupted values', () => {
    cy.visit('/upload');
    cy.get('[type="file"]').attachFile('bad_dummy_file.xlsx');
    cy.get('.button-submit').click();

    cy.verifyErrorText('There was an error while trying to process the file. Please contact support.');
  });

  it('Verify uploading a good file', () => {
    cy.visit('/upload');
    cy.get('[type="file"]').attachFile('dummy_file.xlsx');
    cy.get('.button-submit').click();

    cy.verifySuccessText('The file has uploaded successfully.');

    // Verify we redirected by checking the files table exists and have more
    // than 0 items.
    cy.get('.files-wrapper table').then(($table) => {
      expect($table.find('tr')).not.to.have.length(0);
    });
  });

});
