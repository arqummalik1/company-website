import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface Feature {
  title: string;
  description: string;
  benefits: string[];
  gradient: string;
}

interface FeaturesProps {
  features?: Feature[];
  className?: string;
}

const defaultFeatures: Feature[] = [
  {
    title: 'Scalable Architecture',
    description: 'Built for growth from day one. Our solutions scale seamlessly as your business expands, handling increased traffic and data without compromising performance.',
    gradient: 'from-blue-500 to-cyan-500',
    benefits: [
      'Microservices-ready infrastructure',
      'Auto-scaling cloud deployment',
      'Load-balanced architecture',
    ],
  },
  {
    title: 'Enterprise Security',
    description: 'Bank-grade security protocols protect your data. We implement industry-leading encryption, compliance, and access controls.',
    gradient: 'from-emerald-500 to-teal-500',
    benefits: [
      'End-to-end encryption',
      'SOC 2 compliant processes',
      'Multi-factor authentication',
    ],
  },
  {
    title: 'Performance First',
    description: 'Lightning-fast response times ensure exceptional user experiences. Every millisecond matters, and we optimize for speed at every level.',
    gradient: 'from-orange-500 to-red-500',
    benefits: [
      'Edge computing deployment',
      'CDN integration',
      'Lazy loading & caching',
    ],
  },
  {
    title: 'Data-Driven Insights',
    description: 'Transform raw data into actionable intelligence. Our analytics integration provides real-time visibility into your business metrics.',
    gradient: 'from-purple-500 to-pink-500',
    benefits: [
      'Real-time dashboards',
      'Custom reporting',
      'Predictive analytics',
    ],
  },
  {
    title: 'Clean Code Standards',
    description: 'Maintainable, well-documented code that stands the test of time. We follow SOLID principles and industry best practices.',
    gradient: 'from-indigo-500 to-blue-500',
    benefits: [
      'Comprehensive documentation',
      'Unit test coverage',
      'CI/CD pipelines',
    ],
  },
];

/**
 * FeatureIllustration - Custom SVG illustration for each feature
 */
