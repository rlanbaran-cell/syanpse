
import React, { useState } from 'react';
import type { InfantFormulaInfo, SavedInfantFormulaItem } from '../types';
import * as savedItemsService from '../services/savedItemsService';
import { BookmarkIcon } from './icons/BookmarkIcon';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { BabyIcon } from './icons/BabyIcon';
import { LeafIcon } from './icons/LeafIcon';

interface InfantFormulaCardProps {
  info: InfantFormulaInfo;
  showSaveButton?: boolean;
}

const indicationColors: { [key: string]: string } = {
    'رفلاکس': 'bg-green-100 text-green-800',
    'آلرژی': 'bg-purple-100 text-purple-800',
    'کولیک': 'bg-pink-100 text-pink-800',
    'یبوست': 'bg-yellow-100 text-yellow-800',
    'اسهال': 'bg-blue-100 text-blue-800',
    'وزن‌گیری': 'bg-orange-100 text-orange-800',
    'نارس': 'bg-red-100 text-red-800',
};

const getIndicationStyle = (indication: string): string => {
    const key = Object.keys(indicationColors).find(k => indication.toLowerCase().includes(k));
    return key ? indicationColors[key] : 'bg-gray-100 text-gray-800';
};

export const InfantFormulaCard: React.FC<InfantFormulaCardProps> = ({ info, showSaveButton = true }) => {
  const [isSaved, setIsSaved] = useState(() => savedItemsService.isFormulaSaved(info.name));

  const handleSave = () => {
    if (isSaved) return;
    const itemToSave: Omit<SavedInfantFormulaItem, 'id'> = {
        type: 'formula',
        title: info.name,
        data: info,
    };
    savedItemsService.saveItem(itemToSave);
    setIsSaved(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 animate-fade-in border-t-8 border-blue-500">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h2 className="text-3xl font-bold text-blue-700">{info.name}</h2>
                <p className="text-md text-gray-500 font-semibold">{info.brand}</p>
            </div>
             {showSaveButton && (
                <button
                    onClick={handleSave}
                    disabled={isSaved}
                    className={`p-2 rounded-full transition-colors flex-shrink-0 ml-4 ${
                        isSaved ? 'bg-green-100 text-green-600 cursor-default' : 'bg-gray-100 hover:bg-gray-200 text-gray-500'
                    }`}
                    aria-label={isSaved ? "ذخیره شده" : "ذخیره"}
                >
                    <BookmarkIcon className="h-6 w-6" />
                </button>
            )}
        </div>

        <div className="flex flex-wrap gap-4 items-center mb-6 pb-4 border-b border-gray-200">
            <div className="flex-1 min-w-[150px] bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-sm text-gray-500">مرحله</p>
                <p className="font-bold text-lg text-gray-800">{info.stage}</p>
            </div>
             <div className="flex-1 min-w-[150px] bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-sm text-gray-500">رده سنی</p>
                <p className="font-bold text-lg text-gray-800">{info.ageRange}</p>
            </div>
        </div>
        
        <div className="space-y-4">
            <div>
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-2">
                    <BabyIcon className="h-6 w-6 text-gray-500" />
                    کاربردهای اصلی
                </h3>
                <div className="flex flex-wrap gap-2">
                    {info.indications.map(indication => (
                        <span 
                            key={indication} 
                            className={`px-3 py-1 text-sm font-semibold rounded-full ${getIndicationStyle(indication)}`}
                        >
                            {indication}
                        </span>
                    ))}
                </div>
            </div>
            <div className="border-t border-gray-200 pt-4 mt-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <ClipboardIcon className="h-6 w-6 text-gray-500" />
                    توضیحات
                </h3>
                <p className="mt-2 text-gray-600 whitespace-pre-wrap leading-relaxed">{info.description}</p>
            </div>
             <div className="border-t border-gray-200 pt-4 mt-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <LeafIcon className="h-6 w-6 text-emerald-500" />
                    ترکیبات کلیدی
                </h3>
                <p className="mt-2 text-gray-600 whitespace-pre-wrap leading-relaxed">{info.keyIngredients}</p>
            </div>
        </div>
    </div>
  );
};
