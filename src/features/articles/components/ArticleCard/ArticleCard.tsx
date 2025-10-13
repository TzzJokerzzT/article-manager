import { Button } from '@/shared/components/Button/Button';
import { Tags } from '@/shared/components/Tags/Tags';
import { formatDate, truncateText } from '@/shared/utils';
import { Heart, HeartOff, Star, StarOff } from 'lucide-react';
import { useState } from 'react';
import {
  useArticleRating,
  useRateArticle,
  useToggleFavorite,
} from '../../hooks';
import type { ArticleCardProps } from './types';

export const ArticleCard = ({
  article,
  onEdit,
  onDelete,
  onViewDetails,
}: ArticleCardProps) => {
  const [userRating, setUserRating] = useState<number>(0);
  const toggleFavorite = useToggleFavorite();
  const rateArticle = useRateArticle();
  const { data: rating } = useArticleRating(article.id);

  const handleRating = (rating: number) => {
    setUserRating(rating);
    rateArticle.mutate({ articleId: article.id, rating });
  };

  const handleToggleFavorite = () => {
    toggleFavorite.mutate({
      articleId: article.id,
      isFavorite: !!article.isFavorite,
    });
  };

  return (
    <div className="article-card rounded-lg p-4 shadow-md bg-white">
      <div className="flex justify-between items-start mb-2">
        <h3
          className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-blue-600"
          onClick={onViewDetails}
        >
          {article.title}
        </h3>
        <Button
          onClick={handleToggleFavorite}
          aria-label={article.isFavorite ? 'Unfavorite' : 'Favorite'}
          color={article.isFavorite ? 'danger' : 'secondary'}
          variant="light"
          disabled={toggleFavorite.isPending}
          data-testid={`favorite-${article.id}`}
        >
          {article.isFavorite ? (
            <Heart color="#dc2626" fill="#dc2626" />
          ) : (
            <HeartOff color="#6b7280" />
          )}
        </Button>
      </div>

      <p className="text-gray-600 text-sm mb-2">By {article.author}</p>
      <p className="text-gray-700 mb-3">{truncateText(article.summary, 150)}</p>

      <div className="flex flex-col justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Rating:</span>
          <div className="flex" data-testid={`rating-${article.id}`}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Button
                key={star}
                onClick={() => handleRating(star)}
                disabled={rateArticle.isPending}
                size="sm"
                className="mx-1"
                variant="light"
              >
                {star <= (userRating || rating?.rating || article.rating) ? (
                  <Star color="#dbdb39" fill="#dbdb39" />
                ) : (
                  <StarOff color="#dbdb39" />
                )}
              </Button>
            ))}
          </div>
          <span className="text-sm text-gray-500">
            ({rating?.count || article.ratingCount} votes)
          </span>
        </div>

        <div className="flex space-x-2 mt-3">
          {onEdit && (
            <Button onClick={onEdit} size="sm">
              Edit
            </Button>
          )}
          {onDelete && (
            <Button size="sm" color="danger" onClick={onDelete}>
              Delete
            </Button>
          )}
          {onViewDetails && (
            <Button size="sm" color="success" onClick={onViewDetails}>
              View Details
            </Button>
          )}
        </div>
      </div>

      <div className="mt-2 text-xs text-gray-400">
        Created: {formatDate(article.createdAt)}
      </div>

      <div className="mt-2 flex flex-wrap gap-1">
        {article.tags.map((tag) => (
          <Tags size="xs" color="secondary" radius="lg" key={tag}>
            {tag}
          </Tags>
        ))}
      </div>
    </div>
  );
};
