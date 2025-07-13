/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'system-ui', 'sans-serif'],
        'inter': ['Inter', 'system-ui', 'sans-serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: 'rgb(240 249 255)',
          100: 'rgb(224 242 254)',
          200: 'rgb(186 230 253)',
          300: 'rgb(125 211 252)',
          400: 'rgb(56 189 248)',
          500: 'rgb(14 165 233)',
          600: 'rgb(2 132 199)',
          700: 'rgb(3 105 161)',
          800: 'rgb(7 89 133)',
          900: 'rgb(12 74 110)',
          950: 'rgb(8 47 73)',
          DEFAULT: 'rgb(14 165 233)',
        },
        secondary: {
          50: 'rgb(248 250 252)',
          100: 'rgb(241 245 249)',
          200: 'rgb(226 232 240)',
          300: 'rgb(203 213 225)',
          400: 'rgb(148 163 184)',
          500: 'rgb(100 116 139)',
          600: 'rgb(71 85 105)',
          700: 'rgb(51 65 85)',
          800: 'rgb(30 41 59)',
          900: 'rgb(15 23 42)',
          950: 'rgb(2 6 23)',
          DEFAULT: 'rgb(100 116 139)',
        },
        accent: {
          50: 'rgb(253 244 255)',
          100: 'rgb(250 232 255)',
          200: 'rgb(245 208 254)',
          300: 'rgb(240 171 252)',
          400: 'rgb(232 121 249)',
          500: 'rgb(217 70 239)',
          600: 'rgb(192 38 211)',
          700: 'rgb(162 28 175)',
          800: 'rgb(134 25 143)',
          900: 'rgb(112 26 117)',
          950: 'rgb(74 4 78)',
          DEFAULT: 'rgb(217 70 239)',
        },
        success: {
          50: 'rgb(240 253 244)',
          100: 'rgb(220 252 231)',
          200: 'rgb(187 247 208)',
          300: 'rgb(134 239 172)',
          400: 'rgb(74 222 128)',
          500: 'rgb(34 197 94)',
          600: 'rgb(22 163 74)',
          700: 'rgb(21 128 61)',
          800: 'rgb(22 101 52)',
          900: 'rgb(20 83 45)',
          950: 'rgb(5 46 22)',
          DEFAULT: 'rgb(34 197 94)',
        },
        warning: {
          50: 'rgb(255 251 235)',
          100: 'rgb(254 243 199)',
          200: 'rgb(253 230 138)',
          300: 'rgb(252 211 77)',
          400: 'rgb(251 191 36)',
          500: 'rgb(245 158 11)',
          600: 'rgb(217 119 6)',
          700: 'rgb(180 83 9)',
          800: 'rgb(146 64 14)',
          900: 'rgb(120 53 15)',
          950: 'rgb(69 26 3)',
          DEFAULT: 'rgb(245 158 11)',
        },
        error: {
          50: 'rgb(254 242 242)',
          100: 'rgb(254 226 226)',
          200: 'rgb(254 202 202)',
          300: 'rgb(252 165 165)',
          400: 'rgb(248 113 113)',
          500: 'rgb(239 68 68)',
          600: 'rgb(220 38 38)',
          700: 'rgb(185 28 28)',
          800: 'rgb(153 27 27)',
          900: 'rgb(127 29 29)',
          950: 'rgb(69 10 10)',
          DEFAULT: 'rgb(239 68 68)',
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      fontSize: {
        'display': ['5rem', { lineHeight: '1', fontWeight: '900' }],
        'h1': ['4rem', { lineHeight: '1.1', fontWeight: '800' }],
        'h2': ['3rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h3': ['2.25rem', { lineHeight: '1.3', fontWeight: '600' }],
        'h4': ['1.875rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['1.25rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['1rem', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['0.875rem', { lineHeight: '1.4', fontWeight: '500' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
        'fade-in-down': 'fadeInDown 1s ease-out forwards',
        'fade-in-left': 'fadeInLeft 1s ease-out forwards',
        'fade-in-right': 'fadeInRight 1s ease-out forwards',
        'scale-in': 'scaleIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
        'slide-up': 'slideUp 1s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite alternate',
        'gradient-x': 'gradientX 8s ease infinite',
        'gradient-y': 'gradientY 8s ease infinite',
        'gradient-xy': 'gradientXY 8s ease infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'spin-slow': 'spin 8s linear infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'rotate-slow': 'rotateSlow 20s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-30px)' }
        },
        pulseGlow: {
          '0%': { 
            boxShadow: '0 0 20px rgba(14, 165, 233, 0.4)',
            transform: 'scale(1)'
          },
          '100%': { 
            boxShadow: '0 0 40px rgba(14, 165, 233, 0.8)',
            transform: 'scale(1.05)'
          }
        },
        glow: {
          '0%': { 
            boxShadow: '0 0 20px rgba(14, 165, 233, 0.5)',
          },
          '100%': { 
            boxShadow: '0 0 40px rgba(14, 165, 233, 0.8), 0 0 60px rgba(217, 70, 239, 0.3)',
          }
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        gradientY: {
          '0%, 100%': { backgroundPosition: '50% 0%' },
          '50%': { backgroundPosition: '50% 100%' }
        },
        gradientXY: {
          '0%, 100%': { backgroundPosition: '0% 0%' },
          '25%': { backgroundPosition: '100% 0%' },
          '50%': { backgroundPosition: '100% 100%' },
          '75%': { backgroundPosition: '0% 100%' }
        },
        shimmer: {
          '0%': { left: '-100%' },
          '100%': { left: '100%' }
        },
        rotateSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
        '3xl': '64px',
        'premium': '20px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'premium': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'premium-lg': '0 35px 70px -12px rgba(0, 0, 0, 0.35)',
        'premium-xl': '0 45px 90px -12px rgba(0, 0, 0, 0.45)',
        'glow': '0 0 40px rgba(14, 165, 233, 0.4)',
        'glow-lg': '0 0 60px rgba(14, 165, 233, 0.5)',
        'glow-xl': '0 0 80px rgba(14, 165, 233, 0.6)',
        'inner-glow': 'inset 0 0 20px rgba(14, 165, 233, 0.2)',
        'colored': '0 25px 50px -12px rgba(14, 165, 233, 0.25)',
        'colored-lg': '0 35px 70px -12px rgba(14, 165, 233, 0.35)',
        'soft': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'medium': '0 8px 30px rgba(0, 0, 0, 0.12)',
        'hard': '0 12px 40px rgba(0, 0, 0, 0.18)',
        'ultra': '0 50px 100px -20px rgba(0, 0, 0, 0.5)',
      },
      backgroundImage: {
        'gradient-premium': 'linear-gradient(135deg, #0ea5e9 0%, #d946ef 100%)',
        'gradient-premium-secondary': 'linear-gradient(135deg, #d946ef 0%, #0ea5e9 100%)',
        'gradient-premium-tertiary': 'linear-gradient(135deg, #22c55e 0%, #0ea5e9 100%)',
        'gradient-shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
        'pattern-grid': 'linear-gradient(90deg, rgba(14, 165, 233, 0.03) 1px, transparent 1px), linear-gradient(rgba(14, 165, 233, 0.03) 1px, transparent 1px)',
        'pattern-dots': 'radial-gradient(circle, rgba(14, 165, 233, 0.1) 1px, transparent 1px)',
      },
      scale: {
        '102': '1.02',
        '103': '1.03',
        '104': '1.04',
        '105': '1.05',
        '110': '1.10',
      },
      dropShadow: {
        'glow': [
          '0 0px 20px rgba(14, 165, 233, 0.35)',
          '0 0px 65px rgba(14, 165, 233, 0.2)'
        ],
        'glow-lg': [
          '0 0px 30px rgba(14, 165, 233, 0.4)',
          '0 0px 80px rgba(14, 165, 233, 0.25)'
        ],
        'premium': [
          '0 10px 20px rgba(0, 0, 0, 0.15)',
          '0 0px 40px rgba(14, 165, 233, 0.1)'
        ],
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '900': '900ms',
        '1200': '1200ms',
        '1500': '1500ms',
        '2000': '2000ms',
      },
      transitionDelay: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '900': '900ms',
        '1200': '1200ms',
        '1500': '1500ms',
        '2000': '2000ms',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'bounce-out': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'smooth-in': 'cubic-bezier(0.4, 0, 1, 1)',
        'smooth-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'premium': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      blur: {
        'premium': '20px',
      },
      backgroundSize: {
        '200': '200% 200%',
        '300': '300% 300%',
      },
    },
  },
  plugins: [],
};