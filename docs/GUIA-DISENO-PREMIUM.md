# 🏛️ Guía Maestra de Diseño Premium & Motion — Brief reutilizable para IA

<a id="sysprompt"></a>
## ⚡ SYSTEM PROMPT — CONTRATO OPERATIVO (leé y ejecutá esto ANTES de construir)

> Este bloque es autosuficiente: podés **copiarlo como system prompt**, o simplemente
> instruir *"seguí `GUIA-DISENO-PREMIUM.md` al pie"*. Los `§` remiten a secciones de este
> mismo archivo (referencia profunda). Todo lo de abajo está **verificado (jul-2026)**.

**MISIÓN:** construir web **premium y experiencial** — que *navegarla se sienta especial* —
impecable en **📱 móvil (prioridad #1)** y en escritorio. **Nunca** entregar algo genérico.

**FLUJO OBLIGATORIO (en orden, sin saltos):**
1. **SETUP** ([§SETUP](#setup)) — instalá/activá *skills de diseño* + *bucle visual* +
   *generador de componentes* (comandos abajo). No escribas UI antes de esto.
2. **MARCA** ([§1](#1)) — arquetipo → 3 adjetivos de mood → **tokens** (1 acento + neutros)
   → **nivel de motion** (1 sobrio / 2 rico / 3 cinematográfico). Elegí uno y sostenelo.
3. **CONSTRUIR** ([§2](#2)–[§6](#6)) — componé secciones con los catálogos: fondos
   ([§3](#3)), cursores ([§4](#4)), animaciones ([§5](#5)), componentes ([§6](#6)).
   **Mobile-first** ([§20](#20)). Si es tienda: ([§15](#15)–[§16](#16)).
4. **VER** ([§0.2](#setup)) — abrí el resultado y **miralo en móvil Y desktop**. Corregí.
5. **PULIR** — corré **`/design-review`** y arreglá hasta que no queden observaciones.
6. **CERRAR** — pasá el checklist de calidad ([§10](#10)) y el de móvil ([§20.10](#20)).

**LEYES INQUEBRANTABLES (ante la duda, ganan estas):**
- **1 color de acento + neutros.** Nunca 3 acentos. · Aire generoso · 1 idea fuerte/sección.
- **Mobile-first**: diseñá y probá en teléfono primero (ahí se vende). ([§20](#20))
- Animá **SOLO `transform`/`opacity`**; curva firma **`cubic-bezier(.22,1,.36,1)`**.
- **`prefers-reduced-motion` en CADA efecto**, con fallback estático. ([§9](#9))
- **Nunca declares una UI terminada sin haberla mirado** en móvil y desktop.
- Un solo nivel de motion, coherente. **Sin dark patterns.** El lujo no manipula.
- Rendimiento = requisito: **LCP<2.5s · INP<200ms · CLS<0.1** en móvil. ([§8](#8))
- Fotos optimizadas (AVIF/WebP + lazy + `aspect-ratio`) — decisivo en tiendas.

**INSTALACIÓN MÍNIMA (ejecutá lo que aplique — catálogo completo en [§0.1](#setup)/[§0.3](#setup)):**
```bash
# ── Skills de diseño (instalar y SEGUIR sus guías) ──
npx skills add https://github.com/anthropics/skills --skill frontend-design
npx skills add https://github.com/vercel-labs/agent-skills --skill web-design-guidelines
npx skills add https://github.com/addyosmani/web-quality-skills --skill accessibility
npx skills add https://github.com/addyosmani/web-quality-skills --skill seo
npx skills add https://github.com/cloudflare/skills --skill web-perf
npx skills add https://github.com/bergside/awesome-design-skills --skill luxury     # si es lujo
npx skills add https://github.com/emilkowalski/skills --skill review-animations     # motion
npx skills add https://github.com/shopify/shopify-ai-toolkit --skill shopify-dev    # si es Shopify
# ── Tooling / MCP (activar en el cliente MCP) ──
npx chrome-devtools-mcp@latest        # feedback visual: ver/inspeccionar el resultado
npx shadcn@latest init && npx shadcn@latest mcp   # componentes accesibles premium + MCP
npx figma-developer-mcp --figma-api-key=KEY --stdio               # si hay diseño en Figma
```

**DEFAULTS DE FIRMA (para que hasta un build rápido se vea coherente):**
- Easing `cubic-bezier(.22,1,.36,1)`. Micro 120–300ms · entradas 500–900ms · loops 3–20s ·
  stagger 30–90ms · reveals `once`.
- Hero `100dvh` (no `vh`) · cuerpo **≥16px** · touch targets **≥44px** · safe-areas.
- Fondo = gradiente base + **1 capa animada máx** + grano sutil + viñeta.
- Botón primario con fill-sweep + `:active` scale · cards con hover (tilt/zoom) · cursor
  custom en desktop (off en touch).

**DEFINICIÓN DE "LISTO":** se siente **intencional** (no plantilla), tiene **UNA firma
memorable**, es **impecable en móvil**, pasa [§10](#10) y [§20.10](#20), y `/design-review`
no tiene quejas. Si algo se ve "template genérico" → volvé al paso 5.

---

> **Qué es esto:** un sistema de diseño + animación **agnóstico de proyecto**. No es
> una plantilla a copiar. Es un **brief de referencia** para que una IA (o una persona)
> construya sitios/apps de calidad **premium** en cualquier rubro — una tienda de ropa,
> un restaurante, un portfolio, un SaaS — **adaptando** cada pieza a esa marca concreta.
>
> **Cómo se usó de base:** se destiló de dos proyectos reales de altísimo acabado
> (un e-commerce de perfumes de lujo y un portfolio de arquitectura cinematográfico).
> Ambos están resumidos como **casos de estudio** al final (§13).
>
> _Última actualización: 2026-07-09._

---

## 📑 Índice
⚡. [**SYSTEM PROMPT — contrato operativo (LEER Y EJECUTAR PRIMERO)**](#sysprompt)
0. [Cómo usar este documento (instrucciones para la IA)](#0)
★. [**SETUP PREVIO — instalar/activar ANTES de construir**](#setup)
1. [Framework de adaptación — de esta guía a CUALQUIER proyecto](#1)
2. [Sistema de diseño (design tokens)](#2)
3. [Catálogo de FONDOS](#3)
4. [Catálogo de CURSORES](#4)
5. [Catálogo de ANIMACIONES](#5)
6. [Componentes premium (patrones)](#6)
7. [Stack técnico recomendado](#7)
8. [Reglas de rendimiento](#8)
9. [Reglas de accesibilidad](#9)
10. [Checklist de calidad premium](#10)
11. [Ejemplo trabajado: tienda de ropa](#11)
12. [Anti-patrones](#12)
13. [Casos de estudio (Majalis + Arquitec)](#13)
14. [Apéndice: easings, duraciones, snippets base](#14)
15. [Playbook E-COMMERCE premium (universal)](#15)
16. [Playbook TIENDA DE ROPA de lujo (página por página)](#16)
17. [Ecosistema de librerías y herramientas](#17)
18. [CSS moderno para premium (2025–2026)](#18)
19. [Tendencias de diseño premium (nivel Awwwards)](#19)
20. [⭐ Experiencia MÓVIL premium (foco crítico)](#20)

---

<a id="0"></a>
## 0 · Cómo usar este documento (instrucciones para la IA)

**Objetivo:** producir siempre resultados de calidad premium, coherentes y con
personalidad — no genéricos.

**Reglas de oro (en orden de prioridad):**
1. **Adaptar, nunca copiar.** Este doc describe *técnicas y patrones*, no un look fijo.
   Primero define la **identidad de la marca** (§1) y de ahí derivá tokens y motion.
2. **Coherencia > cantidad de efectos.** Un sistema de 3 animaciones bien elegidas y
   consistentes se ve más premium que 15 efectos sueltos. Elegí con criterio del catálogo.
3. **Restricción cromática.** Casi todo lo premium usa **1 color de acento** + neutros.
   Más de 2 acentos suele leerse barato.
4. **Rendimiento y accesibilidad son requisitos, no extras.** Todo efecto necesita su
   rama `prefers-reduced-motion` y no debe romper el scroll en móvil gama baja (§8, §9).
5. **Jerarquía y espacio.** El lujo se construye con **aire** (espaciado generoso),
   tipografía con contraste de tamaño y una sola idea fuerte por sección.
6. **Mobile-first — es donde se vende.** Diseñá y probá **primero en teléfono**; el
   desktop es la ampliación. La experiencia móvil no es una versión reducida: es LA
   experiencia principal. Ver [§20](#20) — es crítica, no opcional.

**Flujo recomendado para construir un proyecto con esta guía:**
```
0. SETUP previo       → skills de diseño + bucle visual + generadores  (§SETUP) ← HACER PRIMERO
1. Definir marca      → arquetipo + mood + público            (§1.1)
2. Derivar tokens     → color/tipo/espaciado/radios/sombras   (§1.2, §2)
3. Elegir densidad    → nivel de motion 1/2/3                 (§1.3)
4. Elegir stack       → según tipo de proyecto                (§1.4, §7)
5. Componer secciones → fondo + componentes + animaciones     (§3, §5, §6)
6. Pasar checklist    → calidad premium + a11y + perf         (§8, §9, §10)
```

**Cómo leer los snippets:** usan **variables de rol** (`--accent`, `--bg`, `--surface`…)
en vez de colores fijos, para que se rellenen con la marca. Son ilustrativos y
adaptables (CSS puro + GSAP/vanilla donde aporta).

---

<a id="setup"></a>
## ⚙️ SETUP PREVIO — instalá/activá esto ANTES de construir (PASO 0 REAL)

> 🛑 **IA: no escribas una sola línea de UI hasta completar este setup.** El mayor
> multiplicador de calidad **no es más CSS** — es: **(1)** invocar las *skills de diseño*,
> **(2)** tener un **bucle de feedback visual** para VER y corregir lo que hacés, y
> **(3)** apoyarte en **generadores de componentes premium** en lugar de escribir UI a
> mano (que casi siempre sale peor). Esto es análogo a herramientas como *headroom* que
> potencian al agente: acá el objetivo es potenciar la **calidad de diseño**.

### 0.1 · Invocá las SKILLS de diseño (obligatorio, antes de diseñar)
Antes de maquetar, corré las skills de diseño disponibles en el entorno. Flujo ideal:
```
brainstorming → design-consultation → (construir) → design-review → iterar
```
| Skill | Qué hace | Cuándo |
|---|---|---|
| **brainstorming** (superpowers) | Explora intención/requisitos antes de implementar | Antes de cualquier diseño nuevo |
| **/design-consultation** (gstack) | Define el **sistema de diseño** completo (estética, tipografía, color, layout, spacing, motion) y genera previews | Al arrancar el proyecto |
| **/design-shotgun** (gstack) | Genera **varias variantes** de diseño y las compara | Cuando querés explorar direcciones |
| **/design-html** (gstack) | Genera **HTML/CSS production-quality** | Al materializar el diseño |
| **/design-review** (gstack) | **QA visual**: detecta inconsistencias, spacing, jerarquía, "**AI slop**", interacciones lentas — y las **corrige** | Después de construir (iterar hasta que pase) |
| **/plan-design-review** (gstack) | Revisión de diseño a nivel de plan | Antes de implementar |
| **artifact-design** | Fundamentos de diseño para Artifacts | Si el entregable es un artifact |
> Regla: **construir → `/design-review` → arreglar → repetir** hasta que no queden
> observaciones. La mayoría del "look barato" muere en este loop.

**★ Skills INSTALABLES de la comunidad (verificado en skills.sh · jul-2026)**
Además de las skills del entorno, instalá skills de diseño de terceros. Comando:
```bash
npx skills add https://github.com/<owner>/<repo> --skill <skillId>
# ej:  npx skills add https://github.com/anthropics/skills --skill frontend-design
```
Las mejores para **web premium y tiendas** (el nº = instalaciones en skills.sh = señal de
adopción real). Instalá las que apliquen y **hacé que la IA las siga** antes de construir:

*Diseño / frontend (imprescindibles):*
| skillId | Fuente (`--skill`) | Instalaciones |
|---|---|---|
| **frontend-design** | `anthropics/skills` | **642k** |
| **web-design-guidelines** | `vercel-labs/agent-skills` | **449k** |
| **ui-ux-pro-max** | `nextlevelbuilder/ui-ux-pro-max-skill` | 257k |
| **design-taste-frontend** | `leonxlnx/taste-skill` | 237k |
| **shadcn** | `shadcn/ui` | 227k |
| **design-an-interface** | `mattpocock/skills` | 120k |
| **frontend-design** | `pbakaus/impeccable` | 54k |

*Animación / motion:*
| skillId | Fuente | Inst. |
|---|---|---|
| **animation-vocabulary** · **review-animations** | `emilkowalski/skills` *(autor de Sonner/Vaul)* | 11k · 22k |
| **css-animations** · **hyperframes-animation** · **motion-graphics** · **tailwind** | `heygen-com/hyperframes` | 73k · 86k · 84k · 71k |
| **remotion-best-practices** *(video/motion)* | `remotion-dev/skills` | 416k |

*Sistema de diseño · calidad (perf/a11y/SEO):*
| skillId | Fuente | Inst. |
|---|---|---|
| **tailwind-design-system** · **accessibility-compliance** | `wshobson/agents` | 53k · 11k |
| **accessibility** · **seo** | `addyosmani/web-quality-skills` *(Addy Osmani, Google)* | 35k · 32k |
| **web-perf** | `cloudflare/skills` | 20k |
| **webapp-testing** · **web-artifacts-builder** | `anthropics/skills` | 112k · 78k |

*Premium / lujo · Google Stitch:*
| skillId | Fuente | Inst. |
|---|---|---|
| **luxury** · **premium** | `bergside/awesome-design-skills` | 0.3k · 0.4k |
| **premium-frontend-ui** | `github/awesome-copilot` | 3k |
| **premium-frontend-design** | `kv0906/cc-skills` | 1k |
| **design-md** · **shadcn-ui** | `google-labs-code/stitch-skills` *(UI con IA de Google)* | 53k · 44k |

*E-commerce / tiendas / conversión:*
| skillId | Fuente | Inst. |
|---|---|---|
| **shopify-dev** · **shopify-liquid** · **shopify-storefront-graphql** · **shopify-admin** | `shopify/shopify-ai-toolkit` *(oficial)* | 7–8k |
| **cross-border-ecommerce** · **ecommerce-growth-strategy** | `nexscope-ai/ecommerce-skills` | 44k |
| **ecommerce-seo-audit** | `affilino/ecommerce-seo-audit` | 0.8k |
| **landing-page-design** | `101-skills/skills` | 1.9k |
| **conversion-optimization** | `kostja94/marketing-skills` | 1k |
| **conversion-psychology** | `mike-coulbourn/claude-vibes` | 0.4k |

> **Set mínimo recomendado para una tienda ultra-premium:** `frontend-design` (anthropics)
> + `web-design-guidelines` (vercel) + una de animación (`emilkowalski` **o** `hyperframes`)
> + `accessibility` + `seo` (addyosmani) + `web-perf` (cloudflare) + `luxury` (bergside) +
> — si la tienda es Shopify — el **toolkit oficial de Shopify**. Instalarlas y seguirlas
> sube el piso de calidad muchísimo más que cualquier truco de CSS.

### 0.2 · Activá el BUCLE DE FEEDBACK VISUAL (lo más importante)
Una IA que **no ve** lo que produce, produce genérico. Antes de dar nada por terminado,
**miralo en móvil Y en escritorio** y corregí.
- **En este entorno ya tenés** (no requieren instalar): **Claude Preview**
  (`preview_start`, `preview_screenshot`, `preview_resize` → mobile/tablet/desktop,
  `preview_inspect`, console/network) y el navegador (**claude-in-chrome** / **computer-use**).
  Úsalos para levantar el dev server, screenshotear y **verificar responsive real**.
- Si no estuvieran, instalá uno de los MCP de navegador de §0.3.
> **Regla de oro:** *nunca* declares una UI terminada sin haberla **mirado** en móvil y
> desktop y haber corregido lo que se ve mal. (Foco móvil: ver [§20](#20).)

### 0.3 · Tooling externo que MEJORA lo que la IA produce
> ✅ **Estrellas y versiones VERIFICADAS vía API de GitHub/npm — julio 2026.** Son cifras
> vivas (suben con el tiempo); el **comando de instalación** de cada una está confirmado a
> esa fecha. Instalá lo que ESTE proyecto necesita (no todo a ciegas), pero **no arranques
> a codear UI sin 0.1 y 0.2**. Ante la duda, revalidá el README antes de fijar versiones.

**A) Verificación visual / navegador (baseline — tener uno activo siempre)**
| Herramienta | Repo (⭐ jul-2026) | Instalar | Para qué |
|---|---|---|---|
| **Chrome DevTools MCP** | `github.com/ChromeDevTools/chrome-devtools-mcp` · ⭐46.5k | `npx chrome-devtools-mcp@latest` (v1.5) | Inspección DOM, **performance**, console, red — de Google |
| **Playwright MCP** | `github.com/microsoft/playwright-mcp` · ⭐34.9k | `npx @playwright/mcp@latest` (v0.0.77) | La IA navega, screenshotea y **prueba móvil/desktop** de forma programática — de Microsoft |
| **BrowserTools MCP** | `github.com/AgentDeskAI/browser-tools-mcp` · ⭐7.3k | `npx @agentdeskai/browser-tools-mcp@latest` + `@agentdeskai/browser-tools-server@latest` + extensión Chrome (v1.2.1) | Screenshots, console y **auditorías Lighthouse** |
| **stagewise** | `github.com/stagewise-io/stagewise` · ⭐6.7k | `npx stagewise@latest` (v0.12) | Conecta al agente con tu **app/frontend en vivo** para editar con contexto real (proyecto open-source en evolución) |

**B) Generadores de COMPONENTES premium (para no maquetar a mano peor)**
| Herramienta | Repo (⭐ jul-2026) | Instalar | Para qué |
|---|---|---|---|
| **shadcn/ui (+ MCP)** | `github.com/shadcn-ui/ui` · ⭐118k | `npx shadcn@latest init` · MCP: `npx shadcn@latest mcp` (CLI v4.13) | Base de componentes **accesibles** (Radix+Tailwind); registry enorme. ⚠️ El paquete es **`shadcn`**, no el viejo `shadcn-ui` (deprecado) |
| **React Bits** | `github.com/DavidHDev/react-bits` · ⭐43.1k | `npx jsrepo add …` / copy-paste · reactbits.dev | Componentes React **animados** listos (backgrounds, texto, efectos) |
| **Magic UI** | `github.com/magicuidesign/magicui` · ⭐21.5k | `npx shadcn@latest add "https://magicui.design/r/<comp>"` | Componentes **animados** para landings/marketing (registry shadcn) |
| **21st.dev Magic MCP** | `github.com/21st-dev/magic-mcp` · ⭐5.4k | `npx @21st-dev/magic@latest` (v0.1, API key) | **Genera componentes UI premium** desde prompt ("como v0 en tu editor") |
| **Aceternity / Cult / Origin / HextaUI** | ui.aceternity.com · cult-ui.com · originui.com · hextaui.com | copy-paste / registry | Bibliotecas de componentes con motion premium |

**C) Figma → código (si hay diseño en Figma)**
| Herramienta | Repo (⭐ jul-2026) | Instalar | Para qué |
|---|---|---|---|
| **Framelink Figma MCP** | `github.com/GLips/Figma-Context-MCP` · ⭐15.4k | `npx figma-developer-mcp --figma-api-key=KEY --stdio` (v0.13) | Le da a la IA el **contexto real del diseño** de Figma |
| **Figma Dev Mode MCP** | figma.com (oficial) | Figma Desktop → activar *Dev Mode MCP Server* | Puente oficial Figma ↔ IA |
| **Builder.io Visual Copilot** | `github.com/BuilderIO/builder` · ⭐8.8k | plugin Figma + MCP · builder.io | Figma → código de componentes |

**D) Theming, tokens y color**
- **tweakcn** — `github.com/jnsahaj/tweakcn` · ⭐10.1k · tweakcn.com → **editor visual de
  temas shadcn/Tailwind**, exporta tokens listos (tiene MCP).
- **Realtime Colors** (realtimecolors.com), **Coolors**, **Huemint**, **Open Props**,
  **Radix Colors** — generar/probar paletas y escalas accesibles.

**E) Íconos, micro-animación y assets**
- **Iconify** — `github.com/iconify/iconify` · ⭐6.2k (hay MCP) — íconos unificados de muchos sets.
- **Lucide** (lucide.dev), **Phosphor** — íconos de trazo fino premium.
- **Rive** (rive.app · `github.com/rive-app`) y **LottieFiles** (lottiefiles.com) —
  micro-animaciones; ambos con runtimes e integraciones/MCP.

**F) Agentes y SKILLS de diseño (potencian la calidad del output)**
- **Superdesign** — `github.com/superdesigndev/superdesign` · ⭐6.6k · superdesign.dev —
  **agente de diseño open-source** (extensión para editores/coding agents).
- **Superdesign Skill** — `github.com/superdesigndev/superdesign-skill` — **skill de diseño
  para Claude Code / Cursor / cualquier coding agent** (instalable como skill; muy alineado
  con este documento).
- **v0 (Vercel)** (v0.dev) — generación de UI; API/MCP. *(En este entorno ya hay un MCP de
  Vercel/v0 con `import-claude-design-from-url` y `deploy_to_vercel`.)*

**G) Más MCPs de diseño (verificados jul-2026)**
| Herramienta | Repo (⭐) | Para qué |
|---|---|---|
| **TalkToFigma** | `github.com/grab/cursor-talk-to-figma-mcp` · ⭐6.9k | **Leer Y editar** Figma desde la IA (no solo leer) |
| **shadcn-ui MCP server** | `github.com/Jpisnice/shadcn-ui-mcp-server` · ⭐2.8k | Da a la IA el **contexto de componentes shadcn** (props, estructura) |
| **dembrandt** | `github.com/dembrandt/dembrandt` · ⭐2.1k | **Extrae el design system (logo, colores, tokens) de CUALQUIER web** en segundos — ideal para "quiero la vibe de X" |
| **Figma Console MCP** | `github.com/southleft/figma-console-mcp` · ⭐2.0k | Tu design system de Figma como API |
| **Creative Tim UI** | `github.com/creativetimofficial/ui` · ⭐11.9k | Componentes/blocks + agentes de UI |
| **Google Stitch** | `github.com/google-labs-code/stitch-skills` · ⭐6.5k | **AI UI design de Google** (MCP + skills) |
| **Webflow MCP** | `github.com/webflow/mcp-server` · ⭐0.1k (oficial) | Para sitios en Webflow |
| **better-design** | `github.com/marvkr/better-design` · ⭐0.2k | Design MCP + registry shadcn |

**H) Listas curadas (para descubrir más — consultalas cuando falte algo)**
- `github.com/maxbogo/awesome-ai-tools-for-ui` · ⭐0.7k — herramientas de IA para construir UI/UX.
- `github.com/punkpeye/awesome-mcp-servers` · `github.com/modelcontextprotocol/servers` — directorios de MCP servers.
- **skills.sh** — buscador de skills instalables (la fuente de la tabla de §0.1). Buscá por
  rubro ("ecommerce", "animation", "luxury", "shopify") antes de arrancar un proyecto nuevo.

### 0.4 · Pre-flight (marcá antes de continuar)
- [ ] Skills de diseño invocadas (**brainstorming → design-consultation**).
- [ ] **Skills instalables** relevantes añadidas vía `npx skills add …` (mínimo:
  `frontend-design`, `web-design-guidelines`, una de animación, `accessibility`+`seo`,
  `luxury`; toolkit de Shopify si aplica — ver §0.1).
- [ ] **Bucle visual activo** (Claude Preview o un MCP de navegador) — probado en móvil y desktop.
- [ ] Un **generador de componentes** disponible si voy a crear UI nueva (shadcn/Magic).
- [ ] **Figma MCP** activo si hay diseño en Figma.
- [ ] Al terminar cada pantalla: **`/design-review`** y corregir. (Móvil primero — §20.)

> **Resumen operativo:** *skills de diseño + ver el resultado + componentes premium* de
> arranque, y **`/design-review` para pulir**. Con eso, cada cosa que la IA construya
> parte de una base de calidad muy superior a "escribir HTML/CSS de memoria".

---

<a id="1"></a>
## 1 · Framework de adaptación — de esta guía a CUALQUIER proyecto

Este es el corazón del documento: **cómo pasar de "guía genérica" a "esta marca".**

### 1.1 · Definir la marca (responder antes de tocar nada)
| Pregunta | Por qué importa |
|---|---|
| **¿Qué vende y a quién?** | Fija el tono (lujo, joven, técnico, cálido). |
| **Arquetipo de marca** | Ver tabla abajo → dicta color/tipo/motion. |
| **3 adjetivos de mood** | p.ej. "cálido, artesanal, honesto" o "frío, futurista, preciso". |
| **Referentes que ama / odia** | Calibra el nivel de audacia. |
| **Contexto de uso** | Móvil primero, tienda con muchas fotos, catálogo grande, etc. |

**Tabla de arquetipos → dirección estética** (elegir 1 dominante):
| Arquetipo | Color | Tipografía | Motion | Ejemplo de rubro |
|---|---|---|---|---|
| **Lujo / Exclusivo** | Neutro oscuro + 1 metálico (oro/plata/bronce) | Serif display + mono/sans fina | Lento, elegante, shimmer sutil | Perfume, joyería, alta costura |
| **Minimal / Editorial** | Blanco/hueso + tinta + 1 acento apagado | Serif o grotesque grande | Reveals limpios, mucho aire | Moda minimal, arquitectura, galería |
| **Streetwear / Joven** | Alto contraste, 1–2 acentos vivos | Grotesque bold, condensada | Rápido, marquees, glitch, snappy | Ropa urbana, sneakers, música |
| **Cálido / Artesanal** | Tierras, cremas, terracota | Serif humanista + handwritten acento | Suave, orgánico, grano | Café, cerámica, comida casera |
| **Tech / Futurista** | Oscuro + neón/cian, glass | Sans geométrica, mono | Precisos, glow, data, 3D | SaaS, fintech, gaming |
| **Natural / Wellness** | Verdes/beige, tonos apagados | Serif suave + sans redondeada | Muy suave, fades largos | Skincare, yoga, orgánico |

### 1.2 · Mapear tokens (concepto → variable)
En vez de "oro sobre negro", pensá en **roles**. Rellená esta tabla y todo lo demás se deriva:
```css
:root {
  /* NEUTROS (fondo → texto) */
  --bg:        #___;  /* fondo base */
  --surface:   #___;  /* tarjetas/paneles */
  --surface-2: #___;  /* elevado / hover */
  --line:      #___;  /* bordes sutiles */
  --text:      #___;  /* texto principal */
  --text-muted:#___;  /* secundario */

  /* ACENTO (1 familia; opcionalmente 1 secundario) */
  --accent:      #___;
  --accent-soft: #___;  /* para glows/fondos, baja opacidad */
  --accent-2:    #___;  /* usar con MUCHA moderación */

  /* VIDRIO / EFECTOS */
  --glass:        color-mix(in srgb, var(--surface) 60%, transparent);
  --glass-border: color-mix(in srgb, var(--accent) 20%, transparent);
}
```
> **Truco premium:** definir el acento en `oklch()` y derivar variantes con `color-mix()`
> da transiciones y glows más uniformes que el hex plano. (§2.1)

### 1.3 · Elegir densidad de motion (compromiso claro y consistente)
| Nivel | Cuándo | Qué incluye |
|---|---|---|
| **1 · Sobrio** | Marcas serias, mucho contenido, B2B | Reveals fade/slide, hover suave, 0–1 efecto ambiente. Sin 3D. |
| **2 · Rico** (recomendado por defecto) | E-commerce, portfolios, marca con carácter | Reveals con stagger, hover 3D/tilt, 1 fondo animado, cursor custom, loader. |
| **3 · Cinematográfico** | Landing de producto estrella, "wow" | Scroll-driven (pin/scrub), storytelling, 3D/video, transiciones FLIP. Pesado: exige presupuesto de perf. |

Elegí **un** nivel y mantenelo en todo el sitio. Mezclar niveles se ve incoherente.

### 1.4 · Elegir stack (detalle en §7)
- **Sitio de marketing/landing, control total, sin muchas rutas** → **Vite + Vanilla JS**
  + GSAP (+ Lenis, + Three si hace falta). Cero overhead. *(como Arquitec)*
- **E-commerce / app con datos, rutas, estado** → **Next.js + Tailwind** + GSAP para
  momentos puntuales + CSS keyframes para lo ambiente. *(como Majalis)*
- **React sin SSR** → Vite + React + Framer Motion (motion declarativo cómodo).

### 1.5 · Ejemplo de traducción rápida (mismo patrón, distinta marca)
> Patrón: *"precio con oro vivo + halo pulsante para ítems premium"*
- **Perfume lujo** → oro corriendo dentro del número + corona que titila.
- **Ropa minimal** → el precio queda en tinta; el "premium" se marca con un fino sello
  "Edición limitada" que hace fade-in, sin brillos.
- **Streetwear** → precio en acento neón con un `glitch` de 1 frame al entrar en viewport.

Misma **intención** (destacar lo premium), **ejecución adaptada** al arquetipo.

---

<a id="2"></a>
## 2 · Sistema de diseño (design tokens)

### 2.1 · Color
- **Estructura:** neutros del fondo al texto (5–6 pasos) + **1 acento** con 3–5 variantes.
- **Contraste:** texto principal ≥ 7:1 sobre fondo; secundario ≥ 4.5:1. Verificar el
  acento sobre fondo (los dorados/amarillos fallan fácil → usar solo en trazos grandes).
- **Gradientes de acento** (para texto/botones): 3 stops mínimo (oscuro→claro→oscuro)
  con `background-size:200%` para poder animar el "flujo".
- **Glass:** `background: var(--glass); backdrop-filter: blur(12–16px) saturate(120%);`
  + borde `1px` de acento a baja opacidad.
- **oklch + color-mix** (premium, evita banding y da glows uniformes):
```css
--accent: oklch(0.78 0.13 85);                 /* define 1 vez */
--accent-soft: color-mix(in oklch, var(--accent) 18%, transparent);
--accent-hi:   color-mix(in oklch, var(--accent) 100%, white 18%);
```

### 2.2 · Tipografía (pares por mood)
Regla premium: **2 fuentes** (display + cuerpo), a veces +1 mono para datos.
| Mood | Display | Cuerpo | Datos/labels |
|---|---|---|---|
| Lujo | Cinzel / Cormorant / Playfair | Jost / Inter light | IBM Plex Mono |
| Editorial | Canela / Fraunces / GT Sectra | Neue Haas / Söhne | — |
| Streetwear | Anton / Archivo Expanded | Inter / Space Grotesk | Space Mono |
| Cálido | Fraunces / Recoleta | Nunito / Mulish | — |
| Tech | Clash Display / Space Grotesk | Inter / Geist | Geist Mono / JetBrains Mono |

- **Escala fluida** con `clamp()` en TODO título:
  `font-size: clamp(2rem, 6vw, 5.5rem)`.
- **Tracking:** títulos grandes tracking negativo (`-0.02em`); labels/eyebrows
  tracking amplio en mayúsculas (`0.2–0.5em`, `text-transform:uppercase`).
- **Jerarquía por contraste de tamaño**, no por muchos pesos. Un h1 enorme + cuerpo
  normal se ve más premium que 5 tamaños medios.
- `font-variant-numeric: tabular-nums` en precios/timers/contadores.
- `text-wrap: balance` en titulares, `pretty` en párrafos.

### 2.3 · Espaciado, grid y ritmo
- **Escala** basada en múltiplos (4/8px o `rem`): 4·8·12·16·24·32·48·64·96·128.
- **Aire:** las secciones premium respiran — padding vertical grande
  (`py-24`/`py-36`). El vacío es parte del diseño.
- **Ancho de lectura:** párrafos `max-width: 60–72ch`.
- **Grid maestro:** `max-width` del contenido (72–90rem) + `--pad-x: clamp(1.5rem, 6vw, 6rem)`.
- **Breakpoints** (Tailwind-style): 640 / 768 / 1024 / 1280 / 1536. Móvil primero.

### 2.4 · Radios, bordes, elevación
- **Radios:** elegir un lenguaje y sostenerlo — o **casi recto** (2–4px, editorial/lujo)
  o **redondeado** (12–20px, amable/tech) o **pill** (9999px) para botones/chips.
- **Bordes:** `1px` sutil de acento a baja opacidad es la firma "glass premium".
- **Sombras/elevación:** en tema oscuro, la elevación se comunica con **glow del
  acento** (no sombra negra); en claro, sombras suaves y grandes y difusas
  (`0 30px 90px -20px rgba(0,0,0,.12)`), nunca duras.

### 2.5 · Texturas (matan el aspecto "plano/plástico")
- **Grano fílmico** global sutil (`opacity .03`) con SVG `feTurbulence`, animado con
  `steps()` para simular película. → da cuerpo a negros/planos grandes.
- **Ruido en gradientes** para evitar banding en fondos oscuros amplios.
- **Viñeta + máscara radial** para enfocar la mirada al centro.
```css
.grain { position:fixed; inset:-14%; z-index:4; pointer-events:none; opacity:.032;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  animation:grain 1.1s steps(3) infinite; }
@keyframes grain{0%{transform:translate(0,0)}33%{transform:translate(-2%,1%)}66%{transform:translate(1%,-2%)}100%{transform:translate(0,0)}}
```

---

<a id="3"></a>
## 3 · Catálogo de FONDOS

Elegí **1 protagonista** (máx 2 capas animadas) + capas estáticas de apoyo. Un fondo
premium suele ser: `gradiente base + glow/orbes + textura(grano/grid) + viñeta`.

| # | Tipo | Cuándo usarlo | Coste | Notas de implementación |
|---|---|---|---|---|
| 1 | **Gradiente base** | Siempre (capa 0) | 0 | Lineal suave 2–3 stops. Base de todo. |
| 2 | **Orbes / glow radiales** | Dar profundidad ambiental | bajo | 2–3 círculos `filter:blur(90px)`, opacidad .3–.6, fuera de pantalla. |
| 3 | **Retícula / grid arquitectónico** | Editorial, técnico, arquitectura | bajo | Líneas a baja opacidad + `mask-image` radial para difuminar bordes. |
| 4 | **Mesh gradient / aurora** | Marcas vivas, tech, wellness | bajo-medio | Varios radiales de color que se mueven lento (o CSS `@property` animado). |
| 5 | **Partículas 3D (Three.js)** | "Wow" ambiental, lujo/tech | medio-alto | Points + sprite radial, `AdditiveBlending`, movimiento sinusoidal, paralaje al cursor. **Pausar fuera de viewport**, DPR≤2, degradar en móvil. |
| 6 | **Spotlight que sigue el cursor** | Interactividad sutil | bajo | Radial que persigue el mouse con `mix-blend-mode: soft-light/screen`. |
| 7 | **Video de fondo** | Producto/lifestyle, moda, comida | medio | `muted playsinline`, poster, cache inmutable, versión móvil liviana en loop. |
| 8 | **Video scroll-driven (scrub)** | Storytelling cinematográfico | alto | Seek por scroll (no play). Precargar como blob. Exige presupuesto de perf. (§13 Arquitec) |
| 9 | **Imagen con parallax** | Hero editorial, moda | bajo | La imagen se mueve más lento que el scroll (`translateY` scrub). |
| 10 | **Patrón SVG / líneas** | Textura de marca | bajo | Tileable, a baja opacidad; se puede animar el `background-position`. |
| 11 | **Shader (GLSL) / gradiente animado** | Firma única, tech/arte | alto | Fragment shader con noise; o `@property --a` + `background` animado sin JS. |
| 12 | **Degradado que respira** | Fondo vivo sin costo | 0 | `background-size:200%` + keyframe que mueve la posición 10–20s. |

**Snippet — fondo "premium base" (capas 1+2+3+viñeta):**
```html
<div class="bg" aria-hidden="true">
  <div class="bg__glow a"></div><div class="bg__glow b"></div>
  <div class="bg__grid"></div><div class="bg__vignette"></div>
</div>
```
```css
.bg{position:fixed;inset:0;z-index:0;pointer-events:none;background:linear-gradient(168deg,var(--bg),var(--surface))}
.bg__glow{position:absolute;border-radius:50%;filter:blur(90px);opacity:.5}
.bg__glow.a{width:55vw;height:55vw;top:-18vw;right:-12vw;background:radial-gradient(circle,var(--accent-soft),transparent 65%)}
.bg__glow.b{width:48vw;height:48vw;bottom:-16vw;left:-14vw;background:radial-gradient(circle,var(--accent-soft),transparent 65%)}
.bg__grid{position:absolute;inset:0;background:
  linear-gradient(var(--line) 1px,transparent 1px) 0 0/100% 25vh,
  linear-gradient(90deg,var(--line) 1px,transparent 1px) 0 0/25vh 100%;
  -webkit-mask-image:radial-gradient(120% 100% at 50% 40%,#000,transparent 78%)}
.bg__vignette{position:absolute;inset:0;background:radial-gradient(130% 100% at 50% 45%,transparent 60%,rgba(0,0,0,.09))}
```

**Snippet — spotlight cursor (JS mínimo):**
```js
const s = document.querySelector('.spotlight');
addEventListener('pointermove', e => {
  s.style.setProperty('--x', e.clientX+'px');
  s.style.setProperty('--y', e.clientY+'px');
});
/* .spotlight{position:fixed;inset:0;pointer-events:none;
   background:radial-gradient(300px at var(--x) var(--y), var(--accent-soft), transparent 70%);
   mix-blend-mode:soft-light} */
```

---

<a id="4"></a>
## 4 · Catálogo de CURSORES

Reglas: **desactivar SIEMPRE en `pointer:coarse`** (touch) y en `prefers-reduced-motion`
reducir a lo mínimo. Ocultar el nativo con `body{cursor:none}` solo si hay reemplazo.

| # | Tipo | Sensación | Cómo |
|---|---|---|---|
| 1 | **Dot + Ring** | Preciso, técnico/lujo | Punto que sigue rápido + anillo que persigue con retardo. |
| 2 | **Líquido (lerp)** | Elástico, "goma" premium | Halo que interpola hacia el mouse con `lerp 0.12–0.18` cada frame. |
| 3 | **Magnético** | Los botones "atraen" el cursor/elemento | El elemento se desplaza hacia el mouse (`elastic.out`) al acercarse. |
| 4 | **Con etiqueta contextual** | Guía al usuario ("VER", "ARRASTRAR") | El anillo se expande y muestra texto desde `data-cursor`. |
| 5 | **Blend / invert** | Impacto gráfico | `mix-blend-mode: difference/exclusion` → el cursor invierte lo que pisa. |
| 6 | **Trail / estela** | Juguetón, creativo | N puntos que siguen con delays crecientes. |
| 7 | **Escala por estado** | Feedback | Crece sobre interactivos (×2), encoge al click (×0.7). |
| 8 | **Imagen/emoji** | Marca fuerte, divertido | Sustituir por sprite/emoji; rota o flota. |
| 9 | **Spotlight** | Revela contenido bajo el cursor | Máscara radial que sigue el mouse (ver §3.6). |

**Snippet base — cursor Dot+Ring líquido + etiqueta + estados (vanilla):**
```html
<div class="cursor" aria-hidden="true">
  <div class="cursor__dot"></div>
  <div class="cursor__ring"><span class="cursor__label"></span></div>
</div>
```
```js
const dot=document.querySelector('.cursor__dot'),ring=document.querySelector('.cursor__ring'),
      label=document.querySelector('.cursor__label');
let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
const fine=matchMedia('(pointer:fine)').matches;
if(fine){document.body.style.cursor='none';
  addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY;
    dot.style.transform=`translate(${mx-4}px,${my-4}px)`;
    const t=e.target.closest('a,button,[data-cursor]');
    ring.classList.toggle('is-active',!!t);
    label.textContent=t?.dataset.cursor||'';});
  (function loop(){rx+=(mx-rx)*.18;ry+=(my-ry)*.18;
    ring.style.transform=`translate(${rx-22}px,${ry-22}px)`;requestAnimationFrame(loop);})();
}
/* .cursor__dot{position:fixed;width:8px;height:8px;border-radius:50%;background:var(--accent);z-index:9999;pointer-events:none;mix-blend-mode:screen}
   .cursor__ring{position:fixed;width:44px;height:44px;border:1px solid var(--accent);border-radius:50%;z-index:9998;pointer-events:none;display:grid;place-items:center;transition:width .4s,height .4s,background .4s}
   .cursor__ring.is-active{width:84px;height:84px;background:color-mix(in srgb,var(--accent) 20%,transparent);border-color:transparent}
   .cursor__label{font-size:.5rem;letter-spacing:.24em;text-transform:uppercase;opacity:0}
   .cursor__ring.is-active .cursor__label{opacity:1}
   @media (pointer:coarse){.cursor{display:none}} */
```
**Snippet — magnético (GSAP):**
```js
document.querySelectorAll('[data-magnetic]').forEach(el=>{
  const xTo=gsap.quickTo(el,'x',{duration:.9,ease:'elastic.out(1,0.4)'}),
        yTo=gsap.quickTo(el,'y',{duration:.9,ease:'elastic.out(1,0.4)'});
  el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();
    xTo((e.clientX-(r.left+r.width/2))*.32); yTo((e.clientY-(r.top+r.height/2))*.32);});
  el.addEventListener('mouseleave',()=>{xTo(0);yTo(0);});
});
```

---

<a id="5"></a>
## 5 · Catálogo de ANIMACIONES

### 5.0 · Principios (aplicá esto a TODA animación)
- **Propósito:** cada animación guía la atención o da feedback. Si no hace ninguna de
  las dos, sobra.
- **Timing:** micro-interacciones 120–300ms; entradas 500–900ms; telones/transiciones
  700–1200ms; ambiente (loops) 3–20s.
- **Stagger:** 30–90ms entre hermanos. Nunca todo a la vez.
- **Dispará temprano, resolvé rápido:** en reveals por scroll, arrancá cuando el
  elemento entra al 90–94% del viewport → "cuando el ojo llega, ya está".
- **Anima solo `transform` y `opacity`** (compositor). Evitá animar `width/height/top/left`
  por frame (usar `transform:scale/translate`); si es inevitable, escribí estilos solo si cambió.
- **Curva firma:** `cubic-bezier(.22,1,.36,1)` ("expo-out suave") para el 80% de las cosas.
  `back.out`/`elastic.out` para aparición de FABs/chips. `power4.inOut` para telones.
  `linear` **solo** para loops (shimmer/marquee/spinner).
- **`once:true`** en reveals (no re-animar al volver a subir).

### 5.1 · Entradas / Reveal
| Efecto | Técnica | Notas |
|---|---|---|
| Fade-up | `opacity 0→1 + translateY(24→0)` | El más versátil. IntersectionObserver o GSAP. |
| Máscara por líneas | `SplitText lines` + `yPercent 112→0` con `overflow:hidden` | Editorial, muy premium para titulares. |
| Cascada de caracteres | `SplitText chars` + `yPercent + rotation` stagger .03 | Para el H1 hero. |
| Clip-path que abre | `clip-path: inset(9% → -5% round r)` | Ideal para imágenes/cards. |
| Blur→focus | `filter: blur(10px)→0 + opacity` | Da sensación de "enfoque de cámara". |
| Scale-in | `scale .96→1 + opacity` | Badges, modales, sellos. |
| Draw-on SVG | `stroke-dashoffset: len→0` | Logos lineales, planos, iconos. |

**Snippet — reveal con IntersectionObserver (sin librería, stagger configurable):**
```js
function reveal(root, {y=28, stagger=.08}={}){
  const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
  const items=[...root.querySelectorAll('[data-reveal]')];
  items.forEach((el,i)=>{ if(rm){el.style.opacity=1;return;}
    el.style.cssText+=`opacity:0;transform:translateY(${y}px);transition:opacity .8s cubic-bezier(.22,1,.36,1) ${i*stagger}s, transform .8s cubic-bezier(.22,1,.36,1) ${i*stagger}s`;});
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){
    e.target.style.opacity=1;e.target.style.transform='none';io.unobserve(e.target);}}),
    {threshold:.12,rootMargin:'0px 0px -8% 0px'});
  items.forEach(el=>io.observe(el));
}
```

### 5.2 · Scroll-driven (requiere GSAP ScrollTrigger o `animation-timeline: scroll()`)
| Efecto | Descripción |
|---|---|
| **Parallax** | Capas a distinta velocidad que el scroll (`y` con `scrub`). |
| **Pin + scrub** | Anclar una sección y animar su contenido con el progreso del scroll. |
| **Scroll horizontal** | Convertir scroll vertical en desplazamiento lateral (`x:-distance`, pin). |
| **Progreso / rail** | Barra o índice que refleja el avance global o de sección. |
| **Count-up** | Números que suben de 0 a su valor al entrar en viewport. |
| **Sticky stacking cards** | Tarjetas que se apilan/superponen al scrollear. |
| **Reveal de imagen con scale** | La imagen entra con `scale 1.2→1` mientras aparece. |
| **Video/imagen scrub** | El media avanza con el scroll (cinematográfico). |

**Snippet — count-up + parallax + pin (GSAP):**
```js
gsap.registerPlugin(ScrollTrigger);
// count-up
document.querySelectorAll('[data-count]').forEach(el=>{
  const o={v:0};gsap.to(o,{v:+el.dataset.count,duration:2,ease:'power3.out',
    scrollTrigger:{trigger:el,start:'top 90%',once:true},
    onUpdate:()=>el.textContent=Math.round(o.v)});});
// parallax
gsap.to('.hero-img',{yPercent:-15,ease:'none',
  scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:.4}});
// pin + progreso
gsap.timeline({scrollTrigger:{trigger:'#showcase',start:'top top',end:'+=200%',
  pin:true,scrub:.5}}).from('.showcase-card',{yPercent:60,opacity:0,stagger:.3});
```
> **CSS-only alternativa moderna** (sin JS, donde el soporte alcance):
> `animation-timeline: view();` + `@keyframes` para reveals; `scroll()` para progreso.

### 5.3 · Texto
- **Shimmer de gradiente** (acento que "fluye" dentro del texto): `background-clip:text`
  + `background-size:200%` + keyframe que mueve la posición. *(La firma de Majalis.)*
- **Typewriter / máquina de escribir**: `clip-path` o `ch` width animado.
- **Reveal "se escribe"**: `clip-path: inset(0 100% 0 0 → 0 0 0 0)` + blur inicial.
- **Draw underline**: `::after` con `scaleX:0→1` en hover.

```css
@keyframes flow{to{background-position:-200% center}}
.text-flow{background:linear-gradient(100deg,var(--accent),var(--accent-hi) 50%,var(--accent));
  background-size:200% auto;-webkit-background-clip:text;background-clip:text;color:transparent;
  animation:flow 3.5s linear infinite}
```

### 5.4 · Hover / puntero
| Efecto | Notas |
|---|---|
| **Tilt 3D + glare** | Card gira hacia el cursor (`rotateX/Y` ±6–9°), imagen con paralaje interno, brillo especular con `--gx/--gy`. |
| **Zoom lento de imagen** | `scale 1→1.1` en 1–1.2s `ease-out` dentro de `overflow:hidden`. |
| **Velo/gradiente que asciende** | Overlay que sube y revela CTA. |
| **Underline que crece** | `width 0→100%` o `scaleX`. |
| **Fill-sweep de botón** | Capa que se llena desde un lado (`scaleX` origin izquierda). |
| **Sombra/glow dinámico** | Elevación por sombra (claro) o glow del acento (oscuro). |

**Snippet — tilt 3D + glare (GSAP quickTo):**
```js
document.querySelectorAll('[data-tilt]').forEach(card=>{
  gsap.set(card,{transformPerspective:900});
  const rX=gsap.quickTo(card,'rotationX',{duration:.6,ease:'power3.out'}),
        rY=gsap.quickTo(card,'rotationY',{duration:.6,ease:'power3.out'});
  card.addEventListener('mousemove',e=>{const r=card.getBoundingClientRect();
    const nx=(e.clientX-r.left)/r.width-.5, ny=(e.clientY-r.top)/r.height-.5;
    rX(-ny*8); rY(nx*9);
    card.style.setProperty('--gx',(nx+.5)*100+'%');card.style.setProperty('--gy',(ny+.5)*100+'%');});
  card.addEventListener('mouseleave',()=>{rX(0);rY(0);});
});
/* glare: un span con background:radial-gradient(circle at var(--gx) var(--gy), rgba(255,255,255,.25), transparent 45%) */
```

### 5.5 · Ambiente (loops sutiles — usar con moderación)
- **Float/bob**: `translateY` ±8px, 6s ease-in-out (logos, emblemas).
- **Breathe**: `scale 1↔1.15` + opacidad (halos, glows).
- **Marquee infinito**: dos copias de la fila, `translateX 0→-50%`, pausa en hover.
- **Twinkle**: opacidad + scale desincronizados (estrellas/partículas).
- **Pulse/ripple**: anillo que se expande y desvanece (FAB, notificación).
- **Grain**: textura animada con `steps()` (§2.5).

**Snippet — marquee sin salto:**
```css
@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.marquee{display:flex;width:max-content;animation:marquee 38s linear infinite}
.marquee:hover{animation-play-state:paused}
/* poné DOS veces la misma fila dentro de .marquee */
```

### 5.6 · Feedback / estado
- **Ripple al click**, **glow pulsante en CTA principal**, **badge scale-in** al sumar
  al carrito, **check "copiado"**, **skeleton/shimmer** de carga, **toast** deslizante.
- **Regla:** el feedback debe ser inmediato (<100ms) y breve.

### 5.7 · Transiciones de vista
- **FLIP** (First-Last-Invert-Play): un elemento "vuela" entre estados (p.ej. la foto
  del producto de la grilla al modal). GSAP Flip o cálculo manual de rects.
- **View Transitions API**: `document.startViewTransition(() => updateDOM())` para
  transiciones entre rutas/estados con degradación elegante.
- **Telón / wipe**: `clip-path: inset()` que barre; ideal entre secciones o al navegar.

### 5.8 · Loaders / preloaders
- **Loader de marca**: logo + barra con sweep dorado, fade a ~1.5–2s. Encadenar con el
  hero por evento/promesa (no timeout ciego) para que no "salte".
- **Preloader con progreso real**: si precargás un asset pesado (video/blob), mostrá el
  porcentaje real de descarga; salida con el telón subiendo (`yPercent:-100`).

---

<a id="6"></a>
## 6 · Componentes premium (patrones)

### 6.1 · Botones
- **Primario (fill-sweep):** fondo de acento; en hover una capa se llena desde un lado
  y el texto cambia de color; `:active scale(.98)`; glow + anillo.
- **Fantasma:** borde de acento tenue → se ilumina + glow en hover.
- **Magnético:** el primario del hero suele ser magnético (§4).
```css
.btn{position:relative;overflow:hidden;isolation:isolate;border-radius:9999px;
  padding:1rem 2.5rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;font-size:.75rem;
  background:linear-gradient(120deg,var(--accent),var(--accent-hi));color:var(--bg);
  transition:color .4s,transform .3s,box-shadow .4s;box-shadow:0 0 30px -8px var(--accent-soft)}
.btn::after{content:"";position:absolute;inset:0;z-index:-1;background:var(--bg);
  transform:scaleX(0);transform-origin:right;transition:transform .45s cubic-bezier(.22,1,.36,1)}
.btn:hover{color:var(--accent);box-shadow:0 0 0 1px var(--accent),0 0 40px -5px var(--accent-soft)}
.btn:hover::after{transform:scaleX(1);transform-origin:left}
.btn:active{transform:scale(.98)}
```

### 6.2 · Cards (glass + hover)
- Base glass (§2.1) que **sube 6px** + borde que se enciende + sombra/glow en hover.
- Imagen `aspect-ratio` fijo, zoom lento en hover.
- Badges (categoría/precio/etiqueta) en las esquinas con `backdrop-blur`.
- Opcional nivel 2/3: **tilt 3D + glare** (§5.4).

### 6.3 · Navbar flotante
- Transparente arriba → al scrollear >40px cambia a `blur + fondo semi + borde`.
- Grid de 3 (marca / nav / acciones) en desktop; hamburguesa en móvil.
- Links con underline que crece; búsqueda expandible con autocompletado.

### 6.4 · Modal cinematográfico
- Velo con `backdrop-blur`, panel que entra con timeline (velo → imagen `scale 1.1` →
  texto en stagger → detalles). Cierra con ESC, click fuera y botón "atrás" (móvil).
- **Ideal:** transición FLIP desde la card que lo abrió.
- **Gotcha:** si el contenido viene de un provider que regenera objetos, keyeá la
  animación por un **id estable**, no por el objeto, o se reinicia en loop.

### 6.5 · Formularios / inputs "luxe"
- Sin caja: `border-bottom` que se ilumina en focus; placeholder tenue; label flotante.
- Estados claros (focus/error/success) con color y micro-movimiento.

### 6.6 · Otros
- **Marquee de logos/marcas** (§5.5) con fundido en bordes.
- **Sellos/badges** (oferta, edición limitada) con micro-rotación o scale-in.
- **Tratamiento de precio** (destacar premium sin gritar; adaptar al arquetipo, §1.5).
- **Footer** con wordmark, promesa de marca, `gold-rule`/divisor, redes con hover de color.

---

<a id="7"></a>
## 7 · Stack técnico recomendado

| Necesidad | Recomendación | Rol de cada pieza |
|---|---|---|
| Landing/marketing, control total | **Vite + Vanilla JS** | Cero overhead; máximo control del RAF. |
| E-commerce / app con datos y rutas | **Next.js + Tailwind** | SSR/rutas/estado; Tailwind = velocidad + consistencia. |
| React SPA con motion declarativo | **Vite + React + Framer Motion** | `motion` components, `AnimatePresence`, layout animations. |
| Animación imperativa/scroll | **GSAP + ScrollTrigger (+ SplitText, Flip)** | El estándar para timelines, pins, scrub, FLIP. |
| Scroll inercial premium | **Lenis** | Integrar al `gsap.ticker` con `lagSmoothing(0)`. |
| 3D / partículas / shaders | **Three.js** (o react-three-fiber + drei en React) | Fondos WebGL, partículas, modelos. |
| Iconos | **Lucide** (trazo fino) / Phosphor / Heroicons | + SVG propios para lo específico de marca. |
| Fuentes | **next/font** (Next) o **Fontsource** (Vite) autoalojadas | Evita FOUT y dependencia de CDN. |

**Principio de un solo RAF:** cuando animás varias cosas por JS (scroll + partículas +
cursor + HUD), corré **todo dentro de un único `requestAnimationFrame`/`gsap.ticker`**.
Múltiples RAF compiten y causan jank.

---

<a id="8"></a>
## 8 · Reglas de rendimiento (requisito, no extra)
- **Solo `transform`/`opacity`** en animaciones por frame. `will-change` puntual y temporal.
- **Un RAF** para todo lo animado por JS (§7).
- **Pausar WebGL/loops** fuera de viewport (`IntersectionObserver`) y con pestaña oculta
  (`visibilitychange`).
- **Degradar por dispositivo:** nº de partículas / calidad de video según
  `hardwareConcurrency`, `devicePixelRatio`, `navigator.connection.saveData`.
- **`content-visibility:auto`** en secciones largas fuera de pantalla.
- **Imágenes:** `next/image` o `loading="lazy" decoding="async"`, `sizes` correctos,
  formatos modernos (AVIF/WebP), `aspect-ratio` para evitar CLS.
- **Media pesada:** cache inmutable (`max-age=31536000, immutable`) + `Accept-Ranges`
  para video con seek.
- **No animar layout por frame**; si el escenario cambia de tamaño, escribir estilos
  **solo si realmente se movió** (umbral).
- **Precargar/decodificar** imágenes grandes antes de que entren en un scroll animado.

---

<a id="9"></a>
## 9 · Reglas de accesibilidad
- **`prefers-reduced-motion`**: rama obligatoria en CADA efecto → versión estática
  legible (sin shimmer/parallax/auto-play). Bloque global que baja animaciones a ~0ms.
- **`prefers-color-scheme`**: idealmente soportar claro/oscuro.
- **Contraste** (§2.1): verificar acento sobre fondo; nunca texto fino en color de bajo
  contraste.
- **Foco visible**: `:focus-visible` con outline claro (offset), navegable por teclado.
- **`aria-hidden`** en TODAS las capas decorativas (fondos, cursor, grano, partículas).
- **Semántica**: `nav/main/section/header/footer`, headings en orden, `alt` real en
  imágenes de contenido y `alt=""` en decorativas.
- **Cursor custom**: nunca ocultar el nativo en touch; asegurar que los controles siguen
  siendo operables sin el efecto.
- **Video**: `muted` para autoplay; controles o pausa disponible; respeta reduced-motion.
- **Modales**: focus-trap, cierre con ESC, retorno de foco al disparador.

---

<a id="10"></a>
## 10 · Checklist de calidad premium (pasá esto antes de dar por terminado)

**Diseño**
- [ ] 1 acento dominante + neutros; sin más de 2 acentos.
- [ ] Tipografía con contraste de tamaño fuerte; 2 fuentes máx (+mono si aplica).
- [ ] Espaciado generoso y consistente (escala de 8px); mucho aire.
- [ ] Jerarquía clara: una idea fuerte por sección.
- [ ] Radios/bordes/sombras coherentes en todo el sitio.
- [ ] Textura (grano/ruido) para que los planos no se vean "plásticos".

**Motion**
- [ ] Densidad de motion elegida (1/2/3) y **consistente**.
- [ ] Curva firma aplicada; timings dentro de rango; stagger en grupos.
- [ ] Reveals disparan temprano y `once`.
- [ ] Hover states con "peso" (`:active`, micro-scale).
- [ ] Loaders/transiciones encadenados sin saltos.
- [ ] Nada de shimmer/pulse infinito en exceso (reservar a lo premium real).

**Técnica**
- [ ] Solo `transform/opacity`; un RAF; loops pausados fuera de viewport.
- [ ] Degradación por dispositivo; imágenes/media optimizadas; sin CLS.
- [ ] `prefers-reduced-motion` en cada efecto.
- [ ] Contraste, foco visible, semántica, `aria-hidden` en decorativo.
- [ ] Prueba real en móvil gama media/baja (scroll fluido).

**Sensación final**
- [ ] Se siente **intencional**, no "plantilla con efectos".
- [ ] Tiene **una** firma memorable (el detalle que la gente recuerda).

---

<a id="11"></a>
## 11 · Ejemplo trabajado: **tienda de ropa** (cómo adaptar esta guía)

Demostración del framework §1 aplicado. Supongamos 3 marcas distintas para mostrar que
el **mismo sistema** produce resultados muy diferentes según el arquetipo.

### 11.A · Marca "ropa minimal / editorial" (ej. básicos premium, unisex)
- **Arquetipo:** Minimal/Editorial. **Mood:** limpio, atemporal, honesto.
- **Tokens:** `--bg #faf8f4` (hueso), `--text #16140f` (tinta), `--surface #fff`,
  `--accent #1a1a1a` (casi negro; el "lujo" es el contraste y el aire), `--line rgba(0,0,0,.1)`.
- **Tipografía:** display serif editorial (Fraunces/Canela) enorme + cuerpo grotesque
  (Söhne/Inter). Tracking negativo en titulares.
- **Fondo:** blanco con **grano sutil** + un orbe crema apenas visible. Nada 3D.
- **Motion (nivel 1–2):** reveals por **máscara de líneas**; imágenes con **clip-path que
  abre** + zoom lento; cursor **dot+ring** discreto; **sin** shimmer dorado.
- **Hero:** foto full-bleed de producto + titular que se "escribe" por líneas + CTA
  fill-sweep negro.
- **Grid de productos:** cards sin borde, foto `aspect-[3/4]`, **hover = swap a segunda
  foto** (frente→espalda) con crossfade + nombre/precio que aparecen; quick-add discreto.
- **Precio:** en tinta, sin adornos; "Edición limitada" = fino sello que hace fade-in.
- **Ficha de producto:** modal con **transición FLIP** desde la card; selector de talla
  con underline luxe; galería con scrub horizontal.
- **Firma memorable:** el swap frente/espalda al hover + tipografía editorial gigante.

### 11.B · Marca "streetwear / drop culture"
- **Arquetipo:** Streetwear/Joven. **Mood:** crudo, enérgico, urgente.
- **Tokens:** `--bg #0a0a0a`, `--text #fff`, `--accent #d6ff3f` (verde ácido) o naranja
  señal; `--surface #141414`.
- **Tipografía:** grotesque **bold/condensed** (Anton/Archivo Expanded) + mono para
  precios/labels ("SOLD OUT", "DROP 04").
- **Fondo:** negro + **marquee doble** (arriba/abajo, sentidos opuestos) con el nombre
  del drop + partículas o ruido sutil.
- **Motion (nivel 2–3):** entradas **snappy** (rápidas, `power4`), **glitch de 1 frame**
  al entrar productos, **count-up** para stock/timer de drop, cursor **con etiqueta**
  ("COP", "VER"), hover con **scale + acento**.
- **Hero:** contador regresivo del próximo drop + video de fondo del lookbook.
- **Grid:** cards con borde de acento en hover, badge "SOLD OUT" con velo, "restan N".
- **Firma memorable:** el marquee del drop + el timer + el acento neón.

### 11.C · Marca "moda de lujo / atelier"
- **Arquetipo:** Lujo. **Mood:** exclusivo, sensorial (aquí sí aplica casi tal cual el
  patrón de Majalis, pero con la paleta de la marca — quizá plata/negro o burdeos).
- **Tokens:** `--bg #070707`, `--accent` metálico de marca, glass, marfil de texto.
- **Motion (nivel 3):** fondo de **partículas**, cursor **líquido**, loader de marca,
  reveals por caracteres, **precio premium con flujo del metal**, sellos que rotan,
  **storytelling scroll-driven** "del atelier a tu armario".
- **Firma memorable:** el metal que fluye + la escena scroll-driven.

### 11.D · Método general para CUALQUIER tienda de ropa
1. **Fondo:** minimal→hueso+grano; streetwear→negro+marquee; lujo→partículas/oscuro.
2. **Hero:** foto/vídeo del producto estrella + titular con reveal por líneas + 1 CTA.
3. **Prueba social / marcas:** marquee de logos o testimonios.
4. **Grid de productos:** el corazón. Hover = swap de foto (siempre premium en ropa) +
   quick-add; badges de talla/estado; precio adaptado al arquetipo.
5. **Ficha:** modal/página con FLIP, galería (scrub o thumbnails), selector de talla con
   feedback, "añadido" con badge scale-in.
6. **Carrito/checkout:** drawer lateral con animación de entrada; envío/beneficio con
   sello sutil (§ patrón "envío incluido").
7. **Cursor + loader + transiciones de ruta** según el nivel de motion elegido.
8. **Pasá el checklist §10.** Especial foco: fotos optimizadas y scroll fluido en móvil
   (las tiendas de ropa viven de imágenes).

> La clave: **el patrón es el mismo** (hero → prueba → grid → ficha → carrito). Lo que
> cambia es la **piel** (tokens) y la **densidad de motion** (§1.3). Eso es "adaptar".

---

<a id="12"></a>
## 12 · Anti-patrones (evitar siempre)
- ❌ Más de 2 colores de acento → se ve barato. 1 acento + neutros.
- ❌ Shimmer/pulse/glow en loop infinito en muchos elementos → cansa; reservar a lo premium real.
- ❌ Animar `width/height/top/left` por frame → jank. Usar `transform`.
- ❌ Efectos sin rama `prefers-reduced-motion`.
- ❌ Cursor custom que no se desactiva en touch, o que rompe la operabilidad.
- ❌ Mezclar niveles de motion (una sección cinematográfica y otra plana) → incoherente.
- ❌ Tipografía con 4+ tamaños medios sin contraste → sin jerarquía.
- ❌ Sumar Three.js/GSAP "porque sí" sin medir impacto en móvil.
- ❌ Keyear timelines por objetos que un provider regenera (se reinician en loop).
- ❌ Loader con `setTimeout` ciego que "salta" al hero → encadenar por evento/promesa.
- ❌ Poco aire / todo apretado → lo premium respira.
- ❌ Autoplay de sonido sin opt-in.

---

<a id="13"></a>
## 13 · Casos de estudio (de dónde salió esta guía)

### 13.1 · Majalis — e-commerce de perfumes de lujo *(Next.js + Tailwind, tema oscuro)*
- **Idea:** lujo sensorial por **acumulación de capas** — fondo 3D fijo (1400 partículas
  doradas con onda de click), cursor líquido, loader de marca, y "oro que fluye" en
  cada componente (`background-clip:text` + gradiente 200% animado).
- **Firma:** el metal (oro) corriendo dentro de wordmark, links y precios premium.
- **Motion:** GSAP solo en el modal (timeline: velo→imagen→texto→pirámide olfativa);
  el resto CSS keyframes + IntersectionObserver.
- **Aprendizajes que quedaron en la guía:** restricción cromática (1 acento), keyear
  timelines por id, `prefers-reduced-motion` con fallback estático por efecto, degradar
  partículas por reduced-motion, badges con `backdrop-blur`.
- **Nivel de motion:** 2 (rico), con toques de 3.

### 13.2 · Arquitec — portfolio de arquitectura *(Vite + Vanilla JS, tema claro)*
- **Idea:** cine **scroll-driven** por **una gran idea** — un marco de video que **viaja**
  por 6 slots del layout mientras el edificio se **construye frame a frame** con el scroll.
- **Firma:** el "escenario viajero" + la caption técnica en vivo (fase de obra, dato,
  timecode) + los planos SVG que se dibujan en el menú.
- **Motion:** GSAP + ScrollTrigger (pins, scrub, scroll horizontal, count-up) + SplitText
  (líneas/chars) + Lenis (scroll inercial en un solo RAF) + Three.js (motas de polvo).
- **Aprendizajes que quedaron en la guía:** un solo RAF; escribir estilos solo si se
  movió; degradar video por dispositivo con guardián de fluidez; asimetría en las
  transiciones (partir temprano, aterrizar rápido); precargar/decodificar antes del
  scroll; pausar WebGL por visibilidad.
- **Nivel de motion:** 3 (cinematográfico).

### 13.3 · Fichas técnicas (paletas y ajustes reales — para calibrar, no copiar)
**Majalis (lujo oscuro):**
```
Fondo:  obsidian #050505 · coal #0A0908 · smoke #1A1714
Acento: gold #D4AF37 (light #E8C766 · champagne #F4E088 · dark #8B6F1E)
Texto:  ivory #F5EFE0 · pearl #EAE3D2
Fuentes: Cinzel (lapidary) + Cormorant Garamond (display) + Jost (cuerpo)
Tracking: regal .35em · imperial .5em · Base 17px
3D: 1400 partículas (400 con reduced-motion) · Curva: cubic-bezier(.22,1,.36,1)
```
**Arquitec (editorial claro):**
```
Fondo:  paper #f4f2ee · Texto: ink #1a1815 (+70/55/30%) · line rgba(26,24,21,.16)
Acento: bronze #8f7448 · bronce claro #d6b685 · night #16140f (sala oscura)
Fuentes: Cormorant Garamond 300 (serif) + IBM Plex Mono (datos)
3D: ~260 motas · Video: scrub 60fps por scroll · Scroll: Lenis · Curva: (.22,1,.36,1)
```
> Ambas paletas sirven de **ejemplo** de "1 acento + neutros + tracking amplio en
> labels". Para tu proyecto: cambiá el acento y las fuentes según el arquetipo (§1.1).

**Contraste útil:** Majalis = *muchas capas atmosféricas + oro por todos lados* (adecuado
a un catálogo). Arquitec = *una coreografía impecable* (adecuado a un relato único). Ambas
comparten la misma **curva firma** `cubic-bezier(.22,1,.36,1)` y la disciplina de
`prefers-reduced-motion`. Elegí el enfoque según si tu proyecto es "catálogo" o "relato".

---

<a id="14"></a>
## 14 · Apéndice — referencia rápida

### 14.1 · Easings
| Nombre | Valor | Uso |
|---|---|---|
| **Firma (expo-out suave)** | `cubic-bezier(.22, 1, .36, 1)` | 80% de todo: reveals, hover, botones. |
| Ease-out fuerte | `power3.out` / `power4.out` (GSAP) | Entradas de texto/cascadas. |
| Telón | `power4.inOut` / `cubic-bezier(.76,0,.24,1)` | Preloaders, wipes, menús fullscreen. |
| Resorte suave | `back.out(1.8)` | Aparición de FAB, sellos, chips. |
| Elástico | `elastic.out(1, 0.4)` | Magnéticos, "goma". |
| Lineal | `linear` | **Solo** loops: shimmer, marquee, spinner. |
| Lenis wheel | `t => Math.min(1, 1.001 - 2**(-10*t))` | Scroll inercial. |

### 14.2 · Duraciones de referencia
| Tipo | ms |
|---|---|
| Micro-interacción (hover, toggle) | 120–300 |
| Entrada de elemento | 500–900 |
| Telón / transición de vista | 700–1200 |
| Stagger entre hermanos | 30–90 |
| Loop ambiente (float/breathe) | 3.000–8.000 |
| Loop lento (shimmer/marquee) | 5.000–20.000 |

### 14.3 · Snippet — `prefers-reduced-motion` global (poner siempre)
```css
@media (prefers-reduced-motion: reduce){
  *,*::before,*::after{
    animation-duration:.001ms!important;animation-iteration-count:1!important;
    transition-duration:.001ms!important;scroll-behavior:auto!important}
}
/* + versión estática legible por cada efecto de acento (color pleno, sin flujo) */
```

### 14.4 · Snippet — Lenis + GSAP (un solo RAF)
```js
import Lenis from 'lenis';
const lenis=new Lenis({duration:1.05,wheelMultiplier:1.4,
  easing:t=>Math.min(1,1.001-2**(-10*t))});
lenis.on('scroll',ScrollTrigger.update);
gsap.ticker.add(t=>lenis.raf(t*1000));
gsap.ticker.lagSmoothing(0);
```

### 14.5 · Detección de entorno (qué capas activar)
```js
export const isTouch = matchMedia('(pointer:coarse)').matches;
export const fine    = matchMedia('(hover:hover) and (pointer:fine)').matches;
export const rm      = matchMedia('(prefers-reduced-motion:reduce)').matches;
export const heavyOK = !isTouch && !rm && (navigator.hardwareConcurrency||8) > 4;
// heavyOK → habilitar 3D / cursor / scrub. Si no, degradar.
```

### 14.6 · Orden de una sección premium (receta)
```
[fondo de capa] → eyebrow (label mono) → titular (reveal por líneas) →
subtítulo (fade) → media (clip-path abre + scale) → CTA (fill-sweep/magnético) →
detalles/stats (stagger / count-up)
```

<a id="15"></a>
## 15 · Playbook E-COMMERCE premium (universal, cualquier tienda)

Todo lo de arriba es la **piel**. Esto es el **esqueleto de comercio**: los patrones que
hacen que una tienda venda **y** se sienta premium. Sirve para ropa, joyas, muebles,
skincare, etc. Regla base: **el lujo en e-commerce es claridad + confianza + fricción
cero**, no adornos que estorban la compra.

### 15.1 · Arquitectura de páginas (sitemap mínimo)
| Página | Rol | Prioridad |
|---|---|---|
| **Home** | Contar la marca + rutas a comprar | Alta |
| **Colección / PLP** (Product Listing) | Explorar y filtrar | Alta |
| **Producto / PDP** (Product Detail) | Convencer y añadir al carrito | **Crítica** |
| **Carrito** (drawer) + **Checkout** | Cerrar la venta sin fricción | **Crítica** |
| **Lookbook / Editorial** | Deseo, contexto, "shop the look" | Media |
| **Sobre / Atelier** | Confianza, historia, valores | Media |
| **Cuenta / Wishlist / Pedidos** | Retención | Media |
| **Búsqueda** | Encontrar rápido | Alta |
| **Contacto / FAQ / Envíos-Devoluciones** | Reducir dudas y soporte | Media |

### 15.2 · Home premium — orden de secciones (receta)
```
1. Announcement bar (envío/beneficio, 1 línea, discreta)
2. Nav flotante (transparente → blur al scrollear)
3. Hero — 1 imagen/vídeo grande + 1 titular + 1 CTA (no más)
4. Prueba/marcas/press — marquee de logos o "visto en"
5. Categorías destacadas — 2–4 tiles grandes con hover
6. Producto estrella / colección nueva — grid corto
7. Editorial / lookbook — storytelling + "comprar el look"
8. Beneficios/confianza — envío, devoluciones, originalidad (iconos finos)
9. Newsletter — captura con clase (no popup agresivo)
10. Footer rico
```
Menos secciones, más grandes. El lujo **respira**.

### 15.3 · PLP / Colección (la página de explorar)
- **Grid:** 2 col móvil · 3–4 desktop. `aspect-ratio` consistente (ropa: `3/4` o `4/5`).
- **Card de producto premium (patrón oro):**
  - Foto principal + **swap a 2ª foto al hover** (frente→espalda / on-model→detalle).
  - Nombre + precio + (opcional) swatches de color mini.
  - Badge de estado esquinado: `Nuevo`, `Últimas unidades`, `Agotado`, `-30%`.
  - **Quick-add** discreto (aparece en hover, no tapa la foto en móvil).
- **Filtros/facetas:** talla, color, categoría, precio, material. Panel lateral (desktop)
  o bottom-sheet (móvil). Chips de filtros activos removibles. **Transición suave** del
  grid al filtrar (fade/reflow, no salto).
- **Orden:** relevancia / novedad / precio. 
- **Paginación vs scroll infinito:** para lujo, **paginación** o "cargar más" (control) >
  infinito puro (el infinito rompe el footer y da sensación "outlet").
- **Estado vacío:** "Ninguna prenda coincide" con sugerencia y botón de limpiar filtros.

### 15.4 · PDP / Ficha de producto (la página que vende) — anatomía
```
┌─ Galería (izq, sticky en desktop) ─┬─ Info (der) ───────────────┐
│ · imagen principal + zoom          │ marca / nombre             │
│ · thumbnails / scroll vertical     │ precio (+ tachado si oferta)│
│ · on-model, detalle, ghost, vídeo  │ swatches de color          │
│ · pinch-zoom en móvil              │ selector de TALLA + guía   │
│                                    │ [AÑADIR AL CARRITO] sticky │
│                                    │ wishlist ♡                 │
│                                    │ "modelo mide X, usa talla S"│
│                                    │ acordeón: descripción/     │
│                                    │   composición/cuidado/envío│
│                                    │ envío & devoluciones       │
└────────────────────────────────────┴────────────────────────────┘
+ "Completá el look" / relacionados (cross-sell)
+ reseñas (si aplica, discretas)
```
- **Add-to-cart sticky** (aparece al scrollear la ficha) — jamás perderlo de vista.
- **Selector de talla:** botones (no dropdown), talla agotada = tachada/deshabilitada,
  link a **guía de tallas** (modal con tabla + medidas). Feedback claro si falta elegir.
- **Variantes de color:** swatches que cambian la galería con **crossfade** (no recarga).
- **Detalles en acordeón** para no saturar: composición, cuidado, origen, fit.
- **Confianza junto al botón:** envío, devoluciones, "100% original", pago seguro.

### 15.5 · Carrito y checkout
- **Carrito = drawer lateral** que entra deslizando (no página aparte): thumbnail, talla/
  color, cantidad, subtotal, envío, CTA. Editable inline.
- **Fly-to-cart:** al añadir, la foto "vuela" a la bolsita del nav + **badge scale-in** +
  el drawer se abre 1s. (Feedback = confianza de que se agregó.)
- **Mini-cart** al hover del icono (desktop).
- **Checkout premium = mínimo y rápido:** 1 columna, pocos campos, invitado permitido,
  progreso claro, resumen siempre visible, métodos de pago con logos, sin sorpresas de
  costo al final. Cada paso con micro-transición.
- **Beneficio de envío** como sello sutil (barra de "te faltan X para envío gratis").

### 15.6 · Estados (lo que separa "amateur" de "premium")
- **Loading:** skeletons con shimmer (no spinners genéricos) que respetan el layout final.
- **Vacío:** carrito/wishlist/búsqueda vacíos con ilustración + CTA, nunca en blanco.
- **Error:** mensajes humanos, con acción de recuperación.
- **Agotado / Back-in-stock:** "Avisame cuando vuelva" (captura de email elegante).
- **Éxito:** confirmaciones con micro-celebración sutil (check + fade), sin estridencia.

### 15.7 · Conversión premium SIN caer en lo barato
- ✅ **Escasez honesta:** "Quedan 3" solo si es verdad. Edición limitada real.
- ✅ **Urgencia real:** fin de una colección/drop con fecha real.
- ❌ Contadores falsos, "17 personas viendo esto", popups que atrapan. Lo premium **no
  manipula** — la exclusividad se siente por calidad, no por presión.
- **Captura de email:** ofrecer valor (acceso anticipado, guía de estilo), no "10% ya".
- **Trust signals** con clase: originalidad, envío asegurado, devoluciones simples,
  atención por WhatsApp/chat.

### 15.8 · Micro-animaciones propias de comercio
| Momento | Animación |
|---|---|
| Añadir al carrito | Fly-to-cart + badge scale-in + drawer abre |
| Hover en card | Swap de foto + nombre/precio suben |
| Cambiar color | Crossfade de galería |
| Zoom en PDP | Zoom con lente (desktop) / pinch (móvil) |
| Filtrar PLP | Reflow del grid con fade (FLIP ideal) |
| Card → PDP | Transición FLIP (la foto vuela) / View Transition |
| Quitar del carrito | Slide-out + colapso de altura |
| Wishlist ♡ | Latido + relleno del corazón |

---

<a id="16"></a>
## 16 · Playbook TIENDA DE ROPA de lujo (lo más premium y exclusivo posible)

Aquí bajamos al detalle de **ropa**. En moda, el 80% de la percepción de lujo es
**fotografía + tipografía + aire + fluidez de la ficha**. El código es el 20%.

### 16.1 · Regla nº1 — la FOTOGRAFÍA manda
Sin dirección de foto consistente, ninguna animación salva la tienda. Definí un sistema:
- **Tipos de toma** (usar los mismos en todo el catálogo):
  1. **On-model** (prenda puesta, cuerpo entero) — la principal.
  2. **Detalle** (textura, costura, tela) — para el hover y la galería.
  3. **Ghost mannequin / flat lay** (prenda sola sobre fondo limpio) — para consistencia.
  4. **Vídeo corto** (la prenda en movimiento) — sube el lujo enormemente.
- **Consistencia brutal:** mismo fondo, misma luz, mismo encuadre y **mismo aspect-ratio**
  (`4/5` o `3/4`) en TODAS. Un catálogo inconsistente se ve barato al instante.
- **Art direction por breakpoint:** encuadre vertical en móvil, más aire en desktop
  (`<picture>` con recortes distintos).
- **Tratamiento:** grano sutil y color grade coherente (cálido o frío según marca). Nada
  de fotos con flash duro o fondos ruidosos.
- **Hover swap** (el gesto premium de ropa): foto 1 (on-model) → foto 2 (detalle o
  espalda) con **crossfade** de ~400ms.
```css
.card__media{position:relative;aspect-ratio:4/5;overflow:hidden}
.card__media img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;
  transition:opacity .5s ease, transform 1.2s ease}
.card__media .img2{opacity:0}
.card:hover .img1{opacity:0}
.card:hover .img2{opacity:1;transform:scale(1.04)}
```

### 16.2 · Sistema de producto de ropa (lo que una prenda necesita)
- **Swatches de color/variante:** círculos o mini-fotos; el activo con anillo de acento;
  cambian la galería con crossfade; nombre del color visible ("Verde oliva").
- **Selector de talla:** botones `XS S M L XL`, agotadas tachadas, **guía de tallas** en
  modal (tabla cm/in + cómo medir). Idealmente "recomendador de talla".
- **Fit & fotografía informativa:** "La modelo mide 1,78 m y lleva talla S", tipo de fit
  (oversize / regular / slim), largo.
- **Materialidad (storytelling de tela):** composición ("100% lino"), origen, textura en
  macro, cuidado (lavado). Esto **es** el lujo en ropa — contalo con una foto de detalle
  + microcopy, no una lista fría.
- **Sostenibilidad / origen** si aplica: sello discreto ("Hecho en …", "Algodón orgánico").
- **Disponibilidad honesta:** "Últimas unidades" real; "Agotado → avisame".

### 16.3 · Lookbook / Editorial / Shop-the-look (el arma de deseo)
- **Lookbook:** galería editorial full-bleed, tipografía grande, scroll con reveals por
  líneas. Es la sección que hace **desear**, no vender directo.
- **Shop the look / shoppable image:** foto de un outfit con **puntos interactivos** (hot-
  spots) que abren un mini-card del producto y "añadir".
- **"Completá el look"** en la PDP: cross-sell curado (no "quién compró también").
- **Grid editorial asimétrico / bento:** mezclar tamaños de imagen (una grande + dos
  chicas) rompe la monotonía del grid de tienda y se ve de revista.

### 16.4 · Colecciones, drops y temporadas
- **Colecciones con identidad:** cada una con su hero y su historia (no solo un filtro).
- **Drops (si la marca es de escasez):** contador real al próximo lanzamiento, "lista de
  espera", acceso anticipado para suscriptores. Genera exclusividad **auténtica**.
- **Archivo / Temporadas pasadas:** da profundidad de marca ("desde 20XX").

### 16.5 · Palancas de EXCLUSIVIDAD (cómo se *siente* caro y selecto)
| Palanca | Cómo se expresa en la web |
|---|---|
| **Escasez real** | Ediciones limitadas, numeradas, "1 de 50". |
| **Acceso** | Lista de espera, pre-registro, área de miembros. |
| **Servicio** | Atención personal (WhatsApp/estilista), asesoría de talla. |
| **Ritual/packaging** | Mostrar el unboxing, la caja, el papel, la nota escrita. |
| **Origen/artesanía** | Storytelling del atelier, "hecho a mano", quién lo hace. |
| **Curaduría** | Poco producto, muy bien elegido (no 5.000 SKUs). |
| **Silencio visual** | Mucho aire, poca UI, tipografía grande, 1 acento. |
| **Tiempo** | Made-to-order, "se produce al pedirlo", lead time como valor. |
- **Principio:** exclusivo = **menos, mejor, más lento, más contado**. La web de lujo
  muestra *menos* producto por pantalla y *más* historia por producto.

### 16.6 · Microcopy y tono (premium ≠ gritón)
- Frases cortas, seguras, sin signos de exclamación de descuento.
- ✅ "Envío asegurado a todo el país." · "Edición limitada." · "Hecho para durar."
- ❌ "¡¡OFERTA!! ¡COMPRÁ YA!" · "MEGA DESCUENTO".
- CTAs con voz de marca: "Añadir a la bolsa" / "Descubrir la colección" / "Reservar tu
  talla" en vez de "Comprar" genérico.
- Errores humanos: "Elegí una talla para continuar" (no "Error: campo requerido").

### 16.7 · Motion específico para ropa (nivel 2–3, elegí y sé consistente)
- **Hero:** vídeo de la prenda en movimiento **o** foto con reveal por líneas del titular.
- **Card:** swap de foto (§16.1) — obligatorio en ropa premium.
- **PDP:** galería con zoom-lente (desktop) y pinch (móvil); cambio de color por crossfade;
  add-to-cart sticky con fly-to-cart.
- **Lookbook:** parallax suave de imágenes + reveals editoriales; hotspots que laten.
- **Transición Colección → Producto:** FLIP / View Transition (la foto vuela) — de lo más
  premium que existe y muy factible.
- **Carrito:** drawer que entra deslizando; ítems que entran/salen con altura animada.
- **NADA de shimmer dorado en todo** salvo que la marca sea "lujo metálico"; en moda
  minimal el motion es **limpio y silencioso**.

### 16.8 · Blueprint página por página (tienda de ropa premium)
**HOME**
```
Announcement bar → Nav → Hero (vídeo/foto + titular + 1 CTA) →
Marquee de prensa/marcas → Categorías (tiles grandes con hover) →
"Nueva colección" (grid corto de 4–8) → Editorial/Lookbook (shop-the-look) →
Beneficios (envío/devoluciones/original, iconos finos) → Newsletter → Footer
```
**COLECCIÓN (PLP)**
```
Hero de colección (imagen + nombre + intro corta) → Filtros (talla/color/precio) +
orden → Grid con swap de foto + quick-add + badges → "Cargar más" (no infinito puro)
```
**PRODUCTO (PDP)**
```
Galería sticky (on-model/detalle/ghost/vídeo, zoom) │ Info: marca/nombre/precio →
swatches color → tallas + guía → [Añadir a la bolsa] sticky → ♡ wishlist →
"modelo mide/usa" → acordeón (descripción/composición/cuidado/envío) → confianza
↓ Completá el look (cross-sell) ↓ (reseñas discretas)
```
**CARRITO/CHECKOUT**
```
Drawer lateral (thumb/talla/color/cant/subtotal/envío) → barra "faltan X para envío
gratis" → Checkout 1 columna, invitado, resumen fijo, pagos con logos, cero sorpresas
```
**SOBRE / ATELIER**
```
Historia + fotos del proceso/artesanía + valores + fundadores → refuerza exclusividad
```

### 16.9 · Checklist específico de tienda de ropa premium
- [ ] Fotografía 100% consistente (mismo ratio, luz, fondo, grade) — **lo primero**.
- [ ] Hover swap de foto en cada card.
- [ ] PDP con galería rica + zoom + add-to-cart sticky + guía de tallas.
- [ ] Swatches de color que cambian la galería sin recargar.
- [ ] Info de fit/modelo/composición/cuidado presente y bien contada.
- [ ] Carrito drawer + fly-to-cart + badge.
- [ ] Checkout mínimo, invitado, sin sorpresas de costo.
- [ ] Lookbook / shop-the-look para deseo.
- [ ] Skeletons en carga (no spinners); estados vacío/agotado/error resueltos.
- [ ] Microcopy premium (sin gritar), CTAs con voz de marca.
- [ ] 1 acento + neutros + mucho aire + tipografía grande.
- [ ] Motion consistente (1 nivel), silencioso si la marca es minimal.
- [ ] Móvil impecable (la mayoría compra ahí): fotos rápidas, scroll fluido, sticky CTA.
- [ ] Sin dark patterns; exclusividad por calidad, no por presión.

### 16.10 · Referencias mentales para calibrar (inspirarse, NO copiar)
- **Minimal/editorial de lujo:** el silencio visual y la foto gigante estilo casas de
  moda de gama alta y básicos premium.
- **Streetwear/drops:** contadores, marquees, energía, acento fuerte.
- **Atelier/artesanal:** storytelling de proceso, cálido, materia, hecho a mano.
Elegí **uno** como norte y aplicá §1 (arquetipo → tokens → motion). No mezclar tres.

---

<a id="17"></a>
## 17 · Ecosistema de librerías y herramientas (con qué se construye lo premium)

Regla: **elegí pocas y dominalas.** Un stack sobrecargado pesa y se contradice. Estas son
las piezas del ecosistema premium actual (2025–2026) por rol.

### 17.1 · Animación / timeline
| Librería | Rol | Cuándo |
|---|---|---|
| **GSAP 3** (+ ScrollTrigger, ScrollSmoother, SplitText, Flip, Draggable, Observer, MotionPath, MorphSVG) | El estándar de motion imperativo y scroll | Cualquier stack. **Desde 2025 es 100% gratis, incluidos TODOS los plugins** (tras la compra por Webflow) — ya no hay "Club GreenSock" de pago. |
| **Motion** (motion.dev, ex–Framer Motion) | Motion declarativo + gestures + layout animations + spring | Ideal en **React**; también vanilla. `AnimatePresence` para montar/desmontar. |
| **Motion One** | Micro-lib sobre Web Animations API (WAAPI) | Cuando querés animar con casi cero KB. |
| **Anime.js v4** | Animación ligera, reescrita en 2025 | Alternativa liviana a GSAP para cosas simples. |

> **Verificado (jul-2026):** GSAP `github.com/greensock/GSAP` ⭐26.5k · Motion
> `github.com/motiondivision/motion` ⭐32.7k (antes `framer/motion`, ahora redirige) ·
> React Three Fiber `github.com/pmndrs/react-three-fiber` ⭐31.4k · Storybook
> `github.com/storybookjs/storybook` ⭐90.5k · Three.js `github.com/mrdoob/three.js`.

### 17.2 · Scroll
- **Lenis** (darkroom.engineering) — **el smooth scroll actual**; inercial, integra con
  GSAP ScrollTrigger, un solo RAF. Sucesor de **Locomotive Scroll**.
- **ScrollSmoother** (GSAP) — alternativa si ya usás todo GSAP.

### 17.3 · 3D / WebGL
- **Three.js** — el motor 3D de la web (partículas, escenas, modelos, shaders).
- **React Three Fiber** (`@react-three/fiber`) + **drei** + **postprocessing** — Three
  declarativo en React (helpers, cámaras, efectos).
- **OGL** / **curtains.js** — WebGL ligero para efectos de imagen/plano con shaders.
- **Spline** — herramienta de diseño 3D **sin código** con export/embed (rápido para 3D
  no crítico). Cuidado con el peso en móvil.
- **Shaders (GLSL)** — para firmas visuales únicas (fondos generativos, distorsión de imagen).

### 17.4 · Vector interactivo / micro-animación
- **Rive** — animaciones vectoriales **interactivas con state machines**, runtime muy
  pequeño; ideal íconos animados, botones, mascotas, ilustraciones reactivas. Reemplaza a
  Lottie cuando hay interacción/estados.
- **Lottie** (`lottie-web` / `dotLottie`) — animaciones exportadas de After Effects
  (Bodymovin) como JSON; bueno para ilustraciones e íconos lineales que solo reproducen.

### 17.5 · Texto, transiciones, carruseles, física
- **Texto:** SplitText (GSAP, ya gratis) · **SplitType** · **Splitting.js** — partir en
  líneas/palabras/caracteres para reveals editoriales.
- **Transiciones de página:** **View Transitions API** (nativo, preferido) · **Barba.js**
  / **Swup** como fallback en MPA sin soporte.
- **Carruseles:** **Embla Carousel** (ligero, sin deps, el favorito actual) · **Swiper**
  (completo: touch, virtual, efectos) · **Keen-slider** (ligero).
- **Física 2D:** **Matter.js** (objetos que caen/chocan) · **Vanilla-tilt.js** (tilt, o
  hacerlo con GSAP).
- **Tooling:** **Theatre.js** (secuenciador con UI) · editores de **Rive/Spline/LottieFiles**.

### 17.6 · Componentes / estilos / imágenes (según stack)
- **Tailwind CSS** — utilidades: velocidad + consistencia (base de casi todo e-commerce moderno).
- **shadcn/ui** (Radix + Tailwind) · **Radix UI** · **Ark UI** · **React Aria** —
  primitivos **accesibles** headless para React; se animan con Motion.
- **Imágenes:** `next/image` · **sharp** · **plaiceholder** (blur placeholder) · CDN de
  imagen (Cloudinary/imgix) · formatos **AVIF/WebP**.

### 17.7 · Combos recomendados
- **Landing/portfolio premium (vanilla):** Vite + **GSAP + Lenis** (+ Three si hay 3D).
- **E-commerce React/Next:** Next + **Tailwind** + **Motion o GSAP** + **Embla** + **Lenis**
  + `next/image` + shadcn/Radix.
- **SPA con mucho motion declarativo:** Vite + React + **Motion**.

---

<a id="18"></a>
## 18 · CSS moderno para premium (2025–2026) — usar como *mejora progresiva*

Muchísimo de lo que antes exigía JS hoy es **CSS nativo**: más liviano, más fluido, menos
código. Regla: usalo con `@supports`/fallback para que el estado final siempre sea usable.

### 18.1 · Motion sin JS
- **Scroll-driven animations:** `animation-timeline: scroll()` (progreso global) y
  `view()` (según el elemento entra/sale del viewport) + `animation-range`. → reveals y
  barras de progreso **sin JS**. (Chromium sólido; Safari/Firefox en progreso → fallback.)
- **`@starting-style` + `transition-behavior: allow-discrete`** → animar **entrada y
  salida** de elementos que aparecen/desaparecen (`<dialog>`, popover, `display:none`).
- **`@property`** → custom properties **tipadas y animables** (p.ej. animar de verdad el
  ángulo de un gradiente cónico).

### 18.2 · Transiciones de vista
- **View Transitions API:** *same-document* (`document.startViewTransition(cb)`) y
  **cross-document** (`@view-transition { navigation: auto }`) para transiciones entre
  páginas tipo app. Con `view-transition-name` un elemento "vuela" entre vistas → **la
  transición card → ficha de producto** más premium, casi sin código.

### 18.3 · Layout
- **Container queries** (`@container`) + unidades `cqi/cqw` → componentes que reaccionan a
  **su contenedor**, no al viewport. Clave para cards reutilizables en cualquier grid.
- **`:has()`** — "selector padre": estilar la card **si** contiene un badge, el form **si**
  hay error, el nav **si** el menú está abierto.
- **Subgrid** — alinear grids anidados. **Masonry** (en camino). **Anchor positioning**
  (`anchor()`) para tooltips/menús anclados sin JS.

### 18.4 · Color y tipografía
- **`oklch()` + `color-mix()`** → paletas perceptualmente uniformes, glows **sin banding**,
  derivar variantes de 1 acento. **Relative color** `rgb(from var(--c) …)`, **`light-dark()`**.
- **`text-wrap: balance`** (titulares) / **`pretty`** (párrafos). **Variable fonts** (1
  archivo, animar peso/ancho en hover). **`clamp()`** para type fluido; **`ch`** para ancho.

### 18.5 · Móvil / viewport (¡crítico! ver §20)
- **`dvh/svh/lvh`** → alturas que respetan la barra del navegador móvil (usar `100dvh` en
  héroes, **nunca `100vh`** que "salta" al ocultarse la barra).
- **`env(safe-area-inset-*)`** → respetar notch / home indicator en barras fijas.
- **`overscroll-behavior: contain`** → el scroll de un drawer/modal no arrastra la página.
- **`scroll-snap`** → carruseles/galerías con snap suave. **`touch-action`** → controlar gestos.

### 18.6 · Rendimiento y componentes nativos
- **`content-visibility: auto`** (+ `contain-intrinsic-size`) → no renderizar lo que no se ve.
- **`@layer`** (cascade layers), **nesting nativo**, `:is()/:where()`.
- **`<dialog>`** (modales accesibles nativos) y **Popover API** (`popover` attr) → menús/
  tooltips sin JS pesado.

**Snippet — reveal scroll-driven sin JS (con fallback):**
```css
@media (prefers-reduced-motion: no-preference){
  @supports (animation-timeline: view()){
    .reveal{animation: fade-up linear both; animation-timeline: view();
            animation-range: entry 0% entry 40%;}
    @keyframes fade-up{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
  }
}
/* sin soporte: .reveal queda visible por defecto (no se oculta) */
```

---

<a id="19"></a>
## 19 · Tendencias de diseño premium (nivel Awwwards) — cuándo sí, cuándo no

Cada tendencia es una **herramienta**, no una obligación. Elegí las que sirvan a la marca
(§1) y al nivel de motion (§1.3). La disciplina (1 acento, aire, coherencia) es lo que
separa "Awwwards" de "template con efectos".

| Tendencia | Qué es | Va bien con | Cuidado |
|---|---|---|---|
| **Kinetic / big typography** | Texto gigante que se mueve/parte | Moda, editorial, agencias | Legibilidad; peso de fuentes |
| **Variable fonts** | Animar peso/ancho | Casi todo (sutil) | No abusar |
| **Bento grids** | Módulos tipo bandeja, tamaños mixtos | Portfolios, features | Jerarquía clara |
| **3D / WebGL inmersivo** | Escenas y objetos 3D | Lujo, tech, gaming | Peso, batería, **móvil** |
| **Configurador 3D de producto** | Girar/personalizar en vivo | Muebles, sneakers, autos | Fallback a fotos |
| **Scrollytelling / scroll-driven** | La historia avanza con el scroll | Producto estrella, marca | No secuestrar el scroll; dar salida |
| **Custom cursors** | Firma interactiva | Desktop | Desactivar en touch |
| **Glassmorphism / profundidad** | Vidrio, capas, blur | Tech, lujo oscuro | Contraste del texto |
| **Grain / noise / analog** | Textura fílmica | Da alma a lo plano | Muy sutil (opacity ~.03) |
| **Aurora / mesh gradients animados** | Color vivo en movimiento | Wellness, tech, fresco | Banding (usar noise) |
| **Dark mode + alto contraste** | Dramático, premium | Lujo, tech | Ofrecer claro también |
| **Editorial / revista** | Asimetría, tipografía, aire | Moda, arquitectura | Requiere buena foto |
| **Brutalismo / anti-diseño** | Crudo, tipográfico, crudo | Streetwear, arte, música | Nicho; usabilidad |
| **Micro-interacciones** | Feedback en cada acción | Universal | Consistencia |
| **Horizontal scroll** | Galerías/casos laterales | Portfolios | Descubribilidad en móvil |
| **Marquees / tickers** | Energía, listas | Streetwear, novedades | No mareante |
| **Hover-swap / galerías inmersivas** | 2ª foto al interactuar | **Moda** (esencial) | Equivalente táctil en móvil |
| **Nostalgia / Y2K / retro** | Estética de época | Público joven | Coherencia de marca |
| **Personalización / IA** | Hero/recos dinámicos | E-commerce | Privacidad, no ser genérico |
| **Sostenibilidad / low-carbon / a11y como lujo** | Ligero, accesible, con valores | Marcas conscientes | Que sea real, no greenwashing |

**Cómo decidir "cuánto":** si el proyecto es *catálogo* (muchos productos) → priorizá
claridad + micro-interacciones + hover-swap. Si es *relato* (una marca/producto estrella)
→ scrollytelling + 3D + cinematográfico. **Nunca las dos al máximo a la vez.**

---

<a id="20"></a>
## 20 · ⭐ Experiencia MÓVIL premium (foco crítico — aquí se vende)

**La mayoría del tráfico y de las ventas de e-commerce ocurre en el teléfono.** Una web
premium se diseña **mobile-first** y se prueba en teléfonos reales. Si algo deslumbra en
desktop pero es torpe en móvil, **comercialmente fracasa.** Esta sección es obligatoria.

### 20.1 · Mentalidad
- Diseñá la pantalla chica **primero**; el desktop es la ampliación (no al revés).
- **Una acción principal por pantalla.** En móvil, menos es más.
- Probá en **dispositivos reales gama media/baja + red lenta**, no solo en el emulador.

### 20.2 · Ergonomía del pulgar (thumb zone)
- Acciones principales en el **tercio inferior** (zona cómoda del pulgar).
- **Nav inferior** (tab bar) y **bottom sheets** para filtros/carrito/menú — no controles
  arriba, lejos del pulgar.
- **Add-to-cart pegado abajo (sticky)** en la ficha de producto — siempre a la vista.
- Todo operable con **una mano**.

### 20.3 · Objetivos táctiles y gestos
- Touch targets ≥ **44×44px** (Apple) / **48×48** (Material), con separación para no errar.
- **Sin interacciones solo-hover:** en móvil no hay hover → todo lo de hover necesita
  equivalente en tap. (El hover-swap de foto → en móvil, tap o 2ª foto en el carrusel.)
- **Gestos naturales:** swipe en galerías, swipe-to-dismiss del drawer, pull-to-refresh
  donde aplique — con `touch-action` y `scroll-snap`.
- **Feedback táctil inmediato:** estados `:active`, ripples; opcional `navigator.vibrate()`
  muy sutil en acciones clave.

### 20.4 · Viewport y layout móvil
- Usar **`100dvh`/`svh`** (no `100vh`) en héroes → evita el "salto" al ocultarse la barra de URL.
- Respetar **safe areas** (`env(safe-area-inset-*)`) en notch / home indicator (barras fijas).
- **Tipografía cómoda:** cuerpo **≥ 16px** (además **evita el zoom automático de iOS** al
  enfocar inputs). Line-height generoso.
- **`overscroll-behavior: contain`** en drawers/modales.

### 20.5 · Rendimiento móvil (Core Web Vitals — decisivo para vender)
- Metas en móvil: **LCP < 2.5s · INP < 200ms · CLS < 0.1.**
- **Imágenes = ~80% del peso en tiendas:** AVIF/WebP, `srcset`/`sizes`, `loading="lazy"`,
  `fetchpriority="high"` en el hero, **`aspect-ratio` para CLS 0**, art direction con
  `<picture>` (recorte vertical en móvil).
- **Menos JS:** enviar poco, hidratar poco, diferir lo no crítico. El **3D/partículas se
  degrada o se apaga en móvil** (CPU + batería) — usar `heavyOK` (§14.5).
- **Fuentes:** `font-display: swap`, subsetear, `preload` la crítica.
- **Cero layout shift:** reservar espacio de media; **skeletons** que respetan el layout final.
- **Presupuesto de motion:** parallax/scrub pesados solo si el device aguanta; si no, reveals simples.

### 20.6 · Checkout y formularios móviles (donde se cae la venta)
- **Teclado correcto:** `inputmode`, `type="email/tel/number"`, `autocomplete` tokens
  (`cc-number`, `postal-code`, `email`…), `enterkeyhint`.
- **Autofill + wallets:** Apple Pay / Google Pay / link → 1 tap; enorme aumento de conversión.
- **Mínimos campos**, invitado permitido, **1 columna**, resumen siempre visible, progreso claro.
- **Inputs grandes**, labels visibles, errores inline claros; font ≥16px (anti-zoom iOS).
- **Nada de popups intersticiales** que tapen contenido (Google penaliza y arruinan la UX).

### 20.7 · Patrones móviles premium (e-commerce)
- Barra inferior con **add-to-cart + precio** en la PDP.
- **Bottom sheet** para filtros, guía de tallas, carrito rápido.
- **Galería swipeable** con dots + **pinch-zoom**.
- **Announcement bar** discreta (1 línea).
- **Búsqueda** con teclado correcto + sugerencias en vivo.
- **Menú** como panel/sheet a pantalla, no dropdown minúsculo.

### 20.8 · PWA y extras
- **PWA** (manifest + service worker): "añadir a inicio", cascarón offline, se siente app →
  sube retención.
- **Compartir nativo** (`navigator.share`) del producto. **Haptics** sutiles (Android).

### 20.9 · Accesibilidad + motion en móvil
- Muchos usuarios activan **reduce motion** (mareo) → respetarlo siempre.
- **Alto contraste** (el teléfono se usa al sol).
- Zonas táctiles generosas también ayudan a accesibilidad motriz.

### 20.10 · Checklist MÓVIL (pasar SIEMPRE)
- [ ] Diseñado mobile-first y **probado en teléfono real**.
- [ ] Acciones clave en zona del pulgar; **add-to-cart sticky**.
- [ ] Touch targets ≥44px; **sin interacciones solo-hover**.
- [ ] `dvh/svh` en héroes; safe areas; cuerpo ≥16px (sin zoom iOS).
- [ ] LCP/INP/CLS en verde en móvil; imágenes AVIF/WebP + lazy + `sizes`.
- [ ] 3D/parallax degradados o apagados en móvil.
- [ ] Checkout con wallets, teclados correctos, autofill, mínimos campos.
- [ ] Bottom sheets para filtros/carrito; galería swipeable + pinch-zoom.
- [ ] Sin popups intersticiales; feedback táctil en cada tap.
- [ ] Reduce-motion respetado.

---

## ✅ Alcance de esta guía (¿falta algo?)
Con **§SETUP + §0–§20** tenés una base **completa** para que una IA construya siempre con
calidad alta y premium, en **móvil y escritorio**: **setup de tooling y skills de diseño**,
pensamiento de diseño, tokens, fondos, cursores, todas las familias de animación,
componentes, stack y **librerías**, **CSS moderno**, **tendencias**, rendimiento,
accesibilidad, checklist de calidad, **e-commerce**, **tienda de ropa** y **experiencia
móvil**.

**Orden de trabajo recomendado para la IA:** completar **§SETUP** → seguir el flujo de §0
→ diseñar con los catálogos → pulir con **`/design-review`** → pasar los checklists
(§10 calidad · §20 móvil). Nunca saltar el SETUP ni el bucle visual.

**Temas de implementación/negocio** (fuera de la capa estético-motion; se detallan si un
proyecto los pide): internacionalización y multi-moneda, plataforma de commerce concreta
(Shopify/Hydrogen, Medusa, WooCommerce), pasarelas de pago, analítica/pixel, SEO técnico
profundo, emails transaccionales y design tokens en código (Style Dictionary/Storybook).

> **Estado de verificación:** el tooling de **§SETUP (0.3)** y las librerías núcleo de
> §17 tienen **estrellas y versiones confirmadas vía API de GitHub/npm (julio 2026)**. Los
> conceptos de §18 (CSS moderno) y §19 (tendencias) son conocimiento de dominio actualizado
> a inicios de 2026. El ecosistema cambia rápido: ante la duda, revalidá versión/estado de
> cada herramienta antes de fijarla en un proyecto.

---

_**Recordatorio final:** este documento describe **cómo pensar** el diseño y el motion
premium, con un catálogo de técnicas para elegir. No es un molde. Para cada proyecto:
definí la marca (§1), derivá los tokens, elegí la densidad de motion, tomá del catálogo
lo que sirva a ESA historia, y pasá el checklist (§10). Adaptar > copiar._
