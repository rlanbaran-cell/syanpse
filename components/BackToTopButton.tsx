
import React, { useState, useEffect } from 'react';
import { ArrowUpIcon } from './icons/ArrowUpIcon';

export const BackToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <button
            type="button"
            onClick={scrollToTop}
            className={`fixed bottom-6 left-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}
            aria-label="بازگشت به بالا"
        >
            <ArrowUpIcon className="h-6 w-6" />
        </button>
    );
};
