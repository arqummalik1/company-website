import { useState, useEffect, useCallback, useRef } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
    const [theme, setTheme] = useState<Theme>(() => {
        // Check localStorage first
        const stored = localStorage.getItem('theme') as Theme | null;
        if (stored === 'light' || stored === 'dark') {
            return stored;
        }
        // Fall back to system preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });
    
    const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

    // Apply theme to document
    useEffect(() => {
        const root = window.document.documentElement;
        
        // Remove both themes and apply the current one
        root.removeAttribute('data-theme');
        root.setAttribute('data-theme', theme);
        
        // Also update class for backward compatibility with existing dark: classes
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        
        // Store in localStorage
        localStorage.setItem('theme', theme);
        
        // Update meta theme-color for mobile browsers
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', theme === 'dark' ? '#030712' : '#ffffff');
        }
    }, [theme]);

    // Listen for system preference changes
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        const handleChange = (e: MediaQueryListEvent) => {
            // Only update if user hasn't manually set a preference
            const stored = localStorage.getItem('theme');
            if (!stored) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        };
        
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

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
        // @ts-ignore - View Transitions API is not yet in TypeScript
        if (!document.startViewTransition) {
            setTheme(newTheme);
            transitionTimeoutRef.current = setTimeout(() => {
                doc.classList.remove('theme-transitioning');
            }, 300);
            return;
        }

        // Use View Transitions API for smooth theme change
        // @ts-ignore
        document.startViewTransition(() => {
            setTheme(newTheme);
        });

        // Remove transitioning class after animation completes
        transitionTimeoutRef.current = setTimeout(() => {
            doc.classList.remove('theme-transitioning');
        }, 300);
    }, [theme]);

    const setThemeManually = useCallback((newTheme: Theme) => {
        const doc = document.documentElement;
        doc.classList.add('theme-transitioning');
        setTheme(newTheme);
        
        transitionTimeoutRef.current = setTimeout(() => {
            doc.classList.remove('theme-transitioning');
        }, 300);
    }, []);

    return { 
        theme, 
        toggleTheme,
        setTheme: setThemeManually,
        isDark: theme === 'dark',
        isLight: theme === 'light',
    };
}
