import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GlobalNavbar } from '../components/GlobalNavbar';
import { BOOKS_DATA } from '../data/booksData';
import { getCategoryBySlug, CATEGORIES_LIST, CategoryInfo } from '../data/categoriesData';
import { getBookCover } from '../data/bookCovers';
import { Book } from '../types/book';
import { ArrowRight, ChevronRight, BookOpen, Utensils, Salad, ChefHat, Sparkles } from 'lucide-react';
import { MascotasCategoryView } from '../components/MascotasCategoryView';
import { MenteEmocionesCategoryView } from '../components/MenteEmocionesCategoryView';
import { CrecimientoPersonalCategoryView } from '../components/CrecimientoPersonalCategoryView';
import { CuerpoSaludCategoryView } from '../components/CuerpoSaludCategoryView';

interface CategoryPageProps {
  categorySlug?: string;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ categorySlug: propSlug }) => {
  const params = useParams<{ categorySlug?: string }>();
  const activeSlug = propSlug || params.categorySlug || '';

  const categoryInfo: CategoryInfo | undefined = getCategoryBySlug(activeSlug);

  // Filtro de serie para la categoría de cocina
  const [selectedCookingSeries, setSelectedCookingSeries] = useState<string>('todas');

  // Obtener libros de esta categoría
  const categoryBooks: Book[] = categoryInfo
    ? BOOKS_DATA.filter((b) => b.category === categoryInfo.categoryId || b.categoria === categoryInfo.categoryId)
    : [];

  // Filtrado de libros si es cocina
  const displayedBooks = categoryInfo?.slug === 'cocina' && selectedCookingSeries !== 'todas'
    ? categoryBooks.filter((b) => {
        if (selectedCookingSeries === 'generales') {
          return !b.serie || b.serie === 'Sin serie (generales)';
        }
        return b.serie === selectedCookingSeries;
      })
    : categoryBooks;

  // SEO dinámico para categorías generales
  useEffect(() => {
    window.scrollTo(0, 0);
    if (
      categoryInfo &&
      categoryInfo.slug !== 'mascotas' &&
      categoryInfo.slug !== 'mente-emociones' &&
      categoryInfo.slug !== 'crecimiento-personal' &&
      categoryInfo.slug !== 'cuerpo-salud'
    ) {
      document.title = `${categoryInfo.title} — Libros de Victoria Maciass`;

      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', categoryInfo.description.slice(0, 155));
      }
      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute('content', categoryInfo.description.slice(0, 155));
      }
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', `${categoryInfo.title} — Victoria Maciass`);
      }
    }
  }, [categoryInfo?.slug]);

  if (!categoryInfo) {
    return (
      <div className="min-h-screen bg-[#fbfbf9] flex flex-col justify-between text-stone-900 font-sans">
        <GlobalNavbar />
        <main className="max-w-xl mx-auto px-6 py-24 text-center">
          <h1 className="font-serif text-3xl font-bold text-stone-900 mb-3">
            Categoría no encontrada
          </h1>
          <p className="text-stone-600 text-sm mb-6 leading-relaxed">
            La categoría solicitada no existe o ha sido reubicada.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors"
          >
            <span>Volver a la página de inicio</span>
          </Link>
        </main>
        <footer className="border-t border-stone-200 py-6 text-center text-xs text-stone-500 bg-white">
          <p>© {new Date().getFullYear()} Victoria Maciass</p>
        </footer>
      </div>
    );
  }

  // Vista especializada y optimizada para Mascotas
  if (categoryInfo.slug === 'mascotas') {
    return <MascotasCategoryView categoryInfo={categoryInfo} />;
  }

  // Vista especializada y optimizada para Mente y emociones
  if (categoryInfo.slug === 'mente-emociones') {
    return <MenteEmocionesCategoryView categoryInfo={categoryInfo} />;
  }

  // Vista especializada y optimizada para Crecimiento personal
  if (categoryInfo.slug === 'crecimiento-personal') {
    return <CrecimientoPersonalCategoryView categoryInfo={categoryInfo} />;
  }

  // Vista especializada y optimizada para Cuerpo y salud
  if (categoryInfo.slug === 'cuerpo-salud') {
    return <CuerpoSaludCategoryView categoryInfo={categoryInfo} />;
  }

  return (
    <div className="min-h-screen bg-[#fbfbf9] text-stone-900 font-sans selection:bg-stone-200">
      {/* 1. Header Global visible en todas las páginas */}
      <GlobalNavbar />

      {/* 2. Migas de pan (Breadcrumbs): Inicio > [Nombre de la Categoría] */}
      <div className="border-b border-stone-200/70 bg-[#fbfbf9]/90 py-3.5">
        <div className="max-w-6xl mx-auto px-6 flex items-center gap-2 text-sm text-stone-600">
          <Link to="/" className="hover:text-stone-900 transition-colors font-medium">
            Inicio
          </Link>
          <ChevronRight className="w-4 h-4 text-stone-400" />
          <span className="text-stone-900 font-semibold">{categoryInfo.title}</span>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-12 sm:py-16">
        
        {/* Encabezado editorial de la categoría */}
        <section className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs sm:text-[13px] font-semibold uppercase tracking-wider text-stone-600 mb-2.5 font-sans">
            <span>Catálogo Nivel 2</span>
            <span>·</span>
            <span>{categoryBooks.length} {categoryBooks.length === 1 ? 'título disponible' : 'títulos disponibles'}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] font-bold tracking-tight text-stone-900 leading-[1.12]">
            {categoryInfo.title}
          </h1>

          <p className="mt-4 text-[16px] sm:text-[17px] md:text-[18px] text-stone-700 leading-relaxed font-sans">
            {categoryInfo.description}
          </p>

          <p className="mt-3.5 text-sm sm:text-[15px] text-stone-600 font-sans">
            <strong className="text-stone-900 font-semibold">Temas que incluye:</strong> {categoryInfo.includes}
          </p>

          {/* Filtros especiales para Cocina */}
          {categoryInfo.slug === 'cocina' && (
            <div className="mt-8 pt-6 border-t border-stone-200/80">
              <span className="text-xs sm:text-sm font-semibold text-stone-700 block mb-2.5 font-sans uppercase tracking-wider">
                Filtrar por colección culinaria:
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                {[
                  { id: 'todas', label: 'Todos los recetarios', count: 18 },
                  { id: 'Cocina Saludable', label: 'Cocina Saludable', count: 6 },
                  { id: 'Cocina Mediterránea / Española', label: 'Cocina Mediterránea / Española', count: 6 },
                  { id: 'generales', label: 'Recetas generales', count: 6 },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedCookingSeries(s.id)}
                    className={`px-3.5 py-2 text-xs sm:text-sm rounded-lg transition-all cursor-pointer font-medium ${
                      selectedCookingSeries === s.id
                        ? 'bg-stone-900 text-white shadow-2xs font-semibold'
                        : 'bg-white border border-stone-200/90 text-stone-700 hover:border-stone-400'
                    }`}
                  >
                    <span>{s.label}</span>
                    <span className="ml-1.5 opacity-80 font-mono text-[11px]">({s.count})</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Cuadrícula con todos los libros de esta categoría */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedBooks.map((book) => {
              const coverUrl = getBookCover(book.slug, book.coverImage || book.portada);

              return (
                <article
                  key={book.slug}
                  className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-2xs hover:border-stone-400 hover:shadow-md transition-all duration-200"
                >
                  <div>
                    {/* Portada en proporción 2:3 */}
                    <div className="w-full flex justify-center mb-6">
                      <Link
                        to={`/${book.slug}`}
                        className="w-full max-w-[190px] block transition-transform duration-200 hover:scale-[1.02]"
                        title={`Ver detalles de ${book.title}`}
                      >
                        {coverUrl ? (
                          <div
                            className="w-full aspect-[2/3] rounded-lg overflow-hidden bg-white select-none"
                            style={{
                              boxShadow: '0 12px 28px -8px rgba(0, 0, 0, 0.22), 0 4px 10px -4px rgba(0, 0, 0, 0.1)',
                            }}
                          >
                            <img
                              src={coverUrl}
                              alt={book.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-contain block"
                            />
                          </div>
                        ) : (
                          <div
                            className="w-full aspect-[2/3] bg-stone-100 border border-stone-300 rounded-lg p-4 flex flex-col justify-between text-center select-none"
                            style={{
                              boxShadow: '0 10px 20px -8px rgba(0, 0, 0, 0.15)',
                            }}
                          >
                            <span className="text-[8px] uppercase tracking-widest text-stone-400 font-mono">
                              Victoria Maciass
                            </span>
                            <div className="my-auto px-1">
                              <span className="text-[9px] uppercase tracking-wider text-stone-400 font-mono block mb-1">
                                [ Portada 2:3 ]
                              </span>
                              <h3 className="font-serif text-sm font-bold text-stone-800 leading-snug line-clamp-3">
                                {book.title}
                              </h3>
                            </div>
                            <span className="text-[8px] uppercase tracking-widest text-stone-400 font-mono">
                              {book.serie || categoryInfo.title}
                            </span>
                          </div>
                        )}
                      </Link>
                    </div>

                    {/* Subtítulo / Serie pill si aplica */}
                    {book.serie && (
                      <span className="inline-block text-xs font-semibold text-amber-900 uppercase tracking-wider mb-2 font-sans">
                        {book.serie}
                      </span>
                    )}

                    {/* Título del libro (H2 21-24px) */}
                    <h2 className="font-serif text-xl sm:text-[22px] lg:text-[24px] font-bold text-stone-900 leading-snug">
                      <Link
                        to={`/${book.slug}`}
                        className="hover:text-stone-700 transition-colors"
                      >
                        {book.title}
                      </Link>
                    </h2>

                    {/* Subtítulo */}
                    {book.subtitle ? (
                      <p className="mt-2.5 text-sm sm:text-[15px] text-stone-600 line-clamp-2 leading-relaxed font-sans">
                        {book.subtitle}
                      </p>
                    ) : (
                      <p className="mt-2.5 text-sm text-stone-500 italic font-sans">
                        Guía práctica oficial por Victoria Maciass
                      </p>
                    )}
                  </div>

                  {/* Botón que enlace a la página individual del libro */}
                  <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-xs font-mono text-stone-400">/{book.slug}</span>
                    <Link
                      to={`/${book.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm sm:text-[15px] font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors shadow-2xs group"
                    >
                      <span>Ver libro</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Enlace de navegación de vuelta y categorías relacionadas */}
        <section className="mt-16 sm:mt-24 pt-10 border-t border-stone-200/80">
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

      {/* Pie de página sencillo */}
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
