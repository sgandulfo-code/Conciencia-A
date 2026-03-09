export interface Myth {
  id: number;
  statement: string;
  reality: string;
  isTrue: boolean;
}

export const myths: Myth[] = [
  {
    id: 1,
    statement: "Beber café o darse una ducha fría te baja la borrachera.",
    reality: "Falso. Solo el tiempo elimina el alcohol de la sangre. El café te despierta, pero sigues con los reflejos y el juicio alterados.",
    isTrue: false
  },
  {
    id: 2,
    statement: "Mezclar bebidas (vino, cerveza, licor) emborracha más.",
    reality: "Falso. Lo que importa es la cantidad total de alcohol puro que consumes, no el orden o la mezcla de tipos.",
    isTrue: false
  },
  {
    id: 3,
    statement: "Comer antes de beber reduce la absorción del alcohol.",
    reality: "Verdadero. Los alimentos en el estómago ralentizan el paso del alcohol al intestino delgado, donde se absorbe más rápido.",
    isTrue: true
  },
  {
    id: 4,
    statement: "El alcohol te ayuda a dormir mejor.",
    reality: "Falso. Puede que te duermas más rápido, pero reduce la calidad del sueño REM, provocando un descanso fragmentado y poco reparador.",
    isTrue: false
  },
  {
    id: 5,
    statement: "Las mujeres se emborrachan más rápido que los hombres.",
    reality: "Verdadero. Generalmente tienen menos agua corporal y menos enzimas que metabolizan el alcohol, por lo que la concentración en sangre sube más rápido.",
    isTrue: true
  },
  {
    id: 6,
    statement: "Si no tienes resaca, es que no te hizo daño.",
    reality: "Falso. El daño al hígado, cerebro y corazón ocurre igual, aunque no sientas dolor de cabeza al día siguiente.",
    isTrue: false
  }
];
