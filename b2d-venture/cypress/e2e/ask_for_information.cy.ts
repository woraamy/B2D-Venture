describe('Investor Request and Approval Flow', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
        cy.viewport(1920, 1080)

    });

    it('Investor should request information for "The New Shop"', () => {
        cy.get('#email').type('jane@gmail.com');
        cy.get('#password').type('12345678');
        cy.get('#login-button').click();
        cy.url().should('eq', 'http://localhost:3000/');
        
        cy.get('input[placeholder="Search"]').type('The New Shop');
        cy.contains('The New Shop').click();

        cy.contains('Ask for more information').click();
        cy.get('input[placeholder="Enter your reason..."]').type('Interested in investment opportunities.');
        cy.contains('Allow').click();

        cy.contains('Send request successed').should('exist');
    });

    it('Business user should approve the investor request', () => {
        cy.get('#email').type('business@example.com');
        cy.get('#password').type('BusinessPassword@123');
        cy.get('#login-button').click();
        cy.url().should('include', '/dashboard/business');
        
        cy.contains('Manage Investor\'s Request').click();
        cy.contains('The New Shop').should('exist');
        cy.contains('Allow').click();

        cy.contains('Request has been approved').should('exist');
    });

    it('Admin should approve the investor request', () => {
        cy.get('#email').type('admin@example.com');
        cy.get('#password').type('AdminPassword@123');
        cy.get('#login-button').click();
        cy.url().should('include', '/admin/dashboard');
        
        cy.contains('Investor Requests').click();
        cy.contains('The New Shop').should('exist');
        cy.contains('Allow').click();
        cy.contains('Request has been approved by Admin').should('exist');
    });

    it('Investor should verify shared information in profile', () => {
        cy.get('#email').type('jane@gmail.com');
        cy.get('#password').type('12345678');
        cy.get('#login-button').click();
        cy.url().should('eq', 'http://localhost:3000');
        
        cy.contains('Profile').click();
        cy.url().should('include', '/dashboard/investor');
        cy.contains('Shared Information').click();
        cy.contains('The New Shop').should('exist');
        cy.contains('Interested in investment opportunities.').should('exist');
    });
});
