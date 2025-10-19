/**
 * Props para el componente Pagination.
 * Define las propiedades necesarias para renderizar controles de paginación.
 */
export interface PaginationProps {
  /** Página actualmente seleccionada (1-indexed) */
  currentPage: number;
  /** Número total de páginas disponibles */
  totalPages: number;
  /** Callback ejecutado cuando el usuario cambia de página */
  onPageChange: (page: number) => void;
}
