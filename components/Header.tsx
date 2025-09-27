
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { signOutUser } from '../services/authService';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleSignOut = async () => {
    await signOutUser();
    setIsProfileOpen(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Features', path: '/features' },
    { name: 'Roadmap', path: '/roadmap' },
    { name: 'Mock Interviews', path: '/interviews' },
    { name: 'Resume Feedback', path: '/resume' },
    { name: 'Aptitude & Coding', path: '/aptitude' },
    { name: 'Progress', path: '/progress' },
    { name: 'Contact', path: '/contact' },
  ];

  const mobileMenuVariants = {
    closed: { opacity: 0, y: -20 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <NavLink to="/" className="flex items-center space-x-2 text-2xl font-bold text-blue-600">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
              <span>AI Mentor</span>
            </NavLink>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <NavLink key={link.name} to={link.path} className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>{link.name}</NavLink>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            {loading ? (
              <div className="w-8 h-8 bg-slate-200 rounded-full animate-pulse"></div>
            ) : user ? (
              <div className="ml-4 relative">
                <div>
                  <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="max-w-xs bg-slate-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white" id="user-menu" aria-haspopup="true">
                    <span className="sr-only">Open user menu</span>
                    <img className="h-8 w-8 rounded-full" src={user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`} alt="" />
                  </button>
                </div>
                <AnimatePresence>
                {isProfileOpen && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.1 }} className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                    <div className="px-4 py-2 text-sm text-slate-700 border-b">{user.displayName}</div>
                    <a href="#" onClick={handleSignOut} className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100" role="menuitem">Sign out</a>
                  </motion.div>
                )}
                </AnimatePresence>
              </div>
            ) : (
              <NavLink to="/login" className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors">Login</NavLink>
            )}
          </div>
          <div className="-mr-2 flex md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="bg-slate-100 inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 focus:ring-blue-500">
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
      {isMenuOpen && (
        <motion.div variants={mobileMenuVariants} initial="closed" animate="open" exit="closed" className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink key={link.name} to={link.path} onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>{link.name}</NavLink>
            ))}
             <div className="pt-4 pb-3 border-t border-slate-200">
              {loading ? <div className="h-10 w-20 bg-slate-200 animate-pulse rounded-md"></div> : user ? (
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img className="h-10 w-10 rounded-full" src={user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`} alt="" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-slate-800">{user.displayName}</div>
                    <div className="text-sm font-medium leading-none text-slate-500">{user.email}</div>
                  </div>
                </div>
              ) : (
                <NavLink to="/login" onClick={() => setIsMenuOpen(false)} className="block w-full text-left mt-1 px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900">Login</NavLink>
              )}
              {user && (
                  <div className="mt-3 px-2 space-y-1">
                      <a href="#" onClick={() => { handleSignOut(); setIsMenuOpen(false); }} className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900">Sign out</a>
                  </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
