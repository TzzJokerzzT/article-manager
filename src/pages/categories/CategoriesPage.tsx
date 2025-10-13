import { ArticleCard } from '@/features/articles/components/ArticleCard/ArticleCard';
import { Pagination } from '@/features/articles/components/Pagination/Pagination';
import { useArticles, useFavorites } from '@/features/articles/hooks';
import { EnterAnimation } from '@/shared/components/Animation/EnterAnimation';
import { Button } from '@/shared/components/Button/Button';
import { CATEGORIES } from '@/shared/constants';
import type { ArticleFilters } from '@/shared/types';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export const CategoriesPage = () => {
  const { categoryId, subcategoryId } = useParams<{
    categoryId: string;
    subcategoryId?: string;
  }>();

  const [filters, setFilters] = useState<ArticleFilters>({
    page: 1,
    limit: 12,
    categoryId,
    subcategoryId,
  });

  const { data: articlesResponse, isLoading } = useArticles(filters);
  const { data: favorites = [] } = useFavorites();

  const category = CATEGORIES.find((cat) => cat.id === categoryId);
  const subcategory = category?.subcategories?.find(
    (sub) => sub.id === subcategoryId
  );

  const handleSubcategorySelect = (subId?: string) => {
    setFilters({ ...filters, subcategoryId: subId, page: 1 });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {category?.name || 'Category Not Found'}
        </h1>
        {category?.description && (
          <p className="text-gray-600">{category.description}</p>
        )}
      </div>

      {category?.subcategories && category.subcategories.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Subcategories
          </h2>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={!subcategoryId ? 'solid' : 'light'}
              onClick={() => handleSubcategorySelect()}
            >
              All {category.name}
            </Button>
            {category.subcategories.map((sub) => (
              <Button
                key={sub.id}
                onClick={() => handleSubcategorySelect(sub.id)}
                variant="light"
                color="secondary"
              >
                {sub.name}
              </Button>
            ))}
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="text-lg text-gray-600">Loading articles...</div>
        </div>
      ) : (
        <>
          {subcategory && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900">
                {subcategory.name}
              </h3>
              <p className="text-blue-700">{subcategory.description}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articlesResponse?.data.map((article: any) => (
              <EnterAnimation key={article.id}>
                <ArticleCard
                  key={article.id}
                  article={{
                    ...article,
                    isFavorite: favorites.includes(article.id),
                  }}
                />
              </EnterAnimation>
            ))}
          </div>

          {articlesResponse?.data.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No articles found in this{' '}
                {subcategory ? 'subcategory' : 'category'}.
              </p>
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
