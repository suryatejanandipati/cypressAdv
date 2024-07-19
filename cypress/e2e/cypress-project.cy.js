/// <reference types="Cypress" />

describe('page navigation', () => {
  it('should navigate pages', () => {
    cy.visit('http://localhost:5173/');
    cy.get('[data-cy="header-about-link"]').contains('About').click();
    cy.location('pathname').should('eq','/about');
    cy.go('back');
    cy.location('pathname').should('eq','/');
    cy.go('forward');
    cy.location('pathname').should('eq','/about');
  })
})