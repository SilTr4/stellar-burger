describe('testing burger constructor features', () => {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  it('add bun to constructor', () => {
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=constructor-bun-top]')
      .contains('Краторная булка N-200i')
      .should('exist');
    cy.get('[data-cy=constructor-bun-bottom]')
      .contains('Краторная булка N-200i')
      .should('exist');
  });
});

describe('testing modal window', () => {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  it('test modal opening', () => {
    cy.get('[data-cy=modal-close-button]').should('not.exist');
    cy.get('[data-cy=bun-ingredients]').contains('Краторная').click();
    cy.get('[data-cy=modal-close-button]').should('exist');
    cy.get('[data-cy=modal]').contains('Краторная').should('exist');
  });

  it('test modal closing', () => {
    cy.get('[data-cy=bun-ingredients]').contains('Краторная').click();
    cy.get('[data-cy=modal]').should('exist');
    cy.get('[data-cy=modal-close-button]').click();
    cy.get('[data-cy=modal]').should('not.exist');
  });
});

describe('testing order creation', () => {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('post', 'api/orders', { fixture: 'post_order.json' });

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-refreshToken');
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('making order', () => {
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=mains-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sauce-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=make-order-section]').contains('Оформить заказ').click();

    cy.get('[data-cy=modal]').contains('41344').should('exist');
    cy.get('[data-cy=modal-close-button]').click();
    cy.get('[data-cy=modal]').should('not.exist');

    cy.get('[data-cy=constructor-bun-top]').should('not.exist');
    cy.get('[data-cy=constructor-bun-bottom]').should('not.exist');
    cy.get('[data-cy=constructor-mains]')
      .contains('Биокотлета из марсианской Магнолии')
      .should('not.exist');
    cy.get('[data-cy=constructor-mains]')
      .contains('Соус Spicy-X')
      .should('not.exist');
  });
});
