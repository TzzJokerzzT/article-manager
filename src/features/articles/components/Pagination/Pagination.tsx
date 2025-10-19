import { Button } from '@/shared/components/Button/Button';
import { memo, useMemo, useCallback } from 'react';
import type { PaginationProps } from './types';

/**
 * Componente de paginación que permite navegar entre múltiples páginas de resultados.
 * Muestra un rango de páginas alrededor de la página actual con botones Previous/Next.
 *
 * @param props - Propiedades del componente
 * @param props.currentPage - Página actualmente seleccionada
 * @param props.totalPages - Número total de páginas
 * @param props.onPageChange - Callback para cambios de página
 * @returns Componente de paginación o null si hay 1 página o menos
 */
export const Pagination = memo(
  ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    /**
     * Calcula qué números de página mostrar basado en la página actual.
     * Muestra hasta 5 páginas: 2 antes, la actual, y 2 después.
     */
    const pageNumbers = useMemo(() => {
      const pages = [];
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, currentPage + 2);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      return pages;
    }, [currentPage, totalPages]);

    /** Maneja la navegación a la página anterior */
    const handlePrevious = useCallback(() => {
      onPageChange(currentPage - 1);
    }, [currentPage, onPageChange]);

    /** Maneja la navegación a la página siguiente */
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
