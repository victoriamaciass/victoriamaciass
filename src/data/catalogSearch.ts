import { BOOKS_DATA } from './booksData';
import { getCategoryByInternalId } from './categoriesData';
import { getBookCover } from './bookCovers';
import { Book } from '../types/book';

export interface BookSearchMetadata {
  thematicKeywords: string[];
  synonymsAndConcepts: string[];
}

export interface SearchIndexedBook {
  book: Book;
  slug: string;
  coverUrl: string;
  displayCategory: string;
  briefDescription: string;
  normalizedTitle: string;
  titleWords: string[];
  normalizedSubtitle: string;
  subtitleWords: string[];
  normalizedKeywords: string;
  keywordEntries: string[];
  normalizedCategory: string;
  categoryWords: string[];
  normalizedDescription: string;
  descriptionWords: string[];
}

export interface BookSearchResult {
  book: Book;
  slug: string;
  title: string;
  coverUrl: string;
  displayCategory: string;
  briefDescription: string;
  score: number;
}

const MIN_QUERY_LENGTH = 2;

const SPANISH_STOPWORDS = new Set([
  'a',
  'al',
  'algo',
  'con',
  'como',
  'de',
  'del',
  'desde',
  'el',
  'en',
  'entre',
  'es',
  'esta',
  'este',
  'hacia',
  'la',
  'las',
  'lo',
  'los',
  'mas',
  'mi',
  'o',
  'para',
  'por',
  'que',
  'se',
  'sin',
  'sobre',
  'su',
  'sus',
  'tu',
  'tus',
  'un',
  'una',
  'unos',
  'unas',
  'y',
]);

/**
 * Metadatos temáticos reales por slug (basados en el contenido editorial de cada obra).
 * La indexación se complementa dinámicamente con título, subtítulo, categoría y descripción,
 * de modo que cualquier nuevo libro añadido a BOOKS_DATA quede indexado automáticamente.
 */
