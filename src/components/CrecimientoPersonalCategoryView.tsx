import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { CategoryInfo, CATEGORIES_LIST } from '../data/categoriesData';
import { GlobalNavbar } from './GlobalNavbar';

interface CrecimientoPersonalCategoryViewProps {
  categoryInfo: CategoryInfo;
}

interface CrecimientoBookItem {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  coverUrl: string;
  altText: string;
}

const CRECIMIENTO_BOOKS: CrecimientoBookItem[] = [
  {
    slug: 'habitos',
    title: 'Hábitos Transformadores',
    subtitle: 'Rutinas cotidianas, constancia y cambios prácticos para el día a día.',
    description:
      'Una guía enfocada en entender cómo se forman los hábitos y cómo pequeñas acciones repetidas transforman nuestra rutina.',
    coverUrl: 'https://ik.imagekit.io/hr20qlpupi/victoria/11--habitos-libro.jpg',
    altText: 'Portada del libro Hábitos Transformadores de Victoria Maciass',
  },
  {
    slug: 'motivacion',
    title: 'Motivación y Transformación Positiva',
    subtitle: 'Impulso interior, actitud constructiva y nuevas perspectivas personales.',
    description:
      'Publicación orientada a reflexionar sobre las prioridades, la constancia y el enfoque positivo ante los retos personales.',
    coverUrl: 'https://ik.imagekit.io/hr20qlpupi/victoria/12--motivacion-libro.jpg',
    altText: 'Portada del libro Motivación y Transformación Positiva de Victoria Maciass',
  },
  {
    slug: 'mente',
    title: 'Despertando la Mente',
    subtitle: 'Claridad mental, conciencia cotidiana y aprendizaje reflexivo.',
    description:
      'Contenidos dedicados a explorar las capacidades del pensamiento, la atención plena y el autoconocimiento.',
    coverUrl: 'https://ik.imagekit.io/hr20qlpupi/victoria/10-meditacion1-libro.jpg',
    altText: 'Portada del libro Despertando la Mente de Victoria Maciass',
  },
  {
    slug: 'numeros',
    title: 'La Magia de los Números',
    subtitle: 'Significado simbólico de los números e interpretaciones tradicionales.',
    description:
      'Una aproximación divulgativa a la tradición de la numerología como herramienta simbólica y reflexiva.',
    coverUrl: 'https://ik.imagekit.io/hr20qlpupi/victoria/13-numerologia-libro.jpg',
    altText: 'Portada del libro La Magia de los Números de Victoria Maciass',
  },
];

