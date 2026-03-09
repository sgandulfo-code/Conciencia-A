import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { drinks, calculateEffects, DrinkType, DrinkEffect } from '../data/drinkSimulator';
import { Car, AlertTriangle, Clock, Skull } from 'lucide-react';

export function DrinkSimulator() {
  const [selectedDrink, setSelectedDrink] = useState<DrinkType>('beer');
  const [volume, setVolume] = useState<number>(250); // ml
  const [isDrinking, setIsDrinking] = useState(false);
  const [result, setResult] = useState<DrinkEffect | null>(null);

  const currentDrink = drinks.find(d => d.id === selectedDrink)!;

  const handleDrink = () => {
    setIsDrinking(true);
    setResult(null);
    
    // Simulate drinking animation delay
    setTimeout(() => {
      const effects = calculateEffects(volume, selectedDrink);
      setResult(effects);
      setIsDrinking(false);
    }, 1500);
  };

  // Calculate fill height percentage based on max realistic volume for glass type
  // Beer max ~1000ml, Wine ~500ml, Spirits ~300ml, Water ~1000ml
  const maxVolume = (selectedDrink === 'beer' || selectedDrink === 'water') ? 1000 : selectedDrink === 'wine' ? 500 : 300;
  const fillPercentage = Math.min((volume / maxVolume) * 100, 95);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h3 className="text-3xl font-bold text-stone-900 mb-3">Simulador de Efectos</h3>
        <p className="text-stone-600">Elige tu bebida, sirve la cantidad y descubre cómo impacta tu cuerpo y tu capacidad de conducir.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Controls & Glass */}
        <div className="space-y-8">
          
          {/* Drink Selector */}
          <div className="flex gap-2 justify-center flex-wrap">
            {drinks.map((drink) => (
              <button
                key={drink.id}
                onClick={() => { setSelectedDrink(drink.id); setVolume(drink.id === 'beer' || drink.id === 'water' ? 330 : 150); setResult(null); }}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${selectedDrink === drink.id ? 'bg-stone-900 text-white shadow-lg scale-105' : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'}`}
              >
                <span>{drink.icon}</span>
                {drink.name}
              </button>
            ))}
          </div>

          {/* Glass Visualization */}
          <div className="h-80 flex justify-center items-end relative">
            {/* The Glass Container */}
            <div className="relative w-40 h-64 border-b-4 border-x-4 border-stone-300 rounded-b-3xl bg-white/30 backdrop-blur-sm overflow-hidden shadow-inner">
              
              {/* Liquid */}
              <motion.div 
                className={`absolute bottom-0 left-0 right-0 w-full ${currentDrink.color} opacity-80`}
                initial={{ height: 0 }}
                animate={{ 
                  height: isDrinking ? 0 : `${fillPercentage}%`,
                  transition: { type: 'spring', bounce: 0, duration: isDrinking ? 1.5 : 0.5 }
                }}
              >
                {/* Bubbles/Texture overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                {(selectedDrink === 'beer' || selectedDrink === 'water') && (
                  <div className="absolute top-0 left-0 right-0 h-4 bg-white opacity-90 -mt-2 rounded-sm blur-[2px]" />
                )}
              </motion.div>

              {/* Measurement Lines */}
              <div className="absolute right-0 bottom-0 top-0 w-8 flex flex-col justify-end text-[10px] text-stone-400 font-mono py-2 pr-1 pointer-events-none">
                <div className="border-b border-stone-300 w-2 ml-auto mb-[25%]"></div>
                <div className="border-b border-stone-300 w-4 ml-auto mb-[25%]"></div>
                <div className="border-b border-stone-300 w-2 ml-auto mb-[25%]"></div>
              </div>
            </div>
          </div>

          {/* Volume Slider */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
            <div className="flex justify-between items-center mb-4">
              <label className="font-bold text-stone-700">Cantidad a servir</label>
              <span className="text-2xl font-bold text-emerald-600 font-mono">{volume} ml</span>
            </div>
            <input 
              type="range" 
              min="50" 
              max={maxVolume} 
              step="10"
              value={volume}
              onChange={(e) => { setVolume(parseInt(e.target.value)); setResult(null); }}
              className="w-full h-3 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
            />
            <div className="flex justify-between text-xs text-stone-400 mt-2">
              <span>Un poco</span>
              <span>Vaso lleno</span>
            </div>
          </div>

          <button
            onClick={handleDrink}
            disabled={isDrinking}
            className="w-full py-4 bg-stone-900 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-stone-800 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {isDrinking ? 'Bebiendo...' : 'Beber Ahora'}
          </button>
        </div>

        {/* Right Column: Results Panel */}
        <div className="h-full">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-3xl shadow-xl border border-stone-100 overflow-hidden h-full flex flex-col"
              >
                <div className={`p-6 text-white ${result.riskLevel === 'safe' || result.riskLevel === 'healthy' ? 'bg-emerald-500' : result.riskLevel === 'caution' ? 'bg-amber-500' : 'bg-red-600'}`}>
                  <h4 className="text-lg font-medium opacity-90 uppercase tracking-wider">Estimación de Alcohol</h4>
                  <div className="text-5xl font-extrabold mt-2">{result.bac} g/l</div>
                  <p className="text-sm opacity-80 mt-1">*Estimado para una persona promedio de 70kg</p>
                </div>

                <div className="p-8 space-y-8 flex-1">
                  
                  {/* Driving Time */}
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full shrink-0 ${result.timeToDrive > 0 ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                      <Car size={28} />
                    </div>
                    <div>
                      <h5 className="font-bold text-stone-800 text-lg">¿Puedes conducir?</h5>
                      {result.timeToDrive > 0 ? (
                        <p className="text-stone-600 mt-1">
                          <span className="font-bold text-red-600">NO.</span> Debes esperar al menos <span className="font-bold text-stone-900">{result.timeToDrive} horas</span> para que el alcohol baje a 0.
                        </p>
                      ) : (
                        <p className="text-emerald-600 font-medium mt-1">
                          Sí, tu nivel estimado es 0. {result.riskLevel === 'healthy' ? '¡Excelente elección para mantenerte seguro!' : 'Pero si sientes cansancio, no conduzcas.'}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Effects List */}
                  <div>
                    <h5 className="font-bold text-stone-800 text-lg mb-4 flex items-center gap-2">
                      <AlertTriangle size={20} className="text-amber-500" />
                      Efectos Inmediatos
                    </h5>
                    <ul className="space-y-3">
                      {result.effects.map((effect, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-stone-600 bg-stone-50 p-3 rounded-lg border border-stone-100">
                          <div className={`w-2 h-2 rounded-full ${result.riskLevel === 'healthy' ? 'bg-cyan-400' : 'bg-stone-400'}`} />
                          {effect}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {result.riskLevel === 'severe' && (
                    <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex gap-3 text-red-800 text-sm">
                      <Skull size={20} className="shrink-0" />
                      <p>Este nivel de intoxicación es peligroso. Riesgo de coma etílico o accidentes graves.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full min-h-[400px] bg-stone-50 rounded-3xl border-2 border-dashed border-stone-200 flex flex-col items-center justify-center text-stone-400 p-8 text-center"
              >
                <div className="bg-white p-6 rounded-full shadow-sm mb-4">
                  <Clock size={48} className="text-stone-300" />
                </div>
                <h4 className="text-xl font-bold text-stone-500 mb-2">Esperando trago...</h4>
                <p>Sirve una bebida y presiona "Beber Ahora" para ver los efectos estimados en tu organismo.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
