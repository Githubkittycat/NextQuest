import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { HomeIcon, SearchIcon, CompassIcon, UserIcon, PlusCircleIcon, PencilIcon } from './Icons';
import { GamepadIcon } from './Icons';

interface BottomNavProps {
}

const BottomNav: React.FC<BottomNavProps> = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
          if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
              setIsMenuOpen(false);
          }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);
  
  // Close menu on navigation
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: '/', icon: HomeIcon, label: 'Feed' },
    { path: '/explore', icon: SearchIcon, label: 'Explore' },
    { isAction: true },
    { path: '/discover', icon: CompassIcon, label: 'Discover' },
    { path: '/profile', icon: UserIcon, label: 'Profile' },
  ];

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex-1 flex flex-col items-center justify-center text-xs gap-1 transition-colors duration-200 ${
      isActive ? 'text-brand-light-purple' : 'text-subtle-text hover:text-light-text'
    }`;

  return (
    <nav className="flex-shrink-0 h-16 bg-content-bg/80 backdrop-blur-sm border-t border-gray-700/50">
      <div className="flex justify-around items-center h-full">
        {navItems.map((item, index) => {
          if (item.isAction) {
            return (
              <div key="action-button" ref={wrapperRef} className="flex-1 flex justify-center items-center -mt-6 relative">
                {isMenuOpen && (
                  <div className="absolute bottom-full mb-4 w-48 bg-gray-800 rounded-lg shadow-lg py-2 z-20 border border-gray-700">
                    <Link 
                      to="/log" 
                      state={{ from: location.pathname }} 
                      className="flex items-center w-full text-left px-4 py-3 text-sm font-semibold text-light-text hover:bg-brand-purple/50 transition-colors"
                    >
                      <GamepadIcon className="w-5 h-5 mr-3" />
                      Log a Game
                    </Link>
                    <Link 
                      to="/createlist"
                      state={{ from: location.pathname }}
                      className="flex items-center w-full text-left px-4 py-3 text-sm font-semibold text-light-text hover:bg-brand-purple/50 transition-colors"
                    >
                       <PencilIcon className="w-5 h-5 mr-3" />
                      Create a List
                    </Link>
                  </div>
                )}
                <button
                  onClick={() => setIsMenuOpen(prev => !prev)}
                  className={`bg-brand-purple rounded-full p-3 shadow-lg shadow-brand-purple/50 text-white transform hover:scale-110 transition-transform duration-300 ${isMenuOpen ? 'scale-110' : ''}`}
                  aria-label="Create new log or list"
                >
                  <PlusCircleIcon className="w-8 h-8" />
                </button>
              </div>
            );
          }
          const Icon = item.icon as React.ElementType;
          return (
            <NavLink to={item.path!} key={item.path} className={navLinkClass}>
              {({ isActive }) => (
                  <>
                    <Icon className={`w-6 h-6 transition-all duration-200 ${isActive ? 'drop-shadow-[0_0_4px_theme(colors.brand-light-purple)]' : ''}`} />
                    <span className={isActive ? 'font-bold' : ''}>{item.label}</span>
                  </>
                )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;