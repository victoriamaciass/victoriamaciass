import { useEffect } from 'react';
import { BOOKS_DATA } from './booksData';
import { Book } from '../types/book';
import { CATEGORIES_LIST, CategoryInfo } from './categoriesData';
import { getBookCover } from './bookCovers';

export interface RouteSeoData {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  ogType?: string;
  twitterCard?: string;
  schemaJsonLd: object;
}

const BASE_URL = 'https://victoriamaciass.vercel.app';

/**
 * Genera el Schema.org JSON-LD para la Home
 */
function getHomeSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        url: `${BASE_URL}/`,
        name: 'Victoria Maciass',
        description: 'Libros y guías prácticas de cocina, salud, bienestar, mascotas, crecimiento personal y manualidades.',
        inLanguage: 'es',
        publisher: {
          '@id': `${BASE_URL}/#author`,
        },
      },
      {
        '@type': 'Person',
        '@id': `${BASE_URL}/#author`,
        name: 'Victoria Maciass',
        url: `${BASE_URL}/`,
        jobTitle: 'Autora y escritora',
        image: 'https://ik.imagekit.io/hr20qlpupi/victoria/logo_marca_victoria_maciass.png',
      },
      {
        '@type': 'CollectionPage',
        '@id': `${BASE_URL}/#collection`,
        url: `${BASE_URL}/`,
        name: 'Libros y Guías Prácticas | Victoria Maciass',
        description: 'Descubre 39 libros y guías prácticas sobre mascotas, cocina, salud, bienestar, crecimiento personal y creatividad. Explora la biblioteca de Victoria Maciass.',
        isPartOf: {
          '@id': `${BASE_URL}/#website`,
        },
        about: {
          '@id': `${BASE_URL}/#author`,
        },
        mainEntity: {
          '@type': 'ItemList',
          name: 'Categorías del catálogo editorial',
          numberOfItems: 6,
          itemListElement: CATEGORIES_LIST.map((cat, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: cat.title,
            url: `${BASE_URL}${cat.route}`,
          })),
        },
      },
    ],
  };
}

/**
 * Genera el Schema.org JSON-LD para una categoría
 */
function getCategorySchema(cat: CategoryInfo, books: Book[]): object {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${BASE_URL}${cat.route}#collection`,
        url: `${BASE_URL}${cat.route}`,
        name: `${cat.title} | Victoria Maciass`,
        description: cat.description,
        inLanguage: 'es',
        isPartOf: {
          '@id': `${BASE_URL}/#website`,
        },
        about: {
          '@id': `${BASE_URL}/#author`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${BASE_URL}${cat.route}#breadcrumbs`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: `${BASE_URL}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: cat.title,
            item: `${BASE_URL}${cat.route}`,
          },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': `${BASE_URL}${cat.route}#itemlist`,
        name: cat.title,
        numberOfItems: books.length,
        itemListElement: books.map((b, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: b.title,
          url: `${BASE_URL}/${b.slug}`,
          image: getBookCover(b.slug, b.coverImage || b.portada),
        })),
      },
    ],
  };
}

/**
 * Genera el Schema.org JSON-LD para un libro individual
 */
function getBookSchema(book: Book): object {
  const coverUrl = getBookCover(book.slug, book.coverImage || book.portada);
  const rawDescription =
    (book.fullDescription && book.fullDescription.length > 0)
      ? book.fullDescription.join(' ')
      : (book.descripcion && book.descripcion.length > 0)
        ? book.descripcion.join(' ')
        : book.synopsis || '';

  const shortDesc = rawDescription.slice(0, 200) || `Guía práctica de ${book.title} por Victoria Maciass.`;

  const cat = CATEGORIES_LIST.find(c => c.categoryId === book.category || c.slug === book.category);
  const catTitle = cat ? cat.title : (book.categoryLabel || 'Catálogo');
  const catRoute = cat ? cat.route : `/${book.category}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Book',
        '@id': `${BASE_URL}/${book.slug}#book`,
        url: `${BASE_URL}/${book.slug}`,
        name: book.title,
        headline: book.subtitle || book.title,
        description: shortDesc,
        inLanguage: 'es',
        image: coverUrl || 'https://ik.imagekit.io/hr20qlpupi/victoria/logo_marca_victoria_maciass.png',
        author: {
          '@type': 'Person',
          '@id': `${BASE_URL}/#author`,
          name: 'Victoria Maciass',
          url: `${BASE_URL}/`,
        },
        publisher: {
          '@type': 'Person',
          '@id': `${BASE_URL}/#author`,
          name: 'Victoria Maciass',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${BASE_URL}/${book.slug}#breadcrumbs`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: `${BASE_URL}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: catTitle,
            item: `${BASE_URL}${catRoute}`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: book.title,
            item: `${BASE_URL}/${book.slug}`,
          },
        ],
      },
    ],
  };
}

