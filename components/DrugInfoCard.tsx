import React, { useState } from 'react';
import type { DrugInfo, BilingualText } from '../types';
import { PillIcon } from './icons/PillIcon';
import { WarningIcon } from './icons/WarningIcon';
import { EffectsIcon } from './icons/EffectsIcon';
import { InteractionIcon } from './icons/InteractionIcon';
import { PregnancyIcon } from './icons/PregnancyIcon';
import { ReferenceIcon } from './icons/ReferenceIcon';
import { ShapesIcon } from './icons/ShapesIcon';
import { BookmarkIcon } from './icons/BookmarkIcon';
import { MoleculeIcon } from './icons/MoleculeIcon';
import * as savedItemsService from '../services/savedItemsService';
import { LanguageSwitcher, Language } from './LanguageSwitcher';

interface DrugInfoCardProps {
  drugInfo: DrugInfo;
  isFromCache?: boolean;
  showSaveButton?: boolean;
}

interface InfoSectionProps {
    title: string;
    content: string;
    icon: React.ReactNode;
    children?: React.ReactNode;
}

const InfoSection: React.FC<InfoSectionProps> = ({ title, content, icon, children }) => (
    <div className="border-t border-gray-200 pt-4 mt-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            {icon}
            {title}
        </h3>
        <p className="mt-2 text-gray-600 whitespace-pre-wrap leading-relaxed">{content}</p>
        {children}
    </div>
);

export const DrugInfoCard: React.FC<DrugInfoCardProps> = ({ drugInfo, isFromCache, showSaveButton = true }) => {
  const [isSaved, setIsSaved] = useState(() => savedItemsService.isDrugSaved(drugInfo.drugName));
  const [language, setLanguage] = useState<Language>('fa');

  const handleSave = () => {
    if (isSaved) return;
    savedItemsService.saveItem({
      type: 'drug',
      title: drugInfo.drugName,
      data: drugInfo
    });
    setIsSaved(true);
  };

  const t = (bilingualText: BilingualText) => bilingualText[language];
  const titles = {
      fa: {
          mechanism: "مکانیسم اثر",
          forms: "اشکال و نام‌های تجاری",
          dosing: "دوز مصرفی",
          sideEffects: "عوارض جانبی",
          warnings: "هشدارها و موارد منع مصرف",
          interactions: "تداخلات",
          pregnancy: "بارداری و شیردهی",
          references: "منابع",
          note: "توجه",
          interactionNote: "این خلاصه‌ای از تداخلات مهم است. همیشه از قضاوت بالینی و منابع جامع برای بررسی کامل تداخلات استفاده کنید.",
          cachedMessage: "این اطلاعات از حافظه محلی نمایش داده می‌شود و ممکن است قدیمی باشد."
      },
      en: {
          mechanism: "Mechanism of Action",
          forms: "Forms & Brand Names",
          dosing: "Dosing",
          sideEffects: "Side Effects",
          warnings: "Warnings & Contraindications",
          interactions: "Interactions",
          pregnancy: "Pregnancy & Lactation",
          references: "References",
          note: "Note",
          interactionNote: "This is a summary of significant interactions. Always use clinical judgment and consult comprehensive resources for a full interaction screen.",
          cachedMessage: "This information is displayed from local cache and may be outdated."
      }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 animate-fade-in">
       <div className="flex justify-between items-start mb-4">
            <div className="flex-grow">
                <h2 className="text-3xl font-bold text-blue-700 mb-1" dir="ltr">{drugInfo.drugName}</h2>
                <p className="text-md text-gray-500">{t(drugInfo.category)}</p>
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
        <InfoSection 
            title={titles[language].mechanism}
            content={t(drugInfo.pharmacology)}
            icon={<MoleculeIcon className="h-6 w-6 text-indigo-500" />}
        />
        <InfoSection 
            title={titles[language].forms}
            content={t(drugInfo.formsAndBrands)} 
            icon={<ShapesIcon className="h-6 w-6 text-teal-500" />} 
        />
        <InfoSection 
            title={titles[language].dosing}
            content={t(drugInfo.dosing)} 
            icon={<PillIcon className="h-6 w-6 text-blue-500" />} 
        />
        <InfoSection 
            title={titles[language].sideEffects}
            content={t(drugInfo.sideEffects)}
            icon={<EffectsIcon className="h-6 w-6 text-yellow-500" />} 
        />
        <InfoSection 
            title={titles[language].warnings}
            content={t(drugInfo.warnings)} 
            icon={<WarningIcon className="h-6 w-6 text-red-500" />}
        />
        <InfoSection 
            title={titles[language].interactions}
            content={t(drugInfo.interactions)} 
            icon={<InteractionIcon className="h-6 w-6 text-purple-500" />}
        >
            <div className="mt-3 bg-purple-50 border-r-4 border-purple-400 p-3 rounded-md">
                <p className="text-xs text-purple-800">
                    <strong>{titles[language].note}:</strong> {titles[language].interactionNote}
                </p>
            </div>
        </InfoSection>
        <InfoSection 
            title={titles[language].pregnancy}
            content={t(drugInfo.pregnancy)} 
            icon={<PregnancyIcon className="h-6 w-6 text-pink-500" />}
        />
        <InfoSection 
            title={titles[language].references} 
            content={drugInfo.references} 
            icon={<ReferenceIcon className="h-6 w-6 text-gray-500" />}
        />
      </div>

      {isFromCache && (
        <p className="text-center text-xs text-gray-500 mt-6 pt-4 border-t border-gray-200">
          {titles[language].cachedMessage}
        </p>
      )}
    </div>
  );
};

// Add a simple fade-in animation
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }
`;
document.head.appendChild(style);
