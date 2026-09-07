import { definePreset } from "@pandacss/dev";

/**
 * The shared Panda preset consumed by every app.
 *
 * It ships *definitions* only (tokens, semantic tokens, recipes). CSS is still
 * emitted per-project by each consumer's own Panda run, based on what that
 * project statically uses -- EXCEPT for what `staticCss` below force-generates.
 */
export const acmePreset = definePreset({
  name: "@acme/ui-preset",

  theme: {
    extend: {
      tokens: {
        colors: {
          brand: {
            50: { value: "#eef2ff" },
            100: { value: "#e0e7ff" },
            200: { value: "#c7d2fe" },
            500: { value: "#6366f1" },
            600: { value: "#4f46e5" },
            700: { value: "#4338ca" },
            900: { value: "#312e81" },
          },
        },
        radii: {
          control: { value: "0.5rem" },
        },
      },

      semanticTokens: {
        colors: {
          "bg.canvas": {
            value: { base: "{colors.gray.50}", _osDark: "{colors.gray.900}" },
          },
          "fg.default": {
            value: { base: "{colors.gray.900}", _osDark: "{colors.gray.50}" },
          },
          "brand.solid": { value: "{colors.brand.600}" },
          "brand.text": { value: "{colors.brand.700}" },
        },
      },

      recipes: {
        button: {
          className: "acme-button",
          description: "Shared button",
          base: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "semibold",
            borderRadius: "control",
            cursor: "pointer",
            transition: "background 0.15s ease, color 0.15s ease",
          },
          variants: {
            variant: {
              solid: {
                bg: "brand.solid",
                color: "white",
                _hover: { bg: "brand.700" },
              },
              ghost: {
                bg: "transparent",
                color: "brand.text",
                _hover: { bg: "brand.50" },
              },
              outline: {
                bg: "transparent",
                color: "brand.text",
                borderWidth: "1px",
                borderColor: "brand.500",
                _hover: { bg: "brand.50" },
              },
            },
            size: {
              sm: { px: "3", py: "1.5", fontSize: "sm" },
              md: { px: "4", py: "2", fontSize: "md" },
              lg: { px: "5", py: "2.5", fontSize: "lg" },
            },
          },
          defaultVariants: { variant: "solid", size: "md" },
        },
      },

      slotRecipes: {
        alert: {
          className: "acme-alert",
          description: "Shared alert (slot recipe / sva)",
          slots: ["root", "title", "description"],
          base: {
            root: {
              display: "flex",
              flexDirection: "column",
              gap: "1",
              borderRadius: "control",
              borderWidth: "1px",
              p: "4",
            },
            title: { fontWeight: "semibold", fontSize: "sm" },
            description: { fontSize: "sm", opacity: 0.8 },
          },
          variants: {
            tone: {
              info: {
                root: {
                  bg: "brand.50",
                  borderColor: "brand.200",
                  color: "brand.900",
                },
              },
              warning: {
                root: {
                  bg: "yellow.50",
                  borderColor: "yellow.300",
                  color: "yellow.900",
                },
              },
              danger: {
                root: {
                  bg: "red.50",
                  borderColor: "red.200",
                  color: "red.900",
                },
              },
            },
          },
          defaultVariants: { tone: "info" },
        },
      },
    },
  },

  /**
   * This is the piece that makes the design system survive *dynamic* class
   * selection in consumer apps (`variant={someVar}`), and usage that only
   * happens inside this lib's compiled code. Every recipe + every variant is
   * emitted regardless of whether Panda can see it used.
   */
  staticCss: {
    recipes: "*",
  },
});

export default acmePreset;
