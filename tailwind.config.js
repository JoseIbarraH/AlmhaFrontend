import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'custom-beige': '#DCBE9A',
        'custom-dark': '#202020',
        'custom-white': '#ffffff',
        success: '#10b981',
        destructive: '#ef4444',
        primary: '#3b82f6',
        'muted-foreground': '#a3a3a3',
        warning: '#f59e0b',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Figtree', 'Inter', 'sans-serif', ...defaultTheme.fontFamily.sans],
        bodoni: ['Bodoni Moda'],
      },
    },
  },
  plugins: [
    forms,
    typography
  ],
}
