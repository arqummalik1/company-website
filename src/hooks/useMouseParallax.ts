import { useEffect, useState, useCallback } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';

interface MousePosition {
  x: number;
  y: number;
}

interface UseMouseParallaxOptions {
  strength?: number;
  enabled?: boolean;
}

export function useMouseParallax({ strength = 20, enabled = true }: UseMouseParallaxOptions = {}) {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isEnabled, setIsEnabled] = useState(enabled);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsEnabled(!mediaQuery.matches && enabled);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsEnabled(!e.matches && enabled);
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, [enabled]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isEnabled) return;
    
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    setMousePosition({
      x: (e.clientX - centerX) / centerX,
      y: (e.clientY - centerY) / centerY,
    });
  }, [isEnabled]);

  useEffect(() => {
    if (!isEnabled) return;

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove, isEnabled]);

  const x = useTransform(() => mousePosition.x * strength);
  const y = useTransform(() => mousePosition.y * strength);

  const springX = useSpring(x, { stiffness: 100, damping: 15 });
  const springY = useSpring(y, { stiffness: 100, damping: 15 });

  return {
    x: springX,
    y: springY,
    rawX: mousePosition.x,
    rawY: mousePosition.y,
    isEnabled,
  };
}

// Hook for 3D tilt effect on cards
export function use3DTilt(ref: React.RefObject<HTMLElement>, { maxTilt = 5 } = {}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-1, 1], [`${maxTilt}deg`, `-${maxTilt}deg`]);
  const rotateY = useTransform(x, [-1, 1], [`-${maxTilt}deg`, `${maxTilt}deg`]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((e.clientX - centerX) / (rect.width / 2));
    y.set((e.clientY - centerY) / (rect.height / 2));
  }, [ref, x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return {
    style: {
      rotateX,
      rotateY,
      transformStyle: 'preserve-3d',
    },
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    },
  };
}

// Hook to track if device supports hover (for disabling hover effects on touch)
export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

// Hook for checking if device is touch-enabled
export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  return isTouch;
}
