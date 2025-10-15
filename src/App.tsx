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

const ArticleDetailPage = lazy(() =>
  import('./pages/articles/ArticleDetailPage').then((module) => ({
    default: module.ArticleDetailPage,
  }))
);
const ArticlesPage = lazy(() =>
  import('./pages/articles/ArticlesPage').then((module) => ({
    default: module.ArticlesPage,
  }))
);
const CreateArticlePage = lazy(() =>
  import('./pages/articles/CreateArticlePage').then((module) => ({
    default: module.CreateArticlePage,
  }))
);
const EditArticlePage = lazy(() =>
  import('./pages/articles/EditArticlePage').then((module) => ({
    default: module.EditArticlePage,
  }))
);
const CategoriesPage = lazy(() =>
  import('./pages/categories/CategoriesPage').then((module) => ({
    default: module.CategoriesPage,
  }))
);
const FavoritesPage = lazy(() =>
  import('./pages/favorites/FavoritesPage').then((module) => ({
    default: module.FavoritesPage,
  }))
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

import { LoadingSpinner } from './shared/components/Loading';

const PageLoadingFallback = () => (
  <LoadingSpinner size="lg" className="min-h-[50vh]" />
);

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
