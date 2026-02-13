import React from 'react';
import { cn } from '@/lib/utils';

interface RainbowBorderButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function RainbowBorderButton({ 
  children, 
  onClick, 
  className,
  type = 'button'
}: RainbowBorderButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "rainbow-border-btn relative inline-flex items-center justify-center gap-2",
        "px-5 py-2.5 rounded-xl font-semibold",
        "text-white transition-all duration-200 cursor-pointer",
        "hover:scale-[1.02] active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2",
        className
      )}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  );
}
