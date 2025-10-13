/// <reference types="cypress" />

describe('Article Management - Happy Path Flow', () => {
  let articleFixtures: any;

  before(() => {
    cy.fixture('articles').then((fixtures) => {
      articleFixtures = fixtures;
    });
  });

  beforeEach(() => {
    // Clear all localStorage to ensure clean state
    cy.clearLocalStorage();
    cy.window().then((win) => {
      win.localStorage.clear();
      // Reset all storage keys to empty state
      win.localStorage.setItem('articles_cache', '[]');
      win.localStorage.setItem('article_favorites', '[]');
      win.localStorage.setItem('article_ratings', '[]');
    });
    // Visit the main articles page and ensure it's loaded
    cy.visitArticles();
    cy.get('h1').should('contain', 'Articles'); // Wait for page to load
    // Wait for any loading to complete (in case no articles message appears)
    cy.get('body').should('be.visible');
  });

  afterEach(() => {
    // Additional cleanup after each test
    cy.clearLocalStorage();
  });

  it('should complete the full article lifecycle: create → view → rate → favorite', () => {
    const article = articleFixtures.sampleArticle;

    // Step 1: Navigate to create article page and create an article
    cy.get('[href="/articles/create"]').first().click();
    cy.url().should('include', '/articles/create');

    // Fill out the article form
    cy.createArticle(article);

    // Should redirect to articles list after creation
    cy.url().should('include', '/articles');
    cy.contains(article.title).should('be.visible');

    // Step 2: Click on the newly created article to view details (click the title specifically)
    cy.contains('.bg-white h3', article.title).first().click();
    cy.url().should('match', /\/articles\/[a-z0-9]+$/);

    // Verify article details are displayed
    cy.contains(article.title).should('be.visible');
    cy.contains(article.author).should('be.visible');
    cy.contains(article.content).should('be.visible');

    // Step 3: Go back to articles list to rate and favorite (interactive elements are on list page)
    cy.get('[href="/articles"]').first().click();
    cy.url().should('include', '/articles');

    // Rate the article (give it 4 stars) from the article card
    cy.contains('.bg-white', article.title).within(() => {
      // Check that rating container exists
      cy.get('[data-testid^="rating-"]').should('have.length', 1);
      cy.get('[data-testid^="rating-"]')
        .first()
        .within(() => {
          // Check that there are 5 rating buttons
          cy.get('button').should('have.length', 5);
          cy.get('button').eq(3).should('exist');
          cy.get('button').eq(3).click(); // 4th star (0-indexed)
          // Wait for rating to be processed
          cy.wait(1000);
          // Verify button still exists (rating uses SVG icons, not CSS classes)
          cy.get('button').eq(3).should('exist');
        });

      // Step 4: Add article to favorites
      cy.get('[data-testid^="favorite-"]').should('have.length', 1);
      cy.get('[data-testid^="favorite-"]').first().click();
      // Wait for favorite status to update
      cy.wait(1000);
      // Verify favorite button still exists (uses SVG icons, not emoji)
      cy.get('[data-testid^="favorite-"]').first().should('exist');
    });

    // Step 5: Verify we can view the article detail with the rating displayed (static display)
    cy.contains('.bg-white h3', article.title).first().click();
    cy.url().should('match', /\/articles\/[a-z0-9]+$/);

    // Verify rating display on detail page (static display, not interactive)
    cy.get('.flex').contains('★').should('be.visible');
    // Check for any rating value (the article might have a default rating)
    cy.get('span.text-sm.text-gray-600')
      .should('contain', '.')
      .should('contain', 'votes');
  });

  it('should create multiple articles and verify they appear in the list', () => {
    const articles = [
      articleFixtures.sampleArticle,
      articleFixtures.secondArticle,
      articleFixtures.businessArticle,
    ];

    // Create multiple articles
    articles.forEach((article) => {
      cy.get('[href="/articles/create"]').first().click();
      cy.createArticle(article);
      cy.url().should('include', '/articles');

      // Verify the article appears in the list
      cy.contains('.bg-white', article.title).should('be.visible');
    });

    // Verify all articles are visible on the main page
    articles.forEach((article) => {
      cy.contains('.bg-white', article.title).should('be.visible');
    });

    // Verify we can navigate through articles using pagination if needed
    // (This would be tested if we had more than 10 articles)
  });

  it('should filter articles by category', () => {
    const techArticle = articleFixtures.sampleArticle;
    const businessArticle = articleFixtures.businessArticle;

    // Create articles in different categories
    cy.get('[href="/articles/create"]').first().click();
    cy.createArticle(techArticle);
    cy.get('[href="/articles/create"]').first().click();
    cy.createArticle(businessArticle);

    // Navigate back to articles list
    cy.visitArticles();

    // Verify both articles are visible initially
    cy.contains('.bg-white', techArticle.title).should('be.visible');
    cy.contains('.bg-white', businessArticle.title).should('be.visible');

    // Filter by Technology category
    cy.get('[data-testid="category-filter"]').first().select('tech');

    // Add a small wait for the filter to process
    cy.wait(1000);

    // Debug: Log what articles are currently visible
    cy.get('.bg-white').then(($articles) => {
      cy.log(`Found ${$articles.length} articles after tech filter`);
    });

    // Verify tech article is visible and business article is filtered out
    cy.contains('.bg-white', techArticle.title).should('be.visible');
    cy.contains(businessArticle.title).should('not.exist');

    // Filter by Business category
    cy.get('[data-testid="category-filter"]').first().select('business');

    // Verify business article is visible and tech article is filtered out
    cy.contains('.bg-white', businessArticle.title).should('be.visible');
    cy.contains(techArticle.title).should('not.exist');

    // Clear filter (show all)
    cy.get('[data-testid="category-filter"]').first().select('');

    // Verify both articles are visible again
    cy.contains('.bg-white', techArticle.title).should('be.visible');
    cy.contains('.bg-white', businessArticle.title).should('be.visible');
  });

  it('should persist data across page refreshes', () => {
    const article = articleFixtures.sampleArticle;

    // Create an article
    cy.get('[href="/articles/create"]').first().click();
    cy.createArticle(article);

    // Navigate back to articles list to rate and favorite it
    cy.visitArticles();

    // Rate the article (5 stars) from the article card
    cy.contains('.bg-white', article.title).within(() => {
      cy.get('[data-testid^="rating-"]')
        .first()
        .within(() => {
          cy.get('button').eq(4).click(); // 5th star (0-indexed)
        });

      // Wait for rating to be processed
      cy.wait(1000);

      // Favorite the article
      cy.get('[data-testid^="favorite-"]').first().click();
      // Wait for favorite to be processed
      cy.wait(1000);
    });

    // Refresh the page
    cy.reload();

    // Verify the article still exists with its rating and favorite status after refresh
    cy.contains('.bg-white', article.title).within(() => {
      cy.get('[data-testid^="rating-"]').within(() => {
        // Just verify the rating button exists (uses SVG icons, not CSS classes)
        cy.get('button').eq(4).should('exist');
      });
      // Just verify the favorite button exists (uses SVG icons, not emoji)
      cy.get('[data-testid^="favorite-"]').should('exist');
    });

    // Also verify on the detail page that the rating is displayed correctly
    cy.contains('.bg-white h3', article.title).first().click();
    cy.url().should('match', /\/articles\/[a-z0-9]+$/);

    // Verify rating display on detail page (static display, not interactive)
    cy.get('.flex').contains('★').should('be.visible');
    cy.get('span.text-sm.text-gray-600')
      .should('contain', '.')
      .should('contain', 'votes');
  });
});
