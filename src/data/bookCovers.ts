/**
 * =============================================================================
 * CORRESPONDENCIAS OFICIALES DE PORTADAS — VICTORIA MACIASS
 * =============================================================================
 *
 * Mapeo centralizado e independiente entre el slug de cada libro y la URL
 * de su portada oficial alojada en ImageKit.
 *
 * Catálogo completo: 39 libros (21 temáticas generales + 18 de cocina y recetas).
 */

export const BOOK_COVERS: Record<string, string> = {
  // =========================================================================
  // 1. TEMÁTICAS GENERALES (21 libros)
  // =========================================================================
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

  // =========================================================================
  // 2. COCINA Y RECETAS (18 libros)
  // Nota: Las imágenes 7 y 10 fueron contrastadas visualmente con sus portadas:
  // - 7-recetas-variadas-libro-600.jpg -> "Recetas Variadas Deliciosas" (slug: recetas-variadas)
  // - 10-recetas-variadas-deliciosas-libro-600.jpg -> "Recetas de Cocina Deliciosa" (slug: cocina-deliciosa)
  // =========================================================================
  "ensaladas-sabores": "https://ik.imagekit.io/hr20qlpupi/victoria/1-ensaladas-recetas-libro-600.jpg",
  "ensaladas-150": "https://ik.imagekit.io/hr20qlpupi/victoria/2-ensaladas-recetas-libro-600.jpg",
  "carnes-rojas": "https://ik.imagekit.io/hr20qlpupi/victoria/3-recetas-carne-libro-600.jpg",
  "recetas-pollo": "https://ik.imagekit.io/hr20qlpupi/victoria/4-recetas-pollo-libro-600.jpg",
  "recetas-bajar-peso": "https://ik.imagekit.io/hr20qlpupi/victoria/5-recetas-bajar-de-peso-libro-600.jpg",
  "sabores-irresistibles": "https://ik.imagekit.io/hr20qlpupi/victoria/6-sabores-irresistibles-libro-600.jpg",
  "recetas-variadas": "https://ik.imagekit.io/hr20qlpupi/victoria/7-recetas-variadas-libro-600.jpg",
  "arte-paella": "https://ik.imagekit.io/hr20qlpupi/victoria/8-paella-arte-libro-600.jpg",
  "paellas-100": "https://ik.imagekit.io/hr20qlpupi/victoria/9-paellas-100-libro-600.jpg",
  "cocina-deliciosa": "https://ik.imagekit.io/hr20qlpupi/victoria/10-recetas-variadas-deliciosas-libro-600.jpg",
  "cocina-espanol": "https://ik.imagekit.io/hr20qlpupi/victoria/11-libro-de-cocina-600.jpg",
  "recetas-fitness": "https://ik.imagekit.io/hr20qlpupi/victoria/12-fitness-dieta-libro-600.jpg",
  "recetas-quinoa": "https://ik.imagekit.io/hr20qlpupi/victoria/13-quinoa-libro-600.jpg",
  "freidora-aire": "https://ik.imagekit.io/hr20qlpupi/victoria/14-freidera-recetas-libro-600.jpg",
  "galletas-epicas": "https://ik.imagekit.io/hr20qlpupi/victoria/15-galletas-libro-600.jpg",
  "sistema-inmunologico": "https://ik.imagekit.io/hr20qlpupi/victoria/16-sistema-inmunologico-libro-600.jpg",
  aderezos: "https://ik.imagekit.io/hr20qlpupi/victoria/17-aderezos-libro-600.jpg",
  "arroces-alma": "https://ik.imagekit.io/hr20qlpupi/victoria/18-arroces-con-alma-libro-600.jpg",
};

/**
 * Helper para resolver la portada de un libro por su slug.
 * Permite fallback opcional a book.coverImage o book.portada.
 */
export const getBookCover = (slug: string, fallback?: string): string => {
  return BOOK_COVERS[slug] || fallback || '';
};
