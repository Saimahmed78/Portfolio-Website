/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "slide-fade-in-left": {
          "0%": { transform: "translateX(-50px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-fade-in-right": {
          "0%": { transform: "translateX(50px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "fade-in-up": {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(12px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        flow: {
          "0%": { left: "-100%" },
          "100%": { left: "100%" },
        },
        pulse: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(59,130,246,0.6)" },
          "70%": { boxShadow: "0 0 0 10px rgba(59,130,246,0)" },
        },
      },
      animation: {
        "slide-fade-in-left": "slide-fade-in-left 0.8s ease-in-out forwards",
        "slide-fade-in-right": "slide-fade-in-right 0.8s ease-in-out forwards",
        "fade-in-up": "fade-in-up 0.8s ease-in-out forwards",
        fadeIn: "fadeIn 0.8s ease-in-out forwards",
        flow: "flow 2s linear infinite",
        pulse: "pulse 1.5s infinite",
      },
    },
  },
  plugins: [],
};
