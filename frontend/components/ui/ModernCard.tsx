'use client';

import { ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ModernCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'glow' | 'rainbow' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  gradient?: boolean;
}

const ModernCard = forwardRef<HTMLDivElement, ModernCardProps>(
  ({ children, className, variant = 'default', size = 'md', hover = true, gradient = false, ...props }, ref) => {
    const baseClasses = 'rounded-2xl backdrop-blur-sm border transition-all duration-300';
    
    const variantClasses = {
      default: 'bg-white/10 border-white/20 text-white',
      glow: 'bg-white/10 border-white/20 text-white shadow-lg shadow-primary/20',
      rainbow: 'bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 border-transparent text-white',
      success: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-100',
      warning: 'bg-amber-500/10 border-amber-500/20 text-amber-100',
      danger: 'bg-red-500/10 border-red-500/20 text-red-100',
    };

    const sizeClasses = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-10',
    };

    const hoverClasses = hover 
      ? 'hover:scale-105 hover:shadow-2xl hover:shadow-primary/30 hover:border-white/40' 
      : '';

    const gradientClasses = gradient 
      ? 'bg-gradient-to-br from-primary/10 via-transparent to-secondary/10' 
      : '';

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          hoverClasses,
          gradientClasses,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ModernCard.displayName = 'ModernCard';

interface ModernCardHeaderProps {
  children: ReactNode;
  className?: string;
}

const ModernCardHeader = ({ children, className }: ModernCardHeaderProps) => (
  <div className={cn('mb-4', className)}>
    {children}
  </div>
);

interface ModernCardTitleProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const ModernCardTitle = ({ children, className, size = 'md' }: ModernCardTitleProps) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl', 
    xl: 'text-3xl',
  };

  return (
    <h3 className={cn(
      'font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent',
      sizeClasses[size],
      className
    )}>
      {children}
    </h3>
  );
};

interface ModernCardContentProps {
  children: ReactNode;
  className?: string;
}

const ModernCardContent = ({ children, className }: ModernCardContentProps) => (
  <div className={cn('text-white/90', className)}>
    {children}
  </div>
);

interface ModernCardFooterProps {
  children: ReactNode;
  className?: string;
}

const ModernCardFooter = ({ children, className }: ModernCardFooterProps) => (
  <div className={cn('mt-4 pt-4 border-t border-white/10', className)}>
    {children}
  </div>
);

export { ModernCard, ModernCardHeader, ModernCardTitle, ModernCardContent, ModernCardFooter };