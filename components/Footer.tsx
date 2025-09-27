
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-slate-500">
        <p>&copy; {new Date().getFullYear()} AI Mentor & Placement Hub. All rights reserved.</p>
        <p className="text-sm mt-1">Your Career Journey Starts Here 🚀</p>
      </div>
    </footer>
  );
};

export default Footer;
