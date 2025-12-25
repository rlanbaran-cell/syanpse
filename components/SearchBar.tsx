import React, { useState, useEffect, useRef } from 'react';
import { SearchIcon } from './icons/SearchIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { drugList } from '../data/drugList';

interface SearchBarProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSuggestionSelect: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  suggestionList?: string[];
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
    value, 
    onChange, 
    onSuggestionSelect, 
    onSubmit, 
    isLoading,
    suggestionList = drugList,
    placeholder = "مثال: آتورواستاتین"
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value.trim().length > 1) {
      const filteredSuggestions = suggestionList.filter(item =>
        item.toLowerCase().includes(value.trim().toLowerCase())
      ).slice(0, 7); // Limit suggestions
      setSuggestions(filteredSuggestions);
      setShowSuggestions(filteredSuggestions.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [value, suggestionList]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoading) {
      setShowSuggestions(false);
      onSubmit();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSuggestionSelect(suggestion);
    setShowSuggestions(false);
  };

  const handleFocus = () => {
     if (value.trim().length > 1 && suggestions.length > 0) {
        setShowSuggestions(true);
     }
  }

  return (
    <div ref={wrapperRef} className="relative">
        <form onSubmit={handleSubmit} className="relative">
        <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            disabled={isLoading}
            autoComplete="off"
            className="w-full pr-12 pl-4 py-3 bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200 text-lg"
        />
        <button
            type="submit"
            disabled={isLoading}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            aria-label="جستجو"
        >
            {isLoading ? <SpinnerIcon className="h-5 w-5" /> : <SearchIcon className="h-5 w-5" />}
        </button>
        </form>
        {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                <li key={index}>
                    <button
                        type="button"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full text-right px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                    >
                        {suggestion}
                    </button>
                </li>
                ))}
            </ul>
        )}
    </div>
  );
};