export const BOOK_SEARCH_METADATA: Record<string, BookSearchMetadata> = {
  gallinas: {
    thematicKeywords: [
      'gallinas',
      'cria de gallinas',
      'cuidado de gallinas',
      'gallinero',
      'aves de corral',
      'huevos',
      'puesta de huevos',
      'alimentacion de gallinas',
      'razas de gallinas',
    ],
    synonymsAndConcepts: [
      'aves',
      'corral',
      'ponedoras',
      'mascotas',
      'cuidado de mascotas',
      'cuidado de animales',
      'animales de granja',
      'jardin',
      'reproduccion',
    ],
  },
  gatos: {
    thematicKeywords: [
      'gatos',
      'comportamiento felino',
      'cuidados de gatos',
      'comunicacion felina',
      'lenguaje corporal',
      'convivencia con gatos',
      'bienestar felino',
    ],
    synonymsAndConcepts: [
      'gato',
      'felinos',
      'felino',
      'minino',
      'mascotas',
      'cuidado de mascotas',
      'cuidado de animales',
      'etologia felina',
      'hogar con gatos',
    ],
  },
  perros: {
    thematicKeywords: [
      'perros',
      'adiestramiento canino',
      'educar perro',
      'obediencia canina',
      'socializacion',
      'comportamiento canino',
      'problemas de conducta',
    ],
    synonymsAndConcepts: [
      'perro',
      'canino',
      'caninos',
      'entrenamiento de perros',
      'educacion canina',
      'mascotas',
      'cuidado de mascotas',
      'cuidado de animales',
      'cachorros',
      'vinculo humano canino',
    ],
  },
  'ansiedad-vida': {
    thematicKeywords: [
      'ansiedad',
      'ataques de panico',
      'panico',
      'miedo',
      'terapia cognitivo conductual',
      'pensamientos',
      'bienestar emocional',
    ],
    synonymsAndConcepts: [
      'crisis de panico',
      'estres',
      'nervios',
      'calma',
      'tranquilidad emocional',
      'salud mental',
      'mente y emociones',
      'superar la ansiedad',
    ],
  },
  'ansiedad-liberate': {
    thematicKeywords: [
      'ansiedad',
      'alimentacion y ansiedad',
      'sueno',
      'descanso',
      'ejercicio',
      'tecnicas de relajacion',
      'intestino y sistema nervioso',
    ],
    synonymsAndConcepts: [
      'ataques de panico',
      'mente tranquila',
      'calma',
      'relajacion',
      'estres',
      'habitos saludables',
      'salud mental',
      'mente y emociones',
      'cuidado emocional',
    ],
  },
  'ansiedad-control': {
    thematicKeywords: [
      'controlar la ansiedad',
      'ansiedad',
      'relaciones personales',
      'limites sanos',
      'confianza personal',
      'proposito',
      'bienestar emocional',
    ],
    synonymsAndConcepts: [
      'despues de la ansiedad',
      'autoestima',
      'comunicacion emocional',
      'salud mental',
      'mente y emociones',
      'cuerpo y salud',
      'estabilidad emocional',
    ],
  },
  suenos: {
    thematicKeywords: [
      'cuentos infantiles',
      'cuentos clasicos',
      'cuentos cortos',
      'fabulas',
      'aventuras',
      'leer en familia',
      'cuentos para dormir',
      'hora de dormir',
    ],
    synonymsAndConcepts: [
      'cuentos para ninos',
      'lectura infantil',
      'historias infantiles',
      'ninos',
      'familia',
      'imaginacion',
      'valores',
      'el libro de los suenos',
      'mente y emociones',
    ],
  },
  habitos: {
    thematicKeywords: [
      'habitos transformadores',
      'habitos saludables',
      'rutinas diarias',
      'productividad',
      'gestion del tiempo',
      'psicologia de los habitos',
      'crecimiento personal',
    ],
    synonymsAndConcepts: [
      'crear habitos',
      'organizacion personal',
      'disciplina',
      'objetivos',
      'desarrollo personal',
      'cambio de habitos',
      'bienestar',
    ],
  },
  mente: {
    thematicKeywords: [
      'meditacion',
      'meditacion para principiantes',
      'mindfulness',
      'atencion plena',
      'respiracion',
      'meditacion guiada',
      'escaner corporal',
    ],
    synonymsAndConcepts: [
      'meditar',
      'calma mental',
      'bienestar mental',
      'despertando la mente',
      'practica consciente',
      'concentracion',
      'crecimiento personal',
      'desarrollo personal',
    ],
  },
  motivacion: {
    thematicKeywords: [
      'motivacion',
      'transformacion positiva',
      'autodescubrimiento',
      'autoconocimiento',
      'metas',
      'superar obstaculos',
      'mentalidad positiva',
    ],
    synonymsAndConcepts: [
      'visualizacion',
      'afirmaciones',
      'habitos positivos',
      'crecimiento personal',
      'desarrollo personal',
      'autoayuda',
      'proposito',
    ],
  },
  numeros: {
    thematicKeywords: [
      'numerologia',
      'magia de los numeros',
      'mapa numerologico',
      'significado de los numeros',
      'numeros maestros',
      'ciclos de vida',
      'simbolismo numerico',
    ],
    synonymsAndConcepts: [
      'numeros',
      'calculo numerologico',
      'autoconocimiento',
      'vocacion',
      'crecimiento personal',
      'desarrollo personal',
    ],
  },
  desintoxica: {
    thematicKeywords: [
      'desintoxica tu cuerpo y mente',
      'desintoxicacion',
      'eliminar toxinas',
      'hidratacion',
      'descanso',
      'programa de 14 dias',
      'habitos saludables',
    ],
    synonymsAndConcepts: [
      'detox',
      'desintoxicar',
      'energia',
      'alimentacion saludable',
      'bienestar mental',
      'cuerpo y salud',
    ],
  },
  'desintoxicar-peso': {
    thematicKeywords: [
      'desintoxicar el cuerpo',
      'bajar de peso',
      'recetas saludables',
      'planes de alimentacion',
      'superalimentos',
      'hidratacion',
      'ejercicio fisico',
    ],
    synonymsAndConcepts: [
      'detox',
      'adelgazar',
      'perder peso',
      'perdida de peso',
      'control de peso',
      'comida para adelgazar',
      'alimentacion consciente',
      'cuerpo y salud',
    ],
  },
  metabolismo: {
    thematicKeywords: [
      'metabolismo',
      'metabolismo lento',
      'quema de calorias',
      'gasto energetico',
      'peso saludable',
      'hormonas',
      'alimentacion y ejercicio',
    ],
    synonymsAndConcepts: [
      'acelerar metabolismo',
      'adelgazar',
      'bajar de peso',
      'perder peso',
      'perdida de peso',
      'energia',
      'cuerpo y salud',
    ],
  },
  celulitis: {
    thematicKeywords: [
      'celulitis',
      'piel de naranja',
      'cuidado de la piel',
      'tratamientos naturales',
      'alimentacion',
      'hidratacion',
      'ejercicio',
    ],
    synonymsAndConcepts: [
      'prevencion de la celulitis',
      'mejorar la piel',
      'cuerpo y salud',
      'bienestar fisico',
    ],
  },
  varices: {
    thematicKeywords: [
      'varices',
      'salud venosa',
      'sistema venoso',
      'piernas saludables',
      'prevencion de varices',
      'tratamientos varices',
      'circulacion',
    ],
    synonymsAndConcepts: [
      'venas',
      'circulacion sanguinea',
      'cuidado de las piernas',
      'recuperacion',
      'nutricion venosa',
      'cuerpo y salud',
    ],
  },
  sudoracion: {
    thematicKeywords: [
      'sudoracion excesiva',
      'hiperhidrosis',
      'transpiracion',
      'controlar el sudor',
      'cuidado de la piel',
      'prevencion de olores',
    ],
    synonymsAndConcepts: [
      'sudor',
      'sudar mucho',
      'tratamientos hiperhidrosis',
      'cuerpo y salud',
    ],
  },
  fertilidad: {
    thematicKeywords: [
      'fertilidad consciente',
      'fertilidad',
      'maternidad',
      'embarazo',
      'nutricion y fertilidad',
      'fertilidad masculina',
      'causas de infertilidad',
    ],
    synonymsAndConcepts: [
      'concebir',
      'quedar embarazada',
      'salud reproductiva',
      'ciclo menstrual',
      'ritmos circadianos',
      'cuerpo y salud',
    ],
  },
  'ensaladas-sabores': {
    thematicKeywords: [
      'ensaladas',
      'recetas de ensaladas',
      'ingredientes frescos',
      'aderezos caseros',
      'ensaladas clasicas',
      'ensaladas con verduras y frutas',
      'cocina saludable',
    ],
    synonymsAndConcepts: [
      'ensalada',
      'recetas saludables',
      'comida saludable',
      'platos frescos',
      'nutritivo',
      'cocina y recetas',
    ],
  },
  'ensaladas-150': {
    thematicKeywords: [
      'ensaladas',
      '150 recetas de ensaladas',
      'ensaladas refrescantes',
      'ensaladas verdes',
      'ensaladas con legumbres',
      'ensaladas con proteinas',
      'ensaladas de frutas',
      'cocina saludable',
    ],
    synonymsAndConcepts: [
      'ensalada',
      'recetas de ensaladas',
      'recetas saludables',
      'comida saludable',
      'vegetales',
      'granos',
      'cocina fresca',
      'cocina y recetas',
    ],
  },
  'recetas-bajar-peso': {
    thematicKeywords: [
      'recetas para bajar de peso',
      'bajar de peso',
      'recetas bajas en calorias',
      'menus organizados',
      'alimentacion consciente',
      'peso ideal',
      'cocina saludable',
    ],
    synonymsAndConcepts: [
      'adelgazar',
      'perder peso',
      'perdida de peso',
      'comida para adelgazar',
      'recetas saludables',
      'comida saludable',
      'dieta equilibrada',
      'cocina y recetas',
    ],
  },
  'recetas-fitness': {
    thematicKeywords: [
      'recetas fitness',
      'alimentacion equilibrada',
      'alimentacion para entrenar',
      'desayunos fitness',
      'snacks saludables',
      'batidos y smoothies',
      'cocina saludable',
    ],
    synonymsAndConcepts: [
      'fitness',
      'deporte',
      'entrenamiento',
      'nutricion deportiva',
      'proteinas',
      'recetas saludables',
      'comida saludable',
      'cocina y recetas',
    ],
  },
  'recetas-quinoa': {
    thematicKeywords: [
      'quinoa',
      'recetas con quinoa',
      'cocina nutritiva',
      'opciones veganas',
      'alimentacion consciente',
      'cocina saludable',
    ],
    synonymsAndConcepts: [
      'quinua',
      'granos saludables',
      'superalimentos',
      'recetas saludables',
      'comida saludable',
      'desayunos almuerzos cenas',
      'cocina y recetas',
    ],
  },
  aderezos: {
    thematicKeywords: [
      'aderezos',
      'salsas caseras',
      'salsas para ensaladas',
      'aderezos para cocinar',
      'acompanamientos',
      'cocina saludable',
    ],
    synonymsAndConcepts: [
      'aderezo',
      'vinagretas',
      'salsa',
      'condimentos',
      'salsas dulces',
      'recetas saludables',
      'cocina y recetas',
    ],
  },
  'arte-paella': {
    thematicKeywords: [
      'paella',
      'arte de la paella',
      'paella valenciana',
      'paella marinera',
      'paella vegetariana',
      'arroz',
      'cocina mediterranea',
      'cocina espanola',
    ],
    synonymsAndConcepts: [
      'paellas',
      'recetas de paella',
      'variedades de arroz',
      'tradicion valenciana',
      'cocina y recetas',
    ],
  },
  'paellas-100': {
    thematicKeywords: [
      'paellas',
      '100 recetas de paellas',
      'paella',
      'cocinar arroz',
      'cocina mediterranea',
      'cocina espanola',
    ],
    synonymsAndConcepts: [
      'recetas de paella',
      'arroces',
      'plato tradicional',
      'cocina y recetas',
    ],
  },
  'arroces-alma': {
    thematicKeywords: [
      'arroces',
      'arroces melosos',
      'arroces caldosos',
      'fideuas',
      'arroz al horno',
      'cocina mediterranea',
      'cocina espanola',
    ],
    synonymsAndConcepts: [
      'arroz',
      'fideua',
      'recetas de arroz',
      'paellas y arroces',
      'cocina y recetas',
    ],
  },
  'carnes-rojas': {
    thematicKeywords: [
      'carnes rojas',
      'recetas de carne',
      'cortes de res y ternera',
      'asados',
      'parrilla',
      'guisos',
      'marinados',
    ],
    synonymsAndConcepts: [
      'carne',
      'carnes',
      'ternera',
      'res',
      'vacuno',
      'metodos de coccion',
      'cocina y recetas',
    ],
  },
  'recetas-pollo': {
    thematicKeywords: [
      'recetas de pollo',
      'pollo',
      'pollo al horno',
      'pollo a la parrilla',
      'marinados',
      'aves',
    ],
    synonymsAndConcepts: [
      'carne de pollo',
      'platos con pollo',
      'cocina cotidiana',
      'cocina y recetas',
    ],
  },
  'sabores-irresistibles': {
    thematicKeywords: [
      'perder peso',
      'recetas bajas en calorias',
      'adelgazar',
      'desayunos almuerzos cenas',
      'opciones vegetarianas',
      'opciones veganas',
      'planificacion semanal',
    ],
    synonymsAndConcepts: [
      'bajar de peso',
      'perdida de peso',
      'comida para adelgazar',
      'recetas saludables',
      'comida saludable',
      'nutricion basica',
      'cocina y recetas',
    ],
  },
  'recetas-variadas': {
    thematicKeywords: [
      'recetas variadas',
      'verduras',
      'carnes',
      'pescados',
      'platos vegetarianos',
      'cocina internacional',
      'sopas',
      'ensaladas',
      'postres',
    ],
    synonymsAndConcepts: [
      'horno',
      'parrilla',
      'repertorio culinario',
      'cocina diaria',
      'cocina y recetas',
    ],
  },
  'cocina-deliciosa': {
    thematicKeywords: [
      'recetas de cocina',
      'platos principales',
      'postres',
      'sopas',
      'ensaladas',
      'entrantes',
      'guarniciones',
      'menus variados',
    ],
    synonymsAndConcepts: [
      'recetario',
      'combinaciones culinarias',
      'comidas completas',
      'cocina y recetas',
    ],
  },
  'cocina-espanol': {
    thematicKeywords: [
      'cocina en espanol',
      'especialidades regionales espanolas',
      'tapas',
      'desayunos',
      'arroces',
      'sopas',
      'mariscos',
      'carnes',
      'guisos',
      'postres',
    ],
    synonymsAndConcepts: [
      'cocina espanola',
      'gastronomia de espana',
      'platos tipicos de espana',
      'cocina vegetariana',
      'empanadas',
      'estofados',
      'cocina y recetas',
    ],
  },
  'freidora-aire': {
    thematicKeywords: [
      'freidora de aire',
      'recetas freidora de aire',
      'aperitivos',
      'carnes',
      'pescados',
      'verduras',
      'postres',
      'panes y desayunos',
      'guia de tiempos',
    ],
    synonymsAndConcepts: [
      'airfryer',
      'air fryer',
      'cocinar en freidora de aire',
      'mantenimiento freidora',
      'snacks',
      'cocina y recetas',
    ],
  },
  'galletas-epicas': {
    thematicKeywords: [
      'galletas',
      'reposteria',
      'horneado',
      'masas',
      'texturas de galletas',
      'decoracion de galletas',
      'empaquetado para regalar',
    ],
    synonymsAndConcepts: [
      'galleta',
      'hornear',
      'dulces',
      'postres',
      'ciencia en la cocina',
      'cocina y recetas',
    ],
  },
  'sistema-inmunologico': {
    thematicKeywords: [
      'sistema inmunologico',
      'salud inmunologica',
      'defensas',
      'nutricion',
      'dieta antiinflamatoria',
      'dieta fodmap',
      'plantas medicinales y suplementos',
    ],
    synonymsAndConcepts: [
      'inmunidad',
      'inmune',
      'alimentacion saludable',
      'recetas saludables',
      'descanso y actividad fisica',
      'bienestar general',
      'cuerpo y salud',
      'cocina y recetas',
    ],
  },
  velas: {
    thematicKeywords: [
      'velas artesanales',
      'velas aromaticas',
      'hacer velas',
      'ceras naturales',
      'mechas',
      'aceites esenciales',
      'fragancias',
    ],
    synonymsAndConcepts: [
      'vela',
      'velas perfumadas',
      'manualidades',
      'artesania',
      'aromas para el hogar',
      'cera de soja',
      'manos y misterio',
    ],
  },
  conjuros: {
    thematicKeywords: [
      'conjuros conscientes',
      'rituales',
      'hechizos',
      'intencion',
      'amor propio',
      'abundancia',
      'suerte',
      'simbolismo',
    ],
    synonymsAndConcepts: [
      'conjuros',
      'magia consciente',
      'visualizacion',
      'proteccion energetica',
      'libro de conjuros',
      'esoterismo',
      'manos y misterio',
    ],
  },
  costura: {
    thematicKeywords: [
      'costura',
      'aprender costura',
      'crear prendas',
      'telas',
      'patrones',
      'herramientas de costura',
    ],
    synonymsAndConcepts: [
      'coser',
      'aprender a coser',
      'confeccion',
      'ropa hecha a mano',
      'manualidades',
      'corte y confeccion',
      'manos y misterio',
    ],
  },
};

