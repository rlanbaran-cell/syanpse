import React from 'react';
import type { BilingualText } from '../types';

interface InteractionResultProps {
    data: BilingualText;
    language: 'fa' | 'en';
}

export const InteractionResult: React.FC<InteractionResultProps> = ({ data, language }) => {
    return (
        <div>
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{data[language]}</p>
        </div>
    );
};
