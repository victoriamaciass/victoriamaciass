import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { GlobalNavbar } from '../components/GlobalNavbar';
import { CatalogSearchSection } from '../components/CatalogSearchSection';
import { CATEGORIES_LIST } from '../data/categoriesData';
import { Footer } from '../components/Footer';

export const NotFoundPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Página no encontrada (404) | Victoria Maciass';

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'La página solicitada no está disponible. Explora el catálogo de libros y guías prácticas de Victoria Maciass o utiliza el buscador.'
      );
    }

    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', 'noindex, nofollow');

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Página no encontrada (404) | Victoria Maciass');
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute(
        'content',
        'La dirección buscada no existe o no está disponible. Descubre otras publicaciones en el catálogo de Victoria Maciass.'
      );
    }

    // Evitar que una página 404 conserve una URL canónica de otra ruta
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }

    return () => {
      const robots = document.querySelector('meta[name="robots"]');
      if (robots) {
        robots.setAttribute('content', 'index, follow');
      }
      if (!document.querySelector('link[rel="canonical"]')) {
        const restoredCanonical = document.createElement('link');
        restoredCanonical.setAttribute('rel', 'canonical');
        restoredCanonical.setAttribute('href', 'https://victoriamaciass.vercel.app/');
        document.head.appendChild(restoredCanonical);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfbf9] text-stone-900 font-sans selection:bg-stone-200">
      {/* 1. Cabecera global existente */}
      <GlobalNavbar />

      <main className="flex-1">
        {/* 2-5. Código 404, título, explicación y acceso principal al inicio */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p
              aria-hidden="true"
              className="font-serif text-6xl sm:text-7xl md:text-[84px] font-bold tracking-tight text-[#163a2b] leading-none"
            >
              404
            </p>

            <h1 className="mt-4 font-serif text-3xl sm:text-4xl md:text-[42px] font-bold tracking-tight text-stone-900 leading-[1.14]">
              Esta página no está disponible
            </h1>

            <p className="mt-4 text-[16px] sm:text-[17px] text-stone-700 leading-relaxed max-w-2xl mx-auto font-sans">
              Parece que la dirección que buscas no existe, ha cambiado o ya no está disponible. Pero todavía puedes descubrir muchos otros libros en nuestra biblioteca.
            </p>

            <p className="mt-6 text-sm sm:text-[15px] font-semibold uppercase tracking-wider text-stone-600 font-sans">
              ¿Qué te gustaría encontrar?
            </p>

            <div className="mt-5">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] sm:text-[16px] font-semibold text-white bg-[#163a2b] hover:bg-[#102a1f] rounded-xl transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#163a2b] focus-visible:ring-offset-2 font-sans"
              >
                <span>Ir a la página de inicio</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* 6. Opción 2: Buscador del catálogo (reutilizado sin duplicar lógica) */}
        <div className="border-t border-stone-200/80">
          <CatalogSearchSection />
        </div>

        {/* 7. Opción 3: Explorar las seis categorías actuales del catálogo */}
        <section aria-labelledby="not-found-categories-heading" className="py-12 sm:py-16 max-w-5xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2
              id="not-found-categories-heading"
              className="font-serif text-2xl sm:text-[28px] font-bold text-stone-900 tracking-tight"
            >
              Explorar las categorías del catálogo
            </h2>
            <p className="mt-2 text-sm sm:text-[15px] text-stone-600 font-sans">
              Accede directamente a cualquiera de las seis áreas temáticas de Victoria Maciass.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {CATEGORIES_LIST.map((cat) => (
              <Link
                key={cat.slug}
                to={cat.route}
                className="group bg-white border border-stone-200/90 rounded-2xl p-5 flex items-center justify-between gap-3 shadow-2xs hover:border-stone-400 hover:shadow-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#163a2b]"
              >
                <div>
                  <span className="font-serif text-lg sm:text-[19px] font-bold text-stone-900 group-hover:text-[#163a2b] transition-colors block">
                    {cat.title}
                  </span>
                  <span className="mt-1 text-xs sm:text-[13px] text-stone-600 line-clamp-2 font-sans block">
                    {cat.includes}
                  </span>
                </div>
                <ArrowRight
                  className="w-4 h-4 text-stone-500 group-hover:text-[#163a2b] group-hover:translate-x-0.5 transition-all shrink-0"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* 8. Pie de página global */}
      <Footer />
    </div>
  );
};
