import React, { useState, useCallback } from 'react';
import { SearchBar } from './SearchBar';
import { ToxicologyInfoCard } from './ToxicologyInfoCard';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { AlertIcon } from './icons/AlertIcon';
import { fetchToxicologyInfo } from '../services/geminiService';
import type { ToxicologyInfo } from '../types';
import { toxicologyCategories, ToxicologyCategory } from '../data/toxicologyCategories';
import { ArrowRightIcon } from './icons/ArrowRightIcon';

export const Toxicology: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toxicologyInfo, setToxicologyInfo] = useState<ToxicologyInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ToxicologyCategory | null>(null);
  const [view, setView] = useState<'categories' | 'list' | 'details'>('categories');

  const allSubstances = toxicologyCategories.flatMap(c => c.substances);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setError('لطفاً نام ماده یا دارو را وارد کنید.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setToxicologyInfo(null);
    setSelectedCategory(null);
    setView('details');

    try {
      const result = await fetchToxicologyInfo(query);
      setToxicologyInfo(result);
    } catch (err) {
      const customError = !navigator.onLine
        ? 'شما آفلاین هستید. لطفاً اتصال اینترنت خود را بررسی کنید.'
        : 'خطایی در دریافت اطلاعات رخ داد. لطفاً دوباره تلاش کنید.';
      setError(customError);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const onSearchSubmit = () => handleSearch(searchQuery);
  const onSuggestionSelect = (suggestion: string) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };
  
  const handleCategorySelect = (category: ToxicologyCategory) => {
    setSelectedCategory(category);
    setView('list');
  };

  const handleSubstanceSelect = (substanceName: string) => {
    setSearchQuery(substanceName);
    handleSearch(substanceName);
  };

  const handleBack = () => {
    if (view === 'list') {
        setView('categories');
        setSelectedCategory(null);
    } else if (view === 'details') {
        setView('categories');
        setToxicologyInfo(null);
        setError(null);
        setSearchQuery('');
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-center mt-12">
          <SpinnerIcon className="h-12 w-12 text-blue-500" />
          <p className="mt-4 text-lg text-gray-600">در حال دریافت راهنمای مدیریت مسمومیت...</p>
        </div>
      );
    }

    if (error) {
      return (
        <>
            <div className="mb-4">
                <button onClick={handleBack} className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold">
                    <ArrowRightIcon className="h-5 w-5" />
                    <span>بازگشت</span>
                </button>
            </div>
            <div className="mt-8 bg-red-50 border-r-4 border-red-400 p-4 rounded-lg shadow-md flex items-start">
                <div className="pr-3"><AlertIcon className="h-6 w-6 text-red-600" /></div>
                <div>
                    <p className="font-bold text-red-800">خطا</p>
                    <p className="text-red-700">{error}</p>
                </div>
            </div>
        </>
      );
    }

    if (view === 'details' && toxicologyInfo) {
      return (
         <div className="animate-fade-in">
             <div className="mb-4">
                <button onClick={handleBack} className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold">
                    <ArrowRightIcon className="h-5 w-5" />
                    <span>بازگشت به دسته‌بندی‌ها</span>
                </button>
            </div>
            <ToxicologyInfoCard info={toxicologyInfo} />
        </div>
      )
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
                        {selectedCategory.substances.map(item => (
                            <button
                                key={item}
                                onClick={() => handleSubstanceSelect(item)}
                                className="w-full text-right p-3 bg-gray-50 rounded-md hover:bg-red-100 hover:text-red-700 transition-colors duration-150 font-medium"
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (view === 'categories') {
        return (
            <div className="mt-8 text-center animate-fade-in">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">دسترسی سریع به مسمومیت‌های شایع</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {toxicologyCategories.map((cat) => (
                        <button
                            key={cat.name}
                            onClick={() => handleCategorySelect(cat)}
                            className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md border border-transparent hover:border-red-500 hover:shadow-lg transition-all duration-200"
                        >
                            {cat.icon}
                            <span className="mt-2 font-semibold text-gray-800 text-sm text-center">{cat.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        );
    }
    
    return null;
  };

  return (
    <div>
      <SearchBar
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onSuggestionSelect={onSuggestionSelect}
        onSubmit={onSearchSubmit}
        isLoading={isLoading}
        suggestionList={allSubstances}
        placeholder="مثال: استامینوفن"
      />
      <div className="mt-6">{renderContent()}</div>
    </div>
  );
};
