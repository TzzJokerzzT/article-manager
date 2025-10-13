/// <reference types="cypress" />

describe('Article Management - Simple Tests', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/articles');
  });

  it('should load the articles page', () => {
    cy.contains('Articles').should('be.visible');
    cy.get('[href="/articles/create"]').should('be.visible');
  });

  it('should navigate to create article page', () => {
    cy.get('[href="/articles/create"]').click();
    cy.url().should('include', '/articles/create');
    cy.contains('Create New Article').should('be.visible');
  });

  it('should create a simple article', () => {
    cy.get('[href="/articles/create"]').click();

    // Fill out the form
    cy.get('#title').type('Test Article');
    cy.get('#author').type('Test Author');
    cy.get('#category').select('tech');
    cy.get('#summary').type('This is a test summary.');
    cy.get('#content').type('This is the test content of the article.');

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Should redirect back to articles list
    cy.url().should('include', '/articles');

    // Article should appear in the list
    cy.contains('Test Article').should('be.visible');
  });
});