/**
 * Grupos de conceptos y sinónimos para puente semántico de consultas.
 * Solo expande términos cuando corresponden a temáticas presentes en el catálogo.
 */
const QUERY_SYNONYM_GROUPS: string[][] = [
  ['adelgazar', 'bajar de peso', 'perder peso', 'perdida de peso', 'bajas en calorias', 'peso saludable'],
  ['comida', 'cocina', 'recetas', 'recetario', 'platos'],
  ['saludable', 'saludables', 'nutritivo', 'nutritiva', 'equilibrada', 'fitness', 'sana'],
  ['gato', 'gatos', 'felino', 'felinos'],
  ['perro', 'perros', 'canino', 'caninos', 'adiestramiento'],
  ['gallina', 'gallinas', 'gallinero'],
  ['mascota', 'mascotas', 'animales'],
  ['ansiedad', 'panico', 'ataques de panico', 'estres'],
  ['meditacion', 'meditar', 'mindfulness', 'atencion plena', 'respiracion'],
  ['cuento', 'cuentos', 'cuentos infantiles', 'ninos', 'infantil', 'fabulas'],
  ['paella', 'paellas'],
  ['arroz', 'arroces', 'fideua', 'fideuas'],
  ['ensalada', 'ensaladas'],
  ['quinoa', 'quinua'],
  ['vela', 'velas', 'cera', 'aceites esenciales'],
  ['costura', 'coser', 'telas', 'patrones', 'prendas'],
  ['galleta', 'galletas', 'reposteria', 'horneado', 'hornear'],
  ['freidora de aire', 'freidora', 'airfryer', 'air fryer'],
  ['desintoxicar', 'desintoxicacion', 'desintoxica', 'detox', 'toxinas'],
  ['inmunologico', 'inmune', 'defensas', 'inmunidad'],
  ['sudor', 'sudoracion', 'transpiracion', 'hiperhidrosis'],
  ['fertilidad', 'embarazo', 'maternidad', 'concebir'],
  ['celulitis', 'piel de naranja'],
  ['varices', 'salud venosa', 'circulacion'],
  ['conjuros', 'rituales', 'hechizos', 'magia'],
  ['aderezos', 'aderezo', 'salsas', 'vinagretas'],
  ['pollo', 'pollo al horno', 'pollo a la parrilla'],
  ['carne', 'carnes', 'carnes rojas', 'ternera', 'res'],
];

