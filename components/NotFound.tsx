
import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-9xl font-extrabold text-blue-600 tracking-wider">404</h1>
      <h2 className="text-3xl font-bold text-slate-800 mt-4">Page Not Found</h2>
      <p className="text-slate-500 mt-2 mb-6">
        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
      </p>
      <Link to="/">
        <Button>Go Back Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
