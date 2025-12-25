
import React, { useState } from 'react';
import type { SpecialMedicationInfo, SavedSpecialMedicationItem } from '../types';
import * as savedItemsService from '../services/savedItemsService';
import { BookmarkIcon } from './icons/BookmarkIcon';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { WarningIcon } from './icons/WarningIcon';
import { InfoIcon } from './icons/InfoIcon';
import { ThermometerIcon } from './icons/ThermometerIcon';

interface SpecialMedicationCardProps {
  info: SpecialMedicationInfo;
  showSaveButton?: boolean;
}

export const SpecialMedicationCard: React.FC<SpecialMedicationCardProps> = ({ info, showSaveButton = true }) => {
  const [isSaved, setIsSaved] = useState(() => savedItemsService.isSpecialMedicationSaved(info.name));

  const handleSave = () => {
    if (isSaved) return;
    const itemToSave: Omit<SavedSpecialMedicationItem, 'id'> = {
        type: 'special',
        title: info.name,
        data: info,
    };
    savedItemsService.saveItem(itemToSave);
    setIsSaved(true);
  };

  const isRefrigerated = info.storage.includes('یخچال');

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 animate-fade-in border-t-8 border-purple-500">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h2 className="text-3xl font-bold text-purple-700">{info.name}</h2>
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

        {info.imageBase64 && (
            <figure className="my-6">
                <img 
                    src={`data:image/png;base64,${info.imageBase64}`} 
                    alt={info.name} 
                    className="w-full h-48 object-contain rounded-lg bg-gray-100 p-2 border"
                />
            </figure>
        )}

        <div className="space-y-4">
            <div>
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-2">
                    <ClipboardIcon className="h-6 w-6 text-gray-500" />
                    کاربرد اصلی
                </h3>
                <p className="text-gray-600">{info.primaryUse}</p>
            </div>

            <div className={`border-t border-gray-200 pt-4 mt-4 p-4 rounded-lg ${
                isRefrigerated ? 'bg-blue-50 border-l-4 border-blue-400' : 'bg-gray-50'
            }`}>
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <ThermometerIcon className={`h-6 w-6 ${isRefrigerated ? 'text-blue-500' : 'text-gray-500'}`} />
                    شرایط نگهداری
                </h3>
                <p className={`mt-2 ${isRefrigerated ? 'text-blue-800 font-semibold' : 'text-gray-600'}`}>{info.storage}</p>
            </div>

             <div className="border-t border-gray-200 pt-4 mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-800 flex items-center gap-2">
                    <WarningIcon className="h-6 w-6" />
                    نکات مهم مصرف/تزریق
                </h3>
                <p className="mt-2 text-yellow-700 whitespace-pre-wrap leading-relaxed">{info.administrationNotes}</p>
            </div>

            <div className="border-t border-gray-200 pt-4 mt-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <InfoIcon className="h-6 w-6 text-gray-500" />
                    سایر نکات
                </h3>
                <p className="mt-2 text-gray-600 whitespace-pre-wrap leading-relaxed">{info.keyPoints}</p>
            </div>
        </div>
    </div>
  );
};
