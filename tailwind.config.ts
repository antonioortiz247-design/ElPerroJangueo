import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0B0B0B",
        neonBlue: "#00D1FF",
        neonPink: "#FF1CF7",
        neonPurple: "#7C3AED"
      }
    }
  },
  plugins: []
};

export default config;
