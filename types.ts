
export interface BilingualText {
  fa: string;
  en: string;
}

export interface DrugInfo {
  drugName: string;
  category: BilingualText;
  pharmacology: BilingualText;
  formsAndBrands: BilingualText;
  dosing: BilingualText;
  sideEffects: BilingualText;
  warnings: BilingualText;
  interactions: BilingualText;
  pregnancy: BilingualText; // General summary
  references: string;
}

export interface PregnancyInfo {
  drugName: string;
  safetyLevel: 'safe' | 'caution' | 'unsafe' | 'unknown';
  pregnancySummary: BilingualText;
  lactationSummary: BilingualText;
  safeAlternative?: BilingualText;
  references: string;
}

export interface PharmacotherapyInfo {
  diseaseName: string;
  overview: string;
  firstLineTherapy: string;
  secondLineTherapy: string;
  nonPharmacological: string;
  monitoring: string;
  references: string;
}

export interface MedicalEquipmentInfo {
  equipmentName: string;
  description: string;
  primaryUse: string;
  keyFeatures: string;
  imageBase64?: string;
}

export interface SupplementInfo {
    supplementName: string;
    brand?: string;
    description: BilingualText;
    ingredients: Array<{ name: string; amount: string; }>;
    usage: BilingualText;
    warnings: BilingualText;
}

export interface InteractionResultData {
    analysis: BilingualText;
    managementAdvice: BilingualText;
}

export interface ToxicologyInfo {
  substanceName: string;
  immediateActions: string;
  antidote: string;
  keySymptoms: string;
  supportiveCare: string;
  labTests: string;
  references: string;
}

// FIX: Add InfantFormulaInfo interface based on its usage in the data file.
export interface InfantFormulaInfo {
  brand: string;
  name: string;
  stage: string;
  ageRange: string;
  description: string;
  indications: string[];
  keyIngredients: string;
}

// FIX: Add SpecialMedicationInfo interface based on its usage in data and component files.
export interface SpecialMedicationInfo {
  name: string;
  brand: string;
  category: string;
  primaryUse: string;
  administrationNotes: string;
  storage: string;
  keyPoints: string;
  imageBase64?: string;
}


export interface SavedDrugItem {
  id: string;
  type: 'drug';
  title: string;
  data: DrugInfo;
}

export interface SavedInteractionItem {
  id: string;
  type: 'interaction';
  title: string;
  drugList: string[];
  data: InteractionResultData;
}

export interface SavedTherapyItem {
  id: string;
  type: 'therapy';
  title: string;
  data: PharmacotherapyInfo;
}

export interface SavedPregnancyItem {
  id: string;
  type: 'pregnancy';
  title: string;
  data: PregnancyInfo;
}

export interface SavedSupplementItem {
    id: string;
    type: 'supplement';
    title: string;
    data: SupplementInfo;
}

export interface SavedToxicologyItem {
  id: string;
  type: 'toxicology';
  title: string;
  data: ToxicologyInfo;
}

// FIX: Add SavedInfantFormulaItem interface.
export interface SavedInfantFormulaItem {
  id: string;
  type: 'formula';
  title: string;
  data: InfantFormulaInfo;
}

// FIX: Add SavedSpecialMedicationItem interface.
export interface SavedSpecialMedicationItem {
  id: string;
  type: 'special';
  title: string;
  data: SpecialMedicationInfo;
}


// FIX: Update SavedItem to be a union of all possible saved item types.
export type SavedItem = SavedDrugItem | SavedInteractionItem | SavedTherapyItem | SavedPregnancyItem | SavedSupplementItem | SavedToxicologyItem | SavedInfantFormulaItem | SavedSpecialMedicationItem;
