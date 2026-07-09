# Kunu'u Comfy — Documento de diseño

_Fecha: 2026-07-09 · Estado: implementado y verificado_

## Objetivo
Tienda e-commerce **ultra premium** de ropa de dormir (adultos, niños, familia) como pieza de
portfolio y demo para ofrecer a clientes. Debe ser **un deleite navegar**, impecable en móvil y
desktop, **bilingüe ES/PT**, con pasarela de pago **visual (no funcional)**. Base conceptual:
`docs/GUIA-DISENO-PREMIUM.md`.

## Decisiones (aprobadas por el usuario)
- **Estética:** cálido acogedor de lujo (arquetipo Cálido/Artesanal × Wellness).
- **Stack:** Next.js 15 (App Router) + React 19 + TypeScript + Tailwind v4, listo para **Vercel**.
- **Alcance:** experiencia completa (todas las páginas y flujos).

## Marca
- **Mood:** cálido · sereno · envolvente. **Promesa:** "El arte de descansar".
- **Firma:** *luz de amanecer* (glow cálido que respira) + reveals editoriales por líneas +
  hover-swap de prendas. Silencioso, nunca estridente.
- **Tokens:** Lino `#F4EDE1`, Algodón `#FBF6EE`, Arena `#EDE3D3`, Cacao `#302A22`,
  Taupe `#7C6F5E`, **Terracota `#C0674A`** (único acento), Nocturno `#241A13`.
- **Tipografía:** Fraunces (display) + Mulish (cuerpo), escala fluida `clamp()`.
- **Motion:** nivel 2, curva firma `cubic-bezier(.22,1,.36,1)`; `prefers-reduced-motion` en todo.

## Arquitectura
- **i18n:** Context cliente + diccionarios tipados (`lib/i18n/es.ts` fuente de verdad, `pt.ts`
  espejo estructural), toggle instantáneo con persistencia y micro-transición.
- **Carrito:** Context + `localStorage`, drawer con fly-to-cart y barra de envío gratis.
- **Datos:** catálogo local `lib/products.ts` (15 prendas, campos bilingües, colores/tallas/badges).
- **Imágenes:** ilustraciones **SVG** por tipo de prenda (`components/art/ProductArt.tsx`),
  controladas por color, con vista frontal y de detalle (hover-swap). Confiable y sin
  dependencias externas — decisión deliberada frente a fotos que podrían romperse.

## Páginas
Home · Colección (PLP con filtros) · Producto (PDP) · Lookbook · Nosotros · Checkout (pasarela
visual + confirmación) · Contacto/FAQ · 404. Chrome global: announcement bar, nav flotante con
toggle de idioma, buscador en vivo, carrito drawer, cursor custom, grano, scroll suave.

## Verificación
- `npm run build` → 24 páginas estáticas, sin errores de tipos.
- Verificado en móvil (375px) y desktop: home, ES↔PT, PLP, PDP, carrito, checkout y confirmación.
- Sin errores de consola.

## Fuera de alcance (por ser demo)
Pagos reales, backend, autenticación, inventario real. La pasarela, el checkout y la confirmación
son visuales.
