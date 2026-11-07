/**
 * =============================================================================
 * CORRESPONDENCIAS OFICIALES DE PORTADAS — VICTORIA MACIASS
 * =============================================================================
 *
 * Mapeo centralizado e independiente entre el slug de cada libro y la URL
 * de su portada oficial alojada en ImageKit.
 *
 * Para libros sin portada entregada (p. ej. los 18 recetarios de Cocina),
 * no se define entrada, mostrando automáticamente su marcador de posición.
 */

export const BOOK_COVERS: Record<string, string> = {
  gallinas: "https://ik.imagekit.io/hr20qlpupi/victoria/1-gallinas-libro.jpg",
  perros: "https://ik.imagekit.io/hr20qlpupi/victoria/2-perros-libro.jpg",
  "ansiedad-vida": "https://ik.imagekit.io/hr20qlpupi/victoria/3-ansiedad1-libro.jpg",
  "ansiedad-liberate": "https://ik.imagekit.io/hr20qlpupi/victoria/4-ansiedad2-libro.jpg",
  "ansiedad-control": "https://ik.imagekit.io/hr20qlpupi/victoria/5-ansiedad3-libro.jpg",
  varices: "https://ik.imagekit.io/hr20qlpupi/victoria/6-varices-libro.jpg",
  sudoracion: "https://ik.imagekit.io/hr20qlpupi/victoria/7-sudor-libro.jpg",
  celulitis: "https://ik.imagekit.io/hr20qlpupi/victoria/8-celulitis-libro.jpg?updatedAt=1794004358519",
  suenos: "https://ik.imagekit.io/hr20qlpupi/victoria/9-cuentos-libro.jpg",
  mente: "https://ik.imagekit.io/hr20qlpupi/victoria/10-meditacion1-libro.jpg",
  habitos: "https://ik.imagekit.io/hr20qlpupi/victoria/11--habitos-libro.jpg",
  motivacion: "https://ik.imagekit.io/hr20qlpupi/victoria/12--motivacion-libro.jpg",
  numeros: "https://ik.imagekit.io/hr20qlpupi/victoria/13-numerologia-libro.jpg",
  metabolismo: "https://ik.imagekit.io/hr20qlpupi/victoria/14-metabolismo-libro.jpg",
  desintoxica: "https://ik.imagekit.io/hr20qlpupi/victoria/15-detox1-libro.jpg",
  "desintoxicar-peso": "https://ik.imagekit.io/hr20qlpupi/victoria/16-detox2-libro.jpg",
  velas: "https://ik.imagekit.io/hr20qlpupi/victoria/17-velas.jpg",
  conjuros: "https://ik.imagekit.io/hr20qlpupi/victoria/18-conjuros-libro.jpg",
  fertilidad: "https://ik.imagekit.io/hr20qlpupi/victoria/19-embarazo-libro.jpg",
  gatos: "https://ik.imagekit.io/hr20qlpupi/victoria/20-gatos-libro.jpg",
  costura: "https://ik.imagekit.io/hr20qlpupi/victoria/21-costura-libro.jpg",
};

/**
 * Helper para resolver la portada de un libro por su slug.
 * Permite fallback opcional a book.coverImage o book.portada.
 */
export const getBookCover = (slug: string, fallback?: string): string => {
  return BOOK_COVERS[slug] || fallback || '';
};
