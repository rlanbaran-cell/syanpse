
import React from 'react';
import { PillIcon } from '../components/icons/PillIcon';
import { BrainIcon } from '../components/icons/BrainIcon';
import { BiohazardIcon } from '../components/icons/BiohazardIcon';
import { HeartIcon } from '../components/icons/HeartIcon';
import { BandageIcon } from '../components/icons/BandageIcon';

export interface ToxicologyCategory {
    name: string;
    icon: React.ReactNode;
    substances: string[];
}

export const toxicologyCategories: ToxicologyCategory[] = [
    {
        name: 'مسکن‌ها',
        icon: React.createElement(BandageIcon, { className: "h-8 w-8 text-yellow-500" }),
        substances: ['Acetaminophen', 'Aspirin', 'Ibuprofen', 'Opioids']
    },
    {
        name: 'داروهای اعصاب',
        icon: React.createElement(BrainIcon, { className: "h-8 w-8 text-purple-500" }),
        substances: ['Benzodiazepines (e.g., Diazepam)', 'Tricyclic Antidepressants (TCAs)', 'SSRIs (e.g., Fluoxetine)', 'Phenobarbital']
    },
    {
        name: 'داروهای قلبی',
        icon: React.createElement(HeartIcon, { className: "h-8 w-8 text-red-500" }),
        substances: ['Digoxin', 'Beta-blockers (e.g., Propranolol)', 'Calcium Channel Blockers (e.g., Verapamil)']
    },
    {
        name: 'مواد مخدر و محرک',
        icon: React.createElement(PillIcon, { className: "h-8 w-8 text-blue-500" }),
        substances: ['Opioids (e.g., Morphine, Methadone)', 'Amphetamines', 'Cocaine', 'Ethanol']
    },
    {
        name: 'سموم و مواد شیمیایی',
        icon: React.createElement(BiohazardIcon, { className: "h-8 w-8 text-green-500" }),
        substances: ['Organophosphates', 'Cyanide', 'Carbon Monoxide', 'Methanol', 'Ethylene Glycol']
    },
    {
        name: 'فلزات سنگین',
        icon: React.createElement(BiohazardIcon, { className: "h-8 w-8 text-gray-600" }),
        substances: ['Lead (سرب)', 'Mercury (جیوه)', 'Arsenic (آرسنیک)']
    },
];
