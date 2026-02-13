import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class', '[data-theme="dark"]'],
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
            },
            colors: {
                // Primary accent colors
                accent: {
                    DEFAULT: 'var(--accent)',
                    hover: 'var(--accent-hover)',
                    glow: 'var(--accent-glow)',
                },
                cyan: {
                    DEFAULT: 'var(--cyan)',
                },
                emerald: {
                    DEFAULT: 'var(--emerald)',
                },
                // Semantic color tokens
                surface: {
                    DEFAULT: 'var(--surface)',
                    elevated: 'var(--surface-elevated)',
                },
                border: {
                    DEFAULT: 'var(--border)',
                    strong: 'var(--border-strong)',
                },
                // Background tokens
                'bg-primary': 'var(--bg-primary)',
                'bg-secondary': 'var(--bg-secondary)',
                'bg-tertiary': 'var(--bg-tertiary)',
                // Text tokens
                'text-primary': 'var(--text-primary)',
                'text-secondary': 'var(--text-secondary)',
                'text-muted': 'var(--text-muted)',
            },
            backgroundColor: {
                'surface': 'var(--surface)',
                'surface-elevated': 'var(--surface-elevated)',
                'bg-primary': 'var(--bg-primary)',
                'bg-secondary': 'var(--bg-secondary)',
                'bg-tertiary': 'var(--bg-tertiary)',
            },
            textColor: {
                'primary': 'var(--text-primary)',
                'secondary': 'var(--text-secondary)',
                'muted': 'var(--text-muted)',
            },
            borderColor: {
                'surface': 'var(--border)',
                'surface-strong': 'var(--border-strong)',
            },
            boxShadow: {
                'sm': 'var(--shadow-sm)',
                'md': 'var(--shadow-md)',
                'lg': 'var(--shadow-lg)',
                'xl': 'var(--shadow-xl)',
                'glow': '0 0 20px var(--accent-glow)',
                'glow-lg': '0 0 40px var(--accent-glow)',
            },
            backdropBlur: {
                'glass': 'var(--glass-blur)',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'float-slow': 'float 8s ease-in-out infinite',
                'bounce-slow': 'bounce 2s infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'gradient': 'gradient 15s ease infinite',
                'shimmer': 'shimmer 3s infinite linear',
                'shimmer-text': 'shimmer-text 8s linear infinite',
                'glow-pulse': 'glow-pulse 2s infinite',
                'spin-slow': 'spin 4s linear infinite',
                'pulse-ring': 'pulse-ring 2s ease-out infinite',
                'rainbow': 'rainbow 3s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                gradient: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                shimmer: {
                    '0%': { transform: 'translateX(-150%) skewX(-45deg)' },
                    '100%': { transform: 'translateX(150%) skewX(-45deg)' },
                },
                'shimmer-text': {
                    '0%': { backgroundPosition: '0% center' },
                    '100%': { backgroundPosition: '200% center' },
                },
                'glow-pulse': {
                    '0%': { boxShadow: '0 0 0 0 var(--accent-glow)' },
                    '70%': { boxShadow: '0 0 0 10px transparent' },
                    '100%': { boxShadow: '0 0 0 0 transparent' },
                },
                'pulse-ring': {
                    '0%': { transform: 'scale(0.8)', opacity: '1' },
                    '100%': { transform: 'scale(2)', opacity: '0' },
                },
                rainbow: {
                    '0%': { backgroundPosition: '0% 50%' },
                    '100%': { backgroundPosition: '200% 50%' },
                },
            },
            backgroundSize: {
                '300%': '300%',
                '400%': '400%',
            },
            spacing: {
                '18': '4.5rem', // 72px for navbar
            },
            height: {
                '18': '4.5rem', // 72px for navbar
            },
            minHeight: {
                '18': '4.5rem',
            },
            perspective: {
                '1000': '1000px',
                '2000': '2000px',
            },
            transformStyle: {
                '3d': 'preserve-3d',
            },
            backfaceVisibility: {
                'hidden': 'hidden',
            },
            transitionTimingFunction: {
                'ease-spring': 'cubic-bezier(0.4, 0, 0.2, 1)',
                'ease-bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            },
            borderRadius: {
                '2xl': '1rem',
                '3xl': '1.5rem',
                '4xl': '2rem',
            },
        },
    },
    plugins: [typography],
}
