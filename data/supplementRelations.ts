
// A simple map for supplement relationships.
// Keys are lowercase keywords to match against supplement names.
const supplementRelations = new Map<string, string[]>([
    ['whey protein', ['Creatine', 'BCAA', 'L-Glutamine']],
    ['creatine', ['Whey Protein', 'Beta-Alanine', 'L-Citrulline']],
    ['vitamin d3', ['Calcium', 'Vitamin K2', 'Magnesium']],
    ['calcium', ['Vitamin D3', 'Magnesium', 'Vitamin K2']],
    ['omega-3', ['Vitamin E', 'Coenzyme Q10', 'Astaxanthin']],
    ['fish oil', ['Vitamin E', 'Coenzyme Q10', 'Astaxanthin']],
    ['multivitamin', ['Omega-3', 'Probiotics', 'Vitamin D3']],
    ['iron', ['Vitamin C', 'Folic Acid', 'B12']],
    ['zinc', ['Magnesium', 'Vitamin C', 'Copper']],
    ['magnesium', ['Zinc', 'Vitamin D3', 'Calcium']],
    ['bcaa', ['Whey Protein', 'Creatine', 'L-Glutamine']],
    ['collagen', ['Vitamin C', 'Hyaluronic Acid', 'Biotin']],
    ['biotin', ['Collagen', 'Vitamin C', 'Keratin']],
    ['turmeric', ['Black Pepper Extract (Piperine)', 'Ginger', 'Omega-3']],
    ['glucosamine', ['Chondroitin', 'MSM', 'Omega-3']],
    ['probiotics', ['Prebiotics (Fiber)', 'Digestive Enzymes']],
    ['melatonin', ['Magnesium', 'L-Theanine', 'Valerian Root']],
    ['ashwagandha', ['Rhodiola Rosea', 'L-Theanine', 'Magnesium']]
]);

export function getRelatedSupplements(supplementName: string): string[] {
    const lowerCaseName = supplementName.toLowerCase();
    for (const [key, value] of supplementRelations.entries()) {
        if (lowerCaseName.includes(key)) {
            // Filter out the original supplement itself from the suggestions
            return value.filter(s => !lowerCaseName.includes(s.toLowerCase()));
        }
    }
    return [];
}
