
import React from 'react';
import { StethoscopeIcon } from '../components/icons/StethoscopeIcon';
import { HeartRateMonitorIcon } from '../components/icons/HeartRateMonitorIcon';
import { MicroscopeIcon } from '../components/icons/MicroscopeIcon';
import { ScalpelIcon } from '../components/icons/ScalpelIcon';
import { XRayIcon } from '../components/icons/XRayIcon';


export interface MedicalEquipmentCategory {
    name: string;
    icon: React.ReactNode;
    items: string[];
}

export const medicalEquipmentCategories: MedicalEquipmentCategory[] = [
    {
        name: 'تشخیصی و عمومی',
        icon: React.createElement(StethoscopeIcon, { className: "h-8 w-8 text-blue-500" }),
        items: ['استتوسکوپ (گوشی پزشکی)', 'اتوسکوپ', 'افتالموسکوپ', 'فشارسنج (Sphygmomanometer)', 'ترمومتر (تب‌سنج)', 'پالس اکسیمتر', 'الکتروکاردیوگرام (ECG/EKG)']
    },
    {
        name: 'تصویربرداری',
        icon: React.createElement(XRayIcon, { className: "h-8 w-8 text-purple-500" }),
        items: ['دستگاه رادیوگرافی (X-ray)', 'دستگاه سونوگرافی (Ultrasound)', 'سی‌تی اسکن (CT Scanner)', 'ام‌آر‌آی (MRI)', 'دستگاه ماموگرافی']
    },
    {
        name: 'درمانی و مانیتورینگ',
        icon: React.createElement(HeartRateMonitorIcon, { className: "h-8 w-8 text-red-500" }),
        items: ['دستگاه ونتیلاتور', 'دستگاه ساکشن', 'دفیبریلاتور', 'مانیتور علائم حیاتی', 'پمپ انفوزیون', 'پمپ سرنگ', 'دستگاه دیالیز', 'نبولایزر']
    },
    {
        name: 'جراحی',
        icon: React.createElement(ScalpelIcon, { className: "h-8 w-8 text-gray-600" }),
        items: ['دستگاه الکتروکوتر', 'چراغ سیالتیک (چراغ اتاق عمل)', 'تورنیکه', 'ساکشن جراحی', 'اندوسکوپ', 'لاپاروسکوپ']
    },
    {
        name: 'آزمایشگاهی',
        icon: React.createElement(MicroscopeIcon, { className: "h-8 w-8 text-teal-500" }),
        items: ['میکروسکوپ', 'سانتریفیوژ', 'انکوباتور', 'اتوکلاو', 'اسپکتروفتومتر', 'آنالایزر بیوشیمی']
    },
];
