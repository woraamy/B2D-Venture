describe('Business Search and Filter Page', () => {
  beforeEach(() => {
      cy.visit('http://localhost:3000/business');
      cy.viewport(1920, 1080)

  });

  it('should search for the business "Zephyr Aerospace" and display the results', () => {
      cy.contains('h1', 'Businesses').should('exist');

      cy.get('input[placeholder="Search Business"]')
          .should('exist')
          .type('Zephyr Aerospace{enter}');

      cy.wait(1000);

      cy.contains('Zephyr Aerospace').should('exist');
  });

  it('should display "no match is found" when the business is not found', () => {
      cy.get('input[placeholder="Search Business"]')
          .should('exist')
          .type('cocacola{enter}');

      cy.wait(1000);
      cy.contains('no match is found').should('exist');
  });

  it('should open the filter menu and display filter options', () => {
      cy.get('button').contains('Filter').click();
      cy.get('.absolute').should('exist');

      const tags = ["Aerospace", "Food & Drinks", "Shop", "Technology", "Innovation", "Transportation", "Energy", "AI & Machine Learning"];
      tags.forEach((tag) => {
          cy.contains(tag).should('exist');
      });

      cy.get('button').contains('Sorted by').click();
      const sortingOptions = ["Newest", "Oldest", "Popular", "Nearly close"];
      sortingOptions.forEach((option) => {
          cy.contains(option).should('exist');
      });
  });

  it('should filter businesses by selected tags', () => {
      cy.get('button').contains('Filter').click();

      cy.get('input[type="checkbox"]').check(['Technology', 'Innovation']);

      cy.get('button').contains('Filter Now').click();

      cy.wait(1000);

      cy.contains('Technology').should('exist');
      cy.contains('Innovation').should('exist');
  });

  it('should filter businesses by sorting option', () => {
      cy.get('button').contains('Filter').click();
      cy.get('button').contains('Sorted by').click();
      cy.contains('Newest').click();

      cy.get('button').contains('Filter Now').click();

      cy.wait(1000);

      cy.contains('Newest').should('exist'); 
  });

  it('should apply multiple filters and update the results', () => {
      cy.get('button').contains('Filter').click();
      cy.get('input[type="checkbox"]').check(['Energy']);
      cy.get('button').contains('Sorted by').click();
      cy.contains('Popular').click();
      cy.get('button').contains('Filter Now').click();
      cy.wait(1000);
      cy.contains('Energy').should('exist');
      cy.contains('Popular').should('exist');
  });
});
