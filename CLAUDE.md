# CLAUDE.md — Cobro con productos y servicios (Bold POS)

## Qué es este proyecto
Prototipo mobile del flujo "Cobro con productos y servicios" del POS de Bold.
Objetivo: pruebas de usabilidad en calle y con stakeholders. Debe sentirse
funcional y real; el estado persiste durante la sesión.
Escenario base: comercio en día 0, sin productos creados.

## Stack técnico
- React + TypeScript + Vite
- Tailwind CSS v4 (plugin @tailwindcss/vite, sin tailwind.config.js)
- Persistencia: estado en React (migrar a localStorage donde aplique)
- Fuente: Montserrat vía Google Fonts (cargada en index.html)

## Origen del código
Portado desde un export de Figma Make. El código de `src/imports/` es
generado por máquina (posiciones absolutas, SVGs inline, nombres de fuente
tipo `font-['Montserrat:Bold']`). NO editar a mano los archivos de imports;
son la fuente visual pixel-perfect de cada frame.

## Estructura
- `src/app/App.tsx` → routing por estado y toda la lógica del flujo
- `src/imports/` → frames de Figma Make (SVGs, PNGs). No tocar a mano.
- `src/styles/tokens.css` → tokens de Merlin (fuente de verdad de diseño)
- `src/styles/fonts.css` → aliases de fuente de Figma Make
- `src/styles/theme.css` → theme de Figma Make (shadcn, no se usa activamente)
- `src/components/` → componentes limpios reutilizables (en construcción)
- `src/state/` → estado del prototipo (en construcción)
- `docs/MERLIN-SYSTEM.md` → referencia completa del design system

## Pantallas (AppScreen en App.tsx)
home-payments → home-productos → tus-productos → create-product
→ product-detail → cobro

## Design System — Merlin v1.6.6
- Color primario Bold: #ff2947 (coral-100). NUNCA usar #E8194B (es el viejo)
- Hover CTA: #e4102e
- Azul títulos/labels: #121e6c
- Fuente siempre Montserrat, nunca system font
- Referencia completa de tokens: docs/MERLIN-SYSTEM.md
- Preferir variables CSS de tokens.css sobre hardcodear colores

## Reglas críticas
- NO editar archivos en src/imports/ a mano (son generados)
- Pixel perfect: respetar los diseños; no inventar UI ni cambiar textos
- Antes de editar un archivo, confirmar que es el correcto
- Mantener el flujo funcional; no romper la navegación por estado existente
- Al terminar cambios: git add . && git commit && git push

## Comandos
- Dev: NODE_TLS_REJECT_UNAUTHORIZED=0 npm run dev
- (La variable SSL es por la red de Bold)