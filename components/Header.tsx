
import React from 'react';

interface HeaderProps {
  title: string;
  slogan: string;
}

const Header: React.FC<HeaderProps> = ({ title, slogan }) => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm text-white p-4 shadow-lg border-b border-gray-700 fixed top-0 left-0 right-0 z-10">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-cyan-300">{title}</h1>
        <p className="text-sm text-gray-300 mt-1">{slogan}</p>
      </div>
    </header>
  );
};

export default Header;
