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

    // 3b. Inyectar o reemplazar Meta Keywords si está presente
    if (seo.keywords) {
      if (pageHtml.includes('<meta name="keywords"')) {
        pageHtml = pageHtml.replace(
          /<meta\s+name="keywords"\s+content=".*?"\s*\/?>/,
          `<meta name="keywords" content="${escapeHtml(seo.keywords)}" />`
        );
      } else {
        pageHtml = pageHtml.replace(
          '</head>',
          `  <meta name="keywords" content="${escapeHtml(seo.keywords)}" />\n</head>`
        );
      }
    } else if (route === '/motivacion' || route === '/mente' || route === '/numeros' || route === '/varices' || route === '/sudoracion' || route === '/celulitis' || route === '/metabolismo' || route === '/desintoxica') {
      pageHtml = pageHtml.replace(/\s*<meta\s+name="keywords"\s+content=".*?"\s*\/?>\r?\n?/, '\n');
    }

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
      `<meta name="twitter:title" content="${escapeHtml(seo.twitterTitle || seo.ogTitle)}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/,
      `<meta name="twitter:description" content="${escapeHtml(seo.twitterDescription || seo.ogDescription)}" />`
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

    // F2. Botón CTA "Comprar ahora" y ancla "opciones-compra" en las 39 fichas individuales
    const categoryRoutes = ['/cocina', '/mascotas', '/mente-emociones', '/crecimiento-personal', '/cuerpo-salud', '/manos-misterio'];
    if (route !== '/' && !categoryRoutes.includes(route)) {
      if (!content.includes('Comprar ahora')) {
        console.error(`❌ ERROR: No se encontró el botón "Comprar ahora" en la ficha ${route}`);
        failedChecks++;
      }
      if (!content.includes('id="opciones-compra"')) {
        console.error(`❌ ERROR: No se encontró el contenedor id="opciones-compra" en la ficha ${route}`);
        failedChecks++;
      }
      if (!content.includes('href="#opciones-compra"')) {
        console.error(`❌ ERROR: No se encontró el enlace href="#opciones-compra" en la ficha ${route}`);
        failedChecks++;
      }
    }

    // F3. Botón flotante "Volver arriba" presente en las 46 rutas públicas
    if (!content.includes('aria-label="Volver al inicio de la página"')) {
      console.error(`❌ ERROR: No se encontró el botón flotante "Volver arriba" en la ruta ${route}`);
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

      // Verificación de ausencia total de imágenes no autorizadas (unsplash) en /cocina
      if (content.includes('unsplash')) {
        console.error('❌ ERROR: /cocina contiene imágenes no autorizadas (unsplash)');
        failedChecks++;
      }
    }

    // G1. Comprobación específica para /manos-misterio
    if (route === '/manos-misterio') {
      const expectedManosMisterioSlugs = ['velas', 'costura', 'conjuros'];
      for (const s of expectedManosMisterioSlugs) {
        if (!content.includes(`/${s}`)) {
          console.error(`❌ ERROR: /manos-misterio no contiene el enlace al libro /${s}`);
          failedChecks++;
        }
      }

      // Verificación de ausencia total de imágenes no autorizadas (unsplash) en /manos-misterio
      if (content.includes('unsplash')) {
        console.error('❌ ERROR: /manos-misterio contiene imágenes no autorizadas (unsplash)');
        failedChecks++;
      }

      // Verificación de ausencia de enlaces redundantes en las tarjetas de temáticas
      if (content.includes('Ver en catálogo ↓') || content.includes('Ficha del libro')) {
        console.error('❌ ERROR: /manos-misterio contiene enlaces redundantes en la sección de temáticas');
        failedChecks++;
      }
    }

    // G2. Comprobación exhaustiva específica para /gallinas (La Guía De Las Gallinas)
    if (route === '/gallinas') {
      const requiredGallinasStrings = [
        'La Guía De Las Gallinas',
        'Descubre el fascinante mundo de la cría y el cuidado de estas aves y todos sus beneficios',
        'https://www.amazon.com/dp/B0C6PD4NSZ',
        'https://www.amazon.com/dp/B0D78RSW7L',
        'https://www.amazon.com/dp/B0C6P2TZYJ',
        '1-gallinas-libro.jpg',
        'Aprende a conocer el mundo de las gallinas y descubre todo lo que puede ofrecerte su crianza',
        'Un recorrido por los aspectos esenciales de la crianza de gallinas',
        'Gallinas en casa, en el jardín y en espacios reducidos',
        '¿A quién puede interesarle este libro?',
        'Descubre todo lo que hay detrás del mundo de las gallinas',
        'Elige tu edición y comienza a explorar el fascinante mundo de las gallinas.',
        'Portada del libro La Guía De Las Gallinas, de Victoria Maciass',
        'Mascotas',
        '/mascotas',
      ];
      for (const str of requiredGallinasStrings) {
        if (!content.includes(str)) {
          console.error(`❌ ERROR: /gallinas no contiene la cadena requerida: "${str}"`);
          failedChecks++;
        }
      }
    }

    // H. Comprobación exhaustiva específica para /gatos (El Arte de Amar a un Gato)
    if (route === '/gatos') {
      const requiredGatosStrings = [
        'El Arte de Amar a un Gato',
        'Una guía práctica, clara y sincera para entender, cuidar y vivir en armonía con tu compañero felino',
        'https://www.amazon.com/dp/B0FPXR3P93',
        'https://www.amazon.com/dp/B0FPXP3D8L',
        'https://www.amazon.com/dp/B0FPTY88GR',
        '20-gatos-libro.jpg',
        'Comprende a tu gato y descubre una nueva forma de convivir con él',
        'Aprende a comprender el lenguaje y el comportamiento felino',
        'Cuidados, bienestar y convivencia en el hogar',
        'Una relación que evoluciona a lo largo de su vida',
        '¿A quién puede interesarle este libro?',
        'Amar a un gato también significa aprender a comprenderlo',
        'Descubre tu edición y comienza a comprender mejor a tu compañero felino.',
        'Portada del libro El Arte de Amar a un Gato, de Victoria Maciass',
        'Mascotas',
        '/mascotas',
      ];
      for (const str of requiredGatosStrings) {
        if (!content.includes(str)) {
          console.error(`❌ ERROR: /gatos no contiene la cadena requerida: "${str}"`);
          failedChecks++;
        }
      }
    }

    // I. Comprobación exhaustiva específica para /perros (Adiestramiento Canino)
    if (route === '/perros') {
      const requiredPerrosStrings = [
        'Adiestramiento Canino',
        'Guía Completa para Entrenar a tu Perro con Éxito. Desarrollando habilidades avanzadas y fortaleciendo el vínculo humano-canino para una convivencia armoniosa y feliz',
        'https://www.amazon.com/dp/B0CYLZ1B3Z',
        'https://www.amazon.com/dp/B0CYLMLX4X',
        'https://www.amazon.com/dp/B0CYK66WSN',
        '2-perros-libro.jpg',
        'Educar a un perro es mucho más que enseñarle a obedecer: es aprender a comunicarse con él.',
        'Desde las primeras órdenes hasta las habilidades avanzadas',
        'Comprender y abordar los problemas de comportamiento',
        'Entrenamiento avanzado, comunicación y seguridad',
        'Una convivencia que incluye a toda la familia',
        '¿A quién puede interesarle este libro?',
        'Una relación más fuerte empieza por comprenderse',
        'Descubre tu edición y empieza a construir una convivencia más tranquila, segura y satisfactoria junto a tu perro.',
        'Portada del libro Adiestramiento Canino de Victoria Maciass',
        'Mascotas',
        '/mascotas',
      ];
      for (const str of requiredPerrosStrings) {
        if (!content.includes(str)) {
          console.error(`❌ ERROR: /perros no contiene la cadena requerida: "${str}"`);
          failedChecks++;
        }
      }
    }

    // J. Comprobación exhaustiva específica para /ansiedad-vida (Una Vida sin Ansiedad ni Ataques de Pánico)
    if (route === '/ansiedad-vida') {
      const requiredAnsiedadStrings = [
        'Una Vida sin Ansiedad ni Ataques de Pánico',
        'Detenga los ataques de Ansiedad de una vez por todas y viva una vida plena',
        'Comprende la ansiedad y los ataques de pánico, reconoce sus desencadenantes y descubre herramientas para afrontar el miedo y recuperar confianza en tu vida cotidiana.',
        'https://www.amazon.com/dp/B08L4FL7NX',
        'https://www.amazon.com/dp/B09S61YNX6',
        'https://www.amazon.com/dp/B076KS2Z5X',
        '3-ansiedad1-libro.jpg',
        'Portada del libro Una Vida sin Ansiedad ni Ataques de Pánico de Victoria Maciass',
        'cómo superar la ansiedad y los ataques de pánico',
        'recuperar la tranquilidad emocional',
        'Comprender lo que te ocurre es el primer paso para recuperar la confianza',
        'Comprender la ansiedad y reconocer los ataques de pánico',
        'La terapia cognitivo-conductual y la relación con los pensamientos',
        '¿A quién puede interesarle este libro?',
        'Una lectura para comprender, aprender y recuperar confianza',
        'Nota informativa: este libro tiene una finalidad divulgativa y educativa.',
      ];
      for (const str of requiredAnsiedadStrings) {
        if (!content.includes(str)) {
          console.error(`❌ ERROR: /ansiedad-vida no contiene la cadena requerida: "${str}"`);
          failedChecks++;
        }
      }
    }

    // K. Comprobación exhaustiva específica para /ansiedad-liberate (Libérate de la Ansiedad)
    if (route === '/ansiedad-liberate') {
      const requiredLiberateStrings = [
        'Libérate de la Ansiedad',
        'Alimentación, sueño, ejercicio y técnicas de relajación para una mente tranquila',
        'Descubre cómo los hábitos de alimentación, el sueño, el ejercicio y las técnicas de relajación pueden ayudarte a comprender y afrontar la ansiedad desde el cuidado del cuerpo.',
        'cómo reducir la ansiedad de forma natural',
        'rutinas para una mente tranquila',
        'https://www.amazon.com/dp/B0C6BZMH17',
        'https://www.amazon.com/dp/B0D7LXW17T',
        'https://www.amazon.com/dp/B0C66WP2DC',
        '4-ansiedad2-libro.jpg',
        'Portada del libro Libérate de la Ansiedad de Victoria Maciass',
        'Una perspectiva diferente: cuidar el cuerpo para comprender mejor la ansiedad',
        'Alimentación y ansiedad: comprender los hábitos que influyen en el bienestar',
        'El intestino y su relación con el sistema nervioso',
        'Dormir mejor: el papel del descanso en el equilibrio emocional',
        '¿A quién puede interesarle este libro?',
        'Una forma más consciente de cuidar el cuerpo y el bienestar',
        'Nota informativa: este libro tiene una finalidad divulgativa y educativa.',
      ];
      for (const str of requiredLiberateStrings) {
        if (!content.includes(str)) {
          console.error(`❌ ERROR: /ansiedad-liberate no contiene la cadena requerida: "${str}"`);
          failedChecks++;
        }
      }
    }

    // L. Comprobación exhaustiva específica para /ansiedad-control (Cómo Controlar La Ansiedad)
    if (route === '/ansiedad-control') {
      const requiredControlStrings = [
        'Cómo Controlar La Ansiedad',
        'Relaciones, propósito y bienestar emocional después de la ansiedad',
        'Aprende a reconstruir tus relaciones después de la ansiedad, comunicar lo que sientes, establecer límites sanos, recuperar la confianza y encontrar un nuevo propósito.',
        'Aprende a reconstruir tus relaciones, recuperar la confianza y encontrar un propósito después de la ansiedad.',
        'Una guía para reconstruir las relaciones, fortalecer la confianza personal y recuperar el propósito después de la ansiedad.',
        'https://www.amazon.com/dp/B0G3H9V83R',
        'https://www.amazon.com/dp/B0G3H2QV91',
        'https://www.amazon.com/dp/B0G3CMY9CR',
        'https://books2read.com/u/49dJXp',
        '5-ansiedad3-libro.jpg',
        'books2read_logo.png',
        'Portada del libro Cómo Controlar La Ansiedad de Victoria Maciass',
        'Cómo Controlar La Ansiedad: reconstruir tus relaciones, recuperar la confianza y encontrar un nuevo propósito',
        'Comprender cómo la ansiedad modifica tus relaciones',
        '¿Qué encontrarás en este libro?',
        'La vida continúa, y tú también puedes formar parte de ella',
      ];
      for (const str of requiredControlStrings) {
        if (!content.includes(str)) {
          console.error(`❌ ERROR: /ansiedad-control no contiene la cadena requerida: "${str}"`);
          failedChecks++;
        }
      }
    }

    // M. Comprobación exhaustiva específica para /suenos (El Libro de los Sueños)
    if (route === '/suenos') {
      const requiredSuenosStrings = [
        'El Libro de los Sueños',
        'Cuentos clásicos cortos. Que cautivan niños y adultos llevándolos a mundos de fantasía que desatan su imaginación',
        'Descubre 93 cuentos clásicos, fábulas y aventuras para leer en familia, fomentar la imaginación, compartir valores y crear momentos especiales antes de dormir.',
        '93 cuentos clásicos, fábulas y aventuras para compartir en familia, despertar la imaginación y disfrutar de la lectura antes de dormir.',
        'Una colección de 93 cuentos, fábulas y aventuras para imaginar, aprender y compartir momentos de lectura en familia.',
        'https://www.amazon.com/dp/B0C6BWYRPH',
        'https://www.amazon.com/dp/B0FVDNM2V7',
        'https://www.amazon.com/dp/B0C6KS4SP8',
        '9-cuentos-libro.jpg',
        'Portada del libro El Libro de los Sueños de Victoria Maciass',
        'El Libro de los Sueños: cuentos clásicos y aventuras para imaginar, aprender y compartir en familia',
        'Cuentos clásicos que siguen despertando la imaginación',
        '¿Qué encontrarás en El Libro de los Sueños?',
        '¿Qué cuento leemos hoy?',
      ];
      for (const str of requiredSuenosStrings) {
        if (!content.includes(str)) {
          console.error(`❌ ERROR: /suenos no contiene la cadena requerida: "${str}"`);
          failedChecks++;
        }
      }
    }

    // N. Comprobación exhaustiva específica para /velas (Cómo hacer velas Artesanales aromáticas)
    if (route === '/velas') {
      const requiredVelasStrings = [
        'Cómo hacer velas Artesanales aromáticas',
        'Guía completa para crear velas perfumadas con aromas y aceites esenciales paso a paso',
        'https://www.amazon.com/dp/B0F3JTB3NL',
        'https://www.amazon.com/dp/B0F3JNF73F',
        'https://www.amazon.com/dp/B0F3G1BK5P',
        'https://play.google.com/store/books/details?id=iCEnEgAAQBAJ',
        'https://play.google.com/store/audiobooks/details?id=AQAAAEDGfDE85M',
        '17-velas.jpg',
        '¿Alguna vez has soñado con crear tus propias velas aromáticas',
        'Descubre el fascinante mundo de las velas aromáticas hechas a mano',
        'Control total sobre los ingredientes: Usarás ceras naturales',
        'Esta guía está estructurada en 12 capítulos detallados',
        'Manos y misterio',
        '/manos-misterio',
      ];
      for (const str of requiredVelasStrings) {
        if (!content.includes(str)) {
          console.error(`❌ ERROR: /velas no contiene la cadena requerida: "${str}"`);
          failedChecks++;
        }
      }
    }

    // O. Comprobación exhaustiva específica para /costura (La costura que querías aprender)
    if (route === '/costura') {
      const requiredCosturaStrings = [
        'La costura que querías aprender',
        'Una guía diferente que te enseña a crear tus propias prendas con las manos y el corazón',
        'https://www.amazon.com/dp/B0HGMQY9BL',
        'https://www.amazon.com/dp/B0HGMS4K1W',
        'https://www.amazon.com/dp/B0HGMNN2P2',
        '21-costura-libro.jpg',
        '¿Cuántas veces has pensado: «Ojalá supiera coser»?',
        'La Costura que Querías Aprender nace precisamente para acompañarte en ese primer paso.',
        'Esta no es una enciclopedia de costura llena de términos difíciles',
        'Poco a poco, empezarás a entender el lenguaje de la costura.',
        'También descubrirás algo que muchos manuales de costura olvidan mencionar: los errores forman parte del aprendizaje.',
        'Manos y misterio',
        '/manos-misterio',
      ];
      for (const str of requiredCosturaStrings) {
        if (!content.includes(str)) {
          console.error(`❌ ERROR: /costura no contiene la cadena requerida: "${str}"`);
          failedChecks++;
        }
      }
    }

    // P. Comprobación exhaustiva específica para /habitos (Hábitos Transformadores)
    if (route === '/habitos') {
      const requiredHabitosStrings = [
        'Hábitos Transformadores',
        'El camino hacia una vida plena y productiva explorando el poder transformador de nuestras acciones diarias',
        'Descubre cómo crear hábitos saludables, mejorar tu productividad, gestionar el tiempo y construir rutinas para tu crecimiento personal y profesional.',
        'Aprende a identificar tus hábitos, crear rutinas saludables y mejorar tu organización, productividad y crecimiento personal.',
        'Una guía práctica para comprender los hábitos, organizar tus rutinas y avanzar hacia tus objetivos personales y profesionales.',
        'https://www.amazon.com/dp/B0DTYDVX31',
        'https://www.amazon.com/dp/B0G3P9PCJ5',
        'https://www.amazon.com/dp/B0DTV6YKN5',
        'https://books2read.com/u/bOp7v9',
        '11--habitos-libro.jpg',
        'books2read_logo.png',
        'Portada del libro Hábitos Transformadores de Victoria Maciass',
        'Hábitos Transformadores: cómo construir rutinas que impulsen tu bienestar, productividad y crecimiento personal',
        'Comprender la ciencia y la psicología de los hábitos',
        '¿Qué encontrarás en este libro?',
        'Una transformación que empieza con las decisiones de cada día',
      ];
      for (const str of requiredHabitosStrings) {
        if (!content.includes(str)) {
          console.error(`❌ ERROR: /habitos no contiene la cadena requerida: "${str}"`);
          failedChecks++;
        }
      }
    }

    // Q. Comprobación exhaustiva específica para /motivacion (Motivación y Transformación Positiva)
    if (route === '/motivacion') {
      const requiredMotivacionStrings = [
        'Motivación y Transformación Positiva',
        'Despertando tu poder interior en un viaje de autodescubrimiento y crecimiento personal',
        'Motivación y Transformación Positiva: Crecimiento Personal | Victoria Maciass',
        'Descubre cómo fortalecer tu motivación, definir metas, superar obstáculos y crear hábitos positivos con esta guía de autoconocimiento y crecimiento personal.',
        'Un recorrido por la motivación, el autoconocimiento, los hábitos positivos y las estrategias para impulsar tu crecimiento personal y profesional.',
        'Descubre herramientas para fortalecer tu motivación, superar obstáculos y avanzar en tu transformación personal.',
        'https://victoriamaciass.vercel.app/motivacion',
        'https://www.amazon.com/dp/B0C6VZ76P3',
        'https://www.amazon.com/dp/B0C6VZ7HQG',
        'https://www.amazon.com/dp/B0C734JJDY',
        '12--motivacion-libro.jpg',
        'Portada del libro Motivación y Transformación Positiva de Victoria Maciass',
        'Descubre qué te mueve y qué quieres conseguir',
        'Comprende la motivación y aprende a sostenerla',
        'Supera los obstáculos internos que frenan tu avance',
        'Cultiva una mentalidad positiva sin perder de vista la realidad',
        'Visualización, afirmaciones y construcción de hábitos',
        'El entorno también influye en tu transformación',
        'Crecimiento personal, aprendizaje y desarrollo profesional',
        'Aprende de los errores y construye tu propia versión',
        '¿Qué encontrarás en este libro?',
        'Una invitación a comenzar tu propio proceso de cambio',
        'Tu transformación comienza cuando decides participar activamente en ella.',
        'Comprar ahora',
        '#opciones-compra',
      ];
      for (const str of requiredMotivacionStrings) {
        if (!content.includes(str)) {
          console.error(`❌ ERROR: /motivacion no contiene la cadena requerida: "${str}"`);
          failedChecks++;
        }
      }
      if (content.includes('<meta name="keywords"')) {
        console.error('❌ ERROR: /motivacion no debe incluir <meta name="keywords">');
        failedChecks++;
      }
    }

    // R. Comprobación exhaustiva específica para /mente (Despertando la Mente)
    if (route === '/mente') {
      const requiredMenteStrings = [
        'Despertando la Mente',
        'Guía práctica de meditación para principiantes. Descubre técnicas simples para mejorar tu bienestar mental y emocional',
        'Despertando la Mente: Meditación para Principiantes | Victoria Maciass',
        'Aprende meditación desde cero con ejercicios de respiración, mindfulness, meditación guiada y atención plena para integrar la práctica en tu vida diaria.',
        'Despertando la Mente | Guía Práctica de Meditación para Principiantes',
        'Descubre la meditación de la respiración, mindfulness, escáner corporal y ejercicios prácticos para incorporar la atención plena a tu vida cotidiana.',
        'Despertando la Mente: Meditación para Principiantes',
        'Una guía práctica para comenzar a meditar, explorar distintas técnicas y desarrollar una práctica consciente en tu día a día.',
        'https://victoriamaciass.vercel.app/mente',
        'https://www.amazon.com/dp/B0CDFKZ4HQ',
        'https://www.amazon.com/dp/B0CDF7YD17',
        'https://www.amazon.com/dp/B0CDF6CK3F',
        '10-meditacion1-libro.jpg',
        'Portada del libro Despertando la Mente de Victoria Maciass',
        'Comprende qué es la meditación y por qué puede ayudarte',
        'Prepara tu espacio y tu primera práctica',
        'Aprende a meditar con la respiración',
        'Explora mindfulness, escáner corporal y meditación guiada',
        'Lleva la meditación más allá del cojín',
        'Aprende a convivir con los pensamientos y las distracciones',
        'Meditación y emociones: desarrolla una relación más compasiva contigo mismo',
        'Construye el hábito de meditar sin abandonar',
        'Integra la atención plena en tus relaciones y actividades',
        'Profundiza en tu camino y desarrolla una práctica personal',
        '¿Qué encontrarás en Despertando la Mente?',
        'Empieza con unos minutos y descubre lo que puedes aprender',
        'Despertar la mente empieza por aprender a estar presente.',
        'Comprar ahora',
        '#opciones-compra',
      ];
      for (const str of requiredMenteStrings) {
        if (!content.includes(str)) {
          console.error(`❌ ERROR: /mente no contiene la cadena requerida: "${str}"`);
          failedChecks++;
        }
      }
      if (content.includes('<meta name="keywords"')) {
        console.error('❌ ERROR: /mente no debe incluir <meta name="keywords">');
        failedChecks++;
      }
    }

    // S. Comprobación exhaustiva específica para /numeros (La Magia de los Números)
    if (route === '/numeros') {
      const requiredNumerosStrings = [
        'La Magia de los Números',
        'Desbloquea los secretos del universo, revela tu destino y empodérate a través del poder transformador de los números.',
        'La Magia de los Números: Guía de Numerología y Autoconocimiento | Victoria Maciass',
        'Descubre la numerología, calcula tu mapa personal y explora el significado de los números, los ciclos de vida y su simbolismo para conocerte mejor.',
        'https://victoriamaciass.vercel.app/numeros',
        'https://www.amazon.com/dp/B0CCCVZ7NQ',
        'https://www.amazon.com/dp/B0CCCMZW7H',
        'https://www.amazon.com/dp/B0CCK7SRJZ',
        'https://books2read.com/u/47jNGj',
        '13-numerologia-libro.jpg',
        'books2read_logo.png',
        'Portada del libro La Magia de los Números de Victoria Maciass',
        'Descubre tu mapa numerológico personal',
        'El significado de los números del 1 al 9 y los números maestros',
        'Propósito, relaciones y vocación: interpreta tu mapa en distintos ámbitos',
        'Ciclos numerológicos y momentos de cambio',
        'Lleva el simbolismo de los números a tu vida cotidiana',
        'Bienestar integral, responsabilidad y límites de la numerología',
        'Una guía para reflexionar, aprender y evolucionar',
        '¿Para quién es este libro?',
        'Empieza a descubrir el lenguaje simbólico de los números',
        'Tu historia no está escrita por los números: eres tú quien puede utilizarlos como una invitación para conocerse mejor y elegir cómo avanzar.',
        'Pulsa el botón «Comprar ahora» para consultar las ediciones disponibles y elegir la que prefieras.',
        'Comprar ahora',
        '#opciones-compra',
      ];
      for (const str of requiredNumerosStrings) {
        if (!content.includes(str)) {
          console.error(`❌ ERROR: /numeros no contiene la cadena requerida: "${str}"`);
          failedChecks++;
        }
      }
      if (content.includes('<meta name="keywords"')) {
        console.error('❌ ERROR: /numeros no debe incluir <meta name="keywords">');
        failedChecks++;
      }
    }

    // T. Comprobación exhaustiva específica para /varices (Método Varices)
    if (route === '/varices') {
      const requiredVaricesStrings = [
        'Método Varices',
        'El camino hacia unas piernas saludables y radiantes revelado ¡descubre los secretos para recuperar tu confianza y bienestar!',
        'Método Varices: Guía sobre Prevención, Tratamientos y Salud Venosa | Victoria Maciass',
        'Conoce las varices, sus factores de riesgo, prevención y opciones de tratamiento. Una guía sobre salud venosa, cuidados y bienestar de las piernas.',
        'https://victoriamaciass.vercel.app/varices',
        'https://www.amazon.com/dp/B0D7PV1BY8',
        'https://www.amazon.com/dp/B0FR8YD5H7',
        'https://www.amazon.com/dp/B0D57YMQRH',
        'https://play.google.com/store/books/details?id=TYImEgAAQBAJ',
        'https://play.google.com/store/audiobooks/details?id=AQAAAEDGvDz86M',
        '6-varices-libro.jpg',
        'google_play_ebook.png',
        'google_play_audiolibro.png',
        'Portada del libro Método Varices de Victoria Maciass',
        'Comprende qué son las varices y por qué aparecen',
        'Descubre cómo funciona el sistema venoso',
        'Diagnóstico: conoce las formas de evaluar las varices',
        'Prevención y factores de riesgo: hábitos que merecen atención',
        'Tratamientos conservadores: conoce las distintas alternativas',
        'Tratamientos médicos: procedimientos y opciones disponibles',
        'Terapias complementarias: información para evaluar con criterio',
        'Recuperación y cuidados después de un tratamiento',
        'Mitos, autoestima y bienestar emocional',
        'Situaciones especiales: embarazo, edad y actividad física',
        'Nutrición y salud venosa',
        'Un plan de acción para cuidar tus piernas a largo plazo',
        '¿Para quién es Método Varices?',
        'Da un paso hacia un mayor conocimiento de tu salud venosa',
        'Pulsa el botón «Comprar ahora» para acceder a las opciones de compra y elegir el formato que prefieras.',
        'Comprar ahora',
        '#opciones-compra',
      ];
      for (const str of requiredVaricesStrings) {
        if (!content.includes(str)) {
          console.error(`❌ ERROR: /varices no contiene la cadena requerida: "${str}"`);
          failedChecks++;
        }
      }
      if (content.includes('<meta name="keywords"')) {
        console.error('❌ ERROR: /varices no debe incluir <meta name="keywords">');
        failedChecks++;
      }
    }

    // U. Comprobación exhaustiva específica para /sudoracion (Sudoración Excesiva)
    if (route === '/sudoracion') {
      const requiredSudoracionStrings = [
        'Sudoración Excesiva',
        'Como controlar el sudor excesivo y la transpiración, estrategias poderosas para controlar la hiperhidrosis y recuperar el control de tu vida.',
        'Sudoración Excesiva: Guía para Comprender y Controlar la Hiperhidrosis | Victoria Maciass',
        'Conoce las causas de la hiperhidrosis, sus tratamientos, cuidados diarios y estrategias para afrontar la sudoración excesiva y mejorar tu bienestar.',
        'https://victoriamaciass.vercel.app/sudoracion',
        'https://www.amazon.com/dp/B0D7V8H124',
        'https://www.amazon.com/dp/B0H882TL5R',
        'https://www.amazon.com/dp/B0D7TPSLH6',
        '7-sudor-libro.jpg',
        'Portada del libro Sudoración Excesiva de Victoria Maciass',
        'Comprende qué es la hiperhidrosis y por qué sudamos',
        'Factores que pueden contribuir a la sudoración excesiva',
        'El impacto emocional y social de vivir con hiperhidrosis',
        'Diagnóstico: conoce los pasos para evaluar la hiperhidrosis',
        'Tratamientos médicos para controlar la hiperhidrosis',
        'Terapias complementarias: una mirada informada',
        'Consejos prácticos para manejar el sudor en la vida diaria',
        'Cuidado de la piel y prevención de olores',
        'Técnicas de relajación y manejo del estrés',
        'Alimentación, hidratación y sudoración',
        'Ejercicio físico: mitos y realidades',
        'Historias, apoyo y una vida más allá de la hiperhidrosis',
        '¿Para quién es este libro?',
        'Recupera la confianza a través del conocimiento',
        'Pulsa el botón «Comprar ahora» para acceder a las opciones de compra y elegir el formato que prefieras.',
        'Comprar ahora',
        '#opciones-compra',
      ];
      for (const str of requiredSudoracionStrings) {
        if (!content.includes(str)) {
          console.error(`❌ ERROR: /sudoracion no contiene la cadena requerida: "${str}"`);
          failedChecks++;
        }
      }
      if (content.includes('<meta name="keywords"')) {
        console.error('❌ ERROR: /sudoracion no debe incluir <meta name="keywords">');
        failedChecks++;
      }
    }

    // V. Comprobación exhaustiva específica para /celulitis (Celulitis Bajo Control)
    if (route === '/celulitis') {
      const requiredCelulitisStrings = [
        'Celulitis Bajo Control',
        'La guía definitiva para entender la celulitis con estrategias de prevención, métodos de eliminación y tratamientos naturales',
        'Celulitis Bajo Control: Guía para Comprender y Cuidar la Piel | Victoria Maciass',
        'Comprende las causas de la celulitis y descubre estrategias de alimentación, ejercicio, hidratación y cuidados de la piel para mejorar su apariencia.',
        'https://victoriamaciass.vercel.app/celulitis',
        'https://www.amazon.com/dp/B0D8HW7376',
        'https://www.amazon.com/dp/B0H6QLRM56',
        'https://www.amazon.com/dp/B0D8HBZ5CL',
        'https://play.google.com/store/books/details?id=IoEmEgAAQBAJ',
        'https://play.google.com/store/audiobooks/details?id=AQAAAEDGvAz82M',
        '8-celulitis-libro.jpg',
        'Portada del libro Celulitis Bajo Control de Victoria Maciass',
        'La celulitis, conocida popularmente como piel de naranja',
        'Cuidar la piel no debería convertirse en una fuente de presión',
        'descubre una forma más consciente y equilibrada de cuidar tu bienestar.',
        'Comprar ahora',
        '#opciones-compra',
      ];
      for (const str of requiredCelulitisStrings) {
        if (!content.includes(str)) {
          console.error(`❌ ERROR: /celulitis no contiene la cadena requerida: "${str}"`);
          failedChecks++;
        }
      }
      if (content.includes('<meta name="keywords"')) {
        console.error('❌ ERROR: /celulitis no debe incluir <meta name="keywords">');
        failedChecks++;
      }
    }

    // W. Comprobación exhaustiva específica para /metabolismo (Domina tu Metabolismo)
    if (route === '/metabolismo') {
      const requiredMetabolismoStrings = [
        'Domina tu Metabolismo',
        'Rompe con el metabolismo lento, acelera tu quema de calorías y logra un peso saludable para siempre',
        'Domina tu Metabolismo: Alimentación, Energía y Peso Saludable | Victoria Maciass',
        'Comprende cómo funciona el metabolismo y descubre cómo influyen la alimentación, el ejercicio, las hormonas, el sueño y los hábitos en el gasto energético.',
        'https://victoriamaciass.vercel.app/metabolismo',
        '14-metabolismo-libro.jpg',
        'Portada del libro Domina tu Metabolismo de Victoria Maciass',
        '¿Sientes que haces esfuerzos para cuidar tu alimentación, controlar las cantidades o mantenerte activo',
        'El cambio sostenible no empieza con otra solución extrema.',
        'tu actividad física y tu bienestar a largo plazo.',
        'Comprar ahora',
        '#opciones-compra',
        'Próximamente disponible en las principales plataformas comerciales.',
      ];
      for (const str of requiredMetabolismoStrings) {
        if (!content.includes(str)) {
          console.error(`❌ ERROR: /metabolismo no contiene la cadena requerida: "${str}"`);
          failedChecks++;
        }
      }
      if (content.includes('<meta name="keywords"')) {
        console.error('❌ ERROR: /metabolismo no debe incluir <meta name="keywords">');
        failedChecks++;
      }
      for (const unverifiedAsin of ['B0C6BR49GW', 'B0D6YCT1TF', 'B0C6J65GBD']) {
        if (content.includes(unverifiedAsin)) {
          console.error(`❌ ERROR: /metabolismo no debe publicar enlace sin verificar (${unverifiedAsin})`);
          failedChecks++;
        }
      }
    }

    // X. Comprobación exhaustiva específica para /desintoxica (Desintoxica tu cuerpo y mente)
    if (route === '/desintoxica') {
      const requiredDesintoxicaStrings = [
        'Desintoxica tu cuerpo y mente',
        'Guía para eliminar toxinas, recuperar energía y sentirte mejor',
        'Desintoxica tu Cuerpo y Mente: Alimentación y Bienestar | Victoria Maciass',
        'Descubre cómo mejorar tu alimentación, hidratación, descanso y bienestar mental con una guía práctica para construir hábitos saludables y sostenibles.',
        'https://victoriamaciass.vercel.app/desintoxica',
        'https://www.amazon.com/dp/B08L7MNXHV',
        'https://www.amazon.com/dp/B09SFFKJXH',
        'https://www.amazon.com/dp/B078J88JW7',
        '15-detox1-libro.jpg',
        'Portada del libro Desintoxica tu cuerpo y mente de Victoria Maciass',
        'Comprende qué significa realmente desintoxicar el organismo',
        'Alimentación: una base para recuperar buenos hábitos',
        'La importancia de una hidratación adecuada',
        'Sueño, estrés y bienestar mental',
        'Un programa de 14 días para empezar progresivamente',
        '¿A quién puede interesarle este libro?',
        'Empieza a construir una rutina más equilibrada',
        'Empieza hoy a cuidar tu cuerpo, despejar tu mente y crear hábitos que te ayuden a sentirte mejor a largo plazo.',
        'Comprar ahora',
        '#opciones-compra',
      ];
      for (const str of requiredDesintoxicaStrings) {
        if (!content.includes(str)) {
          console.error(`❌ ERROR: /desintoxica no contiene la cadena requerida: "${str}"`);
          failedChecks++;
        }
      }
      if (content.includes('<meta name="keywords"')) {
        console.error('❌ ERROR: /desintoxica no debe incluir <meta name="keywords">');
        failedChecks++;
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
