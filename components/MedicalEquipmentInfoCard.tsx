
import React from 'react';
import type { MedicalEquipmentInfo } from '../types';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { WarningIcon } from './icons/WarningIcon';

interface MedicalEquipmentInfoCardProps {
  info: MedicalEquipmentInfo;
  icon?: React.ReactNode;
}

const InfoSection: React.FC<{ title: string; content: string; icon: React.ReactNode; }> = ({ title, content, icon }) => (
    <div className="border-t border-gray-200 pt-4 mt-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            {icon}
            {title}
        </h3>
        <p className="mt-2 text-gray-600 whitespace-pre-wrap leading-relaxed">{content}</p>
    </div>
);


export const MedicalEquipmentInfoCard: React.FC<MedicalEquipmentInfoCardProps> = ({ info, icon }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 animate-fade-in relative">
      <div className="flex items-start gap-4 mb-4">
        {icon && <div className="flex-shrink-0">{icon}</div>}
        <h2 className="text-3xl font-bold text-blue-700">{info.equipmentName}</h2>
      </div>
      
      {info.imageBase64 && (
        <figure className="mb-6">
            <img 
                src={`data:image/png;base64,${info.imageBase64}`} 
                alt={info.equipmentName} 
                className="w-full h-48 object-contain rounded-lg bg-gray-100 p-2 border"
            />
            <figcaption className="mt-2 text-center text-sm text-gray-500 italic">
                {`نمایی از دستگاه ${info.equipmentName}`}
            </figcaption>
        </figure>
      )}

      <div className="space-y-4">
        <InfoSection 
            title="شرح دستگاه"
            content={info.description}
            icon={<ClipboardIcon className="h-6 w-6 text-gray-500" />}
        />
        <InfoSection 
            title="کاربرد اصلی"
            content={info.primaryUse} 
            icon={<ShieldCheckIcon className="h-6 w-6 text-green-500" />} 
        />
        <InfoSection 
            title="ویژگی‌ها و نکات کلیدی"
            content={info.keyFeatures} 
            icon={<WarningIcon className="h-6 w-6 text-yellow-500" />} 
        />
      </div>
    </div>
  );
};
