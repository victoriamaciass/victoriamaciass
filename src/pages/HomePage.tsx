import React, { useState } from 'react';
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
            ==================================================================== */}
        <section className="py-20 sm:py-28 md:py-36 border-b border-stone-200/80">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-stone-900 leading-[1.05]">
              Victoria Maciass
            </h1>

            <p className="mt-4 sm:mt-5 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-stone-500 font-sans">
              Biblioteca práctica de Victoria Maciass
            </p>

            <p className="mt-6 sm:mt-7 text-xl sm:text-2xl md:text-3xl text-stone-800 leading-snug font-serif italic max-w-2xl mx-auto">
              "Guías reales para cuidar tu cuerpo, tu mente, tus animales y tu mesa."
            </p>

            <p className="mt-6 sm:mt-7 text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl mx-auto font-sans">
              Este sitio reúne una biblioteca de guías prácticas escritas para resolver problemas concretos del día a día. Los libros están estructurados por áreas temáticas, con explicaciones directas, pautas paso a paso, sin páginas de relleno y sin promesas infladas: información honesta para consultar y aplicar desde la primera lectura.
            </p>

            <div className="mt-10 sm:mt-12">
              <a
                href="#categorias"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-xs sm:text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors shadow-2xs cursor-pointer"
              >
                <span>Explorar la biblioteca</span>
                <ArrowDown className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ====================================================================
            2. SEIS CATEGORÍAS (bloques editoriales de texto en cuadrícula)
            ==================================================================== */}
        <section id="categorias" className="py-20 sm:py-28 max-w-5xl mx-auto px-6">
          <div className="mb-14 sm:mb-18 text-center max-w-2xl mx-auto">
            <span className="text-xs font-semibold tracking-widest uppercase text-stone-500 block mb-2 font-mono">
              Catálogo temático
            </span>
            <p className="font-serif text-2xl sm:text-3xl text-stone-900">
              Seis áreas prácticas organizadas para orientar tu búsqueda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {categories.map((cat) => (
              <article
                key={cat.id}
                className="bg-white border border-stone-200/90 rounded-2xl p-7 sm:p-9 flex flex-col justify-between shadow-2xs hover:border-stone-300 transition-colors"
              >
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                    {cat.title}
                  </h2>

                  <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {cat.description}
                  </p>

                  <div className="mt-6 pt-5 border-t border-stone-100">
                    <p className="text-xs sm:text-sm text-stone-700">
                      <strong className="font-semibold text-stone-900">Qué incluye:</strong>{' '}
                      <span className="text-stone-600">{cat.includes}</span>
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <Link
                    to={cat.route}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-900 hover:text-stone-700 transition-colors group"
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
        <section className="py-20 sm:py-28 bg-[#f5f4ef] border-y border-stone-200/80">
          <div className="max-w-5xl mx-auto px-6">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-semibold tracking-widest uppercase text-stone-500 block mb-2 font-mono">
                Subsección especial
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight">
                Cocina y recetas
              </h2>
              <p className="mt-4 text-sm sm:text-base text-stone-700 leading-relaxed">
                La biblioteca culinaria reúne 18 recetarios organizados en tres series temáticas definidas. Está pensada tanto para quienes buscan optimizar su tiempo semanal con preparaciones ligeras y equilibradas, como para quienes desean perfeccionar la cocina mediterránea tradicional o resolver los menús del hogar con herramientas actuales como la freidora de aire.
              </p>
            </div>

            {/* Tres subbloques de texto (sin imágenes) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-7 shadow-2xs">
                <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
                  Cocina Saludable
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Propuestas nutricionales para el bienestar diario: ensaladas completas, recetas fitness ricas en proteínas, platos con quinoa y aderezos ligeros sin aditivos.
                </p>
              </div>

              <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-7 shadow-2xs">
                <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
                  Cocina Mediterránea / Española
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  El saber culinario tradicional llevado a la práctica doméstica: paellas valencianas auténticas, arroces de mar y montaña, caldos y guisos de herencia.
                </p>
              </div>

              <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-7 shadow-2xs">
                <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
                  Recetas generales
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Soluciones versátiles para cualquier mesa familiar: técnicas para freidora de aire (air fryer), carnes rojas al punto, platos con pollo y repostería casera.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/cocina"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors shadow-2xs"
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
        <section className="py-20 sm:py-24 max-w-3xl mx-auto px-6 border-b border-stone-200/80">
          <div className="text-center">
            <span className="text-xs font-semibold tracking-widest uppercase text-stone-500 block mb-3 font-mono">
              Sobre la autora
            </span>
            <p className="font-serif text-xl sm:text-2xl text-stone-900 leading-relaxed">
              Victoria Maciass reúne en un mismo espacio guías prácticas sobre salud, bienestar, mascotas, cocina y manualidades. Su objetivo es proporcionar herramientas concretas y explicaciones claras para problemas del día a día, prescindiendo de promesas vacías y centrándose en el contenido útil.
            </p>
          </div>
        </section>

        {/* ====================================================================
            5. SUSCRIPCIÓN (email + botón "Avisadme de nuevos libros")
            ==================================================================== */}
        <section className="py-20 sm:py-24 max-w-2xl mx-auto px-6 text-center">
          <span className="text-xs font-semibold tracking-widest uppercase text-stone-500 block mb-2 font-mono">
            Actualizaciones editoriales
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Novedades de la biblioteca
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed max-w-md mx-auto">
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
                className="flex-1 px-4 py-3 text-xs sm:text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 placeholder:text-stone-400"
              />
              <button
                type="submit"
                className="px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-2xs"
              >
                Avisadme de nuevos libros
              </button>
            </div>

            {subscribed && (
              <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Gracias. Te avisaremos únicamente cuando haya una nueva publicación disponible.</span>
              </div>
            )}
          </form>
        </section>
      </main>

      {/* Pie de página sencillo y sobrio */}
      <footer className="border-t border-stone-200 py-10 bg-[#fbfbf9]">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            <p className="font-serif text-sm font-bold text-stone-800">
              Victoria Maciass
            </p>
            <p className="text-[11px] mt-0.5">
              Biblioteca práctica de guías y recetarios
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a href="#categorias" className="hover:text-stone-900 transition-colors">
              Categorías
            </a>
            <Link to="/cocina" className="hover:text-stone-900 transition-colors">
              Cocina
            </Link>
            <a href="#categorias" className="hover:text-stone-900 transition-colors">
              Explorar
            </a>
          </div>

          <p className="text-[11px]">
            © {new Date().getFullYear()} Victoria Maciass. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};
