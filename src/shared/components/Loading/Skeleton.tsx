import { memo } from 'react';

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  rounded?: boolean;
}

export const Skeleton = memo(
  ({
    className = '',
    width = 'w-full',
    height = 'h-4',
    rounded = true,
  }: SkeletonProps) => {
    return (
      <div
        className={`animate-pulse bg-gray-200 ${width} ${height} ${rounded ? 'rounded' : ''} ${className}`}
      />
    );
  }
);
