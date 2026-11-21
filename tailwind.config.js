/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bone: '#E3E2DA',
        jade: '#9FC7B8',
        ink: '#161C1A',
        'ink-2': '#1B2220',
        'ink-3': '#1F2725',
        cream: '#E3E2DA',
        'cream-2': '#EEEEE9',
        lime: '#9FC7B8',
        muted: '#8E948D',
      },
      fontFamily: {
        sans: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee 35s linear infinite',
        'marquee-reverse': 'marquee-reverse 35s linear infinite',
        'marquee-slow': 'marquee 50s linear infinite',
        'marquee-reverse-slow': 'marquee-reverse 50s linear infinite',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          from: { transform: 'translateX(-50%)' },
          to: { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
