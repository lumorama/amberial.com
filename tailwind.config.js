/* @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js}',
    './index.html',
  ],
  theme: {
    extend: {
      animation: {
        rotate: 'rotate 0.3s linear infinite',
        ball: 'ball 0.75s ease-in',
      },
      keyframes: {
        ball: {
          '0%': { transform: 'translateX(85%)' },
          '10%': { transform: 'translateX(80%) translateY(-30%)' },
          '35%': { transform: 'translateX(0%) translateY(-30%)' },
          '40%': { transform: 'translateX(-5%)' },
          '45%': { transform: 'translateX(0%) translateY(30%)' },
          '85%': { transform: 'translateX(80%) translateY(30%)' },
          '100%': { transform: 'translateX(85%)' },
        },
        rotate: {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' }
        },
      }
    },
  },
  plugins: [],
}