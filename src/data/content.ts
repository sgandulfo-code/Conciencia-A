import { Brain, Heart, AlertTriangle, Car, Frown, Zap, Smile, Users, DollarSign, Activity } from 'lucide-react';

export type AgeGroup = 'adolescentes' | 'jovenes' | 'adultos' | 'mayores';

export interface ContentSection {
  title: string;
  description: string;
  items: {
    icon: any;
    text: string;
    detail: string;
  }[];
  theme: string;
}

export interface AgeGroupData {
  id: AgeGroup;
  label: string;
  range: string;
  alcohol: ContentSection;
  alternative: ContentSection;
}

export const contentData: AgeGroupData[] = [
  {
    id: 'adolescentes',
    label: 'Adolescentes',
    range: '12 - 18 años',
    alcohol: {
      title: 'Riesgos del Alcohol',
      description: 'El cerebro está en pleno desarrollo. El alcohol interfiere drásticamente en este proceso.',
      theme: 'bg-red-950 text-red-100',
      items: [
        {
          icon: Brain,
          text: 'Daño Cerebral Irreversible',
          detail: 'Afecta la memoria, el aprendizaje y el control de impulsos en un cerebro en formación.'
        },
        {
          icon: Frown,
          text: 'Problemas Emocionales',
          detail: 'Aumenta el riesgo de depresión, ansiedad y baja autoestima.'
        },
        {
          icon: AlertTriangle,
          text: 'Conductas de Riesgo',
          detail: 'Mayor probabilidad de accidentes, violencia y relaciones sexuales no protegidas.'
        }
      ]
    },
    alternative: {
      title: 'Vida Activa y Social',
      description: 'Descubre la adrenalina y la conexión real sin sustancias.',
      theme: 'bg-emerald-50 text-emerald-900',
      items: [
        {
          icon: Activity,
          text: 'Deportes y Aventura',
          detail: 'Libera endorfinas naturales, mejora tu físico y construye disciplina.'
        },
        {
          icon: Users,
          text: 'Conexiones Auténticas',
          detail: 'Relaciones basadas en la confianza real, no en la desinhibición química.'
        },
        {
          icon: Zap,
          text: 'Energía al Máximo',
          detail: 'Despierta sin resaca, listo para aprovechar cada día al 100%.'
        }
      ]
    }
  },
  {
    id: 'jovenes',
    label: 'Jóvenes Adultos',
    range: '19 - 29 años',
    alcohol: {
      title: 'Impacto en tu Futuro',
      description: 'Etapa de construcción de carrera y relaciones. El alcohol puede ser un obstáculo mayor.',
      theme: 'bg-orange-950 text-orange-100',
      items: [
        {
          icon: Car,
          text: 'Accidentes de Tránsito',
          detail: 'Principal causa de muerte en este grupo etario relacionada con el consumo.'
        },
        {
          icon: Brain,
          text: 'Deterioro Cognitivo',
          detail: 'Dificultad para concentrarse, planificar y ejecutar metas a largo plazo.'
        },
        {
          icon: AlertTriangle,
          text: 'Violencia y Agresión',
          detail: 'Mayor exposición a situaciones violentas y conflictos legales.'
        }
      ]
    },
    alternative: {
      title: 'Enfoque y Éxito',
      description: 'Maximiza tu potencial y disfruta de tu independencia.',
      theme: 'bg-cyan-50 text-cyan-900',
      items: [
        {
          icon: Brain,
          text: 'Claridad Mental',
          detail: 'Toma mejores decisiones financieras y profesionales.'
        },
        {
          icon: DollarSign,
          text: 'Ahorro Significativo',
          detail: 'Invierte el dinero de las salidas en viajes, estudios o proyectos.'
        },
        {
          icon: Smile,
          text: 'Diversión Genuina',
          detail: 'Disfruta de conciertos, cenas y viajes recordándolo todo.'
        }
      ]
    }
  },
  {
    id: 'adultos',
    label: 'Adultos',
    range: '30 - 59 años',
    alcohol: {
      title: 'Salud a Largo Plazo',
      description: 'El cuerpo metaboliza el alcohol más lento. Los daños acumulativos se hacen visibles.',
      theme: 'bg-slate-900 text-slate-100',
      items: [
        {
          icon: Heart,
          text: 'Problemas Cardiovasculares',
          detail: 'Hipertensión, riesgo de infartos y accidentes cerebrovasculares.'
        },
        {
          icon: Activity,
          text: 'Daño Hepático',
          detail: 'Hígado graso, hepatitis alcohólica y cirrosis.'
        },
        {
          icon: Frown,
          text: 'Problemas Familiares',
          detail: 'Conflictos en el hogar, ejemplo negativo para los hijos y estrés.'
        }
      ]
    },
    alternative: {
      title: 'Plenitud y Bienestar',
      description: 'Calidad de vida para disfrutar con quienes más quieres.',
      theme: 'bg-indigo-50 text-indigo-900',
      items: [
        {
          icon: Heart,
          text: 'Salud Robusta',
          detail: 'Menor riesgo de enfermedades crónicas y mejor control de peso.'
        },
        {
          icon: Users,
          text: 'Tiempo de Calidad',
          detail: 'Presencia real y paciente con la familia y amigos.'
        },
        {
          icon: Zap,
          text: 'Productividad Sostenible',
          detail: 'Mayor rendimiento laboral y energía para hobbies.'
        }
      ]
    }
  },
  {
    id: 'mayores',
    label: 'Adultos Mayores',
    range: '60+ años',
    alcohol: {
      title: 'Fragilidad y Riesgo',
      description: 'Mayor sensibilidad al alcohol y peligrosas interacciones con medicamentos.',
      theme: 'bg-stone-900 text-stone-100',
      items: [
        {
          icon: Activity,
          text: 'Interacción con Medicinas',
          detail: 'Peligrosa mezcla con fármacos para presión, diabetes o corazón.'
        },
        {
          icon: AlertTriangle,
          text: 'Caídas y Fracturas',
          detail: 'Pérdida de equilibrio y coordinación, con recuperaciones lentas.'
        },
        {
          icon: Brain,
          text: 'Confusión Mental',
          detail: 'Puede imitar o empeorar síntomas de demencia o Alzheimer.'
        }
      ]
    },
    alternative: {
      title: 'Vitalidad y Legado',
      description: 'Disfrutar de la etapa dorada con lucidez y autonomía.',
      theme: 'bg-amber-50 text-amber-900',
      items: [
        {
          icon: Smile,
          text: 'Lucidez Mental',
          detail: 'Mantener la agudeza para contar historias y aconsejar.'
        },
        {
          icon: Activity,
          text: 'Independencia Física',
          detail: 'Mayor autonomía en el movimiento y actividades diarias.'
        },
        {
          icon: Heart,
          text: 'Estabilidad Emocional',
          detail: 'Disfrutar de la paz y la tranquilidad sin alteraciones químicas.'
        }
      ]
    }
  }
];
