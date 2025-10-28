/**
 * Pre-defined categories and subcategories for article organization
 * Used for filtering and categorizing articles throughout the application
 */
export const CATEGORIES = [
  {
    id: 'tech',
    name: 'Technology',
    description: 'Articles about technology and programming',
    subcategories: [
      {
        id: 'web-dev',
        name: 'Web Development',
        description: 'Frontend and backend web development',
        categoryId: 'tech',
      },
      {
        id: 'mobile',
        name: 'Mobile Development',
        description: 'Mobile app development',
        categoryId: 'tech',
      },
      {
        id: 'ai-ml',
        name: 'AI & Machine Learning',
        description: 'Artificial intelligence and machine learning',
        categoryId: 'tech',
      },
    ],
  },
  {
    id: 'science',
    name: 'Science',
    description: 'Scientific articles and research',
    subcategories: [],
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Business and entrepreneurship articles',
    subcategories: [],
  },
];

/** Mock user ID for development and testing purposes */
export const MOCK_USER_ID = 'user-1';

/** API endpoint constants for future backend integration */
export const API_ENDPOINTS = {
  ARTICLES: '/api/articles',
  CATEGORIES: '/api/categories',
  RATINGS: '/api/ratings',
  FAVORITES: '/api/favorites',
};

/** localStorage keys for persisting data in the browser */
export const STORAGE_KEYS = {
  FAVORITES: 'article_favorites',
  RATINGS: 'article_ratings',
  ARTICLES: 'articles_cache',
  THEME: 'app_theme',
} as const;
