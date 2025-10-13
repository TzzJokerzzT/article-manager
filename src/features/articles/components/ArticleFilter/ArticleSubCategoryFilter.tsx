import type { ArticleSubCategoryFilterProps } from './types';

export const ArticleSubCategoryFilter = ({
  localFilters,
  onFilterChange,
  selectedCategory,
}: ArticleSubCategoryFilterProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Subcategory
      </label>
      <select
        value={localFilters.subcategoryId || ''}
        onChange={(e) =>
          onFilterChange('subcategoryId', e.target.value || undefined)
        }
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Subcategories</option>
        {selectedCategory.subcategories.map((subcategory) => (
          <option key={subcategory.id} value={subcategory.id}>
            {subcategory.name}
          </option>
        ))}
      </select>
    </div>
  );
};
