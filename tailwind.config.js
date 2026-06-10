/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Tajawal', 'Cairo', 'sans-serif'],
        title: ['Cairo', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
