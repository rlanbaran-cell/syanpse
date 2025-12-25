const HISTORY_KEY = 'pharma-consult-search-history';
const MAX_HISTORY_ITEMS = 15;

/**
 * Retrieves the search history from local storage.
 * @returns An array of drug names.
 */
export const getHistory = (): string[] => {
    try {
        const historyJson = localStorage.getItem(HISTORY_KEY);
        return historyJson ? JSON.parse(historyJson) : [];
    } catch (error) {
        console.error("Failed to retrieve search history:", error);
        return [];
    }
};

/**
 * Adds a new drug name to the search history.
 * It avoids duplicates by moving any existing entry to the top
 * and limits the total number of history items.
 * @param drugName The drug name to add to the history.
 */
export const addToHistory = (drugName: string): void => {
    try {
        const normalizedDrugName = drugName.trim();
        if (!normalizedDrugName) return;

        let history = getHistory();
        
        // Remove existing instance to avoid duplicates and move it to the top.
        history = history.filter(item => item.toLowerCase() !== normalizedDrugName.toLowerCase());
        
        // Add the new item to the beginning of the array.
        history.unshift(normalizedDrugName);
        
        // Limit the history to the max number of items.
        if (history.length > MAX_HISTORY_ITEMS) {
            history = history.slice(0, MAX_HISTORY_ITEMS);
        }
        
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (error) {
        console.error("Failed to add to search history:", error);
    }
};

/**
 * Clears the entire search history from local storage.
 */
export const clearHistory = (): void => {
    try {
        localStorage.removeItem(HISTORY_KEY);
    } catch (error) {
        console.error("Failed to clear search history:", error);
    }
};
