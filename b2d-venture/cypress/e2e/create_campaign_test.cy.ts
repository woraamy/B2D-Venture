describe('Create and Verify Raise Campaign', () => {
    it('should log in as a business user, create a raise campaign, and verify it on the business page', () => {
        cy.visit('http://localhost:3000/login');
        cy.wait(500);
        cy.get('#email')
          .should('be.visible')
          .type('daisydoe@example.com', { force: true }); 

        cy.get('#password')
          .should('be.visible')
          .type('Password@123', { force: true }); 
        cy.get("#login-button").should('be.visible').click();
        cy.url().should('eq', 'http://localhost:3000');
        cy.contains('Profile').click();
        cy.url().should('include', '/dashboard/business');

        cy.contains('Manage Raise Campaign').click();
        cy.url().should('include', '/manage-raise-campaign');

        cy.get('#create-campaign-button').should('not.be.disabled').click();
        cy.url().should('include', '/create-raise-campaign');

        cy.get('#min_investment').type('1000');
        cy.get('#max_investment').type('100000');
        cy.get('#goal').type('500000');
        cy.get('#shared_price').type('50');
        cy.get('#start_date').clear().type('2024-01-01');
        cy.get('#end_date').clear().type('2024-12-31');

        cy.get('.ProseMirror')
          .should('be.visible')
          .clear()
          .type('This is a description for the raise campaign.');

        cy.contains('Create Raise Campaign').click();

        cy.contains('Raise campaign updated successfully').should('exist');

        cy.visit('http://localhost:3000/business');
        cy.get('input[placeholder="Search"]').type('Tech Innovators');
        cy.contains('Tech Innovators').click();

        cy.contains('Goal: $500,000').should('exist');
        cy.contains('Shared Price: $50').should('exist');
        cy.contains('This is a description for the raise campaign.').should('exist');
    });
});
