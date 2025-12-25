import React from 'react';

export type Language = 'fa' | 'en';

interface LanguageSwitcherProps {
    language: Language;
    setLanguage: (lang: Language) => void;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ language, setLanguage }) => (
    <div className="flex bg-gray-200 rounded-full p-1 text-sm">
        <button onClick={() => setLanguage('en')} className={`px-3 py-1 rounded-full ${language === 'en' ? 'bg-white text-gray-800 shadow' : 'text-gray-600'}`}>EN</button>
        <button onClick={() => setLanguage('fa')} className={`px-3 py-1 rounded-full ${language === 'fa' ? 'bg-white text-gray-800 shadow' : 'text-gray-600'}`}>FA</button>
    </div>
);
