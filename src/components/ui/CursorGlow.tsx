import { useEffect, useRef } from 'react';

export function CursorGlow() {
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Don't render on touch devices
        if ('ontouchstart' in window) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (glowRef.current) {
                glowRef.current.style.left = e.clientX + 'px';
                glowRef.current.style.top = e.clientY + 'px';
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Don't render on mobile/touch devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
        return null;
    }

    return (
        <div
            ref={glowRef}
            className="cursor-glow hidden md:block"
        />
    );
}
