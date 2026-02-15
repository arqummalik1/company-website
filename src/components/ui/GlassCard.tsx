import { motion } from 'framer-motion';
import { forwardRef, ReactNode, memo } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'elevated' | 'outlined';
  animate?: boolean;
  onClick?: () => void;
  role?: string;
  'aria-label'?: string;
}

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6 md:p-8',
  lg: 'p-8 md:p-12',
};

/**
 * GlassCard - Refined Glassmorphism 2.0 Component
 * 
 * Features:
 * - Backdrop blur: 20px (dark) / 12px (light) for readability
 * - Semi-transparent background using CSS variables
 * - Subtle border with hover brightening
 * - Multi-layer soft shadows
 * - Optional hover lift effect
 * 
 * @example
 * <GlassCard hover>
 *   <h3>Card Title</h3>
 *   <p>Card content</p>
 * </GlassCard>
 */
export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ 
    children, 
    className, 
    hover = false,
    padding = 'md',
    variant = 'default',
    animate = true,
    onClick,
    role,
    'aria-label': ariaLabel,
  }, ref) => {
    const baseClasses = cn(
      // Base glass effect
      'rounded-2xl',
      'transition-all duration-300 ease-out',
      'border border-[var(--border)]',
      
      // Padding
      paddingClasses[padding],
      
      // Hover effects
      hover && 'hover:-translate-y-1 hover:border-[var(--border-strong)] hover:shadow-lg',
      
      // Cursor for clickable cards
      onClick && 'cursor-pointer',
      
      // Focus visible for accessibility
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2',
    );

    const variantClasses = {
      default: cn(
        'bg-[var(--surface)]',
        'backdrop-blur-[var(--glass-blur)]',
      ),
      elevated: cn(
        'bg-[var(--surface-elevated)]',
        'backdrop-blur-[var(--glass-blur)]',
        'shadow-xl',
      ),
      outlined: cn(
        'bg-transparent',
        'border-2',
      ),
    };

    if (animate) {
      return (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
          className={cn(baseClasses, variantClasses[variant], className)}
          onClick={onClick}
          role={role}
          aria-label={ariaLabel}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(baseClasses, variantClasses[variant], className)}
        onClick={onClick}
        role={role}
        aria-label={ariaLabel}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

/**
 * Memoized version of GlassCard for better performance
 */
export const GlassCardMemo = memo(GlassCard);

/**
 * GlassCardStatic - Non-animated version of GlassCard
 */
export const GlassCardStatic = forwardRef<HTMLDivElement, Omit<GlassCardProps, 'animate'>>(
  ({ 
    children, 
    className, 
    hover = false,
    padding = 'md',
    variant = 'default',
    onClick,
    role,
    'aria-label': ariaLabel,
  }, ref) => {
    const baseClasses = cn(
      'rounded-2xl',
      'transition-all duration-300 ease-out',
      'border border-[var(--border)]',
      paddingClasses[padding],
      hover && 'hover:-translate-y-1 hover:border-[var(--border-strong)] hover:shadow-lg',
      onClick && 'cursor-pointer',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2',
    );

    const variantClasses = {
      default: 'bg-[var(--surface)] backdrop-blur-[var(--glass-blur)]',
      elevated: 'bg-[var(--surface-elevated)] backdrop-blur-[var(--glass-blur)] shadow-xl',
      outlined: 'bg-transparent border-2',
    };

    return (
      <div
        ref={ref}
        className={cn(baseClasses, variantClasses[variant], className)}
        onClick={onClick}
        role={role}
        aria-label={ariaLabel}
      >
        {children}
      </div>
    );
  }
);

GlassCardStatic.displayName = 'GlassCardStatic';

/**
 * Memoized version of GlassCardStatic for better performance
 */
export const GlassCardStaticMemo = memo(GlassCardStatic);

/**
 * GlassCardGroup - Container for multiple glass cards with stagger animation
 */
interface GlassCardGroupProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function GlassCardGroup({ children, className, staggerDelay = 0.1 }: GlassCardGroupProps) {
  return (
    <div className={cn('grid gap-6', className)}>
      {Array.isArray(children) 
        ? children.map((child, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ 
                duration: 0.5, 
                delay: index * staggerDelay,
                ease: [0.25, 0.1, 0.25, 1.0] 
              }}
            >
              {child}
            </motion.div>
          ))
        : children
      }
    </div>
  );
}

export default GlassCard;
