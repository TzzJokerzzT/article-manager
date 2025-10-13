import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { store } from './application/store';
import { Layout } from './components/Layout';
import { ArticleDetailPage } from './pages/articles/ArticleDetailPage';
import { ArticlesPage } from './pages/articles/ArticlesPage';
import { CreateArticlePage } from './pages/articles/CreateArticlePage';
import { EditArticlePage } from './pages/articles/EditArticlePage';
import { CategoriesPage } from './pages/categories/CategoriesPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Navigate to="/articles" replace />} />
              <Route path="/articles" element={<ArticlesPage />} />
              <Route path="/articles/create" element={<CreateArticlePage />} />
              <Route path="/articles/:id" element={<ArticleDetailPage />} />
              <Route path="/articles/:id/edit" element={<EditArticlePage />} />
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
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
