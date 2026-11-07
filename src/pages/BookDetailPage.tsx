import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBookBySlug, BOOKS_DATA } from '../data/booksData';
import { getCategoryByInternalId, getCategoryBySlug } from '../data/categoriesData';
import { GlobalNavbar } from '../components/GlobalNavbar';
import { Book, BookPurchaseLinks } from '../types/book';
import { ArrowLeft, Edit3, Check, X, ExternalLink, ChevronRight } from 'lucide-react';

// =============================================================================
// PLACEHOLDERS DE IMAGEN CUADRADA CON BORDES REDONDEADOS (Estilo Books2Read)
// =============================================================================

// Logos oficiales de plataformas de venta (128x128 píxeles oficiales)
const LOGO_AMAZON_PAPERBACK = 'https://ik.imagekit.io/hr20qlpupi/victoria/tapa_blanda.jpg';
const LOGO_AMAZON_HARDCOVER = 'https://ik.imagekit.io/hr20qlpupi/victoria/tapa_dura.jpg';
const LOGO_AMAZON_KINDLE = 'https://ik.imagekit.io/hr20qlpupi/victoria/kindle.jpg';
const LOGO_GOOGLE_PLAY_EBOOK = 'https://ik.imagekit.io/hr20qlpupi/victoria/google_play_ebook.jpg';
const LOGO_GOOGLE_PLAY_AUDIO = 'https://ik.imagekit.io/hr20qlpupi/victoria/google_play_audiolibro.jpg';
const LOGO_GOOGLE_PLAY_BOOK = 'https://ik.imagekit.io/hr20qlpupi/victoria/google_play_book.png';
const LOGO_APPLE_BOOKS = 'https://ik.imagekit.io/hr20qlpupi/victoria/apple.png';

// Fallbacks de plataformas complementarias
const LOGO_AUDIBLE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'%3E%3Crect width='100' height='100' rx='20' fill='%23F8991D'/%3E%3Cpath d='M32 52 C32 40 40 32 50 32 C60 32 68 40 68 52' fill='none' stroke='%23FFFFFF' stroke-width='5' stroke-linecap='round'/%3E%3Crect x='28' y='50' width='8' height='16' rx='4' fill='%23FFFFFF'/%3E%3Crect x='64' y='50' width='8' height='16' rx='4' fill='%23FFFFFF'/%3E%3Ctext x='50' y='82' font-family='system-ui, -apple-system, sans-serif' font-size='9' font-weight='800' fill='%23FFFFFF' text-anchor='middle'%3EAudible%3C/text%3E%3C/svg%3E";

const LOGO_KOBO =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'%3E%3Crect width='100' height='100' rx='20' fill='%23BF0000'/%3E%3Ctext x='50' y='57' font-family='system-ui, -apple-system, sans-serif' font-size='24' font-weight='900' fill='%23FFFFFF' text-anchor='middle' letter-spacing='-1'%3Ekobo%3C/text%3E%3Ctext x='50' y='76' font-family='system-ui, -apple-system, sans-serif' font-size='8' font-weight='600' fill='%23FFCCCC' text-anchor='middle'%3ERakuten%3C/text%3E%3C/svg%3E";

const LOGO_BARNES_NOBLE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'%3E%3Crect width='100' height='100' rx='20' fill='%230B4228'/%3E%3Ctext x='50' y='46' font-family='Georgia, serif' font-size='20' font-weight='bold' fill='%23FFFFFF' text-anchor='middle'%3EB%26N%3C/text%3E%3Crect x='30' y='55' width='40' height='16' rx='8' fill='%2300A389'/%3E%3Ctext x='50' y='67' font-family='system-ui, -apple-system, sans-serif' font-size='10' font-weight='800' fill='%23FFFFFF' text-anchor='middle'%3Enook%3C/text%3E%3C/svg%3E";

