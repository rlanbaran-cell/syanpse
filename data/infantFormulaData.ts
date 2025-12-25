
import React from 'react';
import type { InfantFormulaInfo } from '../types';
import { BottleIcon } from '../components/icons/BottleIcon';
import { HeartIcon } from '../components/icons/HeartIcon';
import { ShieldCheckIcon } from '../components/icons/ShieldCheckIcon';
import { BabyIcon } from '../components/icons/BabyIcon';
import { LeafIcon } from '../components/icons/LeafIcon';
import { StomachIcon } from '../components/icons/StomachIcon';


export interface InfantFormulaCategory {
    name: string;
    icon: React.ReactNode;
    items: string[];
}

export const infantFormulaCategories: InfantFormulaCategory[] = [
    {
        name: 'شیر خشک‌های معمولی',
        icon: React.createElement(BottleIcon, { className: "h-8 w-8 text-blue-500" }),
        items: ['آپتامیل ۱', 'آپتامیل ۲', 'آپتامیل ۳', 'ببلاک ۱', 'ببلاک ۲', 'ببلاک ۳', 'نان ۱', 'نان ۲', 'نان ۳']
    },
    {
        name: 'آنتی-رفلاکس (AR)',
        icon: React.createElement(StomachIcon, { className: "h-8 w-8 text-green-500" }),
        items: ['آپتامیل AR', 'ببلاک AR', 'نان AR']
    },
    {
        name: 'هایپوآلرژنیک (HA)',
        icon: React.createElement(ShieldCheckIcon, { className: "h-8 w-8 text-purple-500" }),
        items: ['آپتامیل پپتی', 'آپتامیل پپتی جونیور', 'نان HA', 'ببلاک HA']
    },
    {
        name: 'هضم آسان (Comfort)',
        icon: React.createElement(HeartIcon, { className: "h-8 w-8 text-pink-500" }),
        items: ['آپتامیل کامفورت ۱', 'آپتامیل کامفورت ۲', 'ببلاک کامفورت']
    },
    {
        name: 'مخصوص نوزادان نارس',
        icon: React.createElement(BabyIcon, { className: "h-8 w-8 text-yellow-500" }),
        items: ['آپتامیل PDF', 'پره نان']
    },
     {
        name: 'فاقد لاکتوز و سویا',
        icon: React.createElement(LeafIcon, { className: "h-8 w-8 text-emerald-500" }),
        items: ['ببلاک LF', 'ایزومیل (سویا)']
    }
];

