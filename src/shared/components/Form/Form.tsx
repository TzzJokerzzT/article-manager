import type { FormProps } from './types';

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
