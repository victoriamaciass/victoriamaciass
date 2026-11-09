import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Utensils, Salad, ChefHat, Sparkles } from 'lucide-react';
import { CategoryInfo, CATEGORIES_LIST } from '../data/categoriesData';
import { GlobalNavbar } from './GlobalNavbar';

interface CocinaCategoryViewProps {
  categoryInfo: CategoryInfo;
}

interface CookingBookItem {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  collection: 'saludable' | 'mediterranea' | 'variadas';
  coverUrl: string;
  altText: string;
}

const COOKING_BOOKS: CookingBookItem[] = [
  // --- COLECCIÓN 1: Cocina Saludable (6 libros) ---
  {
    slug: 'ensaladas-sabores',
    title: 'Recetas De Ensaladas Con Sabores Deliciosos',
    subtitle: 'Texturas frescas, aderezos ligeros y combinaciones llenas de sabor.',
    description: 'Una selección de ensaladas completas y nutritivas con ingredientes frescos y vinagretas caseras.',
    collection: 'saludable',
    coverUrl: 'https://ik.imagekit.io/hr20qlpupi/victoria/1-ensaladas-recetas-libro-600.jpg',
    altText: 'Portada del libro Recetas De Ensaladas Con Sabores Deliciosos de Victoria Maciass',
  },
  {
    slug: 'ensaladas-150',
    title: '+150 Recetas de Ensaladas Refrescantes y Deliciosas',
    subtitle: 'Más de 150 ideas para transformar tus ensaladas diarias.',
    description: 'Un recetario amplio y versátil con opciones vegetarianas, con proteínas y aderezos especiales.',
    collection: 'saludable',
    coverUrl: 'https://ik.imagekit.io/hr20qlpupi/victoria/2-ensaladas-recetas-libro-600.jpg',
    altText: 'Portada del libro +150 Recetas de Ensaladas Refrescantes y Deliciosas de Victoria Maciass',
  },
  {
    slug: 'recetas-bajar-peso',
    title: 'Recetas para bajar de peso',
    subtitle: 'Platos equilibrados, saciantes y con ingredientes reales.',
    description: 'Propuestas gastronómicas ligeras pensadas para cuidar la alimentación diaria sin renunciar al sabor.',
    collection: 'saludable',
    coverUrl: 'https://ik.imagekit.io/hr20qlpupi/victoria/5-recetas-bajar-de-peso-libro-600.jpg',
    altText: 'Portada del libro Recetas para bajar de peso de Victoria Maciass',
  },
  {
    slug: 'recetas-fitness',
    title: 'Recetas Fitness',
    subtitle: 'Comidas ricas en proteínas, energía y vitalidad para el día a día.',
    description: 'Recetas prácticas y balanceadas pensadas para quienes buscan rendimiento físico y bienestar activo.',
    collection: 'saludable',
    coverUrl: 'https://ik.imagekit.io/hr20qlpupi/victoria/12-fitness-dieta-libro-600.jpg',
    altText: 'Portada del libro Recetas Fitness de Victoria Maciass',
  },
  {
    slug: 'recetas-quinoa',
    title: 'Recetas con Quinoa',
    subtitle: 'El superalimento versátil en platos fríos, templados y calientes.',
    description: 'Aprende a cocinar y combinar la quinoa en ensaladas, salteados, guisos ligeros y platos completos.',
    collection: 'saludable',
    coverUrl: 'https://ik.imagekit.io/hr20qlpupi/victoria/13-quinoa-libro-600.jpg',
    altText: 'Portada del libro Recetas con Quinoa de Victoria Maciass',
  },
  {
    slug: 'aderezos',
    title: 'Aderezos para cocinar',
    subtitle: 'Vinagretas, salsas caseras y emulsiones para realzar cualquier plato.',
    description: 'Técnicas sencillas para preparar aderezos artesanales sin conservantes ni aditivos industriales.',
    collection: 'saludable',
    coverUrl: 'https://ik.imagekit.io/hr20qlpupi/victoria/17-aderezos-libro-600.jpg',
    altText: 'Portada del libro Aderezos para cocinar de Victoria Maciass',
  },

  // --- COLECCIÓN 2: Cocina Mediterránea y Española (3 libros) ---
  {
    slug: 'arte-paella',
    title: 'El Arte de la Paella',
    subtitle: 'Secretos, caldos y puntos de cocción de la tradición valenciana.',
    description: 'Guía paso a paso para dominar el sofrito, el socarrat y las paellas clásicas de carne, verdura y marisco.',
    collection: 'mediterranea',
    coverUrl: 'https://ik.imagekit.io/hr20qlpupi/victoria/8-paella-arte-libro-600.jpg',
    altText: 'Portada del libro El Arte de la Paella de Victoria Maciass',
  },
  {
    slug: 'paellas-100',
    title: 'Más de 100 Recetas de Paellas',
    subtitle: 'Un compendio exhaustivo de paellas y arroces españoles.',
    description: 'Variedad de recetas tradicionales y contemporáneas adaptadas a los fogones del hogar.',
    collection: 'mediterranea',
    coverUrl: 'https://ik.imagekit.io/hr20qlpupi/victoria/9-paellas-100-libro-600.jpg',
    altText: 'Portada del libro Más de 100 Recetas de Paellas de Victoria Maciass',
  },
  {
    slug: 'arroces-alma',
    title: 'Arroces con Alma',
    subtitle: 'Arroces caldosos, melosos y al horno de herencia mediterránea.',
    description: 'Platos reconfortantes de cuchara y cazuela para disfrutar de la rica cocina del arroz en familia.',
    collection: 'mediterranea',
    coverUrl: 'https://ik.imagekit.io/hr20qlpupi/victoria/18-arroces-con-alma-libro-600.jpg',
    altText: 'Portada del libro Arroces con Alma de Victoria Maciass',
  },

  // --- COLECCIÓN 3: Recetas Variadas (9 libros) ---
  {
    slug: 'carnes-rojas',
    title: 'Recetas de Carnes Rojas',
    subtitle: 'Guisos lentos, asados al punto y cortes sabrosos.',
    description: 'Técnicas culinarias para preparar ternera, buey y carnes rojas tiernas, jugosas y aromáticas.',
    collection: 'variadas',
    coverUrl: 'https://ik.imagekit.io/hr20qlpupi/victoria/3-recetas-carne-libro-600.jpg',
    altText: 'Portada del libro Recetas de Carnes Rojas de Victoria Maciass',
  },
  {
    slug: 'recetas-pollo',
    title: 'Recetas con Pollo',
    subtitle: 'Platos fáciles, económicos y jugosos para toda la familia.',
    description: 'Ideas variadas para cocinar pollo al horno, en salsa, salteado o marinado con hierbas naturales.',
    collection: 'variadas',
    coverUrl: 'https://ik.imagekit.io/hr20qlpupi/victoria/4-recetas-pollo-libro-600.jpg',
    altText: 'Portada del libro Recetas con Pollo de Victoria Maciass',
  },
  {
    slug: 'sabores-irresistibles',
    title: 'Sabores Irresistibles',
    subtitle: 'Combinaciones culinarias únicas para sorprender en la mesa.',
    description: 'Platos llenos de contrastes aromáticos pensados para celebraciones y cenas especiales.',
    collection: 'variadas',
    coverUrl: 'https://ik.imagekit.io/hr20qlpupi/victoria/6-sabores-irresistibles-libro-600.jpg',
    altText: 'Portada del libro Sabores Irresistibles de Victoria Maciass',
  },
  {
    slug: 'recetas-variadas',
    title: 'Recetas Variadas Deliciosas',
    subtitle: 'Soluciones versátiles para resolver los menús de cada semana.',
    description: 'Una recopilación de platos sencillos con ingredientes accesibles para cocinar sin complicaciones.',
    collection: 'variadas',
    coverUrl: 'https://ik.imagekit.io/hr20qlpupi/victoria/7-recetas-variadas-libro-600.jpg',
    altText: 'Portada del libro Recetas Variadas Deliciosas de Victoria Maciass',
  },
  {
    slug: 'cocina-deliciosa',
    title: 'Recetas de Cocina Deliciosa',
    subtitle: 'Cocina casera con mimo, calidez y productos de temporada.',
    description: 'Propuestas apetecibles para redescubrir el placer de cocinar en casa día a día.',
    collection: 'variadas',
    coverUrl: 'https://ik.imagekit.io/hr20qlpupi/victoria/10-recetas-variadas-deliciosas-libro-600.jpg',
    altText: 'Portada del libro Recetas de Cocina Deliciosa de Victoria Maciass',
  },
  {
    slug: 'cocina-espanol',
    title: 'Libro de Cocina en Español',
    subtitle: 'Técnicas clásicas y recetas maestras de la gastronomía hispana.',
    description: 'Un recorrido accesible por los platos fundamentales que definen nuestra memoria gastronómica.',
    collection: 'variadas',
    coverUrl: 'https://ik.imagekit.io/hr20qlpupi/victoria/11-libro-de-cocina-600.jpg',
    altText: 'Portada del libro Libro de Cocina en Español de Victoria Maciass',
  },
  {
    slug: 'freidora-aire',
    title: 'Recetas Freidora de Aire',
    subtitle: 'Cocina rápida, crujiente y con menos aceite en air fryer.',
    description: 'Tiempos, temperaturas y trucos para sacar el máximo partido a tu freidora de aire.',
    collection: 'variadas',
    coverUrl: 'https://ik.imagekit.io/hr20qlpupi/victoria/14-freidera-recetas-libro-600.jpg',
    altText: 'Portada del libro Recetas Freidora de Aire de Victoria Maciass',
  },
  {
    slug: 'galletas-epicas',
    title: 'Recetas de Galletas Épicas',
    subtitle: 'Galletas caseras crujientes por fuera y tiernas por dentro.',
    description: 'Masas, horneados y recetas dulces para disfrutar de la repostería artesanal en casa.',
    collection: 'variadas',
    coverUrl: 'https://ik.imagekit.io/hr20qlpupi/victoria/15-galletas-libro-600.jpg',
    altText: 'Portada del libro Recetas de Galletas Épicas de Victoria Maciass',
  },
  {
    slug: 'sistema-inmunologico',
    title: 'Protege tu sistema inmunológico',
    subtitle: 'Ingredientes naturales, caldos y alimentos frescos de temporada.',
    description: 'Platos ricos en nutrientes, verduras, hierbas y alimentos reales para el bienestar diario.',
    collection: 'variadas',
    coverUrl: 'https://ik.imagekit.io/hr20qlpupi/victoria/16-sistema-inmunologico-libro-600.jpg',
    altText: 'Portada del libro Protege tu sistema inmunológico de Victoria Maciass',
  },
];

