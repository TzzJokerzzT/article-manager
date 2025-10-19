import type { Article } from '@/domain/types';

/**
 * Props interface for the ArticleCard component
 */
export interface ArticleCardProps {
  /** Article data to display in the card */
  article: Article;
  /** Optional callback when edit button is clicked */
  onEdit?: () => void;
  /** Optional callback when delete button is clicked */
  onDelete?: () => void;
  /** Optional callback when view details is clicked */
  onViewDetails?: () => void;
}
