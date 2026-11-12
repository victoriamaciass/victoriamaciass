import React, { useState, useEffect, useCallback } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Umbral de desplazamiento: 300 píxeles
    const handleScroll = () => {
      const currentScrollY = window.scrollY || document.documentElement.scrollTop;
      setIsVisible(currentScrollY > 300);
    };

    // Comprobación inicial al montar en cliente
    handleScroll();

    // Listener pasivo para máximo rendimiento en scroll
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = useCallback(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Volver al inicio de la página"
      tabIndex={isVisible ? 0 : -1}
      className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#1c3829] text-white shadow-lg hover:bg-[#14281d] hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1c3829] transition-all duration-300 ease-in-out cursor-pointer ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto visible scale-100'
          : 'opacity-0 translate-y-3 pointer-events-none invisible scale-95'
      }`}
    >
      <ArrowUp className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.2]" aria-hidden="true" />
    </button>
  );
};
