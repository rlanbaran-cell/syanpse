
import React, { useState, useEffect } from 'react';
import type { PregnancyDrugCategory } from '../data/pregnancyDrugCategories';
import { SpinnerIcon } from './icons/SpinnerIcon';

interface PregnancyQuickAccessProps {
    onSelectCategory: (category: PregnancyDrugCategory) => void;
}

export const PregnancyQuickAccess: React.FC<PregnancyQuickAccessProps> = ({ onSelectCategory }) => {
    const [categories, setCategories] = useState<PregnancyDrugCategory[]>([]);

    useEffect(() => {
        import('../data/pregnancyDrugCategories').then(module => {
            setCategories(module.pregnancyDrugCategories);
        });
    }, []);

    if (categories.length === 0) {
        return (
            <div className="flex justify-center mt-12">
                <SpinnerIcon className="h-10 w-10 text-gray-400" />
            </div>
        );
    }

    return (
        <div className="mt-8 text-center animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">مرور سریع دسته‌بندی‌های رایج در بارداری</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {categories.map((cat) => (
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
