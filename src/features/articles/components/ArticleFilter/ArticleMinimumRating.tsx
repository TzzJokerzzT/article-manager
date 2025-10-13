import type { ArticleMinimumRatingProps } from './types';

export const ArticleMinimumRating = ({
  localFilters,
  onFilterChange,
}: ArticleMinimumRatingProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Minimum Rating
      </label>
      <select
        value={localFilters.minRating || ''}
        onChange={(e) =>
          onFilterChange(
            'minRating',
            e.target.value ? Number(e.target.value) : undefined
          )
        }
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Any Rating</option>
        <option value="1">1+ Stars</option>
        <option value="2">2+ Stars</option>
        <option value="3">3+ Stars</option>
        <option value="4">4+ Stars</option>
        <option value="5">5 Stars</option>
      </select>
    </div>
  );
};
