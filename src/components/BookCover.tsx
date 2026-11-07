import React from 'react';
import { Book } from '../types/book';
import { 
  Heart, 
  Sparkles, 
  Activity, 
  Utensils, 
  PawPrint, 
  Flame, 
  Feather, 
  Moon, 
  Sun, 
  Zap, 
  Compass, 
  Leaf, 
  Shield, 
  Eye, 
  Scissors, 
  Clock, 
  BookOpen,
  Wheat,
  Coffee,
  Calendar,
  Share2,
  Anchor
} from 'lucide-react';

interface BookCoverProps {
  book: Book;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  showSpineShadow?: boolean;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Heart,
  Sparkles,
  Activity,
  Utensils,
  PawPrint,
  Flame,
  Feather,
  Moon,
  Sun,
  Zap,
  Compass,
  Leaf,
  Shield,
  Eye,
  Scissors,
  Clock,
  BookOpen,
  Wheat,
  Coffee,
  Calendar,
  Share2,
  Anchor
};

export const BookCover: React.FC<BookCoverProps> = ({
  book,
  size = 'md',
  className = '',
  showSpineShadow = true,
}) => {
  // If the book has a custom cover image, render it as-is without frames, lines, or artificial shadows
  if (book.coverImage) {
    const sizeClasses = {
      sm: 'w-20 sm:w-24',
      md: 'w-full max-w-[260px]',
      lg: 'w-full max-w-[320px] sm:max-w-[360px]',
      hero: 'w-64 sm:w-76 md:w-88',
    }[size];

    return (
      <img 
        src={book.coverImage} 
        alt={`Portada del libro ${book.title}`}
        referrerPolicy="no-referrer"
        className={`${sizeClasses} ${className} h-auto object-contain block`}
        style={{ boxShadow: 'none', border: 'none', outline: 'none' }}
      />
    );
  }

  // Fallback: Publisher-grade Hardcover Embossed Cover
  const theme = book.coverTheme || {
    bgGradient: 'from-stone-900 to-amber-950',
    accentColor: '#f59e0b',
    textColor: '#fef3c7',
    tagline: 'Edición Oficial',
    icon: 'BookOpen',
  };
  const IconComponent = ICON_MAP[theme.icon] || BookOpen;

  const sizeClasses = {
    sm: 'w-24 h-34 p-2 text-[9px]',
    md: 'w-full aspect-[3/4] p-4 sm:p-5',
    lg: 'w-64 sm:w-80 aspect-[3/4] p-6 sm:p-8',
    hero: 'w-64 sm:w-76 md:w-88 aspect-[3/4] p-8',
  }[size];

  return (
    <div
      className={`relative rounded-md overflow-hidden bg-gradient-to-br ${theme.bgGradient} flex flex-col justify-between select-none shadow-xl transition-all duration-300 group-hover:shadow-2xl ${sizeClasses} ${className}`}
      style={{
        boxShadow: '0 12px 30px -8px rgba(0, 0, 0, 0.35), 0 4px 6px -2px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Book spine highlight / crease */}
      {showSpineShadow && (
        <>
          <div 
            className="absolute inset-y-0 left-0 w-3.5 bg-gradient-to-r from-black/40 via-white/20 to-transparent z-10 pointer-events-none" 
            aria-hidden="true"
          />
          <div 
            className="absolute inset-y-0 left-3 w-[1px] bg-black/30 z-10 pointer-events-none" 
            aria-hidden="true"
          />
        </>
      )}

      {/* Subtle textured paper overlay */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/30 via-transparent to-black/40" 
        aria-hidden="true"
      />

      {/* Top Header: Author Name */}
      <div className="relative z-10 text-center border-b border-white/15 pb-2">
        <p className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-white/90 uppercase font-sans">
          Victoria Maciass
        </p>
      </div>

      {/* Middle: Icon & Emblazoned Title */}
      <div className="relative z-10 text-center my-auto py-2">
        <div className="flex justify-center mb-2.5 sm:mb-3">
          <div 
            className="w-8 h-8 sm:w-11 sm:h-11 rounded-full flex items-center justify-center border border-white/20 bg-white/5 backdrop-blur-xs"
            style={{ color: theme.accentColor }}
          >
            <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>

        <h3 className="font-serif text-base sm:text-xl md:text-2xl font-bold leading-tight tracking-tight text-white px-1">
          {book.title}
        </h3>

        {size !== 'sm' && (
          <p 
            className="mt-2 text-[10px] sm:text-xs font-medium tracking-wide max-w-[90%] mx-auto line-clamp-2"
            style={{ color: theme.textColor }}
          >
            {theme.tagline}
          </p>
        )}
      </div>

      {/* Bottom: Publisher Seal / Category */}
      <div className="relative z-10 text-center border-t border-white/15 pt-2">
        <p className="text-[9px] sm:text-[10px] font-sans tracking-widest uppercase text-white/70">
          {book.isRecipeBook ? 'Colección Recetas' : book.categoryLabel}
        </p>
      </div>
    </div>
  );
};
