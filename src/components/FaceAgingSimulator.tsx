import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, AlertTriangle, Info } from 'lucide-react';

export function FaceAgingSimulator() {
  const [years, setYears] = useState(0);

  // Calculate effect intensities based on years (0-20)
  const intensity = years / 20; // 0 to 1 normalized

  // 1. Skin Tone Changes
  const grayscale = intensity * 60; // Up to 60% desaturated
  const sepia = intensity * 40; // Up to 40% sepia (liverish tone)
  const brightness = 100 - (intensity * 15); // Skin gets duller/darker
  const contrast = 100 + (intensity * 25); // Higher contrast highlights wrinkles/imperfections

  // 2. Specific Conditions
  // Redness (Rosacea): Starts appearing after year 3, concentrates on nose/cheeks
  const rednessOpacity = years > 3 ? Math.min(((years - 3) / 17) * 0.5, 0.5) : 0;
  
  // Dark Circles: Starts early, gets darker
  const darkCirclesOpacity = Math.min(intensity * 0.7, 0.7);

  // Jaundice (Yellowing): Late stage liver stress
  const jaundiceOpacity = years > 10 ? Math.min(((years - 10) / 10) * 0.4, 0.4) : 0;

  // Texture (Roughness): Increases steadily
  const textureOpacity = years > 5 ? Math.min(((years - 5) / 15) * 0.6, 0.6) : 0;

  const getStageInfo = (y: number) => {
    if (y === 0) return {
      title: "Tu Rostro Actual",
      desc: "Piel hidratada, tono uniforme y producción normal de colágeno."
    };
    if (y <= 5) return {
      title: "Primeros Signos (1-5 años)",
      desc: "Deshidratación visible. La piel pierde brillo y aparecen ojeras más marcadas debido a la mala calidad del sueño."
    };
    if (y <= 10) return {
      title: "Inflamación Crónica (5-10 años)",
      desc: "Aparición de rojeces (rosácea) y 'arañas vasculares' por la dilatación de capilares. La cara puede verse hinchada."
    };
    if (y <= 15) return {
      title: "Envejecimiento Acelerado (10-15 años)",
      desc: "Pérdida significativa de elasticidad. Las arrugas se profundizan prematuramente. Tono de piel desigual."
    };
    return {
      title: "Daño Acumulado (+15 años)",
      desc: "Riesgo de rinofima (nariz bulbosa), piel muy delgada y propensa a hematomas. Apariencia de 10-15 años mayor a la edad real."
    };
  };

  const stage = getStageInfo(years);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h3 className="text-3xl font-bold text-stone-900 mb-3">El Espejo del Futuro</h3>
        <p className="text-stone-600">Desliza para ver cómo el consumo frecuente de alcohol acelera el envejecimiento y afecta tu apariencia.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Face Visualization */}
        <div className="relative aspect-square bg-stone-200 rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
          
          {/* Base Image */}
          <img 
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop" 
            alt="Rostro base"
            className="w-full h-full object-cover transition-all duration-300 transform group-hover:scale-105"
            style={{
              filter: `
                grayscale(${grayscale}%) 
                sepia(${sepia}%) 
                brightness(${brightness}%)
                contrast(${contrast}%)
              `
            }}
            referrerPolicy="no-referrer"
          />

          {/* LAYER 1: Dark Circles (Ojeras) */}
          {/* Positioned roughly over eyes for this specific portrait */}
          <div 
            className="absolute inset-0 pointer-events-none mix-blend-multiply transition-opacity duration-500"
            style={{
              background: `
                radial-gradient(circle at 38% 42%, rgba(40, 20, 10, 0.6) 0%, transparent 15%),
                radial-gradient(circle at 62% 42%, rgba(40, 20, 10, 0.6) 0%, transparent 15%)
              `,
              opacity: darkCirclesOpacity
            }}
          />

          {/* LAYER 2: Redness/Rosacea (Cheeks & Nose) */}
          <div 
            className="absolute inset-0 pointer-events-none mix-blend-multiply transition-opacity duration-500"
            style={{
              background: `
                radial-gradient(ellipse at 50% 55%, rgba(220, 50, 50, 0.5) 0%, transparent 25%),
                radial-gradient(circle at 30% 60%, rgba(200, 40, 40, 0.4) 0%, transparent 20%),
                radial-gradient(circle at 70% 60%, rgba(200, 40, 40, 0.4) 0%, transparent 20%)
              `,
              opacity: rednessOpacity
            }}
          />

          {/* LAYER 3: Jaundice (Yellowing) */}
          <div 
            className="absolute inset-0 pointer-events-none mix-blend-color transition-opacity duration-500 bg-yellow-600"
            style={{ opacity: jaundiceOpacity }}
          />

          {/* LAYER 4: Texture (Veins/Pores/Noise) */}
          <div 
            className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-500"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.6'/%3E%3C/svg%3E")`,
              opacity: textureOpacity
            }}
          />

          {/* Label Overlay */}
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-white/10">
            +{years} años de consumo
          </div>
        </div>

        {/* Controls & Info */}
        <div className="space-y-8">
          
          <div className="bg-white p-6 rounded-3xl shadow-lg border border-stone-100">
            <div className="flex justify-between items-center mb-4">
              <label className="font-bold text-stone-700 flex items-center gap-2">
                <User size={20} className="text-stone-400" />
                Tiempo transcurrido
              </label>
              <span className="text-2xl font-bold text-emerald-600 font-mono">+{years} Años</span>
            </div>
            
            <input 
              type="range" 
              min="0" 
              max="20" 
              step="1"
              value={years}
              onChange={(e) => setYears(parseInt(e.target.value))}
              className="w-full h-3 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900 mb-2"
            />
            <div className="flex justify-between text-xs text-stone-400">
              <span>Hoy</span>
              <span>10 años</span>
              <span>20 años</span>
            </div>
          </div>

          <motion.div 
            key={years}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-stone-50 p-6 rounded-3xl border border-stone-200"
          >
            <h4 className="text-xl font-bold text-stone-900 mb-2 flex items-center gap-2">
              {years > 0 ? <AlertTriangle className="text-amber-500" size={24} /> : <Info className="text-blue-500" size={24} />}
              {stage.title}
            </h4>
            <p className="text-stone-600 leading-relaxed">
              {stage.desc}
            </p>
          </motion.div>

          {years > 0 && (
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 text-sm text-emerald-800">
              <strong>¡Buenas noticias!</strong> Muchos de estos efectos dermatológicos son reversibles si se reduce el consumo a tiempo. La piel es un órgano con gran capacidad de regeneración.
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
