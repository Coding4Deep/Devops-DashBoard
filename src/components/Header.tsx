
import React from 'react';
import { Wrench } from 'lucide-react';

const Header = () => {
  return (
    <header className="relative z-10 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <Wrench className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">DevOps</span>
          </div>
          
          <div className="text-2xl font-bold text-gradient">
            DevOps Dashboard
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-white/80 text-sm">sagardeepak2002@gmail.com</span>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
