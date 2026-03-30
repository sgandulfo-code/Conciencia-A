import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, ArrowRight, ShieldAlert, Phone, Loader2, MapPin } from 'lucide-react';
import { searchHelpByLocation } from '../utils/searchHelp';

const questions = [
  "¿Has ocultado botellas vacías o envases para que nadie en tu casa note cuánto tomaste realmente?",
  "¿Has minimizado o mentido sobre la cantidad que bebiste cuando tu pareja, familia o amigos te preguntaron?",
  "¿Has tomado alcohol a solas antes de ir a un evento social (la 'previa' secreta) para asegurarte un nivel de alcohol antes de llegar?",
  "¿Has evitado ir a cenas, reuniones o eventos porque sabías que no iban a servir alcohol?",
  "¿Te has despertado con ansiedad extrema, el corazón acelerado y revisando tu celular con terror por lo que pudiste haber hecho la noche anterior?",
  "¿Utilizas el alcohol sistemáticamente como 'premio' después de un día difícil o como tu principal herramienta para lidiar con el estrés?",
  "¿Has intentado dejar de tomar por un tiempo para 'probarte que puedes', y has fallado o contado los días con desesperación para volver a hacerlo?"
];

export function RealityCheck() {
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [yesCount, setYesCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [isLocating, setIsLocating] = useState<'groups' | 'professionals' | null>(null);

  const handleAnswer = (isYes: boolean) => {
    if (isYes) setYesCount(prev => prev + 1);
    
    if (currentQ < questions.length - 1) {
      setCurrentQ(prev => prev + 1);
    } else {
      setFinished(true);
    }
  };

  const getResult = () => {
    if (yesCount === 0) {
      return {
        title: "Transparencia",
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        text: "Tus respuestas no muestran patrones de ocultamiento o dependencia emocional evidente hacia el alcohol. Mantén esa honestidad contigo mismo."
      };
    }
    if (yesCount <= 2) {
      return {
        title: "Señales de Alerta",
        color: "text-amber-500",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
        text: "El alcohol está empezando a generar comportamientos de ocultamiento o dependencia emocional. Presta atención a estos hábitos antes de que se conviertan en un problema mayor."
      };
    }
    if (yesCount <= 4) {
      return {
        title: "Patrón de Riesgo Alto",
        color: "text-orange-500",
        bg: "bg-orange-500/10",
        border: "border-orange-500/20",
        text: "El alcohol está dictando tus decisiones sociales y emocionales. Estás cruzando la línea entre el consumo social y la necesidad. Es momento de hacer una pausa seria y reevaluar tu relación con la bebida."
      };
    }
    return {
      title: "Alerta Crítica",
      color: "text-rose-500",
      bg: "bg-rose-500/10",
      border: "border-rose-500/20",
      text: "Tus respuestas indican que el alcohol controla gran parte de tus decisiones, generando mentiras, ansiedad y dependencia emocional. Esto no es un diagnóstico médico, pero es un reflejo claro de que tus hábitos actuales son destructivos. Necesitas apoyo para recuperar el control."
    };
  };

  if (!started) {
    return (
      <div className="bg-stone-950 rounded-3xl p-8 md:p-12 text-stone-200 shadow-2xl border border-stone-800 max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-6 text-rose-500">
          <ShieldAlert size={40} />
          <h2 className="text-3xl font-bold tracking-tight text-white">Test de Honestidad</h2>
        </div>
        
        <div className="space-y-6 text-lg text-stone-400 mb-10">
          <p>
            Las siguientes preguntas están diseñadas para incomodarte y mostrarte realidades que quizás estás ocultando. 
            Responde con absoluta honestidad. Nadie más está mirando ni guardando tus respuestas.
          </p>
          <div className="bg-stone-900 p-4 rounded-xl border border-stone-800 text-sm flex gap-3 items-start">
            <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={20} />
            <p>
              <strong className="text-stone-300">Aviso Legal:</strong> Esta herramienta es un ejercicio de auto-reflexión personal y conductual. 
              <span className="text-white font-medium"> NO constituye un test médico, psicológico ni un diagnóstico clínico. </span> 
              Si sientes que tu salud está en riesgo, contacta a un profesional médico.
            </p>
          </div>
        </div>

        <button 
          onClick={() => setStarted(true)}
          className="w-full sm:w-auto px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-lg"
        >
          Estoy listo para ser honesto
          <ArrowRight size={20} />
        </button>
      </div>
    );
  }

  if (finished) {
    const result = getResult();
    return (
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`rounded-3xl p-8 md:p-12 border ${result.border} ${result.bg} backdrop-blur-sm`}
        >
          <h3 className={`text-3xl font-black mb-6 ${result.color} uppercase tracking-tight`}>
            {result.title}
          </h3>
          <p className="text-xl text-stone-800 font-medium leading-relaxed mb-8">
            {result.text}
          </p>
          
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm mt-8">
            <h4 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
              <Phone className="text-blue-600" size={24} />
              No estás solo
            </h4>
            <p className="text-stone-600 mb-6">
              Reconocer un patrón destructivo es el paso más valiente. Existen profesionales capacitados para ayudarte sin juzgarte.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => searchHelpByLocation('groups', () => setIsLocating('groups'), () => setIsLocating(null))}
                disabled={isLocating !== null}
                className="flex-1 px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-xl transition-colors text-center flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isLocating === 'groups' ? <Loader2 className="animate-spin" size={20} /> : <MapPin size={20} />}
                Buscar Grupos de Apoyo
              </button>
              <button 
                onClick={() => searchHelpByLocation('professionals', () => setIsLocating('professionals'), () => setIsLocating(null))}
                disabled={isLocating !== null}
                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors text-center flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isLocating === 'professionals' ? <Loader2 className="animate-spin" size={20} /> : <MapPin size={20} />}
                Contactar a un Profesional
              </button>
            </div>
          </div>
          
          <button 
            onClick={() => {
              setStarted(false);
              setCurrentQ(0);
              setYesCount(0);
              setFinished(false);
            }}
            className="mt-8 text-stone-500 hover:text-stone-800 font-medium underline underline-offset-4"
          >
            Volver a realizar el ejercicio
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-stone-950 rounded-3xl p-8 md:p-12 text-stone-200 shadow-2xl border border-stone-800 max-w-3xl mx-auto min-h-[400px] flex flex-col">
      <div className="mb-8 flex justify-between items-center text-sm font-medium text-stone-500">
        <span>Pregunta {currentQ + 1} de {questions.length}</span>
        <div className="flex gap-1">
          {questions.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 w-6 rounded-full ${idx === currentQ ? 'bg-rose-500' : idx < currentQ ? 'bg-stone-700' : 'bg-stone-800'}`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="flex-grow flex items-center mb-10"
        >
          <h3 className="text-2xl md:text-3xl font-medium leading-tight text-white">
            {questions[currentQ]}
          </h3>
        </motion.div>
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
        <button 
          onClick={() => handleAnswer(false)}
          className="px-6 py-4 bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 font-bold rounded-xl transition-colors text-lg"
        >
          NO
        </button>
        <button 
          onClick={() => handleAnswer(true)}
          className="px-6 py-4 bg-rose-900/30 hover:bg-rose-900/50 border border-rose-800/50 text-rose-400 hover:text-rose-300 font-bold rounded-xl transition-colors text-lg"
        >
          SÍ
        </button>
      </div>
    </div>
  );
}
