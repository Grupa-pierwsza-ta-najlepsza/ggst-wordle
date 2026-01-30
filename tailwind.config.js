/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ggst-red': '#ff564b',         // Primary red
        'ggst-red-light': '#f2665c',   // Light red accent
        'ggst-black': '#1a1a1a',       // Deep black
        'ggst-gray': '#303030',        // Dark gray
        'ggst-correct': '#27ae60',
        'ggst-partial': '#f39c12',
        'ggst-incorrect': '#95a5a6'
      },
      fontFamily: {
        'ggst': ['Courier New', 'monospace'],
      },
      boxShadow: {
        'ggst-glow': '0 0 20px rgba(255, 86, 75, 0.6)',
        'ggst-glow-lg': '0 0 40px rgba(255, 86, 75, 0.8)',
      },
    },
  },
  plugins: [],
}
