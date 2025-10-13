import type { Article } from '@/domain/types';

export interface ArticleCardProps {
  article: Article;
  onEdit?: () => void;
  onDelete?: () => void;
  onViewDetails?: () => void;
}
