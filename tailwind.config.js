/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

const { testColors } = require('./src/lib/tailwind/testColors')

module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/lib/**/*.{js,ts,jsx,tsx}',
    './src/ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ...testColors,
        'app-background-main': 'hsl(220, 13%, 14%)',
        'app-background-secondary': 'hsl(222, 13%, 18%)',
        'app-font-strong': 'hsl(0, 0%, 90%)',
        'app-font-light': 'hsl(0, 0%, 60%)',
        'app-gray': {
          50: 'hsl(0, 0%, 98%)',
          100: 'hsl(0, 0%, 95%)',
          200: 'hsl(0, 0%, 85%)',
          300: 'hsl(0, 0%, 75%)',
          400: 'hsl(0, 0%, 60%)',
          500: 'hsl(0, 0%, 50%)',
          600: 'hsl(0, 0%, 40%)',
          700: 'hsl(0, 0%, 30%)',
          800: 'hsl(0, 0%, 20%)',
          900: 'hsl(0, 0%, 10%)',
          950: 'hsl(0, 0%, 5%)',
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        ':root': {
          '--color-app-bg-secondary': theme('colors.app-background-secondary'),
          '--color-app-font-strong': theme('colors.app-font-strong'),
          '--color-app-font-light': theme('colors.app-font-light'),
          '--color-gray-50': theme('colors.app-gray.50'),
          '--color-gray-100': theme('colors.app-gray.100'),
          '--color-gray-200': theme('colors.app-gray.200'),
          '--color-gray-300': theme('colors.app-gray.300'),
          '--color-gray-400': theme('colors.app-gray.400'),
          '--color-gray-500': theme('colors.app-gray.500'),
          '--color-gray-600': theme('colors.app-gray.600'),
          '--color-gray-700': theme('colors.app-gray.700'),
          '--color-gray-800': theme('colors.app-gray.800'),
          '--color-gray-900': theme('colors.app-gray.900'),
          '--color-gray-950': theme('colors.app-gray.950'),
        },
      })
    }),
  ],
}
