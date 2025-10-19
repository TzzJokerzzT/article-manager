import type { FormProps } from './types';

/**
 * Componente de formulario reutilizable que renderiza un input con label.
 * Proporciona styling consistente y funcionalidades opcionales como botones integrados.
 *
 * @param props - Propiedades del componente
 * @param props.id - ID único del input
 * @param props.label - Texto del label
 * @param props.value - Valor actual del input
 * @param props.onChange - Callback para cambios en el valor
 * @param props.type - Tipo de input HTML (por defecto 'text')
 * @param props.onKeyDown - Callback opcional para eventos de teclado
 * @param props.placeholder - Placeholder del input (por defecto '')
 * @param props.buttonComponent - Componente opcional que se renderiza junto al input
 * @param props.className - Clases CSS adicionales para el contenedor
 * @param props.required - Indica si el campo es obligatorio
 * @returns Componente de input con label y styling
 */
export const Form = ({
  id,
  label,
  value,
  onChange,
  type = 'text',
  onKeyDown,
  placeholder = '',
  buttonComponent,
  className,
  required,
}: FormProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label} *
      </label>
      <div className={className}>
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          required={required}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {buttonComponent}
      </div>
    </div>
  );
};
