import {
  getCardSize,
  getCardRadius,
  getCardVariant,
  getCardInteractive,
} from './helpers';
import type {
  CardProps,
  CardHeaderProps,
  CardBodyProps,
  CardFooterProps,
} from './types';

/**
 * Reusable Card component with multiple variants, colors, and sizes
 * Supports accessibility features and consistent styling across the application
 * @param props - Card component properties
 * @returns JSX element representing a styled card
 */
export const Card = ({
  children,
  className = '',
  size = 'md',
  variant = 'elevated',
  color = 'default',
  radius = 'lg',
  isClickable = false,
  isDisabled = false,
  isHoverable = false,
  onClick,
  'data-testid': dataTestId,
}: CardProps) => {
  const baseClasses = 'relative overflow-hidden';
  const sizeClasses = getCardSize[size];
  const radiusClasses = getCardRadius[radius];
  const variantClasses = getCardVariant(color, variant);
  const interactiveClasses = getCardInteractive(
    isClickable,
    isHoverable,
    isDisabled
  );

  const combinedClasses = [
    baseClasses,
    sizeClasses,
    radiusClasses,
    variantClasses,
    interactiveClasses,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const CardElement = isClickable ? 'button' : 'div';

  return (
    <CardElement
      className={combinedClasses}
      onClick={isClickable && !isDisabled ? onClick : undefined}
      disabled={isClickable && isDisabled}
      data-testid={dataTestId}
    >
      {children}
    </CardElement>
  );
};

/**
 * Card Header component for consistent header styling
 * @param props - CardHeader component properties
 * @returns JSX element representing a card header
 */
export const CardHeader = ({
  children,
  className = '',
  'data-testid': dataTestId,
}: CardHeaderProps) => {
  return (
    <div
      className={`flex items-center justify-between pb-4 mb-4 border-b border-gray-200 ${className}`}
      data-testid={dataTestId}
    >
      {children}
    </div>
  );
};

/**
 * Card Body component for main content area
 * @param props - CardBody component properties
 * @returns JSX element representing a card body
 */
export const CardBody = ({
  children,
  className = '',
  'data-testid': dataTestId,
}: CardBodyProps) => {
  return (
    <div className={`flex-grow ${className}`} data-testid={dataTestId}>
      {children}
    </div>
  );
};

/**
 * Card Footer component for consistent footer styling
 * @param props - CardFooter component properties
 * @returns JSX element representing a card footer
 */
export const CardFooter = ({
  children,
  className = '',
  'data-testid': dataTestId,
}: CardFooterProps) => {
  return (
    <div
      className={`flex items-center justify-between pt-4 mt-4 border-t border-gray-200 ${className}`}
      data-testid={dataTestId}
    >
      {children}
    </div>
  );
};
