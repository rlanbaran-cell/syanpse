import React, { useState, useCallback } from 'react';
import { SearchBar } from './SearchBar';
import { PregnancyResultCard } from './PregnancyResultCard';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { AlertIcon } from './icons/AlertIcon';
import { fetchPregnancyInfo } from '../services/geminiService';
import type { PregnancyInfo } from '../types';
import { drugList } from '../data/drugList';
import { SearchSuggestions } from './SearchSuggestions';
import { PregnancyQuickAccess } from './PregnancyQuickAccess';
import { PregnancyCategoryView } from './PregnancyCategoryView';
import type { PregnancyDrugCategory } from '../data/pregnancyDrugCategories';

export const PregnancyCheck: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [pregnancyInfo, setPregnancyInfo] = useState<PregnancyInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<PregnancyDrugCategory | null>(null);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setError('لطفاً نام دارو را وارد کنید.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setPregnancyInfo(null);
    setSelectedCategory(null);

    try {
      const result = await fetchPregnancyInfo(query);
      setPregnancyInfo(result);
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

  const onSearchSubmit = () => {
    handleSearch(searchQuery);
  };
  
  const onSuggestionSelect = (suggestion: string) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };
  
  const handleCategorySelect = (category: PregnancyDrugCategory) => {
    setSelectedCategory(category);
  };

  const handleDrugSelectFromList = (drugName: string) => {
    setSearchQuery(drugName);
    handleSearch(drugName);
  };
  
  const handleBackFromCategory = () => {
      setSelectedCategory(null);
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-center mt-12">
          <SpinnerIcon className="h-12 w-12 text-blue-500" />
          <p className="mt-4 text-lg text-gray-600">در حال دریافت اطلاعات ایمنی دارو...</p>
        </div>
      );
    }

    if (error) {
      return (
        <>
            <div className="mt-8 bg-red-50 border-r-4 border-red-400 p-4 rounded-lg shadow-md flex items-start">
                <div className="pr-3">
                    <AlertIcon className="h-6 w-6 text-red-600" />
                </div>
                <div>
                    <p className="font-bold text-red-800">خطا</p>
                    <p className="text-red-700">{error}</p>
                </div>
            </div>
            <SearchSuggestions
                title="چند نمونه از داروهای رایج:"
                suggestions={["Acetaminophen", "Ibuprofen", "Amoxicillin", "Sertraline"]}
                onSuggestionClick={onSuggestionSelect}
            />
        </>
      );
    }

    if (pregnancyInfo) {
      return <PregnancyResultCard pregnancyInfo={pregnancyInfo} />;
    }

    if (selectedCategory) {
        return (
            <PregnancyCategoryView 
                category={selectedCategory}
                onDrugSelect={handleDrugSelectFromList}
                onBack={handleBackFromCategory}
            />
        );
    }

    return (
      <PregnancyQuickAccess onSelectCategory={handleCategorySelect} />
    );
  };

  return (
    <div>
      <SearchBar
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onSuggestionSelect={onSuggestionSelect}
        onSubmit={onSearchSubmit}
        isLoading={isLoading}
        suggestionList={drugList}
        placeholder="مثال: Ibuprofen"
      />
      <div className="mt-6">{renderContent()}</div>
    </div>
  );
};
