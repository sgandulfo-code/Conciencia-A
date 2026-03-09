import React from 'react';
import { motion } from 'motion/react';
import { AgeGroupData } from '../data/content';

interface SplitScreenProps {
  data: AgeGroupData;
}

export function SplitScreen({ data }: SplitScreenProps) {
  return (
    <div className="flex flex-col lg:flex-row w-full min-h-[600px] rounded-3xl overflow-hidden shadow-2xl">
      {/* Left Side: Alcohol Risks */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className={`flex-1 p-8 lg:p-12 ${data.alcohol.theme} flex flex-col justify-center relative overflow-hidden`}
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-orange-600" />
        
        <h3 className="text-3xl font-bold mb-4 tracking-tight">{data.alcohol.title}</h3>
        <p className="text-lg opacity-90 mb-8 font-medium leading-relaxed">
          {data.alcohol.description}
        </p>

        <div className="space-y-6">
          {data.alcohol.items.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="flex items-start gap-4 p-4 rounded-xl bg-black/20 backdrop-blur-sm border border-white/5"
            >
              <div className="p-3 rounded-lg bg-red-500/20 text-red-200 shrink-0">
                <item.icon size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">{item.text}</h4>
                <p className="text-sm opacity-80 leading-relaxed">{item.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Right Side: Healthy Alternative */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className={`flex-1 p-8 lg:p-12 ${data.alternative.theme} flex flex-col justify-center relative overflow-hidden`}
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-cyan-500" />

        <h3 className="text-3xl font-bold mb-4 tracking-tight">{data.alternative.title}</h3>
        <p className="text-lg opacity-90 mb-8 font-medium leading-relaxed">
          {data.alternative.description}
        </p>

        <div className="space-y-6">
          {data.alternative.items.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="flex items-start gap-4 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-white/40 shadow-sm"
            >
              <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-700 shrink-0">
                <item.icon size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">{item.text}</h4>
                <p className="text-sm opacity-80 leading-relaxed">{item.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
