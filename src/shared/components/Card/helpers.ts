import type { CardColor, CardVariant } from './types';

/**
 * Get size classes for Card component
 */
export const getCardSize = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
} as const;

/**
 * Get radius classes for Card component
 */
export const getCardRadius = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
} as const;

/**
 * Get variant and color combination classes for Card component
 * @param color - Color theme
 * @param variant - Visual variant
 * @returns CSS classes string
 */
export const getCardVariant = (
  color: CardColor,
  variant: CardVariant
): string => {
  const colorClasses = {
    default: {
      elevated: 'bg-white shadow-lg hover:shadow-xl border-gray-200',
      bordered: 'bg-white border-2 border-gray-200 hover:border-gray-300',
      shadow: 'bg-white shadow-md hover:shadow-lg',
      flat: 'bg-gray-50 hover:bg-gray-100',
    },
    primary: {
      elevated: 'bg-blue-50 shadow-lg hover:shadow-xl border-blue-200',
      bordered: 'bg-blue-50 border-2 border-blue-200 hover:border-blue-300',
      shadow:
        'bg-blue-50 shadow-md shadow-blue-100 hover:shadow-lg hover:shadow-blue-200',
      flat: 'bg-blue-100 hover:bg-blue-200',
    },
    secondary: {
      elevated: 'bg-purple-50 shadow-lg hover:shadow-xl border-purple-200',
      bordered:
        'bg-purple-50 border-2 border-purple-200 hover:border-purple-300',
      shadow:
        'bg-purple-50 shadow-md shadow-purple-100 hover:shadow-lg hover:shadow-purple-200',
      flat: 'bg-purple-100 hover:bg-purple-200',
    },
    success: {
      elevated: 'bg-green-50 shadow-lg hover:shadow-xl border-green-200',
      bordered: 'bg-green-50 border-2 border-green-200 hover:border-green-300',
      shadow:
        'bg-green-50 shadow-md shadow-green-100 hover:shadow-lg hover:shadow-green-200',
      flat: 'bg-green-100 hover:bg-green-200',
    },
    warning: {
      elevated: 'bg-yellow-50 shadow-lg hover:shadow-xl border-yellow-200',
      bordered:
        'bg-yellow-50 border-2 border-yellow-200 hover:border-yellow-300',
      shadow:
        'bg-yellow-50 shadow-md shadow-yellow-100 hover:shadow-lg hover:shadow-yellow-200',
      flat: 'bg-yellow-100 hover:bg-yellow-200',
    },
    danger: {
      elevated: 'bg-red-50 shadow-lg hover:shadow-xl border-red-200',
      bordered: 'bg-red-50 border-2 border-red-200 hover:border-red-300',
      shadow:
        'bg-red-50 shadow-md shadow-red-100 hover:shadow-lg hover:shadow-red-200',
      flat: 'bg-red-100 hover:bg-red-200',
    },
  };

  return colorClasses[color][variant];
};

/**
 * Get interactive classes for clickable/hoverable cards
 * @param isClickable - Whether the card is clickable
 * @param isHoverable - Whether the card is hoverable
 * @param isDisabled - Whether the card is disabled
 * @returns CSS classes string
 */
export const getCardInteractive = (
  isClickable: boolean = false,
  isHoverable: boolean = false,
  isDisabled: boolean = false
): string => {
  let classes = '';

  if (isDisabled) {
    return 'opacity-50 cursor-not-allowed';
  }

  if (isClickable) {
    classes +=
      'cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ';
  }

  if (isHoverable || isClickable) {
    classes += 'transition-all duration-200 ease-in-out ';
  }

  return classes.trim();
};