function FeatureIllustration({ 
  type, 
  gradient 
}: { 
  type: string;
  gradient: string;
}) {
  const illustrations: Record<string, React.ReactNode> = {
    'Scalable Architecture': (
      <svg viewBox="0 0 400 300" className="w-full h-full">
        {/* Background elements */}
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'var(--accent)', stopOpacity: 0.2 }} />
            <stop offset="100%" style={{ stopColor: 'var(--cyan)', stopOpacity: 0.2 }} />
          </linearGradient>
        </defs>
        
        {/* Server stack */}
        <rect x="80" y="100" width="100" height="60" rx="8" fill="var(--accent)" opacity="0.2" stroke="var(--accent)" strokeWidth="2" />
        <rect x="85" y="110" width="90" height="10" rx="2" fill="var(--accent)" opacity="0.4" />
        <rect x="85" y="125" width="90" height="10" rx="2" fill="var(--accent)" opacity="0.4" />
        <rect x="85" y="140" width="90" height="10" rx="2" fill="var(--accent)" opacity="0.4" />
        
        {/* Server 2 */}
        <rect x="220" y="100" width="100" height="60" rx="8" fill="var(--cyan)" opacity="0.2" stroke="var(--cyan)" strokeWidth="2" />
        <rect x="225" y="110" width="90" height="10" rx="2" fill="var(--cyan)" opacity="0.4" />
        <rect x="225" y="125" width="90" height="10" rx="2" fill="var(--cyan)" opacity="0.4" />
        <rect x="225" y="140" width="90" height="10" rx="2" fill="var(--cyan)" opacity="0.4" />
        
        {/* Connection lines */}
        <path d="M180 130 L220 130" stroke="var(--accent)" strokeWidth="2" strokeDasharray="4" opacity="0.6" />
        <path d="M180 150 L220 150" stroke="var(--accent)" strokeWidth="2" strokeDasharray="4" opacity="0.6" />
        
        {/* Upward arrows */}
        <path d="M130 70 L130 90" stroke="var(--accent)" strokeWidth="3" />
        <path d="M125 75 L130 70 L135 75" stroke="var(--accent)" strokeWidth="3" fill="none" />
        
        <path d="M270 70 L270 90" stroke="var(--cyan)" strokeWidth="3" />
        <path d="M265 75 L270 70 L275 75" stroke="var(--cyan)" strokeWidth="3" fill="none" />
        
        {/* Cloud */}
        <ellipse cx="320" cy="60" rx="40" ry="25" fill="var(--accent)" opacity="0.15" />
        <ellipse cx="300" cy="50" rx="25" ry="20" fill="var(--accent)" opacity="0.2" />
        <ellipse cx="340" cy="50" rx="25" ry="20" fill="var(--accent)" opacity="0.2" />
        
        {/* Scale icon */}
        <rect x="160" y="200" width="80" height="40" rx="6" fill="var(--accent)" opacity="0.15" stroke="var(--accent)" strokeWidth="2" />
        <path d="M170 225 L190 210 L210 225" stroke="var(--accent)" strokeWidth="2" fill="none" />
        
        {/* Growth chart */}
        <polyline points="50,250 100,230 150,240 200,210 250,200 300,180 350,160" fill="none" stroke="var(--cyan)" strokeWidth="3" />
        <circle cx="350" cy="160" r="5" fill="var(--cyan)" />
      </svg>
    ),
    'Enterprise Security': (
      <svg viewBox="0 0 400 300" className="w-full h-full">
        {/* Shield */}
        <path d="M200 40 L280 80 L280 160 Q280 220 200 260 Q120 220 120 160 L120 80 Z" fill="var(--emerald)" opacity="0.15" stroke="var(--emerald)" strokeWidth="3" />
        
        {/* Lock */}
        <rect x="170" y="130" width="60" height="50" rx="8" fill="var(--emerald)" opacity="0.3" stroke="var(--emerald)" strokeWidth="2" />
        <rect x="175" y="120" width="50" height="20" rx="10" fill="none" stroke="var(--emerald)" strokeWidth="3" />
        <circle cx="200" cy="155" r="8" fill="var(--emerald)" />
        
        {/* Checkmarks */}
        <path d="M60 80 L80 100 L120 60" stroke="var(--emerald)" strokeWidth="3" fill="none" />
        <path d="M60 130 L80 150 L120 110" stroke="var(--emerald)" strokeWidth="3" fill="none" />
        <path d="M60 180 L80 200 L120 160" stroke="var(--emerald)" strokeWidth="3" fill="none" />
        
        {/* Key */}
        <circle cx="320" cy="200" r="25" fill="none" stroke="var(--emerald)" strokeWidth="2" />
        <rect x="340" y="195" width="40" height="10" fill="var(--emerald)" opacity="0.5" />
        <rect x="365" y="195" width="8" height="15" fill="var(--emerald)" opacity="0.5" />
        
        {/* Security nodes */}
        <circle cx="340" cy="80" r="8" fill="var(--emerald)" opacity="0.3" />
        <circle cx="370" cy="120" r="6" fill="var(--emerald)" opacity="0.2" />
        <circle cx="350" cy="150" r="5" fill="var(--emerald)" opacity="0.25" />
      </svg>
    ),
    'Performance First': (
      <svg viewBox="0 0 400 300" className="w-full h-full">
        {/* Lightning bolt */}
        <path d="M220 30 L180 120 L200 120 L190 240 L260 110 L230 110 Z" fill="var(--orange)" opacity="0.3" stroke="var(--orange)" strokeWidth="2" />
        
        {/* Speed lines */}
        <path d="M50 100 L150 100" stroke="var(--orange)" strokeWidth="2" opacity="0.5" />
        <path d="M30 120 L120 120" stroke="var(--orange)" strokeWidth="2" opacity="0.3" />
        <path d="M60 140 L140 140" stroke="var(--orange)" strokeWidth="2" opacity="0.4" />
        
        {/* Gauge */}
        <path d="M80 220 A80 80 0 0 1 240 220" fill="none" stroke="var(--orange)" strokeWidth="8" strokeLinecap="round" opacity="0.3" />
        <path d="M80 220 A80 80 0 0 1 220 160" fill="none" stroke="var(--orange)" strokeWidth="8" strokeLinecap="round" />
        
        {/* Gauge needle */}
        <line x1="160" y1="220" x2="200" y2="170" stroke="var(--orange)" strokeWidth="3" />
        <circle cx="160" cy="220" r="8" fill="var(--orange)" />
        
        {/* Timer elements */}
        <circle cx="320" cy="80" r="30" fill="none" stroke="var(--orange)" strokeWidth="3" opacity="0.5" />
        <path d="M320 55 L320 80 L340 80" stroke="var(--orange)" strokeWidth="2" fill="none" />
        
        {/* Checkered flag */}
        <rect x="300" y="180" width="5" height="40" fill="var(--orange)" opacity="0.5" />
        <rect x="305" y="180" width="5" height="30" fill="var(--orange)" />
        <rect x="310" y="180" width="5" height="35" fill="var(--orange)" opacity="0.5" />
        <rect x="315" y="180" width="5" height="25" fill="var(--orange)" />
        <rect x="320" y="180" width="5" height="30" fill="var(--orange)" opacity="0.5" />
      </svg>
    ),
    'Data-Driven Insights': (
      <svg viewBox="0 0 400 300" className="w-full h-full">
        {/* Bar chart */}
        <rect x="50" y="180" width="40" height="60" rx="4" fill="var(--accent)" opacity="0.3" />
        <rect x="100" y="140" width="40" height="100" rx="4" fill="var(--accent)" opacity="0.5" />
        <rect x="150" y="100" width="40" height="140" rx="4" fill="var(--accent)" opacity="0.7" />
        <rect x="200" y="160" width="40" height="80" rx="4" fill="var(--cyan)" opacity="0.3" />
        <rect x="250" y="80" width="40" height="160" rx="4" fill="var(--cyan)" opacity="0.5" />
        <rect x="300" y="120" width="40" height="120" rx="4" fill="var(--cyan)" opacity="0.7" />
        
        {/* Line chart overlay */}
        <polyline points="70,180 120,140 170,100 220,160 270,80 320,120" fill="none" stroke="var(--accent)" strokeWidth="3" />
        
        {/* Pie chart */}
        <circle cx="100" cy="60" r="30" fill="var(--accent)" opacity="0.2" />
        <path d="M100 60 L100 30 A30 30 0 0 1 130 60 Z" fill="var(--accent)" opacity="0.5" />
        <path d="M100 60 L130 60 A30 30 0 0 1 100 90 Z" fill="var(--cyan)" opacity="0.5" />
        <path d="M100 60 L100 90 A30 30 0 0 1 70 60 Z" fill="var(--accent)" opacity="0.3" />
        
        {/* Analytics icons */}
        <circle cx="340" cy="220" r="20" fill="none" stroke="var(--cyan)" strokeWidth="2" opacity="0.5" />
        <path d="M335 220 L340 225 L350 215" stroke="var(--cyan)" strokeWidth="2" fill="none" />
      </svg>
    ),
    'Clean Code Standards': (
      <svg viewBox="0 0 400 300" className="w-full h-full">
        {/* Code brackets */}
        <text x="80" y="150" fontSize="80" fill="var(--accent)" opacity="0.3">&lt;</text>
        <text x="260" y="150" fontSize="80" fill="var(--accent)" opacity="0.3">&gt;</text>
        
        {/* Code lines */}
        <rect x="100" y="80" width="200" height="8" rx="2" fill="var(--accent)" opacity="0.6" />
        <rect x="100" y="100" width="160" height="8" rx="2" fill="var(--cyan)" opacity="0.5" />
        <rect x="100" y="120" width="180" height="8" rx="2" fill="var(--accent)" opacity="0.4" />
        <rect x="100" y="140" width="140" height="8" rx="2" fill="var(--cyan)" opacity="0.6" />
        <rect x="100" y="160" width="200" height="8" rx="2" fill="var(--accent)" opacity="0.5" />
        <rect x="100" y="180" width="170" height="8" rx="2" fill="var(--cyan)" opacity="0.4" />
        <rect x="100" y="200" width="190" height="8" rx="2" fill="var(--accent)" opacity="0.3" />
        
        {/* Bug icon */}
        <ellipse cx="340" cy="80" rx="20" ry="15" fill="none" stroke="var(--cyan)" strokeWidth="2" />
        <circle cx="330" cy="70" r="5" fill="var(--cyan)" opacity="0.5" />
        <circle cx="350" cy="70" r="5" fill="var(--cyan)" opacity="0.5" />
        <path d="M325 90 L315 100" stroke="var(--cyan)" strokeWidth="2" />
        <path d="M355 90 L365 100" stroke="var(--cyan)" strokeWidth="2" />
        
        {/* Test checkmark */}
        <circle cx="340" cy="220" r="25" fill="var(--accent)" opacity="0.2" />
        <path d="M325 220 L335 230 L355 210" stroke="var(--accent)" strokeWidth="3" fill="none" />
      </svg>
    ),
  };

  return (
    <div className={cn(
      'w-full h-full p-4',
      'bg-gradient-to-br',
      gradient,
      'opacity-90'
    )}>
      {illustrations[type] || illustrations['Scalable Architecture']}
    </div>
  );
}