/**
 * Normaliza cadenas eliminando mayúsculas, tildes/diacríticos y signos de puntuación.
 */
export function normalizeSearchText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenizeNormalized(normalized: string): string[] {
  if (!normalized) return [];
  return normalized.split(' ').filter(Boolean);
}

function stripMarkdown(text: string): string {
  return text
    .replace(/#{1,6}\s*/g, '')
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function getSpanishVariants(token: string): string[] {
  const variants = new Set<string>([token]);
  if (token.length >= 4) {
    if (token.endsWith('es')) {
      variants.add(token.slice(0, -2));
      variants.add(token.slice(0, -1));
    } else if (token.endsWith('s')) {
      variants.add(token.slice(0, -1));
    } else {
      variants.add(`${token}s`);
      variants.add(`${token}es`);
    }
    if (token.endsWith('ces')) {
      variants.add(`${token.slice(0, -3)}z`);
    } else if (token.endsWith('z')) {
      variants.add(`${token.slice(0, -1)}ces`);
    }
  }
  return Array.from(variants);
}

function expandConceptTerms(normalizedPhrase: string, meaningfulTokens: string[]): {
  phraseSynonyms: string[];
  tokenSynonyms: Map<string, string[]>;
} {
  const phraseSynonyms = new Set<string>();
  const tokenSynonyms = new Map<string, string[]>();

  for (const group of QUERY_SYNONYM_GROUPS) {
    // Si la frase completa contiene algún término del grupo, añadimos el grupo como sinónimos de frase
    for (const term of group) {
      if (term.includes(' ') && normalizedPhrase.includes(term)) {
        for (const alt of group) {
          if (alt !== term) phraseSynonyms.add(alt);
        }
      }
    }

    // Por cada token individual relevante
    for (const token of meaningfulTokens) {
      const tokenVars = getSpanishVariants(token);
      const matchesGroup = group.some((g) => {
        if (g.includes(' ')) return false;
        return tokenVars.some((tv) => tv === g || (tv.length >= 5 && g.startsWith(tv)));
      });
      if (matchesGroup) {
        const existing = new Set(tokenSynonyms.get(token) || []);
        for (const alt of group) {
          existing.add(alt);
        }
        tokenSynonyms.set(token, Array.from(existing));
      }
    }
  }

  return {
    phraseSynonyms: Array.from(phraseSynonyms),
    tokenSynonyms,
  };
}

function buildSearchIndex(): SearchIndexedBook[] {
  const seenSlugs = new Set<string>();
  const indexed: SearchIndexedBook[] = [];

  for (const book of BOOKS_DATA) {
    if (!book.slug || seenSlugs.has(book.slug)) continue;
    seenSlugs.add(book.slug);

    const catInfo = getCategoryByInternalId(book.category);
    const displayCategory = catInfo ? catInfo.title : book.categoryLabel;
    const coverUrl = getBookCover(book.slug, book.coverImage || book.portada);
    const briefDescription = (book.synopsis || book.subtitle || '').trim();

    const meta = BOOK_SEARCH_METADATA[book.slug];
    const keywordEntriesRaw = [
      ...(book.highlights || []),
      ...(meta?.thematicKeywords || []),
      ...(meta?.synonymsAndConcepts || []),
    ];
    const keywordEntries = keywordEntriesRaw
      .map(normalizeSearchText)
      .filter(Boolean);

    const categoryStrings = [
      book.categoryLabel,
      displayCategory,
      book.serie || '',
    ]
      .filter(Boolean)
      .join(' ');

    const fullDescParts = [
      book.synopsis || '',
      ...(book.fullDescription || book.descripcion || []).map(stripMarkdown),
    ]
      .filter(Boolean)
      .join(' ');

    const normalizedTitle = normalizeSearchText(book.title);
    const normalizedSubtitle = normalizeSearchText(book.subtitle || '');
    const normalizedKeywords = keywordEntries.join(' ');
    const normalizedCategory = normalizeSearchText(categoryStrings);
    const normalizedDescription = normalizeSearchText(fullDescParts);

    indexed.push({
      book,
      slug: book.slug,
      coverUrl,
      displayCategory,
      briefDescription,
      normalizedTitle,
      titleWords: tokenizeNormalized(normalizedTitle),
      normalizedSubtitle,
      subtitleWords: tokenizeNormalized(normalizedSubtitle),
      normalizedKeywords,
      keywordEntries,
      normalizedCategory,
      categoryWords: tokenizeNormalized(normalizedCategory),
      normalizedDescription,
      descriptionWords: tokenizeNormalized(normalizedDescription),
    });
  }

  return indexed;
}

export const SEARCH_INDEX: SearchIndexedBook[] = buildSearchIndex();

function fieldContainsTerm(
  fieldText: string,
  fieldWords: string[],
  term: string,
  allowSubstring: boolean
): 'exact_word' | 'prefix' | 'substring' | null {
  if (!fieldText || !term) return null;

  if (term.includes(' ')) {
    const paddedField = ` ${fieldText} `;
    if (paddedField.includes(` ${term} `)) return 'exact_word';
    if (allowSubstring && fieldText.includes(term)) return 'substring';
    return null;
  }

  const termVariants = getSpanishVariants(term);
  for (const tv of termVariants) {
    if (fieldWords.includes(tv)) return 'exact_word';
  }
  if (term.length >= 4) {
    for (const w of fieldWords) {
      if (w.startsWith(term)) return 'prefix';
    }
    if (allowSubstring && fieldText.includes(term)) return 'substring';
  }

  return null;
}

export function isQueryTooShort(rawQuery: string): boolean {
  const normalized = normalizeSearchText(rawQuery);
  return normalized.length > 0 && normalized.length < MIN_QUERY_LENGTH;
}

/**
 * Ejecuta una búsqueda instantánea local sobre los 39 libros del catálogo
 * con normalización, expansión temática y ordenación por relevancia.
 */
export function searchCatalogBooks(rawQuery: string): BookSearchResult[] {
  const normalizedQuery = normalizeSearchText(rawQuery);
  if (normalizedQuery.length < MIN_QUERY_LENGTH) {
    return [];
  }

  const allTokens = tokenizeNormalized(normalizedQuery);
  const meaningfulTokens = allTokens.filter(
    (t) => t.length >= MIN_QUERY_LENGTH && !SPANISH_STOPWORDS.has(t)
  );
  const queryTokens = meaningfulTokens.length > 0 ? meaningfulTokens : allTokens;

  const { phraseSynonyms, tokenSynonyms } = expandConceptTerms(normalizedQuery, queryTokens);

  interface InternalScoredResult extends BookSearchResult {
    strongTokenMatches: number;
  }

  const scoredResults: InternalScoredResult[] = [];

  for (const item of SEARCH_INDEX) {
    let score = 0;

    // 1. Coincidencia exacta o de frase completa en Título (máxima prioridad)
    if (item.normalizedTitle === normalizedQuery) {
      score += 1200;
    } else if (` ${item.normalizedTitle} `.includes(` ${normalizedQuery} `)) {
      score += 750;
    } else if (normalizedQuery.length >= 4 && item.normalizedTitle.includes(normalizedQuery)) {
      score += 550;
    }

    // 2. Coincidencia de frase completa en Subtítulo
    if (` ${item.normalizedSubtitle} `.includes(` ${normalizedQuery} `)) {
      score += 320;
    } else if (normalizedQuery.length >= 4 && item.normalizedSubtitle.includes(normalizedQuery)) {
      score += 240;
    }

    // 3. Coincidencia de frase completa en Palabras clave temáticas
    const exactKeywordPhrase = item.keywordEntries.some(
      (kw) => kw === normalizedQuery || ` ${kw} `.includes(` ${normalizedQuery} `)
    );
    if (exactKeywordPhrase) {
      score += 290;
    }

    // 4. Coincidencia de frase completa en Categoría / Serie
    if (` ${item.normalizedCategory} `.includes(` ${normalizedQuery} `)) {
      score += 170;
    }

    // 5. Coincidencia de frase completa en Descripción editorial (solo suma si es multi-palabra para no duplicar el token)
    if (queryTokens.length > 1 && ` ${item.normalizedDescription} `.includes(` ${normalizedQuery} `)) {
      score += 20;
    }

    // 6. Sinónimos de frase completa (ej: "comida para adelgazar" -> "bajar de peso")
    let phraseSynonymHit = false;
    for (const altPhrase of phraseSynonyms) {
      if (fieldContainsTerm(item.normalizedTitle, item.titleWords, altPhrase, false)) {
        score += 260;
        phraseSynonymHit = true;
      } else if (fieldContainsTerm(item.normalizedSubtitle, item.subtitleWords, altPhrase, false)) {
        score += 190;
        phraseSynonymHit = true;
      } else if (fieldContainsTerm(item.normalizedKeywords, tokenizeNormalized(item.normalizedKeywords), altPhrase, false)) {
        score += 175;
        phraseSynonymHit = true;
      }
    }

    // 7. Coincidencia por tokens individuales (directos + sinónimos del token)
    let matchedTokenCount = 0;
    let strongTokenMatches = 0; // tokens que coinciden en título, subtítulo, keywords o categoría
    let titleTokenHits = 0;

    const kwWords = tokenizeNormalized(item.normalizedKeywords);

    for (const token of queryTokens) {
      let tokenMatched = false;
      let tokenMatchedStrong = false;

      // Título (parcial)
      const titleHit = fieldContainsTerm(item.normalizedTitle, item.titleWords, token, token.length >= 4);
      if (titleHit) {
        score += titleHit === 'exact_word' ? 240 : titleHit === 'prefix' ? 190 : 140;
        tokenMatched = true;
        tokenMatchedStrong = true;
        titleTokenHits++;
      }

      // Subtítulo
      const subHit = fieldContainsTerm(item.normalizedSubtitle, item.subtitleWords, token, token.length >= 4);
      if (subHit) {
        score += subHit === 'exact_word' ? 130 : 95;
        tokenMatched = true;
        tokenMatchedStrong = true;
      }

      // Palabras clave temáticas
      const kwHit = fieldContainsTerm(item.normalizedKeywords, kwWords, token, token.length >= 4);
      if (kwHit) {
        score += kwHit === 'exact_word' ? 120 : 85;
        tokenMatched = true;
        tokenMatchedStrong = true;
      }

      // Categoría / Serie
      const catHit = fieldContainsTerm(item.normalizedCategory, item.categoryWords, token, token.length >= 4);
      if (catHit) {
        score += catHit === 'exact_word' ? 80 : 55;
        tokenMatched = true;
        tokenMatchedStrong = true;
      }

      // Descripción editorial (peso bajo para evitar que menciones incidentales superen al tema principal)
      const descHit = fieldContainsTerm(item.normalizedDescription, item.descriptionWords, token, false);
      if (descHit) {
        score += 10;
        tokenMatched = true;
      }

      // Sinónimos/variantes conceptuales del token si no hubo coincidencia directa fuerte
      if (!tokenMatchedStrong) {
        const alts = tokenSynonyms.get(token) || [];
        let altBestScore = 0;
        let altHitStrong = false;
        for (const alt of alts) {
          if (alt === token) continue;
          if (fieldContainsTerm(item.normalizedTitle, item.titleWords, alt, false)) {
            altBestScore = Math.max(altBestScore, 145);
            altHitStrong = true;
          } else if (fieldContainsTerm(item.normalizedSubtitle, item.subtitleWords, alt, false)) {
            altBestScore = Math.max(altBestScore, 95);
            altHitStrong = true;
          } else if (fieldContainsTerm(item.normalizedKeywords, kwWords, alt, false)) {
            altBestScore = Math.max(altBestScore, 90);
            altHitStrong = true;
          } else if (fieldContainsTerm(item.normalizedCategory, item.categoryWords, alt, false)) {
            altBestScore = Math.max(altBestScore, 60);
            altHitStrong = true;
          }
        }
        if (altHitStrong) {
          score += altBestScore;
          tokenMatchedStrong = true;
          tokenMatched = true;
        }
      }

      if (tokenMatched) {
        matchedTokenCount++;
      }
      if (tokenMatchedStrong) {
        strongTokenMatches++;
      }
    }

    if (phraseSynonymHit && strongTokenMatches < queryTokens.length) {
      strongTokenMatches = queryTokens.length;
    }

    // Reglas de calidad para evitar falsos positivos en búsquedas de varias palabras
    if (queryTokens.length > 1) {
      if (matchedTokenCount < queryTokens.length) {
        continue;
      }
      if (strongTokenMatches === 0) {
        continue;
      }
      if (titleTokenHits === queryTokens.length) {
        score += 220;
      }
    } else if (matchedTokenCount === 0 && score === 0) {
      continue;
    }

    if (score > 0) {
      scoredResults.push({
        book: item.book,
        slug: item.slug,
        title: item.book.title,
        coverUrl: item.coverUrl,
        displayCategory: item.displayCategory,
        briefDescription: item.briefDescription,
        score,
        strongTokenMatches,
      });
    }
  }

  // Si existen resultados donde todos los términos relevantes coinciden en campos principales
  // (título, subtítulo, temáticas o categoría), descartar coincidencias meramente incidentales en descripciones largas.
  const hasFullStrongMatch = scoredResults.some((r) => r.strongTokenMatches >= queryTokens.length);
  const filteredResults = hasFullStrongMatch
    ? scoredResults.filter((r) => r.strongTokenMatches >= queryTokens.length)
    : scoredResults;

  // Ordenar de mayor a menor relevancia; en caso de empate, alfabéticamente por título
  filteredResults.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.title.localeCompare(b.title, 'es');
  });

  return filteredResults.map(({ strongTokenMatches: _s, ...rest }) => rest);
}
