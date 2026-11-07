import React from 'react';
import { BookOpen } from 'lucide-react';

interface NavbarProps {
  onSelectCategory?: (category: string) => void;
  onOpenFeatured?: () => void;
  onScrollToSection?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenFeatured,
  onScrollToSection,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#fbfbf9]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single element) */}
        <button
          onClick={() => onScrollToSection?.('hero')}
          className="text-left group cursor-pointer"
        >
          <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 group-hover:text-stone-700 transition-colors whitespace-nowrap shrink-0">
            Victoria Maciass
          </span>
        </button>

        {/* Zone 2: 4-5 Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <button
            onClick={() => onScrollToSection?.('catalogo')}
            className="hover:text-stone-950 transition-colors cursor-pointer whitespace-nowrap shrink-0 hover:underline underline-offset-8"
          >
            Catálogo completo
          </button>
          <button
            onClick={() => onScrollToSection?.('recetarios')}
            className="hover:text-stone-950 transition-colors cursor-pointer whitespace-nowrap shrink-0 hover:underline underline-offset-8"
          >
            Recetarios (18)
          </button>
          <button
            onClick={() => onScrollToSection?.('sobre-autora')}
            className="hover:text-stone-950 transition-colors cursor-pointer whitespace-nowrap shrink-0 hover:underline underline-offset-8"
          >
            Sobre la autora
          </button>
          <button
            onClick={() => onScrollToSection?.('newsletter')}
            className="hover:text-stone-950 transition-colors cursor-pointer whitespace-nowrap shrink-0 hover:underline underline-offset-8"
          >
            Club de lectores
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenFeatured}
            className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg shadow-sm transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0"
          >
            <BookOpen className="w-4 h-4 text-amber-300" />
            <span>Libro destacado</span>
          </button>
        </div>
      </div>
    </header>
  );
};
