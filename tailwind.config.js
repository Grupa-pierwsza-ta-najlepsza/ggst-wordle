/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ggst-dark': '#1a1a2e',
        'ggst-darker': '#16213e',
        'ggst-red': '#f13932',
        'ggst-correct': '#27ae60',
        'ggst-partial': '#f39c12',
        'ggst-incorrect': '#95a5a6'
      }
    },
  },
  plugins: [],
}
