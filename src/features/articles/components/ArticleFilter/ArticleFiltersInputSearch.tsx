import type { ArticleFilterInputSearchProps } from './types';

/**
 * Campo de entrada para búsqueda de artículos por texto.
 * Permite filtrar artículos por título y contenido.
 *
 * @param props - Propiedades del componente
 * @param props.localFilters - Filtros locales con término de búsqueda
 * @param props.onFilterChange - Callback para cambios en la búsqueda
 * @returns Input de búsqueda con label
 */
export const ArticleFilterInputSearch = ({
  localFilters,
  onFilterChange,
}: ArticleFilterInputSearchProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Search
      </label>
      <input
        type="text"
        value={localFilters.search || ''}
        onChange={(e) => onFilterChange('search', e.target.value)}
        placeholder="Search articles..."
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};
