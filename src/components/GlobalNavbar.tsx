import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home } from 'lucide-react';
import { CATEGORIES_LIST } from '../data/categoriesData';

export const GlobalNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (route: string) => {
    return location.pathname === route;
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fbfbf9]/95 backdrop-blur-md border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex items-center justify-between gap-4">
        
        {/* A la izquierda: Icono de inicio enlazando a la Home / */}
        <div className="relative group flex items-center">
          <Link
            to="/"
            aria-label="Inicio"
            title="Inicio"
            className="p-2 sm:p-2.5 text-stone-800 hover:text-stone-950 hover:bg-stone-200/60 rounded-xl transition-all inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
          >
            <Home className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
            <span className="sr-only">Inicio</span>
          </Link>
          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1.5 px-2.5 py-1 bg-stone-900 text-white text-xs font-medium rounded-md shadow-md whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 pointer-events-none z-50">
            Inicio
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-stone-900" />
          </div>
        </div>

        {/* A la derecha en escritorio: fila de enlaces directos a las 6 categorías */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {CATEGORIES_LIST.map((cat) => {
            const active = isActive(cat.route);
            return (
              <Link
                key={cat.slug}
                to={cat.route}
                className={`px-3.5 py-2 text-[15px] xl:text-[16px] font-medium rounded-lg transition-colors whitespace-nowrap ${
                  active
                    ? 'text-stone-950 bg-stone-200/80 font-semibold shadow-2xs'
                    : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100/90'
                }`}
              >
                {cat.navLabel}
              </Link>
            );
          })}
        </nav>

        {/* Botón de menú hamburguesa en móvil y tablet */}
        <div className="flex items-center lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menú desplegable en móvil */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-[#fbfbf9] px-4 py-4 space-y-1.5 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <p className="px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-stone-600 font-sans">
            Categorías principales
          </p>
          {CATEGORIES_LIST.map((cat) => {
            const active = isActive(cat.route);
            return (
              <Link
                key={cat.slug}
                to={cat.route}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-3 text-[15px] sm:text-base rounded-lg transition-colors ${
                  active
                    ? 'text-stone-950 bg-stone-200/80 font-semibold'
                    : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100'
                }`}
              >
                <span>{cat.title}</span>
                <span className="text-sm text-stone-500 font-mono">→</span>
              </Link>
            );
          })}
          <div className="pt-2 border-t border-stone-200/80 mt-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 text-[14px] sm:text-[15px] text-stone-600 hover:text-stone-900 text-center font-medium"
            >
              Ir a la página de inicio
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
