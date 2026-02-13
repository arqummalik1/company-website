import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  as?: 'div' | 'section' | 'article' | 'main';
  id?: string;
}

/**
 * Container - Max-width wrapper for consistent section layouts
 * 
 * Sizes:
 * - sm: max-w-3xl (768px)
 * - md: max-w-5xl (1024px)
 * - lg: max-w-7xl (1280px) - default
 * - xl: max-w-[1440px]
 * - full: no max-width
 * 
 * @example
 * <Container size="lg">
 *   <YourContent />
 * </Container>
 */
export function Container({
  children,
  className,
  size = 'lg',
  as: Component = 'div',
  id,
}: ContainerProps) {
  const sizeClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-[1440px]',
    full: 'max-w-none',
  };

  return (
    <Component
      id={id}
      className={cn(
        'mx-auto px-4 sm:px-6 lg:px-8',
        sizeClasses[size],
        className
      )}
    >
      {children}
    </Component>
  );
}

/**
 * Section - Container with section padding
 */
interface SectionProps {
  children: ReactNode;
  className?: string;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  id?: string;
  background?: 'default' | 'alternate' | 'dark' | 'gradient';
}

export function Section({
  children,
  className,
  containerSize = 'lg',
  id,
  background = 'default',
}: SectionProps) {
  const backgroundClasses = {
    default: 'bg-[var(--bg-primary)]',
    alternate: 'bg-[var(--bg-secondary)]',
    dark: 'bg-[var(--bg-tertiary)]',
    gradient: 'bg-gradient-to-b from-[var(--bg-primary)] to-[var(--bg-secondary)]',
  };

  return (
    <section
      id={id}
      className={cn(
        'py-16 md:py-24',
        backgroundClasses[background],
        className
      )}
    >
      <Container size={containerSize}>
        {children}
      </Container>
    </section>
  );
}

export default Container;
