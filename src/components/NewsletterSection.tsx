import React, { useState } from 'react';
import { Mail, CheckCircle2, Gift, ArrowRight } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Por favor, introduce una dirección de correo electrónico válida.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <section id="newsletter" className="py-16 md:py-20 bg-stone-900 text-stone-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-800 text-amber-300 text-xs font-medium mb-4">
          <Gift className="w-3.5 h-3.5" />
          <span>Boletín Exclusivo de Lectores</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
          Únete al Club de Lectores de Victoria Maciass
        </h2>

        <p className="text-stone-300 text-sm sm:text-base max-w-xl mx-auto mb-8 font-sans leading-relaxed">
          Recibe en tu bandeja de entrada reflexiones semanales, recetas exclusivas de temporada y acceso prioritario con descuento a cada nuevo lanzamiento editorial.
        </p>

        {submitted ? (
          <div className="p-6 bg-stone-800/80 border border-stone-700 rounded-2xl max-w-md mx-auto text-center animate-fade-in">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-white mb-1">
              ¡Bienvenido al Club de Lectores!
            </h3>
            <p className="text-xs sm:text-sm text-stone-300">
              Hemos enviado tu guía de bienvenida gratuita y el primer capítulo de muestra a <strong>{email}</strong>.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setEmail('');
              }}
              className="mt-4 text-xs text-amber-300 hover:text-amber-200 underline cursor-pointer"
            >
              Registrar otro correo
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Tu correo electrónico..."
                  className="w-full pl-9 pr-4 py-3 text-sm bg-stone-800 border border-stone-700 rounded-lg text-white placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-400 focus:border-amber-400 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 text-sm font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 shrink-0 shadow-sm"
              >
                <span>Suscribirme</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {error && (
              <p className="text-rose-400 text-xs mt-2 text-left">{error}</p>
            )}

            <p className="text-[11px] text-stone-400 mt-3">
              Sin spam. Respetamos tu privacidad. Puedes darte de baja en cualquier momento con un solo clic.
            </p>
          </form>
        )}
      </div>
    </section>
  );
};
