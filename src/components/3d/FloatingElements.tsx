import { motion } from 'framer-motion';
import { useRef } from 'react';

interface FloatingElementProps {
  type: 'hexagon' | 'cube' | 'ring' | 'grid';
  size?: number;
  position: { x: string; y: string };
  delay?: number;
  className?: string;
}

function Hexagon({ size = 100 }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="transform-gpu">
      <polygon
        points="50,2 95,25 95,75 50,98 5,75 5,25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="opacity-30"
      />
      <polygon
        points="50,15 85,32 85,68 50,85 15,68 15,32"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        className="opacity-20"
      />
    </svg>
  );
}

function Cube({ size = 100 }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="transform-gpu">
      {/* Front face */}
      <polygon
        points="50,15 85,32 85,68 50,85 15,68 15,32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="opacity-40"
      />
      {/* Back face */}
      <polygon
        points="50,35 75,45 75,75 50,85 25,75 25,45"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="opacity-20"
      />
      {/* Connecting lines */}
      <line x1="50" y1="15" x2="50" y2="35" stroke="currentColor" strokeWidth="0.5" className="opacity-30" />
      <line x1="85" y1="32" x2="75" y2="45" stroke="currentColor" strokeWidth="0.5" className="opacity-30" />
      <line x1="85" y1="68" x2="75" y2="75" stroke="currentColor" strokeWidth="0.5" className="opacity-30" />
      <line x1="50" y1="85" x2="50" y2="85" stroke="currentColor" strokeWidth="0.5" className="opacity-30" />
      <line x1="15" y1="68" x2="25" y2="75" stroke="currentColor" strokeWidth="0.5" className="opacity-30" />
      <line x1="15" y1="32" x2="25" y2="45" stroke="currentColor" strokeWidth="0.5" className="opacity-30" />
    </svg>
  );
}

function Ring({ size = 100 }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="transform-gpu">
      <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-30" />
      <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" className="opacity-20" />
      <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" className="opacity-15" />
    </svg>
  );
}

function Grid({ size = 100 }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="transform-gpu">
      <defs>
        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.3" className="opacity-30" />
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#grid)" />
      <rect x="0" y="0" width="100" height="100" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-40" />
    </svg>
  );
}

const elementMap = {
  hexagon: Hexagon,
  cube: Cube,
  ring: Ring,
  grid: Grid,
};

function FloatingElement({ type, size = 80, position, delay = 0, className = '' }: FloatingElementProps) {
  const Component = elementMap[type];
  
  return (
    <motion.div
      className={`absolute pointer-events-none text-[var(--accent)] ${className}`}
      style={{ left: position.x, top: position.y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: [0, -20, 0],
      }}
      transition={{
        opacity: { duration: 0.8, delay },
        scale: { duration: 0.8, delay },
        y: {
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay,
        },
      }}
    >
      <Component size={size} />
    </motion.div>
  );
}

interface FloatingElementsProps {
  count?: number;
  className?: string;
}

export function FloatingElements({ count = 6, className = '' }: FloatingElementsProps) {
  const elements = [
    { type: 'hexagon' as const, position: { x: '10%', y: '20%' }, delay: 0 },
    { type: 'cube' as const, position: { x: '80%', y: '15%' }, delay: 0.5 },
    { type: 'ring' as const, position: { x: '70%', y: '60%' }, delay: 1 },
    { type: 'grid' as const, position: { x: '15%', y: '70%' }, delay: 1.5 },
    { type: 'hexagon' as const, position: { x: '50%', y: '80%' }, delay: 2 },
    { type: 'ring' as const, position: { x: '90%', y: '40%' }, delay: 2.5 },
  ];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {elements.slice(0, count).map((el, index) => (
        <FloatingElement
          key={index}
          type={el.type}
          position={el.position}
          delay={el.delay}
          className="transform-gpu"
        />
      ))}
    </div>
  );
}

// Interactive floating element that responds to mouse
interface InteractiveFloatingElementProps {
  children: React.ReactNode;
  className?: string;
  rotationRange?: number;
}

export function InteractiveFloatingElement({ 
  children, 
  className = '',
}: InteractiveFloatingElementProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      className={`transform-gpu ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      whileHover={{ scale: 1.05 }}
      style={{ perspective: '2000px' }}
    >
      {children}
    </motion.div>
  );
}
