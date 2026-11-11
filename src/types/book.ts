export type CategoryId = 
  | 'todos'
  | 'salud-mental'
  | 'desarrollo-personal'
  | 'salud-cuerpo'
  | 'mascotas'
  | 'cocina-recetas'
  | 'manualidades-esoterismo';

export interface BookPurchaseLinks {
  // Libro electrónico: Amazon · Google Play Books
  ebookAmazon?: string;
  ebookGooglePlay?: string;
  // Tapa blanda: Amazon
  paperbackAmazon?: string;
  // Tapa dura: Amazon
  hardcoverAmazon?: string;
  // Audiolibro: Amazon (libro narrado) · Google Play Books (audio libro)
  audiobookAmazon?: string;
  audiobookGooglePlay?: string;

  // Aliases for compatibility
  kindle?: string;
  googlePlay?: string;
  paperback?: string;
  audible?: string;
  storytel?: string;
  books2read?: string;
}

export type PurchaseLinks = BookPurchaseLinks;

export interface Book {
  id: string;
  slug: string; // e.g. "varices", "ansiedad", "keto" (unique, lowercase, no spaces or accents)
  title: string;
  subtitle: string;
  author: string; // e.g. "Victoria Maciass"
  category: CategoryId;
  categoryLabel: string;
  synopsis: string;
  fullDescription: string[];
  coverImage?: string;
  coverAlt?: string;
  coverTheme?: {
    bgGradient: string;
    accentColor: string;
    textColor: string;
    tagline: string;
    icon: string;
  };
  isFeatured?: boolean;
  isRecipeBook?: boolean;
  serie?: 'Cocina Saludable' | 'Cocina Mediterránea / Española' | 'Sin serie (generales)' | string;
  pages?: number;
  year?: number;
  language?: string;
  isbn?: string;
  highlights?: string[];
  purchaseLinks: BookPurchaseLinks;
  rating?: number;
  reviewsCount?: number;
  // Campos en español para compatibilidad
  titulo?: string;
  subtitulo?: string;
  categoria?: CategoryId;
  descripcion?: string[];
  portada?: string;
  enlaces?: BookPurchaseLinks;
}
