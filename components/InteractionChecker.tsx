import React, { useState, useEffect, useRef } from 'react';
import { drugList } from '../data/drugList';
import { PlusIcon } from './icons/PlusIcon';
import { TrashIcon } from './icons/TrashIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { AlertIcon } from './icons/AlertIcon';
import { InteractionIcon } from './icons/InteractionIcon';
import { BookmarkIcon } from './icons/BookmarkIcon';
import { fetchInteractionInfo } from '../services/geminiService';
import * as savedItemsService from '../services/savedItemsService';
import type { SavedInteractionItem, InteractionResultData } from '../types';
import { InteractionResult } from './InteractionResult';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { LanguageSwitcher, Language } from './LanguageSwitcher';

const InteractionChecker: React.FC = () => {
    const [drugInput, setDrugInput] = useState('');
    const [drugListToCheck, setDrugListToCheck] = useState<string[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<InteractionResultData | null>(null);
    const [savedInteractionId, setSavedInteractionId] = useState<string | null>(null);
    const [language, setLanguage] = useState<Language>('fa');
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (drugInput.trim().length > 1) {
            const filtered = drugList.filter(drug => 
                drug.toLowerCase().includes(drugInput.trim().toLowerCase()) && !drugListToCheck.includes(drug)
            ).slice(0, 5);
            setSuggestions(filtered);
            setShowSuggestions(filtered.length > 0);
        } else {
            setShowSuggestions(false);
        }
    }, [drugInput, drugListToCheck]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
    const handleAddDrug = (drug: string) => {
        const drugToAdd = drug.trim();
        if (drugToAdd && !drugListToCheck.includes(drugToAdd)) {
            setDrugListToCheck([...drugListToCheck, drugToAdd]);
        }
        setDrugInput('');
        setShowSuggestions(false);
    };

    const handleRemoveDrug = (drugToRemove: string) => {
        setDrugListToCheck(drugListToCheck.filter(drug => drug !== drugToRemove));
    };
    
    const handleCheckInteractions = async () => {
        if (drugListToCheck.length < 2) {
            setError('لطفاً حداقل دو دارو برای بررسی تداخل وارد کنید.');
            return;
        }
        
        setIsLoading(true);
        setError(null);
        setResult(null);
        setSavedInteractionId(null);

        try {
            const interactionResult = await fetchInteractionInfo(drugListToCheck);
            setResult(interactionResult);
        } catch (err) {
            setError('خطایی در بررسی تداخلات رخ داد. لطفاً اتصال خود را بررسی کرده و دوباره تلاش کنید.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveInteraction = () => {
        if (!result || savedInteractionId) return;

        const interactionToSave: Omit<SavedInteractionItem, 'id'> = {
            type: 'interaction',
            title: `تداخل: ${drugListToCheck.slice(0, 3).join('، ')}${drugListToCheck.length > 3 ? '...' : ''}`,
            drugList: drugListToCheck,
            data: result
        };
        const newItem = savedItemsService.saveItem(interactionToSave);
        setSavedInteractionId(newItem.id);
    };

    return (
        <div className="space-y-6">
            <div ref={wrapperRef} className="relative">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="نام دارو را برای افزودن وارد کنید..."
                        value={drugInput}
                        onChange={(e) => setDrugInput(e.target.value)}
                        onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
                        className="flex-grow w-full px-4 py-3 bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                    />
                    <button
                        onClick={() => handleAddDrug(drugInput)}
                        disabled={!drugInput.trim()}
                        className="flex-shrink-0 h-12 w-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
                        aria-label="افزودن دارو"
                    >
                        <PlusIcon className="h-6 w-6" />
                    </button>
                </div>
                {showSuggestions && (
                    <ul className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                        {suggestions.map((suggestion, index) => (
                            <li key={index}>
                                <button
                                    type="button"
                                    onClick={() => handleAddDrug(suggestion)}
                                    className="w-full text-right px-4 py-2 text-gray-700 hover:bg-gray-100"
                                >
                                    {suggestion}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border min-h-[100px]">
                <h3 className="font-semibold text-gray-700 mb-2">داروهای انتخاب شده:</h3>
                {drugListToCheck.length > 0 ? (
                    <ul className="flex flex-wrap gap-2">
                        {drugListToCheck.map(drug => (
                            <li key={drug} className="flex items-center gap-2 bg-gray-200 text-gray-800 pl-2 pr-3 py-1 rounded-full text-sm animate-fade-in">
                                <span>{drug}</span>
                                <button onClick={() => handleRemoveDrug(drug)} className="text-gray-500 hover:text-red-500">
                                    <TrashIcon className="h-4 w-4" />
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 text-sm">هنوز دارویی اضافه نشده است.</p>
                )}
            </div>

            <button
                onClick={handleCheckInteractions}
                disabled={isLoading || drugListToCheck.length < 2}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200"
            >
                {isLoading ? <SpinnerIcon className="h-6 w-6" /> : <InteractionIcon className="h-6 w-6" />}
                <span>بررسی تداخلات دارویی</span>
            </button>
            
            <div className="mt-6">
                {isLoading && (
                     <div className="flex flex-col items-center justify-center text-center mt-12">
                        <SpinnerIcon className="h-12 w-12 text-blue-500" />
                        <p className="mt-4 text-lg text-gray-600">در حال تحلیل تداخلات...</p>
                    </div>
                )}
                {error && (
                    <div className="mt-8 bg-red-50 border-r-4 border-red-400 p-4 rounded-lg shadow-md flex items-start">
                        <div className="pr-3"><AlertIcon className="h-6 w-6 text-red-600" /></div>
                        <div>
                            <p className="font-bold text-red-800">خطا</p>
                            <p className="text-red-700">{error}</p>
                        </div>
                    </div>
                )}
                {result && (
                    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 animate-fade-in">
                        <div className="flex justify-between items-start mb-4">
                             <h2 className="text-2xl font-bold text-blue-700">نتیجه تحلیل تداخلات</h2>
                             <div className="flex items-center gap-2 flex-shrink-0 mr-4">
                                <LanguageSwitcher language={language} setLanguage={setLanguage} />
                                <button
                                    onClick={handleSaveInteraction}
                                    disabled={!!savedInteractionId}
                                    className={`p-2 rounded-full transition-colors ${
                                        savedInteractionId ? 'bg-green-100 text-green-600 cursor-default' : 'bg-gray-100 hover:bg-gray-200 text-gray-500'
                                    }`}
                                    aria-label={savedInteractionId ? "تداخل ذخیره شد" : "ذخیره تداخل"}
                                >
                                    <BookmarkIcon className="h-6 w-6" />
                                </button>
                             </div>
                        </div>

                        <div className="bg-blue-50 border-r-4 border-blue-400 p-4 rounded-lg mb-6">
                            <h4 className="font-bold text-blue-800 flex items-center gap-2">
                                <ShieldCheckIcon className="h-5 w-5" />
                                {language === 'fa' ? 'توصیه مدیریتی' : 'Management Advice'}
                            </h4>
                            <p className="text-blue-700 mt-1 text-sm font-semibold">{result.managementAdvice[language]}</p>
                        </div>
                        
                        <InteractionResult data={result.analysis} language={language} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default InteractionChecker;
