import { ArticleCard } from '@/features/articles/components/ArticleCard/ArticleCard';
import { ArticleFiltersComponent } from '@/features/articles/components/ArticleFilter/Index';
import { Pagination } from '@/features/articles/components/Pagination/Pagination';
import {
  useArticles,
  useDeleteArticle,
  useFavorites,
} from '@/features/articles/hooks';
import { EnterAnimation } from '@/shared/components/Animation/EnterAnimation';
import { LeftEnterAnimation } from '@/shared/components/Animation/LeftEnterAnimation';
import { Button } from '@/shared/components/Button/Button';
import type { ArticleFilters } from '@/shared/types';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const ArticlesPage = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<ArticleFilters>({
    page: 1,
    limit: 10,
  });

  const { data: articlesResponse, isLoading, error } = useArticles(filters);
  const { data: favorites = [] } = useFavorites();
  const deleteArticle = useDeleteArticle();

  const handleEdit = (articleId: string) => {
    navigate(`/articles/${articleId}/edit`);
  };

  const handleDelete = (articleId: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      deleteArticle.mutate(articleId);
    }
  };

  const handleViewDetails = (articleId: string) => {
    navigate(`/articles/${articleId}`);
  };

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
        <ArticleFiltersComponent
          filters={filters}
          onFiltersChange={setFilters}
        />
      </LeftEnterAnimation>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="text-lg text-gray-600">Loading articles...</div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articlesResponse?.data.map((article: any) => (
              <EnterAnimation key={article.id}>
                <ArticleCard
                  key={article.id}
                  article={{
                    ...article,
                    isFavorite: favorites.includes(article.id),
                  }}
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
              onPageChange={(page: number) => setFilters({ ...filters, page })}
            />
          )}
        </>
      )}
    </div>
  );
};
