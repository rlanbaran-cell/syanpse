
import React, { useState, useEffect } from 'react';
import * as savedItemsService from '../services/savedItemsService';
import type { SavedItem } from '../types';
import { DrugInfoCard } from './DrugInfoCard';
import { TherapyGuideCard } from './TherapyGuideCard';
import { PregnancyResultCard } from './PregnancyResultCard';
import { SupplementInfoCard } from './SupplementInfoCard';
import { ToxicologyInfoCard } from './ToxicologyInfoCard';
import { InteractionResult } from './InteractionResult';
import { TrashIcon } from './icons/TrashIcon';
import { InteractionIcon } from './icons/InteractionIcon';
import { PillIcon } from './icons/PillIcon';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { PregnancyIcon } from './icons/PregnancyIcon';
import { LeafIcon } from './icons/LeafIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { BiohazardIcon } from './icons/BiohazardIcon';
import { LanguageSwitcher, Language } from './LanguageSwitcher';


const SavedItems: React.FC = () => {
    const [items, setItems] = useState<SavedItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<SavedItem | null>(null);
    const [interactionLanguage, setInteractionLanguage] = useState<Language>('fa');

    useEffect(() => {
        const saved = savedItemsService.getSavedItems();
        setItems(saved);
        if (saved.length > 0) {
            setSelectedItem(saved[0]);
        }
    }, []);

    const handleRemove = (id: string, event: React.MouseEvent) => {
        event.stopPropagation();
        savedItemsService.removeItem(id);
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);
        if (selectedItem?.id === id) {
            setSelectedItem(updatedItems.length > 0 ? updatedItems[0] : null);
        }
    };

    if (items.length === 0) {
        return (
            <div className="text-center mt-12 max-w-3xl mx-auto">
                <h2 className="text-2xl font-semibold text-gray-700">موردی ذخیره نشده است</h2>
                <p className="mt-2 text-gray-500">شما می‌توانید اطلاعات دارویی، نتایج تداخلات، یا راهنماهای درمانی را برای دسترسی سریع‌تر در آینده، ذخیره کنید.</p>
            </div>
        );
    }
    
    const renderSelectedItem = () => {
        if (!selectedItem) {
             return (
                <div className="text-center mt-12 p-8 bg-gray-100 rounded-lg h-full flex flex-col justify-center">
                    <p className="text-gray-600 text-lg">برای مشاهده جزئیات، یک مورد را از لیست انتخاب کنید.</p>
                </div>
            );
        }
        
        switch (selectedItem.type) {
            case 'drug':
                return <DrugInfoCard drugInfo={selectedItem.data} showSaveButton={false} />;
            case 'interaction':
                return (
                     <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 animate-fade-in">
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-2xl font-bold text-blue-700">{selectedItem.title}</h2>
                            <div className="flex-shrink-0 mr-4">
                               <LanguageSwitcher language={interactionLanguage} setLanguage={setInteractionLanguage} />
                            </div>
                        </div>
                        <div className="mb-4">
                            <h3 className="font-semibold text-gray-600">داروهای بررسی شده:</h3>
                            <ul className="flex flex-wrap gap-2 mt-2">
                               {selectedItem.drugList.map(drug => (
                                   <li key={drug} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
                                       {drug}
                                   </li>
                               ))}
                            </ul>
                        </div>
                        <div className="border-t border-gray-200 mt-4 pt-4">
                            <div className="bg-blue-50 border-r-4 border-blue-400 p-4 rounded-lg mb-6">
                                <h4 className="font-bold text-blue-800 flex items-center gap-2">
                                    <ShieldCheckIcon className="h-5 w-5" />
                                    {interactionLanguage === 'fa' ? 'توصیه مدیریتی' : 'Management Advice'}
                                </h4>
                                <p className="text-blue-700 mt-1 text-sm font-semibold">{selectedItem.data.managementAdvice[interactionLanguage]}</p>
                            </div>
                            <InteractionResult data={selectedItem.data.analysis} language={interactionLanguage} />
                        </div>
                    </div>
                );
            case 'therapy':
                return <TherapyGuideCard therapyInfo={selectedItem.data} showSaveButton={false} />;
            case 'pregnancy':
                return <PregnancyResultCard pregnancyInfo={selectedItem.data} showSaveButton={false} />;
            case 'supplement':
                return <SupplementInfoCard supplementInfo={selectedItem.data} showSaveButton={false} />;
            case 'toxicology':
                return <ToxicologyInfoCard info={selectedItem.data} showSaveButton={false} />;
            default:
                return null;
        }
    }

    const renderIcon = (item: SavedItem) => {
        switch (item.type) {
            case 'drug': return <PillIcon className="h-5 w-5 text-blue-500 flex-shrink-0" />;
            case 'interaction': return <InteractionIcon className="h-5 w-5 text-purple-500 flex-shrink-0" />;
            case 'therapy': return <ClipboardIcon className="h-5 w-5 text-green-500 flex-shrink-0" />;
            case 'pregnancy': return <PregnancyIcon className="h-5 w-5 text-pink-500 flex-shrink-0" />;
            case 'supplement': return <LeafIcon className="h-5 w-5 text-emerald-500 flex-shrink-0" />;
            case 'toxicology': return <BiohazardIcon className="h-5 w-5 text-red-500 flex-shrink-0" />;
            default: return null;
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 bg-white p-4 rounded-lg shadow-sm border h-fit">
                <h3 className="font-bold text-lg mb-3 px-2">لیست موارد ذخیره شده</h3>
                <ul className="space-y-2 max-h-[60vh] overflow-y-auto">
                    {items.map(item => (
                        <li key={item.id}>
                           <button 
                                onClick={() => setSelectedItem(item)}
                                className={`w-full flex justify-between items-center p-3 rounded-lg text-right transition-colors group ${selectedItem?.id === item.id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                           >
                                <div className="flex items-center gap-3 overflow-hidden">
                                   {renderIcon(item)}
                                   <span className="font-semibold text-gray-800 truncate">{item.title}</span>
                                </div>
                                <button
                                    onClick={(e) => handleRemove(item.id, e)}
                                    className="p-1 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                    aria-label="حذف"
                                >
                                    <TrashIcon className="h-5 w-5" />
                                </button>
                           </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="md:col-span-2">
                {renderSelectedItem()}
            </div>
        </div>
    );
};

export default SavedItems;
