export interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  color?: 'primary' | 'secondary' | 'danger' | 'success';
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'faded' | 'bordered' | 'light' | 'outlined';
  'data-testid'?: string;
}
