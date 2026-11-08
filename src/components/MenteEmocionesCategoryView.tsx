import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { CategoryInfo, CATEGORIES_LIST } from '../data/categoriesData';
import { GlobalNavbar } from './GlobalNavbar';

interface MenteEmocionesCategoryViewProps {
  categoryInfo: CategoryInfo;
}

interface MenteBookItem {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  coverUrl: string;
  altText: string;
}

const MENTE_BOOKS: MenteBookItem[] = [
  {
    slug: 'ansiedad-vida',
    title: 'Una Vida sin Ansiedad ni Ataques de Pánico',
    subtitle: 'Guía para comprender y afrontar la ansiedad cotidiana y los estados de sobrecarga.',
    description:
      'Una obra reflexiva y directa orientada a entender las causas de la tensión interna y recuperar la estabilidad personal.',
    coverUrl: 'https://ik.imagekit.io/hr20qlpupi/victoria/3-ansiedad1-libro.jpg',
    altText: 'Portada del libro Una Vida sin Ansiedad ni Ataques de Pánico de Victoria Maciass',
  },
  {
    slug: 'ansiedad-liberate',
    title: 'Libérate de la Ansiedad y los Ataques de Pánico',
    subtitle: 'Pautas prácticas y explicaciones claras para afrontar momentos de intensa inquietud.',
    description:
      'Contenidos centrados en identificar los detonantes del pánico y desarrollar recursos conscientes para recobrar la calma.',
    coverUrl: 'https://ik.imagekit.io/hr20qlpupi/victoria/4-ansiedad2-libro.jpg',
    altText: 'Portada del libro Libérate de la Ansiedad y los Ataques de Pánico de Victoria Maciass',
  },
  {
    slug: 'ansiedad-control',
    title: 'Cómo controlar la ansiedad',
    subtitle: 'Herramientas prácticas para gestionar el estrés, la rumiación y la inquietud mental.',
    description:
      'Enfoque cotidiano y accesible para modular la respuesta emocional ante la sobrecarga del día a día.',
    coverUrl: 'https://ik.imagekit.io/hr20qlpupi/victoria/5-ansiedad3-libro.jpg',
    altText: 'Portada del libro Cómo controlar la ansiedad de Victoria Maciass',
  },
  {
    slug: 'suenos',
    title: 'El Libro de los Sueños',
    subtitle: 'Exploración, simbolismo y significados del mundo onírico y el descanso.',
    description:
      'Una mirada profunda y curiosa a los mensajes del inconsciente, las imágenes nocturnas y la interpretación de los sueños.',
    coverUrl: 'https://ik.imagekit.io/hr20qlpupi/victoria/9-cuentos-libro.jpg',
    altText: 'Portada del libro El Libro de los Sueños de Victoria Maciass',
  },
];

