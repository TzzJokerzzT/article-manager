/**
 * Props interface for the Button component
 */
export interface ButtonProps {
  /** Content to render inside the button */
  children: React.ReactNode;
  /** Additional CSS classes to apply */
  className?: string;
  /** Accessibility label for screen readers */
  ariaLabel?: string;
  /** Color theme of the button */
  color?: 'primary' | 'secondary' | 'danger' | 'success';
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Click handler function */
  onClick?: () => void;
  /** HTML button type attribute */
  type?: 'button' | 'submit' | 'reset';
  /** Size variant of the button */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Visual style variant */
  variant?: 'solid' | 'faded' | 'bordered' | 'light' | 'outlined';
  /** Test ID for testing frameworks */
  'data-testid'?: string;
}
