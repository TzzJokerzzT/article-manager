import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArticleCard } from '@/features/articles/components/ArticleCard/ArticleCard';
import { useFavorites, useArticles } from '@/features/articles/hooks';
import { EnterAnimation } from '@/shared/components/Animation/EnterAnimation';
import type { ArticleFilters } from '@/shared/types';
import { Button } from '@/shared/components/Button/Button';

export const FavoritesPage = () => {
  const navigate = useNavigate();
  const { data: favoriteIds, isLoading: favoritesLoading } = useFavorites();

  // Get all articles to filter favorites from them
  const [filters] = useState<ArticleFilters>({
    page: 1,
    limit: 100, // Get more articles to ensure we catch all favorites
  });

  const { data: articlesResponse, isLoading: articlesLoading } =
    useArticles(filters);

  const isLoading = favoritesLoading || articlesLoading;

  // Filter articles to show only favorites
  const favoriteArticles =
    articlesResponse?.data.filter((article) =>
      favoriteIds?.includes(article.id)
    ) || [];

  const handleViewDetails = (articleId: string) => {
    navigate(`/articles/${articleId}`);
  };

  const handleEdit = (articleId: string) => {
    navigate(`/articles/edit/${articleId}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading your favorites...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          My Favorite Articles
        </h1>
        <p className="text-gray-600">
          {favoriteArticles.length === 0
            ? "You haven't added any articles to favorites yet."
            : `You have ${favoriteArticles.length} favorite article${favoriteArticles.length === 1 ? '' : 's'}.`}
        </p>
      </div>

      {favoriteArticles.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-gray-400 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No favorites yet
          </h3>
          <p className="text-gray-500 mb-6">
            Start exploring articles and click the heart icon to add them to
            your favorites.
          </p>
          <Button onClick={() => navigate('/articles')}>Browse Articles</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteArticles.map((article) => (
            <EnterAnimation key={article.id}>
              <ArticleCard
                key={article.id}
                article={article}
                onViewDetails={() => handleViewDetails(article.id)}
                onEdit={() => handleEdit(article.id)}
              />
            </EnterAnimation>
          ))}
        </div>
      )}
    </div>
  );
};
