
import React, { useState } from 'react';
import { SynapseLogoIcon } from './components/icons/SynapseLogoIcon';
import { SingleDrugSearch } from './components/SingleDrugSearch';
import { InteractionChecker } from './components/InteractionChecker';
import { SavedItems } from './components/SavedItems';
import { PharmacotherapyGuide } from './components/PharmacotherapyGuide';
import { PregnancyCheck } from './components/PregnancyCheck';
import { MedicalEquipment } from './components/MedicalEquipment';
import { SupplementSearch } from './components/SupplementSearch';
import { Toxicology } from './components/Toxicology';
// FIX: Import the new components for Infant Formula and Special Medications.
import { InfantFormulaGuide } from './components/InfantFormulaGuide';
import { SpecialMedicationsGuide } from './components/SpecialMedicationsGuide';


// FIX: Add 'formula' and 'special' to the ViewMode type to support new screens.
type ViewMode = 'search' | 'interaction' | 'therapy' | 'pregnancy' | 'equipment' | 'supplement' | 'toxicology' | 'saved' | 'formula' | 'special';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('search');

  const TabButton: React.FC<{
    mode: ViewMode;
    label: string;
  }> = ({ mode, label }) => (
    <button
      onClick={() => setViewMode(mode)}
      className={`px-2 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors duration-200 flex-grow text-center ${
        viewMode === mode
          ? 'bg-blue-600 text-white shadow'
          : 'text-gray-600 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );

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
          {/* FIX: Changed grid columns to 5 on small screens to accommodate new tabs. */}
          <div className="mb-6 bg-gray-100 p-2 rounded-lg grid grid-cols-2 sm:grid-cols-5 gap-2">
            <TabButton mode="search" label="جستجوی دارو" />
            <TabButton mode="interaction" label="بررسی تداخلات" />
            <TabButton mode="therapy" label="فارماکوتراپی" />
            <TabButton mode="pregnancy" label="بارداری" />
            {/* FIX: Add TabButton for Infant Formula Guide. */}
            <TabButton mode="formula" label="شیر خشک" />
            <TabButton mode="supplement" label="مکمل‌ها" />
            <TabButton mode="toxicology" label="مسمومیت‌ها" />
            {/* FIX: Add TabButton for Special Medications Guide. */}
            <TabButton mode="special" label="داروهای خاص" />
            <TabButton mode="equipment" label="تجهیزات" />
            <TabButton mode="saved" label="ذخیره شده" />
          </div>

          {viewMode === 'search' && <div className="max-w-3xl mx-auto"><SingleDrugSearch /></div>}
          {viewMode === 'interaction' && <div className="max-w-3xl mx-auto"><InteractionChecker /></div>}
          {viewMode === 'therapy' && <div className="max-w-3xl mx-auto"><PharmacotherapyGuide /></div>}
          {viewMode === 'pregnancy' && <div className="max-w-3xl mx-auto"><PregnancyCheck /></div>}
          {viewMode === 'equipment' && <div className="max-w-3xl mx-auto"><MedicalEquipment /></div>}
          {viewMode === 'supplement' && <div className="max-w-3xl mx-auto"><SupplementSearch /></div>}
          {viewMode === 'toxicology' && <div className="max-w-3xl mx-auto"><Toxicology /></div>}
          {/* FIX: Add rendering logic for the new components. */}
          {viewMode === 'formula' && <div className="max-w-3xl mx-auto"><InfantFormulaGuide /></div>}
          {viewMode === 'special' && <div className="max-w-3xl mx-auto"><SpecialMedicationsGuide /></div>}
          {viewMode === 'saved' && <SavedItems />}
        </div>
      </main>

      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>سیناپس | قدرت گرفته از هوش مصنوعی Gemini</p>
      </footer>
    </div>
  );
};

export default App;
