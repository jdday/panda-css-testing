import { defineConfig } from "tsup";
import path from "node:path";

const styledSystem = path.resolve(process.cwd(), "styled-system");

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  treeshake: true,
  // React stays a peer dep; everything else (incl. the generated
  // styled-system class helpers) is bundled into dist.
  external: ["react", "react-dom"],
  esbuildOptions(options) {
    // `styled-system/*` is a path alias, not a real package -- point esbuild
    // at the generated output so the class helpers get bundled into dist.
    options.alias = {
      ...options.alias,
      "styled-system": styledSystem,
    };
  },
});
