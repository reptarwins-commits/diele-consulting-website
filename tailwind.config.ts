import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#111111",
          secondary: "#1a1a1a",
          card: "#1e1e1e",
          light: "#f5f3f0",
        },
        accent: {
          red: "#B22222",
          "red-muted": "#8B1A1A",
          white: "#E8E8E8",
          gray: "#A0A0A0",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        script: ["var(--font-caveat)", "cursive"],
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        ticker: "ticker 14s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
