import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface ScrollPosition {
  x: number;
  y: number;
}

const STORAGE_KEY = 'vm_scroll_positions_v1';
const MAX_STORED_ENTRIES = 60;

function readHistoryKey(): string | null {
  if (typeof window === 'undefined') return null;
  const state = window.history.state as { key?: unknown } | null;
  return typeof state?.key === 'string' && state.key.length > 0 ? state.key : null;
}

function getStorageFallback(entryKey: string): ScrollPosition | undefined {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw) as Record<string, ScrollPosition>;
    const pos = parsed[entryKey];
    if (pos && typeof pos.x === 'number' && typeof pos.y === 'number') {
      return pos;
    }
  } catch {
    // Ignorar errores de acceso a sessionStorage
  }
  return undefined;
}

function writeStorageFallback(positions: Map<string, ScrollPosition>): void {
  try {
    const entries = Array.from(positions.entries()).slice(-MAX_STORED_ENTRIES);
    const obj: Record<string, ScrollPosition> = {};
    for (const [k, v] of entries) {
      obj[k] = v;
    }
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
  } catch {
    // Ignorar errores de acceso a sessionStorage
  }
}

function instantScrollTo(x: number, y: number): void {
  const html = document.documentElement;
  const prevBehavior = html.style.scrollBehavior;
  html.style.scrollBehavior = 'auto';
  window.scrollTo({
    top: y,
    left: x,
    behavior: 'instant' as ScrollBehavior,
  });
  html.style.scrollBehavior = prevBehavior;
}

function scrollToHashElement(hash: string): boolean {
  if (!hash || hash === '#') return false;
  const rawId = hash.slice(1);
  let targetId = rawId;
  try {
    targetId = decodeURIComponent(rawId);
  } catch {
    targetId = rawId;
  }
  if (!targetId) return false;

  const element = document.getElementById(targetId);
  if (!element) return false;

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  element.scrollIntoView({
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
  });
  return true;
}

/**
 * Gestión global del scroll en React Router:
 * - En navegación normal (PUSH / REPLACE): inicia siempre arriba de forma inmediata,
 *   salvo cuando existe un ancla válida (#id) en la URL.
 * - En navegación del historial (Atrás / Adelante - POP): desactiva la restauración
 *   automática del navegador (history.scrollRestoration = 'manual') y recupera la
 *   posición guardada para esa entrada del historial.
 */
export const ScrollToTop: React.FC = () => {
  const location = useLocation();
  const navigationType = useNavigationType();

  const positionsRef = useRef<Map<string, ScrollPosition>>(new Map());
  const settledEntryKeyRef = useRef<string | null>(null);
  const settledPathRef = useRef<string | null>(null);
  const isInitialMountRef = useRef<boolean>(true);
  const isProgrammaticScrollRef = useRef<boolean>(false);

  const entryKey =
    location.key && location.key !== 'default'
      ? location.key
      : `${location.pathname}${location.search}${location.hash}`;

  useEffect(() => {
    if (typeof window === 'undefined' || !('scrollRestoration' in window.history)) {
      return;
    }

    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    const saveCurrentPosition = () => {
      if (isProgrammaticScrollRef.current) return;

      const activeKey = settledEntryKeyRef.current;
      const activePath = settledPathRef.current;
      if (!activeKey || !activePath) return;

      const currentBrowserPath = `${window.location.pathname}${window.location.search}`;
      if (currentBrowserPath !== activePath) return;

      const historyStateKey = readHistoryKey();
      if (historyStateKey !== null && historyStateKey !== activeKey) {
        return;
      }

      const pos: ScrollPosition = {
        x: window.scrollX || document.documentElement.scrollLeft || 0,
        y: window.scrollY || document.documentElement.scrollTop || 0,
      };

      positionsRef.current.set(activeKey, pos);
      if (positionsRef.current.size > MAX_STORED_ENTRIES) {
        const oldestKey = positionsRef.current.keys().next().value;
        if (oldestKey !== undefined) {
          positionsRef.current.delete(oldestKey);
        }
      }
      writeStorageFallback(positionsRef.current);
    };

    window.addEventListener('scroll', saveCurrentPosition, { passive: true });
    window.addEventListener('pagehide', saveCurrentPosition);

    return () => {
      window.removeEventListener('scroll', saveCurrentPosition);
      window.removeEventListener('pagehide', saveCurrentPosition);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const currentPath = `${location.pathname}${location.search}`;
    const prevPath = settledPathRef.current;
    const isSameDocumentPath = prevPath === currentPath;

    let rafId: number | null = null;
    let rafId2: number | null = null;

    if (isInitialMountRef.current) {
      isInitialMountRef.current = false;
      settledEntryKeyRef.current = entryKey;
      settledPathRef.current = currentPath;

      if (location.hash) {
        scrollToHashElement(location.hash);
      } else if (navigationType === 'POP') {
        const saved = positionsRef.current.get(entryKey) ?? getStorageFallback(entryKey);
        if (saved) {
          instantScrollTo(saved.x, saved.y);
        }
      }
      return;
    }

    // Navegación dentro de la misma ruta hacia o desde un identificador de ancla
    if (isSameDocumentPath && location.hash) {
      settledEntryKeyRef.current = entryKey;
      settledPathRef.current = currentPath;

      if (navigationType === 'POP') {
        const saved = positionsRef.current.get(entryKey) ?? getStorageFallback(entryKey);
        if (saved) {
          isProgrammaticScrollRef.current = true;
          instantScrollTo(saved.x, saved.y);
          rafId = window.requestAnimationFrame(() => {
            isProgrammaticScrollRef.current = false;
          });
          return () => {
            if (rafId !== null) window.cancelAnimationFrame(rafId);
            isProgrammaticScrollRef.current = false;
          };
        }
      }

      scrollToHashElement(location.hash);
      return;
    }

    if (navigationType === 'POP') {
      const saved = positionsRef.current.get(entryKey) ?? getStorageFallback(entryKey);
      settledEntryKeyRef.current = entryKey;
      settledPathRef.current = currentPath;

      if (saved) {
        isProgrammaticScrollRef.current = true;
        instantScrollTo(saved.x, saved.y);
        rafId = window.requestAnimationFrame(() => {
          instantScrollTo(saved.x, saved.y);
          rafId2 = window.requestAnimationFrame(() => {
            isProgrammaticScrollRef.current = false;
          });
        });
      } else if (location.hash) {
        scrollToHashElement(location.hash);
      } else {
        isProgrammaticScrollRef.current = true;
        instantScrollTo(0, 0);
        rafId = window.requestAnimationFrame(() => {
          isProgrammaticScrollRef.current = false;
        });
      }
    } else {
      // Navegación normal (PUSH / REPLACE)
      settledEntryKeyRef.current = entryKey;
      settledPathRef.current = currentPath;

      if (location.hash && scrollToHashElement(location.hash)) {
        positionsRef.current.set(entryKey, {
          x: window.scrollX || 0,
          y: window.scrollY || 0,
        });
        writeStorageFallback(positionsRef.current);
      } else {
        isProgrammaticScrollRef.current = true;
        instantScrollTo(0, 0);
        positionsRef.current.set(entryKey, { x: 0, y: 0 });
        writeStorageFallback(positionsRef.current);
        rafId = window.requestAnimationFrame(() => {
          instantScrollTo(0, 0);
          isProgrammaticScrollRef.current = false;
        });
      }
    }

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      if (rafId2 !== null) window.cancelAnimationFrame(rafId2);
      isProgrammaticScrollRef.current = false;
    };
  }, [entryKey, location.pathname, location.search, location.hash, navigationType]);

  return null;
};
