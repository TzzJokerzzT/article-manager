import { Button } from '@/shared/components/Button/Button';
import { useNavigate } from 'react-router-dom';

export const MessageNoFavorites = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center py-16">
      <div className="text-gray-400 mb-4">
        <svg
          className="w-16 h-16 mx-auto"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No favorites yet
      </h3>
      <p className="text-gray-500 mb-6">
        Start exploring articles and click the heart icon to add them to your
        favorites.
      </p>
      <Button onClick={() => navigate('/articles')}>Browse Articles</Button>
    </div>
  );
};
