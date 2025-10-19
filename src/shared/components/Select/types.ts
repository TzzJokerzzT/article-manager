/**
 * Props para el componente Select.
 * Define las propiedades necesarias para renderizar un select con opciones dinámicas.
 */
export interface SelectProps {
  /** Texto del label que describe el select */
  label: string;
  /** Valor actualmente seleccionado */
  value: string;
  /** Callback ejecutado cuando cambia la selección */
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  /** Array de opciones disponibles con id y nombre */
  categories?: Array<{ id: string; name: string }>;
  /** Texto para la opción por defecto (placeholder) */
  title?: string;
  /** Indica si el campo es obligatorio */
  required?: boolean;
  /** ID único del select (por defecto 'category') */
  id?: string;
}
