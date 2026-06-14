import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';

export default function IngredientSearch({ onSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    // Close dropdown if clicked outside
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [wrapperRef]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const fetchIngredients = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/ingredients/search?q=${query}`);
        setResults(response.data);
        setIsOpen(true);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchIngredients();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSelect = (ingredient) => {
    setQuery('');
    setIsOpen(false);
    if (onSelect) {
      onSelect(ingredient);
    }
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-lg mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-red-500" />
        </div>
        <input
          type="text"
          className="block w-full pl-11 pr-10 py-3.5 border border-amber-200 rounded-2xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 text-sm md:text-base shadow-sm hover:border-amber-300 transition-all"
          placeholder="Search for an ingredient (e.g. Paneer)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { if (results.length > 0) setIsOpen(true) }}
        />
        {isLoading && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <div className="animate-spin h-5 w-5 border-2 border-red-600 border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <ul className="absolute z-10 mt-2 w-full bg-white shadow-xl max-h-64 rounded-2xl py-1.5 border border-amber-100/60 overflow-auto focus:outline-none text-sm md:text-base animate-fadeIn">
          {results.map((ingredient) => (
            <li
              key={ingredient.id}
              className="cursor-pointer select-none relative py-3 px-4 hover:bg-amber-50/70 active:bg-amber-100/50 transition-colors"
              onClick={() => handleSelect(ingredient)}
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-800 block truncate">
                  {ingredient.name}
                </span>
                <span className="text-xs font-bold text-red-700 bg-red-50 border border-red-100/50 px-2.5 py-1 rounded-full">
                  {ingredient.calories_per_100g} kcal
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
