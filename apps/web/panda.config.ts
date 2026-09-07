import { defineConfig } from '@pandacss/dev';
import preset from '@acme/ui/preset';

export default defineConfig({
  // Tailwind's preflight (its `base` layer) already resets the document. A
  // second reset from Panda lands in `pd-reset`, which -- because the master
  // @layer statement gets stripped when both plugins process this file -- ends
  // up AFTER Tailwind's `utilities` and zeroes px-4/py-2 etc.
  preflight: false,

  // Consume the component library's shared preset: tokens, semantic tokens,
  // recipes, and its `staticCss` (which guarantees every recipe variant is
  // emitted here even when this app selects variants dynamically).
  presets: ['@pandacss/preset-panda', preset],

  include: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  exclude: [],

  jsxFramework: 'react',
  outdir: 'styled-system',

  // Panda and Tailwind both default to `base` and `utilities` layer names.
  // Sharing a document, the collision inverts the cascade (Panda's reset ends
  // up after the utilities layers and zeroes every padding). Namespace Panda's
  // layers; app/global.css declares the master order.
  layers: {
    reset: 'pd-reset',
    base: 'pd-base',
    tokens: 'pd-tokens',
    recipes: 'pd-recipes',
    utilities: 'pd-utilities',
  },
});
