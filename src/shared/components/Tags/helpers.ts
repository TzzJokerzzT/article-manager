const getColors: Record<string, string> = {
  primary: 'bg-primary text-white',
  secondary: 'bg-secondary text-white',
  danger: 'bg-danger text-white',
  success: 'bg-success text-black',
};

export const getRadius: Record<string, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
};

export const getVariant = (color: string, variant: string) => {
  return {
    solid: `${getColors[color]}`,
    faded: `${getColors['secondary']} `,
    bordered: `border-2 border-${color} text-${color}`,
    light: `bg-transparent text-${color}`,
    outlined: `border-2 border-${color} text-${color} bg-transparent`,
  }[variant];
};
