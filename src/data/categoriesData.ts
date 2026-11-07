import { CategoryId } from '../types/book';

export interface CategoryInfo {
  slug: string; // e.g. "mascotas"
  route: string; // e.g. "/mascotas"
  title: string; // e.g. "Mascotas"
  navLabel: string; // e.g. "Mascotas"
  categoryId: CategoryId; // internal id used in BOOKS_DATA
  description: string;
  includes: string;
}

export const CATEGORIES_LIST: CategoryInfo[] = [
  {
    slug: 'mascotas',
    route: '/mascotas',
    title: 'Mascotas',
    navLabel: 'Mascotas',
    categoryId: 'mascotas',
    description:
      'Guías concebidas para quien convive con animales y quiere cuidarlos bien: gallinas, gatos y perros. Explica cómo alimentarlos, educarlos y entender su comportamiento, con pautas prácticas y respetuosas para resolver los retos cotidianos de convivencia.',
    includes: 'Gallinas ponedoras y de corral, etología felina y adiestramiento canino respetuoso.',
  },
  {
    slug: 'mente-emociones',
    route: '/mente-emociones',
    title: 'Mente y emociones',
    navLabel: 'Mente y emociones',
    categoryId: 'salud-mental',
    description:
      'Libros sobre ansiedad, ataques de pánico, sueños y calma. Pensados para quien quiere entender qué le pasa a su cuerpo y a su mente en momentos de sobrecarga, y disponer de herramientas concretas y contrastadas, explicadas con absoluta claridad.',
    includes: 'Manejo de ansiedad, ataques de pánico, higiene del sueño y serenidad cotidiana.',
  },
  {
    slug: 'crecimiento-personal',
    route: '/crecimiento-personal',
    title: 'Crecimiento personal',
    navLabel: 'Crecimiento personal',
    categoryId: 'desarrollo-personal',
    description:
      'Guías sobre hábitos, motivación, mente y numerología. Métodos estructurados para ordenar rutinas personales, comprender los resortes de la propia motivación y explorar el simbolismo tradicional de los números desde un prisma analítico y reflexivo.',
    includes: 'Creación de hábitos sostenibles, motivación intrínseca, enfoque y numerología práctica.',
  },
  {
    slug: 'cuerpo-salud',
    route: '/cuerpo-salud',
    title: 'Cuerpo y salud',
    navLabel: 'Cuerpo y salud',
    categoryId: 'salud-cuerpo',
    description:
      'Información práctica y rigurosa sobre varices, metabolismo, celulitis, fertilidad, desintoxicación y bienestar corporal. Aborda problemas específicos con un enfoque preventivo basado en hábitos, nutrición funcional y cuidado físico continuado.',
    includes: 'Salud vascular (varices), reactivación metabólica, celulitis, fertilidad y detox natural.',
  },
  {
    slug: 'cocina',
    route: '/cocina',
    title: 'Cocina y recetas',
    navLabel: 'Cocina y recetas',
    categoryId: 'cocina-recetas',
    description:
      'Colección completa de 18 recetarios organizados en tres series temáticas: Cocina Saludable, Cocina Mediterránea / Española y recetas generales del hogar. Diseñados para planificar menús diarios con ingredientes accesibles, mejorar la alimentación familiar y dominar herramientas actuales como la freidora de aire.',
    includes: '18 títulos culinarios divididos en 3 colecciones especializadas con recetas paso a paso.',
  },
  {
    slug: 'manos-misterio',
    route: '/manos-misterio',
    title: 'Manos y misterio',
    navLabel: 'Manos y misterio',
    categoryId: 'manualidades-esoterismo',
    description:
      'Guías dedicadas a las velas artesanales, la costura práctica y los conjuros conscientes. Obras que invitan a crear con las manos, recuperar oficios tradicionales y explorar prácticas simbólicas y rituales cotidianos desde una perspectiva reflexiva.',
    includes: 'Velas aromáticas con cera de soja, técnicas de costura doméstica y prácticas simbólicas conscientes.',
  },
];

/**
 * Obtiene la categoría a partir de la ruta o slug
 */
export function getCategoryBySlug(slug: string): CategoryInfo | undefined {
  const clean = slug.replace(/^\//, '').toLowerCase().trim();
  return CATEGORIES_LIST.find((c) => c.slug === clean);
}

/**
 * Obtiene la categoría a partir del categoryId interno (ej. 'salud-cuerpo' -> '/cuerpo-salud')
 */
export function getCategoryByInternalId(id: string): CategoryInfo | undefined {
  return CATEGORIES_LIST.find((c) => c.categoryId === id);
}
