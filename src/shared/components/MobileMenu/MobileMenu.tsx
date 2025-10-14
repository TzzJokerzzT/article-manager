import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CATEGORIES } from '@/shared/constants';
import { Button } from '@/shared/components/Button/Button';

interface MobileMenuProps {
  theme: 'light' | 'dark';
}

export const MobileMenu = ({ theme }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleCategories = () => setShowCategories(!showCategories);
  const closeMenu = () => {
    setIsOpen(false);
    setShowCategories(false);
  };

  return (
    <>
      <Button
        onClick={toggleMenu}
        className="md:hidden p-2 rounded-md"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </Button>

      {isOpen && (
        <div
          className={`absolute top-16 left-0 right-0 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          } shadow-lg z-50 md:hidden`}
        >
          <div className="px-4 py-2 space-y-2">
            <div className="border-b pb-2">
              <Button className="w-full text-left">
                <Link
                  to="/articles"
                  onClick={closeMenu}
                  className={`block ${
                    location.pathname === '/articles' ? 'text-white' : ''
                  }`}
                >
                  Articles
                </Link>
              </Button>
            </div>

            <div className="border-b pb-2">
              <Button color="danger" className="w-full text-left">
                <Link
                  to="/favorites"
                  onClick={closeMenu}
                  className={`block ${
                    location.pathname === '/favorites' ? 'text-white' : ''
                  }`}
                >
                  Favorites
                </Link>
              </Button>
            </div>

            <div>
              <Button
                variant="faded"
                onClick={toggleCategories}
                className="w-full text-left flex justify-between items-center"
              >
                Categories
                <svg
                  className={`w-4 h-4 transform transition-transform ${
                    showCategories ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </Button>

              {showCategories && (
                <div className="ml-4 mt-2 space-y-1">
                  {CATEGORIES.map((category) => (
                    <Link
                      key={category.id}
                      to={`/articles/categories/${category.id}`}
                      onClick={closeMenu}
                      className={`block px-3 py-2 text-sm rounded-md ${
                        theme === 'dark'
                          ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                          : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                      } ${
                        location.pathname ===
                        `/articles/categories/${category.id}`
                          ? 'text-blue-600'
                          : ''
                      }`}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
