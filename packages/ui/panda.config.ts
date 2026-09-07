import { defineConfig } from "@pandacss/dev";
import preset from "./src/preset";

export default defineConfig({
  // A library must not ship a global reset onto its consumers.
  preflight: false,

  // Adding `presets` opts out of Panda's default theme preset, so re-add it
  // explicitly -- the shared preset extends it with brand tokens & recipes.
  presets: ["@pandacss/preset-panda", preset],

  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  exclude: [],

  jsxFramework: "react",
  outdir: "styled-system",

  // Emit .js (not .mjs) so bundlers like tsup/esbuild resolve the generated
  // helpers without custom resolveExtensions config.
  outExtension: "js",
});
