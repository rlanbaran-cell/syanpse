
import React from 'react';
import { drugCategories, DrugCategory } from '../data/drugCategories';

interface QuickAccessCategoriesProps {
    onSelectCategory: (category: DrugCategory) => void;
}

export const QuickAccessCategories: React.FC<QuickAccessCategoriesProps> = ({ onSelectCategory }) => {
    return (
        <div className="mt-8 text-center animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">مرور سریع دسته‌بندی‌ها (مبتنی بر کاتزونگ)</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {drugCategories.map((cat) => (
                    <button
                        key={cat.name}
                        onClick={() => onSelectCategory(cat)}
                        className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md border border-transparent hover:border-blue-500 hover:shadow-lg transition-all duration-200"
                    >
                        {cat.icon}
                        <span className="mt-2 font-semibold text-gray-800 text-sm text-center">{cat.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};
