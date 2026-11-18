# Centro Pilates Studio

Web premium responsive preparada para GitHub Pages.

## Contenido
- `index.html`: web pública.
- `styles.css`: estilos y responsive.
- `app.js`: navegación, horarios de ejemplo, modal de reserva y almacenamiento local de demostración.
- `admin.html`: panel de demostración local.
- `aviso-legal.html`, `privacidad.html`, `cookies.html`: páginas legales provisionales que deben completarse.
- `404.html`, `robots.txt`, `sitemap.xml`.

## Publicar en GitHub Pages
1. Abre **Settings → Pages**.
2. En **Build and deployment**, elige **Deploy from a branch**.
3. Selecciona `main` y `/(root)`, y guarda.
4. La URL será `https://socialmediaoviedo-droid.github.io/centro-pilates-studio/`.

## Limitaciones importantes
Esta es una primera versión frontend. El horario y las plazas son datos de ejemplo. Las solicitudes se guardan en el `localStorage` del navegador; el panel `admin.html` solo puede leer datos del mismo navegador y no tiene autenticación. No existe confirmación de plaza, sincronización entre usuarios, envío de emails, pagos ni gestión multiusuario.

**No utilizar esta versión para recoger datos personales reales ni gestionar reservas reales.** Para producción hay que conectar un backend/base de datos y autenticación segura, implementar control de concurrencia, notificaciones, política de cancelación y cumplimiento RGPD/LOPDGDD.

Antes de publicar comercialmente, sustituye teléfono, correo, ubicación y precios de ejemplo; completa las páginas legales; confirma horarios, aforos y tarifas; y revisa imágenes y licencias.