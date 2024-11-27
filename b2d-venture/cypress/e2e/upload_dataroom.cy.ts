import 'cypress-file-upload';

describe('Business dataroom upload', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
        cy.viewport(1920, 1080)
    });

    it('should upload file and see the uploaded file in file container', () => {
        cy.get('#email').type('bella@gmail.com');
        cy.get('#password').type('12345678');
        cy.get('#login-button').click();
        cy.url().should('eq', 'http://localhost:3000/');
        
        cy.contains('Profile').click();
        cy.contains('Data').click();
        const fileName = 'example.pdf'; // Ensure this file exists in cypress/fixtures
        cy.get('input[type="file"]').attachFile(fileName);        
        cy.contains('Submit').click();
        cy.screenshot()

        cy.contains('File uploaded successfully!').should('be.visible');
        cy.contains('example.pdf').should('be.visible')
    });

});
