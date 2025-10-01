/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        correct: '#6aaa64',
        incorrect: '#787c7e',
        warning: '#c9b458',
      }
    },
  },
  plugins: [],
}
