import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout';

import {
  ArticleDetailPage,
  ArticlesPage,
  CategoriesPage,
  CreateArticlePage,
  EditArticlePage,
  FavoritesPage,
} from './routes';

import { LoadingSpinner } from './shared/components/Loading';

/**
 * Loading fallback component for lazy-loaded pages
 * @returns JSX element with loading spinner
 */
const PageLoadingFallback = () => (
  <LoadingSpinner size="lg" className="min-h-[100vh]" />
);

/**
 * Main Application component that sets up routing, state management, and React Query
 * Provides Redux store, React Query client, and router configuration
 * @returns JSX element with complete application structure
 */
function App() {
  return (
    <Suspense fallback={<PageLoadingFallback />}>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/articles" replace />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/create" element={<CreateArticlePage />} />
          <Route path="/articles/:id" element={<ArticleDetailPage />} />
          <Route path="/articles/:id/edit" element={<EditArticlePage />} />
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
      </Layout>
    </Suspense>
  );
}

export default App;
