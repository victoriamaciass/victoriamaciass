import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { CategoryInfo, CATEGORIES_LIST } from '../data/categoriesData';
import { GlobalNavbar } from './GlobalNavbar';

interface ManosMisterioCategoryViewProps {
  categoryInfo: CategoryInfo;
}

interface ManosMisterioBookItem {
  slug: string;
  anchorId: string;
  title: string;
  subtitle: string;
  description: string;
  thematicLabel: string;
  coverUrl: string;
  altText: string;
}

const MANOS_MISTERIO_BOOKS: ManosMisterioBookItem[] = [
  {
    slug: 'velas',
    anchorId: 'libro-velas',
    title: 'Cómo hacer velas Artesanales aromáticas',
    subtitle: 'Cerería Botánica & Aromaterapia Pura',
    description:
      'Guía práctica y accesible con técnicas paso a paso para elaborar velas artesanales con ceras naturales, mechas de algodón y esencias aromáticas.',
    thematicLabel: 'Velas artesanales',
    coverUrl: 'https://ik.imagekit.io/hr20qlpupi/victoria/17-velas.jpg',
    altText: 'Portada del libro Cómo hacer velas Artesanales aromáticas de Victoria Maciass',
  },
  {
    slug: 'costura',
    anchorId: 'libro-costura',
    title: 'La costura que querías aprender',
    subtitle: 'Confección Creativa & Arreglos',
    description:
      'Manual detallado para aprender a coser desde cero: manejo de la máquina, puntadas esenciales, arreglos de prendas y confección textil práctica.',
    thematicLabel: 'Costura y creatividad',
    coverUrl: 'https://ik.imagekit.io/hr20qlpupi/victoria/21-costura-libro.jpg',
    altText: 'Portada del libro La costura que querías aprender de Victoria Maciass',
  },
  {
    slug: 'conjuros',
    anchorId: 'libro-conjuros',
    title: 'El Arte de los Conjuros Conscientes',
    subtitle: 'Magia Natural & Rituales de Intención',
    description:
      'Una aproximación reflexiva a las tradiciones simbólicas, la intención consciente y las prácticas rituales personales explicadas con serenidad y claridad.',
    thematicLabel: 'Conjuros conscientes y simbolismo',
    coverUrl: 'https://ik.imagekit.io/hr20qlpupi/victoria/18-conjuros-libro.jpg',
    altText: 'Portada del libro El Arte de los Conjuros Conscientes de Victoria Maciass',
  },
];

