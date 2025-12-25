
import React from 'react';

export const ShapesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="7" cy="7" r="3" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <path d="M4 14h6" />
        <path d="M7 11v6" />
        <path d="M14 14l6 6" />
        <path d="M14 20l6-6" />
    </svg>
);
