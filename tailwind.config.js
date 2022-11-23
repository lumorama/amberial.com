/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,css}", "./index.html"],
  theme: {
    extend: {
      colors: {
        'amberial-yellow': '#FFC700',
        'transparent-black': 'rgba(0,0,0,0.5)',
        'amberial-purple': 'rgb(70,3,70)',
      },
      fontFamily: {
        'kano': ['kanoregular', 'sans-serif'],
        'cinzel-bold': ['cinzelbold'],
        'cinzel-deco': ['cinzel_decorativebold'],
      },
    },
  },
  plugins: [],
}