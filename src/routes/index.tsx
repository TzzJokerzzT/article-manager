import { lazy } from 'react';

/** Lazy-loaded component for displaying individual article details */
// export const ArticleDetailPage = lazy(() =>
//   import('../pages/articles/ArticleDetailPage')
//     default: module.ArticleDetailPage,
//   }))
// );
export const ArticleDetailPage = lazy(
  () => import('../pages/articles/ArticleDetailPage')
);

/** Lazy-loaded component for displaying articles list with filters and pagination */
export const ArticlesPage = lazy(
  () => import('../pages/articles/ArticlesPage')
);

/** Lazy-loaded component for creating new articles */
export const CreateArticlePage = lazy(
  () => import('../pages/articles/CreateArticlePage')
);

/** Lazy-loaded component for editing existing articles */
export const EditArticlePage = lazy(
  () => import('../pages/articles/EditArticlePage')
);

/** Lazy-loaded component for displaying articles by category */
export const CategoriesPage = lazy(
  () => import('../pages/categories/CategoriesPage')
);

/** Lazy-loaded component for displaying favorite articles */
export const FavoritesPage = lazy(
  () => import('../pages/favorites/FavoritesPage')
);
