import type { MessageNotFoundProps } from './types';

export const MessageNotFound = ({ subcategory }: MessageNotFoundProps) => {
  return (
    <div className="text-center py-12">
      <p className="text-gray-600 text-lg">
        No articles found in this {subcategory ? 'subcategory' : 'category'}.
      </p>
    </div>
  );
};
