import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface PremiumButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  glow?: boolean;
  animated?: boolean;
}

const PremiumButton: React.FC<PremiumButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  fullWidth = false,
  className = '',
  onClick,
  type = 'button',
  glow = false,
  animated = true,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group';

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg hover:shadow-xl hover:from-primary-600 hover:to-primary-700',
    secondary: 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md hover:bg-neutral-50 dark:hover:bg-neutral-700',
    outline: 'bg-transparent border border-primary-500 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950',
    ghost: 'bg-transparent text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800',
    gradient: 'bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600 text-white shadow-lg hover:shadow-xl bg-size-200 hover:bg-pos-100'
  };

  const glowClasses = glow ? 'hover:shadow-glow' : '';
  const widthClasses = fullWidth ? 'w-full' : '';

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${glowClasses} ${widthClasses} ${className}`;

  return (
    <motion.button
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      whileHover={animated && !disabled ? { 
        scale: 1.02, 
        y: -2,
        transition: { duration: 0.2 }
      } : {}}
      whileTap={animated && !disabled ? { 
        scale: 0.98,
        transition: { duration: 0.1 }
      } : {}}
      {...props}
    >
      {/* Background Animation */}
      {animated && variant === 'gradient' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-accent-600 via-primary-600 to-accent-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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

      {/* Shimmer Effect */}
      {animated && !disabled && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 flex items-center gap-2">
        {/* Loading Spinner */}
        {loading && (
          <motion.div
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* Left Icon */}
        {Icon && iconPosition === 'left' && !loading && (
          <motion.div
            whileHover={animated ? { scale: 1.1, rotate: 5 } : {}}
            transition={{ duration: 0.2 }}
          >
            <Icon className="w-5 h-5" />
          </motion.div>
        )}

        {/* Button Text */}
        <span className="font-inter font-semibold">
          {children}
        </span>

        {/* Right Icon */}
        {Icon && iconPosition === 'right' && !loading && (
          <motion.div
            whileHover={animated ? { scale: 1.1, x: 2 } : {}}
            transition={{ duration: 0.2 }}
          >
            <Icon className="w-5 h-5" />
          </motion.div>
        )}
      </div>

      {/* Ripple Effect */}
      {animated && (
        <motion.div
          className="absolute inset-0 rounded-xl"
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 0, opacity: 0.5 }}
          whileTap={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            background: variant === 'primary' || variant === 'gradient' 
              ? 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(14,165,233,0.3) 0%, transparent 70%)'
          }}
        />
      )}

      {/* Glow Effect */}
      {glow && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10" />
      )}
    </motion.button>
  );
};

export default PremiumButton;