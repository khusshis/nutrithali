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
    <div ref={wrapperRef} className="relative w-full max-w-md">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm shadow-sm transition-all"
          placeholder="Search for an ingredient (e.g. Paneer)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { if (results.length > 0) setIsOpen(true) }}
        />
        {isLoading && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          {results.map((ingredient) => (
            <li
              key={ingredient.id}
              className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-50 transition-colors"
              onClick={() => handleSelect(ingredient)}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900 block truncate">
                  {ingredient.name}
                </span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
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
