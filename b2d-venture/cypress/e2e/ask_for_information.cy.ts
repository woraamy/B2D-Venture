describe('Investor Request and Approval Flow', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
    });

    it('Investor should request information for "Wellwell"', () => {
        cy.get('#email').type('jane@gmail.com');
        cy.get('#password').type('12345678');
        cy.get('#login-button').click();
        cy.url().should('eq', 'http://localhost:3000');
        
        cy.get('input[placeholder="Search"]').type('Wellwell{enter}');
        cy.contains('Wellwell').click();

        cy.contains('Ask for more information').click();
        cy.get('input[placeholder="Enter your reason..."]').type('Interested in investment opportunities.');
        cy.contains('Allow').click();

        cy.contains('Send request successed').should('exist');
    });

    it('Business user should approve the investor request', () => {
        cy.get('#email').type('business@example.com');
        cy.get('#password').type('BusinessPassword@123');
        cy.get('#login-button').click();
        cy.url().should('eq', 'http://localhost:3000');
        cy.get("profile-button").click();
        cy.url().should('include', '/dashboard/business');
        
        cy.contains("Investor request").click();
        cy.contains('Wellwell').should('exist');
        cy.contains('Allow').click();

    });

    it('Admin should approve the investor request', () => {
        cy.get('#email').type('amy@gmail.com');
        cy.get('#password').type('12345678');
        cy.get('#login-button').click();
        cy.url().should('eq', 'http://localhost:3000');
        cy.get("#profile-button").click();
        cy.url().should('include', '/admin/dashboard');
        
        cy.contains('Investor Request').click();
        cy.contains('Wellwell').should('exist');
        cy.contains('Allow').click();
        cy.contains('Request has been approved by Admin').should('exist');
    });

    it('Investor should verify shared information in profile', () => {
        cy.get('#email').type('jane@gmail.com');
        cy.get('#password').type('12345678');
        cy.get('#login-button').click();
        cy.url().should('eq', 'http://localhost:3000');
        
        cy.get("#profile-button").click();
        cy.url().should('include', '/dashboard/investor');
        cy.contains('Shared Information').click();
        cy.contains('Wellwell').should('exist');
    });
});
