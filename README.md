# panda-monorepo

npm-workspaces monorepo reproducing the "shared Panda preset from a component
library" setup — and the class/HMR failure that comes with it.

```
packages/ui     @acme/ui   component library: owns the Panda preset + components
apps/web        web        Next.js App Router app that consumes the preset
```

## The component library (`packages/ui`)

- [`src/preset.ts`](packages/ui/src/preset.ts) — the **only** thing consumers import
  for config. Ships tokens, semantic tokens, `button` recipe, `alert` slot recipe,
  and — crucially — `staticCss: { recipes: "*" }`.
- Uses Panda itself ([`panda.config.ts`](packages/ui/panda.config.ts), `preflight: false`,
  `outExtension: "js"` so tsup can bundle the generated helpers).
- `npm run build -w @acme/ui` → `panda codegen` → `tsup` (bundles components +
  `styled-system` helpers into `dist/`) → `panda cssgen` (extracts the lib's CSS to
  `dist/styles.css`).
- `package.json` exports: `.` → `dist/index.js`, `./preset` → **`src/preset.ts`**
  (source, so token edits need no rebuild), `./styles.css` → `dist/styles.css`.

## The app (`apps/web`)

- [`panda.config.ts`](apps/web/panda.config.ts): `presets: ["@pandacss/preset-panda", preset]`
  — adding `presets` opts out of Panda's default theme, so it's re-added explicitly.
- [`app/layout.tsx`](apps/web/app/layout.tsx) imports `@acme/ui/styles.css` then its
  own `global.css` (Panda PostCSS output).
- [`app/variant-switcher.tsx`](apps/web/app/variant-switcher.tsx) picks a button
  variant from `useState` — a **fully dynamic** `variant={...}` Panda's static
  analysis can't see.

## Why the class swap fails without `staticCss`

A Panda preset shares *definitions*, not *CSS*. Each project emits its own
stylesheet from what it can statically see used.

Remove `staticCss` from the preset and rebuild: the app's generated CSS contains
only `acme-button--variant_solid` (recipe default) and `--variant_ghost` (a
literal in JSX). `--variant_outline` is never a literal anywhere, so no rule is
emitted — clicking through to it applies a class with no styles behind it.

`staticCss: { recipes: "*" }` in the preset forces every consumer to generate
every recipe variant regardless of visible usage. Verified: with it, all three
variants land in `apps/web/.next/static/css`.

> Editing the preset / any `panda.config.ts` needs a dev-server restart — the
> PostCSS plugin reads config once at startup.

## Commands

```bash
npm install
npm run build          # builds @acme/ui, then web
npm run dev            # web dev server (build @acme/ui at least once first)
npm run dev:ui         # tsup --watch on the library
```
