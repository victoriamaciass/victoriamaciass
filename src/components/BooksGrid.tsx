import React from 'react';
import { Book, CategoryId } from '../types/book';
import { BookCard } from './BookCard';
import { RecipeBooksSubSection } from './RecipeBooksSubSection';
import { SearchX, Sparkles } from 'lucide-react';

interface BooksGridProps {
  books: Book[];
  selectedCategory: CategoryId;
  searchQuery: string;
  onSelectBook?: (book: Book) => void;
  onSelectCategory: (category: CategoryId) => void;
}

const CATEGORY_NAMES: Record<CategoryId, string> = {
  todos: 'Todos los libros',
  'salud-mental': 'Salud mental y bienestar',
  'desarrollo-personal': 'Desarrollo personal',
  'salud-cuerpo': 'Salud y cuerpo',
  'cocina-recetas': 'Cocina y recetas',
  mascotas: 'Mascotas',
  'manualidades-esoterismo': 'Manualidades y esoterismo',
};

const CATEGORY_ORDER: CategoryId[] = [
  'salud-mental',
  'desarrollo-personal',
  'salud-cuerpo',
  'mascotas',
  'manualidades-esoterismo',
  'cocina-recetas',
];

export const BooksGrid: React.FC<BooksGridProps> = ({
  books,
  selectedCategory,
  searchQuery,
  onSelectBook,
  onSelectCategory,
}) => {
  // If search query is present
  const isSearching = searchQuery.trim().length > 0;

  const filteredBooks = books.filter((b) => {
    const matchesCategory = selectedCategory === 'todos' || b.category === selectedCategory;
    if (!matchesCategory) return false;

    if (!isSearching) return true;
    const q = searchQuery.toLowerCase();
    return (
      b.title.toLowerCase().includes(q) ||
      b.subtitle.toLowerCase().includes(q) ||
      b.synopsis.toLowerCase().includes(q) ||
      b.categoryLabel.toLowerCase().includes(q)
    );
  });

  // Dedicated culinary recipe books
  const recipeBooks = books.filter((b) => b.category === 'cocina-recetas');

  if (filteredBooks.length === 0) {
    return (
      <div className="py-20 text-center">
        <SearchX className="w-12 h-12 text-stone-300 mx-auto mb-3" />
        <h3 className="font-serif text-xl font-bold text-stone-800">
          No se encontraron libros
        </h3>
        <p className="text-sm text-stone-500 mt-1 max-w-sm mx-auto">
          No hay publicaciones que coincidan con "{searchQuery}". Prueba con otro término como "ansiedad", "keto", "gallinas" o "velas".
        </p>
        <button
          onClick={() => onSelectCategory('todos')}
          className="mt-4 px-4 py-2 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
        >
          Ver todo el catálogo
        </button>
      </div>
    );
  }

  // Case 1: Searching or Specific Category (other than 'todos')
  if (isSearching) {
    return (
      <div className="py-10">
        <div className="mb-6">
          <p className="text-xs text-stone-500">
            Se encontraron <span className="font-bold text-stone-900">{filteredBooks.length}</span> libros para "{searchQuery}"
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} onSelectBook={onSelectBook} />
          ))}
        </div>
      </div>
    );
  }

  // Case 2: Specific category selected
  if (selectedCategory !== 'todos') {
    if (selectedCategory === 'cocina-recetas') {
      return (
        <div className="py-8">
          <RecipeBooksSubSection recipeBooks={recipeBooks} />
        </div>
      );
    }

    return (
      <div className="py-8">
        <div className="mb-8">
          <h2 className="font-serif text-3xl font-bold text-stone-900">
            {CATEGORY_NAMES[selectedCategory]}
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            {filteredBooks.length} obras en esta colección
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} onSelectBook={onSelectBook} />
          ))}
        </div>
      </div>
    );
  }

  // Case 3: 'Todos' - Grouped by Category as requested
  // "La cuadrícula muestra todos los libros agrupados por categoría... La categoría 'Cocina y recetas' debe tener una subsección propia y más compacta para los libros de recetas."
  return (
    <div className="py-8 space-y-16">
      {CATEGORY_ORDER.map((catId) => {
        if (catId === 'cocina-recetas') {
          return (
            <div key={catId} className="pt-4">
              <RecipeBooksSubSection recipeBooks={recipeBooks} />
            </div>
          );
        }

        const catBooks = books.filter((b) => b.category === catId && !b.isRecipeBook);
        if (catBooks.length === 0) return null;

        return (
          <section key={catId} className="scroll-mt-36">
            <div className="flex items-end justify-between border-b border-stone-200 pb-3 mb-6">
              <div>
                <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-widest block mb-0.5">
                  Colección
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  {CATEGORY_NAMES[catId]}
                </h3>
              </div>
              <button
                onClick={() => onSelectCategory(catId)}
                className="text-xs font-semibold text-amber-900 hover:text-amber-700 transition-colors cursor-pointer"
              >
                Ver todos ({catBooks.length}) →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {catBooks.map((book) => (
                <BookCard key={book.id} book={book} onSelectBook={onSelectBook} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};
