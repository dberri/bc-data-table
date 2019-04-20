const getStore = () => cy.window().its('app.$store');

describe('Tests sortability', () => {
  it('Starts empty', () => {
    cy.visit('/');
    getStore()
      .its('state')
      .should('deep.equal', {
        payments: [],
      });
  });

  it('Loads payments', () => {
    getStore()
      .its('state.payments')
      .should('have.length', 100);
    cy.get('tbody tr').should('have.length', 100);
  });

  it('Sorts table by Name in ascending order when user clicks on the Name column header', () => {
    cy.get('thead th:first-child').click();
    cy.get('tbody tr:first-child td:first-child').contains('Aimee Davidson');
    cy.get('tbody tr:last-child td:first-child').contains('Yael Horn');
  });

  it('Sorts table by Name in descending order when user clicks on the Name column header again', () => {
    cy.get('thead th:first-child').click();
    cy.get('tbody tr:first-child td:first-child').contains('Yael Horn');
    cy.get('tbody tr:last-child td:first-child').contains('Aimee Davidson');
  });

  it('Sorts table by Date in ascending order when user clicks on the Date column header', () => {
    cy.get('thead th:nth-child(3)').click();
    cy.get('tbody tr:first-child td:nth-child(3)').contains('2017-05-04T10:11:50-07:00');
    cy.get('tbody tr:last-child td:nth-child(3)').contains('2019-10-28T04:57:29-07:00');
  });

  it('Sorts table by Date in descending order when user clicks on the Date column header again', () => {
    cy.get('thead th:nth-child(3)').click();
    cy.get('tbody tr:first-child td:nth-child(3)').contains('2019-10-28T04:57:29-07:00');
    cy.get('tbody tr:last-child td:nth-child(3)').contains('2017-05-04T10:11:50-07:00');
  });

  it('Sorts table by Amount in ascending order when user clicks on the Amount column header', () => {
    cy.get('thead th:nth-child(4)').click();
    cy.get('tbody tr:first-child td:nth-child(4)').contains(-792.3);
    cy.get('tbody tr:last-child td:nth-child(4)').contains(967.89);
  });

  it('Sorts table by Amount in descending order when user clicks on the Amount column header again', () => {
    cy.get('thead th:nth-child(4)').click();
    cy.get('tbody tr:first-child td:nth-child(4)').contains(967.89);
    cy.get('tbody tr:last-child td:nth-child(4)').contains(-792.3);
  });
});
