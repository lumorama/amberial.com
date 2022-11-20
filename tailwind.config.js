/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,css}", "./index.html"],
  theme: {
    extend: {
      colors: {
        'amberial-yellow': '#FFC700',
      },
      fontFamily: {
        'kano': ['kanoregular', 'sans-serif'],
        'cinzel-bold': ['cinzelbold'],
        'cinzel-deco': ['cinzel_decorativebold'],
      },
      animation: {
      },
      keyframes: {
      },
    },
  },
  plugins: [],
}