import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#0D0D0D',
        'off-white': '#FAFAF8',
        cream: '#F3F0EA',
        gray: {
          DEFAULT: '#6B6B6B',
          light: '#E2DFD8',
          subtle: '#C8C5BE',
        },
        blue: {
          DEFAULT: '#2C3E6B',
          light: '#4A5F96',
        },
        brown: {
          DEFAULT: '#7A5C3C',
          light: '#A07D5A',
        },
        gold: {
          DEFAULT: '#C8A84B',
          light: '#D9BF6E',
        },
      },
      fontFamily: {
        serif: ['Orpheus Pro', 'Big Caslon', 'Georgia', 'serif'],
        sans: ['Aktiv Grotesk', 'Helvetica Neue', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        none: '0px',
      },
    },
  },
  plugins: [],
}
export default config
