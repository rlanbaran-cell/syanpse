import { GoogleGenAI, Type } from "@google/genai";
import type { DrugInfo, PharmacotherapyInfo, PregnancyInfo, SupplementInfo, InteractionResultData, ToxicologyInfo } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const bilingualTextSchema = {
    type: Type.OBJECT,
    properties: {
        fa: { type: Type.STRING },
        en: { type: Type.STRING }
    },
    required: ['fa', 'en']
};

const interactionResultSchema = {
    type: Type.OBJECT,
    properties: {
        analysis: { 
            type: Type.OBJECT,
            properties: {
                fa: { type: Type.STRING, description: 'تحلیل کامل تداخل به زبان فارسی.' },
                en: { type: Type.STRING, description: 'The detailed analysis of the interaction in English.' }
            },
            required: ['fa', 'en']
        },
        managementAdvice: {
            type: Type.OBJECT,
            properties: {
                fa: { type: Type.STRING, description: 'توصیه مدیریتی کوتاه و کاربردی به زبان فارسی (مثال: "بیمار به دقت پایش شود"، "دوز دارو تنظیم شود").' },
                en: { type: Type.STRING, description: 'Brief, actionable advice for managing the interaction in English (e.g., "Monitor patient closely", "Consider alternative therapy", "Adjust dosage").' }
            },
            required: ['fa', 'en']
        }
    },
    required: ['analysis', 'managementAdvice'],
};

const drugInfoSchema = {
  type: Type.OBJECT,
  properties: {
    drugName: { type: Type.STRING, description: 'The generic name of the drug in English.' },
    category: { ...bilingualTextSchema, description: 'The pharmacological category in both FA and EN.' },
    pharmacology: { ...bilingualTextSchema, description: 'The mechanism of action and pharmacology in both FA and EN.' },
    formsAndBrands: { ...bilingualTextSchema, description: 'Common dosage forms and brand names in both FA and EN. e.g., "Tablet: 10mg, 20mg (Lipitor)\\nقرص: ۱۰، ۲۰ میلی‌گرم (لیپیتور)"' },
    dosing: { ...bilingualTextSchema, description: 'Dosing information for adults and children in both FA and EN.' },
    sideEffects: { ...bilingualTextSchema, description: 'Common side effects in both FA and EN.' },
    warnings: { ...bilingualTextSchema, description: 'Serious warnings and contraindications in both FA and EN.' },
    interactions: { ...bilingualTextSchema, description: 'A summary of significant interactions in both FA and EN.' },
    pregnancy: { ...bilingualTextSchema, description: 'A general summary of use during pregnancy and lactation in both FA and EN.' },
    references: { type: Type.STRING, description: 'Sources and references used, like Martindale, UpToDate, etc.' },
  },
  required: ['drugName', 'category', 'pharmacology', 'formsAndBrands', 'dosing', 'sideEffects', 'warnings', 'interactions', 'pregnancy', 'references'],
};


const pharmacotherapySchema = {
    type: Type.OBJECT,
    properties: {
        diseaseName: { type: Type.STRING, description: 'نام بیماری تشخیص داده شده بر اساس ورودی کاربر به فارسی.' },
        overview: { type: Type.STRING, description: 'خلاصه‌ای از پاتوفیزیولوژی و علائم کلیدی بیماری به فارسی.' },
        firstLineTherapy: { type: Type.STRING, description: 'توصیه‌های خط اول درمان شامل نام دارو، دوزهای رایج و نکات مهم به فارسی.' },
        secondLineTherapy: { type: Type.STRING, description: 'خط دوم و درمان‌های جایگزین در صورت شکست خط اول به فارسی.' },
        nonPharmacological: { type: Type.STRING, description: 'توصیه‌های غیردارویی و سبک زندگی به فارسی.' },
        monitoring: { type: Type.STRING, description: 'پارامترهای کلیدی برای پایش و ارزیابی اثربخشی درمان و عوارض جانبی به فارسی.' },
        references: { type: Type.STRING, description: 'منابع اصلی استفاده شده مانند UpToDate, Harrison\'s.' },
    },
    required: ['diseaseName', 'overview', 'firstLineTherapy', 'secondLineTherapy', 'nonPharmacological', 'monitoring', 'references'],
};

