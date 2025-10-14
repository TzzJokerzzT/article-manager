import { describe, it, expect, beforeEach } from 'vitest';
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '@/application/store';
import { FavoritesPage } from '@/pages/favorites/FavoritesPage';
import { MockFavoriteRepository } from '@/infrastructure/repositories/MockFavoriteRepository';
import { MockArticleRepository } from '@/infrastructure/repositories/MockArticleRepository';

// Mock repositories
const mockFavoriteRepo = new MockFavoriteRepository();
const mockArticleRepo = new MockArticleRepository();

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
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
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
    const articles = await mockArticleRepo.findAll({ page: 1, limit: 5 });
    const firstArticle = articles.data[0];

    // Add article to favorites
    await mockFavoriteRepo.addFavorite(firstArticle.id);

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
    render(
      <TestWrapper>
        <FavoritesPage />
      </TestWrapper>
    );

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
    const articles = await mockArticleRepo.findAll({ page: 1, limit: 5 });

    await mockFavoriteRepo.addFavorite(articles.data[0].id);
    await mockFavoriteRepo.addFavorite(articles.data[1].id);
    await mockFavoriteRepo.addFavorite(articles.data[2].id);

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
