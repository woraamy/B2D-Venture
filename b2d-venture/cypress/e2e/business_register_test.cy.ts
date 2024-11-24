describe('Business Creation, Admin Approval, and Login Flow', () => {
    it('should complete the business creation process successfully', () => {
      cy.visit('http://localhost:3000/signup');
  
      cy.contains('Join the Community').should('exist');
      cy.get('#business-tab').click();
      cy.contains('Business Information').should('exist');
  
      cy.get('input[placeholder="First Name"]').type('Daisy');
      cy.get('input#lastName').type('Doe');
      cy.get('input#BusinessName').type('Tech Innovators');
      cy.get('input#email').type('daisydoe@example.com');
      cy.get('input#contactNumber').type('+1234567890');
      cy.get('input#BusinessAddress').type('123 Tech Street');
      cy.get('input#city').type('Tech City');
      cy.get('input#stateProvince').type('Tech Province');
      cy.get('input#postalCode').type('12345');
      cy.get('input#country').type('Tech Country');
      cy.get('textarea#description').type('An innovative tech business focused on AI solutions.');
      cy.get('input[value="Technology"]').check();
  
      cy.get('input#username').type('techinnovator');
      cy.get('input#password').type('Password@123');
      cy.get('input#confirmPassword').type('Password@123');
  
      cy.contains('Submit your details').click();
    });
  
    it('should approve the business request as an admin', () => {
      cy.visit('http://localhost:3000/login');
      cy.get('input[placeholder="Your email"]').type('amy@gmail.com');
      cy.get('input[placeholder="Your Password"]').type('12345678');
      cy.contains('Login').click();
      cy.url().should('eq', 'http://localhost:3000/');
      cy.contains('Profile').click();
      cy.contains('Business Request').click();
  
      cy.contains('Tech Innovators').should('exist');
      cy.contains('Allow').click();
    });
  
    it('should log in as the approved business', () => {
      cy.visit('http://localhost:3000/login');
  
      cy.get('input[placeholder="Your email"]').type('daisydoe@example.com');
      cy.get('input[placeholder="Your Password"]').type('Password@123');
      cy.contains('Login').click();
      cy.url().should('eq', 'http://localhost:3000/');
      cy.contains('Profile').click();
      cy.contains('Tech Innovators').should('exist');
    });
  });
  