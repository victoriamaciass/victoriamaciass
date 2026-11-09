process.env.NODE_ENV = 'production';

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'vite';
import type { RouteSeoData } from '../src/data/seoRegistry';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const distSsrDir = path.resolve(rootDir, 'dist-ssr');

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function prerender() {
  console.log('🚀 Iniciando proceso de prerenderizado estático (SSG)...');

  // 1. Verificar que dist/index.html exista
  const templatePath = path.resolve(distDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error('❌ No se encontró dist/index.html. Ejecute `vite build` antes de prerenderizar.');
  }
  const rawTemplate = fs.readFileSync(templatePath, 'utf-8');

  // 2. Compilar bundle SSR con Vite estrictamente en modo production
  console.log('📦 Compilando bundle de servidor (entry-server.tsx)...');
  await build({
    mode: 'production',
    logLevel: 'warn',
    define: {
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
    build: {
      ssr: path.resolve(rootDir, 'src/entry-server.tsx'),
      outDir: distSsrDir,
      emptyOutDir: true,
    },
    ssr: {
      noExternal: ['react-router-dom', 'react-router'],
    },
    configFile: path.resolve(rootDir, 'vite.config.ts'),
  });

  // 3. Importar dinámicamente la función render de dist-ssr y el registro SEO
  const serverEntryFile = path.resolve(distSsrDir, 'entry-server.js');
  const serverEntryUrl = pathToFileURL(serverEntryFile).href;
  const { render } = await import(serverEntryUrl);

  const { getAllPublicRoutes, getSeoForRoute } = await import('../src/data/seoRegistry');

  const routes = getAllPublicRoutes();
  console.log(`🌐 Prerenderizando ${routes.length} rutas públicas...`);

  let processedCount = 0;

  for (const route of routes) {
    const seo: RouteSeoData | undefined = getSeoForRoute(route);
    if (!seo) {
      console.warn(`⚠️ Advertencia: No se encontraron metadatos para la ruta: ${route}`);
      continue;
    }

    // Renderizar JSX a HTML del cuerpo
    const appHtml = render(route);

    // Inyectar en la plantilla
    let pageHtml = rawTemplate;

    // 1. Inyectar contenido en #root
    pageHtml = pageHtml.replace(
      /<div id="root">[\s\S]*?<\/div>/,
      `<div id="root">${appHtml}</div>`
    );

    // 2. Reemplazar Title
    pageHtml = pageHtml.replace(
      /<title>.*?<\/title>/,
      `<title>${escapeHtml(seo.title)}</title>`
    );

    // 3. Reemplazar Meta Description
    pageHtml = pageHtml.replace(
      /<meta\s+name="description"\s+content=".*?"\s*\/?>/,
      `<meta name="description" content="${escapeHtml(seo.description)}" />`
    );

    // 4. Reemplazar Canonical
    pageHtml = pageHtml.replace(
      /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/,
      `<link rel="canonical" href="${seo.canonical}" />`
    );

    // 5. Reemplazar Open Graph
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/,
      `<meta property="og:title" content="${escapeHtml(seo.ogTitle)}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/,
      `<meta property="og:description" content="${escapeHtml(seo.ogDescription)}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/,
      `<meta property="og:url" content="${seo.ogUrl}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property="og:image"\s+content=".*?"\s*\/?>/,
      `<meta property="og:image" content="${seo.ogImage}" />`
    );
    if (seo.ogType) {
      pageHtml = pageHtml.replace(
        /<meta\s+property="og:type"\s+content=".*?"\s*\/?>/,
        `<meta property="og:type" content="${seo.ogType}" />`
      );
    }

    // 6. Reemplazar Twitter Card
    pageHtml = pageHtml.replace(
      /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/,
      `<meta name="twitter:title" content="${escapeHtml(seo.ogTitle)}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/,
      `<meta name="twitter:description" content="${escapeHtml(seo.ogDescription)}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+name="twitter:image"\s+content=".*?"\s*\/?>/,
      `<meta name="twitter:image" content="${seo.ogImage}" />`
    );

    // 7. Reemplazar Schema.org JSON-LD
    const jsonLdString = JSON.stringify(seo.schemaJsonLd, null, 2);
    pageHtml = pageHtml.replace(
      /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script type="application/ld+json">\n${jsonLdString}\n    </script>`
    );

    // Guardar archivo HTML en disco
    if (route === '/') {
      fs.writeFileSync(path.resolve(distDir, 'index.html'), pageHtml, 'utf-8');
    } else {
      const clean = route.replace(/^\//, '');
      const routeSubDir = path.resolve(distDir, clean);
      if (!fs.existsSync(routeSubDir)) {
        fs.mkdirSync(routeSubDir, { recursive: true });
      }
      // Generar tanto clean/index.html como clean.html para compatibilidad total con Vercel
      fs.writeFileSync(path.resolve(routeSubDir, 'index.html'), pageHtml, 'utf-8');
      fs.writeFileSync(path.resolve(distDir, `${clean}.html`), pageHtml, 'utf-8');
    }
    processedCount++;
  }

  // 4. Limpiar directorio temporal dist-ssr
  if (fs.existsSync(distSsrDir)) {
    fs.rmSync(distSsrDir, { recursive: true, force: true });
  }

  console.log(`✅ ${processedCount} archivos HTML generados con éxito en dist/.`);

  // 5. VERIFICACIÓN AUTOMATIZADA COMPLETA DE LAS 46 RUTAS
  console.log('\n🔍 Ejecutando verificación automática de calidad y SEO sobre las 46 rutas...');
  let failedChecks = 0;

  for (const route of routes) {
    const seo = getSeoForRoute(route)!;
    const filePath = route === '/'
      ? path.resolve(distDir, 'index.html')
      : path.resolve(distDir, route.replace(/^\//, ''), 'index.html');

    if (route !== '/') {
      const cleanFile = path.resolve(distDir, `${route.replace(/^\//, '')}.html`);
      if (!fs.existsSync(cleanFile)) {
        console.error(`❌ ERROR: Archivo .html no generado para ${route} en ${cleanFile}`);
        failedChecks++;
      }
    }

    if (!fs.existsSync(filePath)) {
      console.error(`❌ ERROR: Archivo no generado para ${route} en ${filePath}`);
      failedChecks++;
      continue;
    }

    const content = fs.readFileSync(filePath, 'utf-8');

    // A. Tamaño de archivo
    if (content.length < 2000) {
      console.error(`❌ ERROR: Archivo para ${route} es demasiado pequeño (${content.length} bytes).`);
      failedChecks++;
    }

    // B. Title específico
    if (!content.includes(`<title>${escapeHtml(seo.title)}</title>`)) {
      console.error(`❌ ERROR: Title incorrecto en ${route}`);
      failedChecks++;
    }

    // C. Canonical exacto
    if (!content.includes(`<link rel="canonical" href="${seo.canonical}" />`)) {
      console.error(`❌ ERROR: Canonical incorrecto en ${route}. Esperado: ${seo.canonical}`);
      failedChecks++;
    }

    // D. Verificar que no contenga el canonical de la Home por error si no es la Home
    if (route !== '/' && content.includes('<link rel="canonical" href="https://victoriamaciass.vercel.app/" />')) {
      console.error(`❌ ERROR: ${route} contiene el canonical de la Home.`);
      failedChecks++;
    }

    // E. H1 presente en el HTML
    if (!content.includes('<h1')) {
      console.error(`❌ ERROR: No se encontró etiqueta <h1> en el HTML inicial de ${route}`);
      failedChecks++;
    }

    // F. JSON-LD presente y válido
    if (!content.includes('type="application/ld+json"')) {
      console.error(`❌ ERROR: No se encontró script JSON-LD en ${route}`);
      failedChecks++;
    }

    // G. Comprobación exhaustiva específica para /cocina
    if (route === '/cocina') {
      // 18 libros
      const expectedSlugs = [
        'ensaladas-sabores', 'ensaladas-150', 'recetas-bajar-peso', 'recetas-fitness',
        'recetas-quinoa', 'aderezos', 'arte-paella', 'paellas-100', 'arroces-alma',
        'carnes-rojas', 'recetas-pollo', 'sabores-irresistibles', 'recetas-variadas',
        'cocina-deliciosa', 'cocina-espanol', 'freidora-aire', 'galletas-epicas',
        'sistema-inmunologico'
      ];
      for (const s of expectedSlugs) {
        if (!content.includes(`/${s}`)) {
          console.error(`❌ ERROR: /cocina no contiene el enlace al libro /${s}`);
          failedChecks++;
        }
      }

      // 9 secciones editoriales
      const expectedH2Titles = [
        'Libros de cocina y recetas para descubrir nuevos sabores',
        'Libros de recetas saludables y cocina variada',
        'Libros de recetas de ensaladas',
        'Libros de recetas con quinoa',
        'Libros de cocina mediterránea, paellas y arroces',
        'Libros de recetas de carnes y pollo',
        'Libros de recetas para freidora de aire',
        'Libros de recetas de galletas y repostería',
        'Encuentra el recetario que buscas'
      ];
      for (const h2 of expectedH2Titles) {
        if (!content.includes(h2)) {
          console.error(`❌ ERROR: /cocina no contiene la sección editorial H2 "${h2}"`);
          failedChecks++;
        }
      }
    }
  }

  if (failedChecks > 0) {
    throw new Error(`❌ Se detectaron ${failedChecks} fallos en la verificación de las rutas.`);
  }

  console.log(`✨ ¡Verificación exitosa! Las ${routes.length} rutas tienen HTML completo, H1, metadatos y canonicals correctos.\n`);
}

prerender().catch((err) => {
  console.error(err);
  process.exit(1);
});
