describe('Validate Tests', () => {
  it('Deve efetuar login ', () => {
    cy.visit('localhost:4200');

    cy.get('[data-cy=login]').type('maite@email.com');

    cy.get('[data-cy=password]').type('1234');

    cy.get('[data-cy=submit]').click();

    cy.viewport(1200, 620);
  });

  it('Deve entrar na tela de cadastrar anotações ', () => {
    cy.visit('localhost:4200');

    cy.get('[data-cy=login]').type('maite@email.com');

    cy.get('[data-cy=password]').type('1234');

    cy.get('[data-cy=submit]').click();

    cy.get(':nth-child(1) > .nav-item > .card > .card-body').click();

    cy.viewport(1200, 620);
  });

  it('Deve cadastrar uma anotação ', () => {
    cy.visit('localhost:4200');
    cy.get('[data-cy=login]').type('maite@email.com');

    cy.get('[data-cy=password]').type('1234');

    cy.get('[data-cy=submit]').click();

    cy.get(':nth-child(1) > .nav-item > .card > .card-body').click();

    cy.get('select option')
      .its('length', { log: false })
      .then((n) => {
        cy.get('select').select(Cypress._.random(n - 1));
      });

    cy.get('[data-cy="date"]').type('2023-02-27T12:34').click();

    cy.get('[data-cy="place"]').type('Porto Alegre');

    cy.get('[data-cy=submit]').click({ force: true });
  });

  it('Deve efetuar lougout ', () => {
    cy.visit('localhost:4200');

    cy.get('#login').type('maite@email.com');

    cy.get('#password').type('1234');

    cy.get('[data-cy=submit]').click();

    cy.get('[data-cy=logout]').click();

    cy.viewport(1200, 620);
  });
});
