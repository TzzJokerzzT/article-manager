import { CATEGORIES } from '@/shared/constants';
import type { ArticleFilters } from '@/shared/types';
import { useState } from 'react';
import { ArticleCategoryFilter } from './ArticleCategoryFilter';
import { ArticleClearButton } from './ArticleClearButton';
import { ArticleFilterInputSearch } from './ArticleFiltersInputSearch';
import { ArticleMinimumRating } from './ArticleMinimumRating';
import { ArticleSubCategoryFilter } from './ArticleSubCategoryFilter';
import type { ArticleFiltersProps } from './types';

export const ArticleFiltersComponent = ({
  filters,
  onFiltersChange,
}: ArticleFiltersProps) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleFilterChange = (key: keyof ArticleFilters, value: any) => {
    const newFilters = { ...localFilters, [key]: value, page: 1 };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleFilterCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const categoryId = e.target.value || undefined;
    const newFilters = {
      ...localFilters,
      categoryId,
      subcategoryId: undefined,
      page: 1,
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handlerClearFilters = () => {
    const resetFilters = {
      ...filters,
      search: undefined,
      categoryId: undefined,
      subcategoryId: undefined,
      minRating: undefined,
      page: 1,
    };
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  const selectedCategory = CATEGORIES.find(
    (cat) => cat.id === localFilters.categoryId
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ArticleFilterInputSearch
          localFilters={localFilters}
          onFilterChange={handleFilterChange}
        />

        <ArticleCategoryFilter
          localFilters={localFilters}
          onFilterChange={handleFilterCategoryChange}
          categories={CATEGORIES}
        />
        {/* <div> */}
        {/*   <label className="block text-sm font-medium text-gray-700 mb-2"> */}
        {/*     Category */}
        {/*   </label> */}
        {/*   <select */}
        {/*     value={localFilters.categoryId || ''} */}
        {/*     onChange={(e) => { */}
        {/*       const categoryId = e.target.value || undefined; */}
        {/*       const newFilters = { */}
        {/*         ...localFilters, */}
        {/*         categoryId, */}
        {/*         subcategoryId: undefined, */}
        {/*         page: 1, */}
        {/*       }; */}
        {/*       setLocalFilters(newFilters); */}
        {/*       onFiltersChange(newFilters); */}
        {/*     }} */}
        {/*     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" */}
        {/*     data-testid="category-filter" */}
        {/*   > */}
        {/*     <option value="">All Categories</option> */}
        {/*     {CATEGORIES.map((category) => ( */}
        {/*       <option key={category.id} value={category.id}> */}
        {/*         {category.name} */}
        {/*       </option> */}
        {/*     ))} */}
        {/*   </select> */}
        {/* </div> */}

        {selectedCategory?.subcategories &&
          selectedCategory.subcategories.length > 0 && (
            <ArticleSubCategoryFilter
              localFilters={localFilters}
              onFilterChange={handleFilterChange}
              selectedCategory={selectedCategory}
            />
          )}

        <ArticleMinimumRating
          localFilters={localFilters}
          onFilterChange={handleFilterChange}
        />
      </div>

      <div className="mt-4 flex justify-between items-center">
        <ArticleClearButton onFilterClear={handlerClearFilters} />
      </div>
    </div>
  );
};
