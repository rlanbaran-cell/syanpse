import React, { useState, useCallback } from 'react';
import { TherapyGuideCard } from './TherapyGuideCard';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { AlertIcon } from './icons/AlertIcon';
import { fetchTherapyInfo } from '../services/geminiService';
import type { PharmacotherapyInfo } from '../types';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { SearchSuggestions } from './SearchSuggestions';

export const PharmacotherapyGuide: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [therapyInfo, setTherapyInfo] = useState<PharmacotherapyInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setError('لطفاً نام بیماری یا شرح علائم بیمار را وارد کنید.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setTherapyInfo(null);

    try {
      const result = await fetchTherapyInfo(searchQuery);
      setTherapyInfo(result);
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };
  
  const handleSuggestionClick = (suggestion: string) => {
      setQuery(suggestion);
      handleSearch(suggestion);
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-center mt-12">
          <SpinnerIcon className="h-12 w-12 text-blue-500" />
          <p className="mt-4 text-lg text-gray-600">در حال تحلیل و دریافت راهنمای درمانی...</p>
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
                title="چند نمونه از جستجوهای رایج:"
                suggestions={["فشار خون بالا", "دیابت نوع دو", "میگرن", "کم خونی فقر آهن"]}
                onSuggestionClick={handleSuggestionClick}
            />
        </>
      );
    }

    if (therapyInfo && therapyInfo.diseaseName === 'تشخیص نامشخص') {
        return (
         <>
           <div className="mt-8 bg-yellow-50 border-r-4 border-yellow-400 p-4 rounded-lg shadow-md flex items-start">
             <div className="pr-3"><AlertIcon className="h-6 w-6 text-yellow-600" /></div>
             <div>
                 <p className="font-bold text-yellow-800">اطلاعات ورودی کافی نیست</p>
                 <p className="text-yellow-700">{therapyInfo.overview}</p>
             </div>
           </div>
           <SearchSuggestions
             title="می‌توانید با جستجوی بیماری‌های زیر امتحان کنید:"
             suggestions={["Hypertension", "Type 2 Diabetes", "Asthma", "GERD"]}
             onSuggestionClick={handleSuggestionClick}
           />
         </>
        );
     }

    if (therapyInfo) {
      return <TherapyGuideCard therapyInfo={therapyInfo} />;
    }

    return (
      <>
        <div className="text-center mt-12">
            <h2 className="text-2xl font-semibold text-gray-700">راهنمای هوشمند فارماکوتراپی</h2>
            <p className="mt-2 text-gray-500">نام بیماری یا شرح علائم بیمار را برای دریافت راهنمای درمانی مبتنی بر شواهد وارد کنید.</p>
        </div>
        <SearchSuggestions
            title="یا با انتخاب علائم رایج شروع کنید:"
            suggestions={[
                "سردرد ضربان‌دار، تهوع، حساسیت به نور", // Migraine
                "تکرر ادرار، تشنگی زیاد، خستگی", // Diabetes
                "سوزش سر دل، بازگشت اسید", // GERD
                "سرفه خشک، تب، بدن درد" // Flu-like
            ]}
            onSuggestionClick={handleSuggestionClick}
        />
      </>
    );
  };

  return (
    <div>
        <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={isLoading}
                placeholder="نام بیماری یا علائم بیمار را وارد کنید (مثال: بیمار خانم ۵۴ ساله با شکایت از تکرر ادرار، تشنگی زیاد و خستگی)"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[100px] resize-y"
                rows={4}
            />
            <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200"
            >
                {isLoading ? <SpinnerIcon className="h-6 w-6" /> : <ClipboardIcon className="h-6 w-6" />}
                <span>دریافت راهنمای درمانی</span>
            </button>
        </form>
      <div className="mt-6">{renderContent()}</div>
    </div>
  );
};
