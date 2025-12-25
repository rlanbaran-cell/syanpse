import React, { useState } from 'react';
import type { PregnancyInfo, BilingualText } from '../types';
import * as savedItemsService from '../services/savedItemsService';
import { BookmarkIcon } from './icons/BookmarkIcon';
import { PregnancyIcon } from './icons/PregnancyIcon';
import { ReferenceIcon } from './icons/ReferenceIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { WarningIcon } from './icons/WarningIcon';
import { LanguageSwitcher, Language } from './LanguageSwitcher';

interface PregnancyResultCardProps {
  pregnancyInfo: PregnancyInfo;
  showSaveButton?: boolean;
}

const safetyStyles = {
    safe: {
        label: { fa: 'ایمن', en: 'Safe' },
        classes: 'bg-green-100 text-green-800 border-green-500',
    },
    caution: {
        label: { fa: 'احتیاط', en: 'Caution' },
        classes: 'bg-yellow-100 text-yellow-800 border-yellow-500',
    },
    unsafe: {
        label: { fa: 'پرخطر', en: 'Unsafe' },
        classes: 'bg-red-100 text-red-800 border-red-500',
    },
    unknown: {
        label: { fa: 'نامشخص', en: 'Unknown' },
        classes: 'bg-gray-100 text-gray-800 border-gray-500',
    }
};

export const PregnancyResultCard: React.FC<PregnancyResultCardProps> = ({ pregnancyInfo, showSaveButton = true }) => {
    const [isSaved, setIsSaved] = useState(() => savedItemsService.isPregnancyCheckSaved(pregnancyInfo.drugName));
    const [language, setLanguage] = useState<Language>('fa');
    
    const handleSave = () => {
        if (isSaved) return;
        savedItemsService.saveItem({
            type: 'pregnancy',
            title: pregnancyInfo.drugName,
            data: pregnancyInfo,
        });
        setIsSaved(true);
    };

    const t = (bilingualText: BilingualText): string => bilingualText[language];
    const style = safetyStyles[pregnancyInfo.safetyLevel];

    return (
        <div className={`bg-white rounded-xl shadow-lg p-6 md:p-8 animate-fade-in border-t-8 ${style.classes}`}>
            <div className="flex justify-between items-start mb-2">
                 <div className="flex-grow">
                      <h2 className="text-3xl font-bold text-gray-800" dir="ltr">{pregnancyInfo.drugName}</h2>
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

            <div className={`inline-block px-3 py-1 text-sm font-bold rounded-full mb-4 ${style.classes}`}>
                {style.label[language]}
            </div>

            {(pregnancyInfo.safetyLevel === 'caution' || pregnancyInfo.safetyLevel === 'unsafe') && (
                <div className={`p-4 rounded-lg mb-4 flex items-start ${
                    pregnancyInfo.safetyLevel === 'caution' ? 'bg-yellow-50 border-yellow-400' : 'bg-red-50 border-red-400'
                } border-r-4`}>
                    <WarningIcon className={`h-6 w-6 ml-3 flex-shrink-0 ${
                        pregnancyInfo.safetyLevel === 'caution' ? 'text-yellow-500' : 'text-red-500'
                    }`} />
                    <div className="text-right w-full">
                        <h4 className={`font-bold ${
                            pregnancyInfo.safetyLevel === 'caution' ? 'text-yellow-800' : 'text-red-800'
                        }`}>
                            {language === 'fa' ? 'هشدار مهم' : 'Important Warning'}
                        </h4>
                        <p className={`text-sm mt-1 ${
                            pregnancyInfo.safetyLevel === 'caution' ? 'text-yellow-700' : 'text-red-700'
                        }`}>
                            {language === 'fa' 
                                ? 'مصرف این دارو نیازمند ارزیابی دقیق ریسک به فایده توسط پزشک است. در صورت امکان، از جایگزین‌های ایمن‌تر پیشنهاد شده استفاده کنید.' 
                                : 'Use of this medication requires a careful risk-benefit assessment by a healthcare provider. If possible, use the suggested safer alternatives.'
                            }
                        </p>
                    </div>
                </div>
            )}

            <div className="space-y-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <PregnancyIcon className="h-6 w-6 text-pink-500" />
                        {language === 'fa' ? 'بارداری' : 'Pregnancy'}
                    </h3>
                    <p className="mt-2 text-gray-600 whitespace-pre-wrap leading-relaxed">{t(pregnancyInfo.pregnancySummary)}</p>
                </div>
                <div className="border-t border-gray-200 pt-4 mt-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <PregnancyIcon className="h-6 w-6 text-cyan-500" />
                         {language === 'fa' ? 'شیردهی' : 'Lactation'}
                    </h3>
                    <p className="mt-2 text-gray-600 whitespace-pre-wrap leading-relaxed">{t(pregnancyInfo.lactationSummary)}</p>
                </div>

                {pregnancyInfo.safeAlternative && (pregnancyInfo.safeAlternative.fa.trim() || pregnancyInfo.safeAlternative.en.trim()) && (
                    <div className="border-t border-gray-200 pt-4 mt-4">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            <ShieldCheckIcon className="h-6 w-6 text-blue-500" />
                            {language === 'fa' ? 'جایگزین ایمن‌تر' : 'Safer Alternative'}
                        </h3>
                        <p className="mt-2 text-gray-600 whitespace-pre-wrap leading-relaxed">{t(pregnancyInfo.safeAlternative)}</p>
                    </div>
                )}

                 <div className="border-t border-gray-200 pt-4 mt-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <ReferenceIcon className="h-6 w-6 text-gray-500" />
                        {language === 'fa' ? 'منابع' : 'References'}
                    </h3>
                    <p className="mt-2 text-gray-600 whitespace-pre-wrap leading-relaxed">{pregnancyInfo.references}</p>
                </div>
            </div>
        </div>
    );
};
