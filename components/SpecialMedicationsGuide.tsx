
import React, { useState } from 'react';
import { ArrowRightIcon } from './icons/ArrowRightIcon';
import type { SpecialMedicationInfo } from '../types';
import { specialMedicationsCategories, SpecialMedicationCategory, SpecialMedicationSubCategory, preloadedSpecialMedications } from '../data/specialMedicationsData';
import { SpecialMedicationCard } from './SpecialMedicationCard';
import { AlertIcon } from './icons/AlertIcon';
import { SearchIcon } from './icons/SearchIcon';

type View = 'categories' | 'subCategories' | 'list' | 'details';

export const SpecialMedicationsGuide: React.FC = () => {
    const [view, setView] = useState<View>('categories');
    const [selectedCategory, setSelectedCategory] = useState<SpecialMedicationCategory | null>(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState<SpecialMedicationSubCategory | null>(null);
    const [medicationInfo, setMedicationInfo] = useState<SpecialMedicationInfo | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const allMedications = Array.from(preloadedSpecialMedications.values());

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        // When user types, reset the browsing view state but don't hide details yet
        if (view !== 'details') {
            setView('categories');
            setSelectedCategory(null);
            setSelectedSubCategory(null);
            setMedicationInfo(null);
        }
    };
    
    const handleCategorySelect = (category: SpecialMedicationCategory) => {
        setSelectedCategory(category);
        if (category.subCategories) {
            setView('subCategories');
        } else {
            setView('list');
        }
    };

    const handleSubCategorySelect = (subCategory: SpecialMedicationSubCategory) => {
        setSelectedSubCategory(subCategory);
        setView('list');
    };

    const handleMedicationSelect = (medicationName: string) => {
        const info = preloadedSpecialMedications.get(medicationName);
        setMedicationInfo(info || null);
        setView('details');
    };
    
    const handleBack = () => {
        window.scrollTo(0, 0);
        if (view === 'details') {
            setView('list');
            setMedicationInfo(null);
        } else if (view === 'list') {
            if (selectedSubCategory) {
                setView('subCategories');
                setSelectedSubCategory(null);
            } else {
                setView('categories');
                setSelectedCategory(null);
            }
        } else if (view === 'subCategories') {
            setView('categories');
            setSelectedCategory(null);
        }
    };

    const renderCategories = () => (
         <div className="mt-8 text-center animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-700 mb-1">راهنمای داروهای خاص</h2>
            <p className="text-gray-500 mb-4">برای مشاهده راهنمای مصرف، یک دسته‌بندی را انتخاب کنید یا نام دارو را جستجو کنید.</p>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                {specialMedicationsCategories.map((cat) => (
                    <button
                        key={cat.name}
                        onClick={() => handleCategorySelect(cat)}
                        className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md border border-transparent hover:border-purple-500 hover:shadow-lg transition-all duration-200"
                    >
                        {cat.icon}
                        <span className="mt-2 font-semibold text-gray-800 text-sm md:text-base text-center">{cat.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
    
    const renderContent = () => {
        if (view === 'categories') {
            return renderCategories();
        }
        
        if (view === 'subCategories' && selectedCategory?.subCategories) {
            return (
                <div className="animate-fade-in">
                    <div className="mb-4">
                        <button onClick={handleBack} className="flex items-center gap-2 text-gray-600 hover:text-purple-600 font-semibold">
                            <ArrowRightIcon className="h-5 w-5" />
                            <span>بازگشت</span>
                        </button>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                            {selectedCategory.icon}
                            {selectedCategory.name}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {selectedCategory.subCategories.map(subCat => (
                                <button
                                    key={subCat.name}
                                    onClick={() => handleSubCategorySelect(subCat)}
                                    className="w-full text-right p-3 bg-gray-50 rounded-md hover:bg-purple-100 hover:text-purple-700 transition-colors duration-150 font-medium"
                                >
                                    {subCat.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }

        if (view === 'list') {
            const items = selectedSubCategory?.items || selectedCategory?.items;
            const title = selectedSubCategory?.name || selectedCategory?.name;
            const icon = selectedCategory?.icon;
            
            if (!items || !title) return renderCategories();

            return (
                <div className="animate-fade-in">
                    <div className="mb-4">
                        <button onClick={handleBack} className="flex items-center gap-2 text-gray-600 hover:text-purple-600 font-semibold">
                            <ArrowRightIcon className="h-5 w-5" />
                            <span>بازگشت</span>
                        </button>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                            {icon}
                            {title}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {items.map(item => (
                                <button
                                    key={item}
                                    onClick={() => handleMedicationSelect(item)}
                                    className="w-full text-right p-3 bg-gray-50 rounded-md hover:bg-purple-100 hover:text-purple-700 transition-colors duration-150 font-medium"
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
            if (medicationInfo) {
                return (
                    <div className="animate-fade-in">
                         <div className="mb-4">
                            <button onClick={handleBack} className="flex items-center gap-2 text-gray-600 hover:text-purple-600 font-semibold">
                                <ArrowRightIcon className="h-5 w-5" />
                                <span>بازگشت به لیست</span>
                            </button>
                        </div>
                        <SpecialMedicationCard info={medicationInfo} />
                    </div>
                );
            }
            return (
                 <div className="mt-8 bg-yellow-50 border-r-4 border-yellow-400 p-4 rounded-lg shadow-md flex items-start">
                    <div className="pr-3"><AlertIcon className="h-6 w-6 text-yellow-600" /></div>
                    <div>
                        <p className="font-bold text-yellow-800">اطلاعات یافت نشد</p>
                        <p className="text-yellow-700">اطلاعات این محصول هنوز به اپلیکیشن اضافه نشده است.</p>
                        <button onClick={handleBack} className="mt-2 text-sm font-semibold text-yellow-800 hover:underline">بازگشت</button>
                    </div>
                </div>
            )
        }
        return null;
    };
    
    const renderSearchResults = () => {
        const filtered = allMedications.filter(med => 
            med.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
            med.brand.toLowerCase().includes(searchQuery.trim().toLowerCase())
        );

        if (view === 'details' && medicationInfo) {
            return (
                 <div className="animate-fade-in">
                     <div className="mb-4">
                        <button 
                            onClick={() => { setView('categories'); setMedicationInfo(null); }} 
                            className="flex items-center gap-2 text-gray-600 hover:text-purple-600 font-semibold"
                        >
                            <ArrowRightIcon className="h-5 w-5" />
                            <span>بازگشت به نتایج جستجو</span>
                        </button>
                    </div>
                    <SpecialMedicationCard info={medicationInfo} />
                </div>
            );
        }

        return (
            <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in">
                <h2 className="text-xl font-bold text-gray-800 mb-4">نتایج جستجو</h2>
                {filtered.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {filtered.map(med => (
                            <button
                                key={med.name}
                                onClick={() => handleMedicationSelect(med.name)}
                                className="w-full text-right p-3 bg-gray-50 rounded-md hover:bg-purple-100 hover:text-purple-700 transition-colors duration-150 font-medium"
                            >
                                {med.name}
                            </button>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center py-4">موردی برای "{searchQuery}" یافت نشد.</p>
                )}
            </div>
        );
    };

    return (
        <div>
            <div className="relative mb-6">
                <input
                    type="text"
                    placeholder="جستجو در داروهای خاص (مثال: سوماتروپین)"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-base"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <SearchIcon className="h-5 w-5" />
                </div>
            </div>
            {searchQuery.trim().length > 1 
                ? renderSearchResults()
                : renderContent()
            }
        </div>
    );
};
