
import React, { useState, Suspense, lazy, useEffect } from 'react';
import { SynapseLogoIcon } from './components/icons/SynapseLogoIcon';
import { SpinnerIcon } from './components/icons/SpinnerIcon';
import { BackToTopButton } from './components/BackToTopButton';
import { SearchIcon } from './components/icons/SearchIcon';
import { InteractionIcon } from './components/icons/InteractionIcon';
import { ClipboardIcon } from './components/icons/ClipboardIcon';
import { PregnancyIcon } from './components/icons/PregnancyIcon';
import { LeafIcon } from './components/icons/LeafIcon';
import { BiohazardIcon } from './components/icons/BiohazardIcon';
import { BookmarkIcon } from './components/icons/BookmarkIcon';

const componentMap = {
  search: lazy(() => import('./components/SingleDrugSearch')),
  interaction: lazy(() => import('./components/InteractionChecker')),
  therapy: lazy(() => import('./components/PharmacotherapyGuide')),
  pregnancy: lazy(() => import('./components/PregnancyCheck')),
  supplement: lazy(() => import('./components/SupplementSearch')),
  toxicology: lazy(() => import('./components/Toxicology')),
  saved: lazy(() => import('./components/SavedItems')),
};

type ViewMode = keyof typeof componentMap;

const titleMap: Record<ViewMode, string> = {
  search: 'جستجوی دارو',
  interaction: 'تداخلات',
  therapy: 'فارماکوتراپی',
  pregnancy: 'بارداری',
  supplement: 'مکمل‌ها',
  toxicology: 'مسمومیت‌ها',
  saved: 'ذخیره شده',
};

const iconMap: Record<ViewMode, React.FC<React.SVGProps<SVGSVGElement>>> = {
  search: SearchIcon,
  interaction: InteractionIcon,
  therapy: ClipboardIcon,
  pregnancy: PregnancyIcon,
  supplement: LeafIcon,
  toxicology: BiohazardIcon,
  saved: BookmarkIcon,
};

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('search');

  useEffect(() => {
    document.title = `${titleMap[viewMode]} | سیناپس`;
  }, [viewMode]);

  const TabButton: React.FC<{
    mode: ViewMode;
    label: string;
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  }> = ({ mode, label, Icon }) => (
    <button
      onClick={() => setViewMode(mode)}
      className={`flex-1 min-w-[100px] flex flex-col items-center gap-1 p-3 rounded-lg transition-all duration-200 group ${
        viewMode === mode
          ? 'bg-blue-600 text-white shadow-md'
          : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600'
      }`}
    >
      <Icon className={`h-6 w-6 transition-colors ${viewMode === mode ? 'text-white' : 'text-gray-500 group-hover:text-blue-500'}`} />
      <span className="text-xs font-semibold">{label}</span>
    </button>
  );
  
  const CurrentView = componentMap[viewMode];
  const contentWrapperClass = viewMode === 'saved' ? '' : 'max-w-3xl mx-auto';


  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-white shadow-md sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SynapseLogoIcon className="h-10 w-10 text-blue-600" />
            <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">سیناپس</h1>
                <p className="text-sm text-gray-500 hidden sm:block">دستیار هوشمند دارویی</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 bg-gray-100 p-2 rounded-lg flex flex-wrap gap-2">
            {(Object.keys(componentMap) as ViewMode[]).map((tab) => (
                <TabButton
                    key={tab}
                    mode={tab}
                    label={titleMap[tab]}
                    Icon={iconMap[tab]}
                />
            ))}
          </div>

          <Suspense fallback={
            <div className="flex flex-col items-center justify-center text-center mt-20">
              <SpinnerIcon className="h-12 w-12 text-blue-500" />
              <p className="mt-4 text-lg text-gray-600">در حال بارگذاری...</p>
            </div>
          }>
            <div className={contentWrapperClass}>
              <CurrentView />
            </div>
          </Suspense>
        </div>
      </main>

      <BackToTopButton />

      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>سیناپس | قدرت گرفته از هوش مصنوعی Gemini</p>
      </footer>
    </div>
  );
};

export default App;
