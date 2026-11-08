import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { CategoryInfo, CATEGORIES_LIST } from '../data/categoriesData';
import { GlobalNavbar } from './GlobalNavbar';

interface CuerpoSaludCategoryViewProps {
  categoryInfo: CategoryInfo;
}

interface SaludBookItem {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  coverUrl: string;
  altText: string;
}

const SALUD_BOOKS: SaludBookItem[] = [
  {
    slug: 'varices',
    title: 'Método Varices',
    subtitle: 'Secretos para piernas saludables, circulación y bienestar diario.',
    description:
      'Una guía detallada sobre las causas, hábitos preventivos y cuidados cotidianos para el bienestar vascular de las piernas.',
    coverUrl: 'https://ik.imagekit.io/hr20qlpupi/victoria/6-varices-libro.jpg',
    altText: 'Portada del libro Método Varices de Victoria Maciass',
  },
  {
    slug: 'sudoracion',
    title: 'Sudoración Excesiva',
    subtitle: 'Información práctica y hábitos para el cuidado y la termorregulación corporal.',
    description:
      'Contenidos orientados a comprender la sudoración excesiva y adoptar pautas de higiene y cuidado personal.',
    coverUrl: 'https://ik.imagekit.io/hr20qlpupi/victoria/7-sudor-libro.jpg',
    altText: 'Portada del libro Sudoración Excesiva de Victoria Maciass',
  },
  {
    slug: 'celulitis',
    title: 'Celulitis Bajo Control',
    subtitle: 'Cuidado de la piel, hábitos saludables y bienestar corporal.',
    description:
      'Publicación centrada en hábitos diarios, nutrición y cuidados tópicos para mejorar el aspecto y la firmeza de la piel.',
    coverUrl: 'https://ik.imagekit.io/hr20qlpupi/victoria/8-celulitis-libro.jpg?updatedAt=1794004358519',
    altText: 'Portada del libro Celulitis Bajo Control de Victoria Maciass',
  },
  {
    slug: 'metabolismo',
    title: 'Domina tu Metabolismo',
    subtitle: 'Energía, funcionamiento del organismo y hábitos metabólicos conscientes.',
    description:
      'Una aproximación formativa al funcionamiento del metabolismo y la influencia de la nutrición en la vitalidad física.',
    coverUrl: 'https://ik.imagekit.io/hr20qlpupi/victoria/14-metabolismo-libro.jpg',
    altText: 'Portada del libro Domina tu Metabolismo de Victoria Maciass',
  },
  {
    slug: 'desintoxica',
    title: 'Desintoxica tu Cuerpo y tu Mente',
    subtitle: 'Hábitos depurativos, alimentación limpia y bienestar integral.',
    description:
      'Guía para ordenar pautas de alimentación y descanso, reduciendo la sobrecarga cotidiana de manera equilibrada.',
    coverUrl: 'https://ik.imagekit.io/hr20qlpupi/victoria/15-detox1-libro.jpg',
    altText: 'Portada del libro Desintoxica tu Cuerpo y tu Mente de Victoria Maciass',
  },
  {
    slug: 'desintoxicar-peso',
    title: 'Desintoxicar El Cuerpo Y Bajar De Peso',
    subtitle: 'Pautas alimentarias, ligereza y constancia para el bienestar diario.',
    description:
      'Enfoque práctico para adoptar elecciones nutricionales limpias y sostenibles sin medidas extremas.',
    coverUrl: 'https://ik.imagekit.io/hr20qlpupi/victoria/16-detox2-libro.jpg',
    altText: 'Portada del libro Desintoxicar El Cuerpo Y Bajar De Peso de Victoria Maciass',
  },
  {
    slug: 'fertilidad',
    title: 'Fertilidad Consciente',
    subtitle: 'Conocimiento del ciclo corporal, equilibrio y preparación personal.',
    description:
      'Publicación orientada a comprender los ritmos biológicos y el autocuidado corporal desde un enfoque reflexivo.',
    coverUrl: 'https://ik.imagekit.io/hr20qlpupi/victoria/19-embarazo-libro.jpg',
    altText: 'Portada del libro Fertilidad Consciente de Victoria Maciass',
  },
];

