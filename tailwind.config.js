/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        card: "var(--card)",
        ink: "var(--ink)",
        muted: "var(--ink-2)",
        brass: "var(--brass)",
        tube: "var(--tube)",
        hair: "var(--hair)",
        ok: "var(--ok)",
        warn: "var(--warn)",
        hl: "var(--hl)",
      },
      borderRadius: {
        app: "var(--radius)",
      },
      fontFamily: {
        sans: ["Pretendard", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px rgba(42, 51, 66, 0.08)",
      },
    },
  },
  plugins: [],
};
