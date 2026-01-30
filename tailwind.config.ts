import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "Arial"]
      },
      maxWidth: {
        container: "1200px"
      },
      borderRadius: {
        xl: "26px",
        lg: "18px",
        md: "12px"
      },
      letterSpacing: {
        tight2: "-0.035em"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(56,189,248,.18), 0 10px 30px rgba(0,0,0,.35)",
        neon: "0 0 5px rgba(56,189,248,0.5), 0 0 10px rgba(56,189,248,0.3), 0 0 15px rgba(56,189,248,0.2)",
        "neon-brand2": "0 0 5px rgba(45,212,191,0.5), 0 0 10px rgba(45,212,191,0.3), 0 0 15px rgba(45,212,191,0.2)",
        "neon-accent": "0 0 5px rgba(167,139,250,0.5), 0 0 10px rgba(167,139,250,0.3), 0 0 15px rgba(167,139,250,0.2)",
        "neon-green": "0 0 5px rgba(34,197,94,0.5), 0 0 10px rgba(34,197,94,0.3), 0 0 15px rgba(34,197,94,0.2)",
        "electric": "0 0 30px rgba(34,197,94,0.3), 0 0 60px rgba(34,197,94,0.2)",
        "electric-intense": "0 0 40px rgba(34,197,94,0.4), 0 0 80px rgba(34,197,94,0.3), 0 0 120px rgba(34,197,94,0.2)"
      },
      colors: {
        bg: "#06070b",
        panel: "#0c0f17",
        glass: "rgba(255,255,255,.06)",
        border: "rgba(255,255,255,.12)",
        text: "rgba(248,250,252,.96)",
        muted: "rgba(148,163,184,.92)",
        brand: "#38bdf8",
        brand2: "#2dd4bf",
        accent: "#a78bfa",
        // Light mode variants
        "light-bg": "#ffffff",
        "light-panel": "#f8f9fa",
        "light-glass": "rgba(0,0,0,.04)",
        "light-border": "rgba(0,0,0,.1)",
        "light-text": "rgba(15,23,42,.96)",
        "light-muted": "rgba(100,116,139,.92)",
        electric: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#22c55e",
          500: "#16a34a",
          600: "#15803d",
          700: "#166534",
          800: "#14532d",
          900: "#052e16"
        }
      },
      backgroundImage: {
        "dash-glow":
          "radial-gradient(900px 400px at 20% -10%, rgba(56,189,248,.16), transparent), radial-gradient(600px 300px at 90% 10%, rgba(167,139,250,.16), transparent), radial-gradient(700px 400px at 50% 100%, rgba(45,212,191,.12), transparent)",
        "electric-glow":
          "radial-gradient(900px 400px at 20% -10%, rgba(34,197,94,.16), transparent), radial-gradient(600px 300px at 90% 10%, rgba(56,189,248,.16), transparent), radial-gradient(700px 400px at 50% 100%, rgba(45,212,191,.12), transparent)"
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "electric-pulse": "electric-pulse 2s ease-in-out infinite",
        "spark": "spark 1.5s ease-in-out infinite"
      },
      keyframes: {
        "electric-pulse": {
          "0%, 100%": {
            opacity: "1",
            boxShadow: "0 0 30px rgba(34,197,94,0.3), 0 0 60px rgba(34,197,94,0.2)"
          },
          "50%": {
            opacity: "0.8",
            boxShadow: "0 0 40px rgba(34,197,94,0.5), 0 0 80px rgba(34,197,94,0.3)"
          }
        },
        "spark": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.05)", opacity: "0.9" }
        }
      }
    }
  },
  plugins: []
} satisfies Config;
