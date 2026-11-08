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
    document.title = 'Libros y Guías Prácticas | Victoria Maciass';

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Descubre 39 libros y guías prácticas sobre mascotas, cocina, salud, bienestar, crecimiento personal y creatividad. Explora la biblioteca de Victoria Maciass.'
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
        'Libros y guías sobre el cuidado de perros, gatos y gallinas. Una colección para quienes conviven con animales y desean conocer mejor sus necesidades, alimentación, educación y comportamiento, con contenidos orientados a la convivencia y al cuidado cotidiano.',
      includes: 'guías sobre gallinas, gatos y perros.',
      buttonLabel: 'Ver los libros de Mascotas',
    },
    {
      id: 'mente-emociones',
      title: 'Mente y emociones',
      route: '/mente-emociones',
      description:
        'Publicaciones sobre ansiedad, ataques de pánico, sueños y bienestar emocional. Una colección para explorar diferentes aspectos de la relación entre la mente, las emociones y las experiencias cotidianas, mediante explicaciones y contenidos prácticos.',
      includes: 'libros sobre ansiedad, ataques de pánico, interpretación de sueños y serenidad diaria.',
      buttonLabel: 'Ver los libros de Mente y emociones',
    },
    {
      id: 'crecimiento-personal',
      title: 'Crecimiento personal',
      route: '/crecimiento-personal',
      description:
        'Libros sobre hábitos, motivación, disciplina mental y numerología. Guías que abordan la organización de las rutinas, el desarrollo de la motivación y la reflexión personal, junto con el simbolismo de los números.',
      includes: 'hábitos diarios, motivación, disciplina mental y numerología.',
      buttonLabel: 'Ver los libros de Crecimiento personal',
    },
    {
      id: 'cuerpo-salud',
      title: 'Cuerpo y salud',
      route: '/cuerpo-salud',
      description:
        'Una colección dedicada al cuidado corporal y a diferentes temas relacionados con la salud y el bienestar. Incluye publicaciones sobre varices, metabolismo, celulitis, fertilidad y desintoxicación, con contenidos centrados en cada temática.',
      includes: 'libros sobre varices, metabolismo, celulitis, fertilidad y desintoxicación.',
      buttonLabel: 'Ver los libros de Cuerpo y salud',
    },
    {
      id: 'cocina-recetas',
      title: 'Cocina y recetas',
      route: '/cocina',
      description:
        'Una biblioteca de 18 libros de cocina organizados en tres colecciones: cocina saludable, cocina mediterránea y española, y recetas generales. Incluye propuestas para preparar ensaladas, platos con quinoa, carnes, pollo, arroces, paellas, galletas y recetas con freidora de aire.',
      includes: '18 recetarios con diferentes estilos de cocina e ideas para el día a día.',
      buttonLabel: 'Ver los libros de Cocina y recetas',
    },
    {
      id: 'manos-misterio',
      title: 'Manos y misterio',
      route: '/manos-misterio',
      description:
        'Libros sobre manualidades, costura, velas artesanales y prácticas simbólicas. Una colección para quienes disfrutan creando con sus manos, aprendiendo técnicas y explorando actividades creativas y tradicionales.',
      includes: 'elaboración de velas aromáticas, costura y conjuros conscientes.',
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
              Libros y guías prácticas sobre cocina, salud, mascotas y bienestar
            </h1>

            <p className="mt-3 sm:mt-3.5 text-xs sm:text-[14px] font-semibold tracking-[0.16em] uppercase text-stone-600 font-sans">
              Biblioteca práctica de guías y publicaciones
            </p>

            <p className="mt-5 sm:mt-6 text-xl sm:text-2xl md:text-[26px] text-stone-800 leading-snug font-serif italic max-w-2xl mx-auto">
              "Guías reales para cuidar tu cuerpo, tu mente, tus animales y tu mesa."
            </p>

            <div className="mt-5 sm:mt-6 space-y-4 text-[16px] sm:text-[17px] md:text-[18px] text-stone-700 leading-relaxed max-w-2xl mx-auto font-sans">
              <p>
                Esta biblioteca reúne 39 libros y guías prácticas organizados en seis áreas temáticas. Sus publicaciones abordan cuestiones cotidianas relacionadas con el cuidado personal, el bienestar emocional, los animales, la cocina y la creatividad.
              </p>
              <p>
                Cada colección ofrece contenidos específicos, explicaciones claras y propuestas prácticas para quienes desean aprender, consultar información y descubrir nuevas ideas. Explora las diferentes temáticas y encuentra los libros que mejor se ajusten a tus intereses.
              </p>
            </div>

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
            <h2 className="font-serif text-[26px] sm:text-[30px] md:text-[32px] lg:text-[34px] font-bold text-stone-900 leading-snug">
              Seis áreas prácticas organizadas para orientar tu búsqueda
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {categories.map((cat) => (
              <article
                key={cat.id}
                className="bg-white border border-stone-200/90 rounded-2xl p-7 sm:p-9 flex flex-col justify-between shadow-2xs hover:border-stone-400 hover:shadow-md transition-all duration-200"
              >
                <div>
                  <h3 className="font-serif text-2xl sm:text-[28px] lg:text-[30px] font-bold text-stone-900 tracking-tight leading-snug">
                    {cat.title}
                  </h3>

                  <p className="mt-3.5 sm:mt-4 text-[15px] sm:text-[16px] md:text-[17px] text-stone-700 leading-relaxed font-sans">
                    {cat.description}
                  </p>

                  <div className="mt-6 pt-5 border-t border-stone-100">
                    <p className="text-[14px] sm:text-[15px] text-stone-800 leading-normal font-sans">
                      <strong className="font-semibold text-stone-900">Qué encontrarás:</strong>{' '}
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
                Libros de cocina y recetas
              </h2>
              <p className="mt-4 text-[16px] sm:text-[17px] md:text-[18px] text-stone-700 leading-relaxed font-sans">
                La colección de cocina reúne 18 recetarios agrupados en tres series. Encontrarás propuestas para preparar comidas variadas, descubrir ingredientes y explorar diferentes formas de cocinar, desde recetas saludables hasta platos tradicionales y preparaciones para el hogar.
              </p>
            </div>

            {/* Tres subbloques de texto (sin imágenes) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-7 shadow-2xs">
                <h3 className="font-serif text-[21px] sm:text-[22px] lg:text-[24px] font-bold text-stone-900 mb-2.5 leading-snug">
                  Cocina saludable
                </h3>
                <p className="text-[14px] sm:text-[15px] text-stone-700 leading-relaxed font-sans">
                  Recetarios dedicados a ensaladas, recetas fitness, preparaciones con quinoa y aderezos para acompañar diferentes platos.
                </p>
              </div>

              <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-7 shadow-2xs">
                <h3 className="font-serif text-[21px] sm:text-[22px] lg:text-[24px] font-bold text-stone-900 mb-2.5 leading-snug">
                  Cocina mediterránea y española
                </h3>
                <p className="text-[14px] sm:text-[15px] text-stone-700 leading-relaxed font-sans">
                  Libros centrados en paellas, arroces y otras preparaciones vinculadas con la cocina mediterránea y española.
                </p>
              </div>

              <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-7 shadow-2xs">
                <h3 className="font-serif text-[21px] sm:text-[22px] lg:text-[24px] font-bold text-stone-900 mb-2.5 leading-snug">
                  Recetas generales
                </h3>
                <p className="text-[14px] sm:text-[15px] text-stone-700 leading-relaxed font-sans">
                  Una selección de recetas de carnes, pollo, galletas y preparaciones con freidora de aire, entre otras propuestas para la cocina cotidiana.
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
            <h2 className="text-xs sm:text-[14px] font-semibold tracking-widest uppercase text-stone-600 block mb-3 font-sans">
              Sobre la autora
            </h2>
            <p className="font-serif text-xl sm:text-2xl md:text-[26px] text-stone-900 leading-relaxed">
              Victoria Maciass reúne en esta biblioteca publicaciones sobre salud, bienestar, mascotas, cocina, crecimiento personal y creatividad. Su propuesta editorial se centra en ofrecer guías prácticas y explicaciones claras, organizadas por temáticas para facilitar la búsqueda y consulta de cada libro.
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
            Suscríbete con tu correo electrónico si deseas recibir un aviso cuando se publique una nueva guía o se actualice un recetario. Recibirás únicamente las novedades editoriales de la biblioteca.
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
