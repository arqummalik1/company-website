import { useState, useEffect } from 'react';

/**
 * Hook to detect if the current viewport matches a given media query
 * Useful for responsive components that need to render differently on mobile
 * 
 * @param query - Media query string (e.g., '(max-width: 768px)')
 * @returns boolean indicating if the query matches
 * 
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)');
 * const isTouch = useMediaQuery('(hover: none)');
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Initial check
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    // Listen for changes
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      // Legacy browsers
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, [query]);

  return matches;
}

/**
 * Hook to detect if device is mobile (max-width: 768px)
 * 
 * @returns boolean indicating if viewport is mobile-sized
 */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 767px)');
}

/**
 * Hook to detect if device is tablet (768px - 1023px)
 * 
 * @returns boolean indicating if viewport is tablet-sized
 */
export function useIsTablet(): boolean {
  return useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
}

/**
 * Hook to detect if device is desktop (min-width: 1024px)
 * 
 * @returns boolean indicating if viewport is desktop-sized
 */
export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)');
}

/**
 * Hook to detect if device supports touch
 * Uses pointer media query for better detection
 * 
 * @returns boolean indicating if device is touch-capable
 */
export function useIsTouchDevice(): boolean {
  return useMediaQuery('(hover: none)');
}

/**
 * Hook to detect if device prefers reduced motion
 * 
 * @returns boolean indicating if user prefers reduced motion
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

/**
 * Hook to get current viewport width category
 * 
 * @returns 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
 */
export function useViewportSize(): 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' {
  const [viewport, setViewport] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'>('lg');

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;
      if (width < 375) setViewport('xs');
      else if (width < 640) setViewport('sm');
      else if (width < 768) setViewport('md');
      else if (width < 1024) setViewport('lg');
      else if (width < 1280) setViewport('xl');
      else setViewport('2xl');
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  return viewport;
}
