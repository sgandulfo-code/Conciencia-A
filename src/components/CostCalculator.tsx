import React, { useState } from 'react';
import { motion } from 'motion/react';
import { DollarSign, Pizza, Beer, Calculator, Activity } from 'lucide-react';

export function CostCalculator() {
  const [drinksPerWeek, setDrinksPerWeek] = useState<number>(5);
  const [pricePerDrink, setPricePerDrink] = useState<number>(5000); // Default approx price in ARS or generic currency unit

  // Constants
  const CALORIES_PER_DRINK = 150; // Avg calories in a beer/glass of wine
  const BURGER_CALORIES = 500; // Avg calories in a burger
  const WEEKS_IN_YEAR = 52;

  // Calculations
  const yearlyCost = drinksPerWeek * pricePerDrink * WEEKS_IN_YEAR;
  const yearlyCalories = drinksPerWeek * CALORIES_PER_DRINK * WEEKS_IN_YEAR;
  const burgersEquivalent = Math.round(yearlyCalories / BURGER_CALORIES);
  const weightGainKg = Math.round(yearlyCalories / 7700); // Approx 7700 cal = 1kg fat

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h3 className="text-3xl font-bold text-stone-900 mb-3">Calculadora de Costo Oculto</h3>
        <p className="text-stone-600">El alcohol no solo afecta tu salud, también impacta tu bolsillo y tu peso.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Inputs */}
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-stone-100 space-y-8">
          <div>
            <label className="block text-sm font-bold text-stone-700 mb-2 flex items-center gap-2">
              <Beer size={18} className="text-amber-500" />
              Bebidas por semana
            </label>
            <div className="flex items-center gap-4">
              <input 
                type="range" 
                min="0" 
                max="50" 
                value={drinksPerWeek} 
                onChange={(e) => setDrinksPerWeek(parseInt(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <span className="text-2xl font-bold text-stone-800 w-12 text-center">{drinksPerWeek}</span>
            </div>
            <p className="text-xs text-stone-400 mt-2">Incluye cervezas, vinos, tragos, etc.</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-stone-700 mb-2 flex items-center gap-2">
              <DollarSign size={18} className="text-emerald-500" />
              Costo promedio por bebida ($)
            </label>
            <div className="relative">
              <input 
                type="number" 
                value={pricePerDrink} 
                onChange={(e) => setPricePerDrink(parseInt(e.target.value) || 0)}
                className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl font-mono text-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl flex items-start gap-3">
            <Calculator className="text-blue-600 shrink-0 mt-1" size={20} />
            <p className="text-sm text-blue-800">
              Ajusta los valores para ver cuánto podrías ahorrar en un año si eliminaras este consumo.
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* Money Card */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-emerald-600 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <DollarSign size={120} />
            </div>
            <h4 className="text-emerald-100 font-medium mb-1 uppercase tracking-wider text-sm">Ahorro Anual Potencial</h4>
            <div className="text-5xl font-extrabold mb-2 tracking-tight">
              ${yearlyCost.toLocaleString()}
            </div>
            <p className="text-emerald-100 text-sm">Podrías usar este dinero para un viaje, tecnología o inversión.</p>
          </motion.div>

          {/* Health Impact Section */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-stone-50 p-6 rounded-3xl border border-stone-200 space-y-4"
          >
            <h4 className="font-bold text-stone-700 flex items-center gap-2 mb-2">
              <Activity size={20} className="text-orange-500" />
              Impacto Invisible en tu Cuerpo
            </h4>
            
            <div className="grid grid-cols-1 gap-4">
               {/* Burgers */}
               <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-100 flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-full text-orange-600 shrink-0 mt-1">
                    <Pizza size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-stone-800 mb-1">{burgersEquivalent} Hamburguesas</div>
                    <p className="text-sm text-stone-600 leading-snug">
                      Las calorías que bebes en un año equivalen a comer esta cantidad de comida chatarra adicional.
                    </p>
                  </div>
               </div>

               {/* Weight */}
               <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-100 flex items-start gap-4">
                  <div className="bg-red-100 p-3 rounded-full text-red-600 shrink-0 mt-1">
                    <Activity size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-stone-800 mb-1">+{weightGainKg} kg de grasa</div>
                    <p className="text-sm text-stone-600 leading-snug">
                      Es el peso corporal que podrías aumentar en un año solo por las "calorías vacías" del alcohol.
                    </p>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
