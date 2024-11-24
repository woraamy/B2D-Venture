describe('Investor Registration and Login Flow', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/signup');
    });
  
    it('should complete the investor registration successfully', () => {
      cy.contains('Join the Community').should('exist');
      cy.contains('Investor').click();
      cy.contains('Investor Information').should('exist');
  
      cy.get('input[placeholder="e.g. Amy1234"]').type('InvestorTest01'); 
      cy.get('input[placeholder="e.g. example@example.com"]').type('investortest01@example.com'); 
      cy.get('input[placeholder="Minimum 8 characters"]').type('password123'); 
      cy.get('input[placeholder="Confirm your password"]').type('password123'); 
      cy.get('input[placeholder="Your first name"]').type('John'); 
      cy.get('input[placeholder="Your last name"]').type('Doe'); 
      cy.get('input[type="date"]').type('1990-01-01'); 
      cy.get('input[placeholder="Your nationality"]').type('American'); 
      cy.get('input[placeholder="Your contact number"]').type('1234567890'); 
      cy.get('input[placeholder="Tell us about your interests"]').type('Tech Investments'); 
  
      cy.contains('Submit your details').click();
    });
  
    it('should log in successfully after registration', () => {
      cy.visit('http://localhost:3000/login');
      cy.contains('Welcome back').should('exist');
      cy.get('input[placeholder="Your email"]').type('investortest01@example.com'); 
      cy.get('input[placeholder="Your Password"]').type('password123'); 
      cy.contains('Login').click();
      cy.url().should('eq', 'http://localhost:3000/');
    });
  });
  