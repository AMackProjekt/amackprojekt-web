import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
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
        glow: "0 0 0 1px rgba(56,189,248,.18), 0 10px 30px rgba(0,0,0,.35)"
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
        accent: "#a78bfa"
      },
      backgroundImage: {
        "dash-glow":
          "radial-gradient(900px 400px at 20% -10%, rgba(56,189,248,.16), transparent), radial-gradient(600px 300px at 90% 10%, rgba(167,139,250,.16), transparent), radial-gradient(700px 400px at 50% 100%, rgba(45,212,191,.12), transparent)"
      }
    }
  },
  plugins: []
} satisfies Config;
