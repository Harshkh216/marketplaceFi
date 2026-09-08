/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eef1f7',
          100: '#d4dae8',
          200: '#a8b5d1',
          300: '#7d90ba',
          400: '#556ba3',
          500: '#3a4f87',
          600: '#2c3d6e',
          700: '#1f2d55',
          800: '#151e3d',
          900: '#0d152c',
          950: '#070d1c',
        },
        lime: {
          50: '#f8fee5',
          100: '#eefbc7',
          200: '#daf789',
          300: '#c2ed45',
          400: '#a8d91f',
          500: '#8bbf12',
          600: '#67960c',
          700: '#4c6f0e',
          800: '#3d5710',
          900: '#334911',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-right': 'slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s linear infinite',
        'wishlist-pop': 'wishlistPop 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'spin-slow': 'spin 1.2s linear infinite',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        wishlistPop: {
          '0%': { transform: 'scale(1)' },
          '40%': { transform: 'scale(1.4)' },
          '100%': { transform: 'scale(1)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
      boxShadow: {
        'card': '0 1px 3px rgba(13, 21, 44, 0.08), 0 1px 2px rgba(13, 21, 44, 0.04)',
        'card-hover': '0 12px 24px rgba(13, 21, 44, 0.12), 0 4px 8px rgba(13, 21, 44, 0.06)',
        'premium': '0 20px 40px rgba(13, 21, 44, 0.15), 0 8px 16px rgba(13, 21, 44, 0.08)',
      },
      backgroundImage: {
        'hero-pattern': 'radial-gradient(circle at 70% 20%, rgba(168, 217, 31, 0.06) 0%, transparent 50%)',
      },
    },
  },
  plugins: [],
};
