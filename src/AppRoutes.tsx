import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { BookDetailPage } from './pages/BookDetailPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* ==================================================================
          NIVEL 1: Página de Inicio (Home)
          ================================================================== */}
      <Route path="/" element={<HomePage />} />
      <Route path="/victoriamaciass" element={<Navigate to="/" replace />} />

      {/* ==================================================================
          NIVEL 2: Páginas de Categoría
          ================================================================== */}
      <Route path="/mascotas" element={<CategoryPage categorySlug="mascotas" />} />
      <Route path="/mente-emociones" element={<CategoryPage categorySlug="mente-emociones" />} />
      <Route path="/crecimiento-personal" element={<CategoryPage categorySlug="crecimiento-personal" />} />
      <Route path="/cuerpo-salud" element={<CategoryPage categorySlug="cuerpo-salud" />} />
      <Route path="/cocina" element={<CategoryPage categorySlug="cocina" />} />
      <Route path="/manos-misterio" element={<CategoryPage categorySlug="manos-misterio" />} />

      {/* ==================================================================
          NIVEL 3: Páginas de Libro individuales (ej. /varices, /gallinas, /gatos)
          ================================================================== */}
      <Route path="/:slug" element={<BookDetailPage />} />

      {/* Redirección por defecto */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
