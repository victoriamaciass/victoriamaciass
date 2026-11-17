import React from 'react';
import { Link } from 'react-router-dom';
import { LEGAL_DOCUMENTS, LEGAL_ROUTES_ORDER } from '../data/legalDocuments';

export const LegalFooterBlock: React.FC = () => {
  return (
    <div className="mt-6 pt-5 border-t border-stone-200/75 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-6">
      <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-stone-500 font-sans shrink-0">
        Información legal
      </p>

      <nav
        aria-label="Información legal"
        className="flex flex-wrap items-center gap-x-5 sm:gap-x-6 gap-y-0.5 font-sans"
      >
        {LEGAL_ROUTES_ORDER.map((slug) => {
          const doc = LEGAL_DOCUMENTS[slug];
          return (
            <Link
              key={slug}
              to={doc.route}
              className="py-2 sm:py-1 text-xs sm:text-[13px] text-stone-600 hover:text-stone-950 hover:underline underline-offset-4 transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#163a2b]"
            >
              {doc.navTitle}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