const LOGO_SMASHWORDS =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'%3E%3Crect width='100' height='100' rx='20' fill='%2300738C'/%3E%3Ccircle cx='50' cy='44' r='20' fill='none' stroke='%23FFFFFF' stroke-width='4' stroke-dasharray='10 5'/%3E%3Ctext x='50' y='50' font-family='Georgia, serif' font-size='16' font-weight='bold' fill='%23FFFFFF' text-anchor='middle'%3ESW%3C/text%3E%3Ctext x='50' y='78' font-family='system-ui, -apple-system, sans-serif' font-size='8' font-weight='700' fill='%23E0F7FA' text-anchor='middle'%3ESmashwords%3C/text%3E%3C/svg%3E";

const LOGO_HEART_FAVORITE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'%3E%3Crect width='100' height='100' rx='20' fill='%23FFF1F2' stroke='%23FECDD3' stroke-width='2'/%3E%3Cpath d='M50 68 C50 68 28 52 28 38 C28 29 35 24 42 24 C46 24 49 26 50 28 C51 26 54 24 58 24 C65 24 72 29 72 38 C72 52 50 68 50 68 Z' fill='%23E11D48'/%3E%3C/svg%3E";

const LOGO_UNIVERSAL_LINK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'%3E%3Crect width='100' height='100' rx='20' fill='%23F1F5F9' stroke='%23CBD5E1' stroke-width='2'/%3E%3Cpath d='M44 38 L36 46 C32 50 32 56 36 60 C40 64 46 64 50 60 L54 56 M56 62 L64 54 C68 50 68 44 64 40 C60 36 54 36 50 40 L46 44' fill='none' stroke='%23334155' stroke-width='5' stroke-linecap='round'/%3E%3Cline x1='43' y1='57' x2='57' y2='43' stroke='%23334155' stroke-width='5' stroke-linecap='round'/%3E%3C/svg%3E";

// =============================================================================
// ESPECIFICACIONES COMERCIALES OBLIGATORIAS: ORDEN DE PRESENTACIÓN Y METADATOS
// =============================================================================

export interface PlatformItem {
  id: string;
  order: number;
  tooltip: string;
  alt: string;
  logo: string;
  key: string;
}

export const ORDERED_COMMERCIAL_PLATFORMS: PlatformItem[] = [
  // 1. Amazon Tapa Blanda
  {
    id: 'amz-paperback',
    order: 1,
    tooltip: 'Amazon Tapa Blanda',
    alt: 'Amazon Tapa Blanda',
    logo: LOGO_AMAZON_PAPERBACK,
    key: 'paperbackAmazon',
  },
  // 2. Amazon Tapa Dura
  {
    id: 'amz-hardcover',
    order: 2,
    tooltip: 'Amazon Tapa Dura',
    alt: 'Amazon Tapa Dura',
    logo: LOGO_AMAZON_HARDCOVER,
    key: 'hardcoverAmazon',
  },
  // 3. Amazon Kindle / Ebook
  {
    id: 'amz-kindle',
    order: 3,
    tooltip: 'amazon Ebook',
    alt: 'amazon Ebook',
    logo: LOGO_AMAZON_KINDLE,
    key: 'ebookAmazon',
  },
  // 4. Google Play Libro Electrónico
  {
    id: 'gp-ebook',
    order: 4,
    tooltip: 'google Ebook',
    alt: 'google Ebook',
    logo: LOGO_GOOGLE_PLAY_EBOOK,
    key: 'ebookGooglePlay',
  },
  // 5. Google Play Audiolibro
  {
    id: 'gp-audio',
    order: 5,
    tooltip: 'google Audiolibro',
    alt: 'google Audiolibro',
    logo: LOGO_GOOGLE_PLAY_AUDIO,
    key: 'audiobookGooglePlay',
  },
  // 6. Resto de plataformas disponibles
  {
    id: 'gp-books',
    order: 6,
    tooltip: 'Google Play Books',
    alt: 'Google Play Books',
    logo: LOGO_GOOGLE_PLAY_BOOK,
    key: 'googlePlay',
  },
  {
    id: 'apple-books',
    order: 7,
    tooltip: 'Apple Books',
    alt: 'Apple Books',
    logo: LOGO_APPLE_BOOKS,
    key: 'ebookApple',
  },
  {
    id: 'audible',
    order: 8,
    tooltip: 'Amazon Audiolibro (Libro Narrado)',
    alt: 'Audible / Amazon Audiolibro',
    logo: LOGO_AUDIBLE,
    key: 'audiobookAmazon',
  },
  {
    id: 'kobo',
    order: 9,
    tooltip: 'Kobo',
    alt: 'Kobo',
    logo: LOGO_KOBO,
    key: 'ebookKobo',
  },
  {
    id: 'nook',
    order: 10,
    tooltip: 'Nook',
    alt: 'Barnes & Noble Nook',
    logo: LOGO_BARNES_NOBLE,
    key: 'ebookBarnesNoble',
  },
  {
    id: 'smashwords',
    order: 11,
    tooltip: 'Smashwords',
    alt: 'Smashwords',
    logo: LOGO_SMASHWORDS,
    key: 'ebookSmashwords',
  },
];

