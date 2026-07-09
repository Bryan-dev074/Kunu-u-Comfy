# Kunu'u Comfy · El arte de descansar 🌙

Tienda de e-commerce **ultra premium** de ropa de dormir para toda la familia (adultos, niños y pijamas a juego). Una experiencia de navegación cálida, silenciosa y cuidada al detalle, construida como **demostración de portfolio**.

> ⚠️ **Proyecto de demostración.** No procesa pagos reales ni vende productos. La pasarela de pago, el carrito y el checkout son completamente visuales.

**Bilingüe 🇪🇸 Español / 🇧🇷 Português** — con cambio de idioma instantáneo.

---

## ✨ Características

- **Experiencia premium** — dirección de arte cálida ("lujo acogedor"), 1 acento (terracota) + neutros, tipografía editorial (Fraunces + Mulish), mucho aire.
- **Motion con intención** — reveals por líneas, hover-swap de prendas, cursor custom, scroll suave (Lenis), parallax, transiciones y micro-interacciones. Todo con `prefers-reduced-motion`.
- **Bilingüe instantáneo** — ES/PT con diccionarios tipados, persistencia en `localStorage` y micro-transición al cambiar.
- **Tienda completa**:
  - **Home** experiencial (hero cinematográfico, categorías, colección, editorial, testimonios, beneficios, newsletter).
  - **Colección (PLP)** con filtros (categoría, talla, color, orden) — sidebar en desktop, bottom-sheet en móvil.
  - **Ficha de producto (PDP)** con galería, swatches, selector de talla, guía de tallas, add-to-cart sticky, acordeón y "completá el look".
  - **Carrito drawer** con fly-to-cart, control de cantidades y barra de envío gratis.
  - **Checkout** con **pasarela de pago visual** (preview de tarjeta en vivo, wallets, resumen) y confirmación con celebración.
  - **Lookbook** editorial, **Nosotros/Atelier**, **Contacto + FAQ** y **404** premium.
- **Mobile-first** — diseñado y probado en móvil primero: `dvh`, safe-areas, touch targets, cuerpo ≥16px.
- **Ilustraciones SVG propias** — cada prenda es una ilustración vectorial controlada por color (confiable, nítida, sin dependencias externas de imágenes).

## 🛠️ Stack

- **[Next.js 15](https://nextjs.org/)** (App Router) + **React 19** + **TypeScript**
- **[Tailwind CSS v4](https://tailwindcss.com/)** (design tokens en `@theme`)
- **[Motion](https://motion.dev/)** (animación declarativa) + **[Lenis](https://lenis.darkroom.engineering/)** (scroll suave)
- **[lucide-react](https://lucide.dev/)** (iconos)

## 🚀 Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
```

Producción:

```bash
npm run build
npm run start
```

## ▲ Despliegue en Vercel

El proyecto está listo para Vercel sin configuración:

1. Importá el repositorio en [vercel.com/new](https://vercel.com/new).
2. Vercel detecta Next.js automáticamente (build `next build`).
3. Deploy.

## 📁 Estructura

```
app/                    # Rutas (App Router) + layout + globals.css
components/
  art/                  # Ilustraciones SVG de las prendas
  chrome/               # Nav, footer, carrito, cursor, grano, fondo…
  pages/                # Vistas de página (PLP, PDP, checkout, etc.)
  product/              # Card, grid, galería, swatches, filtros…
  sections/             # Secciones de la home
  ui/                   # Botón, reveal, acordeón, marquee…
lib/
  i18n/                 # Diccionarios ES/PT + provider
  products.ts           # Catálogo (datos bilingües)
  cart-context.tsx      # Estado del carrito
docs/                   # Guía de diseño premium (brief)
```

## 🎨 Sistema de marca

| Rol | Color |
|---|---|
| Fondo | `#F4EDE1` Lino |
| Superficie | `#FBF6EE` Algodón |
| Texto | `#302A22` Cacao |
| Acento | `#C0674A` Terracota |
| Oscuro | `#241A13` Nocturno |

Tipografía: **Fraunces** (display) + **Mulish** (cuerpo). Motion nivel 2 (rico pero silencioso), curva firma `cubic-bezier(.22, 1, .36, 1)`.

---

Hecho con cariño como pieza de portfolio. 🌙
