
import React from 'react';
import { HeartIcon } from '../components/icons/HeartIcon';
import { BrainIcon } from '../components/icons/BrainIcon';
import { DropletIcon } from '../components/icons/DropletIcon';
import { BandageIcon } from '../components/icons/BandageIcon';
import { StomachIcon } from '../components/icons/StomachIcon';
import { VirusIcon } from '../components/icons/VirusIcon';

export interface DrugCategory {
    name: string;
    icon: React.ReactNode;
    drugs: string[];
}

export const drugCategories: DrugCategory[] = [
    {
        name: 'داروهای قلبی-عروقی',
        // FIX: Replaced JSX with React.createElement to be compatible with a .ts file.
        icon: React.createElement(HeartIcon, { className: "h-8 w-8 text-red-500" }),
        drugs: ['Atorvastatin', 'Lisinopril', 'Amlodipine', 'Metoprolol', 'Carvedilol', 'Losartan', 'Furosemide', 'Spironolactone', 'Clopidogrel', 'Warfarin', 'Digoxin', 'Nitroglycerin']
    },
    {
        name: 'داروهای اعصاب (CNS)',
        // FIX: Replaced JSX with React.createElement to be compatible with a .ts file.
        icon: React.createElement(BrainIcon, { className: "h-8 w-8 text-purple-500" }),
        drugs: ['Alprazolam', 'Sertraline', 'Fluoxetine', 'Escitalopram', 'Gabapentin', 'Pregabalin', 'Phenytoin', 'Carbamazepine', 'Valproic Acid', 'Haloperidol', 'Risperidone', 'Olanzapine']
    },
     {
        name: 'داروهای غدد (دیابت)',
        // FIX: Replaced JSX with React.createElement to be compatible with a .ts file.
        icon: React.createElement(DropletIcon, { className: "h-8 w-8 text-blue-500" }),
        drugs: ['Metformin', 'Glibenclamide', 'Gliclazide', 'Pioglitazone', 'Insulin', 'Levothyroxine', 'Methimazole', 'Prednisone', 'Dexamethasone']
    },
    {
        name: 'ضد درد و التهاب',
        // FIX: Replaced JSX with React.createElement to be compatible with a .ts file.
        icon: React.createElement(BandageIcon, { className: "h-8 w-8 text-yellow-500" }),
        drugs: ['Ibuprofen', 'Naproxen', 'Diclofenac', 'Celecoxib', 'Acetaminophen', 'Aspirin', 'Tramadol', 'Codeine', 'Morphine', 'Indomethacin']
    },
    {
        name: 'داروهای گوارشی',
        // FIX: Replaced JSX with React.createElement to be compatible with a .ts file.
        icon: React.createElement(StomachIcon, { className: "h-8 w-8 text-green-500" }),
        drugs: ['Omeprazole', 'Pantoprazole', 'Esomeprazole', 'Ranitidine', 'Famotidine', 'Metoclopramide', 'Domperidone', 'Loperamide', 'Hyoscine', 'Mesalamine']
    },
    {
        name: 'داروهای ضد میکروبی',
        // FIX: Replaced JSX with React.createElement to be compatible with a .ts file.
        icon: React.createElement(VirusIcon, { className: "h-8 w-8 text-teal-500" }),
        drugs: ['Amoxicillin', 'Azithromycin', 'Ciprofloxacin', 'Doxycycline', 'Metronidazole', 'Cephalexin', 'Cefixime', 'Clindamycin', 'Vancomycin', 'Acyclovir', 'Fluconazole']
    },
];
