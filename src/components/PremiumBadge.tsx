import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface PremiumBadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  rounded?: boolean;
  animated?: boolean;
  glow?: boolean;
  className?: string;
  onClick?: () => void;
}

const PremiumBadge: React.FC<PremiumBadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  rounded = true,
  animated = true,
  glow = false,
  className = '',
  onClick
}) => {
  const baseClasses = 'inline-flex items-center gap-1.5 font-medium transition-all duration-300';

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const variantClasses = {
    default: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300',
    primary: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300',
    secondary: 'bg-secondary-100 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-300',
    success: 'bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-300',
    warning: 'bg-warning-100 text-warning-700 dark:bg-warning-900/30 dark:text-warning-300',
    error: 'bg-error-100 text-error-700 dark:bg-error-900/30 dark:text-error-300',
    gradient: 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
  };

  const roundedClasses = rounded ? 'rounded-full' : 'rounded-lg';
  const interactiveClasses = onClick ? 'cursor-pointer hover:scale-105' : '';
  const glowClasses = glow ? 'hover:shadow-glow' : '';

  const combinedClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${roundedClasses}
    ${interactiveClasses}
    ${glowClasses}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const iconSize = size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <motion.span
      className={combinedClasses}
      onClick={onClick}
      whileHover={animated && onClick ? {
        scale: 1.05,
        transition: { duration: 0.2 }
      } : {}}
      whileTap={animated && onClick ? {
        scale: 0.95,
        transition: { duration: 0.1 }
      } : {}}
      initial={animated ? { opacity: 0, scale: 0.8 } : {}}
      animate={animated ? { opacity: 1, scale: 1 } : {}}
      transition={animated ? { duration: 0.3, type: "spring", bounce: 0.4 } : {}}
    >
      {/* Background Animation for Gradient Variant */}
      {animated && variant === 'gradient' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full opacity-0 group-hover:opacity-100"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Content */}
      <span className="relative z-10 flex items-center gap-1.5">
        {/* Left Icon */}
        {Icon && iconPosition === 'left' && (
          <motion.div
            whileHover={animated ? { scale: 1.1, rotate: 5 } : {}}
            transition={{ duration: 0.2 }}
          >
            <Icon className={iconSize} />
          </motion.div>
        )}

        {/* Badge Text */}
        <span className="font-inter font-medium">
          {children}
        </span>

        {/* Right Icon */}
        {Icon && iconPosition === 'right' && (
          <motion.div
            whileHover={animated ? { scale: 1.1, rotate: -5 } : {}}
            transition={{ duration: 0.2 }}
          >
            <Icon className={iconSize} />
          </motion.div>
        )}
      </span>

      {/* Pulse Effect for Interactive Badges */}
      {animated && onClick && (
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ scale: 1, opacity: 0 }}
          whileHover={{ scale: 1.2, opacity: 0.1 }}
          transition={{ duration: 0.3 }}
          style={{
            background: variant === 'gradient' 
              ? 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)'
              : 'radial-gradient(circle, currentColor 0%, transparent 70%)'
          }}
        />
      )}

      {/* Glow Effect */}
      {glow && (
        <div className="absolute inset-0 rounded-full bg-current opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300 -z-10" />
      )}
    </motion.span>
  );
};

export default PremiumBadge;