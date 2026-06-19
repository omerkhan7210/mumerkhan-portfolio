/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink:      'var(--color-bg)',
        'ink-2':  'var(--color-bg-2)',
        'ink-3':  'var(--color-bg-3)',
        cream:    '#F5F4EF',
        'cream-2':'#EEEEE9',
        lime:     'var(--color-lime)',
        muted:    'var(--color-muted)',
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
