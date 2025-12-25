import React, { useState } from 'react';
import type { PharmacotherapyInfo, SavedTherapyItem } from '../types';
import * as savedItemsService from '../services/savedItemsService';
import { BookmarkIcon } from './icons/BookmarkIcon';
import { PillIcon } from './icons/PillIcon';
import { ReferenceIcon } from './icons/ReferenceIcon';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { HeartIcon } from './icons/HeartIcon';
import { MonitorIcon } from './icons/MonitorIcon';


interface TherapyGuideCardProps {
  therapyInfo: PharmacotherapyInfo;
  showSaveButton?: boolean;
}

interface InfoSectionProps {
    title: string;
    content: string;
    icon: React.ReactNode;
}

const InfoSection: React.FC<InfoSectionProps> = ({ title, content, icon }) => (
    <div className="border-t border-gray-200 pt-4 mt-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            {icon}
            {title}
        </h3>
        <p className="mt-2 text-gray-600 whitespace-pre-wrap leading-relaxed">{content}</p>
    </div>
);

export const TherapyGuideCard: React.FC<TherapyGuideCardProps> = ({ therapyInfo, showSaveButton = true }) => {
  const [isSaved, setIsSaved] = useState(() => savedItemsService.isTherapySaved(therapyInfo.diseaseName));

  const handleSave = () => {
    if (isSaved) return;
    const itemToSave: Omit<SavedTherapyItem, 'id'> = {
        type: 'therapy',
        title: therapyInfo.diseaseName,
        data: therapyInfo,
    };
    savedItemsService.saveItem(itemToSave);
    setIsSaved(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 animate-fade-in relative">
      {showSaveButton && (
        <button
          onClick={handleSave}
          disabled={isSaved}
          className={`absolute top-4 left-4 p-2 rounded-full transition-colors ${
            isSaved ? 'bg-green-100 text-green-600 cursor-default' : 'bg-gray-100 hover:bg-gray-200 text-gray-500'
          }`}
          aria-label={isSaved ? "ذخیره شده" : "ذخیره"}
        >
          <BookmarkIcon className="h-6 w-6" />
        </button>
      )}

      <h2 className="text-3xl font-bold text-green-700 mb-2">{therapyInfo.diseaseName}</h2>
      <InfoSection 
          title="خلاصه بیماری" 
          content={therapyInfo.overview} 
          icon={<ClipboardIcon className="h-6 w-6 text-gray-500" />} 
      />
      <InfoSection 
          title="خط اول درمان" 
          content={therapyInfo.firstLineTherapy} 
          icon={<PillIcon className="h-6 w-6 text-blue-500" />} 
      />
      <InfoSection 
          title="خط دوم و درمان‌های جایگزین" 
          content={therapyInfo.secondLineTherapy}
          icon={<PillIcon className="h-6 w-6 text-teal-500" />} 
      />
       <InfoSection 
          title="توصیه‌های غیردارویی" 
          content={therapyInfo.nonPharmacological}
          icon={<HeartIcon className="h-6 w-6 text-red-500" />} 
      />
      <InfoSection 
          title="پارامترهای پایش" 
          content={therapyInfo.monitoring} 
          icon={<MonitorIcon className="h-6 w-6 text-purple-500" />}
      />
      <InfoSection 
          title="منابع" 
          content={therapyInfo.references} 
          icon={<ReferenceIcon className="h-6 w-6 text-gray-500" />}
      />
    </div>
  );
};
