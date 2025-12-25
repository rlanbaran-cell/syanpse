import React from 'react';
import { HistoryIcon } from './icons/HistoryIcon';
import { TrashIcon } from './icons/TrashIcon';

interface SearchHistoryProps {
    history: string[];
    onHistoryClick: (searchTerm: string) => void;
    onClearHistory: () => void;
}

export const SearchHistory: React.FC<SearchHistoryProps> = ({ history, onHistoryClick, onClearHistory }) => {
    if (history.length === 0) {
        return null;
    }

    return (
        <div className="mt-8 animate-fade-in">
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
                    <HistoryIcon className="h-6 w-6 text-gray-500" />
                    تاریخچه جستجو
                </h2>
                <button 
                    onClick={onClearHistory} 
                    className="text-sm text-red-500 hover:text-red-700 font-semibold flex items-center gap-1"
                    aria-label="پاک کردن تاریخچه"
                >
                    <TrashIcon className="h-4 w-4" />
                    پاک کردن
                </button>
            </div>
            <div className="flex flex-wrap gap-2">
                {history.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => onHistoryClick(item)}
                        className="text-sm bg-gray-100 text-gray-800 px-3 py-1.5 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors"
                    >
                        {item}
                    </button>
                ))}
            </div>
        </div>
    );
};