/**
 * Obtiene los metadatos SEO unificados para cualquier ruta de la aplicación.
 * Esta es la ÚNICA FUENTE DE VERDAD para el prerenderizado y la navegación en React.
 */
export function getSeoForRoute(pathname: string): RouteSeoData | undefined {
  const cleanPath = pathname.replace(/\/+$/, '') || '/';

  // 1. HOME
  if (cleanPath === '/') {
    return {
      title: 'Libros y Guías Prácticas | Victoria Maciass',
      description: 'Descubre 39 libros y guías prácticas sobre mascotas, cocina, salud, bienestar, crecimiento personal y creatividad. Explora la biblioteca de Victoria Maciass.',
      canonical: `${BASE_URL}/`,
      ogTitle: 'Victoria Maciass | Libros y Guías Prácticas',
      ogDescription: 'Explora un catálogo de libros y guías prácticas sobre cocina, mascotas, salud, bienestar, crecimiento personal y creatividad.',
      ogImage: 'https://ik.imagekit.io/hr20qlpupi/victoria/logo_marca_victoria_maciass.png',
      ogUrl: `${BASE_URL}/`,
      ogType: 'website',
      twitterCard: 'summary_large_image',
      schemaJsonLd: getHomeSchema(),
    };
  }

  // 2. CATEGORÍA: MASCOTAS
  if (cleanPath === '/mascotas') {
    const books = BOOKS_DATA.filter(b => b.category === 'mascotas' || b.categoria === 'mascotas');
    const cat = CATEGORIES_LIST.find(c => c.slug === 'mascotas')!;
    return {
      title: 'Libros sobre Mascotas: Perros, Gatos y Gallinas | Victoria Maciass',
      description: 'Descubre libros y guías prácticas sobre perros, gatos y gallinas. Aprende sobre sus cuidados, comportamiento, educación y convivencia.',
      canonical: `${BASE_URL}/mascotas`,
      ogTitle: 'Libros sobre Mascotas: Perros, Gatos y Gallinas | Victoria Maciass',
      ogDescription: 'Descubre libros y guías prácticas sobre perros, gatos y gallinas. Aprende sobre sus cuidados, comportamiento, educación y convivencia.',
      ogImage: 'https://ik.imagekit.io/hr20qlpupi/victoria/1-gallinas-libro.jpg',
      ogUrl: `${BASE_URL}/mascotas`,
      ogType: 'website',
      twitterCard: 'summary_large_image',
      schemaJsonLd: getCategorySchema(cat, books),
    };
  }

  // 3. CATEGORÍA: MENTE Y EMOCIONES
  if (cleanPath === '/mente-emociones') {
    const books = BOOKS_DATA.filter(b => b.category === 'salud-mental' || b.categoria === 'salud-mental');
    const cat = CATEGORIES_LIST.find(c => c.slug === 'mente-emociones')!;
    return {
      title: 'Libros de Salud Mental, Emociones y Bienestar | Victoria Maciass',
      description: 'Descubre libros y guías prácticas sobre ansiedad, ataques de pánico, gestión de las emociones y bienestar mental. Explora las publicaciones de Victoria Maciass.',
      canonical: `${BASE_URL}/mente-emociones`,
      ogTitle: 'Libros de Salud Mental, Emociones y Bienestar | Victoria Maciass',
      ogDescription: 'Descubre libros y guías prácticas sobre ansiedad, ataques de pánico, gestión de las emociones y bienestar mental. Explora las publicaciones de Victoria Maciass.',
      ogImage: 'https://ik.imagekit.io/hr20qlpupi/victoria/3-ansiedad1-libro.jpg',
      ogUrl: `${BASE_URL}/mente-emociones`,
      ogType: 'website',
      twitterCard: 'summary_large_image',
      schemaJsonLd: getCategorySchema(cat, books),
    };
  }

  // 4. CATEGORÍA: CRECIMIENTO PERSONAL
  if (cleanPath === '/crecimiento-personal') {
    const books = BOOKS_DATA.filter(b => b.category === 'desarrollo-personal' || b.categoria === 'desarrollo-personal');
    const cat = CATEGORIES_LIST.find(c => c.slug === 'crecimiento-personal')!;
    return {
      title: 'Libros de Crecimiento Personal y Desarrollo Personal | Victoria Maciass',
      description: 'Descubre libros de crecimiento personal sobre hábitos, motivación, desarrollo de la mente y numerología. Explora guías y publicaciones de Victoria Maciass.',
      canonical: `${BASE_URL}/crecimiento-personal`,
      ogTitle: 'Libros de Crecimiento Personal | Victoria Maciass',
      ogDescription: 'Explora libros sobre hábitos, motivación, desarrollo de la mente y numerología. Descubre la colección de crecimiento personal de Victoria Maciass.',
      ogImage: 'https://ik.imagekit.io/hr20qlpupi/victoria/11--habitos-libro.jpg',
      ogUrl: `${BASE_URL}/crecimiento-personal`,
      ogType: 'website',
      twitterCard: 'summary_large_image',
      schemaJsonLd: getCategorySchema(cat, books),
    };
  }

  // 5. CATEGORÍA: CUERPO Y SALUD
  if (cleanPath === '/cuerpo-salud') {
    const books = BOOKS_DATA.filter(b => b.category === 'salud-cuerpo' || b.categoria === 'salud-cuerpo');
    const cat = CATEGORIES_LIST.find(c => c.slug === 'cuerpo-salud')!;
    return {
      title: 'Libros de Salud, Cuidado del Cuerpo y Bienestar Físico | Victoria Maciass',
      description: 'Descubre 7 libros y guías prácticas sobre salud corporal, varices, metabolismo, celulitis, sudoración excesiva, fertilidad y desintoxicación con Victoria Maciass.',
      canonical: `${BASE_URL}/cuerpo-salud`,
      ogTitle: 'Libros de Salud, Cuidado del Cuerpo y Bienestar Físico | Victoria Maciass',
      ogDescription: 'Descubre 7 libros y guías prácticas sobre salud corporal, varices, metabolismo, celulitis, sudoración excesiva, fertilidad y desintoxicación con Victoria Maciass.',
      ogImage: 'https://ik.imagekit.io/hr20qlpupi/victoria/6-varices-libro.jpg',
      ogUrl: `${BASE_URL}/cuerpo-salud`,
      ogType: 'website',
      twitterCard: 'summary_large_image',
      schemaJsonLd: getCategorySchema(cat, books),
    };
  }

  // 6. CATEGORÍA: COCINA Y RECETAS
  if (cleanPath === '/cocina') {
    const books = BOOKS_DATA.filter(b => b.category === 'cocina-recetas' || b.categoria === 'cocina-recetas');
    const cat = CATEGORIES_LIST.find(c => c.slug === 'cocina')!;
    return {
      title: 'Libros de Cocina y Recetas: Recetarios Variados | Victoria Maciass',
      description: 'Descubre 18 libros de cocina y recetas: ensaladas, quinoa, carnes, pollo, paellas, arroces, galletas y cocina saludable. Explora los recetarios de Victoria Maciass.',
      canonical: `${BASE_URL}/cocina`,
      ogTitle: 'Libros de Cocina y Recetas: Recetarios Variados | Victoria Maciass',
      ogDescription: 'Descubre 18 libros de cocina y recetas: ensaladas, quinoa, carnes, pollo, paellas, arroces, galletas y cocina saludable. Explora los recetarios de Victoria Maciass.',
      ogImage: 'https://ik.imagekit.io/hr20qlpupi/victoria/8-paella-arte-libro-600.jpg',
      ogUrl: `${BASE_URL}/cocina`,
      ogType: 'website',
      twitterCard: 'summary_large_image',
      schemaJsonLd: getCategorySchema(cat, books),
    };
  }

  // 7. CATEGORÍA: MANOS Y MISTERIO
  if (cleanPath === '/manos-misterio') {
    const books = BOOKS_DATA.filter(b => b.category === 'manualidades-esoterismo' || b.categoria === 'manualidades-esoterismo');
    const cat = CATEGORIES_LIST.find(c => c.slug === 'manos-misterio')!;
    return {
      title: 'Libros de Manualidades, Costura y Artesanía | Victoria Maciass',
      description: 'Descubre libros sobre manualidades, velas artesanales, costura y conjuros conscientes. Explora la colección creativa de Victoria Maciass.',
      canonical: `${BASE_URL}/manos-misterio`,
      ogTitle: 'Libros de Manualidades, Artesanía y Misterio | Victoria Maciass',
      ogDescription: 'Explora publicaciones sobre creatividad manual, elaboración de velas artesanales, costura y prácticas simbólicas.',
      ogImage: 'https://ik.imagekit.io/hr20qlpupi/victoria/17-velas.jpg',
      ogUrl: `${BASE_URL}/manos-misterio`,
      ogType: 'website',
      twitterCard: 'summary_large_image',
      schemaJsonLd: getCategorySchema(cat, books),
    };
  }

  // 8. FICHAS INDIVIDUALES DE LIBRO (39 LIBROS)
  const bookSlug = cleanPath.replace(/^\//, '');
  const book = BOOKS_DATA.find(b => b.slug.toLowerCase() === bookSlug.toLowerCase());
  if (book) {
    const coverUrl = getBookCover(book.slug, book.coverImage || book.portada);
    const rawDescription =
      (book.fullDescription && book.fullDescription.length > 0)
        ? book.fullDescription.join(' ')
        : (book.descripcion && book.descripcion.length > 0)
          ? book.descripcion.join(' ')
          : book.synopsis || '';

    const firstWords = rawDescription.slice(0, 155) || `Guía práctica de ${book.title} por Victoria Maciass.`;

    if (book.slug === 'gallinas') {
      return {
        title: 'La Guía De Las Gallinas | Crianza y Cuidados – Victoria Maciass',
        description: 'Descubre cómo criar gallinas en casa: razas, alimentación, gallinero, reproducción, salud y puesta de huevos. Una guía de Victoria Maciass.',
        canonical: `${BASE_URL}/gallinas`,
        ogTitle: 'La Guía De Las Gallinas | Crianza y Cuidados – Victoria Maciass',
        ogDescription: 'Descubre cómo criar gallinas en casa: razas, alimentación, gallinero, reproducción, salud y puesta de huevos. Una guía de Victoria Maciass.',
        ogImage: coverUrl || 'https://ik.imagekit.io/hr20qlpupi/victoria/1-gallinas-libro.jpg',
        ogUrl: `${BASE_URL}/gallinas`,
        ogType: 'book',
        twitterCard: 'summary_large_image',
        schemaJsonLd: getBookSchema(book),
      };
    }

    if (book.slug === 'gatos') {
      return {
        title: 'El Arte de Amar a un Gato | Comportamiento y Cuidados',
        description: 'Aprende a comprender el comportamiento de tu gato, cuidar su bienestar y mejorar la convivencia. Una guía práctica de Victoria Maciass.',
        canonical: `${BASE_URL}/gatos`,
        ogTitle: 'El Arte de Amar a un Gato | Comportamiento y Cuidados',
        ogDescription: 'Aprende a comprender el comportamiento de tu gato, cuidar su bienestar y mejorar la convivencia. Una guía práctica de Victoria Maciass.',
        ogImage: coverUrl || 'https://ik.imagekit.io/hr20qlpupi/victoria/20-gatos-libro.jpg',
        ogUrl: `${BASE_URL}/gatos`,
        ogType: 'book',
        twitterCard: 'summary_large_image',
        schemaJsonLd: getBookSchema(book),
      };
    }

    if (book.slug === 'perros') {
      return {
        title: 'Adiestramiento Canino: Guía Completa para Entrenar a tu Perro',
        description: 'Descubre cómo educar a tu perro, comprender su comportamiento y trabajar la obediencia, la socialización y los problemas de conducta.',
        canonical: `${BASE_URL}/perros`,
        ogTitle: 'Adiestramiento Canino: Guía Completa para Entrenar a tu Perro',
        ogDescription: 'Descubre cómo educar a tu perro, comprender su comportamiento y trabajar la obediencia, la socialización y los problemas de conducta.',
        ogImage: coverUrl || 'https://ik.imagekit.io/hr20qlpupi/victoria/2-perros-libro.jpg',
        ogUrl: `${BASE_URL}/perros`,
        ogType: 'book',
        twitterCard: 'summary_large_image',
        schemaJsonLd: getBookSchema(book),
      };
    }

    if (book.slug === 'ansiedad-vida') {
      return {
        title: 'Una Vida sin Ansiedad ni Ataques de Pánico | Victoria Maciass',
        description: 'Descubre una guía cercana para comprender la ansiedad y los ataques de pánico, afrontar el miedo y recuperar la confianza mediante herramientas prácticas para el día a día.',
        canonical: `${BASE_URL}/ansiedad-vida`,
        ogTitle: 'Una Vida sin Ansiedad ni Ataques de Pánico | Victoria Maciass',
        ogDescription: 'Descubre una guía cercana para comprender la ansiedad y los ataques de pánico, afrontar el miedo y recuperar la confianza mediante herramientas prácticas para el día a día.',
        ogImage: coverUrl || 'https://ik.imagekit.io/hr20qlpupi/victoria/3-ansiedad1-libro.jpg',
        ogUrl: `${BASE_URL}/ansiedad-vida`,
        ogType: 'book',
        twitterCard: 'summary_large_image',
        schemaJsonLd: getBookSchema(book),
      };
    }

    if (book.slug === 'ansiedad-liberate') {
      return {
        title: 'Libérate de la Ansiedad: Alimentación, Sueño y Relajación',
        description: 'Descubre cómo alimentación, sueño, ejercicio, respiración y técnicas de relajación pueden ayudarte a gestionar la ansiedad y recuperar el equilibrio diario.',
        canonical: `${BASE_URL}/ansiedad-liberate`,
        ogTitle: 'Libérate de la Ansiedad | Victoria Maciass',
        ogDescription: 'Descubre cómo alimentación, sueño, ejercicio, respiración y técnicas de relajación pueden ayudarte a gestionar la ansiedad y recuperar el equilibrio diario.',
        ogImage: coverUrl || 'https://ik.imagekit.io/hr20qlpupi/victoria/4-ansiedad2-libro.jpg',
        ogUrl: `${BASE_URL}/ansiedad-liberate`,
        ogType: 'book',
        twitterCard: 'summary_large_image',
        schemaJsonLd: getBookSchema(book),
      };
    }

    if (book.slug === 'ansiedad-control') {
      return {
        title: 'Cómo Controlar la Ansiedad: Relaciones y Bienestar Emocional',
        description: 'Aprende a reconstruir tus relaciones, comunicar lo que sientes, establecer límites y recuperar tu propósito y bienestar emocional después de la ansiedad.',
        canonical: `${BASE_URL}/ansiedad-control`,
        ogTitle: 'Cómo Controlar La Ansiedad | Victoria Maciass',
        ogDescription: 'Aprende a reconstruir tus relaciones, comunicar lo que sientes, establecer límites y recuperar tu propósito y bienestar emocional después de la ansiedad.',
        ogImage: coverUrl || 'https://ik.imagekit.io/hr20qlpupi/victoria/5-ansiedad3-libro.jpg',
        ogUrl: `${BASE_URL}/ansiedad-control`,
        ogType: 'book',
        twitterCard: 'summary_large_image',
        schemaJsonLd: getBookSchema(book),
      };
    }

    if (book.slug === 'suenos') {
      return {
        title: 'El Libro de los Sueños: Cuentos para Dormir y Leer en Familia',
        description: 'Descubre cuentos clásicos y originales para niños y adultos. Historias para dormir, leer en familia y fomentar la imaginación, los valores y la inteligencia emocional.',
        canonical: `${BASE_URL}/suenos`,
        ogTitle: 'El Libro de los Sueños | Victoria Maciass',
        ogDescription: 'Descubre cuentos clásicos y originales para niños y adultos. Historias para dormir, leer en familia y fomentar la imaginación, los valores y la inteligencia emocional.',
        ogImage: coverUrl || 'https://ik.imagekit.io/hr20qlpupi/victoria/9-cuentos-libro.jpg',
        ogUrl: `${BASE_URL}/suenos`,
        ogType: 'book',
        twitterCard: 'summary_large_image',
        schemaJsonLd: getBookSchema(book),
      };
    }

    if (book.slug === 'velas') {
      return {
        title: 'Cómo Hacer Velas Aromáticas | Guía de Velas Artesanales',
        description: 'Aprende cómo hacer velas aromáticas y artesanales paso a paso. Descubre tipos de cera, mechas, fragancias, aceites esenciales y técnicas de elaboración.',
        canonical: `${BASE_URL}/velas`,
        ogTitle: 'Cómo hacer velas Artesanales aromáticas',
        ogDescription: 'Aprende cómo hacer velas aromáticas y artesanales paso a paso. Descubre tipos de cera, mechas, fragancias, aceites esenciales y técnicas de elaboración.',
        ogImage: coverUrl || 'https://ik.imagekit.io/hr20qlpupi/victoria/17-velas.jpg',
        ogUrl: `${BASE_URL}/velas`,
        ogType: 'book',
        twitterCard: 'summary_large_image',
        schemaJsonLd: getBookSchema(book),
      };
    }

    if (book.slug === 'costura') {
      return {
        title: 'Aprender a Coser desde Cero | Guía de Costura',
        description: 'Aprende costura desde cero, conoce las telas, herramientas, patrones y puntadas básicas, y descubre cómo crear tus propias prendas paso a paso.',
        canonical: `${BASE_URL}/costura`,
        ogTitle: 'La costura que querías aprender',
        ogDescription: 'Aprende costura desde cero, conoce las telas, herramientas, patrones y puntadas básicas, y descubre cómo crear tus propias prendas paso a paso.',
        ogImage: coverUrl || 'https://ik.imagekit.io/hr20qlpupi/victoria/21-costura-libro.jpg',
        ogUrl: `${BASE_URL}/costura`,
        ogType: 'book',
        twitterCard: 'summary_large_image',
        schemaJsonLd: getBookSchema(book),
      };
    }

    return {
      title: `${book.title} — Victoria Maciass`,
      description: firstWords,
      canonical: `${BASE_URL}/${book.slug}`,
      ogTitle: `${book.title} — Victoria Maciass`,
      ogDescription: firstWords,
      ogImage: coverUrl || 'https://ik.imagekit.io/hr20qlpupi/victoria/logo_marca_victoria_maciass.png',
      ogUrl: `${BASE_URL}/${book.slug}`,
      ogType: 'book',
      twitterCard: 'summary_large_image',
      schemaJsonLd: getBookSchema(book),
    };
  }

  return undefined;
}

/**
 * Lista de todas las 46 rutas públicas del sitio
 */
export function getAllPublicRoutes(): string[] {
  const routes = ['/'];
  for (const cat of CATEGORIES_LIST) {
    routes.push(cat.route);
  }
  for (const book of BOOKS_DATA) {
    routes.push(`/${book.slug}`);
  }
  return routes;
}

/**
 * Hook de React para sincronizar los metadatos y JSON-LD durante la navegación interna.
 * Utiliza exactamente la misma fuente de verdad que el prerenderizado estático.
 */
export function useApplyRouteSeo(pathname: string) {
  useEffect(() => {
    const seo = getSeoForRoute(pathname);
    if (!seo) return;

    // Title
    document.title = seo.title;

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', seo.description);
    }

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', seo.canonical);
    }

    // Open Graph
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', seo.ogTitle);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', seo.ogDescription);

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', seo.ogUrl);

    let ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) ogImage.setAttribute('content', seo.ogImage);

    // Twitter Card
    let twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', seo.ogTitle);

    let twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', seo.ogDescription);

    let twImage = document.querySelector('meta[name="twitter:image"]');
    if (twImage) twImage.setAttribute('content', seo.ogImage);

    // Schema.org JSON-LD unificado
    const schemaScriptId = 'unified-route-jsonld';
    let scriptElement = document.getElementById(schemaScriptId) as HTMLScriptElement | null;
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = schemaScriptId;
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }
    scriptElement.textContent = JSON.stringify(seo.schemaJsonLd);
  }, [pathname]);
}
