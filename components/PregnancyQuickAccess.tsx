
import React from 'react';
import { pregnancyDrugCategories, PregnancyDrugCategory } from '../data/pregnancyDrugCategories';

interface PregnancyQuickAccessProps {
    onSelectCategory: (category: PregnancyDrugCategory) => void;
}

export const PregnancyQuickAccess: React.FC<PregnancyQuickAccessProps> = ({ onSelectCategory }) => {
    return (
        <div className="mt-8 text-center animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">مرور سریع دسته‌بندی‌های رایج در بارداری</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {pregnancyDrugCategories.map((cat) => (
                    <button
                        key={cat.name}
                        onClick={() => onSelectCategory(cat)}
                        className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md border border-transparent hover:border-pink-500 hover:shadow-lg transition-all duration-200"
                    >
                        {cat.icon}
                        <span className="mt-2 font-semibold text-gray-800 text-sm text-center">{cat.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};
