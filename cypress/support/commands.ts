/// <reference types="cypress" />

// Custom Cypress commands for Article Management System

declare namespace Cypress {
  interface Chainable {
    createArticle(article: {
      title: string;
      content: string;
      category: string;
      author: string;
      summary: string;
    }): Chainable<any>;

    rateArticle(articleId: string, rating: number): Chainable<any>;

    toggleFavorite(articleId: string): Chainable<any>;

    visitArticles(): Chainable<any>;
  }
}

Cypress.Commands.add(
  'createArticle',
  (article: {
    title: string;
    content: string;
    category: string;
    author: string;
    summary: string;
  }) => {
    cy.visit('/articles/create');
    cy.get('#title').type(article.title);
    cy.get('#author').type(article.author);
    cy.get('#category').select(article.category);
    cy.get('#summary').type(article.summary);
    cy.get('#content').type(article.content);
    cy.get('button[type="submit"]').click();
  }
);

Cypress.Commands.add('rateArticle', (articleId: string, rating: number) => {
  cy.get(`[data-testid="rating-${articleId}"] button`)
    .eq(rating - 1)
    .click();
});

Cypress.Commands.add('toggleFavorite', (articleId: string) => {
  cy.get(`[data-testid="favorite-${articleId}"]`).click();
});

Cypress.Commands.add('visitArticles', () => {
  cy.visit('/articles');
});
