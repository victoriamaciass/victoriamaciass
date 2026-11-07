import React from 'react';
import { CategoryId } from '../types/book';
import { Search, X } from 'lucide-react';

interface CategoryFilterBarProps {
  selectedCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categoryCounts: Record<CategoryId, number>;
}

const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'salud-mental', label: 'Salud mental y bienestar' },
  { id: 'desarrollo-personal', label: 'Desarrollo personal' },
  { id: 'salud-cuerpo', label: 'Salud y cuerpo' },
  { id: 'cocina-recetas', label: 'Cocina y recetas' },
  { id: 'mascotas', label: 'Mascotas' },
  { id: 'manualidades-esoterismo', label: 'Manualidades y esoterismo' },
];

export const CategoryFilterBar: React.FC<CategoryFilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  categoryCounts,
}) => {
  return (
    <div id="catalogo-filtros" className="sticky top-20 z-30 bg-[#fbfbf9]/95 backdrop-blur-md py-4 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Category Tabs (Segmented Buttons) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none no-scrollbar">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const count = categoryCounts[cat.id] || 0;

              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-950 hover:bg-stone-100'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[11px] tabular-nums font-mono ${
                      isSelected ? 'text-stone-300' : 'text-stone-400'
                    }`}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px] sm:min-w-[280px]">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar por título o tema..."
              className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-white border border-stone-200 rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-800 focus:border-stone-800 transition-colors shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer p-0.5"
                title="Limpiar búsqueda"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
