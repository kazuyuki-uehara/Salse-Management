import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Store, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = () => {
    if (window.confirm('ログアウトしてもよろしいですか？')) {
      logout();
      navigate('/login');
    }
  };

  return (
    <nav className="bg-white shadow-lg border-b-2 border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 sm:h-20 items-center">
          <div className="flex items-center gap-2 sm:gap-4">
            {user?.role === 'admin' ? (
              <Building2 className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600" />
            ) : (
              <Store className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600" />
            )}
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              売上管理システム
              <span className="hidden sm:inline-block ml-2 text-lg sm:text-xl text-indigo-600">
                ({user?.role === 'admin' ? '管理者' : 'テナント'})
              </span>
            </h1>
          </div>
          
          {/* Mobile menu button */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden sm:flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-indigo-600 flex items-center justify-center">
                <span className="text-white text-lg sm:text-xl font-bold">
                  {user?.name.charAt(0)}
                </span>
              </div>
              <span className="text-base sm:text-lg font-medium text-gray-700">{user?.name}</span>
            </div>
            
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300"
            >
              <LogOut className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              ログアウト
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="sm:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
                  <span className="text-white text-lg font-bold">
                    {user?.name.charAt(0)}
                  </span>
                </div>
                <span className="text-base font-medium text-gray-700">{user?.name}</span>
              </div>
              
              <button
                onClick={handleLogout}
                className="w-full inline-flex items-center justify-center px-4 py-2 text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300"
              >
                <LogOut className="w-5 h-5 mr-2" />
                ログアウト
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}