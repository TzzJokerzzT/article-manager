import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { lazy, Suspense } from 'react';

import { store } from './application/store';
import { Layout } from './components/Layout';

/** Lazy-loaded component for displaying individual article details */
const ArticleDetailPage = lazy(() =>
  import('./pages/articles/ArticleDetailPage').then((module) => ({
    default: module.ArticleDetailPage,
  }))
);

/** Lazy-loaded component for displaying articles list with filters and pagination */
const ArticlesPage = lazy(() =>
  import('./pages/articles/ArticlesPage').then((module) => ({
    default: module.ArticlesPage,
  }))
);

/** Lazy-loaded component for creating new articles */
const CreateArticlePage = lazy(() =>
  import('./pages/articles/CreateArticlePage').then((module) => ({
    default: module.CreateArticlePage,
  }))
);

/** Lazy-loaded component for editing existing articles */
const EditArticlePage = lazy(() =>
  import('./pages/articles/EditArticlePage').then((module) => ({
    default: module.EditArticlePage,
  }))
);

/** Lazy-loaded component for displaying articles by category */
const CategoriesPage = lazy(() =>
  import('./pages/categories/CategoriesPage').then((module) => ({
    default: module.CategoriesPage,
  }))
);

/** Lazy-loaded component for displaying favorite articles */
const FavoritesPage = lazy(() =>
  import('./pages/favorites/FavoritesPage').then((module) => ({
    default: module.FavoritesPage,
  }))
);

/** React Query client configuration with optimized defaults */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3, // Retry failed requests 3 times
      staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
      refetchOnWindowFocus: false, // Don't refetch when window regains focus
    },
  },
});

import { LoadingSpinner } from './shared/components/Loading';

/**
 * Loading fallback component for lazy-loaded pages
 * @returns JSX element with loading spinner
 */
const PageLoadingFallback = () => (
  <LoadingSpinner size="lg" className="min-h-[50vh]" />
);

/**
 * Main Application component that sets up routing, state management, and React Query
 * Provides Redux store, React Query client, and router configuration
 * @returns JSX element with complete application structure
 */
function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Layout>
            <Suspense fallback={<PageLoadingFallback />}>
              <Routes>
                <Route path="/" element={<Navigate to="/articles" replace />} />
                <Route path="/articles" element={<ArticlesPage />} />
                <Route
                  path="/articles/create"
                  element={<CreateArticlePage />}
                />
                <Route path="/articles/:id" element={<ArticleDetailPage />} />
                <Route
                  path="/articles/:id/edit"
                  element={<EditArticlePage />}
                />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route
                  path="/articles/categories/:categoryId"
                  element={<CategoriesPage />}
                />
                <Route
                  path="/articles/categories/:categoryId/:subcategoryId"
                  element={<CategoriesPage />}
                />
              </Routes>
            </Suspense>
          </Layout>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
