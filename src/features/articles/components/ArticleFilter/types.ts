import type { ArticleFilters } from '@/domain/types';

/**
 * Props para el componente principal de filtros de artículos.
 */
export interface ArticleFiltersProps {
  /** Filtros actuales aplicados */
  filters: ArticleFilters;
  /** Callback ejecutado cuando cambian los filtros */
  onFiltersChange: (filters: ArticleFilters) => void;
}

/**
 * Props para el componente de filtro por rating mínimo.
 */
export interface ArticleMinimumRatingProps {
  /** Filtros locales con rating mínimo */
  localFilters: {
    minRating?: number;
  };
  /** Callback para cambios en el rating mínimo */
  onFilterChange: (key: 'minRating', value: number | undefined) => void;
}

/**
 * Props para el componente de filtro por subcategoría.
 */
export interface ArticleSubCategoryFilterProps {
  /** Filtros locales con subcategoría */
  localFilters: {
    subcategoryId?: string;
  };
  /** Callback para cambios en la subcategoría */
  onFilterChange: (key: 'subcategoryId', value: string | undefined) => void;
  /** Categoría seleccionada con sus subcategorías */
  selectedCategory: {
    id: string;
    name: string;
    subcategories: { id: string; name: string }[];
  };
}

/**
 * Props para el botón de limpiar filtros.
 */
export interface ArticleClearButtonProps {
  /** Callback ejecutado al limpiar todos los filtros */
  onFilterClear: () => void;
}

/**
 * Props para el componente de búsqueda por texto.
 */
export interface ArticleFilterInputSearchProps {
  /** Filtros locales con término de búsqueda */
  localFilters: { search?: string };
  /** Callback para cambios en la búsqueda */
  onFilterChange: (field: 'search', value: string) => void;
}

/**
 * Props para el componente de filtro por categoría.
 */
export interface ArticleCategoryFilterProps {
  /** Filtros locales con categoría */
  localFilters: {
    categoryId?: string;
  };
  /** Callback para cambios en la categoría */
  onFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  /** Array de categorías disponibles */
  categories: {
    id: string;
    name: string;
    subcategories: { id: string; name: string }[];
  }[];
}
