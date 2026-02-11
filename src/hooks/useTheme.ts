import { useState, useEffect, useCallback, useRef } from 'react';

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
    const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Clean up transition timeout on unmount
    useEffect(() => {
        return () => {
            if (transitionTimeoutRef.current) {
                clearTimeout(transitionTimeoutRef.current);
            }
        };
    }, []);

    const toggleTheme = useCallback(() => {
        // Clear any existing transition timeout
        if (transitionTimeoutRef.current) {
            clearTimeout(transitionTimeoutRef.current);
        }

        const newTheme = theme === 'light' ? 'dark' : 'light';
        const doc = document.documentElement;

        // Add transitioning class for smooth animation
        doc.classList.add('theme-transitioning');

        // Check if View Transitions API is supported
        // @ts-ignore
        if (!document.startViewTransition) {
            setTheme(newTheme);
            transitionTimeoutRef.current = setTimeout(() => {
                doc.classList.remove('theme-transitioning');
            }, 300);
            return;
        }

        // Pure state change - Quantum Fade
        // @ts-ignore
        document.startViewTransition(() => {
            setTheme(newTheme);
        });

        // Remove transitioning class after animation completes
        transitionTimeoutRef.current = setTimeout(() => {
            doc.classList.remove('theme-transitioning');
        }, 300);
    }, [theme]);

    return { theme, toggleTheme };
}