export const CocinaCategoryView: React.FC<CocinaCategoryViewProps> = ({ categoryInfo }) => {
  const [selectedFilter, setSelectedFilter] = useState<'todas' | 'saludable' | 'mediterranea' | 'variadas'>('todas');

  // Metadatos SEO específicos de Cocina y recetas
  useEffect(() => {
    window.scrollTo(0, 0);

    document.title = 'Libros de Cocina y Recetas: Recetarios Variados | Victoria Maciass';

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Descubre 18 libros de cocina y recetas: ensaladas, quinoa, carnes, pollo, paellas, arroces, galletas y cocina saludable. Explora los recetarios de Victoria Maciass.'
      );
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://victoriamaciass.vercel.app/cocina');
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute(
        'content',
        'Libros de Cocina y Recetas | Victoria Maciass'
      );
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute(
        'content',
        'Explora 18 libros de cocina con recetas saludables, ensaladas, paellas, arroces, carnes, pollo, galletas y propuestas variadas.'
      );
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', 'https://victoriamaciass.vercel.app/cocina');
    }

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      ogImage.setAttribute(
        'content',
        'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80'
      );
    }

    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage) {
      twitterImage.setAttribute(
        'content',
        'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80'
      );
    }

    // Inyección de Schema.org JSON-LD específico para Cocina y recetas
    const schemaScriptId = 'schema-cocina-jsonld';
    let scriptElement = document.getElementById(schemaScriptId) as HTMLScriptElement | null;
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = schemaScriptId;
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }

    const schemaData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          '@id': 'https://victoriamaciass.vercel.app/cocina#collection',
          url: 'https://victoriamaciass.vercel.app/cocina',
          name: 'Libros de Cocina y Recetas: Recetarios Variados | Victoria Maciass',
          description:
            'Descubre 18 libros de cocina y recetas: ensaladas, quinoa, carnes, pollo, paellas, arroces, galletas y cocina saludable. Explora los recetarios de Victoria Maciass.',
          isPartOf: {
            '@id': 'https://victoriamaciass.vercel.app/#website',
          },
          about: {
            '@id': 'https://victoriamaciass.vercel.app/#author',
          },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': 'https://victoriamaciass.vercel.app/cocina#breadcrumbs',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Inicio',
              item: 'https://victoriamaciass.vercel.app/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Cocina y recetas',
              item: 'https://victoriamaciass.vercel.app/cocina',
            },
          ],
        },
        {
          '@type': 'ItemList',
          '@id': 'https://victoriamaciass.vercel.app/cocina#itemlist',
          name: 'Todos nuestros libros de cocina y recetas',
          numberOfItems: 18,
          itemListElement: COOKING_BOOKS.map((b, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: b.title,
            url: `https://victoriamaciass.vercel.app/${b.slug}`,
            image: b.coverUrl,
          })),
        },
      ],
    };

    scriptElement.textContent = JSON.stringify(schemaData);

    return () => {
      const el = document.getElementById(schemaScriptId);
      if (el) {
        el.remove();
      }
    };
  }, []);

  const displayedBooks = selectedFilter === 'todas'
    ? COOKING_BOOKS
    : COOKING_BOOKS.filter((b) => b.collection === selectedFilter);

  return (
    <div className="min-h-screen bg-[#fbfbf9] text-stone-900 font-sans selection:bg-stone-200">
      {/* 1. Barra de Navegación Global */}
      <GlobalNavbar />

      {/* 2. Migas de pan (Breadcrumbs): Inicio → Cocina y recetas */}
      <nav aria-label="Migas de pan" className="border-b border-stone-200/70 bg-[#fbfbf9]/90 py-3.5">
        <div className="max-w-6xl mx-auto px-6 flex items-center gap-2 text-sm text-stone-600">
          <Link to="/" className="hover:text-stone-900 transition-colors font-medium">
            Inicio
          </Link>
          <ChevronRight className="w-4 h-4 text-stone-400" />
          <span className="text-stone-900 font-semibold">{categoryInfo.title}</span>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12 sm:py-16">
        {/* ====================================================================
            A. ENCABEZADO DE CATEGORÍA
            Un único H1 atractivo, claro y compacto
            ==================================================================== */}
        <header className="max-w-3xl mb-12 sm:mb-14">
          <div className="flex items-center gap-2 text-xs sm:text-[13px] font-semibold uppercase tracking-wider text-stone-600 mb-2.5 font-sans">
            <span>Colección culinaria</span>
            <span>·</span>
            <span>18 recetarios disponibles</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] font-bold tracking-tight text-stone-900 leading-[1.12]">
            Libros de Cocina y Recetas para Todos los Gustos
          </h1>

          <p className="mt-4 text-[16px] sm:text-[17px] md:text-[18px] text-stone-700 leading-relaxed font-sans">
            Descubre una colección de libros de cocina y recetas para explorar diferentes sabores, ingredientes y formas de preparar tus platos. Aquí encontrarás recetarios de cocina saludable, ensaladas, quinoa, carnes, pollo, paellas, arroces, galletas y otras propuestas para la cocina cotidiana. Explora las distintas colecciones y encuentra ideas y recetas que se adapten a tus preferencias.
          </p>
        </header>

        {/* ====================================================================
            B. PRESENTACIÓN DE LAS TRES COLECCIONES
            Tres bloques visuales con fotografías gastronómicas representativas
            ==================================================================== */}
        <section aria-labelledby="colecciones-heading" className="mb-16">
          <div className="mb-8">
            <h2 id="colecciones-heading" className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Explora nuestras colecciones de cocina
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Colección 1: Cocina saludable */}
            <article className="bg-white border border-stone-200/90 rounded-2xl overflow-hidden shadow-2xs hover:border-stone-400 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="h-44 sm:h-48 w-full overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80"
                    alt="Ingredientes frescos y ensalada saludable"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-semibold text-[#163a2b] uppercase tracking-wider font-sans">
                    6 recetarios
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl sm:text-[22px] font-bold text-stone-900 mb-2.5">
                    Cocina saludable
                  </h3>
                  <p className="text-sm text-stone-700 leading-relaxed font-sans">
                    Recetarios con propuestas de ensaladas, quinoa, recetas fitness y otras preparaciones para quienes desean explorar alternativas variadas en su cocina cotidiana.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <a
                  href="#cocina-saludable"
                  onClick={() => setSelectedFilter('saludable')}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#163a2b] hover:text-[#102a1f] font-sans group"
                >
                  <span>Ver libros de cocina saludable</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </article>

            {/* Colección 2: Cocina mediterránea y española */}
            <article className="bg-white border border-stone-200/90 rounded-2xl overflow-hidden shadow-2xs hover:border-stone-400 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="h-44 sm:h-48 w-full overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=800&q=80"
                    alt="Paella mediterránea tradicional con marisco y arroz"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-semibold text-[#163a2b] uppercase tracking-wider font-sans">
                    3 recetarios
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl sm:text-[22px] font-bold text-stone-900 mb-2.5">
                    Cocina mediterránea y española
                  </h3>
                  <p className="text-sm text-stone-700 leading-relaxed font-sans">
                    Una selección de recetarios dedicados a la cocina mediterránea y española, con especial atención a las paellas, los arroces y otras preparaciones tradicionales y populares.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <a
                  href="#cocina-mediterranea"
                  onClick={() => setSelectedFilter('mediterranea')}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#163a2b] hover:text-[#102a1f] font-sans group"
                >
                  <span>Ver libros de paellas y arroces</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </article>

            {/* Colección 3: Recetas variadas */}
            <article className="bg-white border border-stone-200/90 rounded-2xl overflow-hidden shadow-2xs hover:border-stone-400 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="h-44 sm:h-48 w-full overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80"
                    alt="Platos caseros variados, asados y carnes"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-semibold text-[#163a2b] uppercase tracking-wider font-sans">
                    9 recetarios
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl sm:text-[22px] font-bold text-stone-900 mb-2.5">
                    Recetas variadas
                  </h3>
                  <p className="text-sm text-stone-700 leading-relaxed font-sans">
                    Una colección de recetarios con propuestas diferentes para ampliar las posibilidades de la cocina diaria, desde platos de carne y pollo hasta galletas, recetas variadas y otras preparaciones.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <a
                  href="#recetas-variadas"
                  onClick={() => setSelectedFilter('variadas')}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#163a2b] hover:text-[#102a1f] font-sans group"
                >
                  <span>Ver libros de recetas variadas</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </article>
          </div>
        </section>

        {/* ====================================================================
            C. CATÁLOGO COMPLETO DE LOS 18 LIBROS
            H2 del catálogo con filtro interactivo y cuadrícula homogénea
            ==================================================================== */}
        <section id="catalogo-cocina" aria-labelledby="catalogo-cocina-heading" className="mb-20">
          <div className="mb-8 max-w-2xl">
            <h2
              id="catalogo-cocina-heading"
              className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-bold text-stone-900 tracking-tight leading-snug"
            >
              Todos nuestros libros de cocina y recetas
            </h2>
            <p className="mt-3 text-[15px] sm:text-[16px] text-stone-700 leading-relaxed font-sans">
              Explora los 18 recetarios estructurados en tres colecciones temáticas para disfrutar de la cocina doméstica, saludable y tradicional.
            </p>
          </div>

          {/* Filtro interactivo de series/colecciones */}
          <div className="mb-10 flex flex-wrap items-center gap-2.5 pt-2">
            {[
              { id: 'todas', label: 'Todos los recetarios', count: 18 },
              { id: 'saludable', label: 'Cocina saludable', count: 6 },
              { id: 'mediterranea', label: 'Cocina mediterránea y española', count: 3 },
              { id: 'variadas', label: 'Recetas variadas', count: 9 },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id as any)}
                className={`px-4 py-2 text-xs sm:text-sm rounded-lg transition-all cursor-pointer font-medium font-sans ${
                  selectedFilter === f.id
                    ? 'bg-stone-900 text-white shadow-2xs font-semibold'
                    : 'bg-white border border-stone-200/90 text-stone-700 hover:border-stone-400'
                }`}
              >
                <span>{f.label}</span>
                <span className="ml-1.5 opacity-80 font-mono text-[11px]">({f.count})</span>
              </button>
            ))}
          </div>

          {/* Cuadrícula de 4 columnas en desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
            {displayedBooks.map((book) => (
              <article
                key={book.slug}
                id={
                  book.slug === 'ensaladas-sabores'
                    ? 'cocina-saludable'
                    : book.slug === 'arte-paella'
                    ? 'cocina-mediterranea'
                    : book.slug === 'carnes-rojas'
                    ? 'recetas-variadas'
                    : undefined
                }
                className="bg-white border border-stone-200/90 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-2xs hover:border-stone-400 hover:shadow-md transition-all duration-200"
              >
                <div>
                  {/* Portada en proporción 2:3 */}
                  <div className="w-full flex justify-center mb-5">
                    <Link
                      to={`/${book.slug}`}
                      className="w-full max-w-[170px] block transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 rounded-lg"
                      title={`Ver detalles de ${book.title}`}
                    >
                      <div
                        className="w-full aspect-[2/3] rounded-lg overflow-hidden bg-white select-none"
                        style={{
                          boxShadow:
                            '0 12px 28px -8px rgba(0, 0, 0, 0.22), 0 4px 10px -4px rgba(0, 0, 0, 0.1)',
                        }}
                      >
                        <img
                          src={book.coverUrl}
                          alt={book.altText}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain block"
                          loading="lazy"
                        />
                      </div>
                    </Link>
                  </div>

                  {/* Colección pill */}
                  <span className="inline-block text-[11px] font-semibold text-[#163a2b] uppercase tracking-wider mb-2 font-sans">
                    {book.collection === 'saludable'
                      ? 'Cocina saludable'
                      : book.collection === 'mediterranea'
                      ? 'Mediterránea y española'
                      : 'Recetas variadas'}
                  </span>

                  {/* Título de la obra (H3 semántico bajo el catálogo H2) */}
                  <h3 className="font-serif text-lg sm:text-[19px] font-bold text-stone-900 leading-snug min-h-[50px] flex items-center">
                    <Link
                      to={`/${book.slug}`}
                      className="hover:text-stone-700 transition-colors"
                    >
                      {book.title}
                    </Link>
                  </h3>

                  {/* Subtítulo */}
                  <p className="mt-2 text-xs sm:text-[13px] font-medium text-stone-600 line-clamp-2 leading-relaxed font-sans min-h-[38px]">
                    {book.subtitle}
                  </p>

                  {/* Descripción breve */}
                  <p className="mt-3 text-xs sm:text-[13.5px] text-stone-700 leading-relaxed font-sans border-t border-stone-100 pt-2.5">
                    {book.description}
                  </p>
                </div>

                {/* Enlace y botón hacia la ficha individual */}
                <div className="mt-6 pt-3.5 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-stone-400">/{book.slug}</span>
                  <Link
                    to={`/${book.slug}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-stone-900 hover:bg-[#163a2b] rounded-lg transition-colors shadow-2xs group focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
                  >
                    <span>Ver libro</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ====================================================================
            D. CONTENIDO EDITORIAL SEO COMPLEMENTARIO
            Secciones temáticas profundas con H2 y enlaces contextuales
            ==================================================================== */}
        <section aria-label="Información editorial complementaria" className="mt-16 pt-12 border-t border-stone-200/80 max-w-4xl">
          {/* Bloque 1 */}
          <div className="mb-12">
            <h2 className="font-serif text-2xl sm:text-[28px] font-bold text-stone-900 tracking-tight leading-snug mb-4">
              Libros de cocina y recetas para descubrir nuevos sabores
            </h2>
            <p className="text-[16px] sm:text-[17px] text-stone-700 leading-relaxed font-sans">
              La cocina ofrece múltiples posibilidades para combinar ingredientes, descubrir sabores y preparar platos diferentes. Esta colección de libros de cocina reúne recetarios dedicados a distintas formas de cocinar, desde ensaladas y recetas saludables hasta platos de carne, pollo, arroces, paellas y postres. Cada publicación aborda una temática concreta para facilitar la búsqueda de recetas e ideas culinarias.
            </p>
          </div>

          {/* Bloque 2: Recetas saludables */}
          <div className="mb-12 bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs">
            <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-stone-900 tracking-tight leading-snug mb-3.5">
              Libros de recetas saludables y cocina variada
            </h2>
            <p className="text-[16px] sm:text-[17px] text-stone-700 leading-relaxed font-sans">
              Los recetarios de cocina saludable reúnen propuestas para quienes desean ampliar su repertorio culinario y explorar distintas combinaciones de ingredientes. En esta colección encontrarás libros sobre ensaladas, quinoa, recetas fitness, aderezos y otras preparaciones. Consulta cada título para conocer sus recetas y el enfoque particular de cada publicación.
            </p>
          </div>

          {/* Bloque 3: Ensaladas */}
          <div className="mb-12 bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs">
            <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-stone-900 tracking-tight leading-snug mb-3.5">
              Libros de recetas de ensaladas
            </h2>
            <p className="text-[16px] sm:text-[17px] text-stone-700 leading-relaxed font-sans">
              Las ensaladas permiten combinar verduras, frutas, legumbres, cereales y otros ingredientes en preparaciones muy diferentes. Esta colección incluye libros dedicados a las ensaladas, con propuestas para descubrir nuevas combinaciones y ampliar las opciones de la cocina cotidiana.
            </p>
            <div className="mt-4 pt-3 border-t border-stone-100 flex flex-col sm:flex-row flex-wrap gap-4">
              <Link
                to="/ensaladas-sabores"
                className="inline-flex items-center gap-1.5 text-sm sm:text-[15px] font-semibold text-stone-900 hover:text-[#163a2b] transition-colors group font-sans"
              >
                <span>Recetas De Ensaladas Con Sabores Deliciosos</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/ensaladas-150"
                className="inline-flex items-center gap-1.5 text-sm sm:text-[15px] font-semibold text-stone-900 hover:text-[#163a2b] transition-colors group font-sans"
              >
                <span>+150 Recetas de Ensaladas Refrescantes y Deliciosas</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Bloque 4: Quinoa */}
          <div className="mb-12 bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs">
            <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-stone-900 tracking-tight leading-snug mb-3.5">
              Libros de recetas con quinoa
            </h2>
            <p className="text-[16px] sm:text-[17px] text-stone-700 leading-relaxed font-sans">
              La quinoa es un ingrediente utilizado en distintas preparaciones culinarias. Si buscas ideas para incorporarla a tus platos, aquí encontrarás un recetario dedicado a las recetas con quinoa. Consulta su ficha individual para conocer los contenidos y las propuestas que incluye.
            </p>
            <div className="mt-4 pt-3 border-t border-stone-100">
              <Link
                to="/recetas-quinoa"
                className="inline-flex items-center gap-2 text-[15px] sm:text-[16px] font-semibold text-stone-900 hover:text-[#163a2b] transition-colors group font-sans"
              >
                <span>Consultar el libro Recetas con Quinoa</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Bloque 5: Cocina mediterránea, paellas y arroces */}
          <div className="mb-12 bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs">
            <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-stone-900 tracking-tight leading-snug mb-3.5">
              Libros de cocina mediterránea, paellas y arroces
            </h2>
            <p className="text-[16px] sm:text-[17px] text-stone-700 leading-relaxed font-sans">
              La cocina mediterránea y española cuenta con una amplia variedad de preparaciones elaboradas con arroz, verduras, pescados, carnes y otros ingredientes. En esta colección encontrarás libros dedicados a las paellas y los arroces, con propuestas para explorar diferentes recetas y formas de preparación.
            </p>
            <div className="mt-4 pt-3 border-t border-stone-100 flex flex-col sm:flex-row flex-wrap gap-4">
              <Link
                to="/arte-paella"
                className="inline-flex items-center gap-1.5 text-sm sm:text-[15px] font-semibold text-stone-900 hover:text-[#163a2b] transition-colors group font-sans"
              >
                <span>El Arte de la Paella</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/paellas-100"
                className="inline-flex items-center gap-1.5 text-sm sm:text-[15px] font-semibold text-stone-900 hover:text-[#163a2b] transition-colors group font-sans"
              >
                <span>Más de 100 Recetas de Paellas</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/arroces-alma"
                className="inline-flex items-center gap-1.5 text-sm sm:text-[15px] font-semibold text-stone-900 hover:text-[#163a2b] transition-colors group font-sans"
              >
                <span>Arroces con Alma</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Bloque 6: Carnes y pollo */}
          <div className="mb-12 bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs">
            <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-stone-900 tracking-tight leading-snug mb-3.5">
              Libros de recetas de carnes y pollo
            </h2>
            <p className="text-[16px] sm:text-[17px] text-stone-700 leading-relaxed font-sans">
              La carne y el pollo forman parte de numerosas preparaciones culinarias. Esta colección incluye recetarios dedicados a estos ingredientes, además de propuestas variadas para quienes desean descubrir nuevas ideas y ampliar sus opciones en la cocina.
            </p>
            <div className="mt-4 pt-3 border-t border-stone-100 flex flex-col sm:flex-row flex-wrap gap-4">
              <Link
                to="/carnes-rojas"
                className="inline-flex items-center gap-1.5 text-sm sm:text-[15px] font-semibold text-stone-900 hover:text-[#163a2b] transition-colors group font-sans"
              >
                <span>Recetas de Carnes Rojas</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/recetas-pollo"
                className="inline-flex items-center gap-1.5 text-sm sm:text-[15px] font-semibold text-stone-900 hover:text-[#163a2b] transition-colors group font-sans"
              >
                <span>Recetas con Pollo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Bloque 7: Freidora de aire */}
          <div className="mb-12 bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs">
            <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-stone-900 tracking-tight leading-snug mb-3.5">
              Libros de recetas para freidora de aire
            </h2>
            <p className="text-[16px] sm:text-[17px] text-stone-700 leading-relaxed font-sans">
              La freidora de aire se ha incorporado a muchas cocinas como una alternativa para preparar diferentes platos. Si te interesa descubrir recetas para este electrodoméstico, puedes consultar el libro específico de esta colección y conocer las preparaciones que incluye.
            </p>
            <div className="mt-4 pt-3 border-t border-stone-100">
              <Link
                to="/freidora-aire"
                className="inline-flex items-center gap-2 text-[15px] sm:text-[16px] font-semibold text-stone-900 hover:text-[#163a2b] transition-colors group font-sans"
              >
                <span>Consultar el libro Recetas Freidora de Aire</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Bloque 8: Galletas y repostería */}
          <div className="mb-12 bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs">
            <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-stone-900 tracking-tight leading-snug mb-3.5">
              Libros de recetas de galletas y repostería
            </h2>
            <p className="text-[16px] sm:text-[17px] text-stone-700 leading-relaxed font-sans">
              Las galletas permiten explorar diferentes combinaciones de sabores, masas e ingredientes. En esta colección encontrarás una publicación dedicada a las recetas de galletas, con propuestas para quienes disfrutan de la repostería y las preparaciones dulces.
            </p>
            <div className="mt-4 pt-3 border-t border-stone-100">
              <Link
                to="/galletas-epicas"
                className="inline-flex items-center gap-2 text-[15px] sm:text-[16px] font-semibold text-stone-900 hover:text-[#163a2b] transition-colors group font-sans"
              >
                <span>Consultar el libro Recetas de Galletas Épicas</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Bloque 9: Cierre */}
          <div className="mb-8">
            <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-stone-900 tracking-tight leading-snug mb-3.5">
              Encuentra el recetario que buscas
            </h2>
            <p className="text-[16px] sm:text-[17px] text-stone-700 leading-relaxed font-sans">
              Explora las tres colecciones de cocina y consulta las fichas individuales para conocer mejor cada libro. Puedes descubrir recetarios de ensaladas, quinoa, carnes, pollo, paellas, arroces, galletas y otras preparaciones. Elige la temática que más te interese y encuentra nuevas ideas para tu cocina.
            </p>
          </div>
        </section>

        {/* ====================================================================
            NAVEGACIÓN INTERNA Y OTRAS CATEGORÍAS
            ==================================================================== */}
        <nav aria-label="Navegación de retorno y categorías" className="mt-16 sm:mt-24 pt-10 border-t border-stone-200/80">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              to="/"
              className="text-sm sm:text-[15px] font-semibold text-stone-800 hover:text-stone-950 transition-colors inline-flex items-center gap-1.5 font-sans"
            >
              <span>← Volver a la página de inicio</span>
            </Link>

            <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-stone-600 font-sans">
              <span className="font-semibold text-stone-800">Otras categorías:</span>
              {CATEGORIES_LIST.filter((c) => c.slug !== 'cocina').map((c) => (
                <Link
                  key={c.slug}
                  to={c.route}
                  className="hover:text-stone-900 underline transition-colors"
                >
                  {c.navLabel}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </main>

      {/* Pie de página */}
      <footer className="border-t border-stone-200 py-10 bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-stone-600 font-sans">
          <p className="font-serif text-lg sm:text-[20px] font-bold text-stone-900">
            Victoria Maciass
          </p>
          <p>
            <Link to="/" className="hover:text-stone-900 underline transition-colors font-medium">
              Ir a la página de inicio (/)
            </Link>
          </p>
          <p className="text-xs sm:text-sm text-stone-500">
            © {new Date().getFullYear()} Victoria Maciass. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};
