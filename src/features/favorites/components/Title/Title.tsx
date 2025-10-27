import type { FavoritesMainTitleProps } from './types';

export const FavoriteMainTitle = ({
  favoriteArticles,
}: FavoritesMainTitleProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        My Favorite Articles
      </h1>
      <p className="text-gray-600">
        {favoriteArticles.length === 0
          ? "You haven't added any articles to favorites yet."
          : `You have ${favoriteArticles.length} favorite article${favoriteArticles.length === 1 ? '' : 's'}.`}
      </p>
    </div>
  );
};
