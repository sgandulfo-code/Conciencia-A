export type DrinkType = 'beer' | 'wine' | 'spirit' | 'fernet' | 'water';

export interface DrinkInfo {
  id: DrinkType;
  name: string;
  alcoholPercentage: number; // ABV %
  color: string;
  icon: string;
}

export const drinks: DrinkInfo[] = [
  { id: 'beer', name: 'Cerveza', alcoholPercentage: 5, color: 'bg-amber-400', icon: '🍺' },
  { id: 'wine', name: 'Vino', alcoholPercentage: 13, color: 'bg-rose-700', icon: '🍷' },
  { id: 'fernet', name: 'Fernet / Aperitivo', alcoholPercentage: 39, color: 'bg-stone-800', icon: '🥃' },
  { id: 'spirit', name: 'Destilados (Vodka/Gin)', alcoholPercentage: 40, color: 'bg-blue-200', icon: '🍸' },
  { id: 'water', name: 'Agua', alcoholPercentage: 0, color: 'bg-cyan-200', icon: '💧' },
];

export interface DrinkEffect {
  bac: number; // Blood Alcohol Content g/l
  timeToDrive: number; // Hours
  effects: string[];
  riskLevel: 'safe' | 'caution' | 'danger' | 'severe' | 'healthy';
}

// Simplified Widmark Formula estimation for a generic 70kg person
// BAC = [Alcohol consumed in grams / (Body weight in grams * r)] * 100
// Alcohol grams = Volume (ml) * (ABV / 100) * 0.8 (density of ethanol)
export function calculateEffects(volumeMl: number, drinkType: DrinkType): DrinkEffect {
  const drink = drinks.find(d => d.id === drinkType)!;
  
  // Special handling for non-alcoholic drinks
  if (drink.alcoholPercentage === 0) {
    return {
      bac: 0,
      timeToDrive: 0,
      effects: ["Hidratación óptima", "Mejora la concentración", "Piel más saludable", "Sin riesgo de resaca"],
      riskLevel: 'healthy'
    };
  }

  const alcoholGrams = volumeMl * (drink.alcoholPercentage / 100) * 0.8;
  
  // Using average constants for a 70kg person (r = 0.6 for avg male/female mix)
  // This is an EDUCATIONAL ESTIMATE, not a medical tool.
  let bac = alcoholGrams / (70 * 0.6); 
  
  // Metabolization rate approx 0.15 g/l per hour
  const timeToDrive = Math.max(0, bac / 0.15);

  let effects: string[] = [];
  let riskLevel: 'safe' | 'caution' | 'danger' | 'severe' | 'healthy' = 'safe';

  if (bac < 0.2) {
    effects = ["Relajación leve", "Sin cambios notables en conducta"];
    riskLevel = 'safe';
  } else if (bac < 0.5) {
    effects = ["Euforia leve", "Pérdida de timidez", "Menor capacidad de atención"];
    riskLevel = 'caution';
  } else if (bac < 0.8) {
    effects = ["Reflejos disminuidos", "Desinhibición", "Peor coordinación motora"];
    riskLevel = 'danger';
  } else if (bac < 1.5) {
    effects = ["Habla arrastrada", "Inestabilidad al caminar", "Náuseas posibles", "Juicio muy alterado"];
    riskLevel = 'severe';
  } else {
    effects = ["Confusión mental", "Vómitos", "Riesgo de estupor", "Pérdida de memoria (Blackout)"];
    riskLevel = 'severe';
  }

  return {
    bac: parseFloat(bac.toFixed(2)),
    timeToDrive: parseFloat(timeToDrive.toFixed(1)),
    effects,
    riskLevel
  };
}
