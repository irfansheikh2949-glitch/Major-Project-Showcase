
import React from 'react';
import { Page } from '../../types';

interface HeaderProps {
  isAuthenticated: boolean;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

const NavButton: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
  <button onClick={onClick} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
    {children}
  </button>
);

const Header: React.FC<HeaderProps> = ({ isAuthenticated, onNavigate, onLogout }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-900 bg-opacity-80 backdrop-blur-md border-b border-gray-700 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button onClick={() => onNavigate('home')} className="flex-shrink-0 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-xl font-bold text-white">InsurePro Showcase</span>
            </button>
          </div>
          <div className="flex items-center space-x-6">
            <NavButton onClick={() => onNavigate('home')}>Home</NavButton>
            {isAuthenticated && <NavButton onClick={() => onNavigate('showcase')}>Showcase</NavButton>}
            {isAuthenticated ? (
              <button
                onClick={onLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-colors text-sm"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors text-sm"
              >
                Admin Login
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
