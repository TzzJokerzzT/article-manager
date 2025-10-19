import { Button } from '@/shared/components/Button/Button';
import type { ArticleClearButtonProps } from './types';

/**
 * Botón para limpiar todos los filtros aplicados.
 * Resetea el estado de filtros a sus valores por defecto.
 *
 * @param props - Propiedades del componente
 * @param props.onFilterClear - Callback ejecutado al hacer clic
 * @returns Botón de limpiar filtros
 */
export const ArticleClearButton = ({
  onFilterClear,
}: ArticleClearButtonProps) => {
  return (
    <Button onClick={onFilterClear} size="sm" color="secondary">
      Clear Filters
    </Button>
  );
};
