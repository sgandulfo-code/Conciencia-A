import React from 'react';
import { motion } from 'motion/react';
import { recoveryTimeline } from '../data/recovery';
import { Heart, Clock, ArrowDown } from 'lucide-react';

export function RecoveryTimeline() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-stone-900 mb-3">Tu Cuerpo se Recupera</h3>
        <p className="text-stone-600">Descubre los beneficios inmediatos y a largo plazo de reducir o eliminar el consumo.</p>
      </div>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-emerald-200 -translate-x-1/2 hidden md:block" />
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-emerald-200 -translate-x-1/2 md:hidden" />

        <div className="space-y-12">
          {recoveryTimeline.map((stage, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Content Card */}
              <div className="flex-1 w-full md:w-auto pl-16 md:pl-0">
                <div className="bg-white p-6 rounded-2xl shadow-md border border-stone-100 hover:shadow-lg transition-shadow relative">
                  {/* Arrow for Desktop */}
                  <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-b border-l border-stone-100 transform rotate-45 ${index % 2 === 0 ? '-left-2' : '-right-2'}`} />
                  
                  <div className="flex items-center gap-3 mb-2">
                    <Clock size={18} className="text-emerald-500" />
                    <span className="text-sm font-bold text-emerald-600 uppercase tracking-wider">{stage.time}</span>
                  </div>
                  <h4 className="text-xl font-bold text-stone-800 mb-2">{stage.benefit}</h4>
                  <p className="text-stone-600 leading-relaxed text-sm">{stage.description}</p>
                </div>
              </div>

              {/* Center Icon */}
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 border-4 border-white shadow-sm z-10">
                <Heart size={20} className="text-emerald-600 fill-emerald-600" />
              </div>

              {/* Spacer for layout balance */}
              <div className="flex-1 hidden md:block" />
            </motion.div>
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <div className="bg-emerald-50 text-emerald-700 px-6 py-3 rounded-full flex items-center gap-2 font-medium animate-bounce">
            <ArrowDown size={20} />
            <span>El mejor momento para empezar es hoy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
