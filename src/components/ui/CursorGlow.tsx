import { useEffect, useRef, useState, memo } from 'react';

export const CursorGlow = memo(function CursorGlow() {
    const glowRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number>(0);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        // Check if desktop device
        const checkDesktop = () => {
            setIsDesktop(window.innerWidth >= 768 && !('ontouchstart' in window));
        };
        
        checkDesktop();
        window.addEventListener('resize', checkDesktop);
        return () => window.removeEventListener('resize', checkDesktop);
    }, []);

    useEffect(() => {
        if (!isDesktop) return;

        let lastX = 0;
        let lastY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            // Skip if position hasn't changed significantly
            if (Math.abs(e.clientX - lastX) < 5 && Math.abs(e.clientY - lastY) < 5) return;
            
            lastX = e.clientX;
            lastY = e.clientY;

            // Use RAF for smooth updates
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            
            rafRef.current = requestAnimationFrame(() => {
                if (glowRef.current) {
                    glowRef.current.style.left = e.clientX + 'px';
                    glowRef.current.style.top = e.clientY + 'px';
                }
            });
        };

        document.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [isDesktop]);

    if (!isDesktop) return null;

    return (
        <div
            ref={glowRef}
            className="cursor-glow hidden md:block"
        />
    );
});