export const BookDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const book = slug ? getBookBySlug(slug) : undefined;

  // Enlaces editables guardados en localStorage
  const [links, setLinks] = useState<Record<string, string>>({});
  const [isEditingLinks, setIsEditingLinks] = useState(false);
  const [draftLinks, setDraftLinks] = useState<Record<string, string>>({});
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Favoritos
  const [isFavorite, setIsFavorite] = useState(false);

  // Descripción editable
  const [customDescription, setCustomDescription] = useState<string>('');
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [draftDescription, setDraftDescription] = useState<string>('');

  // SEO dinámico y carga de datos
  useEffect(() => {
    if (book) {
      window.scrollTo(0, 0);

      // Cargar enlaces
      const defaultLinks = (book.purchaseLinks || book.enlaces || {}) as Record<string, string>;
      const active: Record<string, string> = { ...defaultLinks };

      const saved = localStorage.getItem(`b2r_links_${book.slug}`);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          Object.assign(active, parsed);
        } catch {
          // ignore
        }
      }
      setLinks(active);
      setDraftLinks(active);

      // Cargar favoritos
      const fav = localStorage.getItem(`b2r_fav_${book.slug}`);
      setIsFavorite(fav === 'true');

      // Cargar descripción personalizada
      const savedDesc = localStorage.getItem(`custom_desc_${book.slug}`);
      if (savedDesc) {
        setCustomDescription(savedDesc);
        setDraftDescription(savedDesc);
      } else {
        setCustomDescription('');
        setDraftDescription('');
      }

      // SEO dinámico
      document.title = `${book.title} — Victoria Maciass`;

      const rawDescription =
        (book.fullDescription && book.fullDescription.length > 0)
          ? book.fullDescription.join(' ')
          : (book.descripcion && book.descripcion.length > 0)
            ? book.descripcion.join(' ')
            : book.synopsis || '';

      const firstWords = rawDescription.slice(0, 155) || `Guía práctica de ${book.title} por Victoria Maciass.`;

      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', firstWords);
      }
      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute('content', firstWords);
      }
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', `${book.title} — Victoria Maciass`);
      }
    }
  }, [book?.slug]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Guardar enlaces
  const handleSaveLinks = (e: React.FormEvent) => {
    e.preventDefault();
    setLinks(draftLinks);
    if (book) {
      localStorage.setItem(`b2r_links_${book.slug}`, JSON.stringify(draftLinks));
    }
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setIsEditingLinks(false);
      showToast('¡Enlaces actualizados correctamente!');
    }, 900);
  };

  // Guardar descripción personalizada
  const handleSaveDescription = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomDescription(draftDescription);
    if (book) {
      localStorage.setItem(`custom_desc_${book.slug}`, draftDescription);
    }
    setIsEditingDescription(false);
    showToast('Descripción guardada.');
  };


  // Toggle Favoritos
  const handleToggleFavorite = () => {
    if (!book) return;
    const newState = !isFavorite;
    setIsFavorite(newState);
    localStorage.setItem(`b2r_fav_${book.slug}`, String(newState));
    showToast(newState ? '¡Libro guardado en tus favoritos!' : 'Eliminado de tus favoritos.');
  };

  // Copiar Universal Link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('¡Enlace universal copiado al portapapeles!');
  };

  if (!book) {
    return (
      <div className="min-h-screen bg-[#fbfbf9] flex flex-col justify-between text-stone-900 font-sans">
        <GlobalNavbar />

        <main className="max-w-xl mx-auto px-6 py-24 text-center">
          <h1 className="font-serif text-3xl font-bold text-stone-900 mb-3">
            Libro no encontrado
          </h1>
          <p className="text-stone-600 text-sm mb-6 leading-relaxed">
            La ruta <code>/{slug}</code> no corresponde a ningún libro registrado en el catálogo central.
          </p>
          <Link
            to="/victoriamaciass"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a todos los libros</span>
          </Link>
        </main>

        <footer className="border-t border-stone-200 py-6 text-center text-xs text-stone-500">
          <p>
            Victoria Maciass ·{' '}
            <Link to="/victoriamaciass" className="underline hover:text-stone-900">
              Ir a la página de inicio
            </Link>
          </p>
        </footer>
      </div>
    );
  }

  // Párrafos de la descripción completa
  const resolvedParagraphs: string[] = (() => {
    if (customDescription.trim()) {
      return customDescription.split('\n\n').filter(Boolean);
    }
    if (book.fullDescription && book.fullDescription.length > 0) {
      return book.fullDescription;
    }
    if (book.descripcion && book.descripcion.length > 0) {
      return book.descripcion;
    }
    if (book.synopsis && book.synopsis.trim()) {
      return [book.synopsis];
    }
    return [];
  })();

  // Libros relacionados de la misma categoría (3 tarjetas placeholder)
  const relatedBooks = BOOKS_DATA
    .filter((b) => b.slug !== book.slug && (b.category === book.category || b.categoria === book.category))
    .slice(0, 3);

  const finalRelated = [...relatedBooks];
  if (finalRelated.length < 3) {
    const others = BOOKS_DATA.filter(
      (b) => b.slug !== book.slug && !finalRelated.some((r) => r.slug === b.slug)
    ).slice(0, 3 - finalRelated.length);
    finalRelated.push(...others);
  }

  const coverUrl = book.coverImage || book.portada;

  const categoryInfo = getCategoryByInternalId(book.category) || getCategoryBySlug(book.category);
  const categoryTitle = categoryInfo ? categoryInfo.title : book.categoryLabel;
  const categoryRoute = categoryInfo ? categoryInfo.route : '/cuerpo-salud';

  // Helper para resolver la URL comercial válida y no vacía
  const getPlatformUrl = (key: string): string => {
    const rawLinks = {
      ...(book.purchaseLinks || {}),
      ...(book.enlaces || {}),
      ...links,
    } as Record<string, string>;

    const check = (k: string) => {
      const val = rawLinks[k];
      return val && typeof val === 'string' && val.trim().length > 0 ? val.trim() : '';
    };

    switch (key) {
      case 'paperbackAmazon':
        return check('paperbackAmazon') || check('paperback') || '';
      case 'hardcoverAmazon':
        return check('hardcoverAmazon') || check('hardcover') || '';
      case 'ebookAmazon':
        return check('ebookAmazon') || check('kindle') || check('amazon') || '';
      case 'ebookGooglePlay':
        return check('ebookGooglePlay') || check('googlePlayEbook') || '';
      case 'audiobookGooglePlay':
        return check('audiobookGooglePlay') || check('googlePlayAudio') || '';
      case 'googlePlay': {
        const gp = check('googlePlay');
        const ep = check('ebookGooglePlay');
        return gp && gp !== ep ? gp : '';
      }
      case 'ebookApple':
        return check('ebookApple') || check('appleBooks') || check('apple') || '';
      case 'audiobookAmazon':
        return check('audiobookAmazon') || check('audible') || check('audiobook') || '';
      case 'ebookKobo':
        return check('ebookKobo') || check('kobo') || '';
      case 'ebookBarnesNoble':
        return check('ebookBarnesNoble') || check('nook') || check('barnesNoble') || '';
      case 'ebookSmashwords':
        return check('ebookSmashwords') || check('smashwords') || '';
      default:
        return check(key);
    }
  };

  // Plataformas comerciales activas en orden obligatorio
  interface ActivePlatformItem extends PlatformItem {
    url: string;
  }

  const activeCommercialPlatforms: ActivePlatformItem[] = ORDERED_COMMERCIAL_PLATFORMS
    .map((item) => ({
      ...item,
      url: getPlatformUrl(item.key),
    }))
    .filter((item) => item.url.length > 0)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-[#fbfbf9] text-stone-900 font-sans selection:bg-stone-200">
      
      {/* Toast flotante */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white text-xs sm:text-sm font-medium px-4 py-3 rounded-lg shadow-lg flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Barra de Navegación Global (Header) */}
      <GlobalNavbar />

      {/* 2. Enlace de retorno y migas de pan (Breadcrumbs) */}
      <div className="border-b border-stone-200/70 bg-[#fbfbf9]/90 py-3">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-x-auto whitespace-nowrap">
            <Link
              to="/victoriamaciass"
              className="text-xs text-stone-600 hover:text-stone-950 inline-flex items-center gap-1.5 transition-colors font-sans mr-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver a todos los libros</span>
            </Link>
            <span className="text-stone-300">|</span>
            <nav aria-label="Migas de pan" className="flex items-center gap-2 text-xs text-stone-500">
              <Link to="/" className="hover:text-stone-900 transition-colors">
                Inicio
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <Link to={categoryRoute} className="hover:text-stone-900 transition-colors">
                {categoryTitle}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span className="text-stone-900 font-semibold truncate">{book.title}</span>
            </nav>
          </div>

          <button
            onClick={() => setIsEditingLinks(!isEditingLinks)}
            className="text-[11px] font-semibold text-stone-600 hover:text-stone-950 inline-flex items-center gap-1 cursor-pointer transition-colors shrink-0"
            title="Configurar los enlaces de compra"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Editar enlaces</span>
          </button>
        </div>
      </div>

      {/* Panel desplegable de edición de enlaces */}
      {isEditingLinks && (
        <div className="bg-stone-50 border-b border-stone-300 p-6 sm:p-8">
          <div className="max-w-4xl mx-auto bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-5">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Configurar enlaces para "{book.title}"
                </h3>
                <p className="text-xs text-stone-500">
                  Pega las URLs de destino para cada plataforma. Los enlaces se guardan localmente para este título.
                </p>
              </div>
              <button
                onClick={() => setIsEditingLinks(false)}
                className="text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
                aria-label="Cerrar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveLinks} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {ORDERED_COMMERCIAL_PLATFORMS.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-stone-50 border border-stone-200">
                    <img
                      src={item.logo}
                      alt={item.alt}
                      className="w-10 h-10 rounded-md shrink-0 object-contain bg-white border border-stone-200"
                    />
                    <div className="flex-1 min-w-0">
                      <label className="block text-[11px] font-semibold text-stone-700 truncate mb-0.5">
                        {item.order}. {item.tooltip}
                      </label>
                      <input
                        type="url"
                        placeholder="https://..."
                        value={draftLinks[item.key] || ''}
                        onChange={(e) =>
                          setDraftLinks({
                            ...draftLinks,
                            [item.key]: e.target.value,
                          })
                        }
                        className="w-full px-2.5 py-1 text-xs bg-white border border-stone-300 rounded focus:bg-white focus:outline-none focus:border-stone-900 font-mono"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
                {saveSuccess && (
                  <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>¡Guardado con éxito!</span>
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setIsEditingLinks(false)}
                  className="px-3.5 py-1.5 text-xs text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors shadow-2xs cursor-pointer"
                >
                  Guardar enlaces
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ====================================================================
          ESTRUCTURA VISUAL SUPERIOR (Zona de escaparate)
          - Fondo suave (gradiente sutil de blanco a beige/gris claro)
          - A la izquierda: Portada grande y destacada, con sombra suave (box-shadow).
            SOLO la imagen, sin ningún texto, título ni subtítulo superpuesto o al lado.
          - A la derecha: Texto "Disponible en:" y la cuadrícula de logos de plataformas.
            REGLA DE ORO: Los logos NO tienen texto visible debajo ni al lado.
            Solo la imagen cuadrada con bordes redondeados y tooltip en hover.
          ==================================================================== */}
      <section className="bg-gradient-to-b from-white via-[#faf9f5] to-[#f2efea] border-b border-stone-200/90 py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* --------------------------------------------------------------
                A LA IZQUIERDA: Portada del libro, grande y destacada
                Sombra suave (box-shadow). Elemento dominante.
                SOLO la imagen de la portada, sin texto superpuesto ni al lado.
                -------------------------------------------------------------- */}
            <div className="lg:col-span-5 w-full flex justify-center">
              <div className="w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px]">
                {coverUrl ? (
                  <div
                    className="w-full aspect-[2/3] rounded-xl overflow-hidden bg-white select-none transition-transform duration-300 hover:scale-[1.01]"
                    style={{
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.28), 0 10px 20px -8px rgba(0, 0, 0, 0.16)',
                    }}
                  >
                    <img
                      src={coverUrl}
                      alt={book.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain block"
                    />
                  </div>
                ) : (
                  <div
                    className="w-full aspect-[2/3] bg-stone-100 border border-stone-300 rounded-xl flex items-center justify-center select-none"
                    style={{
                      boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.22)',
                    }}
                    role="img"
                    aria-label={book.title}
                  >
                    <span className="text-xs uppercase tracking-widest font-mono text-stone-400">
                      [ Portada 2:3 ]
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* --------------------------------------------------------------
                A LA DERECHA DE LA PORTADA:
                1. Texto breve superior: "Disponible en:"
                2. Cuadrícula de logos de plataformas organizada por grupos.
                   - CERO texto visible debajo, encima o al lado de los iconos.
                   - Solo iconos cuadrados con bordes redondeados y tooltip en hover.
                   - Renderizado dinámico y condicional: Solo logos con URL válida.
                   - Enlaces externos con target="_blank" y rel="nofollow noopener noreferrer".
                   - Sin encabezados visibles de grupos, organizados visualmente.
                -------------------------------------------------------------- */}
            <div className="lg:col-span-7 w-full flex flex-col justify-center">
              
              {/* Texto breve en la parte superior: "Disponible en:" */}
              <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-stone-700 mb-6 font-mono">
                Disponible en:
              </p>

              <div className="space-y-6">
                
                {/* Cuadrícula de plataformas de venta en orden comercial obligatorio:
                    1. Amazon Tapa Blanda
                    2. Amazon Tapa Dura
                    3. amazon Ebook
                    4. google Ebook
                    5. google Audiolibro
                    6. Resto de plataformas disponibles
                    - Tamaño visual objetivo: 128x128 píxeles
                    - En móvil: cuadrícula de 2 columnas (grid grid-cols-2)
                    - Sin nombres ni textos visibles debajo ni al lado
                    - Enlaces externos con target="_blank" y rel="nofollow noopener noreferrer"
                    - Tooltip interactivo en hover
                */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap gap-4 sm:gap-5 justify-items-center sm:justify-items-start">
                  {activeCommercialPlatforms.map((item) => (
                    <div key={item.id} className="relative group flex justify-center">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        title={item.tooltip}
                        aria-label={item.tooltip}
                        className="w-[128px] h-[128px] rounded-xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-stone-900 transition-all duration-200 hover:scale-[1.02] flex items-center justify-center p-0 overflow-hidden focus:outline-none focus:ring-2 focus:ring-stone-900 shrink-0"
                      >
                        <img
                          src={item.logo}
                          alt={item.alt}
                          width={128}
                          height={128}
                          className="w-full h-full object-contain block pointer-events-none rounded-xl"
                          loading="eager"
                          decoding="async"
                        />
                      </a>

                      {/* Tooltip emergente en hover sin texto permanente visible */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-stone-900 text-white text-[11px] font-medium rounded-md shadow-md whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 pointer-events-none z-40">
                        {item.tooltip}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-stone-900" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mensaje si el libro aún no tiene enlaces comerciales cargados */}
                {activeCommercialPlatforms.length === 0 && (
                  <p className="text-xs text-stone-500 italic font-serif py-1">
                    Próximamente disponible en las principales plataformas comerciales.
                  </p>
                )}

                {/* Acciones especiales: Guardar en favoritos y Copiar enlace universal */}
                <div className="pt-3 border-t border-stone-200/60 flex items-center gap-3.5">
                  {/* Logo cuadrado con un corazón -> Tooltip: "Guardar en favoritos" */}
                  <div className="relative group flex justify-center">
                    <button
                      type="button"
                      onClick={handleToggleFavorite}
                      title="Guardar en favoritos"
                      aria-label="Guardar en favoritos"
                      className={`w-12 h-12 rounded-xl border shadow-2xs hover:shadow-md hover:scale-105 transition-all duration-200 cursor-pointer p-0 overflow-hidden flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-stone-900 ${
                        isFavorite
                          ? 'bg-rose-50 border-rose-300 ring-1 ring-rose-300'
                          : 'bg-white border-stone-200/90 hover:border-stone-900'
                      }`}
                    >
                      <img
                        src={LOGO_HEART_FAVORITE}
                        alt="Guardar en favoritos"
                        className="w-full h-full object-contain block pointer-events-none"
                      />
                    </button>

                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-stone-900 text-white text-[11px] font-medium rounded-md shadow-md whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 pointer-events-none z-40">
                      Guardar en favoritos
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-stone-900" />
                    </div>
                  </div>

                  {/* Logo cuadrado con icono de Universal Link -> Tooltip: "Copiar enlace universal" */}
                  <div className="relative group flex justify-center">
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      title="Copiar enlace universal"
                      aria-label="Copiar enlace universal"
                      className="w-12 h-12 rounded-xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-stone-900 hover:scale-105 transition-all duration-200 cursor-pointer p-0 overflow-hidden flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-stone-900"
                    >
                      <img
                        src={LOGO_UNIVERSAL_LINK}
                        alt="Copiar enlace universal"
                        className="w-full h-full object-contain block pointer-events-none"
                      />
                    </button>

                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-stone-900 text-white text-[11px] font-medium rounded-md shadow-md whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 pointer-events-none z-40">
                      Copiar enlace universal
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-stone-900" />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECCIÓN INFERIOR (Textos y detalles):
          Justo debajo del bloque de la portada y los logos, a ancho completo:
          1. Título del libro (h1, grande)
          2. Subtítulo (tipografía menor)
          3. Autora: "Victoria Maciass"
          4. Descripción completa: texto del campo descripcion sin truncar
          ==================================================================== */}
      <section className="py-14 sm:py-20 max-w-4xl mx-auto px-6 border-b border-stone-200/80">
        
        {/* 1. Título del libro (h1, grande) */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.08]">
          {book.title}
        </h1>

        {/* 2. Subtítulo (tipografía menor) */}
        {book.subtitle && (
          <p className="mt-4 text-lg sm:text-2xl text-stone-700 font-serif italic leading-relaxed">
            {book.subtitle}
          </p>
        )}

        {/* 3. Autora: "Victoria Maciass" */}
        <div className="mt-4 pb-8 border-b border-stone-200/80">
          <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-stone-500 font-sans">
            Autora: <span className="text-stone-900 font-bold">Victoria Maciass</span>
          </p>
        </div>

        {/* 4. Descripción completa */}
        <div className="pt-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Descripción completa
            </h2>
            <button
              onClick={() => {
                setDraftDescription(resolvedParagraphs.join('\n\n'));
                setIsEditingDescription(!isEditingDescription);
              }}
              className="text-xs text-stone-500 hover:text-stone-900 inline-flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditingDescription ? 'Cerrar editor' : 'Editar texto'}</span>
            </button>
          </div>

          {/* Formulario de edición de descripción */}
          {isEditingDescription ? (
            <form onSubmit={handleSaveDescription} className="space-y-4">
              <textarea
                rows={12}
                value={draftDescription}
                onChange={(e) => setDraftDescription(e.target.value)}
                placeholder="Escribe la descripción completa en párrafos separados por doble salto..."
                className="w-full p-4 text-xs sm:text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-stone-900 font-sans leading-relaxed"
              />
              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditingDescription(false)}
                  className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-colors cursor-pointer"
                >
                  Guardar descripción
                </button>
              </div>
            </form>
          ) : resolvedParagraphs.length > 0 ? (
            /* Texto del campo descripcion sin truncar, con párrafos separados y legibles */
            <div className="space-y-6 text-sm sm:text-base text-stone-700 leading-relaxed font-sans">
              {resolvedParagraphs.map((parr, idx) => (
                <p key={idx} className="leading-relaxed">
                  {parr}
                </p>
              ))}
            </div>
          ) : (
            <div className="p-8 bg-stone-50 border border-dashed border-stone-300 rounded-xl text-center">
              <p className="text-sm font-serif italic text-stone-600 mb-2">
                [ Descripción completa en preparación para este título ]
              </p>
              <p className="text-xs text-stone-500 max-w-md mx-auto">
                Esta sección mostrará el texto completo del libro con sus capítulos, temas abordados y pautas prácticas sin truncar.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ====================================================================
          LIBROS RELACIONADOS:
          Debajo de la descripción, título "Otros libros de esta categoría"
          con 3 tarjetas placeholder (portada pequeña + título + botón "Ver libro")
          ==================================================================== */}
      <section className="py-14 sm:py-20 max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-stone-500 block mb-1 font-mono">
              Recomendaciones
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Otros libros de esta categoría
            </h2>
          </div>
          <Link
            to="/victoriamaciass"
            className="text-xs sm:text-sm font-medium text-stone-600 hover:text-stone-950 transition-colors"
          >
            Ver biblioteca completa →
          </Link>
        </div>

        {/* 3 tarjetas placeholder */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {finalRelated.map((relBook) => (
            <div
              key={relBook.slug}
              className="bg-white border border-stone-200/90 rounded-2xl p-5 flex flex-col justify-between shadow-2xs hover:border-stone-300 transition-colors text-left"
            >
              <div>
                {/* Portada pequeña de marcador de posición (2:3) */}
                <div
                  className="aspect-[2/3] w-full max-w-[140px] mx-auto bg-stone-100 border border-stone-200 rounded-lg p-3 mb-4 flex flex-col justify-between text-center select-none shadow-2xs"
                  role="img"
                  aria-label={relBook.title}
                >
                  <span className="text-[8px] uppercase tracking-wider text-stone-400 font-mono">
                    Victoria Maciass
                  </span>
                  <span className="font-serif text-xs font-bold text-stone-700 line-clamp-3 my-auto">
                    {relBook.title}
                  </span>
                  <span className="text-[8px] uppercase tracking-wider text-stone-400 font-mono">
                    [ Portada 2:3 ]
                  </span>
                </div>

                {/* Título */}
                <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 line-clamp-2">
                  {relBook.title}
                </h3>
                {relBook.subtitle && (
                  <p className="text-xs text-stone-500 line-clamp-2 mt-1">
                    {relBook.subtitle}
                  </p>
                )}
              </div>

              {/* Botón "Ver libro" */}
              <div className="mt-5 pt-3 border-t border-stone-100">
                <Link
                  to={`/${relBook.slug}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-stone-900 hover:text-white bg-stone-100 hover:bg-stone-900 rounded-lg transition-colors text-center"
                >
                  <span>Ver libro</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================================
          PIE DE PÁGINA SENCILLO
          ==================================================================== */}
      <footer className="border-t border-stone-200 py-10 bg-white">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p className="font-serif text-sm font-bold text-stone-800">
            Victoria Maciass
          </p>
          <p>
            <Link to="/victoriamaciass" className="hover:text-stone-900 underline transition-colors">
              Ir a la página de inicio (/victoriamaciass)
            </Link>
          </p>
          <p className="text-[11px]">
            © {new Date().getFullYear()} Victoria Maciass. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};
