import React, { useState, useCallback } from 'react';
import { SearchBar } from './SearchBar';
import { SupplementInfoCard } from './SupplementInfoCard';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { AlertIcon } from './icons/AlertIcon';
import { fetchSupplementInfo } from '../services/geminiService';
import type { SupplementInfo } from '../types';
import { supplementList } from '../data/supplementList';
import { SearchSuggestions } from './SearchSuggestions';

const SupplementSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [supplementInfo, setSupplementInfo] = useState<SupplementInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setError('لطفاً نام مکمل را وارد کنید.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSupplementInfo(null);
    window.scrollTo(0, 0); // Scroll to top for new search

    try {
      const result = await fetchSupplementInfo(query);
      setSupplementInfo(result);
      setSearchQuery(query);
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

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-center mt-12">
          <SpinnerIcon className="h-12 w-12 text-blue-500" />
          <p className="mt-4 text-lg text-gray-600">در حال دریافت اطلاعات مکمل...</p>
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
                title="چند نمونه از مکمل‌های رایج:"
                suggestions={["Whey Protein", "Vitamin D3", "Omega-3", "کراتین"]}
                onSuggestionClick={onSuggestionSelect}
            />
        </>
      );
    }

    if (supplementInfo) {
      return <SupplementInfoCard 
          supplementInfo={supplementInfo}
          onSuggestionClick={handleSearch}
      />;
    }

    return (
      <div className="text-center mt-12">
        <h2 className="text-2xl font-semibold text-gray-700">جستجوی هوشمند مکمل‌های غذایی و ورزشی</h2>
        <p className="mt-2 text-gray-500">نام مکمل یا برند را برای دریافت اطلاعات کامل (ترکیبات، روش مصرف و هشدارها) وارد کنید.</p>
      </div>
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
        suggestionList={supplementList}
        placeholder="مثال: Whey Protein"
      />
      <div className="mt-6">{renderContent()}</div>
    </div>
  );
};

export default SupplementSearch;
