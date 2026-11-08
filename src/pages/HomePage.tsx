import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, Check } from 'lucide-react';
import { GlobalNavbar } from '../components/GlobalNavbar';

interface CategoryEditorialBlock {
  id: string;
  title: string;
  route: string;
  description: string;
  includes: string;
  buttonLabel: string;
}

export const HomePage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    document.title = 'Libros y Guías Prácticas de Cocina, Salud y Bienestar | Victoria Maciass';

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Descubre libros y guías prácticas sobre cocina, mascotas, salud, bienestar, crecimiento personal y creatividad. Explora las publicaciones de Victoria Maciass.'
      );
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Victoria Maciass | Libros y Guías Prácticas');
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute(
        'content',
        'Explora un catálogo de libros y guías prácticas sobre cocina, mascotas, salud, bienestar, crecimiento personal y creatividad.'
      );
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', 'https://victoriamaciass.vercel.app/');
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://victoriamaciass.vercel.app/');
    }
  }, []);

  const categories: CategoryEditorialBlock[] = [
    {
      id: 'mascotas',
      title: 'Mascotas',
      route: '/mascotas',
      description:
        'Guías concebidas para quien convive con animales y quiere cuidarlos bien: gallinas, gatos y perros. Explica cómo alimentarlos, educarlos y entender su comportamiento, con pautas prácticas y respetuosas para resolver los retos cotidianos de convivencia.',
      includes: 'Guías sobre gallinas, gatos y perros.',
      buttonLabel: 'Ver los libros de Mascotas',
    },
    {
      id: 'mente-emociones',
      title: 'Mente y emociones',
      route: '/mente-emociones',
      description:
        'Libros sobre ansiedad, ataques de pánico, sueños y calma. Pensados para quien quiere entender qué le pasa a su cuerpo y a su mente en momentos de sobrecarga, y disponer de herramientas concretas y contrastadas, explicadas con absoluta claridad.',
      includes: 'Ansiedad, ataques de pánico, interpretación de sueños y serenidad diaria.',
      buttonLabel: 'Ver los libros de Mente y emociones',
    },
    {
      id: 'crecimiento-personal',
      title: 'Crecimiento personal',
      route: '/crecimiento-personal',
      description:
        'Guías sobre hábitos, motivación, mente y numerología. Métodos estructurados para ordenar rutinas personales, comprender los resortes de la propia motivación y explorar el simbolismo tradicional de los números desde un prisma analítico y reflexivo.',
      includes: 'Hábitos diarios, disciplina mental, motivación y numerología reflexiva.',
      buttonLabel: 'Ver los libros de Crecimiento personal',
    },
    {
      id: 'cuerpo-salud',
      title: 'Cuerpo y salud',
      route: '/cuerpo-salud',
      description:
        'Información práctica y rigurosa sobre varices, metabolismo, celulitis, fertilidad, desintoxicación y bienestar corporal. Aborda problemas específicos con un enfoque preventivo basado en hábitos, nutrición funcional y cuidado físico continuado.',
      includes: 'Varices, metabolismo activo, celulitis, fertilidad y desintoxicación.',
      buttonLabel: 'Ver los libros de Cuerpo y salud',
    },
    {
      id: 'cocina-recetas',
      title: 'Cocina y recetas',
      route: '/cocina',
      description:
        '18 recetarios organizados en tres series temáticas (Cocina Saludable, Cocina Mediterránea / Española y recetas generales). Propuestas prácticas para el día a día, pensadas para comer mejor y cocinar con ingredientes reales, air fryer, quinoa, carnes o repostería.',
      includes: '18 títulos estructurados en tres colecciones culinarias completas.',
      buttonLabel: 'Ver los libros de Cocina y recetas',
    },
    {
      id: 'manos-misterio',
      title: 'Manos y misterio',
      route: '/manos-misterio',
      description:
        'Guías dedicadas a las velas artesanales, la costura práctica y los conjuros conscientes. Obras que invitan a crear con las manos, recuperar oficios tradicionales y explorar prácticas simbólicas y rituales cotidianos desde una perspectiva reflexiva.',
      includes: 'Velas aromáticas artesanales, costura básica y rituales simbólicos.',
      buttonLabel: 'Ver los libros de Manos y misterio',
    },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfbf9] text-stone-900 font-sans selection:bg-stone-200">
      {/* Barra de Navegación Global (Header) */}
      <GlobalNavbar />

      <main>
        {/* ====================================================================
            1. HERO (identidad y propósito)
            Espaciado vertical equilibrado para acercar las categorías a la
            primera vista sin perder elegancia ni amplitud editorial.
            ==================================================================== */}
        <section className="py-14 sm:py-18 md:py-24 border-b border-stone-200/80">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] font-bold tracking-tight text-stone-900 leading-[1.12]">
              Victoria Maciass
            </h1>

            <p className="mt-3 sm:mt-3.5 text-xs sm:text-[14px] font-semibold tracking-[0.16em] uppercase text-stone-600 font-sans">
              Biblioteca práctica de Victoria Maciass
            </p>

            <p className="mt-5 sm:mt-6 text-xl sm:text-2xl md:text-[26px] text-stone-800 leading-snug font-serif italic max-w-2xl mx-auto">
              "Guías reales para cuidar tu cuerpo, tu mente, tus animales y tu mesa."
            </p>

            <p className="mt-5 sm:mt-6 text-[16px] sm:text-[17px] md:text-[18px] text-stone-700 leading-relaxed max-w-2xl mx-auto font-sans">
              Este sitio reúne una biblioteca de guías prácticas escritas para resolver problemas concretos del día a día. Los libros están estructurados por áreas temáticas, con explicaciones directas, pautas paso a paso, sin páginas de relleno y sin promesas infladas: información honesta para consultar y aplicar desde la primera lectura.
            </p>

            {/* Botón principal con presencia reforzada en verde bosque */}
            <div className="mt-8 sm:mt-10">
              <a
                href="#categorias"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 sm:py-4 text-[15px] sm:text-[16px] font-semibold text-white bg-[#163a2b] hover:bg-[#102a1f] rounded-xl transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#163a2b] focus-visible:ring-offset-2 font-sans tracking-wide"
              >
                <span>Explorar la biblioteca</span>
                <ArrowDown className="w-4 h-4 stroke-[2.2]" />
              </a>
            </div>
          </div>
        </section>

        {/* ====================================================================
            2. SEIS CATEGORÍAS (bloques editoriales de texto en cuadrícula)
            ==================================================================== */}
        <section id="categorias" className="py-16 sm:py-22 md:py-24 max-w-5xl mx-auto px-6">
          <div className="mb-12 sm:mb-16 text-center max-w-2xl mx-auto">
            <span className="text-xs sm:text-[14px] font-semibold tracking-widest uppercase text-stone-600 block mb-2 font-sans">
              Catálogo temático
            </span>
            <p className="font-serif text-[26px] sm:text-[30px] md:text-[32px] lg:text-[34px] font-bold text-stone-900 leading-snug">
              Seis áreas prácticas organizadas para orientar tu búsqueda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {categories.map((cat) => (
              <article
                key={cat.id}
                className="bg-white border border-stone-200/90 rounded-2xl p-7 sm:p-9 flex flex-col justify-between shadow-2xs hover:border-stone-400 hover:shadow-md transition-all duration-200"
              >
                <div>
                  <h2 className="font-serif text-2xl sm:text-[28px] lg:text-[30px] font-bold text-stone-900 tracking-tight leading-snug">
                    {cat.title}
                  </h2>

                  <p className="mt-3.5 sm:mt-4 text-[15px] sm:text-[16px] md:text-[17px] text-stone-700 leading-relaxed font-sans">
                    {cat.description}
                  </p>

                  <div className="mt-6 pt-5 border-t border-stone-100">
                    <p className="text-[14px] sm:text-[15px] text-stone-800 leading-normal font-sans">
                      <strong className="font-semibold text-stone-900">Qué incluye:</strong>{' '}
                      <span className="text-stone-700">{cat.includes}</span>
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <Link
                    to={cat.route}
                    className="inline-flex items-center gap-2 text-[15px] sm:text-[16px] font-semibold text-stone-900 hover:text-stone-700 transition-colors group font-sans"
                  >
                    <span>{cat.buttonLabel}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ====================================================================
            3. SECCIÓN DESTACADA DE COCINA (a ancho completo)
            ==================================================================== */}
        <section className="py-16 sm:py-24 bg-[#f5f4ef] border-y border-stone-200/80">
          <div className="max-w-5xl mx-auto px-6">
            <div className="max-w-2xl mb-12">
              <span className="text-xs sm:text-[14px] font-semibold tracking-widest uppercase text-stone-600 block mb-2.5 font-sans">
                Subsección especial
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-[44px] font-bold text-stone-900 tracking-tight leading-tight">
                Cocina y recetas
              </h2>
              <p className="mt-4 text-[16px] sm:text-[17px] md:text-[18px] text-stone-700 leading-relaxed font-sans">
                La biblioteca culinaria reúne 18 recetarios organizados en tres series temáticas definidas. Está pensada tanto para quienes buscan optimizar su tiempo semanal con preparaciones ligeras y equilibradas, como para quienes desean perfeccionar la cocina mediterránea tradicional o resolver los menús del hogar con herramientas actuales como la freidora de aire.
              </p>
            </div>

            {/* Tres subbloques de texto (sin imágenes) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-7 shadow-2xs">
                <h3 className="font-serif text-[21px] sm:text-[22px] lg:text-[24px] font-bold text-stone-900 mb-2.5 leading-snug">
                  Cocina Saludable
                </h3>
                <p className="text-[14px] sm:text-[15px] text-stone-700 leading-relaxed font-sans">
                  Propuestas nutricionales para el bienestar diario: ensaladas completas, recetas fitness ricas en proteínas, platos con quinoa y aderezos ligeros sin aditivos.
                </p>
              </div>

              <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-7 shadow-2xs">
                <h3 className="font-serif text-[21px] sm:text-[22px] lg:text-[24px] font-bold text-stone-900 mb-2.5 leading-snug">
                  Cocina Mediterránea / Española
                </h3>
                <p className="text-[14px] sm:text-[15px] text-stone-700 leading-relaxed font-sans">
                  El saber culinario tradicional llevado a la práctica doméstica: paellas valencianas auténticas, arroces de mar y montaña, caldos y guisos de herencia.
                </p>
              </div>

              <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-7 shadow-2xs">
                <h3 className="font-serif text-[21px] sm:text-[22px] lg:text-[24px] font-bold text-stone-900 mb-2.5 leading-snug">
                  Recetas generales
                </h3>
                <p className="text-[14px] sm:text-[15px] text-stone-700 leading-relaxed font-sans">
                  Soluciones versátiles para cualquier mesa familiar: técnicas para freidora de aire (air fryer), carnes rojas al punto, platos con pollo y repostería casera.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/cocina"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-[15px] sm:text-[16px] font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-colors shadow-2xs font-sans focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2"
              >
                <span>Ver todos los libros de cocina</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ====================================================================
            4. SOBRE LA AUTORA (dos o tres líneas neutras y honestas)
            ==================================================================== */}
        <section className="py-16 sm:py-20 max-w-3xl mx-auto px-6 border-b border-stone-200/80">
          <div className="text-center">
            <span className="text-xs sm:text-[14px] font-semibold tracking-widest uppercase text-stone-600 block mb-3 font-sans">
              Sobre la autora
            </span>
            <p className="font-serif text-xl sm:text-2xl md:text-[26px] text-stone-900 leading-relaxed">
              Victoria Maciass reúne en un mismo espacio guías prácticas sobre salud, bienestar, mascotas, cocina y manualidades. Su objetivo es proporcionar herramientas concretas y explicaciones claras para problemas del día a día, prescindiendo de promesas vacías y centrándose en el contenido útil.
            </p>
          </div>
        </section>

        {/* ====================================================================
            5. SUSCRIPCIÓN (email + botón "Avisadme de nuevos libros")
            ==================================================================== */}
        <section className="py-16 sm:py-20 max-w-2xl mx-auto px-6 text-center">
          <span className="text-xs sm:text-[14px] font-semibold tracking-widest uppercase text-stone-600 block mb-2.5 font-sans">
            Actualizaciones editoriales
          </span>
          <h2 className="font-serif text-2xl sm:text-[30px] md:text-[32px] font-bold text-stone-900 leading-snug">
            Novedades de la biblioteca
          </h2>
          <p className="mt-3.5 text-[15px] sm:text-[16px] text-stone-700 leading-relaxed max-w-md mx-auto font-sans">
            Introduce tu correo electrónico si deseas recibir un aviso puntual cuando se publique una nueva guía o se actualice un recetario. Sin publicidad ni promociones innecesarias.
          </p>

          <form onSubmit={handleSubscribe} className="mt-8 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                required
                className="flex-1 px-4 py-3 text-[15px] sm:text-base bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 placeholder:text-stone-500 text-stone-900 font-sans"
              />
              <button
                type="submit"
                className="px-6 py-3 text-[15px] sm:text-base font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-2xs font-sans focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2"
              >
                Avisadme de nuevos libros
              </button>
            </div>

            {subscribed && (
              <div className="mt-4 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-lg text-[14px] flex items-center justify-center gap-2 font-sans">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Gracias. Te avisaremos únicamente cuando haya una nueva publicación disponible.</span>
              </div>
            )}
          </form>
        </section>
      </main>

      {/* ====================================================================
          6. PIE DE PÁGINA EDITORIAL
          Incorpora la logomarca oficial de Victoria Maciass como firma visual
          discreta y elegante sin duplicar el nombre de la autora.
          ==================================================================== */}
      <footer className="border-t border-stone-200/90 py-12 bg-[#fbfbf9]">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-[14px] text-stone-600">
          
          {/* Logomarca oficial como firma visual de la marca */}
          <div className="flex flex-col items-center sm:items-start">
            <Link to="/" title="Victoria Maciass" className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 rounded-lg">
              <img
                src="https://ik.imagekit.io/hr20qlpupi/victoria/logo_marca_victoria_maciass.png"
                alt="Victoria Maciass"
                className="h-14 sm:h-16 w-auto object-contain block"
                loading="lazy"
              />
            </Link>
            <p className="text-[14px] text-stone-600 mt-2 text-center sm:text-left font-sans">
              Biblioteca práctica de guías y recetarios
            </p>
          </div>

          <div className="flex items-center gap-6 text-[15px] font-medium text-stone-700 font-sans">
            <a href="#categorias" className="hover:text-stone-950 transition-colors">
              Categorías
            </a>
            <Link to="/cocina" className="hover:text-stone-950 transition-colors">
              Cocina
            </Link>
            <a href="#categorias" className="hover:text-stone-950 transition-colors">
              Explorar
            </a>
          </div>

          <p className="text-[14px] text-stone-600 font-sans text-center sm:text-right">
            © {new Date().getFullYear()} Victoria Maciass. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};
