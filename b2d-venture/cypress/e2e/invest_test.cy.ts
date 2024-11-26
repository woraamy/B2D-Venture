describe('Investing in a Business and Verifying Investment History', () => {
    it('should log in, search for a business, invest, and verify investment in the history', () => {
      cy.viewport(1920, 1080)
      cy.visit('http://localhost:3000/login');
      cy.get('input[placeholder="Your email"]').type('jane@gmail.com'); 
      cy.get('input[placeholder="Your Password"]').type('12345678');
      cy.contains('Login').click();
      cy.url().should('eq', 'http://localhost:3000/');
  
      cy.visit('http://localhost:3000/business');
      cy.get('input[placeholder="Search"]').type('The New Shop');
      cy.contains('The New Shop').click();
      cy.get("#invest-button").click();
  
      cy.url().should('include', '/payment'); 
      cy.get('input[placeholder="John"]').type('John'); 
      cy.get('input[placeholder="Doe"]').type('Doe'); 
      cy.get('input[placeholder="123 Happy Street"]').type('123 Main Street'); 
      cy.get('input[placeholder="New York"]').type('New York'); 
      cy.get('input[placeholder="10001"]').type('10001'); 
      cy.get('input[placeholder="1234 5678 9012 3456"]').type('4111111111111111'); 
      cy.get('input[placeholder="123"]').type('123'); 
      cy.get('input[placeholder="MM/YY"]').type('12/24'); 
      cy.get('input[placeholder="Investment between"]').type('100');
      cy.get('input[type="checkbox"]').check(); 
      cy.contains('Submit Payment').click();
      cy.url().should('include', '/business'); // Redirected back to business page
    });

    it('should verify the investment in the history', () => {
      cy.visit('http://localhost:3000/');
      cy.contains('Profile').click();
      cy.contains('Invest History').click();
      cy.contains('The New Shop').should('exist');
    });
  });
  