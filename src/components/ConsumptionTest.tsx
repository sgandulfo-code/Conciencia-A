import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { questions, calculateResult, Result } from '../data/testLogic';
import { AgeGroup } from '../data/content';
import { CheckCircle, AlertTriangle, XCircle, RefreshCcw, ArrowRight } from 'lucide-react';

interface ConsumptionTestProps {
  ageGroup: AgeGroup;
  onReset: () => void;
}

export function ConsumptionTest({ ageGroup, onReset }: ConsumptionTestProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetTest = () => {
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setShowResult(false);
    onReset();
  };

  const totalScore = answers.reduce((a, b) => a + b, 0);
  const result = showResult ? calculateResult(totalScore, ageGroup) : null;

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[500px] flex flex-col">
      <div className="bg-stone-900 p-6 text-white flex justify-between items-center">
        <h3 className="text-xl font-bold">Test de Consumo</h3>
        <span className="text-sm opacity-70 bg-white/10 px-3 py-1 rounded-full">
          {ageGroup.charAt(0).toUpperCase() + ageGroup.slice(1)}
        </span>
      </div>

      <div className="flex-1 p-8 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <span className="text-sm font-bold text-emerald-600 tracking-wider uppercase">
                  Pregunta {currentQuestionIndex + 1} de {questions.length}
                </span>
                <h4 className="text-2xl font-bold text-stone-800 leading-tight">
                  {questions[currentQuestionIndex].text}
                </h4>
              </div>

              <div className="grid gap-3">
                {questions[currentQuestionIndex].options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className="w-full text-left p-4 rounded-xl border-2 border-stone-100 hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-200 flex items-center justify-between group"
                  >
                    <span className="font-medium text-stone-700 group-hover:text-emerald-900">
                      {option.label}
                    </span>
                    <ArrowRight className="opacity-0 group-hover:opacity-100 text-emerald-600 transition-opacity" size={20} />
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-8"
            >
              <div className={`inline-flex p-6 rounded-full ${result?.color} text-white shadow-lg mb-4`}>
                {result?.level === 'low' && <CheckCircle size={48} />}
                {result?.level === 'medium' && <AlertTriangle size={48} />}
                {result?.level === 'high' && <XCircle size={48} />}
              </div>

              <div className="space-y-4">
                <h3 className={`text-3xl font-extrabold ${result?.level === 'high' ? 'text-red-600' : result?.level === 'medium' ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {result?.title}
                </h3>
                <p className="text-lg text-stone-600 leading-relaxed max-w-lg mx-auto">
                  {result?.description}
                </p>
              </div>

              <div className="pt-8 border-t border-stone-100">
                <button
                  onClick={resetTest}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-stone-900 text-white rounded-xl font-semibold hover:bg-stone-800 transition-colors"
                >
                  <RefreshCcw size={20} />
                  Volver al Inicio
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {!showResult && (
        <div className="h-2 bg-stone-100 w-full">
          <motion.div 
            className="h-full bg-emerald-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
          />
        </div>
      )}
    </div>
  );
}
