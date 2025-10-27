import { Link } from 'react-router-dom';

export const MessageArticlesNotFound = () => {
  return (
    <div className="text-center py-12">
      <p className="text-gray-600 text-lg">No articles found.</p>
      <Link
        to="/articles/create"
        className="inline-block mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
      >
        Create the first article
      </Link>
    </div>
  );
};
