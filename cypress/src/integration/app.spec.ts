export const app =
  'Step: ' +
  Cypress.config()
    .integrationFolder.split('\\')
    .find(pathSegment => /[0-9]/.test(pathSegment));

describe(app, () => {
  // this test is similar to step 300
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the real employees', () => {
    cy.get('.collection-item').should('have.length', 5);
    cy.contains('Henry Holmes');
  });

  it('should load the stubbed employees, checking for loading indicator', () => {
    cy.server();
    cy.route({
      url: '/api/employees',
      response: [
        {
          email: 'hholmes0@goodreads.com',
          firstName: 'Henry',
          hourlyWage: 19,
          hoursWorked: 29,
          id: 1,
          lastName: 'Holmes'
        },
        {
          email: 'hcox1@who.int',
          firstName: 'Harold',
          hourlyWage: 11,
          hoursWorked: 18,
          id: 2,
          lastName: 'Cox'
        }
      ],
      // using this delay will allow for reliable testing of the loading indicator
      delay: 1000
    }).as('getEmployees');
    cy.visit('/');
    cy.wait('@getEmployees');
    cy.get('.collection-item').should('have.length', 2);
    cy.contains('Henry Holmes');
  });

  it('should handle not being able to get any employees', () => {
    cy.server();
    cy.route({
      url: '/api/employees',
      response: []
    }).as('getEmployees');
    cy.get('.collection-item').should('not.exist');
  });
});
