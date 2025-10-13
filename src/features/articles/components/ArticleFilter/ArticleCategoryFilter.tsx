import type { ArticleCategoryFilterProps } from './types';

export const ArticleCategoryFilter = ({
  localFilters,
  onFilterChange,
  categories,
}: ArticleCategoryFilterProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Category
      </label>
      <select
        value={localFilters.categoryId || ''}
        onChange={onFilterChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        data-testid="category-filter"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};
