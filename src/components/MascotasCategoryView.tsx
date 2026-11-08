import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, BookOpen } from 'lucide-react';
import { CategoryInfo, CATEGORIES_LIST } from '../data/categoriesData';
import { GlobalNavbar } from './GlobalNavbar';

interface MascotasCategoryViewProps {
  categoryInfo: CategoryInfo;
}

interface MascotasBookItem {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  coverUrl: string;
  altText: string;
}

const MASCOTAS_BOOKS: MascotasBookItem[] = [
  {
    slug: 'gallinas',
    title: 'La Guía De Las Gallinas',
    subtitle: 'Descubre el fascinante mundo de la cría y el cuidado de estas aves y todos sus beneficios.',
    description:
      'Una obra completa y práctica que te guiará en todos los aspectos de la crianza, alimentación, construcción de gallinero y bienestar de estas encantadoras aves.',
    coverUrl: 'https://ik.imagekit.io/hr20qlpupi/victoria/1-gallinas-libro.jpg',
    altText: 'Portada del libro La Guía de las Gallinas de Victoria Maciass',
  },
  {
    slug: 'perros',
    title: 'Adiestramiento Canino',
    subtitle: 'Educación respetuosa, pautas de convivencia y comprensión del comportamiento canino.',
    description:
      'Guía práctica orientada a mejorar la comunicación, resolver hábitos cotidianos y consolidar una relación equilibrada y positiva con tu perro.',
    coverUrl: 'https://ik.imagekit.io/hr20qlpupi/victoria/2-perros-libro.jpg',
    altText: 'Portada del libro Adiestramiento Canino de Victoria Maciass',
  },
  {
    slug: 'gatos',
    title: 'El Arte de Amar a un Gato',
    subtitle: 'Comportamiento felino, lenguaje corporal y las claves para una convivencia armoniosa.',
    description:
      'Una publicación dedicada a comprender las particularidades emocionales y de conducta de los gatos para cuidar y convivir mejor con ellos.',
    coverUrl: 'https://ik.imagekit.io/hr20qlpupi/victoria/20-gatos-libro.jpg',
    altText: 'Portada del libro El Arte de Amar a un Gato de Victoria Maciass',
  },
];

