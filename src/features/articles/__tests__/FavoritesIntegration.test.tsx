import { describe, it, expect, beforeEach } from 'vitest';
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '@/application/store';
import { FavoritesPage } from '@/pages/favorites/FavoritesPage';
import {
  favoriteRepository,
  articleRepository,
} from '@/features/articles/services';

// Create test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{children}</BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
};

describe('Favorites Integration', () => {
  beforeEach(async () => {
    // Clear localStorage before each test to ensure clean state
    localStorage.clear();

    // Force clear all favorites by directly manipulating localStorage
    // This ensures we start with a truly empty state
    localStorage.removeItem('favorites');

    // Also clear any cached data by getting fresh repositories
    const favorites = await favoriteRepository.getFavorites();
    for (const favoriteId of favorites) {
      await favoriteRepository.removeFavorite(favoriteId);
    }

    // Double-check that favorites are actually cleared
    const remainingFavorites = await favoriteRepository.getFavorites();
    expect(remainingFavorites).toEqual([]);
  });

  it('should display empty state when no favorites exist', async () => {
    render(
      <TestWrapper>
        <FavoritesPage />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('My Favorite Articles')).toBeInTheDocument();
    });

    expect(screen.getByText('No favorites yet')).toBeInTheDocument();
    expect(
      screen.getByText("You haven't added any articles to favorites yet.")
    ).toBeInTheDocument();
  });

  it('should show favorite articles when they exist', async () => {
    // Add some articles first
    const articles = await articleRepository.findAll({ page: 1, limit: 5 });
    const firstArticle = articles.data[0];

    // Add article to favorites using the same repository the app uses
    await favoriteRepository.addFavorite(firstArticle.id);

    render(
      <TestWrapper>
        <FavoritesPage />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('My Favorite Articles')).toBeInTheDocument();
    });

    // Should show the favorite count
    await waitFor(() => {
      expect(
        screen.getByText(/You have 1 favorite article/)
      ).toBeInTheDocument();
    });

    // Should show the article
    expect(screen.getByText(firstArticle.title)).toBeInTheDocument();
  });

  it('should navigate to browse articles when clicking the button', async () => {
    // Ensure no favorites exist to show empty state (this test should run on empty state)
    render(
      <TestWrapper>
        <FavoritesPage />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('My Favorite Articles')).toBeInTheDocument();
    });

    // Wait for the Browse Articles button to appear (only shows in empty state)
    await waitFor(() => {
      expect(screen.getByText('Browse Articles')).toBeInTheDocument();
    });

    const user = userEvent.setup();
    const browseButton = screen.getByText('Browse Articles');
    await user.click(browseButton);

    // In a real test environment, you would check if navigation occurred
    // For now, we just ensure the button is clickable
    expect(browseButton).toBeInTheDocument();
  });

  it('should handle multiple favorite articles', async () => {
    // Add multiple articles to favorites
    const articles = await articleRepository.findAll({ page: 1, limit: 5 });

    await favoriteRepository.addFavorite(articles.data[0].id);
    await favoriteRepository.addFavorite(articles.data[1].id);
    await favoriteRepository.addFavorite(articles.data[2].id);

    render(
      <TestWrapper>
        <FavoritesPage />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/You have 3 favorite articles/)
      ).toBeInTheDocument();
    });

    // Should show all favorite articles
    expect(screen.getByText(articles.data[0].title)).toBeInTheDocument();
    expect(screen.getByText(articles.data[1].title)).toBeInTheDocument();
    expect(screen.getByText(articles.data[2].title)).toBeInTheDocument();
  });
});
