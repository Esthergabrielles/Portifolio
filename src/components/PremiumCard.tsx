import React from 'react';
import { motion } from 'framer-motion';

interface PremiumCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'gradient' | 'elevated';
  interactive?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
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
  shadow = 'lg',
  border = true,
  glow = false,
  animated = true,
  onClick,
}) => {
  const baseClasses = 'relative transition-all duration-300';

  const variantClasses = {
    default: 'bg-white dark:bg-neutral-900',
    glass: 'glass',
    gradient: 'bg-gradient-to-br from-white via-neutral-50 to-white dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900',
    elevated: 'bg-white dark:bg-neutral-900 border-t border-white/20 dark:border-neutral-700/20'
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
    '2xl': 'shadow-2xl'
  };

  const borderClasses = border ? 'border border-neutral-200 dark:border-neutral-800' : '';
  const interactiveClasses = interactive ? 'cursor-pointer hover:shadow-xl hover:-translate-y-1' : '';
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
        y: -4,
        transition: { duration: 0.3, ease: "easeOut" }
      } : {}}
      whileTap={animated && interactive ? {
        scale: 0.98,
        transition: { duration: 0.1 }
      } : {}}
      initial={animated ? { opacity: 0, y: 20 } : {}}
      animate={animated ? { opacity: 1, y: 0 } : {}}
      transition={animated ? { duration: 0.6, ease: "easeOut" } : {}}
    >
      {/* Background Pattern for Glass Variant */}
      {variant === 'glass' && (
        <div className="absolute inset-0 bg-pattern-dots opacity-5 rounded-3xl" />
      )}

      {/* Gradient Overlay for Elevated Variant */}
      {variant === 'elevated' && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/5 dark:from-white/5 dark:to-black/10 rounded-3xl pointer-events-none" />
      )}

      {/* Glow Effect */}
      {glow && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10" />
      )}

      {/* Shimmer Effect on Hover */}
      {animated && interactive && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl"
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 3,
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