"use client";

import { useState } from "react";
import { Button, type ButtonProps } from "@acme/ui";
import { css } from "styled-system/css";

// Fully dynamic variant selection: Panda's static analysis in THIS app cannot
// see which of these strings is passed to <Button variant={...} />.
// It only works because `@acme/ui/preset` declares `staticCss: { recipes: "*" }`,
// so every button variant is generated here regardless of visible usage.
const VARIANTS = ["solid", "ghost", "outline"] as const satisfies readonly NonNullable<
  ButtonProps["variant"]
>[];

export function VariantSwitcher() {
  const [index, setIndex] = useState(0);
  const variant = VARIANTS[index];

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: "3",
        alignItems: "flex-start",
      })}
    >
      <Button variant={variant} size="lg">
        variant = {variant}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIndex((n) => (n + 1) % VARIANTS.length)}
      >
        cycle variant
      </Button>
    </div>
  );
}
