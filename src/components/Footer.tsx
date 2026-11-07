import React from 'react';
import { ArrowUp, BookOpen, Heart } from 'lucide-react';
import { CategoryId } from '../types/book';

interface FooterProps {
  onSelectCategory?: (category: CategoryId) => void;
  onScrollToTop?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onScrollToTop,
}) => {
  return (
    <footer className="bg-stone-950 text-stone-400 text-xs border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-2">
            <h3 className="font-serif text-xl font-bold text-stone-100 tracking-tight mb-2">
              Victoria Maciass
            </h3>
            <p className="text-stone-400 text-xs sm:text-sm max-w-sm leading-relaxed mb-4">
              Publicaciones oficiales, guías de vida práctica, bienestar somático y cocina consciente. Todas las obras disponibles en formatos digital, papel y audiolibro.
            </p>
            <div className="flex items-center gap-4 text-xs text-stone-500">
              <span>© {new Date().getFullYear()} Victoria Maciass</span>
              <span aria-hidden="true">·</span>
              <span>Todos los derechos reservados</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-stone-200 font-semibold uppercase tracking-wider text-[11px] mb-3">
              Temáticas
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectCategory?.('salud-mental')}
                  className="hover:text-stone-100 transition-colors cursor-pointer text-left"
                >
                  Salud mental y bienestar
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory?.('desarrollo-personal')}
                  className="hover:text-stone-100 transition-colors cursor-pointer text-left"
                >
                  Desarrollo personal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory?.('salud-cuerpo')}
                  className="hover:text-stone-100 transition-colors cursor-pointer text-left"
                >
                  Salud y cuerpo
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory?.('cocina-recetas')}
                  className="hover:text-stone-100 transition-colors cursor-pointer text-left"
                >
                  Cocina y 18 recetarios
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory?.('mascotas')}
                  className="hover:text-stone-100 transition-colors cursor-pointer text-left"
                >
                  Mascotas (gallinas, gatos, perros)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory?.('manualidades-esoterismo')}
                  className="hover:text-stone-100 transition-colors cursor-pointer text-left"
                >
                  Manualidades y esoterismo
                </button>
              </li>
            </ul>
          </div>

          {/* Platform Distribution & Actions */}
          <div>
            <h4 className="text-stone-200 font-semibold uppercase tracking-wider text-[11px] mb-3">
              Distribución Oficial
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>Amazon Kindle & KDP</li>
              <li>Google Play Libros</li>
              <li>Amazon Tapa Blanda</li>
              <li>Audible / Amazon Audio</li>
              <li className="pt-3">
                <button
                  onClick={onScrollToTop}
                  className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-medium cursor-pointer"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                  <span>Volver al inicio</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px]">
          <p>
            Diseño editorial para la obra literaria y práctica de Victoria Maciass.
          </p>
          <div className="flex items-center gap-1">
            <span>Escrito con intención y dedicación</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
