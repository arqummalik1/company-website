import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Calendar, MessageSquare } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

/**
 * CTA - Final Call to Action section
 * 
 * Features:
 * - Gradient mesh background
 * - Glass card container
 * - Multiple CTA options
 * - Animated reveal on scroll
 * 
 * @example
 * <CTA />
 */
export function CTA({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section 
      ref={ref}
      className={cn(
        'relative py-16 md:py-24 overflow-hidden',
        className
      )}
    >
      {/* Background Gradient Mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]">
        {/* Gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[var(--accent)]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[var(--cyan)]/10 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--accent)]/5 rounded-full blur-[150px]" />
        </div>
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(var(--text-primary) 1px, transparent 1px),
                             linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <Container size="md">
        <GlassCard 
          className="relative p-8 md:p-12 lg:p-16 text-center"
          variant="elevated"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-[var(--accent)]/20 rounded-tl-3xl" />
          <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-[var(--accent)]/20 rounded-tr-3xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-[var(--accent)]/20 rounded-bl-3xl" />
          <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-[var(--accent)]/20 rounded-br-3xl" />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
              Let's Start a conversation
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-6"
            >
              Ready to Build Something{' '}
              <span className="gradient-text">Exceptional?</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-[var(--text-secondary)] mb-8 max-w-xl mx-auto"
            >
              Whether you have a clear vision or just an idea, we're here to help you 
              transform it into reality. Our team is ready to discuss your project.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button 
                variant="primary" 
                size="lg"
                icon={<ArrowRight />}
                iconPosition="right"
              >
                Get a Free Consultation
              </Button>
              
              <Button 
                variant="secondary" 
                size="lg"
                icon={<Calendar />}
              >
                Schedule a Call
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-10 pt-8 border-t border-[var(--border)]"
            >
              <p className="text-sm text-[var(--text-muted)] mb-4">
                Join 150+ companies who've transformed their business
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-[var(--text-secondary)]">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[var(--accent)]" />
                  <span>Response within 24 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[var(--accent)]" />
                  <span>Flexible meeting times</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </GlassCard>
      </Container>
    </section>
  );
}

export default CTA;
