import React, { useState } from 'react';
import { motion } from 'motion/react';
import { myths } from '../data/myths';
import { HelpCircle, Check, X } from 'lucide-react';

export function MythBuster() {
  const [flippedId, setFlippedId] = useState<number | null>(null);

  const handleFlip = (id: number) => {
    setFlippedId(flippedId === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h3 className="text-3xl font-bold text-stone-900 mb-3">Mitos vs. Realidad</h3>
        <p className="text-stone-600">Toca una tarjeta para descubrir la verdad científica detrás de las creencias populares.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {myths.map((myth) => (
          <div key={myth.id} className="h-64 perspective-1000 cursor-pointer group" onClick={() => handleFlip(myth.id)}>
            <motion.div
              className="relative w-full h-full transition-all duration-500"
              style={{ transformStyle: 'preserve-3d' }}
              animate={{ rotateY: flippedId === myth.id ? 180 : 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
            >
              {/* Front Side */}
              <div 
                className="absolute w-full h-full bg-white rounded-2xl shadow-lg border border-stone-200 p-8 flex flex-col items-center justify-center text-center hover:shadow-xl transition-shadow"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="bg-indigo-100 p-4 rounded-full mb-4 text-indigo-600">
                  <HelpCircle size={32} />
                </div>
                <h4 className="text-xl font-bold text-stone-800 leading-snug">"{myth.statement}"</h4>
                <span className="mt-4 text-sm text-stone-400 font-medium uppercase tracking-wider">Toca para revelar</span>
              </div>

              {/* Back Side */}
              <div 
                className={`absolute w-full h-full rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center text-center ${myth.isTrue ? 'bg-emerald-600 text-white' : 'bg-red-500 text-white'}`}
                style={{ 
                  transform: 'rotateY(180deg)',
                  backfaceVisibility: 'hidden' 
                }}
              >
                <div className="mb-4">
                  {myth.isTrue ? <Check size={48} className="bg-white/20 rounded-full p-2" /> : <X size={48} className="bg-white/20 rounded-full p-2" />}
                </div>
                <h4 className="text-2xl font-bold mb-2">{myth.isTrue ? 'VERDADERO' : 'FALSO'}</h4>
                <p className="text-white/90 leading-relaxed font-medium">{myth.reality}</p>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
