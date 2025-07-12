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
  const baseClasses = 'inline-flex items-center justify-center gap-3 font-semibold rounded-2xl transition-all duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group';

  const sizeClasses = {
    sm: 'px-6 py-3 text-sm',
    md: 'px-8 py-4 text-base',
    lg: 'px-10 py-5 text-lg',
    xl: 'px-12 py-6 text-xl'
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-xl hover:shadow-2xl hover:from-primary-600 hover:to-primary-700',
    secondary: 'bg-white/90 dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 border border-slate-200/60 dark:border-slate-700/60 shadow-lg hover:shadow-xl hover:bg-slate-50/95 dark:hover:bg-slate-700/95 backdrop-blur-sm',
    outline: 'bg-transparent border-2 border-primary-500/60 text-primary-600 dark:text-primary-400 hover:bg-primary-50/80 dark:hover:bg-primary-950/80 backdrop-blur-sm',
    ghost: 'bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 backdrop-blur-sm',
    gradient: 'bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600 text-white shadow-xl hover:shadow-2xl bg-size-200 hover:bg-pos-100 backdrop-blur-sm'
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
        y: -3,
        transition: { duration: 0.3 }
      } : {}}
      whileTap={animated && !disabled ? { 
        scale: 0.98,
        transition: { duration: 0.1 }
      } : {}}
      {...props}
    >
      {/* Premium Background Animation */}
      {animated && variant === 'gradient' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-accent-600 via-primary-600 to-accent-600 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Premium Shimmer Effect */}
      {animated && !disabled && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100"
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
      <div className="relative z-10 flex items-center gap-3">
        {/* Loading Spinner */}
        {loading && (
          <motion.div
            className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* Left Icon */}
        {Icon && iconPosition === 'left' && !loading && (
          <motion.div
            whileHover={animated ? { scale: 1.1, rotate: 5 } : {}}
            transition={{ duration: 0.3 }}
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
            whileHover={animated ? { scale: 1.1, x: 3 } : {}}
            transition={{ duration: 0.3 }}
          >
            <Icon className="w-5 h-5" />
          </motion.div>
        )}
      </div>

      {/* Premium Ripple Effect */}
      {animated && (
        <motion.div
          className="absolute inset-0 rounded-2xl"
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 0, opacity: 0.5 }}
          whileTap={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            background: variant === 'primary' || variant === 'gradient' 
              ? 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(14,165,233,0.4) 0%, transparent 70%)'
          }}
        />
      )}

      {/* Premium Glow Effect */}
      {glow && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500 to-accent-500 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-400 -z-10" />
      )}
    </motion.button>
  );
};

export default PremiumButton;