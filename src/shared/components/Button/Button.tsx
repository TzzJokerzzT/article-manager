import { getSize } from '../helpers';
import { getVariant } from './helpers';
import type { ButtonProps } from './types';

/**
 * Reusable Button component with multiple variants, colors, and sizes
 * Supports accessibility features and consistent styling across the application
 * @param props - Button component properties
 * @returns JSX element representing a styled button
 */
export const Button = ({
  ariaLabel,
  children,
  className,
  color = 'primary',
  disabled,
  size = 'md',
  type = 'button',
  variant = 'solid',
  onClick,
  'data-testid': dataTestId,
}: ButtonProps) => {
  return (
    <button
      aria-label={ariaLabel}
      disabled={disabled}
      className={`rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed duration-200 ease-in ${getVariant(color, variant)} ${getSize[size]} ${className}`}
      onClick={onClick}
      type={type}
      data-testid={dataTestId}
    >
      {children}
    </button>
  );
};
