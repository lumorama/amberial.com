/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./index.html"],
  theme: {
    extend: {
      animation: {
      },
      keyframes: {
      },
      backgroundImage: {
        'heroimage': "url('./img/AMB_KeyArt.jpg')",
        'background-one': "url('./img/background.jpg')",
      }
    },
  },
  plugins: [],
}