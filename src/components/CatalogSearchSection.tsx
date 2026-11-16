import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { searchCatalogBooks, isQueryTooShort } from '../data/catalogSearch';

export const CatalogSearchSection: React.FC = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setDebouncedQuery('');
      return;
    }

    const timer = window.setTimeout(() => {
      setDebouncedQuery(query);
    }, 120);

    return () => window.clearTimeout(timer);
  }, [query]);

  const trimmedDebounced = debouncedQuery.trim();
  const tooShort = isQueryTooShort(trimmedDebounced);

  const results = useMemo(() => {
    if (!trimmedDebounced || tooShort) return [];
    return searchCatalogBooks(trimmedDebounced);
  }, [trimmedDebounced, tooShort]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDebouncedQuery(query);
  };

  const handleClear = () => {
    setQuery('');
    setDebouncedQuery('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape' && query.length > 0) {
      e.preventDefault();
      handleClear();
    }
  };

  const hasActiveSearch = trimmedDebounced.length > 0 && !tooShort;

  return (
    <section
      aria-label="Buscador del catálogo"
      className="py-7 sm:py-9 border-b border-stone-200/80 bg-[#f6f5f0]/75"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
          Encuentra tu próximo libro
        </h2>
        <p className="mt-1.5 text-sm sm:text-[15px] text-stone-700 leading-relaxed font-sans">
          Busca por título, temática o palabra clave y descubre las publicaciones de Victoria Maciass.
        </p>

        <form role="search" onSubmit={handleSubmit} className="mt-4 sm:mt-5">
          <label htmlFor="catalog-search-input" className="sr-only">
            Buscar libros por título, temática o palabra clave
          </label>

          <div className="relative flex items-center w-full bg-white border border-stone-300/90 rounded-2xl shadow-2xs focus-within:border-[#163a2b] focus-within:ring-2 focus-within:ring-[#163a2b]/20 transition-all">
            <Search
              aria-hidden="true"
              className="w-5 h-5 text-stone-500 ml-3.5 sm:ml-4 shrink-0 pointer-events-none"
            />
            <input
              ref={inputRef}
              id="catalog-search-input"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="¿Qué libro estás buscando?"
              autoComplete="off"
              enterKeyHint="search"
              aria-describedby="catalog-search-status"
              className="w-full min-w-0 bg-transparent px-3 py-3 sm:py-3.5 text-[15px] sm:text-base text-stone-900 placeholder:text-stone-500 focus:outline-none [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none font-sans"
            />

            {query.length > 0 && (
              <button
                type="button"
                onClick={handleClear}
                aria-label="Borrar búsqueda"
                title="Borrar búsqueda"
                className="mr-1.5 sm:mr-2 p-2.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#163a2b]"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Estado inicial (vacío) o consulta muy corta */}
      {!hasActiveSearch && (
        <div
          id="catalog-search-status"
          aria-live="polite"
          className={tooShort ? 'max-w-3xl mx-auto px-4 sm:px-6 mt-3 text-center' : 'sr-only'}
        >
          {tooShort && (
            <p className="text-xs sm:text-sm text-stone-600 font-sans">
              Escribe al menos 2 caracteres para buscar en el catálogo.
            </p>
          )}
        </div>
      )}

      {/* Resultados de búsqueda */}
      {hasActiveSearch && results.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-7">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-stone-200/80">
            <p
              id="catalog-search-status"
              aria-live="polite"
              className="text-sm sm:text-[15px] text-stone-700 font-sans"
            >
              {results.length === 1 ? (
                <>
                  Se ha encontrado <strong className="font-semibold text-stone-900">1</strong> libro relacionado con tu búsqueda.
                </>
              ) : (
                <>
                  Se han encontrado <strong className="font-semibold text-stone-900">{results.length}</strong> libros relacionados con tu búsqueda.
                </>
              )}
            </p>

            <button
              type="button"
              onClick={handleClear}
              className="text-xs sm:text-sm font-medium text-stone-600 hover:text-stone-950 underline transition-colors cursor-pointer rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#163a2b] px-1 py-0.5"
            >
              Borrar búsqueda
            </button>
          </div>

          <div
            role="region"
            aria-label="Resultados de búsqueda"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
          >
            {results.map((item) => (
              <article
                key={item.slug}
                className="bg-white border border-stone-200/90 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-2xs hover:border-stone-400 hover:shadow-md transition-all duration-200"
              >
                <div>
                  {/* Portada en proporción 2:3 */}
                  <div className="w-full flex justify-center mb-5">
                    <Link
                      to={`/${item.slug}`}
                      className="w-full max-w-[155px] block transition-transform duration-200 hover:scale-[1.02] rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#163a2b]"
                      title={`Ver detalles de ${item.title}`}
                    >
                      {item.coverUrl ? (
                        <div
                          className="w-full aspect-[2/3] rounded-lg overflow-hidden bg-white select-none"
                          style={{
                            boxShadow:
                              '0 12px 28px -8px rgba(0, 0, 0, 0.22), 0 4px 10px -4px rgba(0, 0, 0, 0.1)',
                          }}
                        >
                          <img
                            src={item.coverUrl}
                            alt={`Portada de ${item.title}, de Victoria Maciass`}
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            className="w-full h-full object-contain block"
                          />
                        </div>
                      ) : (
                        <div className="w-full aspect-[2/3] rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center p-4 text-center">
                          <span className="font-serif text-sm font-bold text-stone-800">
                            {item.title}
                          </span>
                        </div>
                      )}
                    </Link>
                  </div>

                  {/* Categoría */}
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#163a2b] block mb-1.5 font-sans">
                    {item.displayCategory}
                  </span>

                  {/* Título completo */}
                  <h3 className="font-serif text-lg sm:text-[19px] font-bold text-stone-900 leading-snug">
                    <Link
                      to={`/${item.slug}`}
                      className="hover:text-[#163a2b] transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#163a2b]"
                    >
                      {item.title}
                    </Link>
                  </h3>

                  {/* Descripción breve */}
                  {item.briefDescription && (
                    <p className="mt-2.5 text-xs sm:text-[13.5px] text-stone-700 leading-relaxed line-clamp-3 font-sans">
                      {item.briefDescription}
                    </p>
                  )}
                </div>

                {/* Enlace/botón Ver libro */}
                <div className="mt-5 pt-3.5 border-t border-stone-100 flex items-center justify-end">
                  <Link
                    to={`/${item.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-stone-900 hover:bg-[#163a2b] rounded-lg transition-colors shadow-2xs group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#163a2b]"
                  >
                    <span>Ver libro</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* Sin resultados */}
      {hasActiveSearch && results.length === 0 && (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 mt-6">
          <div
            id="catalog-search-status"
            aria-live="polite"
            className="bg-white border border-stone-200/90 rounded-2xl p-6 text-center shadow-2xs"
          >
            <p className="text-sm sm:text-[15px] text-stone-700 leading-relaxed font-sans">
              No hemos encontrado libros relacionados con tu búsqueda. Prueba con otras palabras o busca por una temática diferente.
            </p>
            <button
              type="button"
              onClick={handleClear}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#163a2b]"
            >
              <span>Borrar búsqueda y volver a intentar</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
