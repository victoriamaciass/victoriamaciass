import React, { useState, useEffect } from 'react';
import { Book, PurchaseLinks } from '../types/book';
import { BookCover } from './BookCover';
import { 
  ArrowLeft, 
  ExternalLink, 
  Edit3, 
  Check, 
  RotateCcw, 
  BookOpen, 
  Headphones, 
  Layers, 
  Star, 
  Globe, 
  Calendar, 
  FileText, 
  ShieldCheck,
  ChevronRight,
  Share2
} from 'lucide-react';

interface BookDetailViewProps {
  book: Book;
  allBooks: Book[];
  onBack: () => void;
  onSelectBook: (book: Book) => void;
}

export const BookDetailView: React.FC<BookDetailViewProps> = ({
  book,
  allBooks,
  onBack,
  onSelectBook,
}) => {
  // Local storage customization for user-edited manual links
  const [links, setLinks] = useState<PurchaseLinks>(book.purchaseLinks);
  const [isEditingLinks, setIsEditingLinks] = useState(false);
  const [customLinkDraft, setCustomLinkDraft] = useState<PurchaseLinks>(book.purchaseLinks);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Load custom links from localStorage when book changes
  useEffect(() => {
    const saved = localStorage.getItem(`custom_links_${book.id}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setLinks(parsed);
        setCustomLinkDraft(parsed);
      } catch {
        setLinks(book.purchaseLinks);
        setCustomLinkDraft(book.purchaseLinks);
      }
    } else {
      setLinks(book.purchaseLinks);
      setCustomLinkDraft(book.purchaseLinks);
    }
    setIsEditingLinks(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [book.id, book.purchaseLinks]);

  const handleSaveLinks = (e: React.FormEvent) => {
    e.preventDefault();
    setLinks(customLinkDraft);
    localStorage.setItem(`custom_links_${book.id}`, JSON.stringify(customLinkDraft));
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setIsEditingLinks(false);
    }, 1500);
  };

  const handleResetLinks = () => {
    localStorage.removeItem(`custom_links_${book.id}`);
    setLinks(book.purchaseLinks);
    setCustomLinkDraft(book.purchaseLinks);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 1500);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Other books in the same category (excluding current book)
  const relatedBooks = allBooks
    .filter((b) => b.category === book.category && b.id !== book.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen py-8 sm:py-12 bg-[#fbfbf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb and Back link */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold text-stone-700 hover:text-stone-950 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Volver al catálogo completo</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsEditingLinks(!isEditingLinks)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 hover:text-stone-950 bg-stone-100 hover:bg-stone-200 border border-stone-200/80 rounded-lg transition-colors cursor-pointer"
              title="Configura tus enlaces reales de Amazon, Google Play o Audible"
            >
              <Edit3 className="w-3.5 h-3.5 text-amber-700" />
              <span>{isEditingLinks ? 'Cerrar editor de enlaces' : 'Editar enlaces de compra'}</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 bg-white border border-stone-200 rounded-lg transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? '¡Enlace copiado!' : 'Compartir'}</span>
            </button>
          </div>
        </div>

        {/* Manual Links Customizer Drawer (when open) */}
        {isEditingLinks && (
          <div className="mb-10 p-6 bg-amber-50/70 border border-amber-200/80 rounded-xl shadow-xs transition-all">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-sm font-bold text-amber-950 flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-amber-700" />
                  <span>Personalizar enlaces de compra para: "{book.title}"</span>
                </h3>
                <p className="text-xs text-amber-900/80 mt-1">
                  Rellena aquí tus enlaces directos a tus tiendas oficiales (Kindle, Google Play, Tapa blanda en Amazon, Audible). Se guardan localmente para que tus lectores compren directamente en tus cuentas.
                </p>
              </div>
              <button
                type="button"
                onClick={handleResetLinks}
                className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1 underline cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Restablecer</span>
              </button>
            </div>

            <form onSubmit={handleSaveLinks} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Enlace Amazon Kindle (eBook)
                </label>
                <input
                  type="url"
                  value={customLinkDraft.kindle || ''}
                  onChange={(e) => setCustomLinkDraft({ ...customLinkDraft, kindle: e.target.value })}
                  placeholder="https://www.amazon.es/dp/..."
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-md focus:ring-1 focus:ring-amber-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Enlace Google Play Libros (eBook)
                </label>
                <input
                  type="url"
                  value={customLinkDraft.googlePlay || ''}
                  onChange={(e) => setCustomLinkDraft({ ...customLinkDraft, googlePlay: e.target.value })}
                  placeholder="https://play.google.com/store/books/..."
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-md focus:ring-1 focus:ring-amber-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Enlace Tapa Blanda (Amazon / Librerías)
                </label>
                <input
                  type="url"
                  value={customLinkDraft.paperback || ''}
                  onChange={(e) => setCustomLinkDraft({ ...customLinkDraft, paperback: e.target.value })}
                  placeholder="https://www.amazon.es/dp/..."
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-md focus:ring-1 focus:ring-amber-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Enlace Audiolibro (Audible / Storytel)
                </label>
                <input
                  type="url"
                  value={customLinkDraft.audible || ''}
                  onChange={(e) => setCustomLinkDraft({ ...customLinkDraft, audible: e.target.value })}
                  placeholder="https://www.audible.es/pd/..."
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-md focus:ring-1 focus:ring-amber-600 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2 flex items-center justify-end gap-3 mt-2">
                {saveSuccess && (
                  <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>¡Enlaces actualizados correctamente!</span>
                  </span>
                )}
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-amber-900 hover:bg-amber-800 rounded-md transition-colors cursor-pointer shadow-xs"
                >
                  Guardar enlaces personalizados
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Main Product Layout (2-Column Desktop Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Big Book Cover Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="sticky top-28 w-full max-w-sm flex flex-col items-center">
              <div className="p-6 bg-white rounded-2xl border border-stone-200/90 shadow-sm w-full flex justify-center">
                <BookCover book={book} size="lg" className="w-full max-w-[280px] sm:max-w-[320px]" />
              </div>

              {/* Guarantees / Publisher Info */}
              <div className="mt-5 w-full bg-stone-50 border border-stone-200/60 rounded-xl p-4 text-xs text-stone-600 space-y-2">
                <div className="flex items-center gap-2 text-stone-800 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Edición Oficial de la Autora Victoria Maciass</span>
                </div>
                <p className="text-[11px] leading-relaxed text-stone-500">
                  Disponible para lectura instantánea en dispositivos Kindle, tabletas, smartphones o entrega física en tapa blanda con papel reciclado de alta calidad.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Complete Editorial Details & Grouped Purchase Actions */}
          <div className="lg:col-span-7">
            {/* Category & Metadata Header */}
            <div className="flex items-center gap-2 text-xs text-stone-500 font-medium mb-2">
              <span className="text-amber-800 font-semibold">{book.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span>Edición {book.year}</span>
              <span aria-hidden="true">·</span>
              <span>{book.pages} páginas</span>
              <span aria-hidden="true">·</span>
              <span>{book.language}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
              {book.title}
            </h1>

            <p className="mt-3 text-base sm:text-lg text-stone-700 font-medium leading-snug italic font-sans">
              {book.subtitle}
            </p>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-2 text-sm text-stone-600 border-b border-stone-200 pb-5">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-semibold text-stone-900">{book.rating}</span>
              <span className="text-stone-500">· {book.reviewsCount} opiniones verificadas</span>
            </div>

            {/* --- GROUPED PURCHASE BUTTONS BY FORMAT (Explicit Requirement) --- */}
            <div className="my-8 p-6 bg-white border border-stone-200 rounded-2xl shadow-xs">
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-1">
                Comprar libro por formato
              </h3>
              <p className="text-xs text-stone-500 mb-6">
                Selecciona tu formato preferido para acceder a las plataformas de distribución oficiales.
              </p>

              <div className="space-y-5">
                {/* 1. Formato: Libro electrónico (Kindle / Google Play) */}
                <div className="border border-stone-200/90 rounded-xl p-4 bg-stone-50/50 hover:bg-stone-50 transition-colors">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-4 h-4 text-amber-700" />
                    <span className="text-sm font-bold text-stone-900">Libro electrónico (eBook)</span>
                    <span className="text-xs text-stone-500 font-normal ml-auto">Descarga instantánea</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {links.kindle ? (
                      <a
                        href={links.kindle}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold shadow-2xs transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <span>Amazon Kindle</span>
                        </span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <button disabled className="px-4 py-2.5 bg-stone-200 text-stone-400 rounded-lg text-xs font-medium cursor-not-allowed">
                        Kindle (Próximamente)
                      </button>
                    )}

                    {links.googlePlay ? (
                      <a
                        href={links.googlePlay}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between px-4 py-2.5 bg-stone-800 hover:bg-stone-900 text-white rounded-lg text-xs font-semibold shadow-2xs transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <span>Google Play Libros</span>
                        </span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <button disabled className="px-4 py-2.5 bg-stone-200 text-stone-400 rounded-lg text-xs font-medium cursor-not-allowed">
                        Google Play (Próximamente)
                      </button>
                    )}
                  </div>
                </div>

                {/* 2. Formato: Tapa blanda */}
                <div className="border border-stone-200/90 rounded-xl p-4 bg-stone-50/50 hover:bg-stone-50 transition-colors">
                  <div className="flex items-center gap-2 mb-3">
                    <Layers className="w-4 h-4 text-teal-700" />
                    <span className="text-sm font-bold text-stone-900">Tapa blanda (Edición impresa)</span>
                    <span className="text-xs text-stone-500 font-normal ml-auto">Envío a domicilio</span>
                  </div>
                  <div>
                    {links.paperback ? (
                      <a
                        href={links.paperback}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-between px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold shadow-2xs transition-colors"
                      >
                        <span>Comprar Tapa Blanda en Amazon</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <button disabled className="w-full px-4 py-2.5 bg-stone-200 text-stone-400 rounded-lg text-xs font-medium cursor-not-allowed">
                        Tapa Blanda (Próximamente)
                      </button>
                    )}
                  </div>
                </div>

                {/* 3. Formato: Audiolibro */}
                <div className="border border-stone-200/90 rounded-xl p-4 bg-stone-50/50 hover:bg-stone-50 transition-colors">
                  <div className="flex items-center gap-2 mb-3">
                    <Headphones className="w-4 h-4 text-purple-700" />
                    <span className="text-sm font-bold text-stone-900">Audiolibro narrado</span>
                    <span className="text-xs text-stone-500 font-normal ml-auto">Escucha en cualquier lugar</span>
                  </div>
                  <div>
                    {links.audible ? (
                      <a
                        href={links.audible}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-between px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-950 rounded-lg text-xs font-bold shadow-2xs transition-colors"
                      >
                        <span>Escuchar en Audible</span>
                        <ExternalLink className="w-3.5 h-3.5 text-stone-900" />
                      </a>
                    ) : (
                      <div className="text-xs text-stone-500 italic py-1">
                        Edición audiolibro en producción actualmente. Disponible pronto en Audible.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Complete Synopsis */}
            <div className="prose prose-stone max-w-none text-stone-700 font-sans">
              <h3 className="font-serif text-2xl font-bold text-stone-900 mb-3">
                Sinopsis y descripción completa
              </h3>
              {book.fullDescription.map((paragraph, index) => (
                <p key={index} className="text-sm sm:text-base leading-relaxed mb-4 text-stone-600">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Key Highlights / Lo que aprenderás */}
            {book.highlights && book.highlights.length > 0 && (
              <div className="mt-8 pt-6 border-t border-stone-200">
                <h3 className="font-serif text-xl font-bold text-stone-900 mb-3">
                  Puntos destacados de esta obra
                </h3>
                <ul className="space-y-2.5">
                  {book.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-stone-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technical Sheet */}
            <div className="mt-8 pt-6 border-t border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-stone-400 block mb-0.5">Páginas</span>
                <span className="font-semibold text-stone-800">{book.pages}</span>
              </div>
              <div>
                <span className="text-stone-400 block mb-0.5">Idioma</span>
                <span className="font-semibold text-stone-800">{book.language}</span>
              </div>
              <div>
                <span className="text-stone-400 block mb-0.5">ISBN</span>
                <span className="font-mono text-stone-800 text-[11px]">{book.isbn}</span>
              </div>
              <div>
                <span className="text-stone-400 block mb-0.5">Editorial</span>
                <span className="font-semibold text-stone-800">Victoria Maciass</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section: 'Otros libros de esta categoría' (Explicit Requirement) */}
        {relatedBooks.length > 0 && (
          <div className="mt-20 pt-12 border-t border-stone-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider block mb-1">
                  Recomendados para ti
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  Otros libros en {book.categoryLabel}
                </h3>
              </div>
              <button
                onClick={onBack}
                className="text-xs font-semibold text-stone-700 hover:text-stone-950 flex items-center gap-1 cursor-pointer"
              >
                <span>Ver todo el catálogo</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedBooks.map((relBook) => (
                <div
                  key={relBook.id}
                  onClick={() => onSelectBook(relBook)}
                  className="group bg-white border border-stone-200 rounded-xl p-4 flex flex-col justify-between hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  <div>
                    <div className="aspect-[3/4] w-full flex items-center justify-center bg-stone-50 rounded-lg p-3 mb-3 border border-stone-100">
                      <BookCover book={relBook} size="sm" className="w-[85%]" />
                    </div>
                    <div className="text-[11px] text-stone-400 mb-1">
                      {relBook.pages} págs · {relBook.year}
                    </div>
                    <h4 className="font-serif text-base font-bold text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-2">
                      {relBook.title}
                    </h4>
                    <p className="text-xs text-stone-500 line-clamp-2 mt-1">
                      {relBook.subtitle}
                    </p>
                  </div>
                  <div className="mt-4 pt-2 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-stone-900">
                    <span>Ver detalles</span>
                    <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
