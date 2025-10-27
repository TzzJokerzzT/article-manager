import type { Category } from '@/domain/types';

export interface SubcategoryFilterButtonsProps {
  subcategoryId: string | undefined;
  onSubcategorySelect: (articleId?: string, subId?: string) => void;
  category: Category;
}
