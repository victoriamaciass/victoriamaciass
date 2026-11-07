import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { CATEGORIES_LIST } from '../data/categoriesData';

export const GlobalNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (route: string) => {
    return location.pathname === route;
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fbfbf9]/95 backdrop-blur-md border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* A la izquierda: El nombre de la autora enlazando a la Home / */}
        <Link
          to="/"
          className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-stone-900 hover:text-stone-700 transition-colors whitespace-nowrap"
        >
          Victoria Maciass
        </Link>

        {/* A la derecha en escritorio: fila de enlaces directos a las 6 categorías */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {CATEGORIES_LIST.map((cat) => {
            const active = isActive(cat.route);
            return (
              <Link
                key={cat.slug}
                to={cat.route}
                className={`px-3 py-1.5 text-xs xl:text-[13px] font-medium rounded-md transition-colors whitespace-nowrap ${
                  active
                    ? 'text-stone-900 bg-stone-200/70 font-semibold shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/70'
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
            className="p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Menú desplegable en móvil */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-[#fbfbf9] px-4 py-4 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <p className="px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-stone-400 font-semibold">
            Categorías principales
          </p>
          {CATEGORIES_LIST.map((cat) => {
            const active = isActive(cat.route);
            return (
              <Link
                key={cat.slug}
                to={cat.route}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 text-sm rounded-lg transition-colors ${
                  active
                    ? 'text-stone-950 bg-stone-200/70 font-semibold'
                    : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100'
                }`}
              >
                <span>{cat.title}</span>
                <span className="text-xs text-stone-400 font-mono">→</span>
              </Link>
            );
          })}
          <div className="pt-2 border-t border-stone-200/80 mt-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-xs text-stone-500 hover:text-stone-900 text-center font-medium"
            >
              Ir a la página de inicio
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
