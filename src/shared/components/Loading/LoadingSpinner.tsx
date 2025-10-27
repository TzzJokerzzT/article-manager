import { memo } from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const LoadingSpinner = memo(
  ({ size = 'md', className = '' }: LoadingSpinnerProps) => {
    const sizeClasses = {
      sm: 'h-6 w-6',
      md: 'h-12 w-12',
      lg: 'h-16 w-16',
      xl: 'h-18 w-18',
    };

    return (
      <div className={`flex justify-center items-center ${className}`}>
        <div
          className={`animate-spin rounded-full border-b-2 border-blue-500 ${sizeClasses[size]}`}
        ></div>
      </div>
    );
  }
);
