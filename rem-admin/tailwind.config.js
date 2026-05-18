/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0E2C5A",
        secondary: "#104B71",
        surface: "#F8FAFC",
        border: "#E2E8F0",
      },
    },
  },
  plugins: [],
}