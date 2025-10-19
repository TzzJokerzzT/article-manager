import type { SelectProps } from './types';

/**
 * Componente Select reutilizable para selección de opciones.
 * Renderiza un dropdown con opciones dinámicas y styling consistente.
 *
 * @param props - Propiedades del componente
 * @param props.label - Texto del label
 * @param props.value - Valor actualmente seleccionado
 * @param props.onChange - Callback para cambios en la selección
 * @param props.categories - Array de opciones disponibles
 * @param props.title - Texto para la opción por defecto
 * @param props.required - Si el campo es obligatorio (por defecto true)
 * @param props.id - ID único del select (por defecto 'category')
 * @returns Componente de select con label y opciones
 */
export const Select = ({
  label,
  value,
  onChange,
  categories,
  title,
  required = true,
  id = 'category',
}: SelectProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label} *
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required={required}
      >
        <option value="">{title}</option>
        {categories?.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};
