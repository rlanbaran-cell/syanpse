
import type { SavedItem } from '../types';

const SAVED_ITEMS_KEY = 'pharma-consult-saved-items';

export const getSavedItems = (): SavedItem[] => {
    try {
        const itemsJson = localStorage.getItem(SAVED_ITEMS_KEY);
        return itemsJson ? JSON.parse(itemsJson) : [];
    } catch (error) {
        console.error("Failed to retrieve saved items:", error);
        return [];
    }
};

export const saveItem = (item: Omit<SavedItem, 'id'>): SavedItem => {
    const items = getSavedItems();
    // Using a more robust ID than just timestamp
    const newItem = { ...item, id: `${new Date().toISOString()}-${Math.random()}` } as SavedItem;
    const updatedItems = [newItem, ...items];
    localStorage.setItem(SAVED_ITEMS_KEY, JSON.stringify(updatedItems));
    return newItem;
};

export const removeItem = (id: string): void => {
    const items = getSavedItems();
    const updatedItems = items.filter(item => item.id !== id);
    localStorage.setItem(SAVED_ITEMS_KEY, JSON.stringify(updatedItems));
};

export const isDrugSaved = (drugName: string): boolean => {
    const items = getSavedItems();
    return items.some(item => item.type === 'drug' && item.title.trim().toLowerCase() === drugName.trim().toLowerCase());
};

export const isTherapySaved = (diseaseName: string): boolean => {
    const items = getSavedItems();
    return items.some(item => item.type === 'therapy' && item.title.trim().toLowerCase() === diseaseName.trim().toLowerCase());
};

export const isPregnancyCheckSaved = (drugName: string): boolean => {
    const items = getSavedItems();
    return items.some(item => item.type === 'pregnancy' && item.title.trim().toLowerCase() === drugName.trim().toLowerCase());
};

export const isSupplementSaved = (supplementName: string): boolean => {
    const items = getSavedItems();
    return items.some(item => item.type === 'supplement' && item.title.trim().toLowerCase() === supplementName.trim().toLowerCase());
};

export const isToxicologySaved = (substanceName: string): boolean => {
    const items = getSavedItems();
    const titleToFind = `مسمومیت با ${substanceName}`.trim().toLowerCase();
    return items.some(item => item.type === 'toxicology' && item.title.trim().toLowerCase() === titleToFind);
};

// FIX: Added missing isFormulaSaved function.
export const isFormulaSaved = (formulaName: string): boolean => {
    const items = getSavedItems();
    return items.some(item => item.type === 'formula' && item.title.trim().toLowerCase() === formulaName.trim().toLowerCase());
};

// FIX: Added missing isSpecialMedicationSaved function.
export const isSpecialMedicationSaved = (medicationName: string): boolean => {
    const items = getSavedItems();
    return items.some(item => item.type === 'special' && item.title.trim().toLowerCase() === medicationName.trim().toLowerCase());
};
