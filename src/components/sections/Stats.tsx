import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { cn } from '@/lib/utils';

interface StatItem {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
}

interface StatsProps {
  stats?: StatItem[];
  className?: string;
  columns?: 2 | 3 | 4;
  animated?: boolean;
}

const defaultStats: StatItem[] = [
  { value: 150, suffix: '+', label: 'Projects Delivered', description: 'Successful project completions' },
  { value: 98, suffix: '%', label: 'Client Satisfaction', description: 'Return clients' },
  { value: 12, suffix: '+', label: 'Years Experience', description: 'Industry expertise' },
  { value: 24, suffix: '/7', label: 'Support Available', description: 'Round-the-clock assistance' },
];

/**
 * AnimatedCounter - Individual animated number component
 */
function AnimatedCounter({ 
  value, 
  suffix = '', 
  prefix = '',
  inView,
  duration = 2 
}: { 
  value: number; 
  suffix?: string; 
  prefix?: string;
  inView: boolean;
  duration?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Ease out cubic for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [value, inView, duration]);

  return (
    <span>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

/**
 * StatCard - Individual stat item
 */
function StatCard({ 
  stat, 
  index, 
  inView,
  columns 
}: { 
  stat: StatItem; 
  index: number; 
  inView: boolean;
  columns: 2 | 3 | 4;
}) {
  const columnClasses = {
    2: 'md:basis-1/2',
    3: 'md:basis-1/3',
    4: 'md:basis-1/4',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1.0]
      }}
      className={cn(
        'text-center p-6',
        columnClasses[columns]
      )}
    >
      {/* Number */}
      <div className="text-5xl md:text-6xl font-bold text-[var(--accent)] mb-2 tracking-tight">
        <AnimatedCounter 
          value={stat.value} 
          suffix={stat.suffix}
          prefix={stat.prefix}
          inView={inView}
        />
      </div>
      
      {/* Label */}
      <div className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1">
        {stat.label}
      </div>
      
      {/* Description */}
      {stat.description && (
        <div className="text-xs text-[var(--text-muted)] opacity-75">
          {stat.description}
        </div>
      )}
    </motion.div>
  );
}

/**
 * Stats - Animated statistics section
 * 
 * Features:
 * - Animated counters that count up when visible
 * - Customizable number of columns
 * - Staggered reveal animation
 * - Accessible number announcements
 * 
 * @example
 * <Stats 
 *   stats={[{ value: 100, suffix: '+', label: 'Projects' }]}
 *   columns={4}
 * />
 */
export function Stats({ 
  stats = defaultStats, 
  className,
  columns = 4,
  animated = true 
}: StatsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section 
      ref={ref}
      className={cn(
        'relative py-16 md:py-24',
        'bg-[var(--bg-secondary)]',
        className
      )}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--cyan)]/5 rounded-full blur-3xl" />
      </div>

      <Container size="lg">
        <div className="flex flex-wrap justify-center -mx-4">
          {stats.map((stat, index) => (
            <div key={stat.label} className="px-4">
              <StatCard 
                stat={stat} 
                index={index} 
                inView={animated ? isInView : true}
                columns={columns}
              />
            </div>
          ))}
        </div>
        
        {/* Accessible summary for screen readers */}
        <div className="sr-only" aria-live="polite">
          {stats.map(stat => `${stat.value}${stat.suffix || ''} ${stat.label}`).join(', ')}
        </div>
      </Container>
    </section>
  );
}

export default Stats;
