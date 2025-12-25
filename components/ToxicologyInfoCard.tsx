import React, { useState } from 'react';
import type { ToxicologyInfo, SavedToxicologyItem } from '../types';
import * as savedItemsService from '../services/savedItemsService';
import { BookmarkIcon } from './icons/BookmarkIcon';
import { WarningIcon } from './icons/WarningIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { PillIcon } from './icons/PillIcon';
import { HeartIcon } from './icons/HeartIcon';
import { ReferenceIcon } from './icons/ReferenceIcon';
import { MicroscopeIcon } from './icons/MicroscopeIcon';

interface ToxicologyInfoCardProps {
  info: ToxicologyInfo;
  showSaveButton?: boolean;
}

const InfoSection: React.FC<{ title: string; content: string; icon: React.ReactNode; className?: string }> = ({ title, content, icon, className = '' }) => (
    <div className={`border-t border-gray-200 pt-4 mt-4 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            {icon}
            {title}
        </h3>
        <p className="mt-2 text-gray-600 whitespace-pre-wrap leading-relaxed">{content}</p>
    </div>
);

export const ToxicologyInfoCard: React.FC<ToxicologyInfoCardProps> = ({ info, showSaveButton = true }) => {
  const [isSaved, setIsSaved] = useState(() => savedItemsService.isToxicologySaved(info.substanceName));

  const handleSave = () => {
    if (isSaved) return;
    const itemToSave: Omit<SavedToxicologyItem, 'id'> = {
        type: 'toxicology',
        title: `مسمومیت با ${info.substanceName}`,
        data: info,
    };
    savedItemsService.saveItem(itemToSave);
    setIsSaved(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 animate-fade-in border-t-8 border-red-600">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h2 className="text-3xl font-bold text-red-700">{`مسمومیت با ${info.substanceName}`}</h2>
                <p className="text-red-500 font-semibold mt-1">راهنمای مدیریت اورژانس</p>
            </div>
             {showSaveButton && (
                <button
                    onClick={handleSave}
                    disabled={isSaved}
                    className={`p-2 rounded-full transition-colors flex-shrink-0 mr-4 ${
                        isSaved ? 'bg-green-100 text-green-600 cursor-default' : 'bg-gray-100 hover:bg-gray-200 text-gray-500'
                    }`}
                    aria-label={isSaved ? "ذخیره شده" : "ذخیره"}
                >
                    <BookmarkIcon className="h-6 w-6" />
                </button>
            )}
        </div>
        
        <div className="mt-4 bg-red-50 border-r-4 border-red-500 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-red-800 flex items-center gap-2">
                <WarningIcon className="h-6 w-6" />
                اقدامات فوری و حیاتی
            </h3>
            <p className="mt-2 text-red-700 whitespace-pre-wrap leading-relaxed font-semibold">{info.immediateActions}</p>
        </div>

        <InfoSection 
            title="پادزهر (آنتی‌دوت)"
            content={info.antidote}
            icon={<ShieldCheckIcon className="h-6 w-6 text-green-600" />}
        />
        <InfoSection 
            title="علائم و نشانه‌های کلیدی"
            content={info.keySymptoms}
            icon={<HeartIcon className="h-6 w-6 text-pink-600" />}
        />
        <InfoSection 
            title="درمان‌های حمایتی"
            content={info.supportiveCare}
            icon={<PillIcon className="h-6 w-6 text-blue-500" />}
        />
        <InfoSection 
            title="بررسی‌های آزمایشگاهی لازم"
            content={info.labTests}
            icon={<MicroscopeIcon className="h-6 w-6 text-teal-500" />}
        />
        <InfoSection 
            title="منابع"
            content={info.references}
            icon={<ReferenceIcon className="h-6 w-6 text-gray-500" />}
        />

        <div className="mt-6 p-3 bg-gray-100 rounded-lg text-center text-xs text-gray-600">
            <strong>سلب مسئولیت:</strong> این اطلاعات صرفاً جنبه آموزشی برای کادر درمان داشته و جایگزین پروتکل‌های بالینی، قضاوت پزشکی یا تماس با مرکز اطلاع‌رسانی داروها و سموم (شماره: ۱۴۹۰) نیست.
        </div>
    </div>
  );
};
