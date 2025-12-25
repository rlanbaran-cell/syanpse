
import React from 'react';
import type { DrugCategory } from '../data/drugCategories';
import { ArrowRightIcon } from './icons/ArrowRightIcon';

interface DrugCategoryViewProps {
    category: DrugCategory;
    onDrugSelect: (drugName: string) => void;
    onBack: () => void;
}

export const DrugCategoryView: React.FC<DrugCategoryViewProps> = ({ category, onDrugSelect, onBack }) => {
    return (
        <div className="animate-fade-in">
            <div className="mb-4">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold"
                >
                    <ArrowRightIcon className="h-5 w-5" />
                    <span>بازگشت به دسته‌بندی‌ها</span>
                </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                    {category.icon}
                    {category.name}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {category.drugs.map(drug => (
                        <button
                            key={drug}
                            onClick={() => onDrugSelect(drug)}
                            className="w-full text-right p-3 bg-gray-50 rounded-md hover:bg-blue-100 hover:text-blue-700 transition-colors duration-150 font-medium"
                        >
                            {drug}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
