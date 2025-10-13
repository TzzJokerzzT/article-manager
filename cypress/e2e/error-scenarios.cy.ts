/// <reference types="cypress" />

describe('Article Management - Error Scenarios', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/articles');
  });

  it('should show validation errors when creating article with empty fields', () => {
    cy.get('[href="/articles/create"]').click();

    // Try to submit without filling required fields
    cy.get('button[type="submit"]').click();

    // Should stay on the create page due to HTML5 validation
    cy.url().should('include', '/articles/create');

    // Check that form fields are marked as required and invalid
    cy.get('#title:invalid').should('exist');
    cy.get('#author:invalid').should('exist');
    cy.get('#category:invalid').should('exist');
    cy.get('#summary:invalid').should('exist');
    cy.get('#content:invalid').should('exist');
  });

  it('should handle partially filled form submission', () => {
    cy.get('[href="/articles/create"]').click();

    // Fill only some fields
    cy.get('#title').type('Incomplete Article');
    cy.get('#author').type('Test Author');
    // Leave category, summary, and content empty

    // Try to submit
    cy.get('button[type="submit"]').click();

    // Should stay on create page due to validation
    cy.url().should('include', '/articles/create');

    // Category, summary, and content should be invalid
    cy.get('#category:invalid').should('exist');
    cy.get('#summary:invalid').should('exist');
    cy.get('#content:invalid').should('exist');
  });

  it('should handle navigation without saving changes', () => {
    cy.get('[href="/articles/create"]').click();

    // Start filling out the form
    cy.get('#title').type('Unsaved Article');
    cy.get('#author').type('Test Author');

    // Navigate away using the browser back button or navigation
    cy.get('[href="/articles"]').click();

    // Should be back on articles page
    cy.url().should('include', '/articles');
    cy.url().should('not.include', '/create');

    // The unsaved article should not appear in the list
    cy.contains('Unsaved Article').should('not.exist');
  });

  it('should handle form cancellation', () => {
    cy.get('[href="/articles/create"]').click();

    // Fill out some form fields
    cy.get('#title').type('Article to Cancel');
    cy.get('#author').type('Test Author');
    cy.get('#summary').type('This article will be cancelled');

    // Click cancel button
    cy.contains('button', 'Cancel').click();

    // Should navigate back to articles list
    cy.url().should('include', '/articles');
    cy.url().should('not.include', '/create');

    // The cancelled article should not appear in the list
    cy.contains('Article to Cancel').should('not.exist');
  });

  it('should validate article length constraints', () => {
    cy.get('[href="/articles/create"]').click();

    // Test with very long title (assuming there might be length limits)
    const longTitle = 'A'.repeat(200);
    const longContent = 'B'.repeat(10000);

    cy.get('#title').type(longTitle);
    cy.get('#author').type('Test Author');
    cy.get('#category').select('tech');
    cy.get('#summary').type('Test summary');
    cy.get('#content').type(longContent);

    // Try to submit - this should work since we don't have explicit length limits
    cy.get('button[type="submit"]').click();

    // Should successfully create the article
    cy.url().should('include', '/articles');
    cy.contains(longTitle.substring(0, 50)).should('be.visible'); // Check first part of title
  });

  it('should handle empty article list gracefully', () => {
    // Clear any existing articles by visiting articles page after clearing localStorage
    cy.clearLocalStorage();
    cy.visit('/articles');

    // Should show empty state message
    cy.contains('No articles found').should('be.visible');
    cy.contains('Create the first article').should('be.visible');

    // The "Create the first article" link should work
    cy.contains('Create the first article').click();
    cy.url().should('include', '/articles/create');
  });

  it('should handle rapid form submissions', () => {
    cy.get('[href="/articles/create"]').click();

    // Fill out the form
    cy.get('#title').type('Rapid Test Article');
    cy.get('#author').type('Test Author');
    cy.get('#category').select('tech');
    cy.get('#summary').type('Testing rapid submission');
    cy.get('#content').type('Content for rapid submission test');

    // Try to submit multiple times rapidly
    cy.get('button[type="submit"]').click();
    cy.get('button[type="submit"]').click();
    cy.get('button[type="submit"]').click();

    // Should only create one article
    cy.url().should('include', '/articles');

    // Check that only one instance of the article exists
    cy.get('body').then(($body) => {
      const articleCount = $body.find(':contains("Rapid Test Article")').length;
      expect(articleCount).to.be.at.most(3); // Allow for title + card content, but not multiple duplicate articles
    });
  });

  it('should handle invalid category selection gracefully', () => {
    cy.get('[href="/articles/create"]').click();

    // Fill form with valid data
    cy.get('#title').type('Valid Article');
    cy.get('#author').type('Test Author');
    cy.get('#summary').type('Valid summary');
    cy.get('#content').type('Valid content');

    // Don't select a category (leave it empty)
    // Try to submit
    cy.get('button[type="submit"]').click();

    // Should show validation error for category
    cy.get('#category:invalid').should('exist');
    cy.url().should('include', '/articles/create'); // Should stay on create page
  });
});
