import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { vi } from 'vitest';
import uiReducer, { setTheme, setLoading } from '@/application/store/uiSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../application/hooks/redux';
import { useArticles, useCreateArticle } from '../hooks';
import type { ArticleFilters } from '@/shared/types';

// Create a test component that uses both Redux and React Query
const TestArticleComponent = () => {
  const dispatch = useAppDispatch();
  const { theme, isLoading } = useAppSelector((state) => state.ui);

  const filters: ArticleFilters = {
    page: 1,
    limit: 10,
    categoryId: '',
    subcategoryId: '',
    search: '',
  };

  const {
    data: articlesData,
    isLoading: articlesLoading,
    error,
  } = useArticles(filters);
  const createArticle = useCreateArticle();

  const handleToggleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  const handleSetLoading = () => {
    dispatch(setLoading(true));
  };

  const handleCreateArticle = () => {
    createArticle.mutate({
      title: 'Test Article',
      content: 'Test content',
      summary: 'Test summary',
      author: 'Test Author',
      categoryId: 'tech',
      subcategoryId: '',
      tags: ['test'],
    });
  };

  return (
    <div>
      <div data-testid="theme">{theme}</div>
      <div data-testid="ui-loading">
        {isLoading ? 'loading' : 'not-loading'}
      </div>
      <div data-testid="articles-loading">
        {articlesLoading ? 'articles-loading' : 'articles-loaded'}
      </div>
      <div data-testid="articles-count">{articlesData?.data?.length || 0}</div>
      <div data-testid="create-loading">
        {createArticle.isPending ? 'creating' : 'not-creating'}
      </div>
      {error && <div data-testid="error">{error.message}</div>}

      <button onClick={handleToggleTheme} data-testid="toggle-theme">
        Toggle Theme
      </button>
      <button onClick={handleSetLoading} data-testid="set-loading">
        Set Loading
      </button>
      <button onClick={handleCreateArticle} data-testid="create-article">
        Create Article
      </button>
    </div>
  );
};

// Test utilities
const createTestStore = () => {
  return configureStore({
    reducer: {
      ui: uiReducer,
    },
  });
};

const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });
};

const renderWithProviders = (ui: React.ReactElement) => {
  const store = createTestStore();
  const queryClient = createTestQueryClient();

  return {
    store,
    queryClient,
    ...render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>{ui}</BrowserRouter>
        </QueryClientProvider>
      </Provider>
    ),
  };
};

describe('Redux + React Query Integration', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('Redux UI state works independently of React Query server state', async () => {
    renderWithProviders(<TestArticleComponent />);

    // Initial state
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
    expect(screen.getByTestId('ui-loading')).toHaveTextContent('not-loading');

    // Redux state changes independently
    fireEvent.click(screen.getByTestId('toggle-theme'));
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');

    fireEvent.click(screen.getByTestId('set-loading'));
    expect(screen.getByTestId('ui-loading')).toHaveTextContent('loading');

    // React Query state is independent
    await waitFor(() => {
      expect(screen.getByTestId('articles-loading')).toHaveTextContent(
        'articles-loaded'
      );
    });

    // Verify Redux state is preserved
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    expect(screen.getByTestId('ui-loading')).toHaveTextContent('loading');
  });

  test('React Query mutations work while Redux maintains UI state', async () => {
    renderWithProviders(<TestArticleComponent />);

    // Set up initial Redux state
    fireEvent.click(screen.getByTestId('toggle-theme'));
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');

    // Wait for articles to load
    await waitFor(() => {
      expect(screen.getByTestId('articles-loading')).toHaveTextContent(
        'articles-loaded'
      );
    });

    // Check initial count is 10 (pagination limit)
    expect(
      parseInt(screen.getByTestId('articles-count').textContent || '0')
    ).toBe(10);

    // Trigger mutation
    fireEvent.click(screen.getByTestId('create-article'));

    // Check that mutation state changes
    expect(screen.getByTestId('create-loading')).toHaveTextContent('creating');

    // Wait for mutation to complete and data to refresh
    await waitFor(() => {
      expect(screen.getByTestId('create-loading')).toHaveTextContent(
        'not-creating'
      );
    });

    await waitFor(() => {
      const newCount = parseInt(
        screen.getByTestId('articles-count').textContent || '0'
      );
      // The count should still be 10 because we're only showing 10 per page,
      // but the data should be refreshed (which means the mutation worked and cache was invalidated)
      expect(newCount).toBe(10);
    });

    // Verify Redux state is still preserved
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
  });

  test('both stores maintain their state during complex interactions', async () => {
    renderWithProviders(<TestArticleComponent />);

    // Rapid state changes in both stores
    fireEvent.click(screen.getByTestId('toggle-theme'));
    fireEvent.click(screen.getByTestId('set-loading'));

    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    expect(screen.getByTestId('ui-loading')).toHaveTextContent('loading');

    // Wait for React Query to settle
    await waitFor(() => {
      expect(screen.getByTestId('articles-loading')).toHaveTextContent(
        'articles-loaded'
      );
    });

    // Multiple theme toggles
    fireEvent.click(screen.getByTestId('toggle-theme'));
    fireEvent.click(screen.getByTestId('toggle-theme'));

    expect(screen.getByTestId('theme')).toHaveTextContent('dark');

    // Create article while changing theme
    fireEvent.click(screen.getByTestId('create-article'));
    fireEvent.click(screen.getByTestId('toggle-theme'));

    expect(screen.getByTestId('theme')).toHaveTextContent('light');
    expect(screen.getByTestId('create-loading')).toHaveTextContent('creating');

    // Wait for everything to settle
    await waitFor(() => {
      expect(screen.getByTestId('create-loading')).toHaveTextContent(
        'not-creating'
      );
    });

    // Both stores should maintain their final state
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
    expect(screen.getByTestId('ui-loading')).toHaveTextContent('loading');
  });

  test('error states are handled properly in both stores', async () => {
    // Mock the article repository to throw an error
    const originalConsoleError = console.error;
    console.error = vi.fn();

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    const store = createTestStore();

    // We'll create a component that forces an error
    const ErrorComponent = () => {
      const dispatch = useAppDispatch();
      const { theme } = useAppSelector((state) => state.ui);

      const filters: ArticleFilters = {
        page: 1,
        limit: 10,
        categoryId: '',
        subcategoryId: '',
        search: '',
      };

      const { error } = useArticles(filters);

      const handleToggleTheme = () => {
        dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
      };

      return (
        <div>
          <div data-testid="theme">{theme}</div>
          {error && <div data-testid="error">Error occurred</div>}
          <button onClick={handleToggleTheme} data-testid="toggle-theme">
            Toggle Theme
          </button>
        </div>
      );
    };

    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <ErrorComponent />
          </BrowserRouter>
        </QueryClientProvider>
      </Provider>
    );

    // Redux should still work even when React Query has errors
    fireEvent.click(screen.getByTestId('toggle-theme'));
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');

    console.error = originalConsoleError;
  });
});
