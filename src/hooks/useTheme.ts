import { useState, useEffect } from 'react';

export function useTheme() {
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        // Check localStorage first
        const stored = localStorage.getItem('theme');
        if (stored === 'light' || stored === 'dark') {
            return stored;
        }
        // Fall back to system preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';

        // Add transitioning class for smooth animation
        document.documentElement.classList.add('theme-transitioning');

        // Use View Transitions API for ultra-smooth theme switching
        // @ts-ignore - View Transitions API is experimental
        if (document.startViewTransition) {
            // @ts-ignore
            document.startViewTransition(() => {
                setTheme(newTheme);
            });
        } else {
            // Fallback for browsers without View Transitions API
            setTheme(newTheme);
        }

        // Remove transitioning class after animation completes
        setTimeout(() => {
            document.documentElement.classList.remove('theme-transitioning');
        }, 500);
    };

    return { theme, toggleTheme };
}
