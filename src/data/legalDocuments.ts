export type LegalSlug =
  | 'politica-privacidad'
  | 'politica-cookies'
  | 'terminos-condiciones'
  | 'aviso-legal';

export type LegalBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'subheading'; title: string };

export interface LegalSection {
  title: string;
  blocks: LegalBlock[];
}

export interface LegalDocumentData {
  slug: LegalSlug;
  route: `/${LegalSlug}`;
  navTitle: string;
  title: string;
  updatedAt: string;
  seoTitle: string;
  seoDescription: string;
  intro: string[];
  sections: LegalSection[];
}

export const LEGAL_DOCUMENTS: Record<LegalSlug, LegalDocumentData> = {
  'politica-privacidad': {
    slug: 'politica-privacidad',
    route: '/politica-privacidad',
    navTitle: 'Política de privacidad',
    title: 'Política de privacidad',
    updatedAt: '17 de noviembre de 2026',
    seoTitle: 'Política de privacidad | Victoria Maciass',
    seoDescription:
      'Consulta la política de privacidad de Victoria Maciass y conoce cómo se trata la información durante la navegación por nuestro sitio web.',
    intro: [
      'En Victoria Maciass respetamos la privacidad de las personas que visitan nuestro sitio web y procuramos tratar sus datos personales de forma responsable, transparente y limitada a lo necesario.',
      'Esta Política de privacidad explica qué información puede tratarse durante la navegación por https://victoriamaciass.vercel.app/, con qué finalidad y qué derechos pueden ejercer los visitantes.',
    ],
    sections: [
      {
        title: '1. Responsable del tratamiento',
        blocks: [
          {
            type: 'paragraph',
            text: 'El sitio web y el proyecto editorial se gestionan bajo el nombre **Victoria Maciass**, seudónimo editorial utilizado para la publicación y presentación de libros.',
          },
          {
            type: 'paragraph',
            text: 'País de gestión: Brasil.',
          },
          {
            type: 'paragraph',
            text: 'Contacto para cuestiones de privacidad y protección de datos: **custoni12@gmail.com**.',
          },
        ],
      },
      {
        title: '2. Qué datos pueden tratarse',
        blocks: [
          {
            type: 'paragraph',
            text: 'El sitio no dispone de formularios de registro, cuentas de usuario, newsletter ni sistemas propios de compra.',
          },
          {
            type: 'paragraph',
            text: 'Sin embargo, durante la navegación pueden tratarse determinados datos técnicos y de uso, entre ellos:',
          },
          {
            type: 'list',
            items: [
              'Dirección IP y datos técnicos del dispositivo y navegador.',
              'Información sobre las páginas visitadas y la navegación por el sitio.',
              'Fecha, hora y duración aproximada de las visitas.',
              'Información estadística sobre el uso del sitio.',
              'Datos almacenados localmente en el navegador para determinadas funciones, como los favoritos y la conservación de la posición de desplazamiento.',
            ],
          },
          {
            type: 'paragraph',
            text: 'No solicitamos deliberadamente datos personales sensibles ni información personal para permitir la consulta del catálogo.',
          },
        ],
      },
      {
        title: '3. Finalidad del tratamiento',
        blocks: [
          {
            type: 'paragraph',
            text: 'La información técnica y estadística puede utilizarse para:',
          },
          {
            type: 'list',
            items: [
              'Mantener el funcionamiento y la seguridad del sitio.',
              'Comprender cómo se utiliza el catálogo.',
              'Obtener estadísticas generales de visitas y navegación.',
              'Detectar errores y mejorar la experiencia de lectura y consulta.',
            ],
          },
          {
            type: 'paragraph',
            text: 'Los datos almacenados localmente para funciones como favoritos o conservación del desplazamiento se utilizan para ofrecer esas funcionalidades en el propio dispositivo.',
          },
        ],
      },
      {
        title: '4. Google Analytics y Google Tag Manager',
        blocks: [
          {
            type: 'paragraph',
            text: 'Este sitio utiliza tecnologías de Google:',
          },
          {
            type: 'list',
            items: [
              '**Google Analytics 4:** identificador de medición `G-Z5543MKN77`, destinado a obtener estadísticas sobre el uso del sitio.',
              '**Google Tag Manager:** identificador de contenedor `GTM-KZZCD2XP`, utilizado para gestionar etiquetas y herramientas de medición.',
            ],
          },
          {
            type: 'paragraph',
            text: 'Estas tecnologías pueden utilizar cookies y otros identificadores para recopilar información técnica y de navegación. La información puede ser tratada por Google conforme a sus propias condiciones y políticas de privacidad.',
          },
          {
            type: 'paragraph',
            text: 'El código actual del sitio carga los recursos de Google Analytics y Google Tag Manager durante la apertura de las páginas. La disponibilidad de esta información en esta política no significa que el visitante haya prestado consentimiento cuando este sea legalmente necesario.',
          },
          {
            type: 'paragraph',
            text: 'Más información:',
          },
          {
            type: 'list',
            items: [
              'https://policies.google.com/privacy',
              'https://policies.google.com/technologies/cookies',
            ],
          },
        ],
      },
      {
        title: '5. Proveedores y servicios externos',
        blocks: [
          {
            type: 'paragraph',
            text: 'Para mostrar y mantener el sitio pueden intervenir proveedores tecnológicos, entre ellos:',
          },
          {
            type: 'list',
            items: [
              '**Vercel:** alojamiento y distribución del sitio web.',
              '**ImageKit:** alojamiento y entrega de imágenes.',
              '**Google:** servicios de medición y gestión de etiquetas.',
              '**Google Fonts:** distribución de tipografías.',
            ],
          },
          {
            type: 'paragraph',
            text: 'Estos proveedores pueden tratar determinados datos técnicos necesarios para prestar sus servicios, de acuerdo con sus propias políticas y condiciones.',
          },
        ],
      },
      {
        title: '6. Enlaces a plataformas externas',
        blocks: [
          {
            type: 'paragraph',
            text: 'Las fichas de los libros pueden incluir enlaces a plataformas como Amazon, Google Play Books y otras tiendas o servicios de lectura.',
          },
          {
            type: 'paragraph',
            text: 'Al acceder a esos enlaces, el visitante abandona el sitio de Victoria Maciass y pasa a estar sujeto a las políticas de privacidad y condiciones de la plataforma correspondiente.',
          },
          {
            type: 'paragraph',
            text: 'Las compras, los pagos, los envíos, las descargas y cualquier gestión posterior se realizan directamente en dichas plataformas, no a través de un sistema de compra propio de este sitio.',
          },
          {
            type: 'paragraph',
            text: 'Victoria Maciass no recibe comisiones de afiliación por los enlaces publicados actualmente.',
          },
        ],
      },
      {
        title: '7. Conservación de la información',
        blocks: [
          {
            type: 'paragraph',
            text: 'Los datos técnicos y estadísticos se conservan durante el tiempo necesario para las finalidades descritas y conforme a los plazos y configuraciones de los proveedores correspondientes.',
          },
          {
            type: 'paragraph',
            text: 'La información guardada localmente en el navegador puede permanecer hasta que el visitante la elimine o borre los datos del sitio desde la configuración de su dispositivo o navegador.',
          },
        ],
      },
      {
        title: '8. Derechos de las personas',
        blocks: [
          {
            type: 'paragraph',
            text: 'De acuerdo con la legislación aplicable, especialmente la Ley General de Protección de Datos de Brasil (LGPD), las personas pueden solicitar información sobre el tratamiento de sus datos y ejercer los derechos que les correspondan, como:',
          },
          {
            type: 'list',
            items: [
              'Confirmación de la existencia de tratamiento.',
              'Acceso a los datos personales.',
              'Corrección de datos incompletos, inexactos o desactualizados.',
              'Anonimización, bloqueo o eliminación cuando proceda legalmente.',
              'Información sobre el uso compartido de datos.',
              'Revocación del consentimiento, cuando el tratamiento se base en él.',
            ],
          },
          {
            type: 'paragraph',
            text: 'Para realizar una solicitud, escribe a **custoni12@gmail.com**, indicando el motivo de la consulta y la solicitud concreta.',
          },
        ],
      },
      {
        title: '9. Seguridad',
        blocks: [
          {
            type: 'paragraph',
            text: 'Se adoptan medidas técnicas y organizativas razonables para proteger el sitio y la información tratada. No obstante, ningún sistema de transmisión o almacenamiento electrónico puede garantizar una seguridad absoluta.',
          },
        ],
      },
      {
        title: '10. Cambios en esta política',
        blocks: [
          {
            type: 'paragraph',
            text: 'Esta política puede actualizarse cuando cambien las funcionalidades del sitio, los servicios utilizados o las disposiciones legales aplicables. La versión vigente estará disponible en esta página.',
          },
        ],
      },
      {
        title: '11. Contacto',
        blocks: [
          {
            type: 'paragraph',
            text: 'Para cualquier consulta relacionada con esta Política de privacidad o con el tratamiento de datos personales:',
          },
          {
            type: 'paragraph',
            text: '**Correo electrónico:** custoni12@gmail.com',
          },
          {
            type: 'paragraph',
            text: '**Sitio web:** https://victoriamaciass.vercel.app/',
          },
        ],
      },
    ],
  },

  'politica-cookies': {
    slug: 'politica-cookies',
    route: '/politica-cookies',
    navTitle: 'Política de cookies',
    title: 'Política de cookies',
    updatedAt: '17 de noviembre de 2026',
    seoTitle: 'Política de cookies | Victoria Maciass',
    seoDescription:
      'Información sobre las cookies y tecnologías similares utilizadas en el sitio web de Victoria Maciass y cómo gestionar su uso.',
    intro: [
      'El sitio web de **Victoria Maciass** utiliza cookies y tecnologías similares que pueden ser necesarias para su funcionamiento y para obtener estadísticas sobre su utilización.',
      'Esta política explica qué son estas tecnologías, cuáles pueden utilizarse en el sitio y cómo gestionar su uso.',
    ],
    sections: [
      {
        title: '1. ¿Qué son las cookies?',
        blocks: [
          {
            type: 'paragraph',
            text: 'Las cookies son pequeños archivos que un sitio web puede guardar en el navegador del visitante. Permiten recordar información sobre la navegación, mantener determinadas funciones y obtener estadísticas de utilización.',
          },
          {
            type: 'paragraph',
            text: 'También existen tecnologías similares, como el almacenamiento local del navegador (*localStorage*) y el almacenamiento de sesión (*sessionStorage*).',
          },
        ],
      },
      {
        title: '2. Tecnologías utilizadas en este sitio',
        blocks: [
          {
            type: 'subheading',
            title: 'Google Analytics 4',
          },
          {
            type: 'paragraph',
            text: 'El sitio incorpora Google Analytics 4, con identificador `G-Z5543MKN77`, para obtener información estadística sobre las visitas y comprender cómo se utiliza el catálogo.',
          },
          {
            type: 'paragraph',
            text: 'Este servicio puede utilizar cookies u otros identificadores de medición.',
          },
          {
            type: 'subheading',
            title: 'Google Tag Manager',
          },
          {
            type: 'paragraph',
            text: 'El sitio utiliza Google Tag Manager, con identificador `GTM-KZZCD2XP`, para gestionar etiquetas y herramientas integradas.',
          },
          {
            type: 'paragraph',
            text: 'Google Tag Manager es un sistema de gestión de etiquetas. Las cookies que puedan instalarse dependerán de las etiquetas y servicios que se ejecuten a través del contenedor.',
          },
          {
            type: 'subheading',
            title: 'Almacenamiento local del navegador',
          },
          {
            type: 'paragraph',
            text: 'El código del sitio utiliza almacenamiento del navegador para algunas funciones propias:',
          },
          {
            type: 'list',
            items: [
              'Recordar los libros marcados como favoritos.',
              'Conservar temporalmente la posición de desplazamiento durante la navegación.',
            ],
          },
          {
            type: 'paragraph',
            text: 'Estas funciones utilizan almacenamiento local o de sesión y no constituyen por sí mismas un sistema de seguimiento publicitario.',
          },
        ],
      },
      {
        title: '3. ¿Para qué se utilizan?',
        blocks: [
          {
            type: 'paragraph',
            text: 'Las tecnologías descritas pueden servir para:',
          },
          {
            type: 'list',
            items: [
              'Mantener determinadas funciones del sitio.',
              'Recordar preferencias o acciones del visitante.',
              'Medir visitas y actividad general.',
              'Analizar el funcionamiento y mejorar la experiencia de navegación.',
            ],
          },
          {
            type: 'paragraph',
            text: 'El sitio no utiliza actualmente enlaces de afiliación ni declara utilizar cookies para campañas publicitarias propias.',
          },
        ],
      },
      {
        title: '4. Gestión de cookies',
        blocks: [
          {
            type: 'paragraph',
            text: 'El visitante puede consultar, bloquear o eliminar cookies desde la configuración de su navegador. También puede eliminar los datos locales almacenados por el sitio.',
          },
          {
            type: 'paragraph',
            text: 'La desactivación de determinadas tecnologías puede afectar al funcionamiento de algunas características.',
          },
          {
            type: 'paragraph',
            text: 'Ten en cuenta que bloquear cookies desde el navegador no garantiza necesariamente que todos los recursos externos dejen de recibir datos técnicos de conexión.',
          },
        ],
      },
      {
        title: '5. Servicios de terceros',
        blocks: [
          {
            type: 'paragraph',
            text: 'Algunos recursos del sitio son proporcionados por terceros, como Google, Google Fonts, ImageKit y Vercel. Estos proveedores pueden tratar información técnica cuando el navegador solicita sus recursos.',
          },
          {
            type: 'paragraph',
            text: 'Las condiciones y prácticas de estos servicios se explican en sus respectivas políticas:',
          },
          {
            type: 'list',
            items: [
              'Google: https://policies.google.com/privacy',
              'Google sobre cookies: https://policies.google.com/technologies/cookies',
            ],
          },
        ],
      },
      {
        title: '6. Consentimiento y configuración',
        blocks: [
          {
            type: 'paragraph',
            text: 'El código actualmente auditado carga Google Analytics y Google Tag Manager durante la apertura de las páginas. La publicación de esta política no equivale a un mecanismo de consentimiento ni lo sustituye.',
          },
          {
            type: 'paragraph',
            text: 'Cuando la legislación aplicable exija consentimiento previo para determinadas cookies o tecnologías no esenciales, su utilización deberá ajustarse a ese requisito mediante la configuración técnica correspondiente.',
          },
        ],
      },
      {
        title: '7. Actualizaciones',
        blocks: [
          {
            type: 'paragraph',
            text: 'Esta Política de cookies puede modificarse si se incorporan nuevas herramientas, cambian las tecnologías utilizadas o se producen cambios normativos.',
          },
        ],
      },
      {
        title: '8. Contacto',
        blocks: [
          {
            type: 'paragraph',
            text: 'Para cualquier consulta sobre el uso de cookies y tecnologías similares:',
          },
          {
            type: 'paragraph',
            text: '**Correo electrónico:** custoni12@gmail.com',
          },
          {
            type: 'paragraph',
            text: '**Sitio web:** https://victoriamaciass.vercel.app/',
          },
        ],
      },
    ],
  },

  'terminos-condiciones': {
    slug: 'terminos-condiciones',
    route: '/terminos-condiciones',
    navTitle: 'Términos y condiciones',
    title: 'Términos y condiciones de uso',
    updatedAt: '17 de noviembre de 2026',
    seoTitle: 'Términos y condiciones de uso | Victoria Maciass',
    seoDescription:
      'Consulta las condiciones de uso del sitio web de Victoria Maciass, su catálogo editorial y los enlaces a plataformas externas.',
    intro: [
      'Bienvenido al sitio web de **Victoria Maciass**: https://victoriamaciass.vercel.app/.',
      'El acceso y la navegación por este sitio implican la aceptación de estos términos de uso. Si no estás de acuerdo con ellos, te recomendamos que no utilices el sitio.',
    ],
    sections: [
      {
        title: '1. Finalidad del sitio',
        blocks: [
          {
            type: 'paragraph',
            text: 'Victoria Maciass es un proyecto editorial destinado a presentar un catálogo de libros, ofrecer información sobre sus publicaciones y facilitar el acceso a las plataformas externas donde pueden consultarse o adquirirse.',
          },
          {
            type: 'paragraph',
            text: 'El sitio funciona como catálogo informativo. No dispone de un sistema propio de pago, carrito de compra ni gestión de pedidos.',
          },
        ],
      },
      {
        title: '2. Propiedad intelectual',
        blocks: [
          {
            type: 'paragraph',
            text: 'Los textos, descripciones, elementos gráficos, diseños, logotipos y demás contenidos propios del sitio están protegidos por las normas aplicables de propiedad intelectual.',
          },
          {
            type: 'paragraph',
            text: 'Salvo autorización expresa o excepción legal, no está permitida su reproducción, distribución, modificación o utilización comercial sin autorización de sus titulares.',
          },
          {
            type: 'paragraph',
            text: 'Las marcas, logotipos, portadas y materiales pertenecientes a terceros conservan sus respectivos derechos y titularidades.',
          },
        ],
      },
      {
        title: '3. Información sobre los libros',
        blocks: [
          {
            type: 'paragraph',
            text: 'Se procura que la información presentada sobre los libros sea clara y esté actualizada. No obstante, pueden producirse cambios en las descripciones, ediciones, disponibilidad, formatos o condiciones ofrecidas por las plataformas externas.',
          },
          {
            type: 'paragraph',
            text: 'La información definitiva sobre precio, disponibilidad, formato, entrega y condiciones de compra será la que figure en la plataforma correspondiente en el momento de la consulta o adquisición.',
          },
        ],
      },
      {
        title: '4. Compras en plataformas externas',
        blocks: [
          {
            type: 'paragraph',
            text: 'Los enlaces de compra pueden dirigir a Amazon, Google Play Books u otras plataformas independientes.',
          },
          {
            type: 'paragraph',
            text: 'Las compras se realizan directamente en esas plataformas y se rigen por sus propios términos, políticas de privacidad, condiciones comerciales y procedimientos de atención al cliente.',
          },
          {
            type: 'paragraph',
            text: 'Victoria Maciass no procesa pagos, no gestiona envíos y no interviene en las operaciones de compra efectuadas en sitios externos.',
          },
        ],
      },
      {
        title: '5. Enlaces externos',
        blocks: [
          {
            type: 'paragraph',
            text: 'Este sitio puede incluir enlaces a páginas de terceros para facilitar información o acceso a servicios relacionados con los libros.',
          },
          {
            type: 'paragraph',
            text: 'La inclusión de un enlace no implica control sobre el contenido, disponibilidad, seguridad o políticas del sitio de destino. El visitante accede a esos servicios bajo su propia responsabilidad y conforme a las condiciones de sus respectivos proveedores.',
          },
        ],
      },
      {
        title: '6. Uso adecuado del sitio',
        blocks: [
          {
            type: 'paragraph',
            text: 'El visitante se compromete a utilizar el sitio de forma lícita y a no realizar actividades que puedan perjudicar su funcionamiento, seguridad o disponibilidad.',
          },
          {
            type: 'paragraph',
            text: 'No está permitido intentar acceder sin autorización a sistemas, modificar contenidos, introducir código malicioso o utilizar el sitio para actividades fraudulentas o ilícitas.',
          },
        ],
      },
      {
        title: '7. Disponibilidad y responsabilidad',
        blocks: [
          {
            type: 'paragraph',
            text: 'Se procura mantener el sitio disponible y correctamente operativo, pero no se garantiza que el acceso sea ininterrumpido o esté libre de errores técnicos.',
          },
          {
            type: 'paragraph',
            text: 'En la medida permitida por la legislación aplicable, Victoria Maciass no será responsable de interrupciones ajenas a su control, fallos de proveedores externos o decisiones comerciales adoptadas por las plataformas de venta.',
          },
          {
            type: 'paragraph',
            text: 'Nada de lo establecido en estos términos limita los derechos que la legislación aplicable reconoce a los consumidores o usuarios.',
          },
        ],
      },
      {
        title: '8. Contenido informativo',
        blocks: [
          {
            type: 'paragraph',
            text: 'Los contenidos del catálogo tienen una finalidad principalmente editorial e informativa. La información de los libros no sustituye el asesoramiento individual de profesionales cualificados cuando este sea necesario, especialmente en cuestiones relacionadas con la salud.',
          },
        ],
      },
      {
        title: '9. Modificaciones',
        blocks: [
          {
            type: 'paragraph',
            text: 'Estos términos pueden actualizarse para reflejar cambios en el sitio, en sus servicios o en la legislación aplicable. La versión vigente será la publicada en esta página.',
          },
        ],
      },
      {
        title: '10. Legislación aplicable',
        blocks: [
          {
            type: 'paragraph',
            text: 'El proyecto se gestiona desde Brasil. Estos términos se interpretarán conforme a la legislación aplicable, sin perjuicio de las normas imperativas de protección de consumidores y usuarios que puedan corresponder según el lugar de residencia del visitante.',
          },
        ],
      },
      {
        title: '11. Contacto',
        blocks: [
          {
            type: 'paragraph',
            text: 'Para consultas relacionadas con el sitio y estos términos:',
          },
          {
            type: 'paragraph',
            text: '**Correo electrónico:** custoni12@gmail.com',
          },
          {
            type: 'paragraph',
            text: '**Sitio web:** https://victoriamaciass.vercel.app/',
          },
        ],
      },
    ],
  },

  'aviso-legal': {
    slug: 'aviso-legal',
    route: '/aviso-legal',
    navTitle: 'Aviso legal',
    title: 'Aviso legal',
    updatedAt: '17 de noviembre de 2026',
    seoTitle: 'Aviso legal | Victoria Maciass',
    seoDescription:
      'Información sobre la identidad editorial, titularidad, actividad y contacto del proyecto Victoria Maciass.',
    intro: [],
    sections: [
      {
        title: '1. Titularidad del proyecto editorial',
        blocks: [
          {
            type: 'paragraph',
            text: 'Este sitio web, disponible en https://victoriamaciass.vercel.app/, corresponde al proyecto editorial **Victoria Maciass**.',
          },
          {
            type: 'paragraph',
            text: 'Victoria Maciass es un seudónimo utilizado como identidad editorial para la presentación y publicación de libros.',
          },
          {
            type: 'paragraph',
            text: 'El proyecto se gestiona desde Brasil por una persona física. La identidad editorial pública se mantiene separada de la identidad personal de quien lo gestiona, dentro de los límites permitidos por la legislación aplicable.',
          },
        ],
      },
      {
        title: '2. Contacto',
        blocks: [
          {
            type: 'paragraph',
            text: 'Para consultas generales, cuestiones relacionadas con el sitio o comunicaciones sobre privacidad y protección de datos:',
          },
          {
            type: 'paragraph',
            text: '**Correo electrónico:** custoni12@gmail.com',
          },
        ],
      },
      {
        title: '3. Actividad del sitio',
        blocks: [
          {
            type: 'paragraph',
            text: 'El sitio tiene como finalidad presentar el catálogo editorial de Victoria Maciass, proporcionar información sobre sus libros y facilitar enlaces a plataformas externas donde pueden encontrarse sus publicaciones.',
          },
          {
            type: 'paragraph',
            text: 'Las operaciones de compra se realizan en las plataformas de terceros correspondientes, no directamente en este sitio.',
          },
        ],
      },
      {
        title: '4. Propiedad intelectual e identidad editorial',
        blocks: [
          {
            type: 'paragraph',
            text: 'La identidad gráfica, los textos originales, el diseño y los contenidos propios de este sitio están protegidos por la legislación aplicable en materia de propiedad intelectual.',
          },
          {
            type: 'paragraph',
            text: 'Victoria Maciass es una denominación editorial. Las marcas y materiales de terceros que puedan aparecer en el sitio pertenecen a sus respectivos titulares.',
          },
        ],
      },
      {
        title: '5. Responsabilidad sobre enlaces externos',
        blocks: [
          {
            type: 'paragraph',
            text: 'Los enlaces a plataformas externas se facilitan para comodidad de los visitantes. Cada plataforma es responsable de sus propios contenidos, servicios, operaciones y condiciones de uso.',
          },
        ],
      },
      {
        title: '6. Actualizaciones',
        blocks: [
          {
            type: 'paragraph',
            text: 'Este aviso puede modificarse cuando resulte necesario para reflejar cambios en la actividad editorial, el sitio web o la normativa aplicable.',
          },
        ],
      },
    ],
  },
};

export const LEGAL_ROUTES_ORDER: LegalSlug[] = [
  'politica-privacidad',
  'politica-cookies',
  'terminos-condiciones',
  'aviso-legal',
];