export const MascotasCategoryView: React.FC<MascotasCategoryViewProps> = ({ categoryInfo }) => {
  // Configuración de metadatos SEO específicos de la categoría Mascotas
  useEffect(() => {
    window.scrollTo(0, 0);

    const prevTitle = document.title;
    document.title = 'Libros sobre Mascotas: Perros, Gatos y Gallinas | Victoria Maciass';

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Descubre libros y guías prácticas sobre perros, gatos y gallinas. Aprende sobre sus cuidados, comportamiento, educación y convivencia.'
      );
    }

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute(
        'content',
        'libros sobre mascotas, libros sobre perros, libros sobre gatos, libros sobre gallinas, guías de cuidado animal, adiestramiento canino, comportamiento de los gatos, cría de gallinas, Victoria Maciass'
      );
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://victoriamaciass.vercel.app/mascotas');
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute(
        'content',
        'Libros sobre Mascotas: Perros, Gatos y Gallinas | Victoria Maciass'
      );
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute(
        'content',
        'Descubre libros y guías prácticas sobre perros, gatos y gallinas. Aprende sobre sus cuidados, comportamiento, educación y convivencia.'
      );
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', 'https://victoriamaciass.vercel.app/mascotas');
    }

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      ogImage.setAttribute(
        'content',
        'https://ik.imagekit.io/hr20qlpupi/victoria/1-gallinas-libro.jpg'
      );
    }

    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage) {
      twitterImage.setAttribute(
        'content',
        'https://ik.imagekit.io/hr20qlpupi/victoria/1-gallinas-libro.jpg'
      );
    }

    // Inyección de Schema.org JSON-LD específico para Mascotas
    const schemaScriptId = 'schema-mascotas-jsonld';
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
          '@id': 'https://victoriamaciass.vercel.app/mascotas#collection',
          url: 'https://victoriamaciass.vercel.app/mascotas',
          name: 'Libros sobre Mascotas: Perros, Gatos y Gallinas | Victoria Maciass',
          description:
            'Descubre libros y guías prácticas sobre perros, gatos y gallinas. Aprende sobre sus cuidados, comportamiento, educación y convivencia.',
          isPartOf: {
            '@id': 'https://victoriamaciass.vercel.app/#website',
          },
          about: {
            '@id': 'https://victoriamaciass.vercel.app/#author',
          },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://victoriamaciass.vercel.app/mascotas#breadcrumbs',
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
              name: 'Mascotas',
              item: 'https://victoriamaciass.vercel.app/mascotas',
            },
          ],
        },
        {
          '@type': 'ItemList',
          '@id': 'https://victoriamaciass.vercel.app/mascotas#itemlist',
          name: 'Libros y guías sobre perros, gatos y gallinas',
          numberOfItems: 3,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'La Guía De Las Gallinas',
              url: 'https://victoriamaciass.vercel.app/gallinas',
              image: 'https://ik.imagekit.io/hr20qlpupi/victoria/1-gallinas-libro.jpg',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Adiestramiento Canino',
              url: 'https://victoriamaciass.vercel.app/perros',
              image: 'https://ik.imagekit.io/hr20qlpupi/victoria/2-perros-libro.jpg',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'El Arte de Amar a un Gato',
              url: 'https://victoriamaciass.vercel.app/gatos',
              image: 'https://ik.imagekit.io/hr20qlpupi/victoria/20-gatos-libro.jpg',
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
      {/* 1. Header Global */}
      <GlobalNavbar />

      {/* 2. Migas de pan (Breadcrumbs): Inicio → Mascotas */}
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
            <span>3 publicaciones disponibles</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] font-bold tracking-tight text-stone-900 leading-[1.12]">
            Libros sobre Mascotas
          </h1>

          <p className="mt-4 text-[16px] sm:text-[17px] md:text-[18px] text-stone-700 leading-relaxed font-sans">
            Descubre libros y guías prácticas sobre perros, gatos y gallinas. Una colección para quienes desean conocer mejor a sus animales, comprender sus necesidades y aprender sobre su cuidado, alimentación, educación y comportamiento.
          </p>
        </header>

        {/* ====================================================================
            B. PRESENTACIÓN DE LAS TRES TEMÁTICAS
            Tres bloques visuales sobrios que orientan de inmediato al lector
            ==================================================================== */}
        <section aria-label="Temáticas de la categoría" className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white border border-stone-200/90 rounded-xl p-5 sm:p-6 shadow-2xs hover:border-stone-400 transition-colors">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#163a2b] block mb-1 font-sans">
                Avicultura doméstica
              </span>
              <h3 className="font-serif text-xl sm:text-[22px] font-bold text-stone-900 mb-2">
                Gallinas
              </h3>
              <p className="text-sm text-stone-700 leading-relaxed font-sans">
                Cría, alimentación, razas y cuidados. Una guía integral para quienes desean tener y cuidar gallinas en entornos rurales o urbanos.
              </p>
            </div>

            <div className="bg-white border border-stone-200/90 rounded-xl p-5 sm:p-6 shadow-2xs hover:border-stone-400 transition-colors">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#163a2b] block mb-1 font-sans">
                Educación canina
              </span>
              <h3 className="font-serif text-xl sm:text-[22px] font-bold text-stone-900 mb-2">
                Perros
              </h3>
              <p className="text-sm text-stone-700 leading-relaxed font-sans">
                Educación, adiestramiento y convivencia. Pautas respetuosas y prácticas para comprender el comportamiento de tu perro.
              </p>
            </div>

            <div className="bg-white border border-stone-200/90 rounded-xl p-5 sm:p-6 shadow-2xs hover:border-stone-400 transition-colors">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#163a2b] block mb-1 font-sans">
                Convivencia felina
              </span>
              <h3 className="font-serif text-xl sm:text-[22px] font-bold text-stone-900 mb-2">
                Gatos
              </h3>
              <p className="text-sm text-stone-700 leading-relaxed font-sans">
                Comportamiento, comunicación y relación con las personas. Claves para entender las particularidades del mundo felino.
              </p>
            </div>
          </div>
        </section>

        {/* ====================================================================
            C. CATÁLOGO DE LIBROS
            H2 principal del catálogo y tarjetas visuales equilibradas
            ==================================================================== */}
        <section aria-labelledby="catalogo-mascotas-heading" className="mb-20">
          <div className="mb-10 max-w-2xl">
            <h2
              id="catalogo-mascotas-heading"
              className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-bold text-stone-900 tracking-tight leading-snug"
            >
              Libros y guías sobre perros, gatos y gallinas
            </h2>
            <p className="mt-3 text-[15px] sm:text-[16px] text-stone-700 leading-relaxed font-sans">
              Explora las publicaciones de esta colección y descubre diferentes enfoques sobre el cuidado y la convivencia con animales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {MASCOTAS_BOOKS.map((book) => (
              <article
                key={book.slug}
                className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-2xs hover:border-stone-400 hover:shadow-md transition-all duration-200"
              >
                <div>
                  {/* Portada del libro en proporción 2:3 */}
                  <div className="w-full flex justify-center mb-6">
                    <Link
                      to={`/${book.slug}`}
                      className="w-full max-w-[195px] block transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 rounded-lg"
                      title={`Ver detalles de ${book.title}`}
                    >
                      <div
                        className="w-full aspect-[2/3] rounded-lg overflow-hidden bg-white select-none"
                        style={{
                          boxShadow:
                            '0 14px 30px -10px rgba(0, 0, 0, 0.22), 0 4px 10px -4px rgba(0, 0, 0, 0.1)',
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
                  <h3 className="font-serif text-xl sm:text-[22px] lg:text-[23px] font-bold text-stone-900 leading-snug">
                    <Link
                      to={`/${book.slug}`}
                      className="hover:text-stone-700 transition-colors"
                    >
                      {book.title}
                    </Link>
                  </h3>

                  {/* Subtítulo */}
                  <p className="mt-2 text-xs sm:text-[13px] font-medium text-stone-600 line-clamp-2 leading-relaxed font-sans">
                    {book.subtitle}
                  </p>

                  {/* Descripción breve */}
                  <p className="mt-3.5 text-sm sm:text-[14px] text-stone-700 leading-relaxed font-sans border-t border-stone-100 pt-3">
                    {book.description}
                  </p>
                </div>

                {/* Enlace y botón a la ficha individual */}
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-mono text-stone-400">/{book.slug}</span>
                  <Link
                    to={`/${book.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm sm:text-[15px] font-semibold text-white bg-stone-900 hover:bg-[#163a2b] rounded-lg transition-colors shadow-2xs group focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
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
            D. CONTENIDO EDITORIAL SEO COMPLEMENTARIO
            Secciones temáticas profundas con H2 y enlaces contextuales
            ==================================================================== */}
        <section aria-label="Información editorial complementaria" className="mt-16 pt-12 border-t border-stone-200/80 max-w-4xl">
          {/* Bloque 1 */}
          <div className="mb-12">
            <h2 className="font-serif text-2xl sm:text-[28px] font-bold text-stone-900 tracking-tight leading-snug mb-4">
              Guías prácticas para conocer y cuidar mejor a los animales
            </h2>
            <div className="space-y-4 text-[16px] sm:text-[17px] text-stone-700 leading-relaxed font-sans">
              <p>
                Convivir con animales implica conocer sus hábitos, necesidades y formas de comunicarse. Cada especie tiene características propias y requiere cuidados específicos. Disponer de información clara sobre su comportamiento, alimentación y atención cotidiana puede ayudar a comprender mejor a nuestros compañeros animales.
              </p>
              <p>
                En esta colección encontrarás publicaciones dedicadas a diferentes aspectos del mundo animal, desde la educación y el comportamiento canino hasta la convivencia con gatos y la cría y el cuidado de gallinas.
              </p>
            </div>
          </div>

          {/* Bloque 2: Perros */}
          <div className="mb-12 bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs">
            <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-stone-900 tracking-tight leading-snug mb-3.5">
              Libros sobre perros: educación y convivencia
            </h2>
            <p className="text-[16px] sm:text-[17px] text-stone-700 leading-relaxed font-sans">
              Los perros necesitan atención, educación y una convivencia adaptada a sus características. En esta colección encontrarás una publicación dedicada al adiestramiento canino, con contenidos relacionados con la educación y el comportamiento de estos animales.
            </p>
            <div className="mt-4 pt-3 border-t border-stone-100">
              <Link
                to="/perros"
                className="inline-flex items-center gap-2 text-[15px] sm:text-[16px] font-semibold text-stone-900 hover:text-[#163a2b] transition-colors group font-sans"
              >
                <span>Consultar la guía de Adiestramiento Canino</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Bloque 3: Gatos */}
          <div className="mb-12 bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs">
            <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-stone-900 tracking-tight leading-snug mb-3.5">
              Libros sobre gatos: comportamiento y relación con las personas
            </h2>
            <div className="space-y-3.5 text-[16px] sm:text-[17px] text-stone-700 leading-relaxed font-sans">
              <p>
                Los gatos tienen formas particulares de comunicarse, relacionarse y expresar sus necesidades. Comprender sus comportamientos puede ayudar a mejorar la convivencia y a conocer mejor su mundo.
              </p>
              <p>
                En esta colección encontrarás <Link to="/gatos" className="font-semibold text-stone-900 underline decoration-stone-400 hover:decoration-stone-900 transition-colors">El Arte de Amar a un Gato</Link>, una publicación dedicada a comprender, cuidar y convivir con los compañeros felinos.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100">
              <Link
                to="/gatos"
                className="inline-flex items-center gap-2 text-[15px] sm:text-[16px] font-semibold text-stone-900 hover:text-[#163a2b] transition-colors group font-sans"
              >
                <span>Consultar el libro El Arte de Amar a un Gato</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Bloque 4: Gallinas */}
          <div className="mb-12 bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs">
            <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-stone-900 tracking-tight leading-snug mb-3.5">
              Libros sobre gallinas: cría y cuidados
            </h2>
            <p className="text-[16px] sm:text-[17px] text-stone-700 leading-relaxed font-sans">
              La cría de gallinas requiere conocer aspectos como su alimentación, alojamiento, comportamiento y cuidados. <Link to="/gallinas" className="font-semibold text-stone-900 underline decoration-stone-400 hover:decoration-stone-900 transition-colors">La Guía de las Gallinas</Link> aborda esta temática y ofrece una introducción a diferentes aspectos de la crianza y atención de estas aves.
            </p>
            <div className="mt-4 pt-3 border-t border-stone-100">
              <Link
                to="/gallinas"
                className="inline-flex items-center gap-2 text-[15px] sm:text-[16px] font-semibold text-stone-900 hover:text-[#163a2b] transition-colors group font-sans"
              >
                <span>Consultar la ficha de La Guía de las Gallinas</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
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
              {CATEGORIES_LIST.filter((c) => c.slug !== 'mascotas').map((c) => (
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
