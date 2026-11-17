import React from 'react';
import { Link } from 'react-router-dom';
import { LEGAL_DOCUMENTS, LEGAL_ROUTES_ORDER } from '../data/legalDocuments';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-stone-200/85 bg-[#fbfbf9]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-6 sm:py-7">
        {/* Fila superior: identidad editorial y copyright */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-3.5 sm:gap-4">
            <Link
              to="/"
              title="Victoria Maciass"
              className="shrink-0 block rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#163a2b]"
            >
              <img
                src="https://ik.imagekit.io/hr20qlpupi/victoria/icono7-victoriamaciass.jpg"
                alt="Victoria Maciass"
                width={64}
                height={64}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-16 h-16 object-contain block rounded-md"
              />
            </Link>
            <p className="text-sm text-stone-700 font-sans leading-snug min-w-0">
              Biblioteca práctica de guías y recetarios
            </p>
          </div>

          <p className="text-xs sm:text-[13px] text-stone-500 font-sans sm:text-right shrink-0">
            © {new Date().getFullYear()} Victoria Maciass. Todos los derechos reservados.
          </p>
        </div>

        {/* Línea divisoria sutil y fila inferior de enlaces legales */}
        <div className="mt-4 pt-3.5 border-t border-stone-200/80">
          <nav
            aria-label="Enlaces legales"
            className="flex flex-wrap items-center justify-start sm:justify-end gap-x-5 sm:gap-x-6 gap-y-1 text-xs sm:text-[13px] text-stone-600 font-sans"
          >
            {LEGAL_ROUTES_ORDER.map((slug) => {
              const doc = LEGAL_DOCUMENTS[slug];
              return (
                <Link
                  key={doc.slug}
                  to={doc.route}
                  className="py-1 sm:py-0.5 hover:text-stone-950 hover:underline underline-offset-4 transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#163a2b]"
                >
                  {doc.navTitle}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </footer>
  );
};
