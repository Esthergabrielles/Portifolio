import React from 'react';
import { motion } from 'framer-motion';

interface PremiumCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'gradient' | 'elevated' | 'premium';
  interactive?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'premium';
  border?: boolean;
  glow?: boolean;
  animated?: boolean;
  onClick?: () => void;
}

const PremiumCard: React.FC<PremiumCardProps> = ({
  children,
  className = '',
  variant = 'default',
  interactive = false,
  padding = 'lg',
  rounded = '3xl',
  shadow = 'premium',
  border = true,
  glow = false,
  animated = true,
  onClick,
}) => {
  const baseClasses = 'relative transition-all duration-500 overflow-hidden backdrop-blur-premium';

  const variantClasses = {
    default: 'bg-white/90 dark:bg-slate-900/90',
    glass: 'bg-white/10 dark:bg-black/20 border-white/20 dark:border-white/10',
    gradient: 'bg-gradient-to-br from-white/95 via-slate-50/95 to-white/95 dark:from-slate-900/95 dark:via-slate-800/95 dark:to-slate-900/95',
    elevated: 'bg-white/95 dark:bg-slate-900/95 border-t border-white/30 dark:border-slate-700/30',
    premium: 'bg-gradient-to-br from-white via-slate-50/50 to-white dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900'
  };

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12'
  };

  const roundedClasses = {
    sm: 'rounded-lg',
    md: 'rounded-xl',
    lg: 'rounded-2xl',
    xl: 'rounded-3xl',
    '2xl': 'rounded-3xl',
    '3xl': 'rounded-3xl'
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl',
    premium: 'shadow-premium'
  };

  const borderClasses = border ? 'border border-slate-200/60 dark:border-slate-800/60' : '';
  const interactiveClasses = interactive ? 'cursor-pointer hover:shadow-premium-lg hover:-translate-y-2 hover:scale-102' : '';
  const glowClasses = glow ? 'hover:shadow-glow' : '';

  const combinedClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${paddingClasses[padding]}
    ${roundedClasses[rounded]}
    ${shadowClasses[shadow]}
    ${borderClasses}
    ${interactiveClasses}
    ${glowClasses}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const MotionComponent = motion.div;

  return (
    <MotionComponent
      className={combinedClasses}
      onClick={onClick}
      whileHover={animated && interactive ? {
        scale: 1.02,
        y: -8,
        transition: { duration: 0.4, ease: "easeOut" }
      } : {}}
      whileTap={animated && interactive ? {
        scale: 0.98,
        transition: { duration: 0.1 }
      } : {}}
      initial={animated ? { opacity: 0, y: 20 } : {}}
      animate={animated ? { opacity: 1, y: 0 } : {}}
      transition={animated ? { duration: 0.8, ease: "easeOut" } : {}}
    >
      {/* Premium Top Border Highlight */}
      {variant === 'premium' && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />
      )}

      {/* Background Pattern for Glass Variant */}
      {variant === 'glass' && (
        <div className="absolute inset-0 bg-pattern-dots opacity-5 rounded-3xl" />
      )}

      {/* Gradient Overlay for Elevated Variant */}
      {variant === 'elevated' && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-slate-900/5 dark:from-white/5 dark:to-slate-900/10 rounded-3xl pointer-events-none" />
      )}

      {/* Glow Effect */}
      {glow && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
      )}

      {/* Premium Shimmer Effect on Hover */}
      {animated && interactive && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl"
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 4,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </MotionComponent>
  );
};

export default PremiumCard;