/**
 * FeatureItem - Single feature with illustration and benefits list
 */
function FeatureItem({ 
  feature, 
  index, 
  isInView 
}: { 
  feature: Feature; 
  index: number; 
  isInView: boolean;
}) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1.0] }}
      className={cn(
        'flex flex-col',
        isEven ? 'lg:flex-row' : 'lg:flex-row-reverse',
        'gap-8 lg:gap-16 items-center'
      )}
    >
      {/* Visual/Image Side - Large Illustration */}
      <div className="flex-1 w-full">
        <GlassCard 
          className="aspect-[4/3] overflow-hidden"
          hover
        >
          <FeatureIllustration 
            type={feature.title} 
            gradient={feature.gradient}
          />
        </GlassCard>
      </div>

      {/* Content Side */}
      <div className="flex-1 w-full">
        <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4">
          {feature.title}
        </h3>
        <p className="text-lg text-[var(--text-secondary)] mb-6 leading-relaxed">
          {feature.description}
        </p>
        
        {/* Benefits List */}
        <ul className="space-y-3">
          {feature.benefits.map((benefit, benefitIndex) => (
            <motion.li
              key={benefitIndex}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ 
                duration: 0.4, 
                delay: (index * 0.1) + (benefitIndex * 0.1) + 0.2 
              }}
              className="flex items-center gap-3"
            >
              <div className="w-5 h-5 rounded-full bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-[var(--accent)]" />
              </div>
              <span className="text-[var(--text-secondary)]">{benefit}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

/**
 * Features - Alternating layout section with large illustrations
 */
export function Features({ features = defaultFeatures, className }: FeaturesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section 
      ref={ref}
      className={cn(
        'py-16 md:py-24',
        'bg-[var(--bg-primary)]',
        className
      )}
    >
      <Container size="lg">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            Why Choose <span className="gradient-text">Qubit</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            We don't just build software. We craft solutions that drive business growth, 
            enhance security, and deliver exceptional user experiences.
          </p>
        </motion.div>

        {/* Features List */}
        <div className="space-y-16 lg:space-y-24">
          {features.map((feature, index) => (
            <FeatureItem
              key={feature.title}
              feature={feature}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Button 
            variant="primary" 
            icon={<ArrowRight />}
            iconPosition="right"
          >
            Explore Our Services
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}

export default Features;
