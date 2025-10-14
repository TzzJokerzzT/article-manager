import { Link, useLocation } from 'react-router-dom';
import { CATEGORIES } from '@/shared/constants';
import { useAppSelector, useAppDispatch } from '@/application/hooks/redux';
import { setTheme } from '@/application/store/uiSlice';
import { Button } from '@/shared/components/Button/Button';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const theme = useAppSelector((state) => state.ui.theme);
  const dispatch = useAppDispatch();

  const toggleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div
      className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-slate-800' : 'bg-gray-50 text-slate-800'}`}
    >
      <nav
        className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link to="/articles" className="text-xl font-bold text-blue-600">
                Article Manager
              </Link>

              <div className="flex space-x-4">
                <Link
                  to="/articles"
                  className={`px-3 py-2 rounded-md ${
                    location.pathname === '/articles'
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  Articles
                </Link>

                <Link
                  to="/favorites"
                  className={`px-3 py-2 rounded-md ${
                    location.pathname === '/favorites'
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  Favorites ❤️
                </Link>

                <div className="relative group">
                  <Button variant="faded">Categories</Button>
                  <div className="absolute left-0 mt-1 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    {CATEGORIES.map((category) => (
                      <Link
                        key={category.id}
                        to={`/articles/categories/${category.id}`}
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button onClick={toggleTheme} variant="light" color="secondary">
                {theme === 'light' ? '🌙' : '☀️'}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main>{children}</main>
    </div>
  );
};
