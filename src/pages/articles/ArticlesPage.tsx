import { ArticleCard } from '@/features/articles/components/ArticleCard/ArticleCard';
import { ArticleFiltersComponent } from '@/features/articles/components/ArticleFilter/Index';
import { MessageArticlesNotFound } from '@/features/articles/components/Message/Message';
import { MessageArticlesError } from '@/features/articles/components/Message/MessageError';
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
import { LoaderWithMessage } from '@/shared/components/Loading/LoaderWithMesssage';
import type { ArticleFilters } from '@/shared/types';
import { Suspense, useCallback, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ArticlesPage = () => {
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
    return <MessageArticlesError />;
  }

  if (isLoading)
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Articles</h1>
        </div>
        <ArticleFiltersComponent
          filters={filters}
          onFiltersChange={setFilters}
        />
        <LoaderWithMessage message="Loading articles..." />;
      </div>
    );

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

      {articlesResponse?.data.length === 0 && <MessageArticlesNotFound />}

      {articlesResponse?.pagination && (
        <Pagination
          currentPage={articlesResponse.pagination.page}
          totalPages={articlesResponse.pagination.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ArticlesPage;
