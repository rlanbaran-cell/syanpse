
import React from 'react';
import { PillIcon } from '../components/icons/PillIcon';
import { VirusIcon } from '../components/icons/VirusIcon';
import { BrainIcon } from '../components/icons/BrainIcon';
import { StomachIcon } from '../components/icons/StomachIcon';
import { EffectsIcon } from '../components/icons/EffectsIcon';
import { HeartIcon } from '../components/icons/HeartIcon';

export interface PregnancyDrugCategory {
    name: string;
    icon: React.ReactNode;
    drugs: string[];
}

export const pregnancyDrugCategories: PregnancyDrugCategory[] = [
    {
        name: 'ضد درد و تب',
        icon: React.createElement(PillIcon, { className: "h-8 w-8 text-yellow-500" }),
        drugs: ['Acetaminophen', 'Ibuprofen', 'Naproxen', 'Aspirin']
    },
    {
        name: 'آنتی‌بیوتیک‌ها',
        icon: React.createElement(VirusIcon, { className: "h-8 w-8 text-teal-500" }),
        drugs: ['Amoxicillin', 'Azithromycin', 'Cephalexin', 'Nitrofurantoin', 'Clindamycin']
    },
    {
        name: 'ضد افسردگی (SSRIs)',
        icon: React.createElement(BrainIcon, { className: "h-8 w-8 text-purple-500" }),
        drugs: ['Sertraline', 'Fluoxetine', 'Citalopram', 'Escitalopram']
    },
    {
        name: 'گوارش و ضد تهوع',
        icon: React.createElement(StomachIcon, { className: "h-8 w-8 text-green-500" }),
        drugs: ['Ondansetron', 'Metoclopramide', 'Famotidine', 'Omeprazole', 'Dimenhydrinate']
    },
    {
        name: 'ضد حساسیت',
        icon: React.createElement(EffectsIcon, { className: "h-8 w-8 text-indigo-500" }),
        drugs: ['Loratadine', 'Cetirizine', 'Diphenhydramine', 'Fexofenadine']
    },
    {
        name: 'فشار خون',
        icon: React.createElement(HeartIcon, { className: "h-8 w-8 text-red-500" }),
        drugs: ['Labetalol', 'Nifedipine', 'Methyldopa', 'Hydralazine']
    }
];
