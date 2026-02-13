import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * ThemeToggle - Animated sun/moon theme switcher
 * 
 * Features:
 * - Smooth rotation animation on toggle
 * - Glow effect on hover
 * - Uses CSS variables for theming
 * - Accessible with proper ARIA labels
 * 
 * @example
 * <ThemeToggle size="md" />
 */
export function ThemeToggle({ className, size = 'md' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className={cn(
        'relative flex items-center justify-center rounded-xl',
        'bg-[var(--surface)] border border-[var(--border)]',
        'hover:border-[var(--accent)]',
        'transition-all duration-300',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2',
        sizeClasses[size],
        className
      )}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: theme === 'dark' ? 180 : 0,
          scale: theme === 'dark' ? 1 : 1,
        }}
        transition={{
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        {theme === 'light' ? (
          <Moon className={cn('text-[var(--text-secondary)]', iconSizes[size])} />
        ) : (
          <Sun className={cn('text-yellow-400', iconSizes[size])} />
        )}
      </motion.div>
      
      {/* Subtle glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        style={{
          boxShadow: '0 0 20px var(--accent-glow)',
        }}
      />
    </motion.button>
  );
}

/**
 * ThemeToggleFixed - Fixed position theme toggle
 * 
 * Positioned at bottom-right of screen
 * 
 * @example
 * <ThemeToggleFixed />
 */
export function ThemeToggleFixed() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <ThemeToggle size="lg" />
    </div>
  );
}

export default ThemeToggle;
