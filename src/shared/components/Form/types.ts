/**
 * Props para el componente Form.
 * Define las propiedades necesarias para renderizar un input con label y funcionalidades opcionales.
 */
export interface FormProps {
  /** ID único del input, usado también como htmlFor del label */
  id: string;
  /** Texto del label que describe el campo */
  label: string;
  /** Valor actual del input */
  value: string;
  /** Callback ejecutado cuando cambia el valor del input */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Tipo de input HTML (text, email, password, etc.) */
  type?: string;
  /** Callback opcional para manejar eventos de teclado */
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  /** Texto de placeholder para el input */
  placeholder?: string;
  /** Componente opcional (como Button) que se renderiza junto al input */
  buttonComponent?: React.ReactNode;
  /** Clases CSS adicionales para el contenedor del input */
  className?: string;
  /** Indica si el campo es obligatorio */
  required?: boolean;
}
