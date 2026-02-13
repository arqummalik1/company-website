import { forwardRef, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  loadingText?: string;
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
  animated?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  'aria-label'?: string;
}

/**
 * Button - Premium Button Component with Multiple Variants
 * 
 * Variants:
 * - Primary: Accent background with glow on hover
 * - Secondary: Glass surface with border
 * - Ghost: Transparent with accent text
 * - Outline: Border only with accent on hover
 * 
 * @example
 * <Button variant="primary" icon={<ArrowRight />} iconPosition="right">
 *   Get Started
 * </Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    icon,
    iconPosition = 'right',
    isLoading = false,
    loadingText,
    children,
    className,
    fullWidth = false,
    animated = true,
    disabled = false,
    type = 'button',
    onClick,
    'aria-label': ariaLabel,
  }, ref) => {
    const baseStyles = cn(
      'inline-flex items-center justify-center gap-2',
      'font-medium rounded-xl',
      'transition-all duration-300 ease-out',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      fullWidth && 'w-full',
    );

    const variants = {
      primary: cn(
        'bg-[var(--accent)] text-white',
        'hover:bg-[var(--accent-hover)]',
        'hover:shadow-glow',
        'active:scale-[0.98]',
      ),
      secondary: cn(
        'bg-[var(--surface)] text-[var(--text-primary)]',
        'border border-[var(--border)]',
        'hover:bg-[var(--surface-elevated)]',
        'hover:border-[var(--accent)]',
        'backdrop-blur-[var(--glass-blur)]',
      ),
      ghost: cn(
        'bg-transparent',
        'text-[var(--accent)]',
        'hover:bg-[var(--accent)]/10',
        'active:bg-[var(--accent)]/20',
      ),
      outline: cn(
        'bg-transparent',
        'text-[var(--text-primary)]',
        'border-2 border-[var(--border-strong)]',
        'hover:border-[var(--accent)]',
        'hover:text-[var(--accent)]',
      ),
    };

    const sizes = {
      sm: 'h-9 px-4 text-sm',
      md: 'h-12 px-6 text-base',
      lg: 'h-14 px-8 text-lg',
    };

    const iconSizes = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    };

    const LoadingSpinner = () => (
      <svg
        className={cn('animate-spin', iconSizes[size])}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

    const content = (
      <>
        {isLoading && <LoadingSpinner />}
        {!isLoading && icon && iconPosition === 'left' && (
          <span className={iconSizes[size]}>{icon}</span>
        )}
        <span>{isLoading && loadingText ? loadingText : children}</span>
        {!isLoading && icon && iconPosition === 'right' && (
          <span className={cn(
            'transition-transform duration-200',
            'group-hover:translate-x-1'
          )}>
            {icon}
          </span>
        )}
      </>
    );

    if (animated && !disabled) {
      return (
        <motion.button
          ref={ref}
          type={type}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(baseStyles, variants[variant], sizes[size], 'group', className)}
          disabled={disabled || isLoading}
          onClick={onClick}
          aria-label={ariaLabel}
        >
          {content}
        </motion.button>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        className={cn(baseStyles, variants[variant], sizes[size], 'group', className)}
        disabled={disabled || isLoading}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

/**
 * IconButton - Circular button for icon-only actions
 */
interface IconButtonProps {
  icon: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  'aria-label': string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({
    icon,
    variant = 'ghost',
    size = 'md',
    className,
    disabled = false,
    onClick,
    'aria-label': ariaLabel,
  }, ref) => {
    const baseStyles = cn(
      'inline-flex items-center justify-center',
      'rounded-full',
      'transition-all duration-300 ease-out',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
    );

    const variants = {
      primary: cn(
        'bg-[var(--accent)] text-white',
        'hover:bg-[var(--accent-hover)]',
        'hover:shadow-glow',
      ),
      secondary: cn(
        'bg-[var(--surface)] text-[var(--text-primary)]',
        'border border-[var(--border)]',
        'hover:border-[var(--accent)]',
      ),
      ghost: cn(
        'bg-transparent',
        'text-[var(--text-secondary)]',
        'hover:text-[var(--accent)]',
        'hover:bg-[var(--accent)]/10',
      ),
    };

    const sizes = {
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
        ref={ref}
        type="button"
        whileHover={disabled ? undefined : { scale: 1.05 }}
        whileTap={disabled ? undefined : { scale: 0.95 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        <span className={iconSizes[size]}>{icon}</span>
      </motion.button>
    );
  }
);

IconButton.displayName = 'IconButton';

export default Button;
