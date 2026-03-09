import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { contentData, AgeGroup } from './data/content';
import { SplitScreen } from './components/SplitScreen';
import { ConsumptionTest } from './components/ConsumptionTest';
import { MythBuster } from './components/MythBuster';
import { RecoveryTimeline } from './components/RecoveryTimeline';
import { CostCalculator } from './components/CostCalculator';
import { DrinkSimulator } from './components/DrinkSimulator';
import { CumulativeImpact } from './components/CumulativeImpact';
import { FaceAgingSimulator } from './components/FaceAgingSimulator';
import { Info, ShieldCheck, Activity, BookOpen, Brain, Clock, Calculator, Wine, History, UserPlus } from 'lucide-react';

type ViewMode = 'info' | 'test' | 'myths' | 'recovery' | 'calculator' | 'simulator' | 'history' | 'face';

export default function App() {
  const [selectedGroup, setSelectedGroup] = useState<AgeGroup>('adolescentes');
  const [viewMode, setViewMode] = useState<ViewMode>('info');

  const currentData = contentData.find(d => d.id === selectedGroup)!;

  const renderContent = () => {
    switch (viewMode) {
      case 'info':
        return <SplitScreen data={currentData} />;
      case 'test':
        return <ConsumptionTest ageGroup={selectedGroup} onReset={() => setViewMode('info')} />;
      case 'myths':
        return <MythBuster />;
      case 'recovery':
        return <RecoveryTimeline />;
      case 'calculator':
        return <CostCalculator />;
      case 'simulator':
        return <DrinkSimulator />;
      case 'history':
        return <CumulativeImpact />;
      case 'face':
        return <FaceAgingSimulator />;
      default:
        return <SplitScreen data={currentData} />;
    }
  };

  const getIntroText = () => {
    switch (viewMode) {
      case 'info':
        return {
          title: <>El impacto del alcohol <br className="hidden sm:block" /><span className="text-emerald-600">cambia con la edad</span></>,
          desc: "Selecciona tu rango de edad para descubrir cómo afecta el consumo a tu cuerpo y mente, y explora alternativas que potencian tu bienestar."
        };
      case 'test':
        return {
          title: <>Evalúa tu nivel de riesgo <br className="hidden sm:block" /><span className="text-emerald-600">en menos de 1 minuto</span></>,
          desc: "Responde 3 preguntas simples para entender si tu consumo actual representa un riesgo para tu salud según tu edad."
        };
      case 'myths':
        return {
          title: <>Derribando mitos <br className="hidden sm:block" /><span className="text-indigo-600">sobre el alcohol</span></>,
          desc: "Descubre la verdad científica detrás de las creencias populares que ponen en riesgo tu salud."
        };
      case 'recovery':
        return {
          title: <>Tu cuerpo tiene <br className="hidden sm:block" /><span className="text-emerald-600">un poder increíble</span></>,
          desc: "Mira cómo se regenera tu organismo desde el momento en que decides dejar de beber."
        };
      case 'calculator':
        return {
          title: <>El costo real <br className="hidden sm:block" /><span className="text-emerald-600">de cada trago</span></>,
          desc: "Calcula cuánto dinero y calorías podrías ahorrar al año reduciendo tu consumo."
        };
      case 'simulator':
        return {
          title: <>Simulador de Efectos <br className="hidden sm:block" /><span className="text-amber-600">en tiempo real</span></>,
          desc: "Visualiza cómo diferentes cantidades de alcohol afectan tu capacidad de conducir y tu estado físico."
        };
      case 'history':
        return {
          title: <>Tu Historial <br className="hidden sm:block" /><span className="text-rose-600">Acumulado</span></>,
          desc: "Descubre el impacto a largo plazo de tus hábitos en tu economía y en tus órganos vitales."
        };
      case 'face':
        return {
          title: <>El Espejo del <br className="hidden sm:block" /><span className="text-purple-600">Futuro</span></>,
          desc: "Una simulación visual de cómo el alcohol acelera el envejecimiento y afecta tu apariencia física."
        };
    }
  };

  const intro = getIntroText();

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 font-sans selection:bg-emerald-200 selection:text-emerald-900 pb-20">
      
      {/* Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setViewMode('info')}>
            <div className="bg-emerald-600 p-2 rounded-lg text-white">
              <ShieldCheck size={24} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-stone-800 hidden sm:block">Conciencia Alcohol</h1>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden lg:flex gap-1">
            {[
              { id: 'info', label: 'Info', icon: BookOpen },
              { id: 'test', label: 'Test', icon: Activity },
              { id: 'simulator', label: 'Simulador', icon: Wine },
              { id: 'history', label: 'Historial', icon: History },
              { id: 'face', label: 'Espejo', icon: UserPlus },
              { id: 'myths', label: 'Mitos', icon: Brain },
              { id: 'recovery', label: 'Salud', icon: Clock },
              { id: 'calculator', label: 'Costo', icon: Calculator },
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => setViewMode(item.id as ViewMode)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${viewMode === item.id ? 'bg-emerald-50 text-emerald-700' : 'text-stone-500 hover:text-stone-900'}`}
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button Placeholder (Simplified for this demo, using bottom nav instead) */}
          <div className="lg:hidden text-sm font-medium text-stone-500">
            Tu salud, tu decisión
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        
        {/* Intro Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 mb-4 tracking-tight">
            {intro.title}
          </h2>
          <p className="text-lg text-stone-600 leading-relaxed">
            {intro.desc}
          </p>
        </div>

        {/* Age Selector (Only show for Info and Test modes where age matters most) */}
        {(viewMode === 'info' || viewMode === 'test') && (
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {contentData.map((group) => (
              <button
                key={group.id}
                onClick={() => setSelectedGroup(group.id)}
                className={`
                  px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ease-out
                  ${selectedGroup === group.id 
                    ? 'bg-stone-900 text-white shadow-lg scale-105 ring-2 ring-stone-900 ring-offset-2' 
                    : 'bg-white text-stone-600 hover:bg-stone-50 hover:text-stone-900 shadow-sm border border-stone-200'}
                `}
              >
                <span className="block text-[10px] uppercase tracking-wider opacity-70 mb-0.5">{group.range}</span>
                {group.label}
              </button>
            ))}
          </div>
        )}

        {/* Main Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>

        {/* Footer Info */}
        <div className="mt-16 bg-white rounded-2xl p-8 border border-stone-200 shadow-sm flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-full shrink-0">
            <Info size={32} />
          </div>
          <div>
            <h4 className="text-lg font-bold text-stone-900 mb-2">¿Necesitas ayuda?</h4>
            <p className="text-stone-600 max-w-2xl">
              Si tú o alguien que conoces tiene problemas con el consumo de alcohol, no están solos. 
              Existen profesionales y grupos de apoyo dispuestos a ayudar.
            </p>
          </div>
          <div className="md:ml-auto">
             <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-md shadow-blue-200">
               Buscar Ayuda Profesional
             </button>
          </div>
        </div>

      </main>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 pb-safe z-50">
        <div className="flex justify-around items-center h-16 px-2">
          {[
            { id: 'info', label: 'Info', icon: BookOpen },
            { id: 'test', label: 'Test', icon: Activity },
            { id: 'simulator', label: 'Vaso', icon: Wine },
            { id: 'face', label: 'Espejo', icon: UserPlus },
            { id: 'history', label: 'Historial', icon: History },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setViewMode(item.id as ViewMode)}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${viewMode === item.id ? 'text-emerald-600' : 'text-stone-400'}`}
            >
              <item.icon size={20} className={viewMode === item.id ? 'fill-current opacity-20' : ''} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
