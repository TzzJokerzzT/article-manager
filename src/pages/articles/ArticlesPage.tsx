import { ArticleCard } from '@/features/articles/components/ArticleCard/ArticleCard';
import { Pagination } from '@/features/articles/components/Pagination/Pagination';
import {
  useArticles,
  useDeleteArticle,
  useFavorites,
} from '@/features/articles/hooks';
import { EnterAnimation } from '@/shared/components/Animation/EnterAnimation';
import { LeftEnterAnimation } from '@/shared/components/Animation/LeftEnterAnimation';
import { Button } from '@/shared/components/Button/Button';
import { Skeleton } from '@/shared/components/Loading';
import type { ArticleFilters } from '@/shared/types';
import { useState, lazy, Suspense, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ArticleFiltersComponent = lazy(() =>
  import('@/features/articles/components/ArticleFilter/Index').then(
    (module) => ({ default: module.ArticleFiltersComponent })
  )
);

export const ArticlesPage = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<ArticleFilters>({
    page: 1,
    limit: 10,
  });

  const { data: articlesResponse, isLoading, error } = useArticles(filters);
  const { data: favorites = [] } = useFavorites();
  const deleteArticle = useDeleteArticle();

  const handleEdit = useCallback(
    (articleId: string) => {
      navigate(`/articles/${articleId}/edit`);
    },
    [navigate]
  );

  const handleDelete = useCallback(
    (articleId: string) => {
      if (window.confirm('Are you sure you want to delete this article?')) {
        deleteArticle.mutate(articleId);
      }
    },
    [deleteArticle]
  );

  const handleViewDetails = useCallback(
    (articleId: string) => {
      navigate(`/articles/${articleId}`);
    },
    [navigate]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      setFilters({ ...filters, page });
    },
    [filters, setFilters]
  );

  const articlesWithFavorites = useMemo(() => {
    return (
      articlesResponse?.data.map((article: any) => ({
        ...article,
        isFavorite: favorites.includes(article.id),
      })) || []
    );
  }, [articlesResponse?.data, favorites]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error loading articles. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Articles</h1>
        <Button>
          <Link to="/articles/create">Create Article</Link>
        </Button>
      </div>
      <LeftEnterAnimation>
        <Suspense
          fallback={
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
              <Skeleton height="h-6" width="w-32" className="mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Skeleton height="h-10" />
                <Skeleton height="h-10" />
                <Skeleton height="h-10" />
              </div>
            </div>
          }
        >
          <ArticleFiltersComponent
            filters={filters}
            onFiltersChange={setFilters}
          />
        </Suspense>
      </LeftEnterAnimation>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="text-lg text-gray-600">Loading articles...</div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articlesWithFavorites.map((article: any) => (
              <EnterAnimation key={article.id}>
                <ArticleCard
                  key={article.id}
                  article={article}
                  onEdit={() => handleEdit(article.id)}
                  onDelete={() => handleDelete(article.id)}
                  onViewDetails={() => handleViewDetails(article.id)}
                />
              </EnterAnimation>
            ))}
          </div>

          {articlesResponse?.data.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No articles found.</p>
              <Link
                to="/articles/create"
                className="inline-block mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
              >
                Create the first article
              </Link>
            </div>
          )}

          {articlesResponse?.pagination && (
            <Pagination
              currentPage={articlesResponse.pagination.page}
              totalPages={articlesResponse.pagination.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};
