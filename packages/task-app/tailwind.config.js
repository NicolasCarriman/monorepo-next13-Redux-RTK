/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.tsx',
    './components/**/*.styled.tsx'
  ],
  theme: {
    extend: {
      colors: {
        priority: {
          100: '#ff3b3b', //red
          200: '#0bb900', //green
          300: '#ff7600' //orange
        },
        blue: {
          100: '#275F90',
          200: '#17354E',
          300: '#4a83bd'
        },
        orange: {
          100: '#fffb85'
        },
        green: {
          100: '#92ff92'
        },
        red: {
          100: '#ff5b5b'
        },
        yellow: {
          100: '#FFBF00'
        }
      },
      boxShadow: {
        custom: '-5px -1px 64px #bebebe, -32px -32px 64px #ffffff',
        hover: 'inset 200px 2px #17354E',
        out: 'inset 0 0 0 0 #66668d',
      },
      transformStyle: {
        '3d': 'preserve-3d',
      },
      keyframes: {
        fadein: {
          '0%': { transform: 'translateY(160px)' },
          '100%': { transform: 'translateY(160px)' },
        },
        fadeout: {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(160px)' },
        },
      }
    }
  },
  plugins: [],
};
