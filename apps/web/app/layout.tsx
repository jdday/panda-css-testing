import type { Metadata } from "next";
import "@mantine/core/styles.css";
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
// Tailwind v4 AND Panda both come through this one file via postcss.config.mjs.
// @acme/ui ships no CSS of its own -- its recipes are emitted here through the
// preset's `staticCss`.
import "./global.css";

export const metadata: Metadata = {
  title: "Panda + Tailwind v4 + Mantine",
  description:
    "Next.js App Router app running Panda, Tailwind v4 and Mantine together",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
