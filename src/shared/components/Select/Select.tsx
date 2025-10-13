import type { SelectProps } from './types';

export const Select = ({
  label,
  value,
  onChange,
  categories,
  title,
  required = true,
}: SelectProps) => {
  return (
    <div>
      <label
        htmlFor="category"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label} *
      </label>
      <select
        id="category"
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
