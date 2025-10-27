import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArticleCard } from '@/features/articles/components/ArticleCard/ArticleCard';
import { useFavorites, useArticles } from '@/features/articles/hooks';
import { EnterAnimation } from '@/shared/components/Animation/EnterAnimation';
import type { ArticleFilters } from '@/shared/types';
import { FavoriteMainTitle } from '@/features/favorites/components/Title/Title';
import { MessageNoFavorites } from '@/features/favorites/components/Message/Message';
import { LoaderWithMessage } from '@/shared/components/Loading/LoaderWithMesssage';

const FavoritesPage = () => {
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
    return <LoaderWithMessage message="Loading your favorite articles..." />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <FavoriteMainTitle favoriteArticles={favoriteArticles} />

      {favoriteArticles.length === 0 ? (
        <MessageNoFavorites />
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

export default FavoritesPage;
