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
        'https://www.amazon.com/dp/B08L4FL7NX',
        'https://www.amazon.com/dp/B09S61YNX6',
        'https://www.amazon.com/dp/B076KS2Z5X',
        '3-ansiedad1-libro.jpg',
        'Portada del libro Una Vida sin Ansiedad ni Ataques de Pánico de Victoria Maciass',
        'cómo superar la ansiedad y los ataques de pánico',
        'Comprender la ansiedad y los síntomas de los ataques de pánico',
        'Cómo controlar los ataques de pánico en el momento presente',
        'Técnicas de respiración para la ansiedad y regulación somática',
        'Enfoques terapéuticos eficaces: TCC, exposición y aceptación',
        'Estrategias para prevenir la ansiedad y fortalecer la resiliencia diaria',
        '¿A quién está dirigida esta obra?',
        'Cómo recuperar la tranquilidad emocional y reconstruir la confianza',
        'Esta publicación tiene carácter informativo y educativo. No sustituye la evaluación, el diagnóstico ni el tratamiento de profesionales de la salud.',
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
        'https://www.amazon.com/dp/B0C6BZMH17',
        'https://www.amazon.com/dp/B0D7LXW17T',
        'https://www.amazon.com/dp/B0C66WP2DC',
        '4-ansiedad2-libro.jpg',
        'Hay días en los que uno se despierta ya cansado',
        'Porque cuando el cuerpo aprende a calmarse, la mente también encuentra su espacio.',
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
        'https://www.amazon.com/dp/B0G3H9V83R',
        'https://www.amazon.com/dp/B0G3H2QV91',
        'https://www.amazon.com/dp/B0G3CMY9CR',
        'https://books2read.com/u/49dJXp',
        '5-ansiedad3-libro.jpg',
        'books2read.com_logo.jpg',
        'Superar la ansiedad no termina cuando los síntomas físicos desaparecen',
        'Entre sus páginas descubrirás:',
        'Cómo sanar la comunicación con tus seres queridos y expresar lo que sientes con claridad',
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
        'https://www.amazon.com/dp/B0C6BWYRPH',
        'https://www.amazon.com/dp/B0FVDNM2V7',
        'https://www.amazon.com/dp/B0C6KS4SP8',
        '9-cuentos-libro.jpg',
        '¿Buscas un libro que una a tu familia, calme las noches agitadas y siembre valores sin sermones?',
        'Dentro encontrarás una cuidadosa selección de cuentos clásicos adaptados con un enfoque moderno',
        'Ayuda a los niños a manejar sus emociones a través de metáforas suaves y personajes entrañables.',
        'Búsquedas relacionadas:',
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
