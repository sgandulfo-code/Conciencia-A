export type BodyPart = 'brain' | 'heart' | 'liver' | 'stomach' | 'skin' | 'pancreas' | 'immune';

export interface BodyEffect {
  id: BodyPart;
  name: string;
  description: string;
  minYears: number; // Minimum years of consumption to show this effect
  minDrinksPerWeek: number; // Minimum intensity
  severity: 'low' | 'medium' | 'high';
  position: { top: string; left: string }; // Percentage position on the body silhouette
}

export const bodyEffects: BodyEffect[] = [
  {
    id: 'skin',
    name: 'Piel y Rostro',
    description: 'Deshidratación crónica, envejecimiento prematuro, rojeces y pérdida de elasticidad.',
    minYears: 1,
    minDrinksPerWeek: 5,
    severity: 'low',
    position: { top: '12%', left: '50%' }
  },
  {
    id: 'brain',
    name: 'Cerebro',
    description: 'Pérdida de memoria, dificultad de concentración, ansiedad y reducción de materia gris.',
    minYears: 2,
    minDrinksPerWeek: 10,
    severity: 'high',
    position: { top: '5%', left: '50%' }
  },
  {
    id: 'stomach',
    name: 'Estómago',
    description: 'Gastritis crónica, reflujo ácido y menor absorción de nutrientes esenciales.',
    minYears: 3,
    minDrinksPerWeek: 8,
    severity: 'medium',
    position: { top: '35%', left: '50%' }
  },
  {
    id: 'liver',
    name: 'Hígado',
    description: 'Acumulación de grasa (esteatosis), inflamación y riesgo progresivo de cirrosis irreversible.',
    minYears: 5,
    minDrinksPerWeek: 12,
    severity: 'high',
    position: { top: '40%', left: '45%' }
  },
  {
    id: 'heart',
    name: 'Corazón',
    description: 'Hipertensión arterial, arritmias y debilitamiento del músculo cardíaco.',
    minYears: 8,
    minDrinksPerWeek: 15,
    severity: 'high',
    position: { top: '25%', left: '55%' }
  },
  {
    id: 'pancreas',
    name: 'Páncreas',
    description: 'Inflamación dolorosa (pancreatitis) y problemas para regular el azúcar en sangre.',
    minYears: 10,
    minDrinksPerWeek: 20,
    severity: 'high',
    position: { top: '38%', left: '55%' }
  },
  {
    id: 'immune',
    name: 'Sistema Inmune',
    description: 'Defensas bajas, mayor propensión a infecciones y recuperación lenta de enfermedades.',
    minYears: 1,
    minDrinksPerWeek: 10,
    severity: 'medium',
    position: { top: '20%', left: '50%' }
  }
];
