import React from 'react';
import { Feather, Heart, BookMarked, Coffee } from 'lucide-react';

export const AboutAuthorSection: React.FC = () => {
  return (
    <section id="sobre-autora" className="py-16 md:py-24 border-t border-stone-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Author Portrait Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative max-w-sm sm:max-w-md w-full">
              {/* Background decorative frame */}
              <div 
                className="absolute inset-0 bg-stone-100 rounded-3xl -rotate-2 transform transition-transform duration-300" 
                aria-hidden="true" 
              />
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-200 bg-stone-100">
                <img
                  src="https://ik.imagekit.io/hr20qlpupi/victoria/avatar.jpg"
                  alt="Retrato oficial de la autora Victoria Maciass"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover aspect-square transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
              <div className="mt-4 text-center">
                <p className="font-serif italic text-sm text-stone-600">
                  "El verdadero bienestar comienza con la sencillez de los pequeños gestos diarios."
                </p>
                <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mt-1">
                  — Victoria Maciass
                </p>
              </div>
            </div>
          </div>

          {/* Author Biography & Philosophy */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider mb-2">
              <Feather className="w-4 h-4 text-amber-600" />
              <span>Biografía & Filosofía</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight leading-tight">
              Sobre la autora: Victoria Maciass
            </h2>

            <div className="mt-6 space-y-4 text-sm sm:text-base text-stone-600 leading-relaxed font-sans">
              <p>
                Victoria Maciass es una prolífica escritora y divulgadora apasionada por la integración armónica del bienestar físico, mental y doméstico. Con una formación multidisciplinar en nutrición consciente, psicología práctica y oficios tradicionales, su obra ha conectado con decenas de miles de lectores en España e Hispanoamérica.
              </p>
              <p>
                Su catálogo editorial abarca desde la serenidad emocional y la gestión de la ansiedad somática, hasta la crianza respetuosa de animales en el hogar (gallinas, gatos y perros), la alquimia de las velas aromáticas y una extensa serie de 17 recetarios compactos pensados para comer sano y con placer.
              </p>
              <p>
                La premisa central de su trabajo es clara: la información más valiosa es aquella que puede aplicarse de inmediato en la cocina, en el jardín o antes de ir a dormir, sin complicaciones innecesarias ni dogmas rígidos.
              </p>
            </div>

            {/* Author Pillars */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-stone-100">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-stone-900">Enfoque Somático</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">Escucha al cuerpo y serenidad cotidiana</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                  <Coffee className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-stone-900">Cocina Real</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">Recetas sencillas con ingredientes puros</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
                  <BookMarked className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-stone-900">Autosuficiencia</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">Hogares sostenibles y oficios nobles</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
