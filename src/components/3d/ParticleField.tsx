import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
}

interface Connection {
  from: number;
  to: number;
}

interface ParticleFieldProps {
  nodeCount?: number;
  connectionDistance?: number;
  className?: string;
}

export function ParticleField({ 
  nodeCount = 20, 
  connectionDistance = 150,
  className = '' 
}: ParticleFieldProps) {
  // Generate random particles
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: nodeCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
  }, [nodeCount]);

  // Find connections between nearby particles
  const connections = useMemo<Connection[]>(() => {
    const conns: Connection[] = [];
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < connectionDistance / 10) { // Scale down for percentage
          conns.push({ from: i, to: j });
        }
      }
    }
    return conns;
  }, [particles, connectionDistance]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg 
        className="w-full h-full" 
        style={{ opacity: 0.3 }}
      >
        {/* Connection lines */}
        {connections.map((conn, index) => (
          <motion.line
            key={`line-${index}`}
            x1={`${particles[conn.from].x}%`}
            y1={`${particles[conn.from].y}%`}
            x2={`${particles[conn.to].x}%`}
            y2={`${particles[conn.to].y}%`}
            stroke="var(--accent)"
            strokeWidth="0.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 1, delay: index * 0.05 }}
          />
        ))}
      </svg>

      {/* Particles */}
      {particles.map((particle, index) => (
        <motion.div
          key={particle.id}
          className="absolute w-1.5 h-1.5 rounded-full bg-[var(--accent)]"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 0.6,
            scale: 1,
          }}
          transition={{
            duration: 0.5,
            delay: index * 0.05,
          }}
        />
      ))}
    </div>
  );
}

// Simplified particle field for better performance
export function ParticleFieldMinimal({ className = '' }: { className?: string }) {
  const nodes = [
    { x: 20, y: 30 }, { x: 40, y: 20 }, { x: 60, y: 40 },
    { x: 80, y: 25 }, { x: 30, y: 60 }, { x: 50, y: 70 },
    { x: 70, y: 65 }, { x: 25, y: 80 }, { x: 75, y: 85 },
  ];

  const lines = [
    [0, 1], [1, 2], [2, 3], [0, 4], [1, 4], [2, 5], [3, 6],
    [4, 5], [5, 6], [4, 7], [5, 7], [6, 8],
  ];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg className="w-full h-full" style={{ opacity: 0.2 }}>
        {lines.map(([from, to], i) => (
          <line
            key={i}
            x1={`${nodes[from].x}%`}
            y1={`${nodes[from].y}%`}
            x2={`${nodes[to].x}%`}
            y2={`${nodes[to].y}%`}
            stroke="var(--accent)"
            strokeWidth="0.5"
          />
        ))}
      </svg>
      {nodes.map((node, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-[var(--accent)]"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  );
}
