export interface SelectProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  categories?: Array<{ id: string; name: string }>;
  title?: string;
  required?: boolean;
}
