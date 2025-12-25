
import React from 'react';

export const VirusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="8"></circle>
        <path d="M9.09 9.09l5.82 5.82"></path>
        <path d="M14.91 9.09l-5.82 5.82"></path>
        <path d="M12 7v-4"></path>
        <path d="M12 21v-4"></path>
        <path d="M17 12h4"></path>
        <path d="M3 12h4"></path>
        <path d="m16.24 7.76.71-.71"></path>
        <path d="m7.05 16.95-.71.71"></path>
        <path d="m16.95 16.95.71.71"></path>
        <path d="m7.76 7.76-.71-.71"></path>
    </svg>
);
