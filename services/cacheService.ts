
import type { DrugInfo } from '../types';

const CACHE_PREFIX = 'drug-info-';

const getCacheKey = (drugName: string): string => {
  return `${CACHE_PREFIX}${drugName.trim().toLowerCase()}`;
};

export const saveDrugInfo = (drugName: string, data: DrugInfo): void => {
  try {
    const key = getCacheKey(drugName);
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error("Failed to save drug info to cache:", error);
  }
};

export const getDrugInfo = (drugName: string): DrugInfo | null => {
  try {
    const key = getCacheKey(drugName);
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      return null;
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.error("Failed to retrieve drug info from cache:", error);
    return null;
  }
};
