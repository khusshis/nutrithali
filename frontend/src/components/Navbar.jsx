import React, { useState } from 'react';
import { Utensils, Menu, X, LogIn, Sparkles } from 'lucide-react';

export default function Navbar({ onLoginClick }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 border-b border-amber-100/50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center flex-shrink-0">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="p-2 bg-gradient-to-tr from-red-600 to-amber-500 rounded-xl text-white shadow-md shadow-red-500/20 group-hover:scale-110 transition-transform duration-300">
                <Utensils className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-red-700 via-red-600 to-amber-500 bg-clip-text text-transparent tracking-tight">
                Nutri<span className="font-extrabold text-amber-500">Thali</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-sm font-semibold text-gray-700 hover:text-red-600 transition-colors duration-200">
              Home
            </a>
            <a href="#" className="text-sm font-semibold text-gray-700 hover:text-red-600 transition-colors duration-200">
              Meal Planner
            </a>
            <a href="#" className="text-sm font-semibold text-gray-700 hover:text-red-600 transition-colors duration-200">
              Ingredients
            </a>
            <a href="#" className="text-sm font-semibold text-gray-700 hover:text-red-600 transition-colors duration-200 flex items-center gap-1">
              Premium <Sparkles className="h-3 w-3 text-amber-500 fill-amber-500 animate-pulse" />
            </a>
          </div>

          {/* Action Button */}
          <div className="hidden md:flex items-center">
            <button
              onClick={onLoginClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 shadow-md shadow-red-500/10 hover:shadow-red-500/20 hover:scale-[1.03] transition-all duration-300 cursor-pointer"
            >
              <LogIn className="h-4 w-4" />
              Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-red-600 hover:bg-amber-50 focus:outline-none transition-colors duration-200"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white/95 border-b border-amber-100 px-4 pt-2 pb-4 space-y-2 animate-fadeIn">
          <a
            href="#"
            className="block px-3 py-2 rounded-lg text-base font-semibold text-gray-700 hover:text-red-600 hover:bg-amber-50/50 transition-all"
            onClick={() => setIsOpen(false)}
          >
            Home
          </a>
          <a
            href="#"
            className="block px-3 py-2 rounded-lg text-base font-semibold text-gray-700 hover:text-red-600 hover:bg-amber-50/50 transition-all"
            onClick={() => setIsOpen(false)}
          >
            Meal Planner
          </a>
          <a
            href="#"
            className="block px-3 py-2 rounded-lg text-base font-semibold text-gray-700 hover:text-red-600 hover:bg-amber-50/50 transition-all"
            onClick={() => setIsOpen(false)}
          >
            Ingredients
          </a>
          <a
            href="#"
            className="block px-3 py-2 rounded-lg text-base font-semibold text-gray-700 hover:text-red-600 hover:bg-amber-50/50 transition-all"
            onClick={() => setIsOpen(false)}
          >
            Premium
          </a>
          <div className="pt-2 border-t border-amber-100/50">
            <button
              onClick={() => {
                setIsOpen(false);
                onLoginClick();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-base font-bold text-white bg-gradient-to-r from-red-600 to-amber-500 shadow-md shadow-red-500/10 cursor-pointer"
            >
              <LogIn className="h-4 w-4" />
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
