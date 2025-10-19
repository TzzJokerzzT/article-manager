import { CATEGORIES } from '@/shared/constants';
import type { ArticleFilters } from '@/shared/types';
import { useState } from 'react';
import { ArticleCategoryFilter } from './ArticleCategoryFilter';
import { ArticleClearButton } from './ArticleClearButton';
import { ArticleFilterInputSearch } from './ArticleFiltersInputSearch';
import { ArticleMinimumRating } from './ArticleMinimumRating';
import { ArticleSubCategoryFilter } from './ArticleSubCategoryFilter';
import type { ArticleFiltersProps } from './types';

/**
 * Componente principal de filtros para artículos.
 * Integra múltiples filtros: búsqueda, categoría, subcategoría, rating mínimo.
 * Maneja el estado local y sincroniza con el estado global de filtros.
 *
 * @param props - Propiedades del componente
 * @param props.filters - Filtros actuales aplicados
 * @param props.onFiltersChange - Callback para cambios en los filtros
 * @returns Componente completo de filtros con todos los controles
 */
export const ArticleFiltersComponent = ({
  filters,
  onFiltersChange,
}: ArticleFiltersProps) => {
  /** Estado local de filtros para manejo inmediato de cambios */
  const [localFilters, setLocalFilters] = useState(filters);

  /**
   * Maneja cambios en filtros individuales.
   * Resetea la página a 1 cuando cambia cualquier filtro.
   */
  const handleFilterChange = (
    key: keyof ArticleFilters,
    value: string | number | undefined
  ) => {
    const newFilters = { ...localFilters, [key]: value, page: 1 };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  /**
   * Maneja cambios específicos en el filtro de categoría.
   * Limpia la subcategoría cuando cambia la categoría principal.
   */
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

  /**
   * Limpia todos los filtros aplicados.
   * Mantiene la estructura base y resetea la paginación.
   */
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

  /** Categoría actualmente seleccionada para mostrar subcategorías */
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
