import { ArticleCard } from '@/features/articles/components/ArticleCard/ArticleCard';
import { Pagination } from '@/features/articles/components/Pagination/Pagination';
import { useArticles, useFavorites } from '@/features/articles/hooks';
import { MessageNotFound } from '@/features/category/component/Message/Message';
import SubcategoryFilterButtons from '@/features/category/component/SubCategoryFilterButton/SubCategoryFilter';
import { Animation } from '@/shared/components/Animation/Animation';
import { EnterAnimation } from '@/shared/components/Animation/EnterAnimation';
import { LoadingSpinner } from '@/shared/components/Loading';
import { LoaderWithMessage } from '@/shared/components/Loading/LoaderWithMesssage';
import { CATEGORIES } from '@/shared/constants';
import type { ArticleFilters } from '@/shared/types';
import { useCallback, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CategoriesPage = () => {
  const { categoryId, subcategoryId } = useParams<{
    categoryId: string;
    subcategoryId: string;
  }>();

  const navigate = useNavigate();

  const [filters, setFilters] = useState<ArticleFilters>({
    page: 1,
    limit: 12,
    categoryId,
    subcategoryId,
  });

  // Sincronizar filtros cuando cambien los parámetros de la URL
  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      categoryId,
      subcategoryId,
      page: 1, // Resetear página cuando cambian los filtros de categoría
    }));
  }, [categoryId, subcategoryId]);

  const { data: articlesResponse, isLoading } = useArticles(filters);
  const { data: favorites = [] } = useFavorites();

  const category = CATEGORIES.find((cat) => cat.id === categoryId);
  const subcategory = category?.subcategories?.find(
    (sub) => sub.id === subcategoryId
  );

  const handleSubcategorySelect = (articleId?: string, subId?: string) => {
    navigate(`/articles/categories/${articleId}/${subId || ''}`);
    setFilters({ ...filters, subcategoryId: subId, page: 1 });
  };

  const handleViewDetails = useCallback(
    (articleId: string) => {
      navigate(`/articles/${articleId}`);
    },
    [navigate]
  );

  if (isLoading) return <LoaderWithMessage message="Loading categories..." />;

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
          <SubcategoryFilterButtons
            onSubcategorySelect={handleSubcategorySelect}
            category={category}
            subcategoryId={subcategoryId}
          />
        </div>
      )}

      <>
        {subcategory && (
          <Animation key={subcategory.id}>
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900">
                {subcategory?.name}
              </h3>
              <p className="text-blue-700">{subcategory?.description}</p>
            </div>
          </Animation>
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
                onViewDetails={() => handleViewDetails(article.id)}
              />
            </EnterAnimation>
          ))}
        </div>

        {articlesResponse?.data.length === 0 && (
          <MessageNotFound subcategory={subcategory} />
        )}

        {articlesResponse?.pagination && (
          <Pagination
            currentPage={articlesResponse.pagination.page}
            totalPages={articlesResponse.pagination.totalPages}
            onPageChange={(page: number) => setFilters({ ...filters, page })}
          />
        )}
      </>
    </div>
  );
};

export default CategoriesPage;
