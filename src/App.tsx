/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';
import { useApplyRouteSeo } from './data/seoRegistry';

function SeoManager() {
  const location = useLocation();
  useApplyRouteSeo(location.pathname);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <SeoManager />
      <AppRoutes />
    </BrowserRouter>
  );
}
