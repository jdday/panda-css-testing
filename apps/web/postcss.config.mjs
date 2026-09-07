export default {
  plugins: {
    // Tailwind v4 only. Panda is NOT in this pipeline -- it runs as its own
    // CLI watcher (`panda --watch`) and emits styled-system/styles.css, which
    // layout.tsx imports directly. Running @pandacss/dev/postcss alongside
    // @tailwindcss/postcss breaks incremental HMR (Panda's layer emits empty).
    "@tailwindcss/postcss": {},
  },
};
