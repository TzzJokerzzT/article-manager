import { getSize } from '../helpers';
import { getRadius, getVariant } from './helpers';

export interface TagsProps {
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'danger' | 'success';
  variant?: 'solid' | 'faded' | 'bordered' | 'light' | 'outlined';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

export const Tags = ({
  children,
  color = 'primary',
  variant = 'solid',
  size = 'md',
  radius = 'none',
}: TagsProps) => {
  return (
    <span
      className={`${getSize[size]} ${getVariant(color, variant)} ${getRadius[radius]}`}
    >
      {children}
    </span>
  );
};
