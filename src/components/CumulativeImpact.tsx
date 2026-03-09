import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { bodyEffects, BodyEffect } from '../data/bodyEffects';
import { DollarSign, Calendar, AlertCircle, TrendingUp, User } from 'lucide-react';

export function CumulativeImpact() {
  const [age, setAge] = useState<number>(30);
  const [yearsConsuming, setYearsConsuming] = useState<number>(5);
  const [drinksPerWeek, setDrinksPerWeek] = useState<number>(10);
  const [pricePerDrink, setPricePerDrink] = useState<number>(5000);
  const [selectedEffect, setSelectedEffect] = useState<BodyEffect | null>(null);

  // Calculations
  const totalDrinks = drinksPerWeek * 52 * yearsConsuming;
  const totalCost = totalDrinks * pricePerDrink;
  
  // Determine active effects based on user input
  const activeEffects = useMemo(() => {
    return bodyEffects.filter(effect => 
      yearsConsuming >= effect.minYears && 
      drinksPerWeek >= effect.minDrinksPerWeek
    );
  }, [yearsConsuming, drinksPerWeek]);

  // Comparison items for cost
  const getComparisonItem = (cost: number) => {
    if (cost > 40000000) return "Un departamento pequeño o terreno";
    if (cost > 20000000) return "Un auto 0km de gama media";
    if (cost > 10000000) return "Un auto usado en buen estado";
    if (cost > 5000000) return "Un viaje a Europa para dos personas";
    if (cost > 2000000) return "Una moto nueva o laptop de alta gama";
    if (cost > 1000000) return "Un smartphone tope de gama";
    return "Ropa, salidas o ahorros significativos";
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h3 className="text-3xl font-bold text-stone-900 mb-3">Tu Historial Acumulado</h3>
        <p className="text-stone-600">Visualiza el impacto financiero y físico que el alcohol ha tenido en tu vida a lo largo del tiempo.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Inputs & Financial Stats (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Inputs Card */}
          <div className="bg-white p-6 rounded-3xl shadow-lg border border-stone-100 space-y-6">
            <h4 className="font-bold text-stone-800 flex items-center gap-2">
              <User size={20} className="text-emerald-600" />
              Tus Datos
            </h4>
            
            <div>
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1 block">Tu Edad Actual</label>
              <div className="flex items-center gap-3">
                <input 
                  type="range" min="18" max="80" 
                  value={age} onChange={(e) => setAge(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
                />
                <span className="font-mono font-bold text-lg w-8">{age}</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1 block">Años Consumiendo</label>
              <div className="flex items-center gap-3">
                <input 
                  type="range" min="1" max={Math.max(1, age - 15)} 
                  value={yearsConsuming} onChange={(e) => setYearsConsuming(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
                />
                <span className="font-mono font-bold text-lg w-8">{yearsConsuming}</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1 block">Bebidas por Semana</label>
              <div className="flex items-center gap-3">
                <input 
                  type="range" min="1" max="50" 
                  value={drinksPerWeek} onChange={(e) => setDrinksPerWeek(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <span className="font-mono font-bold text-lg w-8">{drinksPerWeek}</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1 block">Precio Promedio ($)</label>
              <input 
                type="number" 
                value={pricePerDrink} onChange={(e) => setPricePerDrink(parseInt(e.target.value) || 0)}
                className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg font-mono text-sm"
              />
            </div>
          </div>

          {/* Financial Impact Card */}
          <motion.div 
            className="bg-stone-900 text-white p-6 rounded-3xl shadow-xl relative overflow-hidden"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <DollarSign size={80} />
            </div>
            
            <div className="mb-6">
              <h4 className="text-stone-400 text-xs font-bold uppercase tracking-wider mb-1">Gasto Total Acumulado</h4>
              <div className="text-3xl font-extrabold text-emerald-400 tracking-tight">
                ${totalCost.toLocaleString()}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3 bg-white/10 p-3 rounded-xl">
                <TrendingUp className="text-emerald-400 shrink-0 mt-1" size={18} />
                <div>
                  <p className="text-xs text-stone-400 font-bold uppercase">Podrías haber comprado</p>
                  <p className="font-medium text-sm leading-snug">{getComparisonItem(totalCost)}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 bg-white/10 p-3 rounded-xl">
                <Calendar className="text-blue-400 shrink-0 mt-1" size={18} />
                <div>
                  <p className="text-xs text-stone-400 font-bold uppercase">Tiempo perdido</p>
                  <p className="font-medium text-sm leading-snug">
                    ~{Math.round(totalDrinks * 2 / 24)} días completos bebiendo o con resaca.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Body Infographic (8 cols) */}
        <div className="lg:col-span-8 bg-stone-50 rounded-3xl border border-stone-200 p-6 relative min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
          
          <h4 className="absolute top-6 left-6 font-bold text-stone-400 uppercase tracking-wider text-sm flex items-center gap-2">
            <AlertCircle size={16} /> Impacto Fisiológico Estimado
          </h4>

          {/* Body Silhouette SVG */}
          <div className="relative h-[500px] w-[300px]">
            <svg viewBox="0 0 200 500" className="w-full h-full drop-shadow-xl">
              <path 
                d="M100,20 C120,20 135,35 135,60 C135,80 125,95 100,95 C75,95 65,80 65,60 C65,35 80,20 100,20 Z 
                   M100,95 C110,95 140,110 150,130 C160,150 160,250 160,250 L140,250 L140,200 L130,300 L135,480 L105,480 L100,350 L95,480 L65,480 L70,300 L60,200 L60,250 L40,250 C40,250 40,150 50,130 C60,110 90,95 100,95 Z"
                fill="#E5E5E5"
                stroke="#D6D3D1"
                strokeWidth="2"
              />
            </svg>

            {/* Interactive Hotspots */}
            {activeEffects.map((effect) => (
              <motion.button
                key={effect.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.2 }}
                onClick={() => setSelectedEffect(effect)}
                className={`absolute w-6 h-6 -ml-3 -mt-3 rounded-full border-2 border-white shadow-md z-10 flex items-center justify-center
                  ${selectedEffect?.id === effect.id ? 'ring-4 ring-emerald-200 scale-125' : ''}
                  ${effect.severity === 'high' ? 'bg-red-500' : effect.severity === 'medium' ? 'bg-amber-500' : 'bg-yellow-400'}
                `}
                style={{ top: effect.position.top, left: effect.position.left }}
              >
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-inherit opacity-75"></span>
              </motion.button>
            ))}
          </div>

          {/* Info Popup / Panel */}
          <AnimatePresence mode="wait">
            {selectedEffect ? (
              <motion.div 
                key={selectedEffect.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-6 left-6 right-6 bg-white p-6 rounded-2xl shadow-xl border border-stone-100 z-20"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                      {selectedEffect.name}
                      <span className={`text-xs px-2 py-1 rounded-full text-white uppercase tracking-wider
                        ${selectedEffect.severity === 'high' ? 'bg-red-500' : selectedEffect.severity === 'medium' ? 'bg-amber-500' : 'bg-yellow-500'}
                      `}>
                        Riesgo {selectedEffect.severity === 'high' ? 'Alto' : selectedEffect.severity === 'medium' ? 'Medio' : 'Bajo'}
                      </span>
                    </h5>
                    <p className="text-stone-600 mt-2 leading-relaxed">{selectedEffect.description}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedEffect(null)}
                    className="text-stone-400 hover:text-stone-600 p-1"
                  >
                    ✕
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="absolute bottom-6 text-center w-full text-stone-400 text-sm font-medium animate-pulse">
                Toca los puntos en el cuerpo para ver los efectos
              </div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
