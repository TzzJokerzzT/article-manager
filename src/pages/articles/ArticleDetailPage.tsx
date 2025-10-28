import { useParams, useNavigate } from 'react-router-dom';
import {
  useArticle,
  useArticleRating,
  useToggleFavorite,
} from '@/features/articles/hooks';
import { formatDate } from '@/shared/utils';
import { CATEGORIES } from '@/shared/constants';
import { Button } from '@/shared/components/Button/Button';
import { Heart, HeartOff, MoveLeft } from 'lucide-react';
import { LeftEnterAnimation } from '@/shared/components/Animation/LeftEnterAnimation';

const ArticleDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toggleFavorite = useToggleFavorite();
  const { data: article, isLoading, error } = useArticle(id!);
  const { data: rating } = useArticleRating(id!);

  // Early returns for loading and error states
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="text-lg text-gray-600">Loading article...</div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Article not found.
        </div>
      </div>
    );
  }

  const handleToggleFavorite = () => {
    if (!article) return; // Extra safety check

    toggleFavorite.mutate({
      articleId: article.id,
      isFavorite: !!article.isFavorite,
    });
  };

  const category = CATEGORIES.find((cat) => cat.id === article?.categoryId);
  const subcategory = category?.subcategories?.find(
    (sub) => sub.id === article?.subcategoryId
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <LeftEnterAnimation>
        <Button onClick={() => navigate(-1)} color="secondary" size="sm">
          {/* Is not the best way but at least it works for now */}
          <div className="flex items-center">
            <MoveLeft className="mr-2" /> Back
          </div>
        </Button>

        <div className="my-2" />

        <article className="bg-white rounded-lg shadow-md p-8">
          <header className="mb-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-gray-900">
                {article.title}
              </h1>

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

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
              <span>By {article.author}</span>
              <span>•</span>
              <span>{formatDate(article.createdAt)}</span>
              <span>•</span>
              <span>{category?.name}</span>
              {subcategory && (
                <>
                  <span>•</span>
                  <span>{subcategory.name}</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => {
                  const currentRating = rating?.rating ?? article.rating;
                  return (
                    <span
                      key={star}
                      className={`text-lg ${
                        star <= currentRating
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  );
                })}
              </div>
              <span className="text-sm text-gray-600">
                {(rating?.rating ?? article.rating).toFixed(1)} (
                {rating?.count ?? article.ratingCount} votes)
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Summary
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              {article.summary}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Content
            </h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {article.content}
              </p>
            </div>
          </div>

          <footer className="flex justify-between items-center pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              Last updated: {formatDate(article.updatedAt)}
            </div>
            <div className="flex space-x-2">
              <Button onClick={() => navigate(`/articles/${article.id}/edit`)}>
                Edit Article
              </Button>
            </div>
          </footer>
        </article>
      </LeftEnterAnimation>
    </div>
  );
};

export default ArticleDetailPage;