export const CrecimientoPersonalCategoryView: React.FC<CrecimientoPersonalCategoryViewProps> = ({ categoryInfo }) => {
  // Metadatos SEO específicos de Crecimiento personal
  useEffect(() => {
    window.scrollTo(0, 0);

    document.title = 'Libros de Crecimiento Personal y Desarrollo Personal | Victoria Maciass';

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Descubre libros de crecimiento personal sobre hábitos, motivación, desarrollo de la mente y numerología. Explora guías y publicaciones de Victoria Maciass.'
      );
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://victoriamaciass.vercel.app/crecimiento-personal');
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute(
        'content',
        'Libros de Crecimiento Personal | Victoria Maciass'
      );
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute(
        'content',
        'Explora libros sobre hábitos, motivación, desarrollo de la mente y numerología. Descubre la colección de crecimiento personal de Victoria Maciass.'
      );
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', 'https://victoriamaciass.vercel.app/crecimiento-personal');
    }

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      ogImage.setAttribute(
        'content',
        'https://ik.imagekit.io/hr20qlpupi/victoria/11--habitos-libro.jpg'
      );
    }

    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage) {
      twitterImage.setAttribute(
        'content',
        'https://ik.imagekit.io/hr20qlpupi/victoria/11--habitos-libro.jpg'
      );
    }

    // Inyección de Schema.org JSON-LD específico para Crecimiento personal
    const schemaScriptId = 'schema-crecimiento-personal-jsonld';
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
          '@id': 'https://victoriamaciass.vercel.app/crecimiento-personal#collection',
          url: 'https://victoriamaciass.vercel.app/crecimiento-personal',
          name: 'Libros de Crecimiento Personal y Desarrollo Personal | Victoria Maciass',
          description:
            'Descubre libros de crecimiento personal sobre hábitos, motivación, desarrollo de la mente y numerología. Explora guías y publicaciones de Victoria Maciass.',
          isPartOf: {
            '@id': 'https://victoriamaciass.vercel.app/#website',
          },
          about: {
            '@id': 'https://victoriamaciass.vercel.app/#author',
          },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://victoriamaciass.vercel.app/crecimiento-personal#breadcrumbs',
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
              name: 'Crecimiento personal',
              item: 'https://victoriamaciass.vercel.app/crecimiento-personal',
            },
          ],
        },
        {
          '@type': 'ItemList',
          '@id': 'https://victoriamaciass.vercel.app/crecimiento-personal#itemlist',
          name: 'Libros de Crecimiento Personal',
          numberOfItems: 4,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Hábitos Transformadores',
              url: 'https://victoriamaciass.vercel.app/habitos',
              image: 'https://ik.imagekit.io/hr20qlpupi/victoria/11--habitos-libro.jpg',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Motivación y Transformación Positiva',
              url: 'https://victoriamaciass.vercel.app/motivacion',
              image: 'https://ik.imagekit.io/hr20qlpupi/victoria/12--motivacion-libro.jpg',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'Despertando la Mente',
              url: 'https://victoriamaciass.vercel.app/mente',
              image: 'https://ik.imagekit.io/hr20qlpupi/victoria/10-meditacion1-libro.jpg',
            },
            {
              '@type': 'ListItem',
              position: 4,
              name: 'La Magia de los Números',
              url: 'https://victoriamaciass.vercel.app/numeros',
              image: 'https://ik.imagekit.io/hr20qlpupi/victoria/13-numerologia-libro.jpg',
            },
          ],
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

      {/* 2. Migas de pan (Breadcrumbs): Inicio → Crecimiento personal */}
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
            Un único H1 visualmente atractivo y compacto
            ==================================================================== */}
        <header className="max-w-3xl mb-12 sm:mb-14">
          <div className="flex items-center gap-2 text-xs sm:text-[13px] font-semibold uppercase tracking-wider text-stone-600 mb-2.5 font-sans">
            <span>Colección temática</span>
            <span>·</span>
            <span>4 publicaciones disponibles</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] font-bold tracking-tight text-stone-900 leading-[1.12]">
            Libros de Crecimiento Personal y Desarrollo Personal
          </h1>

          <p className="mt-4 text-[16px] sm:text-[17px] md:text-[18px] text-stone-700 leading-relaxed font-sans">
            Descubre libros y guías prácticas sobre crecimiento personal, motivación, hábitos, desarrollo de la mente y numerología. Esta colección reúne publicaciones que abordan distintas formas de aprendizaje, reflexión y desarrollo individual, con contenidos pensados para quienes desean explorar nuevas ideas, comprender sus hábitos y encontrar inspiración para su vida cotidiana.
          </p>
        </header>

        {/* ====================================================================
            B. PRESENTACIÓN DE LOS TEMAS
            Sección breve con título y cuatro áreas temáticas
            ==================================================================== */}
        <section aria-label="Temas de crecimiento personal" className="mb-16">
          <div className="mb-6">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
              Explora los temas de crecimiento personal
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white border border-stone-200/90 rounded-xl p-5 sm:p-6 shadow-2xs hover:border-stone-400 transition-colors">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#163a2b] block mb-1 font-sans">
                Constancia y rutina
              </span>
              <h3 className="font-serif text-lg sm:text-[20px] font-bold text-stone-900 mb-2">
                Hábitos y desarrollo personal
              </h3>
              <p className="text-xs sm:text-[13.5px] text-stone-700 leading-relaxed font-sans">
                Contenidos relacionados con la creación de hábitos, la constancia y los cambios progresivos en la vida cotidiana.
              </p>
            </div>

            <div className="bg-white border border-stone-200/90 rounded-xl p-5 sm:p-6 shadow-2xs hover:border-stone-400 transition-colors">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#163a2b] block mb-1 font-sans">
                Actitud y enfoque
              </span>
              <h3 className="font-serif text-lg sm:text-[20px] font-bold text-stone-900 mb-2">
                Motivación y transformación positiva
              </h3>
              <p className="text-xs sm:text-[13.5px] text-stone-700 leading-relaxed font-sans">
                Publicaciones centradas en la motivación intrínseca, la actitud consciente y la búsqueda de nuevas perspectivas.
              </p>
            </div>

            <div className="bg-white border border-stone-200/90 rounded-xl p-5 sm:p-6 shadow-2xs hover:border-stone-400 transition-colors">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#163a2b] block mb-1 font-sans">
                Claridad y reflexión
              </span>
              <h3 className="font-serif text-lg sm:text-[20px] font-bold text-stone-900 mb-2">
                Desarrollo de la mente
              </h3>
              <p className="text-xs sm:text-[13.5px] text-stone-700 leading-relaxed font-sans">
                Contenidos sobre reflexión, aprendizaje reflexivo y exploración de las capacidades cognitivas y atencionales.
              </p>
            </div>

            <div className="bg-white border border-stone-200/90 rounded-xl p-5 sm:p-6 shadow-2xs hover:border-stone-400 transition-colors">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#163a2b] block mb-1 font-sans">
                Simbolismo tradicional
              </span>
              <h3 className="font-serif text-lg sm:text-[20px] font-bold text-stone-900 mb-2">
                Numerología
              </h3>
              <p className="text-xs sm:text-[13.5px] text-stone-700 leading-relaxed font-sans">
                Publicaciones que exploran el significado simbólico de los números y sus interpretaciones reflexivas y culturales.
              </p>
            </div>
          </div>
        </section>

        {/* ====================================================================
            C. CATÁLOGO DE LIBROS
            H2 del catálogo y 4 tarjetas de libros en cuadrícula adaptable
            ==================================================================== */}
        <section aria-labelledby="catalogo-crecimiento-heading" className="mb-20">
          <div className="mb-10 max-w-2xl">
            <h2
              id="catalogo-crecimiento-heading"
              className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-bold text-stone-900 tracking-tight leading-snug"
            >
              Libros de Crecimiento Personal
            </h2>
            <p className="mt-3 text-[15px] sm:text-[16px] text-stone-700 leading-relaxed font-sans">
              Explora las obras de esta colección y descubre diferentes perspectivas para ordenar hábitos, fortalecer la motivación y ampliar el conocimiento personal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
            {CRECIMIENTO_BOOKS.map((book) => (
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
            Secciones temáticas profundas con H2 y enlaces contextuales
            ==================================================================== */}
        <section aria-label="Información editorial complementaria" className="mt-16 pt-12 border-t border-stone-200/80 max-w-4xl">
          {/* Bloque 1 */}
          <div className="mb-12">
            <h2 className="font-serif text-2xl sm:text-[28px] font-bold text-stone-900 tracking-tight leading-snug mb-4">
              Crecimiento personal: libros para aprender y reflexionar
            </h2>
            <p className="text-[16px] sm:text-[17px] text-stone-700 leading-relaxed font-sans">
              El crecimiento personal es un proceso de aprendizaje y reflexión que puede abordarse desde diferentes perspectivas. Los libros de esta colección reúnen temas relacionados con los hábitos, la motivación, el desarrollo de la mente y la numerología. Cada publicación ofrece un enfoque particular para quienes desean explorar nuevas ideas, ampliar sus conocimientos y reflexionar sobre distintos aspectos de su vida cotidiana.
            </p>
          </div>

          {/* Bloque 2: Hábitos */}
          <div className="mb-12 bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs">
            <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-stone-900 tracking-tight leading-snug mb-3.5">
              Libros sobre hábitos y desarrollo personal
            </h2>
            <p className="text-[16px] sm:text-[17px] text-stone-700 leading-relaxed font-sans">
              Los hábitos forman parte de nuestras actividades cotidianas y pueden influir en la manera en que organizamos nuestro tiempo, afrontamos responsabilidades y perseguimos nuestros objetivos. En esta sección encontrarás publicaciones relacionadas con los hábitos y el desarrollo personal, con ideas para reflexionar sobre la constancia, la organización y los cambios cotidianos.
            </p>
            <div className="mt-4 pt-3 border-t border-stone-100">
              <Link
                to="/habitos"
                className="inline-flex items-center gap-2 text-[15px] sm:text-[16px] font-semibold text-stone-900 hover:text-[#163a2b] transition-colors group font-sans"
              >
                <span>Consultar el libro Hábitos Transformadores</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Bloque 3: Motivación */}
          <div className="mb-12 bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs">
            <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-stone-900 tracking-tight leading-snug mb-3.5">
              Libros de motivación y transformación positiva
            </h2>
            <p className="text-[16px] sm:text-[17px] text-stone-700 leading-relaxed font-sans">
              La motivación puede ayudarnos a plantear objetivos, revisar nuestras prioridades y encontrar nuevas perspectivas ante los desafíos cotidianos. Los libros de esta temática abordan la motivación y la transformación positiva desde un enfoque divulgativo y práctico, invitando al lector a reflexionar sobre sus decisiones y proyectos personales.
            </p>
            <div className="mt-4 pt-3 border-t border-stone-100">
              <Link
                to="/motivacion"
                className="inline-flex items-center gap-2 text-[15px] sm:text-[16px] font-semibold text-stone-900 hover:text-[#163a2b] transition-colors group font-sans"
              >
                <span>Consultar el libro Motivación y Transformación Positiva</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Bloque 4: La mente */}
          <div className="mb-12 bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs">
            <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-stone-900 tracking-tight leading-snug mb-3.5">
              Libros sobre la mente y el desarrollo mental
            </h2>
            <p className="text-[16px] sm:text-[17px] text-stone-700 leading-relaxed font-sans">
              La mente, el aprendizaje y la reflexión son temas presentes en diferentes áreas del crecimiento personal. Esta colección incluye publicaciones que permiten explorar estos conceptos y descubrir distintas perspectivas sobre el pensamiento, el conocimiento y el desarrollo individual.
            </p>
            <div className="mt-4 pt-3 border-t border-stone-100">
              <Link
                to="/mente"
                className="inline-flex items-center gap-2 text-[15px] sm:text-[16px] font-semibold text-stone-900 hover:text-[#163a2b] transition-colors group font-sans"
              >
                <span>Consultar el libro Despertando la Mente</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Bloque 5: Numerología */}
          <div className="mb-12 bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs">
            <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-stone-900 tracking-tight leading-snug mb-3.5">
              Libros de numerología y significado de los números
            </h2>
            <p className="text-[16px] sm:text-[17px] text-stone-700 leading-relaxed font-sans">
              La numerología es una tradición interpretativa que atribuye significados simbólicos a los números. Si te interesa conocer esta perspectiva, aquí encontrarás una publicación dedicada a explorar sus conceptos e interpretaciones. Presenta la temática como una tradición simbólica, sin atribuirle validez científica ni capacidad demostrada para predecir acontecimientos.
            </p>
            <div className="mt-4 pt-3 border-t border-stone-100">
              <Link
                to="/numeros"
                className="inline-flex items-center gap-2 text-[15px] sm:text-[16px] font-semibold text-stone-900 hover:text-[#163a2b] transition-colors group font-sans"
              >
                <span>Consultar el libro La Magia de los Números</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Bloque 6: Cierre */}
          <div className="mb-8">
            <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-stone-900 tracking-tight leading-snug mb-3.5">
              Encuentra el libro de crecimiento personal que buscas
            </h2>
            <p className="text-[16px] sm:text-[17px] text-stone-700 leading-relaxed font-sans">
              Explora los títulos de esta colección y consulta la ficha de cada libro para conocer su contenido con más detalle. Puedes descubrir publicaciones sobre hábitos, motivación, desarrollo de la mente y numerología, y elegir la temática que mejor se ajuste a tus intereses.
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
              {CATEGORIES_LIST.filter((c) => c.slug !== 'crecimiento-personal').map((c) => (
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
