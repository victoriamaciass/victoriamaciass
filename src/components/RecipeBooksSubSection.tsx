import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Book } from '../types/book';
import { BookCover } from './BookCover';
import { Utensils, ChevronRight, Sparkles, ChefHat, Salad } from 'lucide-react';

interface RecipeBooksSubSectionProps {
  recipeBooks: Book[];
  onSelectBook?: (book: Book) => void;
}

const SERIES_CONFIG = [
  {
    id: 'all',
    label: 'Todas las series',
  },
  {
    id: 'Cocina Saludable',
    label: 'Cocina Saludable',
    icon: Salad,
    description: 'Ensaladas frescas, recetas fitness, quinoa y aderezos ligeros.',
  },
  {
    id: 'Cocina Mediterránea / Española',
    label: 'Cocina Mediterránea / Española',
    icon: ChefHat,
    description: 'Paellas magistrales, arroces con alma y tradición culinaria.',
  },
  {
    id: 'Sin serie (generales)',
    label: 'Sin serie (generales)',
    icon: Utensils,
    description: 'Carnes, pollo, freidora de aire, repostería y cocina versátil.',
  },
];

export const RecipeBooksSubSection: React.FC<RecipeBooksSubSectionProps> = ({
  recipeBooks,
}) => {
  const [selectedSeries, setSelectedSeries] = useState<string>('all');

  const seriesGroups: { name: string; label: string; icon: React.ElementType; books: Book[] }[] = [
    {
      name: 'Cocina Saludable',
      label: 'Serie: Cocina Saludable',
      icon: Salad,
      books: recipeBooks.filter((b) => b.serie === 'Cocina Saludable'),
    },
    {
      name: 'Cocina Mediterránea / Española',
      label: 'Serie: Cocina Mediterránea / Española',
      icon: ChefHat,
      books: recipeBooks.filter((b) => b.serie === 'Cocina Mediterránea / Española'),
    },
    {
      name: 'Sin serie (generales)',
      label: 'Sin serie (generales)',
      icon: Utensils,
      books: recipeBooks.filter((b) => !b.serie || b.serie === 'Sin serie (generales)'),
    },
  ];

  return (
    <section id="recetarios" className="my-14 bg-stone-100/70 border border-stone-200/90 rounded-2xl p-6 sm:p-8 lg:p-10">
      {/* Header section with editorial description */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-stone-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider mb-2">
            <Utensils className="w-4 h-4 text-amber-600" />
            <span>Subsección Especial de Recetarios</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>{recipeBooks.length} Títulos en 3 Series</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 tracking-tight">
            Colección de Cocina & Recetarios
          </h2>
          <p className="mt-2 text-sm sm:text-base text-stone-600 max-w-2xl font-sans">
            Guías gastronómicas organizadas en tres colecciones clave: recetas saludables y fitness, arroces y paellas mediterráneas, y recetarios versátiles para el hogar.
          </p>
        </div>

        {/* Filter buttons by series */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-200/60 rounded-lg self-start md:self-auto overflow-x-auto max-w-full">
          {SERIES_CONFIG.map((s) => {
            const count = s.id === 'all' 
              ? recipeBooks.length 
              : recipeBooks.filter((b) => (s.id === 'Sin serie (generales)' ? (!b.serie || b.serie === s.id) : b.serie === s.id)).length;

            return (
              <button
                key={s.id}
                onClick={() => setSelectedSeries(s.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  selectedSeries === s.id
                    ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span>{s.label}</span>
                <span className="ml-1 text-[11px] opacity-70 font-mono">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render the 3 Subgroups by series */}
      <div className="space-y-12">
        {seriesGroups.map((group) => {
          if (selectedSeries !== 'all' && selectedSeries !== group.name) {
            return null;
          }
          if (group.books.length === 0) return null;

          const IconComponent = group.icon;

          return (
            <div key={group.name} className="border-t border-stone-200/80 pt-6 first:border-t-0 first:pt-0">
              {/* Subgroup Heading */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-100/80 text-amber-900 flex items-center justify-center">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                      {group.label}
                    </h3>
                    <p className="text-xs text-stone-500">
                      {group.books.length} {group.books.length === 1 ? 'libro' : 'libros'} en este subgrupo
                    </p>
                  </div>
                </div>
              </div>

              {/* Compact Card Grid for this Subgroup */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                {group.books.map((book) => (
                  <Link
                    key={book.slug}
                    to={`/${book.slug}`}
                    className="group bg-white border border-stone-200/80 rounded-xl p-3.5 flex flex-col justify-between hover:border-stone-400 hover:shadow-md transition-all duration-200 cursor-pointer block text-left"
                  >
                    <div>
                      <div className="flex items-start gap-3 mb-2.5">
                        {/* Mini Book Cover */}
                        <div className="w-16 h-22 shrink-0 rounded overflow-hidden shadow-2xs">
                          <BookCover book={book} size="sm" className="w-full h-full" showSpineShadow={false} />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="text-[11px] text-amber-800 font-semibold mb-1 truncate">
                            {book.serie || 'Recetario'}
                          </div>
                          <h4 className="font-serif text-sm font-bold text-stone-900 leading-snug group-hover:text-stone-700 transition-colors line-clamp-2">
                            {book.title}
                          </h4>
                          {book.subtitle && (
                            <p className="text-[11px] text-stone-500 line-clamp-2 mt-1 leading-normal">
                              {book.subtitle}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Compact action footer */}
                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs mt-1">
                      <span className="text-[11px] text-stone-400 font-mono">/{book.slug}</span>
                      <span className="text-xs font-semibold text-stone-900 group-hover:text-amber-800 transition-colors flex items-center gap-0.5">
                        <span>Ver libro</span>
                        <ChevronRight className="w-3 h-3 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
