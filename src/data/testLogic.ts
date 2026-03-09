import { AgeGroup } from './content';

export interface Question {
  id: number;
  text: string;
  options: { value: number; label: string }[];
}

export const questions: Question[] = [
  {
    id: 1,
    text: "¿Con qué frecuencia consumes bebidas alcohólicas?",
    options: [
      { value: 0, label: "Nunca" },
      { value: 1, label: "Una vez al mes o menos" },
      { value: 2, label: "2 a 4 veces al mes" },
      { value: 3, label: "2 a 3 veces a la semana" },
      { value: 4, label: "4 o más veces a la semana" }
    ]
  },
  {
    id: 2,
    text: "¿Cuántas bebidas alcohólicas sueles tomar en un día de consumo normal?",
    options: [
      { value: 0, label: "1 o 2" },
      { value: 1, label: "3 o 4" },
      { value: 2, label: "5 o 6" },
      { value: 3, label: "7 a 9" },
      { value: 4, label: "10 o más" }
    ]
  },
  {
    id: 3,
    text: "¿Con qué frecuencia tomas 6 o más bebidas en una sola ocasión?",
    options: [
      { value: 0, label: "Nunca" },
      { value: 1, label: "Menos de una vez al mes" },
      { value: 2, label: "Mensualmente" },
      { value: 3, label: "Semanalmente" },
      { value: 4, label: "A diario o casi a diario" }
    ]
  }
];

export interface Result {
  level: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  color: string;
}

export function calculateResult(score: number, ageGroup: AgeGroup): Result {
  // Logic specific to age groups
  
  if (ageGroup === 'adolescentes') {
    if (score === 0) {
      return {
        level: 'low',
        title: '¡Excelente decisión!',
        description: 'Mantenerte libre de alcohol es la mejor opción para tu desarrollo cerebral y físico. Sigue así.',
        color: 'bg-emerald-500'
      };
    } else {
      // Any consumption in adolescents is considered high risk/problematic in this educational context
      return {
        level: 'high',
        title: 'Alto Riesgo',
        description: 'Tu cerebro está en desarrollo. Cualquier consumo de alcohol a tu edad interfiere con tu memoria, aprendizaje y control emocional. Es ilegal y peligroso.',
        color: 'bg-red-600'
      };
    }
  }

  if (ageGroup === 'mayores') {
    // Stricter thresholds for seniors
    if (score <= 2) {
      return {
        level: 'low',
        title: 'Consumo de Bajo Riesgo',
        description: 'Parece que tienes un consumo moderado. Recuerda siempre consultar con tu médico sobre interacciones con medicamentos.',
        color: 'bg-emerald-500'
      };
    } else if (score <= 4) {
      return {
        level: 'medium',
        title: 'Consumo de Riesgo',
        description: 'A tu edad, el metabolismo es más lento. Esta cantidad podría estar afectando tu equilibrio, presión arterial o medicación.',
        color: 'bg-amber-500'
      };
    } else {
      return {
        level: 'high',
        title: 'Consumo Problemático',
        description: 'Este nivel de consumo es peligroso para tu salud. Aumenta drásticamente el riesgo de caídas, confusión y problemas cardíacos.',
        color: 'bg-red-600'
      };
    }
  }

  // Adults and Young Adults (Standard simplified logic)
  if (score <= 3) {
    return {
      level: 'low',
      title: 'Consumo de Bajo Riesgo',
      description: 'Tu consumo parece estar dentro de límites de bajo riesgo. Mantén la moderación y evita el consumo explosivo.',
      color: 'bg-emerald-500'
    };
  } else if (score <= 5) {
    return {
      level: 'medium',
      title: 'Consumo de Riesgo',
      description: 'Estás en una zona de riesgo. Podrías estar experimentando efectos negativos en tu salud o vida social sin darte cuenta.',
      color: 'bg-amber-500'
    };
  } else {
    return {
      level: 'high',
      title: 'Posible Dependencia',
      description: 'Tu patrón de consumo es alto y puede estar dañando tu salud física y mental. Te recomendamos buscar asesoramiento profesional.',
      color: 'bg-red-600'
    };
  }
}