export const ManosMisterioCategoryView: React.FC<ManosMisterioCategoryViewProps> = ({ categoryInfo }) => {
  // Configuración de metadatos SEO específicos de la categoría Manos y misterio
  useEffect(() => {
    window.scrollTo(0, 0);

    // Title oficial
    document.title = 'Libros de Manualidades, Costura y Artesanía | Victoria Maciass';

    // Meta Description oficial
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Descubre libros sobre manualidades, velas artesanales, costura y conjuros conscientes. Explora la colección creativa de Victoria Maciass.'
      );
    }

    // Canonical oficial
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://victoriamaciass.vercel.app/manos-misterio');
    }

    // Open Graph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute(
        'content',
        'Libros de Manualidades, Artesanía y Misterio | Victoria Maciass'
      );
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute(
        'content',
        'Explora publicaciones sobre creatividad manual, elaboración de velas artesanales, costura y prácticas simbólicas.'
      );
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', 'https://victoriamaciass.vercel.app/manos-misterio');
    }

    const ogType = document.querySelector('meta[property="og:type"]');
    if (ogType) {
      ogType.setAttribute('content', 'website');
    }

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      ogImage.setAttribute(
        'content',
        'https://ik.imagekit.io/hr20qlpupi/victoria/17-velas.jpg'
      );
    }

    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage) {
      twitterImage.setAttribute(
        'content',
        'https://ik.imagekit.io/hr20qlpupi/victoria/17-velas.jpg'
      );
    }

    // Inyección de Schema.org JSON-LD específico para Manos y misterio
    const schemaScriptId = 'schema-manos-misterio-jsonld';
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
          '@id': 'https://victoriamaciass.vercel.app/manos-misterio#collection',
          url: 'https://victoriamaciass.vercel.app/manos-misterio',
          name: 'Libros de Manualidades, Costura y Artesanía | Victoria Maciass',
          description:
            'Descubre libros sobre manualidades, velas artesanales, costura y conjuros conscientes. Explora la colección creativa de Victoria Maciass.',
          inLanguage: 'es',
          isPartOf: {
            '@id': 'https://victoriamaciass.vercel.app/#website',
          },
          about: {
            '@id': 'https://victoriamaciass.vercel.app/#author',
          },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://victoriamaciass.vercel.app/manos-misterio#breadcrumbs',
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
              name: 'Manos y misterio',
              item: 'https://victoriamaciass.vercel.app/manos-misterio',
            },
          ],
        },
        {
          '@type': 'ItemList',
          '@id': 'https://victoriamaciass.vercel.app/manos-misterio#itemlist',
          name: 'Libros de Manualidades, Artesanía y Misterio',
          numberOfItems: 3,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              url: 'https://victoriamaciass.vercel.app/velas',
              name: 'Cómo hacer velas Artesanales aromáticas',
              image: 'https://ik.imagekit.io/hr20qlpupi/victoria/17-velas.jpg',
            },
            {
              '@type': 'ListItem',
              position: 2,
              url: 'https://victoriamaciass.vercel.app/costura',
              name: 'La costura que querías aprender',
              image: 'https://ik.imagekit.io/hr20qlpupi/victoria/21-costura-libro.jpg',
            },
            {
              '@type': 'ListItem',
              position: 3,
              url: 'https://victoriamaciass.vercel.app/conjuros',
              name: 'El Arte de los Conjuros Conscientes',
              image: 'https://ik.imagekit.io/hr20qlpupi/victoria/18-conjuros-libro.jpg',
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
      {/* 1. Header Global visible en todas las páginas */}
      <GlobalNavbar />

      {/* 2. Migas de pan (Breadcrumbs): Inicio > Manos y misterio */}
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
            <span>Colección creativa</span>
            <span>·</span>
            <span>3 publicaciones disponibles</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] font-bold tracking-tight text-stone-900 leading-[1.12]">
            Libros de Manualidades, Artesanía y Misterio
          </h1>

          <p className="mt-4 text-[16px] sm:text-[17px] md:text-[18px] text-stone-700 leading-relaxed font-sans">
            Descubre libros y guías prácticas sobre creatividad manual, artesanía, costura y prácticas simbólicas. Esta colección reúne publicaciones para quienes desean aprender técnicas, explorar actividades creativas y acercarse a diferentes tradiciones desde una perspectiva personal. Encuentra propuestas sobre elaboración de velas artesanales, costura y conjuros conscientes.
          </p>
        </header>

        {/* ====================================================================
            B. PRESENTACIÓN DE LAS TRES TEMÁTICAS
            Tres bloques visuales sobrios y equilibrados que orientan al lector
            ==================================================================== */}
        <section aria-labelledby="tematicas-heading" className="mb-16">
          <div className="mb-8">
            <h2 id="tematicas-heading" className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Explora nuestras temáticas de creatividad y misterio
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* 1. Velas artesanales */}
            <article className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-7 shadow-2xs hover:border-stone-400 transition-colors">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#163a2b] block mb-2 font-sans">
                Cerería Botánica
              </span>
              <h3 className="font-serif text-xl sm:text-[22px] font-bold text-stone-900 mb-2.5">
                Velas artesanales
              </h3>
              <p className="text-sm text-stone-700 leading-relaxed font-sans">
                Descubre el mundo de la elaboración artesanal de velas y explora técnicas, materiales y posibilidades creativas para desarrollar tus propios proyectos.
              </p>
            </article>

            {/* 2. Costura y creatividad */}
            <article className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-7 shadow-2xs hover:border-stone-400 transition-colors">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#163a2b] block mb-2 font-sans">
                Confección Textil
              </span>
              <h3 className="font-serif text-xl sm:text-[22px] font-bold text-stone-900 mb-2.5">
                Costura y creatividad
              </h3>
              <p className="text-sm text-stone-700 leading-relaxed font-sans">
                Aprender a coser abre posibilidades para crear, reparar y personalizar prendas y objetos textiles. Explora una publicación dedicada al aprendizaje de la costura y sus técnicas.
              </p>
            </article>

            {/* 3. Conjuros conscientes y simbolismo */}
            <article className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-7 shadow-2xs hover:border-stone-400 transition-colors">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#163a2b] block mb-2 font-sans">
                Práctica Simbólica
              </span>
              <h3 className="font-serif text-xl sm:text-[22px] font-bold text-stone-900 mb-2.5">
                Conjuros conscientes y simbolismo
              </h3>
              <p className="text-sm text-stone-700 leading-relaxed font-sans">
                Una propuesta editorial para quienes sienten interés por las tradiciones simbólicas, los rituales y los conjuros conscientes, desde una perspectiva de exploración personal.
              </p>
            </article>
          </div>
        </section>

        {/* ====================================================================
            C. CATÁLOGO DE LIBROS
            H2: Libros de Manualidades, Artesanía y Misterio
            Muestra los 3 libros reales de la categoría
            ==================================================================== */}
        <section aria-labelledby="catalogo-heading" className="mb-20">
          <div className="mb-8">
            <h2 id="catalogo-heading" className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Libros de Manualidades, Artesanía y Misterio
            </h2>
            <p className="mt-2 text-sm sm:text-[15px] text-stone-600 font-sans">
              Catálogo completo con las 3 publicaciones disponibles de la colección.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MANOS_MISTERIO_BOOKS.map((book) => (
              <article
                key={book.slug}
                id={book.anchorId}
                className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-2xs hover:border-stone-400 hover:shadow-md transition-all duration-200 scroll-mt-24"
              >
                <div>
                  {/* Portada en proporción 2:3 */}
                  <div className="w-full flex justify-center mb-6">
                    <Link
                      to={`/${book.slug}`}
                      className="w-full max-w-[200px] block transition-transform duration-200 hover:scale-[1.02]"
                      title={`Ver detalles de ${book.title}`}
                    >
                      <div
                        className="w-full aspect-[2/3] rounded-lg overflow-hidden bg-white select-none"
                        style={{
                          boxShadow: '0 12px 28px -8px rgba(0, 0, 0, 0.22), 0 4px 10px -4px rgba(0, 0, 0, 0.1)',
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

                  {/* Temática o serie */}
                  <span className="inline-block text-xs font-semibold text-[#163a2b] uppercase tracking-wider mb-2 font-sans">
                    {book.thematicLabel}
                  </span>

                  {/* Título exacto en H3 */}
                  <h3 className="font-serif text-xl sm:text-[22px] font-bold text-stone-900 leading-snug">
                    <Link
                      to={`/${book.slug}`}
                      className="hover:text-stone-700 transition-colors"
                    >
                      {book.title}
                    </Link>
                  </h3>

                  {/* Subtítulo */}
                  {book.subtitle && (
                    <p className="mt-2 text-xs sm:text-[13px] font-medium text-stone-500 uppercase tracking-wider font-sans">
                      {book.subtitle}
                    </p>
                  )}

                  {/* Descripción breve */}
                  <p className="mt-3 text-sm sm:text-[14.5px] text-stone-700 leading-relaxed font-sans">
                    {book.description}
                  </p>
                </div>

                {/* Botón que enlaza a la ficha individual */}
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-mono text-stone-400">/{book.slug}</span>
                  <Link
                    to={`/${book.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors shadow-2xs group"
                  >
                    <span>Ver libro</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ====================================================================
            D. CONTENIDO EDITORIAL SEO DEBAJO DEL CATÁLOGO
            5 secciones estructuradas con H2 y textos originales especificados
            ==================================================================== */}
        <section aria-label="Contenido editorial temático" className="mt-16 pt-12 border-t border-stone-200/90 space-y-12">
          {/* Sección 1 */}
          <article className="max-w-3xl">
            <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-stone-900 mb-3.5 tracking-tight leading-snug">
              Manualidades y creatividad: libros para aprender y crear
            </h2>
            <p className="text-stone-700 text-[15px] sm:text-[16px] leading-relaxed font-sans">
              Las actividades manuales permiten explorar materiales, desarrollar habilidades y dar forma a proyectos creativos. Esta colección reúne publicaciones relacionadas con la elaboración de velas, la costura y otras formas de expresión personal. Cada libro aborda una temática diferente para quienes desean aprender, experimentar y descubrir nuevas posibilidades creativas.
            </p>
          </article>

          {/* Sección 2 */}
          <article className="max-w-3xl">
            <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-stone-900 mb-3.5 tracking-tight leading-snug">
              Libros para aprender a hacer velas artesanales
            </h2>
            <p className="text-stone-700 text-[15px] sm:text-[16px] leading-relaxed font-sans">
              La elaboración de velas artesanales combina materiales, técnicas y creatividad. Si te interesa conocer este mundo, aquí encontrarás una publicación dedicada a las velas artesanales aromáticas. Consulta la ficha de{' '}
              <Link to="/velas" className="text-[#163a2b] font-medium underline hover:text-[#102a1f] transition-colors">
                Cómo hacer velas Artesanales aromáticas
              </Link>{' '}
              para descubrir los contenidos, las ceras vegetales y las técnicas que aborda.
            </p>
          </article>

          {/* Sección 3 */}
          <article className="max-w-3xl">
            <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-stone-900 mb-3.5 tracking-tight leading-snug">
              Libros de costura para aprender técnicas textiles
            </h2>
            <p className="text-stone-700 text-[15px] sm:text-[16px] leading-relaxed font-sans">
              La costura es una actividad creativa y práctica que permite trabajar con telas, hilos y diferentes materiales textiles. Esta colección incluye un libro dedicado al aprendizaje de la costura, pensado para quienes desean conocer sus técnicas y explorar nuevas posibilidades de creación y confección. Descubre todos los detalles en la ficha de{' '}
              <Link to="/costura" className="text-[#163a2b] font-medium underline hover:text-[#102a1f] transition-colors">
                La costura que querías aprender
              </Link>.
            </p>
          </article>

          {/* Sección 4 */}
          <article className="max-w-3xl">
            <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-stone-900 mb-3.5 tracking-tight leading-snug">
              Libros sobre conjuros conscientes y tradiciones simbólicas
            </h2>
            <p className="text-stone-700 text-[15px] sm:text-[16px] leading-relaxed font-sans">
              Las tradiciones simbólicas y las prácticas rituales forman parte de diferentes expresiones culturales y personales. En esta colección encontrarás una publicación dedicada al arte de los conjuros conscientes, dirigida a quienes desean explorar esta temática desde una perspectiva simbólica y reflexiva. Explora la ficha de{' '}
              <Link to="/conjuros" className="text-[#163a2b] font-medium underline hover:text-[#102a1f] transition-colors">
                El Arte de los Conjuros Conscientes
              </Link>{' '}
              para conocer más sobre su propuesta.
            </p>
          </article>

          {/* Sección 5 */}
          <article className="max-w-3xl">
            <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-stone-900 mb-3.5 tracking-tight leading-snug">
              Encuentra el libro que buscas
            </h2>
            <p className="text-stone-700 text-[15px] sm:text-[16px] leading-relaxed font-sans">
              Explora los tres títulos de esta colección y consulta sus fichas individuales para conocer mejor el contenido de cada publicación. Puedes descubrir propuestas sobre velas artesanales, costura y prácticas simbólicas, y elegir la temática que más se ajuste a tus intereses.
            </p>
          </article>
        </section>

        {/* ====================================================================
            ENLACE DE RETORNO Y OTRAS CATEGORÍAS
            ==================================================================== */}
        <section aria-label="Navegación entre categorías" className="mt-16 sm:mt-24 pt-10 border-t border-stone-200/80">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              to="/"
              className="text-sm sm:text-[15px] font-semibold text-stone-800 hover:text-stone-950 transition-colors inline-flex items-center gap-1.5"
            >
              <span>← Volver a la página de inicio</span>
            </Link>

            <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-stone-600">
              <span className="font-semibold text-stone-800">Otras categorías:</span>
              {CATEGORIES_LIST.filter((c) => c.slug !== categoryInfo.slug).map((c) => (
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
        </section>
      </main>

      {/* Pie de página */}
      <footer className="border-t border-stone-200 py-10 bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-stone-600">
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