export const CuerpoSaludCategoryView: React.FC<CuerpoSaludCategoryViewProps> = ({ categoryInfo }) => {
  // Metadatos SEO específicos de Cuerpo y salud
  useEffect(() => {
    window.scrollTo(0, 0);

    document.title = 'Libros de Salud y Bienestar: Cuidado del Cuerpo | Victoria Maciass';

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Descubre libros sobre salud, varices, sudoración, celulitis, metabolismo, desintoxicación y fertilidad. Explora la colección de Victoria Maciass.'
      );
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://victoriamaciass.vercel.app/cuerpo-salud');
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute(
        'content',
        'Libros de Salud y Bienestar | Victoria Maciass'
      );
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute(
        'content',
        'Explora libros y guías sobre cuidado del cuerpo, circulación, metabolismo, bienestar físico y fertilidad.'
      );
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', 'https://victoriamaciass.vercel.app/cuerpo-salud');
    }

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      ogImage.setAttribute(
        'content',
        'https://ik.imagekit.io/hr20qlpupi/victoria/6-varices-libro.jpg'
      );
    }

    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage) {
      twitterImage.setAttribute(
        'content',
        'https://ik.imagekit.io/hr20qlpupi/victoria/6-varices-libro.jpg'
      );
    }

    // Inyección de Schema.org JSON-LD específico para Cuerpo y salud
    const schemaScriptId = 'schema-cuerpo-salud-jsonld';
    let scriptElement = document.getElementById(schemaScriptId) as HTMLScriptElement | null;
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = schemaScriptId;
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }

    const schemaData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          '@id': 'https://victoriamaciass.vercel.app/cuerpo-salud#collection',
          url: 'https://victoriamaciass.vercel.app/cuerpo-salud',
          name: 'Libros de Salud y Bienestar: Cuidado del Cuerpo | Victoria Maciass',
          description:
            'Descubre libros sobre salud, varices, sudoración, celulitis, metabolismo, desintoxicación y fertilidad. Explora la colección de Victoria Maciass.',
          isPartOf: {
            '@id': 'https://victoriamaciass.vercel.app/#website',
          },
          about: {
            '@id': 'https://victoriamaciass.vercel.app/#author',
          },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://victoriamaciass.vercel.app/cuerpo-salud#breadcrumbs',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Inicio',
              item: 'https://victoriamaciass.vercel.app/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Cuerpo y salud',
              item: 'https://victoriamaciass.vercel.app/cuerpo-salud',
            },
          ],
        },
        {
          '@type': 'ItemList',
          '@id': 'https://victoriamaciass.vercel.app/cuerpo-salud#itemlist',
          name: 'Libros de Salud y Bienestar',
          numberOfItems: 7,
          itemListElement: SALUD_BOOKS.map((b, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: b.title,
            url: `https://victoriamaciass.vercel.app/${b.slug}`,
            image: b.coverUrl,
          })),
        },
      ],
    };

    scriptElement.textContent = JSON.stringify(schemaData);

    return () => {
      const el = document.getElementById(schemaScriptId);
      if (el) {
        el.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#fbfbf9] text-stone-900 font-sans selection:bg-stone-200">
      {/* 1. Barra de Navegación Global */}
      <GlobalNavbar />

      {/* 2. Migas de pan (Breadcrumbs): Inicio → Cuerpo y salud */}
      <nav aria-label="Migas de pan" className="border-b border-stone-200/70 bg-[#fbfbf9]/90 py-3.5">
        <div className="max-w-6xl mx-auto px-6 flex items-center gap-2 text-sm text-stone-600">
          <Link to="/" className="hover:text-stone-900 transition-colors font-medium">
            Inicio
          </Link>
          <ChevronRight className="w-4 h-4 text-stone-400" />
          <span className="text-stone-900 font-semibold">{categoryInfo.title}</span>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12 sm:py-16">
        {/* ====================================================================
            A. ENCABEZADO DE CATEGORÍA
            Un único H1 atractivo, claro y compacto
            ==================================================================== */}
        <header className="max-w-3xl mb-12 sm:mb-14">
          <div className="flex items-center gap-2 text-xs sm:text-[13px] font-semibold uppercase tracking-wider text-stone-600 mb-2.5 font-sans">
            <span>Colección temática</span>
            <span>·</span>
            <span>7 publicaciones disponibles</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] font-bold tracking-tight text-stone-900 leading-[1.12]">
            Libros sobre Salud, Bienestar y Cuidado del Cuerpo
          </h1>

          <p className="mt-4 text-[16px] sm:text-[17px] md:text-[18px] text-stone-700 leading-relaxed font-sans">
            Descubre libros y guías prácticas sobre salud, bienestar físico y cuidado del cuerpo. Esta colección reúne publicaciones sobre circulación, sudoración, celulitis, metabolismo, desintoxicación y fertilidad. Explora diferentes temas relacionados con el conocimiento corporal y el cuidado personal a través de contenidos organizados por temática.
          </p>
        </header>

        {/* ====================================================================
            B. PRESENTACIÓN DE LOS TEMAS
            Sección breve con título y seis áreas temáticas respaldadas
            ==================================================================== */}
        <section aria-label="Temas de salud y bienestar" className="mb-16">
          <div className="mb-6">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
              Explora los temas de salud y bienestar
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="bg-white border border-stone-200/90 rounded-xl p-5 sm:p-6 shadow-2xs hover:border-stone-400 transition-colors">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#163a2b] block mb-1 font-sans">
                Salud vascular
              </span>
              <h3 className="font-serif text-lg sm:text-[20px] font-bold text-stone-900 mb-2">
                Circulación y varices
              </h3>
              <p className="text-xs sm:text-[13.5px] text-stone-700 leading-relaxed font-sans">
                Publicaciones relacionadas con las varices y el cuidado de la circulación de las piernas.
              </p>
            </div>

            <div className="bg-white border border-stone-200/90 rounded-xl p-5 sm:p-6 shadow-2xs hover:border-stone-400 transition-colors">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#163a2b] block mb-1 font-sans">
                Termorregulación
              </span>
              <h3 className="font-serif text-lg sm:text-[20px] font-bold text-stone-900 mb-2">
                Sudoración y cuidado corporal
              </h3>
              <p className="text-xs sm:text-[13.5px] text-stone-700 leading-relaxed font-sans">
                Contenidos sobre sudoración excesiva y aspectos prácticos del cuidado e higiene personal.
              </p>
            </div>

            <div className="bg-white border border-stone-200/90 rounded-xl p-5 sm:p-6 shadow-2xs hover:border-stone-400 transition-colors">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#163a2b] block mb-1 font-sans">
                Cuidado dérmico
              </span>
              <h3 className="font-serif text-lg sm:text-[20px] font-bold text-stone-900 mb-2">
                Celulitis y cuidado de la piel
              </h3>
              <p className="text-xs sm:text-[13.5px] text-stone-700 leading-relaxed font-sans">
                Publicaciones relacionadas con la celulitis, la firmeza y el aspecto de la piel.
              </p>
            </div>

            <div className="bg-white border border-stone-200/90 rounded-xl p-5 sm:p-6 shadow-2xs hover:border-stone-400 transition-colors">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#163a2b] block mb-1 font-sans">
                Energía y nutrición
              </span>
              <h3 className="font-serif text-lg sm:text-[20px] font-bold text-stone-900 mb-2">
                Metabolismo y bienestar
              </h3>
              <p className="text-xs sm:text-[13.5px] text-stone-700 leading-relaxed font-sans">
                Contenidos sobre el metabolismo y hábitos relacionados con el bienestar físico y la vitalidad.
              </p>
            </div>

            <div className="bg-white border border-stone-200/90 rounded-xl p-5 sm:p-6 shadow-2xs hover:border-stone-400 transition-colors">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#163a2b] block mb-1 font-sans">
                Pautas alimentarias
              </span>
              <h3 className="font-serif text-lg sm:text-[20px] font-bold text-stone-900 mb-2">
                Desintoxicación y hábitos saludables
              </h3>
              <p className="text-xs sm:text-[13.5px] text-stone-700 leading-relaxed font-sans">
                Publicaciones que abordan la temática de la depuración y la alimentación limpia desde su enfoque editorial.
              </p>
            </div>

            <div className="bg-white border border-stone-200/90 rounded-xl p-5 sm:p-6 shadow-2xs hover:border-stone-400 transition-colors">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#163a2b] block mb-1 font-sans">
                Ciclos biológicos
              </span>
              <h3 className="font-serif text-lg sm:text-[20px] font-bold text-stone-900 mb-2">
                Fertilidad
              </h3>
              <p className="text-xs sm:text-[13.5px] text-stone-700 leading-relaxed font-sans">
                Contenidos relacionados con la fertilidad, el ciclo reproductivo y el conocimiento del cuerpo.
              </p>
            </div>
          </div>
        </section>

        {/* ====================================================================
            C. CATÁLOGO DE LIBROS
            H2 del catálogo y siete tarjetas equilibradas en cuadrícula
            ==================================================================== */}
        <section aria-labelledby="catalogo-salud-heading" className="mb-20">
          <div className="mb-10 max-w-2xl">
            <h2
              id="catalogo-salud-heading"
              className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-bold text-stone-900 tracking-tight leading-snug"
            >
              Libros de Salud y Bienestar
            </h2>
            <p className="mt-3 text-[15px] sm:text-[16px] text-stone-700 leading-relaxed font-sans">
              Explora las siete publicaciones de esta colección dedicadas al cuidado personal, la circulación, el metabolismo, la desintoxicación y la fertilidad.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
            {SALUD_BOOKS.map((book) => (
              <article
                key={book.slug}
                className="bg-white border border-stone-200/90 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-2xs hover:border-stone-400 hover:shadow-md transition-all duration-200"
              >
                <div>
                  {/* Portada en proporción 2:3 */}
                  <div className="w-full flex justify-center mb-5">
                    <Link
                      to={`/${book.slug}`}
                      className="w-full max-w-[170px] block transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 rounded-lg"
                      title={`Ver detalles de ${book.title}`}
                    >
                      <div
                        className="w-full aspect-[2/3] rounded-lg overflow-hidden bg-white select-none"
                        style={{
                          boxShadow:
                            '0 12px 28px -8px rgba(0, 0, 0, 0.22), 0 4px 10px -4px rgba(0, 0, 0, 0.1)',
                        }}
                      >
                        <img
                          src={book.coverUrl}
                          alt={book.altText}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain block"
                          loading="lazy"
                        />
                      </div>
                    </Link>
                  </div>

                  {/* Título de la obra (H3 semántico bajo el catálogo H2) */}
                  <h3 className="font-serif text-lg sm:text-[19px] font-bold text-stone-900 leading-snug min-h-[50px] flex items-center">
                    <Link
                      to={`/${book.slug}`}
                      className="hover:text-stone-700 transition-colors"
                    >
                      {book.title}
                    </Link>
                  </h3>

                  {/* Subtítulo */}
                  <p className="mt-2 text-xs sm:text-[13px] font-medium text-stone-600 line-clamp-2 leading-relaxed font-sans min-h-[38px]">
                    {book.subtitle}
                  </p>

                  {/* Descripción breve */}
                  <p className="mt-3 text-xs sm:text-[13.5px] text-stone-700 leading-relaxed font-sans border-t border-stone-100 pt-2.5">
                    {book.description}
                  </p>
                </div>

                {/* Enlace y botón hacia la ficha individual */}
                <div className="mt-6 pt-3.5 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-stone-400">/{book.slug}</span>
                  <Link
                    to={`/${book.slug}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-stone-900 hover:bg-[#163a2b] rounded-lg transition-colors shadow-2xs group focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
                  >
                    <span>Ver libro</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ====================================================================
            D. CONTENIDO EDITORIAL SEO COMPLEMENTARIO
            Secciones temáticas rigurosas con H2 y enlaces contextuales
            ==================================================================== */}
        <section aria-label="Información editorial complementaria" className="mt-16 pt-12 border-t border-stone-200/80 max-w-4xl">
          {/* Bloque 1 */}
          <div className="mb-12">
            <h2 className="font-serif text-2xl sm:text-[28px] font-bold text-stone-900 tracking-tight leading-snug mb-4">
              Salud y bienestar: libros para conocer mejor el cuerpo
            </h2>
            <p className="text-[16px] sm:text-[17px] text-stone-700 leading-relaxed font-sans">
              Conocer el cuerpo y sus diferentes procesos es una parte importante del cuidado personal. Los libros de esta colección abordan distintas temáticas relacionadas con la salud y el bienestar físico, desde cuestiones vinculadas con la circulación y el metabolismo hasta el cuidado corporal y la fertilidad. Cada publicación presenta un tema específico para quienes desean ampliar sus conocimientos y consultar información organizada por áreas.
            </p>
          </div>

          {/* Bloque 2: Varices */}
          <div className="mb-12 bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs">
            <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-stone-900 tracking-tight leading-snug mb-3.5">
              Libros sobre varices y circulación
            </h2>
            <p className="text-[16px] sm:text-[17px] text-stone-700 leading-relaxed font-sans">
              Las varices y la circulación son temas de interés para muchas personas que desean conocer mejor el funcionamiento del sistema circulatorio y las cuestiones relacionadas con el cuidado de las piernas. En esta sección encontrarás una publicación dedicada a las varices, cuya ficha individual permite consultar con más detalle los contenidos que aborda.
            </p>
            <div className="mt-4 pt-3 border-t border-stone-100">
              <Link
                to="/varices"
                className="inline-flex items-center gap-2 text-[15px] sm:text-[16px] font-semibold text-stone-900 hover:text-[#163a2b] transition-colors group font-sans"
              >
                <span>Consultar el libro Método Varices</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Bloque 3: Sudoración */}
          <div className="mb-12 bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs">
            <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-stone-900 tracking-tight leading-snug mb-3.5">
              Libros sobre sudoración excesiva
            </h2>
            <p className="text-[16px] sm:text-[17px] text-stone-700 leading-relaxed font-sans">
              La sudoración es un proceso natural del organismo, aunque puede convertirse en una preocupación cuando se presenta de manera excesiva. Esta colección incluye una publicación dedicada a la sudoración excesiva, con información sobre la temática y los contenidos desarrollados en el libro.
            </p>
            <div className="mt-4 pt-3 border-t border-stone-100">
              <Link
                to="/sudoracion"
                className="inline-flex items-center gap-2 text-[15px] sm:text-[16px] font-semibold text-stone-900 hover:text-[#163a2b] transition-colors group font-sans"
              >
                <span>Consultar el libro Sudoración Excesiva</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Bloque 4: Celulitis */}
          <div className="mb-12 bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs">
            <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-stone-900 tracking-tight leading-snug mb-3.5">
              Libros sobre celulitis y cuidado corporal
            </h2>
            <p className="text-[16px] sm:text-[17px] text-stone-700 leading-relaxed font-sans">
              La celulitis es una cuestión relacionada con el aspecto de la piel que despierta interés en el ámbito del cuidado corporal. En esta colección puedes encontrar un libro dedicado a esta temática y consultar su ficha para conocer su enfoque y los contenidos que desarrolla.
            </p>
            <div className="mt-4 pt-3 border-t border-stone-100">
              <Link
                to="/celulitis"
                className="inline-flex items-center gap-2 text-[15px] sm:text-[16px] font-semibold text-stone-900 hover:text-[#163a2b] transition-colors group font-sans"
              >
                <span>Consultar el libro Celulitis Bajo Control</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Bloque 5: Metabolismo */}
          <div className="mb-12 bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs">
            <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-stone-900 tracking-tight leading-snug mb-3.5">
              Libros sobre metabolismo y bienestar físico
            </h2>
            <p className="text-[16px] sm:text-[17px] text-stone-700 leading-relaxed font-sans">
              El metabolismo comprende los procesos mediante los cuales el organismo transforma y utiliza la energía. Si deseas conocer más sobre esta temática, aquí encontrarás una publicación dedicada al metabolismo, con información que puedes consultar directamente en la ficha del libro.
            </p>
            <div className="mt-4 pt-3 border-t border-stone-100">
              <Link
                to="/metabolismo"
                className="inline-flex items-center gap-2 text-[15px] sm:text-[16px] font-semibold text-stone-900 hover:text-[#163a2b] transition-colors group font-sans"
              >
                <span>Consultar el libro Domina tu Metabolismo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Bloque 6: Desintoxicación */}
          <div className="mb-12 bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs">
            <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-stone-900 tracking-tight leading-snug mb-3.5">
              Libros sobre desintoxicación y cuidado personal
            </h2>
            <p className="text-[16px] sm:text-[17px] text-stone-700 leading-relaxed font-sans">
              La desintoxicación es una temática frecuente en publicaciones relacionadas con el bienestar y el cuidado personal. Esta colección incluye libros que abordan este asunto desde sus respectivos enfoques editoriales. Consulta cada ficha para conocer su contenido, sin asumir que una publicación garantiza efectos médicos o resultados específicos.
            </p>
            <div className="mt-4 pt-3 border-t border-stone-100 flex flex-col sm:flex-row flex-wrap gap-4">
              <Link
                to="/desintoxica"
                className="inline-flex items-center gap-1.5 text-sm sm:text-[15px] font-semibold text-stone-900 hover:text-[#163a2b] transition-colors group font-sans"
              >
                <span>Desintoxica tu Cuerpo y tu Mente</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/desintoxicar-peso"
                className="inline-flex items-center gap-1.5 text-sm sm:text-[15px] font-semibold text-stone-900 hover:text-[#163a2b] transition-colors group font-sans"
              >
                <span>Desintoxicar El Cuerpo Y Bajar De Peso</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Bloque 7: Fertilidad */}
          <div className="mb-12 bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs">
            <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-stone-900 tracking-tight leading-snug mb-3.5">
              Libros sobre fertilidad y conocimiento del cuerpo
            </h2>
            <p className="text-[16px] sm:text-[17px] text-stone-700 leading-relaxed font-sans">
              La fertilidad es un tema que puede abordarse desde diferentes perspectivas informativas y personales. En esta colección encontrarás una publicación relacionada con esta temática. Su ficha individual ofrece más detalles sobre los contenidos y el enfoque del libro.
            </p>
            <div className="mt-4 pt-3 border-t border-stone-100">
              <Link
                to="/fertilidad"
                className="inline-flex items-center gap-2 text-[15px] sm:text-[16px] font-semibold text-stone-900 hover:text-[#163a2b] transition-colors group font-sans"
              >
                <span>Consultar el libro Fertilidad Consciente</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Bloque 8: Cierre */}
          <div className="mb-8">
            <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-stone-900 tracking-tight leading-snug mb-3.5">
              Encuentra el libro de salud y bienestar que buscas
            </h2>
            <p className="text-[16px] sm:text-[17px] text-stone-700 leading-relaxed font-sans">
              Explora los títulos de esta colección y consulta sus fichas individuales para conocer los temas que aborda cada publicación. Puedes descubrir libros sobre circulación, cuidado corporal, metabolismo, desintoxicación y fertilidad, y elegir la lectura que mejor se ajuste a tus intereses.
            </p>
          </div>
        </section>

        {/* ====================================================================
            NAVEGACIÓN INTERNA Y OTRAS CATEGORÍAS
            ==================================================================== */}
        <nav aria-label="Navegación de retorno y categorías" className="mt-16 sm:mt-24 pt-10 border-t border-stone-200/80">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              to="/"
              className="text-sm sm:text-[15px] font-semibold text-stone-800 hover:text-stone-950 transition-colors inline-flex items-center gap-1.5 font-sans"
            >
              <span>← Volver a la página de inicio</span>
            </Link>

            <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-stone-600 font-sans">
              <span className="font-semibold text-stone-800">Otras categorías:</span>
              {CATEGORIES_LIST.filter((c) => c.slug !== 'cuerpo-salud').map((c) => (
                <Link
                  key={c.slug}
                  to={c.route}
                  className="hover:text-stone-900 underline transition-colors"
                >
                  {c.navLabel}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </main>

      {/* Pie de página */}
      <footer className="border-t border-stone-200 py-10 bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-stone-600 font-sans">
          <p className="font-serif text-lg sm:text-[20px] font-bold text-stone-900">
            Victoria Maciass
          </p>
          <p>
            <Link to="/" className="hover:text-stone-900 underline transition-colors font-medium">
              Ir a la página de inicio (/)
            </Link>
          </p>
          <p className="text-xs sm:text-sm text-stone-500">
            © {new Date().getFullYear()} Victoria Maciass. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};
