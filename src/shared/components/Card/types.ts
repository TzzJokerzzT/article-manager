import type { ReactNode } from 'react';

/**
 * Size variants for Card component
 */
export type CardSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Visual variants for Card component
 */
export type CardVariant = 'elevated' | 'bordered' | 'shadow' | 'flat';

/**
 * Color variants for Card component
 */
export type CardColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger';

/**
 * Radius variants for Card component
 */
export type CardRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Props interface for the main Card component
 */
export interface CardProps {
  /** Content to render inside the card */
  children: ReactNode;
  /** Additional CSS classes to apply */
  className?: string;
  /** Size variant of the card */
  size?: CardSize;
  /** Visual style variant */
  variant?: CardVariant;
  /** Color theme of the card */
  color?: CardColor;
  /** Border radius of the card */
  radius?: CardRadius;
  /** Whether the card is clickable */
  isClickable?: boolean;
  /** Whether the card is disabled */
  isDisabled?: boolean;
  /** Whether the card is hoverable */
  isHoverable?: boolean;
  /** Click handler function */
  onClick?: () => void;
  /** Test ID for testing frameworks */
  'data-testid'?: string;
}

/**
 * Props interface for CardHeader component
 */
export interface CardHeaderProps {
  /** Content to render inside the header */
  children: ReactNode;
  /** Additional CSS classes to apply */
  className?: string;
  /** Test ID for testing frameworks */
  'data-testid'?: string;
}

/**
 * Props interface for CardBody component
 */
export interface CardBodyProps {
  /** Content to render inside the body */
  children: ReactNode;
  /** Additional CSS classes to apply */
  className?: string;
  /** Test ID for testing frameworks */
  'data-testid'?: string;
}

/**
 * Props interface for CardFooter component
 */
export interface CardFooterProps {
  /** Content to render inside the footer */
  children: ReactNode;
  /** Additional CSS classes to apply */
  className?: string;
  /** Test ID for testing frameworks */
  'data-testid'?: string;
}
