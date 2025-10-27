import { Button } from '@/shared/components/Button/Button';
import type { SubcategoryFilterButtonsProps } from './types';

const SubcategoryFilterButtons = ({
  onSubcategorySelect,
  category,
  subcategoryId,
}: SubcategoryFilterButtonsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={!subcategoryId ? 'solid' : 'light'}
        onClick={() => onSubcategorySelect(category.id)}
      >
        All {category.name}
      </Button>
      {category.subcategories?.map((sub) => (
        <Button
          key={sub.id}
          onClick={() => onSubcategorySelect(category.id, sub.id)}
          variant="light"
          color="secondary"
        >
          {sub.name}
        </Button>
      ))}
    </div>
  );
};

export default SubcategoryFilterButtons;
