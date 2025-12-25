import React, { useState, useEffect } from 'react';
import type { SupplementInfo, BilingualText } from '../types';
import * as savedItemsService from '../services/savedItemsService';
import { BookmarkIcon } from './icons/BookmarkIcon';
import { WarningIcon } from './icons/WarningIcon';
import { ReferenceIcon } from './icons/ReferenceIcon';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { LeafIcon } from './icons/LeafIcon';
import { LinkIcon } from './icons/LinkIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { getRelatedSupplements } from '../data/supplementRelations';
import { fetchRelatedSupplements } from '../services/geminiService';
import { LanguageSwitcher, Language } from './LanguageSwitcher';

interface SupplementInfoCardProps {
  supplementInfo: SupplementInfo;
  showSaveButton?: boolean;
  onSuggestionClick?: (supplementName: string) => void;
}

export const SupplementInfoCard: React.FC<SupplementInfoCardProps> = ({ supplementInfo, showSaveButton = true, onSuggestionClick }) => {
    const [isSaved, setIsSaved] = useState(() => savedItemsService.isSupplementSaved(supplementInfo.supplementName));
    const [language, setLanguage] = useState<Language>('fa');
    const [apiSuggestions, setApiSuggestions] = useState<string[]>([]);
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
    
    const staticSuggestions = getRelatedSupplements(supplementInfo.supplementName);

    useEffect(() => {
        setApiSuggestions([]);
        if (onSuggestionClick && staticSuggestions.length === 0) {
            const getApiSuggestions = async () => {
                setIsLoadingSuggestions(true);
                const suggestions = await fetchRelatedSupplements(supplementInfo.supplementName);
                setApiSuggestions(suggestions);
                setIsLoadingSuggestions(false);
            };
            getApiSuggestions();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [supplementInfo.supplementName, onSuggestionClick]);
    
    const handleSave = () => {
        if (isSaved) return;
        savedItemsService.saveItem({
            type: 'supplement',
            title: supplementInfo.supplementName,
            data: supplementInfo,
        });
        setIsSaved(true);
    };

    const t = (bilingualText: BilingualText): string => bilingualText[language];
    const titles = {
        fa: {
            description: "توضیحات",
            ingredients: "ترکیبات",
            usage: "روش مصرف",
            warnings: "هشدارها",
            related: "مکمل‌های مشابه یا تکمیلی",
            findingSuggestions: "در حال یافتن پیشنهادات...",
            ingredient: "ماده مؤثره",
            amount: "مقدار",
        },
        en: {
            description: "Description",
            ingredients: "Ingredients",
            usage: "Usage",
            warnings: "Warnings",
            related: "Related or Complementary Supplements",
            findingSuggestions: "Finding suggestions...",
            ingredient: "Ingredient",
            amount: "Amount",
        }
    };

    const allSuggestions = staticSuggestions.length > 0 ? staticSuggestions : apiSuggestions;

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 animate-fade-in">
             <div className="flex justify-between items-start mb-4">
                <div className="flex-grow">
                    <h2 className="text-3xl font-bold text-emerald-700 mb-1">{supplementInfo.supplementName}</h2>
                    {supplementInfo.brand && <p className="text-md text-gray-500">{supplementInfo.brand}</p>}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 mr-4">
                    <LanguageSwitcher language={language} setLanguage={setLanguage} />
                    {showSaveButton && (
                        <button
                            onClick={handleSave}
                            disabled={isSaved}
                            className={`p-2 rounded-full transition-colors ${
                                isSaved ? 'bg-green-100 text-green-600 cursor-default' : 'bg-gray-100 hover:bg-gray-200 text-gray-500'
                            }`}
                            aria-label={isSaved ? "ذخیره شده" : "ذخیره"}
                        >
                            <BookmarkIcon className="h-6 w-6" />
                        </button>
                    )}
                </div>
            </div>

            <div className="space-y-4">
                <div className="border-t border-gray-200 pt-4 mt-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <ClipboardIcon className="h-6 w-6 text-gray-500" />{titles[language].description}
                    </h3>
                    <p className="mt-2 text-gray-600 whitespace-pre-wrap leading-relaxed">{t(supplementInfo.description)}</p>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                         <LeafIcon className="h-6 w-6 text-emerald-500" />{titles[language].ingredients}
                    </h3>
                    <div className="mt-2 overflow-x-auto">
                        <table className="w-full text-sm text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                <tr>
                                    <th scope="col" className="px-4 py-3 rounded-r-lg">{titles[language].ingredient}</th>
                                    <th scope="col" className="px-4 py-3 rounded-l-lg">{titles[language].amount}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {supplementInfo.ingredients.map((ing, index) => (
                                    <tr key={index} className="border-b">
                                        <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{ing.name}</th>
                                        <td className="px-4 py-3">{ing.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                         <ReferenceIcon className="h-6 w-6 text-blue-500" />{titles[language].usage}
                    </h3>
                    <p className="mt-2 text-gray-600 whitespace-pre-wrap leading-relaxed">{t(supplementInfo.usage)}</p>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mt-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <WarningIcon className="h-6 w-6 text-red-500" />{titles[language].warnings}
                    </h3>
                    <p className="mt-2 text-gray-600 whitespace-pre-wrap leading-relaxed">{t(supplementInfo.warnings)}</p>
                </div>
                
                {onSuggestionClick && (isLoadingSuggestions || allSuggestions.length > 0) && (
                    <div className="border-t border-gray-200 pt-4 mt-4">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            <LinkIcon className="h-6 w-6 text-purple-500" />
                            {titles[language].related}
                        </h3>
                        {isLoadingSuggestions ? (
                             <div className="flex items-center gap-2 mt-3 text-gray-500">
                                <SpinnerIcon className="h-5 w-5" />
                                <span>{titles[language].findingSuggestions}</span>
                            </div>
                        ) : (
                            <div className="mt-3 flex flex-wrap gap-2">
                                {allSuggestions.map((supplement, index) => (
                                    <button
                                        key={index}
                                        onClick={() => onSuggestionClick(supplement)}
                                        className="text-sm bg-gray-100 text-gray-800 px-3 py-1 rounded-full hover:bg-purple-100 hover:text-purple-700 transition-colors"
                                    >
                                        {supplement}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
