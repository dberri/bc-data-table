const sentence = ' quam felis, ultricies nec';
const description = 'et magnis dis parturient montes, nascetur ridiculus mus. Donec';

describe('Tests editability', () => {
  it('Shows one editing box when clicks edit button', () => {
    cy.visit('/');

    cy.get('tbody tr:first-child td:nth-child(2)')
      .trigger('mouseover')
      .find('button.edit-btn')
      .click();

    cy.get('.edit-box.active').should('have.length', 1);

    cy.get('tbody tr:first-child td:nth-child(2)')
      .find('.edit-box.active')
      .should('be.visible');
  });

  it('Edits the description of the first payment on the list', () => {
    cy.get('tbody tr:first-child td:nth-child(2)').contains(description);

    cy.get('.edit-box.active')
      .find('input')
      .should('have.value', description);

    cy.get('.edit-box.active input').type(sentence);
    cy.get('.edit-box.active button[type=submit]').click();
    cy.contains(`${description}${sentence}`, { timeout: 10000 });
  });
});