export const MenteEmocionesCategoryView: React.FC<MenteEmocionesCategoryViewProps> = ({ categoryInfo }) => {
  // Metadatos SEO específicos de Mente y emociones
  useEffect(() => {
    window.scrollTo(0, 0);

    document.title = 'Libros sobre Ansiedad y Bienestar Emocional | Victoria Maciass';

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Descubre libros sobre ansiedad, ataques de pánico, sueños y bienestar emocional. Explora guías y publicaciones sobre mente y emociones.'
      );
    }

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute(
        'content',
        'libros sobre ansiedad, libros sobre ataques de pánico, libros sobre bienestar emocional, libros sobre emociones, libros sobre sueños, interpretación de sueños, serenidad mental, Victoria Maciass'
      );
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://victoriamaciass.vercel.app/mente-emociones');
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute(
        'content',
        'Libros sobre Ansiedad y Bienestar Emocional | Victoria Maciass'
      );
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute(
        'content',
        'Descubre libros sobre ansiedad, ataques de pánico, sueños y bienestar emocional. Explora guías y publicaciones sobre mente y emociones.'
      );
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', 'https://victoriamaciass.vercel.app/mente-emociones');
    }

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      ogImage.setAttribute(
        'content',
        'https://ik.imagekit.io/hr20qlpupi/victoria/3-ansiedad1-libro.jpg'
      );
    }

    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage) {
      twitterImage.setAttribute(
        'content',
        'https://ik.imagekit.io/hr20qlpupi/victoria/3-ansiedad1-libro.jpg'
      );
    }

    // Inyección de Schema.org JSON-LD específico para Mente y emociones
    const schemaScriptId = 'schema-mente-emociones-jsonld';
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
          '@id': 'https://victoriamaciass.vercel.app/mente-emociones#collection',
          url: 'https://victoriamaciass.vercel.app/mente-emociones',
          name: 'Libros sobre Ansiedad y Bienestar Emocional | Victoria Maciass',
          description:
            'Descubre libros sobre ansiedad, ataques de pánico, sueños y bienestar emocional. Explora guías y publicaciones sobre mente y emociones.',
          isPartOf: {
            '@id': 'https://victoriamaciass.vercel.app/#website',
          },
          about: {
            '@id': 'https://victoriamaciass.vercel.app/#author',
          },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://victoriamaciass.vercel.app/mente-emociones#breadcrumbs',
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
              name: 'Mente y emociones',
              item: 'https://victoriamaciass.vercel.app/mente-emociones',
            },
          ],
        },
        {
          '@type': 'ItemList',
          '@id': 'https://victoriamaciass.vercel.app/mente-emociones#itemlist',
          name: 'Libros sobre Ansiedad, Emociones y Sueños',
          numberOfItems: 4,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Una Vida sin Ansiedad ni Ataques de Pánico',
              url: 'https://victoriamaciass.vercel.app/ansiedad-vida',
              image: 'https://ik.imagekit.io/hr20qlpupi/victoria/3-ansiedad1-libro.jpg',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Libérate de la Ansiedad y los Ataques de Pánico',
              url: 'https://victoriamaciass.vercel.app/ansiedad-liberate',
              image: 'https://ik.imagekit.io/hr20qlpupi/victoria/4-ansiedad2-libro.jpg',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'Cómo controlar la ansiedad',
              url: 'https://victoriamaciass.vercel.app/ansiedad-control',
              image: 'https://ik.imagekit.io/hr20qlpupi/victoria/5-ansiedad3-libro.jpg',
            },
            {
              '@type': 'ListItem',
              position: 4,
              name: 'El Libro de los Sueños',
              url: 'https://victoriamaciass.vercel.app/suenos',
              image: 'https://ik.imagekit.io/hr20qlpupi/victoria/9-cuentos-libro.jpg',
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

      {/* 2. Migas de pan (Breadcrumbs): Inicio → Mente y emociones */}
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
            Un único H1 con texto introductorio claro, atractivo y proporcionado
            ==================================================================== */}
        <header className="max-w-3xl mb-12 sm:mb-14">
          <div className="flex items-center gap-2 text-xs sm:text-[13px] font-semibold uppercase tracking-wider text-stone-600 mb-2.5 font-sans">
            <span>Colección temática</span>
            <span>·</span>
            <span>4 publicaciones disponibles</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] font-bold tracking-tight text-stone-900 leading-[1.12]">
            Libros sobre Ansiedad y Bienestar Emocional
          </h1>

          <p className="mt-4 text-[16px] sm:text-[17px] md:text-[18px] text-stone-700 leading-relaxed font-sans">
            Descubre libros y guías prácticas sobre ansiedad, ataques de pánico, sueños y bienestar emocional. Una colección de publicaciones que aborda diferentes experiencias de la mente y las emociones mediante explicaciones claras y contenidos orientados a la comprensión y la reflexión personal.
          </p>
        </header>

        {/* ====================================================================
            B. PRESENTACIÓN DE LAS TEMÁTICAS
            Cuatro bloques visuales sobrios que transmiten serenidad y claridad
            ==================================================================== */}
        <section aria-label="Temáticas de la colección" className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white border border-stone-200/90 rounded-xl p-5 sm:p-6 shadow-2xs hover:border-stone-400 transition-colors">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#163a2b] block mb-1 font-sans">
                Comprensión
              </span>
              <h3 className="font-serif text-lg sm:text-[20px] font-bold text-stone-900 mb-2">
                Ansiedad
              </h3>
              <p className="text-xs sm:text-[13.5px] text-stone-700 leading-relaxed font-sans">
                Publicaciones relacionadas con la comprensión de la ansiedad y sus diversas manifestaciones cotidianas.
              </p>
            </div>

            <div className="bg-white border border-stone-200/90 rounded-xl p-5 sm:p-6 shadow-2xs hover:border-stone-400 transition-colors">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#163a2b] block mb-1 font-sans">
                Gestión
              </span>
              <h3 className="font-serif text-lg sm:text-[20px] font-bold text-stone-900 mb-2">
                Ataques de pánico
              </h3>
              <p className="text-xs sm:text-[13.5px] text-stone-700 leading-relaxed font-sans">
                Contenidos dedicados a conocer esta experiencia, sus características y pautas para recobrar la estabilidad.
              </p>
            </div>

            <div className="bg-white border border-stone-200/90 rounded-xl p-5 sm:p-6 shadow-2xs hover:border-stone-400 transition-colors">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#163a2b] block mb-1 font-sans">
                Mundo onírico
              </span>
              <h3 className="font-serif text-lg sm:text-[20px] font-bold text-stone-900 mb-2">
                Sueños
              </h3>
              <p className="text-xs sm:text-[13.5px] text-stone-700 leading-relaxed font-sans">
                Exploración de los sueños, su simbolismo tradicional y diferentes perspectivas sobre su interpretación.
              </p>
            </div>

            <div className="bg-white border border-stone-200/90 rounded-xl p-5 sm:p-6 shadow-2xs hover:border-stone-400 transition-colors">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#163a2b] block mb-1 font-sans">
                Equilibrio
              </span>
              <h3 className="font-serif text-lg sm:text-[20px] font-bold text-stone-900 mb-2">
                Serenidad y calma
              </h3>
              <p className="text-xs sm:text-[13.5px] text-stone-700 leading-relaxed font-sans">
                Contenidos relacionados con la calma mental, la reflexión consciente y el equilibrio personal diario.
              </p>
            </div>
          </div>
        </section>

        {/* ====================================================================
            C. CATÁLOGO DE LIBROS
            H2 del catálogo y tarjetas de libros en cuadrícula responsive
            ==================================================================== */}
        <section aria-labelledby="catalogo-mente-heading" className="mb-20">
          <div className="mb-10 max-w-2xl">
            <h2
              id="catalogo-mente-heading"
              className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-bold text-stone-900 tracking-tight leading-snug"
            >
              Libros sobre Ansiedad, Emociones y Sueños
            </h2>
            <p className="mt-3 text-[15px] sm:text-[16px] text-stone-700 leading-relaxed font-sans">
              Explora las publicaciones de esta colección y descubre diferentes enfoques sobre la ansiedad, los ataques de pánico, los sueños y el bienestar emocional.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
            {MENTE_BOOKS.map((book) => (
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

                  {/* Título de la obra (H3 semántico bajo el H2) */}
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
              Comprender la mente y las emociones
            </h2>
            <div className="space-y-4 text-[16px] sm:text-[17px] text-stone-700 leading-relaxed font-sans">
              <p>
                Las emociones forman parte de la experiencia cotidiana y pueden influir en la manera en que pensamos, sentimos y afrontamos diferentes situaciones. Conocer mejor nuestras reacciones y comprender determinados estados emocionales puede ayudarnos a reflexionar sobre nuestras experiencias y a buscar información adecuada para cada circunstancia.
              </p>
              <p>
                Esta colección reúne libros que abordan temas como la ansiedad, los ataques de pánico, los sueños y la serenidad personal, desde diferentes perspectivas y con contenidos organizados para facilitar su lectura y consulta.
              </p>
            </div>
          </div>

          {/* Bloque 2: Ansiedad y ataques de pánico */}
          <div className="mb-12 bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs">
            <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-stone-900 tracking-tight leading-snug mb-3.5">
              Libros sobre ansiedad y ataques de pánico
            </h2>
            <div className="space-y-3.5 text-[16px] sm:text-[17px] text-stone-700 leading-relaxed font-sans">
              <p>
                La ansiedad y los ataques de pánico son temas que despiertan muchas preguntas entre quienes desean comprender mejor estas experiencias. Conocer sus características, identificar las situaciones relacionadas y aprender sobre sus diferentes manifestaciones son aspectos que pueden ayudar a entender mejor esta temática.
              </p>
              <p>
                En esta colección encontrarás publicaciones dedicadas a la ansiedad y los ataques de pánico, con contenidos específicos para explorar el tema desde diferentes enfoques.
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-stone-100 flex flex-col sm:flex-row flex-wrap gap-4">
              <Link
                to="/ansiedad-vida"
                className="inline-flex items-center gap-1.5 text-sm sm:text-[15px] font-semibold text-stone-900 hover:text-[#163a2b] transition-colors group font-sans"
              >
                <span>Una Vida sin Ansiedad ni Ataques de Pánico</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/ansiedad-liberate"
                className="inline-flex items-center gap-1.5 text-sm sm:text-[15px] font-semibold text-stone-900 hover:text-[#163a2b] transition-colors group font-sans"
              >
                <span>Libérate de la Ansiedad y los Ataques de Pánico</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/ansiedad-control"
                className="inline-flex items-center gap-1.5 text-sm sm:text-[15px] font-semibold text-stone-900 hover:text-[#163a2b] transition-colors group font-sans"
              >
                <span>Cómo controlar la ansiedad</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Bloque 3: Sueños */}
          <div className="mb-12 bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs">
            <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-stone-900 tracking-tight leading-snug mb-3.5">
              Libros sobre sueños e interpretación de los sueños
            </h2>
            <div className="space-y-3.5 text-[16px] sm:text-[17px] text-stone-700 leading-relaxed font-sans">
              <p>
                Los sueños han despertado curiosidad e interés a lo largo de la historia. Su contenido, sus imágenes y los significados que distintas tradiciones les han atribuido forman parte de un campo de exploración cultural y personal.
              </p>
              <p>
                En esta colección encontrarás una publicación dedicada al mundo de los sueños y su interpretación, para quienes desean conocer diferentes perspectivas sobre este tema.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100">
              <Link
                to="/suenos"
                className="inline-flex items-center gap-2 text-[15px] sm:text-[16px] font-semibold text-stone-900 hover:text-[#163a2b] transition-colors group font-sans"
              >
                <span>Consultar el libro El Libro de los Sueños</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Bloque 4: Serenidad y bienestar emocional */}
          <div className="mb-12 bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs">
            <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-stone-900 tracking-tight leading-snug mb-3.5">
              Libros sobre serenidad y bienestar emocional
            </h2>
            <div className="space-y-3.5 text-[16px] sm:text-[17px] text-stone-700 leading-relaxed font-sans">
              <p>
                La serenidad y el bienestar emocional son temas relacionados con la manera en que cada persona vive y afronta sus experiencias cotidianas. Reflexionar sobre los pensamientos, las emociones y los hábitos personales permite explorar diferentes perspectivas sobre el equilibrio interior.
              </p>
              <p>
                Esta colección reúne publicaciones que abordan estos temas junto con otros contenidos relacionados con la mente y las emociones.
              </p>
            </div>
          </div>

          {/* Bloque 5: Cierre */}
          <div className="mb-8">
            <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-stone-900 tracking-tight leading-snug mb-3.5">
              Encuentra el libro que buscas
            </h2>
            <p className="text-[16px] sm:text-[17px] text-stone-700 leading-relaxed font-sans">
              Explora las publicaciones de esta colección y accede a la ficha individual de cada libro para conocer sus contenidos, consultar sus formatos y descubrir las opciones disponibles de adquisición.
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
              {CATEGORIES_LIST.filter((c) => c.slug !== 'mente-emociones').map((c) => (
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