const pregnancyInfoSchema = {
    type: Type.OBJECT,
    properties: {
        drugName: { type: Type.STRING, description: 'The generic name of the drug in English.' },
        safetyLevel: {
            type: Type.STRING,
            enum: ['safe', 'caution', 'unsafe', 'unknown'],
            description: 'A single keyword representing the general safety level.'
        },
        pregnancySummary: { ...bilingualTextSchema, description: 'A concise summary for pregnancy in both FA and EN.' },
        lactationSummary: { ...bilingualTextSchema, description: 'A concise summary for lactation in both FA and EN.' },
        safeAlternative: { ...bilingualTextSchema, description: 'If unsafe, suggest a safer alternative drug in both FA and EN. Omit if not applicable.' },
        references: { type: Type.STRING, description: 'Key references like Briggs, Hale\'s Medications & Mothers\' Milk, etc.' },
    },
    required: ['drugName', 'safetyLevel', 'pregnancySummary', 'lactationSummary', 'references'],
};

const supplementInfoSchema = {
    type: Type.OBJECT,
    properties: {
        supplementName: { type: Type.STRING, description: 'The common name of the supplement.' },
        brand: { type: Type.STRING, description: 'The brand name of the supplement, if specified.' },
        description: { ...bilingualTextSchema, description: 'A general description in both FA and EN.' },
        ingredients: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    amount: { type: Type.STRING }
                },
                required: ['name', 'amount']
            }
        },
        usage: { ...bilingualTextSchema, description: 'Recommended usage instructions in both FA and EN.' },
        warnings: { ...bilingualTextSchema, description: 'Any warnings or precautions in both FA and EN.' }
    },
    required: ['supplementName', 'description', 'ingredients', 'usage', 'warnings']
};

const relatedSupplementsSchema = {
    type: Type.OBJECT,
    properties: {
        suggestions: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
        }
    },
    required: ['suggestions']
};

const toxicologyInfoSchema = {
  type: Type.OBJECT,
  properties: {
    substanceName: { type: Type.STRING, description: 'نام ماده سمی به فارسی.' },
    immediateActions: { type: Type.STRING, description: 'اقدامات حیاتی و فوری (مثل ABC، رفع آلودگی) به فارسی. این مهم‌ترین بخش است.' },
    antidote: { type: Type.STRING, description: 'نام پادزهر، دوز و نحوه مصرف آن به فارسی. اگر پادزهر خاصی وجود ندارد، "وجود ندارد" ذکر شود.' },
    keySymptoms: { type: Type.STRING, description: 'علائم و نشانه‌های کلیدی (توکسیدروم) برای تشخیص به فارسی.' },
    supportiveCare: { type: Type.STRING, description: 'درمان‌های حمایتی مانند مایعات وریدی، زغال فعال و مدیریت علائم به فارسی.' },
    labTests: { type: Type.STRING, description: 'آزمایش‌های ضروری (مانند سطح دارو، الکترولیت‌ها، ABG) به فارسی.' },
    references: { type: Type.STRING, description: 'منابع کلیدی، در درجه اول Goldfrank\'s Toxicology.' },
  },
  required: ['substanceName', 'immediateActions', 'antidote', 'keySymptoms', 'supportiveCare', 'labTests', 'references'],
};


export const fetchDrugInfo = async (drugName: string): Promise<DrugInfo> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide comprehensive, reference-based drug information for the drug "${drugName}".`,
      config: {
        systemInstruction: `You are an expert clinical pharmacist assistant. Provide accurate, reference-based drug information for professional use in a pharmacy, in both Persian (fa) and English (en). The user might search by brand name, generic name, or include dosage; your response should always be for the core generic drug. Respond only with the requested JSON object according to the schema.`,
        responseMimeType: "application/json",
        responseSchema: drugInfoSchema,
      },
    });

    const responseText = response.text;
    if (!responseText) throw new Error("No response text from API.");
    return JSON.parse(responseText.trim());
  } catch (error) {
    console.error("Error fetching drug information from Gemini API:", error);
    throw new Error("Failed to parse drug information from the API.");
  }
};


export const fetchInteractionInfo = async (drugs: string[]): Promise<InteractionResultData> => {
    if (drugs.length < 2) throw new Error("At least two drugs are required for interaction check.");

    const drugList = drugs.join(', ');
    const prompt = `Analyze potential interactions between the following drugs: ${drugList}.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: {
                systemInstruction: `You are an expert clinical pharmacist specializing in drug-drug interactions. Your analysis must be accurate, concise, and based on standard references like UpToDate. Provide a structured analysis in both Persian (fa) and English (en). Also, provide a separate, very brief, actionable management advice summary in both languages. The entire response MUST be within a single JSON object according to the schema.`,
                responseMimeType: "application/json",
                responseSchema: interactionResultSchema,
            },
        });
        
        const responseText = response.text;
        if (!responseText) throw new Error("No response text from API for interaction check.");
        return JSON.parse(responseText.trim());
    } catch (error) {
        console.error("Error fetching drug interaction info from Gemini API:", error);
        throw new Error("Failed to fetch drug interaction information.");
    }
};


