export interface TextareaProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  htmlFor?: string;
  id?: string;
  row?: number;
}

export const Textarea = ({
  label,
  value,
  onChange,
  required = true,
  htmlFor,
  id,
  row = 3,
}: TextareaProps) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label} *
      </label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        rows={row}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};
