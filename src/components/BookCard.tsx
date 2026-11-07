import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from '../types/book';
import { BookCover } from './BookCover';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onSelectBook?: (book: Book) => void;
  isCompact?: boolean;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  onSelectBook,
  isCompact = false,
}) => {
  return (
    <Link 
      to={`/${book.slug}`}
      onClick={() => onSelectBook?.(book)}
      className="group relative bg-white border border-stone-200/90 rounded-xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer block text-left"
    >
      <div>
        {/* Cover Presentation Container */}
        <div className="relative aspect-[3/4] w-full flex items-center justify-center bg-stone-50 rounded-lg p-3 sm:p-4 mb-4 overflow-hidden border border-stone-100">
          <BookCover book={book} size={isCompact ? 'sm' : 'md'} className="max-w-[85%] max-h-[92%]" />
          
          {/* Quick view hover pill overlay */}
          <div className="absolute inset-0 bg-stone-900/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
            <span className="bg-white/95 text-stone-900 text-xs font-semibold px-3 py-1.5 rounded-md shadow-sm flex items-center gap-1.5">
              <span>Ver y comprar</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-stone-500" />
            </span>
          </div>
        </div>

        {/* Unboxed Metadata Line (No static pills) */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5">
          <span className="font-medium text-stone-700">{book.categoryLabel}</span>
          {book.pages && (
            <>
              <span aria-hidden="true">·</span>
              <span>{book.pages} págs</span>
            </>
          )}
          {book.year && (
            <>
              <span aria-hidden="true">·</span>
              <span>{book.year}</span>
            </>
          )}
        </div>

        {/* Book Title */}
        <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900 leading-snug group-hover:text-stone-700 transition-colors line-clamp-2">
          {book.title}
        </h3>

        {/* Subtitle / Pitch */}
        <p className="mt-1.5 text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">
          {book.subtitle}
        </p>
      </div>

      {/* Card Footer: Formats & 'Ver y comprar' Button */}
      <div className="mt-5 pt-3.5 border-t border-stone-100 flex items-center justify-between gap-3">
        <div className="text-[11px] text-stone-500">
          <span className="font-medium text-stone-700">Formatos:</span> Digital · Papel
        </div>

        <span className="px-3 py-1.5 text-xs font-semibold text-stone-900 bg-stone-100 group-hover:bg-stone-900 group-hover:text-white rounded-md transition-all flex items-center gap-1.5 shrink-0">
          <ShoppingBag className="w-3.5 h-3.5 text-amber-600 group-hover:text-amber-300 transition-colors" />
          <span>Ver y comprar</span>
        </span>
      </div>
    </Link>
  );
};