export const preloadedFormulaInfo = new Map<string, InfantFormulaInfo>([
    // Standard Formulas
    ['آپتامیل ۱', {
        brand: 'آپتامیل (Aptamil)', name: 'آپتامیل ۱', stage: '۱', ageRange: 'از بدو تولد تا ۶ ماهگی',
        description: 'شیر خشک استاندارد برای شیرخواران سالم از بدو تولد. حاوی ترکیب انحصاری پره‌بیوتیک برای بهبود عملکرد گوارش و سیستم ایمنی.',
        indications: ['تغذیه نوزادان سالم', 'رشد و نمو طبیعی', 'تقویت سیستم ایمنی'],
        keyIngredients: 'پره‌بیوتیک‌های GOS/FOS، نوکلئوتیدها، DHA و AA.'
    }],
    ['آپتامیل ۲', {
        brand: 'آپتامیل (Aptamil)', name: 'آپتامیل ۲', stage: '۲', ageRange: '۶ تا ۱۲ ماهگی',
        description: 'شیر خشک تکمیلی برای شیرخواران از ۶ ماهگی به بعد که متناسب با نیازهای تغذیه‌ای این سن طراحی شده است.',
        indications: ['ادامه تغذیه پس از ۶ ماهگی', 'تامین انرژی و مواد مغذی', 'رشد جسمی و ذهنی'],
        keyIngredients: 'آهن، کلسیم، ویتامین D، پره‌بیوتیک GOS/FOS.'
    }],
    ['آپتامیل ۳', {
        brand: 'آپتامیل (Aptamil)', name: 'آپتامیل ۳', stage: '۳', ageRange: 'بالای ۱۲ ماهگی',
        description: 'شیر غنی شده برای کودکان نوپا که به عنوان بخشی از یک رژیم غذایی متنوع استفاده می‌شود.',
        indications: ['تغذیه کودکان نوپا', 'تامین ویتامین‌ها و مواد معدنی ضروری'],
        keyIngredients: 'آهن، کلسیم، ویتامین D، پره‌بیوتیک.'
    }],
     ['ببلاک ۱', {
        brand: 'ببلاک (Bebelac)', name: 'ببلاک ۱', stage: '۱', ageRange: 'از بدو تولد تا ۶ ماهگی',
        description: 'شیر خشک استاندارد حاوی پره‌بیوتیک برای هضم بهتر و کاهش مشکلات گوارشی.',
        indications: ['تغذیه نوزادان سالم', 'هضم آسان'],
        keyIngredients: 'پره‌بیوتیک، آهن، امگا ۳ و ۶.'
    }],
    ['ببلاک ۲', {
        brand: 'ببلاک (Bebelac)', name: 'ببلاک ۲', stage: '۲', ageRange: '۶ تا ۱۲ ماهگی',
        description: 'شیر خشک تکمیلی برای تامین نیازهای تغذیه‌ای افزایش یافته شیرخواران بالای ۶ ماه.',
        indications: ['تغذیه تکمیلی', 'رشد و نمو'],
        keyIngredients: 'آهن، کلسیم، ویتامین‌ها.'
    }],
     ['ببلاک ۳', {
        brand: 'ببلاک (Bebelac)', name: 'ببلاک ۳', stage: '۳', ageRange: 'بالای ۱۲ ماهگی',
        description: 'شیر رشد برای کودکان نوپا جهت تامین مواد مغذی کلیدی.',
        indications: ['تغذیه کودکان نوپا', 'رشد سالم'],
        keyIngredients: 'کلسیم، آهن، ویتامین D.'
    }],
    ['نان ۱', {
        brand: 'نان (Nan)', name: 'نان ۱', stage: '۱', ageRange: 'از بدو تولد تا ۶ ماهگی',
        description: 'شیر خشک با ترکیبی از پروتئین‌های مرغوب برای رشد بهینه نوزاد.',
        indications: ['تغذیه نوزادان سالم', 'تامین پروتئین با کیفیت'],
        keyIngredients: 'پروتئین اپتای-پرو، پروبیوتیک‌ها، DHA.'
    }],
    ['نان ۲', {
        brand: 'نان (Nan)', name: 'نان ۲', stage: '۲', ageRange: '۶ تا ۱۲ ماهگی',
        description: 'شیر خشک تکمیلی غنی شده با آهن و پروبیوتیک برای حمایت از رشد و سیستم ایمنی.',
        indications: ['تغذیه تکمیلی', 'تقویت سیستم ایمنی'],
        keyIngredients: 'آهن، پروبیوتیک بیفیدوس، ویتامین D.'
    }],
    ['نان ۳', {
        brand: 'نان (Nan)', name: 'نان ۳', stage: '۳', ageRange: 'بالای ۱۲ ماهگی',
        description: 'شیر رشد برای کودکان بالای یک سال با تمرکز بر رشد شناختی.',
        indications: ['تغذیه کودکان نوپا', 'رشد مغزی'],
        keyIngredients: 'آهن، ید، امگا ۳.'
    }],
    
    // AR Formulas
    ['آپتامیل AR', {
        brand: 'آپتامیل (Aptamil)', name: 'آپتامیل AR', stage: 'AR', ageRange: 'از بدو تولد',
        description: 'شیر خشک مخصوص شیرخوارانی که دچار رفلاکس یا بازگشت محتویات معده هستند. حاوی ماده غلیظ کننده صمغ خرنوب است.',
        indications: ['رفلاکس (GERD)', 'کاهش بالا آوردن شیر'],
        keyIngredients: 'صمغ خرنوب (Locust Bean Gum)، نوکلئوتیدها.'
    }],
    ['ببلاک AR', {
        brand: 'ببلاک (Bebelac)', name: 'ببلاک AR', stage: 'AR', ageRange: 'از بدو تولد',
        description: 'فرمولاسیون غلیظ شده برای مدیریت رفلاکس در شیرخواران.',
        indications: ['رفلاکس (GERD)', 'بالا آوردن مکرر'],
        keyIngredients: 'صمغ خرنوب.'
    }],
    ['نان AR', {
        brand: 'نان (Nan)', name: 'نان AR', stage: 'AR', ageRange: 'از بدو تولد',
        description: 'حاوی نشاسته برای غلیظ شدن در معده و کاهش رفلاکس. همچنین دارای پروبیوتیک ال-روتרי است.',
        indications: ['رفلاکس (GERD)'],
        keyIngredients: 'نشاسته، پروبیوتیک L. reuteri.'
    }],

    // HA Formulas
    ['آپتامیل پپتی', {
        brand: 'آپتامیل (Aptamil)', name: 'آپتامیل پپتی', stage: '۱ و ۲', ageRange: 'از بدو تولد',
        description: 'شیر خشک با پروتئین‌های هیدرولیز شده (تجزیه شده) برای شیرخواران مبتلا به آلرژی به پروتئین شیر گاو.',
        indications: ['آلرژی به پروتئین شیر گاو', 'سوء جذب شدید'],
        keyIngredients: 'پروتئین وی کاملاً هیدرولیز شده، پره‌بیوتیک.'
    }],
     ['آپتامیل پپتی جونیور', {
        brand: 'آپتامیل (Aptamil)', name: 'آپتامیل پپتی جونیور', stage: 'جونیور', ageRange: 'بالای ۱ سال',
        description: 'ادامه فرمولاسیون پپتی برای کودکان نوپای مبتلا به آلرژی.',
        indications: ['آلرژی به پروتئین شیر گاو در کودکان نوپا'],
        keyIngredients: 'پروتئین وی کاملاً هیدرولیز شده، MCT Oil.'
    }],
    ['نان HA', {
        brand: 'نان (Nan)', name: 'نان HA', stage: '۱ و ۲', ageRange: 'از بدو تولد',
        description: 'شیر خشک با پروتئین‌های نسبتاً هیدرولیز شده برای کاهش ریسک بروز آلرژی در شیرخواران مستعد.',
        indications: ['پیشگیری از آلرژی', 'سابقه خانوادگی آلرژی'],
        keyIngredients: 'پروتئین وی نسبتاً هیدرولیز شده، پروبیوتیک.'
    }],
     ['ببلاک HA', {
        brand: 'ببلاک (Bebelac)', name: 'ببلاک HA', stage: 'HA', ageRange: 'از بدو تولد',
        description: 'حاوی پروتئین‌های هیدرولیز شده برای کاهش خطر حساسیت.',
        indications: ['پیشگیری از آلرژی'],
        keyIngredients: 'پروتئین وی نسبتاً هیدرولیز شده، پره‌بیوتیک.'
    }],

    // Comfort Formulas
    ['آپتامیل کامفورت ۱', {
        brand: 'آپتامیل (Aptamil)', name: 'آپتامیل کامفورت ۱', stage: '۱', ageRange: '۰ تا ۶ ماهگی',
        description: 'شیر خشک با پروتئین هیدرولیز شده و لاکتوز کمتر برای مدیریت مشکلات گوارشی خفیف مانند کولیک و یبوست.',
        indications: ['کولیک (قولنج)', 'یبوست', 'نفخ'],
        keyIngredients: 'پروتئین وی نسبتاً هیدرولیز شده، بتا-پالمیتات، لاکتوز کاهش یافته.'
    }],
     ['آپتامیل کامفورت ۲', {
        brand: 'آپتامیل (Aptamil)', name: 'آپتامیل کامفورت ۲', stage: '۲', ageRange: '۶ تا ۱۲ ماهگی',
        description: 'ادامه فرمولاسیون کامفورت برای شیرخواران بالای ۶ ماه.',
        indications: ['کولیک (قولنج)', 'یبوست', 'مشکلات گوارشی'],
        keyIngredients: 'پروتئین وی نسبتاً هیدرولیز شده، پره‌بیوتیک.'
    }],
    ['ببلاک کامفورت', {
        brand: 'ببلاک (Bebelac)', name: 'ببلاک کامفورت', stage: 'کامفورت', ageRange: 'از بدو تولد',
        description: 'فرمولاسیون ویژه برای کمک به هضم راحت‌تر و کاهش ناراحتی‌های گوارشی.',
        indications: ['کولیک (قولنج)', 'یبوست'],
        keyIngredients: 'پروتئین نسبتاً هیدرولیز شده، نشاسته.'
    }],

    // Preterm Formulas
    ['آپتامیل PDF', {
        brand: 'آپتامیل (Aptamil)', name: 'آپتامیل PDF', stage: 'PDF', ageRange: 'پس از ترخیص نوزاد نارس',
        description: 'Post Discharge Formula؛ شیر خشک غنی شده برای نوزادان نارس و کم‌وزن پس از ترخیص از بیمارستان برای کمک به رشد جبرانی (Catch-up growth).',
        indications: ['نوزادان نارس و کم‌وزن', 'کمک به وزن‌گیری سریع'],
        keyIngredients: 'انرژی، پروتئین و مواد مغذی بالاتر از شیر خشک معمولی.'
    }],
    ['پره نان', {
        brand: 'نان (Nan)', name: 'پره نان', stage: 'Pre', ageRange: 'برای نوزادان نارس در بیمارستان',
        description: 'فرمولاسیون تخصصی با انرژی و پروتئین بالا برای تغذیه نوزادان نارس و کم‌وزن در بیمارستان.',
        indications: ['نوزادان نارس (Preterm)', 'نوزادان کم‌وزن (LBW)'],
        keyIngredients: 'پروتئین بالا، MCT Oil، DHA و ARA.'
    }],

    // Lactose-Free & Soy
     ['ببلاک LF', {
        brand: 'ببلاک (Bebelac)', name: 'ببلاک LF', stage: 'LF', ageRange: 'از بدو تولد',
        description: 'Lactose-Free؛ شیر خشک فاقد لاکتوز برای شیرخوارانی که دچار عدم تحمل لاکتوز هستند (معمولاً پس از اسهال).',
        indications: ['عدم تحمل لاکتوز', 'اسهال'],
        keyIngredients: 'مالتودکسترین به جای لاکتوز.'
    }],
     ['ایزومیل (سویا)', {
        brand: 'ابوت (Abbott)', name: 'ایزومیل (سویا)', stage: 'سویا', ageRange: 'از بدو تولد',
        description: 'شیر خشک بر پایه پروتئین سویا برای شیرخواران مبتلا به گالاکتوزمی یا عدم تحمل لاکتوز شدید.',
        indications: ['گالاکتوزمی', 'عدم تحمل لاکتوز', 'آلرژی به پروتئین شیر گاو (در موارد خاص)'],
        keyIngredients: 'پروتئین ایزوله سویا.'
    }],
]);
