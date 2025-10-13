import { Button } from '@/shared/components/Button/Button';
import type { PaginationProps } from './types';

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const getPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center space-x-2 mt-6">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        size="sm"
        disabled={currentPage === 1}
      >
        Previous
      </Button>

      {getPageNumbers().map((page) => (
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
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        size="sm"
      >
        Next
      </Button>
    </div>
  );
};
