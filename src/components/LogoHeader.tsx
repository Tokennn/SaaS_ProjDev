import React from 'react';
import { Link } from 'react-router-dom';

const LogoHeader = () => {
  return (
    <div className="w-full py-4 px-6 md:px-12 flex items-center justify-center fixed top-0 z-50 backdrop-blur-md">
      <Link to="/" className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-md bg-gradient-to-r from-custom-blue to-custom-purple flex items-center justify-center text-white font-bold">
          LS
        </div>
        <span className="text-xl font-bold hidden sm:block">LangSensei</span>
      </Link>
    </div>
  );
};

export default LogoHeader;