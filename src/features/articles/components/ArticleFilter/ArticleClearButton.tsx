import { Button } from '@/shared/components/Button/Button';
import type { ArticleClearButtonProps } from './types';

export const ArticleClearButton = ({
  onFilterClear,
}: ArticleClearButtonProps) => {
  return (
    <Button onClick={onFilterClear} size="sm" color="secondary">
      Clear Filters
    </Button>
  );
};
