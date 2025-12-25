
import React, { useState } from 'react';
import { ArrowRightIcon } from './icons/ArrowRightIcon';
import type { MedicalEquipmentInfo } from '../types';
import { medicalEquipmentCategories, MedicalEquipmentCategory } from '../data/medicalEquipmentData';
import { preloadedEquipmentInfo } from '../data/preloadedEquipmentInfo';
import { MedicalEquipmentInfoCard } from './MedicalEquipmentInfoCard';
import { AlertIcon } from './icons/AlertIcon';

type View = 'categories' | 'list' | 'details';

export const MedicalEquipment: React.FC = () => {
    const [view, setView] = useState<View>('categories');
    const [selectedCategory, setSelectedCategory] = useState<MedicalEquipmentCategory | null>(null);
    const [equipmentInfo, setEquipmentInfo] = useState<MedicalEquipmentInfo | null>(null);
    
    const handleCategorySelect = (category: MedicalEquipmentCategory) => {
        setSelectedCategory(category);
        setView('list');
    };

    const handleEquipmentSelect = (equipmentName: string) => {
        const info = preloadedEquipmentInfo.get(equipmentName);
        setEquipmentInfo(info || null);
        setView('details');
    };
    
    const handleBack = () => {
        if (view === 'details') {
            setView('list');
            setEquipmentInfo(null);
        } else if (view === 'list') {
            setView('categories');
            setSelectedCategory(null);
        }
    };

    const renderContent = () => {
        if (view === 'categories') {
            return (
                 <div className="mt-8 text-center animate-fade-in">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">دسته‌بندی تجهیزات پزشکی</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {medicalEquipmentCategories.map((cat) => (
                            <button
                                key={cat.name}
                                onClick={() => handleCategorySelect(cat)}
                                className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md border border-transparent hover:border-blue-500 hover:shadow-lg transition-all duration-200"
                            >
                                {cat.icon}
                                <span className="mt-2 font-semibold text-gray-800 text-sm text-center">{cat.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            );
        }

        if (view === 'list' && selectedCategory) {
            return (
                <div className="animate-fade-in">
                    <div className="mb-4">
                        <button onClick={handleBack} className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold">
                            <ArrowRightIcon className="h-5 w-5" />
                            <span>بازگشت به دسته‌بندی‌ها</span>
                        </button>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                            {selectedCategory.icon}
                            {selectedCategory.name}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {selectedCategory.items.map(item => (
                                <button
                                    key={item}
                                    onClick={() => handleEquipmentSelect(item)}
                                    className="w-full text-right p-3 bg-gray-50 rounded-md hover:bg-blue-100 hover:text-blue-700 transition-colors duration-150 font-medium"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }

        if (view === 'details') {
            if (equipmentInfo) {
                return (
                    <div className="animate-fade-in">
                         <div className="mb-4">
                            <button onClick={handleBack} className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold">
                                <ArrowRightIcon className="h-5 w-5" />
                                <span>بازگشت به لیست</span>
                            </button>
                        </div>
                        <MedicalEquipmentInfoCard info={equipmentInfo} icon={selectedCategory?.icon} />
                    </div>
                );
            }
            
            // Fallback if data is missing from the preloaded map
            return (
                 <div className="mt-8 bg-yellow-50 border-r-4 border-yellow-400 p-4 rounded-lg shadow-md flex items-start">
                    <div className="pr-3"><AlertIcon className="h-6 w-6 text-yellow-600" /></div>
                    <div>
                        <p className="font-bold text-yellow-800">اطلاعات یافت نشد</p>
                        <p className="text-yellow-700">اطلاعات این وسیله هنوز به اپلیکیشن اضافه نشده است.</p>
                        <button onClick={handleBack} className="mt-2 text-sm font-semibold text-yellow-800 hover:underline">بازگشت</button>
                    </div>
                </div>
            )
        }

        return null;
    };

    return <div>{renderContent()}</div>;
};
