import React, { useState } from 'react';
import { Menu, Search, Bell, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
          >
            <Menu size={20} />
          </button>
        </div>
        
        <div className={`${isSearchOpen ? 'flex-1' : 'hidden md:flex'} items-center`}>
          <div className="relative w-full max-w-md">
            {isSearchOpen && (
              <button 
                className="absolute left-3 top-1/2 -translate-y-1/2 md:hidden"
                onClick={() => setIsSearchOpen(false)}
              >
                <X size={16} className="text-gray-400" />
              </button>
            )}
            <input
              type="text"
              placeholder="Search..."
              className={`${
                isSearchOpen ? 'pl-10 md:pl-4' : 'pl-4'
              } w-full border border-gray-300 rounded-lg h-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2">
              <Search size={16} className="text-gray-400" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center">
          {!isSearchOpen && (
            <button 
              className="md:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100 mr-2"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search size={20} />
            </button>
          )}
          
          <button className="p-2 rounded-md text-gray-500 hover:bg-gray-100 relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
              3
            </span>
          </button>
          
          <div className="ml-3 relative hidden md:block">
            <button className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                {user?.name.charAt(0)}
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          {/* Mobile menu items */}
          <nav className="px-4 py-2">
            <ul className="space-y-1">
              <li>
                <a href="/" className="block px-3 py-2 rounded-md text-gray-500 hover:bg-gray-100">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/courses" className="block px-3 py-2 rounded-md text-gray-500 hover:bg-gray-100">
                  Courses
                </a>
              </li>
              <li>
                <a href="/students" className="block px-3 py-2 rounded-md text-gray-500 hover:bg-gray-100">
                  Students
                </a>
              </li>
              <li>
                <a href="/quiz" className="block px-3 py-2 rounded-md text-gray-500 hover:bg-gray-100">
                  Quizzes
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;