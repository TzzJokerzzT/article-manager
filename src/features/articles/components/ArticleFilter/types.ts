import type { ArticleFilters } from '@/domain/types';

export interface ArticleFiltersProps {
  filters: ArticleFilters;
  onFiltersChange: (filters: ArticleFilters) => void;
}

export interface ArticleMinimumRatingProps {
  localFilters: {
    minRating?: number;
  };
  onFilterChange: (key: 'minRating', value: number | undefined) => void;
}

export interface ArticleSubCategoryFilterProps {
  localFilters: {
    subcategoryId?: string;
  };
  onFilterChange: (key: 'subcategoryId', value: string | undefined) => void;
  selectedCategory: {
    id: string;
    name: string;
    subcategories: { id: string; name: string }[];
  };
}

export interface ArticleClearButtonProps {
  onFilterClear: () => void;
}

export interface ArticleFilterInputSearchProps {
  localFilters: { search?: string };
  onFilterChange: (field: 'search', value: string) => void;
}

export interface ArticleCategoryFilterProps {
  localFilters: {
    categoryId?: string;
  };
  onFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  categories: {
    id: string;
    name: string;
    subcategories: { id: string; name: string }[];
  }[];
}
