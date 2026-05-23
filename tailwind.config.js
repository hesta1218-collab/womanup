/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#1A1A1A',
        paper: '#F5F5F5',
        blood: '#E61E32',
        darkblood: '#8B0000',
        ash: '#C0C0C0',
        ink: '#2C2C2C',
        warning: '#E6A817',
      },
      boxShadow: {
        brutal: '8px 8px 0 #E61E32',
        brutalBlack: '8px 8px 0 #1A1A1A',
        slash: '12px 12px 0 rgba(230, 30, 50, 0.8)',
      },
      fontFamily: {
        display: ['Impact', 'Arial Black', 'Inter', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        slash:
          'repeating-linear-gradient(135deg, rgba(245,245,245,0.08) 0 1px, transparent 1px 18px), radial-gradient(circle, rgba(245,245,245,0.1) 0 1px, transparent 1px 9px)',
      },
    },
  },
  plugins: [],
};
