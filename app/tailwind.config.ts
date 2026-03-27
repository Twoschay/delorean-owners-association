import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "DM Sans", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Bebas Neue", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      colors: {
        // Stainless Luxe palette
        steel: {
          DEFAULT: "#C0C0C0",
          dark: "#8A8A8A",
          light: "#E8E8E8",
        },
        amber: {
          DEFAULT: "#F5A623",
          glow: "#FFD700",
          dark: "#D4891A",
        },
        obsidian: "#1A1A1A",
        charcoal: "#2D2D2D",
        // shadcn tokens
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "steel-gradient":
          "linear-gradient(135deg, #8A8A8A 0%, #C0C0C0 40%, #E8E8E8 60%, #C0C0C0 80%, #8A8A8A 100%)",
        "amber-gradient":
          "linear-gradient(135deg, #F5A623 0%, #FFD700 50%, #F5A623 100%)",
        "obsidian-gradient":
          "linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 50%, #2D2D2D 100%)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shine: {
          "0%": { transform: "translateX(-100%) skewX(-15deg)" },
          "100%": { transform: "translateX(200%) skewX(-15deg)" },
        },
        "pulse-amber": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shine: "shine 3s infinite",
        "pulse-amber": "pulse-amber 2s infinite",
      },
      boxShadow: {
        "amber-glow":
          "0 0 20px rgba(245, 166, 35, 0.3), 0 0 40px rgba(245, 166, 35, 0.1)",
        "steel-glow":
          "0 0 20px rgba(192, 192, 192, 0.2), 0 0 40px rgba(192, 192, 192, 0.05)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
