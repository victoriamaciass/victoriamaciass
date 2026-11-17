import React from 'react';
import { Link } from 'react-router-dom';
import { GlobalNavbar } from '../components/GlobalNavbar';
import { Footer } from '../components/Footer';
import { LEGAL_DOCUMENTS, LegalSlug } from '../data/legalDocuments';

interface LegalPageProps {
  slug: LegalSlug;
}

function renderInlineFormattedText(text: string): React.ReactNode[] {
  const tokenRegex =
    /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|https:\/\/[^\s),;]+|custoni12@gmail\.com)/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, idx) => {
    if (!part) return null;

    if (part.startsWith('**') && part.endsWith('**')) {
      const inner = part.slice(2, -2);
      if (inner === 'custoni12@gmail.com') {
        return (
          <strong key={idx} className="font-semibold text-stone-900">
            <a
              href="mailto:custoni12@gmail.com"
              className="text-[#163a2b] hover:text-[#102a1f] underline underline-offset-4 transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#163a2b]"
            >
              custoni12@gmail.com
            </a>
          </strong>
        );
      }
      return (
        <strong key={idx} className="font-semibold text-stone-900">
          {inner}
        </strong>
      );
    }

    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <em key={idx} className="italic text-stone-800">
          {part.slice(1, -1)}
        </em>
      );
    }

    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={idx}
          className="font-mono text-[0.9em] text-stone-900 bg-stone-100/90 border border-stone-200/80 px-1.5 py-0.5 rounded"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    if (part === 'custoni12@gmail.com') {
      return (
        <a
          key={idx}
          href="mailto:custoni12@gmail.com"
          className="text-[#163a2b] hover:text-[#102a1f] underline underline-offset-4 transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#163a2b]"
        >
          custoni12@gmail.com
        </a>
      );
    }

    if (part.startsWith('https://')) {
      const trailingMatch = part.match(/^(https:\/\/[^\s]*?)([.,;:]+)?$/);
      const url = trailingMatch ? trailingMatch[1] : part;
      const trailing = trailingMatch?.[2] || '';

      if (url === 'https://victoriamaciass.vercel.app/') {
        return (
          <React.Fragment key={idx}>
            <Link
              to="/"
              className="text-[#163a2b] hover:text-[#102a1f] underline underline-offset-4 break-all transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#163a2b]"
            >
              {url}
            </Link>
            {trailing}
          </React.Fragment>
        );
      }

      return (
        <React.Fragment key={idx}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#163a2b] hover:text-[#102a1f] underline underline-offset-4 break-all transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#163a2b]"
          >
            {url}
          </a>
          {trailing}
        </React.Fragment>
      );
    }

    return part;
  });
}

export const LegalPage: React.FC<LegalPageProps> = ({ slug }) => {
  const documentData = LEGAL_DOCUMENTS[slug];

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfbf9] text-stone-900 font-sans selection:bg-stone-200">
      <GlobalNavbar />

      <main className="flex-1 py-12 sm:py-16 md:py-20">
        <article className="max-w-3xl mx-auto px-5 sm:px-6">
          <header className="pb-8 border-b border-stone-200/90">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-[42px] font-bold tracking-tight text-stone-900 leading-[1.15]">
              {documentData.title}
            </h1>
            <p className="mt-3 text-sm text-stone-600 font-sans">
              Fecha: <time dateTime="2026-11-17">{documentData.updatedAt}</time>
            </p>
          </header>

          {documentData.intro.length > 0 && (
            <div className="mt-8 space-y-4 text-[16px] sm:text-[17px] text-stone-700 leading-relaxed font-sans">
              {documentData.intro.map((paragraph, index) => (
                <p key={index}>{renderInlineFormattedText(paragraph)}</p>
              ))}
            </div>
          )}

          <div className="mt-10 space-y-10">
            {documentData.sections.map((section, sectionIdx) => (
              <section key={sectionIdx} className="space-y-4">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#163a2b] tracking-tight leading-snug pt-2">
                  {section.title}
                </h2>

                {section.blocks.map((block, blockIdx) => {
                  if (block.type === 'subheading') {
                    return (
                      <h3
                        key={blockIdx}
                        className="font-serif text-lg sm:text-xl font-semibold text-stone-900 tracking-tight pt-3"
                      >
                        {block.title}
                      </h3>
                    );
                  }

                  if (block.type === 'list') {
                    return (
                      <ul
                        key={blockIdx}
                        className="space-y-2.5 pl-5 list-disc marker:text-[#163a2b] text-[15.5px] sm:text-[16.5px] text-stone-700 leading-relaxed font-sans"
                      >
                        {block.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="pl-1">
                            {renderInlineFormattedText(item)}
                          </li>
                        ))}
                      </ul>
                    );
                  }

                  return (
                    <p
                      key={blockIdx}
                      className="text-[15.5px] sm:text-[16.5px] text-stone-700 leading-relaxed font-sans"
                    >
                      {renderInlineFormattedText(block.text)}
                    </p>
                  );
                })}
              </section>
            ))}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};
