describe('Tests searchability', () => {
  it('Filters by name', () => {
    cy.visit('/');
    cy.get('.search-row td:first-child input').type('Aurelia');
    cy.get('tbody tr').should('have.length', 1);
    cy.get('tbody tr:first-child td:first-child span').contains('Aurelia Pearson');
    cy.get('.search-row td:first-child input').clear();
  });

  it('Filters by description', () => {
    cy.get('.search-row td:nth-child(2) input').type('Mauris magna');
    cy.get('tbody tr').should('have.length', 1);
    cy.get('.search-row td:nth-child(2) input').clear();
  });
});
