import React, { useState, useCallback, useEffect } from 'react';
import { SearchBar } from './SearchBar';
import { DrugInfoCard } from './DrugInfoCard';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { AlertIcon } from './icons/AlertIcon';
import { fetchDrugInfo } from '../services/geminiService';
import { saveDrugInfo, getDrugInfo } from '../services/cacheService';
import * as historyService from '../services/historyService';
import type { DrugInfo } from '../types';
import { QuickAccessCategories } from './QuickAccessCategories';
import { DrugCategoryView } from './DrugCategoryView';
import type { DrugCategory } from '../data/drugCategories';
import { SearchSuggestions } from './SearchSuggestions';
import { SearchHistory } from './SearchHistory';

const SingleDrugSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [drugInfo, setDrugInfo] = useState<DrugInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isFromCache, setIsFromCache] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<DrugCategory | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [suggestionList, setSuggestionList] = useState<string[]>([]);

  useEffect(() => {
    setHistory(historyService.getHistory());
    import('../data/drugList').then(module => {
        setSuggestionList(module.drugList);
    });
  }, []);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setError('لطفاً نام دارو را وارد کنید.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setIsFromCache(false);
    setDrugInfo(null);
    setSelectedCategory(null);

    const cachedData = getDrugInfo(query);
    if (cachedData) {
      setDrugInfo(cachedData);
      setIsFromCache(true);
    }

    try {
      const result = await fetchDrugInfo(query);
      setDrugInfo(result);
      historyService.addToHistory(result.drugName);
      setHistory(historyService.getHistory());
      saveDrugInfo(query, result);
      setIsFromCache(false); 
    } catch (err) {
      if (!cachedData) {
        const customError = !navigator.onLine
          ? 'شما آفلاین هستید و اطلاعات این دارو در حافظه محلی موجود نیست.'
          : 'خطایی در دریافت اطلاعات رخ داد. لطفاً دوباره تلاش کنید.';
        setError(customError);
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const onSuggestionSelect = (drug: string) => {
    setSearchQuery(drug);
    handleSearch(drug);
  };
  
  const onSearchSubmit = () => {
    handleSearch(searchQuery);
  }
  
  const handleCategorySelect = (category: DrugCategory) => {
    setSelectedCategory(category);
  }

  const handleDrugSelectFromList = (drugName: string) => {
    setSearchQuery(drugName);
    handleSearch(drugName);
  };
  
  const handleClearHistory = () => {
    historyService.clearHistory();
    setHistory([]);
  };

  const renderContent = () => {
    if (isLoading && !drugInfo) {
      return (
        <div className="flex flex-col items-center justify-center text-center mt-12">
          <SpinnerIcon className="h-12 w-12 text-blue-500" />
          <p className="mt-4 text-lg text-gray-600">در حال دریافت اطلاعات...</p>
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
            suggestions={["Atorvastatin", "Ibuprofen", "Amoxicillin", "Metformin"]}
            onSuggestionClick={onSuggestionSelect}
          />
        </>
      );
    }

    if (drugInfo) {
      return <DrugInfoCard drugInfo={drugInfo} isFromCache={isFromCache} />;
    }
    
    if (selectedCategory) {
      return (
        <DrugCategoryView 
          category={selectedCategory}
          onDrugSelect={handleDrugSelectFromList}
          onBack={() => setSelectedCategory(null)}
        />
      );
    }

    if (history.length > 0) {
        return (
            <>
                <SearchHistory 
                    history={history} 
                    onHistoryClick={onSuggestionSelect}
                    onClearHistory={handleClearHistory}
                />
                <div className="mt-6 border-t pt-6">
                    <QuickAccessCategories onSelectCategory={handleCategorySelect} />
                </div>
            </>
        );
    }

    return (
        <QuickAccessCategories onSelectCategory={handleCategorySelect} />
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
        suggestionList={suggestionList}
        placeholder="مثال: آتورواستاتین"
      />
      <div className="mt-6">{renderContent()}</div>
    </div>
  );
};

export default SingleDrugSearch;
