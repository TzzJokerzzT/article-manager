import { Button } from '@/shared/components/Button/Button';
import { memo, useMemo, useCallback } from 'react';
import type { PaginationProps } from './types';

export const Pagination = memo(
  ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    const pageNumbers = useMemo(() => {
      const pages = [];
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, currentPage + 2);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      return pages;
    }, [currentPage, totalPages]);

    const handlePrevious = useCallback(() => {
      onPageChange(currentPage - 1);
    }, [currentPage, onPageChange]);

    const handleNext = useCallback(() => {
      onPageChange(currentPage + 1);
    }, [currentPage, onPageChange]);

    if (totalPages <= 1) return null;

    return (
      <div className="flex justify-center items-center space-x-2 mt-6">
        <Button onClick={handlePrevious} size="sm" disabled={currentPage === 1}>
          Previous
        </Button>

        {pageNumbers.map((page: number) => (
          <Button
            key={page}
            onClick={() => onPageChange(page)}
            size="sm"
            variant={page === currentPage ? 'solid' : 'faded'}
          >
            {page}
          </Button>
        ))}

        <Button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          size="sm"
        >
          Next
        </Button>
      </div>
    );
  }
);
