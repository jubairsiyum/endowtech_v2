import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Custom theme colors connected to CSS variables in globals.css ──
        'theme-dark': 'color-mix(in srgb, var(--dark-bg) calc(100% * <alpha-value>), transparent)',
        'theme-footer': 'color-mix(in srgb, var(--footer-bg) calc(100% * <alpha-value>), transparent)',
        'theme-light': 'color-mix(in srgb, var(--light-bg) calc(100% * <alpha-value>), transparent)',
        'theme-surface': 'color-mix(in srgb, var(--light-surface) calc(100% * <alpha-value>), transparent)',
        'theme-primary': 'color-mix(in srgb, var(--primary-color) calc(100% * <alpha-value>), transparent)',
        'theme-primary-hover': 'var(--primary-hover)',
        'theme-primary-light': 'var(--primary-light)',

        background: 'var(--light-bg)',
        surface: 'var(--light-surface)',
        'surface-light': 'var(--light-surface-alt)',
        'text-primary': 'var(--light-text)',
        'text-muted': 'var(--light-text-muted)',

        'dark-red': {
          950: 'var(--footer-bg)',
          900: 'var(--dark-bg)',
          800: '#7F1D1D',
          700: '#991B1B',
        },
        accent: {
          DEFAULT: 'color-mix(in srgb, var(--primary-color) calc(100% * <alpha-value>), transparent)',
          foreground: 'hsl(var(--accent-foreground))',
        },
        'accent-hover': 'var(--primary-hover)',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      fontFamily: {
        sans: [
          'var(--font-inter)',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
      },
      animation: {
        'gradient-shift': 'gradientShift 8s ease infinite',
        'fade-in': 'fadeIn 0.6s ease forwards',
        'slide-up': 'slideUp 0.6s ease forwards',
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundSize: {
        '200%': '200% 200%',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      transitionTimingFunction: {
        'flow-elastic': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'flow-smooth': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'flow-bloom': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
