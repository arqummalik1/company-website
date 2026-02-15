import { useEffect, useRef, useMemo } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, PlayCircle, ChevronDown, Star, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Stats } from '@/components/sections/Stats';

/**
 * FloatingOrb - Animated glowing orb component
 */
function FloatingOrb({ 
  className, 
  delay = 0,
  duration = 6,
  size = 'md'
}: { 
  className?: string; 
  delay?: number;
  duration?: number;
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizes = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48', 
    lg: 'w-64 h-64',
  };

  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${sizes[size]} ${className}`}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

/**
 * GeometricShape - 3D geometric floating shape
 */
function GeometricShape({ 
  type, 
  position, 
  delay = 0 
}: { 
  type: 'hexagon' | 'cube' | 'ring' | 'grid';
  position: { x: string; y: string };
  delay?: number;
}) {
  const variants = {
    hexagon: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <polygon 
          points="50,2 95,25 95,75 50,98 5,75 5,25" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          className="opacity-60"
        />
        <polygon 
          points="50,15 85,32 85,68 50,85 15,68 15,32" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="0.5" 
          className="opacity-30"
        />
      </svg>
    ),
    cube: (
      <svg viewBox="0 0 100 100" className="w-full h-full" style={{ perspective: '1000px' }}>
        <polygon points="50,15 85,32 85,68 50,85 15,68 15,32" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-60" />
        <polygon points="50,35 75,45 75,75 50,85 25,75 25,45" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-40" />
        <line x1="50" y1="15" x2="50" y2="35" stroke="currentColor" strokeWidth="0.5" className="opacity-30" />
        <line x1="85" y1="32" x2="75" y2="45" stroke="currentColor" strokeWidth="0.5" className="opacity-30" />
        <line x1="85" y1="68" x2="75" y2="75" stroke="currentColor" strokeWidth="0.5" className="opacity-30" />
        <line x1="15" y1="68" x2="25" y2="75" stroke="currentColor" strokeWidth="0.5" className="opacity-30" />
        <line x1="15" y1="32" x2="25" y2="45" stroke="currentColor" strokeWidth="0.5" className="opacity-30" />
      </svg>
    ),
    ring: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-60" />
        <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-40" />
        <circle cx="50" cy="50" r="18" fill="none" stroke="currentColor" strokeWidth="0.5" className="opacity-25" />
      </svg>
    ),
    grid: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="opacity-30" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid-pattern)" />
        <rect x="0" y="0" width="100" height="100" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-60" />
      </svg>
    ),
  };

  return (
    <motion.div
      className={`absolute pointer-events-none text-[var(--accent)] ${position.x.includes('left') ? 'text-left' : position.x.includes('right') ? 'text-right' : 'text-center'}`}
      style={{ 
        left: position.x, 
        top: position.y,
        width: '80px',
        height: '80px',
      }}
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        rotate: 0,
        y: [0, -25, 0],
        rotateY: [0, 10, 0],
        rotateX: [0, -5, 0],
      }}
      transition={{
        opacity: { duration: 0.8, delay },
        scale: { duration: 0.8, delay },
        rotate: { duration: 1, delay, ease: 'easeOut' },
        y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay },
        rotateY: { duration: 8, repeat: Infinity, ease: 'easeInOut', delay: delay + 1 },
        rotateX: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: delay + 2 },
      }}
    >
      {variants[type]}
    </motion.div>
  );
}

/**
 * Particle - Small animated dot
 */
function Particle({ 
  index, 
  total,
  mouseX, 
  mouseY 
}: { 
  index: number; 
  total: number;
  mouseX: any;
  mouseY: any;
}) {
  const angle = (index / total) * Math.PI * 2;
  const radius = 150 + Math.random() * 200;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  
  const parallaxX = useTransform(mouseX, [-0.5, 0.5], [x * 0.1, x * -0.1]);
  const parallaxY = useTransform(mouseY, [-0.5, 0.5], [y * 0.1, y * -0.1]);

  return (
    <motion.div
      className="absolute w-1.5 h-1.5 rounded-full bg-[var(--accent)]"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        x: parallaxX,
        y: parallaxY,
      }}
      animate={{
        opacity: [0.2, 0.6, 0.2],
        scale: [1, 1.5, 1],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: Math.random() * 2,
      }}
    />
  );
}

/**
 * ConnectionLine - Line connecting particles
 */
function ConnectionLine({ 
  start, 
  end, 
  mouseX, 
  mouseY 
}: { 
  start: { x: number; y: number }; 
  end: { x: number; y: number };
  mouseX: any;
  mouseY: any;
}) {
  const parallaxX = useTransform(mouseX, [-0.5, 0.5], [start.x * 0.05, -start.x * 0.05]);
  const parallaxY = useTransform(mouseY, [-0.5, 0.5], [start.y * 0.05, -start.y * 0.05]);

  return (
    <motion.svg
      className="absolute inset-0 pointer-events-none"
      style={{ 
        width: '100%', 
        height: '100%',
        x: parallaxX,
        y: parallaxY,
      }}
    >
      <line
        x1={`calc(50% + ${start.x}px)`}
        y1={`calc(50% + ${start.y}px)`}
        x2={`calc(50% + ${end.x}px)`}
        y2={`calc(50% + ${end.y}px)`}
        stroke="var(--accent)"
        strokeWidth="0.5"
        strokeOpacity="0.15"
      />
    </motion.svg>
  );
}

/**
 * Hero - Ultra Enhanced 3D Tech Hero Section
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  
  // Mouse parallax values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Ultra smooth spring animation
  const springConfig = { damping: 12, stiffness: 80 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  
  // Transform values for different layers with different intensities
  const contentX = useTransform(smoothX, [-0.5, 0.5], ['-2%', '2%']);
  const contentY = useTransform(smoothY, [-0.5, 0.5], ['-2%', '2%']);
  
  const shapesX = useTransform(smoothX, [-0.5, 0.5], ['8%', '-8%']);
  const shapesY = useTransform(smoothY, [-0.5, 0.5], ['8%', '-8%']);
  
  const orbsX = useTransform(smoothX, [-0.5, 0.5], ['-4%', '4%']);
  const orbsY = useTransform(smoothY, [-0.5, 0.5], ['-4%', '4%']);

  useEffect(() => {
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);
      
      mouseX.set(x);
      mouseY.set(y);
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (section) {
        section.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [mouseX, mouseY]);

  // Generate particles - reduced for performance
  const particles = useMemo(() => Array.from({ length: 6 }, (_, i) => ({
    angle: (i / 6) * Math.PI * 2,
    radius: 180 + Math.random() * 100,
  })), []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <>
      <section
        ref={sectionRef}
        className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
        style={{ perspective: '2500px' }}
      >
        {/* Layer 1: Gradient Orbs - Reduced for performance */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{ x: orbsX, y: orbsY }}
        >
          <FloatingOrb className="bg-[var(--accent)]/20 -top-20 -left-20" delay={0} duration={8} size="lg" />
          <FloatingOrb className="bg-[var(--cyan)]/15 bottom-20 right-0" delay={2} duration={10} size="md" />
        </motion.div>

        {/* Layer 2: Subtle Grid */}
        <motion.div 
          className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{ 
            backgroundImage: `linear-gradient(var(--text-primary) 1px, transparent 1px),
                             linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Layer 3: Geometric Shapes - Reduced for performance */}
        <motion.div 
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ x: shapesX, y: shapesY }}
        >
          <GeometricShape type="hexagon" position={{ x: '10%', y: '15%' }} delay={0} />
          <GeometricShape type="ring" position={{ x: '85%', y: '20%' }} delay={0.5} />
          <GeometricShape type="cube" position={{ x: '75%', y: '60%' }} delay={1} />
        </motion.div>

        {/* Layer 4: Particles with Connections */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particles.map((_, i: number) => (
            <Particle 
              key={i} 
              index={i} 
              total={particles.length}
              mouseX={smoothX}
              mouseY={smoothY}
            />
          ))}
          {/* Connection lines between nearby particles - reduced count */}
          {particles.slice(0, 3).map((p, i: number) => {
            const nextP = particles[(i + 2) % particles.length];
            return (
              <ConnectionLine 
                key={`line-${i}`}
                start={{ x: Math.cos(p.angle) * p.radius, y: Math.sin(p.angle) * p.radius }}
                end={{ x: Math.cos(nextP.angle) * nextP.radius, y: Math.sin(nextP.angle) * nextP.radius }}
                mouseX={smoothX}
                mouseY={smoothY}
              />
            );
          })}
        </div>

        {/* Layer 5: Main Content */}
        <motion.div 
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center"
          style={{ x: contentX, y: contentY }}
        >
          {/* Badge with sparkles */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface)]/80 backdrop-blur-md border border-[var(--border)] text-[var(--text-secondary)] text-sm font-medium mb-8 group">
              <Sparkles className="w-4 h-4 text-[var(--accent)] animate-pulse" />
              <span>Trusted by 100+ Companies Worldwide</span>
              <Zap className="w-3 h-3 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>

          {/* Headline with staggered animation */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-tight"
          >
            <span className="block">We Build</span>
            <motion.span 
              className="block gradient-text-shimmer"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Digital
            </motion.span>
            <motion.span 
              className="block relative text-[var(--text-primary)]"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Excellence
              <motion.svg
                className="absolute -bottom-2 left-0 w-full h-3 text-[var(--accent)] opacity-60"
                viewBox="0 0 200 9"
                fill="none"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
                style={{ originX: 0 }}
              >
                <path
                  d="M2.00025 6.99997C25.7509 9.37499 117.248 8.62499 197.501 2.00002"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </motion.svg>
            </motion.span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 max-w-2xl mx-auto text-xl md:text-2xl text-[var(--text-secondary)] font-light leading-relaxed"
          >
            Premium custom software solutions that transform businesses. 
            From AI-powered applications to scalable SaaS platforms, we bring your vision to life.
          </motion.p>

          {/* CTAs with spring animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={() => scrollToSection('contact')}
                variant="primary"
                size="lg"
                icon={<ArrowRight />}
                iconPosition="right"
              >
                Get a Quote
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={() => scrollToSection('portfolio')}
                variant="secondary"
                size="lg"
                icon={<PlayCircle />}
              >
                View Our Work
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust indicators with staggered animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-12 flex flex-wrap justify-center gap-8 items-center"
          >
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.8 }}
            >
              <div className="flex -space-x-3">
                {[
                  { img: 'https://randomuser.me/api/portraits/men/32.jpg', name: 'James' },
                  { img: 'https://randomuser.me/api/portraits/women/44.jpg', name: 'Priya' },
                  { img: 'https://randomuser.me/api/portraits/men/46.jpg', name: 'Michael' },
                  { img: 'https://randomuser.me/api/portraits/women/65.jpg', name: 'Sarah' }
                ].map((person, i) => (
                  <motion.div 
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-[var(--bg-primary)] overflow-hidden"
                    whileHover={{ scale: 1.1, zIndex: 10 }}
                    style={{ zIndex: 5 - i }}
                  >
                    <img 
                      src={person.img}
                      alt={person.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
              <span className="text-sm text-[var(--text-muted)]">100+ Happy Clients</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.9 }}
            >
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 1 + i * 0.1 }}
                  >
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  </motion.div>
                ))}
              </div>
              <span className="text-sm text-[var(--text-muted)]">5.0 Rating</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator with bounce */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={() => scrollToSection('services')}
            className="cursor-pointer p-3 rounded-full bg-[var(--surface)]/80 backdrop-blur-md border border-[var(--border)] hover:border-[var(--accent)] hover:shadow-glow transition-all"
            aria-label="Scroll down"
            animate={{ 
              y: [0, 8, 0],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronDown className="w-6 h-6 text-[var(--text-muted)]" />
          </motion.button>
        </motion.div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--bg-primary)] to-transparent pointer-events-none" />
      </section>

      {/* Stats Section */}
      <Stats />
    </>
  );
}

export default Hero;
