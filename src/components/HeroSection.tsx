import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from '../types/book';
import { BookCover } from './BookCover';
import { Star, ArrowRight, Sparkles, BookMarked, ShoppingBag } from 'lucide-react';

interface HeroSectionProps {
  featuredBook: Book;
  onSelectBook?: (book: Book) => void;
  onExploreCatalog?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  featuredBook,
  onSelectBook,
  onExploreCatalog,
}) => {
  return (
    <section id="hero" className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden border-b border-stone-200">
      {/* Soft background ambient light */}
      <div 
        className="absolute top-0 right-1/4 w-96 h-96 bg-amber-100/60 rounded-full blur-3xl pointer-events-none -z-10" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-0 left-10 w-80 h-80 bg-teal-50/70 rounded-full blur-3xl pointer-events-none -z-10" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Author Introduction Title & Statement */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <img
              src="https://ik.imagekit.io/hr20qlpupi/victoria/avatar.jpg"
              alt="Victoria Maciass"
              referrerPolicy="no-referrer"
              className="w-11 h-11 rounded-full object-cover border border-stone-200/90 shadow-2xs"
            />
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-stone-500 uppercase font-sans">
              <span>Escritora & Divulgadora</span>
              <span aria-hidden="true">·</span>
              <span>Ediciones Oficiales</span>
            </div>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.1] text-balance">
            Victoria Maciass
          </h1>

          <p className="mt-4 sm:mt-5 text-lg sm:text-xl text-stone-600 leading-relaxed max-w-2xl font-sans">
            Guías prácticas, bienestar consciente y sabiduría cotidiana para transformar tu vida, tu salud y tu hogar.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={onExploreCatalog}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-2 shadow-sm whitespace-nowrap"
            >
              <span>Explorar catálogo completo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#recetarios"
              className="px-4 py-2.5 text-sm font-medium text-stone-700 hover:text-stone-950 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors inline-flex items-center gap-2 whitespace-nowrap"
            >
              <BookMarked className="w-4 h-4 text-stone-600" />
              <span>Ver recetarios (18)</span>
            </a>
          </div>
        </div>

        {/* Featured Book Showcase Card */}
        <div className="relative bg-white rounded-2xl border border-stone-200/90 shadow-sm overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Book Cover Presentation */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start">
              <Link 
                to={`/${featuredBook.slug}`}
                className="group relative transition-transform duration-300 hover:scale-[1.02] block"
              >
                <BookCover book={featuredBook} size="lg" />
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-900 text-white text-xs py-1 px-3 rounded shadow-md whitespace-nowrap pointer-events-none">
                  Haz clic para ver detalles y comprar
                </div>
              </Link>
            </div>

            {/* Right: Featured Book Editorial Info */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Unboxed Metadata Header */}
              <div className="flex items-center gap-2 text-xs font-medium text-amber-800 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span className="font-semibold uppercase tracking-wider">Libro Destacado</span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span className="text-stone-500">{featuredBook.categoryLabel}</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 tracking-tight leading-tight">
                {featuredBook.title}
              </h2>

              <p className="mt-2 text-sm sm:text-base font-medium text-stone-700 italic">
                {featuredBook.subtitle}
              </p>

              <p className="mt-4 text-sm sm:text-base text-stone-600 leading-relaxed font-sans">
                {featuredBook.synopsis}
              </p>

              {/* Book Highlights Checklist */}
              <div className="mt-5 space-y-1.5 border-t border-stone-100 pt-4">
                {featuredBook.highlights?.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Rating & Formats info */}
              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-stone-500">
                <div className="flex items-center gap-1.5 text-amber-600 font-semibold">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span>{featuredBook.rating || 4.9}</span>
                  <span className="text-stone-400 font-normal">({featuredBook.reviewsCount || 168} reseñas)</span>
                </div>
                <span aria-hidden="true" className="text-stone-300 hidden sm:inline">·</span>
                <span>Formatos: Kindle, Tapa Blanda y Audiolibro</span>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-2 flex flex-wrap items-center gap-3">
                <Link
                  to={`/${featuredBook.slug}`}
                  className="px-6 py-3 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-all duration-150 inline-flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-300" />
                  <span>Ver y comprar este libro</span>
                </Link>
                <Link
                  to={`/${featuredBook.slug}`}
                  className="px-4 py-3 text-sm font-medium text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                >
                  Leer sinopsis completa
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quantitative Proof Adjacency Strip */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-stone-200 text-stone-700">
          <div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
              +25
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">Obras y recetarios publicados</p>
          </div>
          <div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
              +45.000
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">Lectores en España y América</p>
          </div>
          <div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
              4.8 ★
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">Valoración media en plataformas</p>
          </div>
          <div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              3 Formatos
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">Kindle, Tapa Blanda y Audible</p>
          </div>
        </div>
      </div>
    </section>
  );
};
