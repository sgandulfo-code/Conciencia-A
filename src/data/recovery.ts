export interface RecoveryStage {
  time: string;
  benefit: string;
  description: string;
}

export const recoveryTimeline: RecoveryStage[] = [
  {
    time: "24 Horas",
    benefit: "Desintoxicación Inicial",
    description: "Tu cuerpo elimina el alcohol residual. Los niveles de azúcar en sangre se normalizan y desaparece la 'niebla mental'."
  },
  {
    time: "7 Días",
    benefit: "Mejor Sueño e Hidratación",
    description: "Duermes más profundamente (fase REM). Tu piel luce más hidratada y con menos brotes."
  },
  {
    time: "2 Semanas",
    benefit: "Pérdida de Peso y Estómago",
    description: "Se reduce la hinchazón abdominal y el reflujo gástrico. Empiezas a notar pérdida de peso por menos calorías vacías."
  },
  {
    time: "1 Mes",
    benefit: "Hígado en Recuperación",
    description: "La grasa hepática disminuye hasta un 15%. Aumenta tu energía física y capacidad de concentración."
  },
  {
    time: "3 Meses",
    benefit: "Salud Cardiovascular",
    description: "Baja la presión arterial y el riesgo de infarto. Tus células sanguíneas se renuevan completamente."
  },
  {
    time: "1 Año",
    benefit: "Transformación Total",
    description: "Riesgo de cáncer de hígado, boca y mama reducido significativamente. Ahorro económico considerable."
  }
];
