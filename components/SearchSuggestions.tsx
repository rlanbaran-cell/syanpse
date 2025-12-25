
import React from 'react';
import { SearchIcon } from './icons/SearchIcon';

interface SearchSuggestionsProps {
    title: string;
    suggestions: string[];
    onSuggestionClick: (suggestion: string) => void;
}

export const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({ title, suggestions, onSuggestionClick }) => {
    return (
        <div className="mt-6 bg-gray-50 p-4 rounded-lg border">
            <h3 className="text-md font-semibold text-gray-700 mb-3">{title}</h3>
            <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                    <button
                        key={index}
                        onClick={() => onSuggestionClick(suggestion)}
                        className="flex items-center gap-2 text-sm bg-white border border-gray-300 text-gray-800 px-3 py-1 rounded-full hover:bg-blue-50 hover:border-blue-400 transition-colors"
                    >
                        <SearchIcon className="h-4 w-4 text-gray-500" />
                        <span>{suggestion}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};