export const fetchTherapyInfo = async (userInput: string): Promise<PharmacotherapyInfo> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Based on the following input (which could be a disease name or patient symptoms in Persian), provide a practical pharmacotherapy guide in Persian: "${userInput}"`,
            config: {
                systemInstruction: `You are a clinical pharmacotherapy specialist AI. Analyze user input (disease name or symptoms) in Persian and provide an evidence-based pharmacotherapy guide in Persian, based on sources like UpToDate and Harrison's. The response must be a JSON object structured according to the schema. If the input is too vague, set 'diseaseName' to 'تشخیص نامشخص' and explain what information is needed in the 'overview' field.`,
                responseMimeType: "application/json",
                responseSchema: pharmacotherapySchema,
            },
        });

        const responseText = response.text;
        if (!responseText) throw new Error("No response text from API for therapy guide.");
        return JSON.parse(responseText.trim());
    } catch (error) {
        console.error("Error fetching therapy guide from Gemini API:", error);
        throw new Error("Failed to parse therapy guide from the API.");
    }
};

export const fetchPregnancyInfo = async (drugName: string): Promise<PregnancyInfo> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Provide a concise safety summary for the drug "${drugName}" for use during pregnancy and lactation.`,
            config: {
                systemInstruction: `You are a clinical pharmacist specializing in drug use during pregnancy and lactation. Provide a quick, reliable safety assessment in both Persian (fa) and English (en). The response must adhere to the JSON schema. Base your summaries on authoritative sources like Briggs' and Hale's. Classify the risk using 'safetyLevel'. IMPORTANT: If the 'safetyLevel' is 'caution', 'unsafe', or 'unknown', you MUST suggest a safer alternative in the 'safeAlternative' field (in both languages). If 'safe' or no alternative exists, you MUST omit the 'safeAlternative' field.`,
                responseMimeType: "application/json",
                responseSchema: pregnancyInfoSchema,
            },
        });

        const responseText = response.text;
        if (!responseText) throw new Error("No response text from API for pregnancy check.");
        return JSON.parse(responseText.trim());
    } catch (error) {
        console.error("Error fetching pregnancy info from Gemini API:", error);
        throw new Error("Failed to parse pregnancy info from the API.");
    }
};

export const fetchSupplementInfo = async (supplementName: string): Promise<SupplementInfo> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Provide detailed information for the supplement: "${supplementName}".`,
            config: {
                systemInstruction: `You are a supplement and nutrition expert AI. Provide comprehensive and accurate information about dietary supplements in both Persian (fa) and English (en). The response MUST adhere to the JSON schema.`,
                responseMimeType: "application/json",
                responseSchema: supplementInfoSchema,
            },
        });
        
        const responseText = response.text;
        if (!responseText) throw new Error("No response text from API for supplement info.");
        return JSON.parse(responseText.trim());
    } catch (error) {
        console.error("Error fetching supplement info from Gemini API:", error);
        throw new Error("Failed to parse supplement info from the API.");
    }
};

export const fetchRelatedSupplements = async (supplementName: string): Promise<string[]> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Based on the supplement "${supplementName}", suggest 3 or 4 similar or complementary supplements in Persian.`,
            config: {
                systemInstruction: `You are a nutrition expert. Given a supplement name, provide a list of related supplements. Respond only with the requested JSON object. Do not include the original supplement.`,
                responseMimeType: "application/json",
                responseSchema: relatedSupplementsSchema,
            },
        });

        const responseText = response.text;
        if (!responseText) return [];
        const parsedData: { suggestions: string[] } = JSON.parse(responseText.trim());
        return parsedData.suggestions || [];
    } catch (error) {
        console.error("Error fetching related supplements from Gemini API:", error);
        return [];
    }
};

export const fetchToxicologyInfo = async (substanceName: string): Promise<ToxicologyInfo> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Provide an emergency toxicology management guide for poisoning with: "${substanceName}" in Persian.`,
            config: {
                systemInstruction: `You are an expert clinical toxicologist AI. Provide a structured, urgent-care-focused guide in Persian for managing acute poisoning. The response MUST follow the JSON schema. Prioritize immediate, life-saving actions. Information should be concise, practical, and based on authoritative sources like Goldfrank's Toxicology.`,
                responseMimeType: "application/json",
                responseSchema: toxicologyInfoSchema,
            },
        });

        const responseText = response.text;
        if (!responseText) throw new Error("No response text from API for toxicology info.");
        return JSON.parse(responseText.trim());
    } catch (error) {
        console.error("Error fetching toxicology info from Gemini API:", error);
        throw new Error("Failed to parse toxicology info from the API.");
    }
};
