export const getColors: Record<string, string> = {
  primary: 'bg-primary hover:bg-primary-hover',
  secondary: 'bg-secondary hover:bg-secondary-hover',
  danger: 'bg-danger hover:bg-danger-hover',
  success: 'bg-success hover:bg-success-hover',
};

export const getVariant = (color: string, variant: string) => {
  return {
    solid: `text-white ${getColors[color]}`,
    faded: `text-white ${getColors['secondary']}`,
    bordered: `border-solid border-2 border-${color}`,
    light: `bg-transparent text-${color} ${getColors[color]} hover:text-white`,
    outlined: `border-solid border-2 border-${color} text-${color}`,
  }[variant];
};
