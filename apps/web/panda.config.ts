import { defineConfig } from '@pandacss/dev';
import preset from '@acme/ui/preset';

export default defineConfig({
  preflight: true,

  // Consume the component library's shared preset: tokens, semantic tokens,
  // recipes, and its `staticCss` (which guarantees every recipe variant is
  // emitted here even when this app selects variants dynamically).
  presets: ['@pandacss/preset-panda', preset],

  include: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  exclude: [],

  jsxFramework: 'react',
  outdir: 'styled-system',
});
