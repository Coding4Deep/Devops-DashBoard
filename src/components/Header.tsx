
import React from 'react';
import { Wrench, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="relative z-10 bg-white/10 dark:bg-gray-900/50 backdrop-blur-md border-b border-white/20 dark:border-gray-700/50">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <Wrench className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white dark:text-gray-100">DevOps</span>
          </div>
          
          <div className="text-2xl font-bold text-gradient">
            DevOps Dashboard
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-white dark:text-gray-200 hover:bg-white/10 dark:hover:bg-gray-800/50"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
