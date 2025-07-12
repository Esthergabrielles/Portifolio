import React from 'react';
import { motion } from 'framer-motion';

interface PremiumLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animated?: boolean;
  onClick?: () => void;
}

const PremiumLogo: React.FC<PremiumLogoProps> = ({ 
  size = 'md', 
  className = '', 
  animated = true,
  onClick 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className} relative flex items-center justify-center cursor-pointer group`}
      whileHover={animated ? { scale: 1.05, rotate: 2 } : {}}
      whileTap={animated ? { scale: 0.95 } : {}}
      onClick={onClick}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Premium Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-accent-500 to-primary-600 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300">
        {/* Animated Gradient Overlay */}
        {animated && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10 rounded-2xl"
            animate={{
              background: [
                'linear-gradient(45deg, rgba(255,255,255,0.2) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)',
                'linear-gradient(225deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.2) 100%)',
                'linear-gradient(45deg, rgba(255,255,255,0.2) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-400/50 to-accent-400/50 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
      </div>

      {/* Logo Content */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        {/* Initials */}
        <motion.span
          className={`${textSizes[size]} font-poppins font-bold text-white tracking-tight`}
          animate={animated ? {
            textShadow: [
              '0 0 10px rgba(255,255,255,0.5)',
              '0 0 20px rgba(255,255,255,0.8)',
              '0 0 10px rgba(255,255,255,0.5)'
            ]
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          EG
        </motion.span>

        {/* Decorative Elements */}
        {animated && (
          <>
            {/* Top Right Sparkle */}
            <motion.div
              className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full opacity-80"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0.5,
              }}
            />
            
            {/* Bottom Left Sparkle */}
            <motion.div
              className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-white rounded-full opacity-60"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 1.2,
              }}
            />
          </>
        )}
      </div>

      {/* Premium Border */}
      <div className="absolute inset-0 rounded-2xl border border-white/20 group-hover:border-white/40 transition-colors duration-300" />
      
      {/* Shine Effect */}
      {animated && (
        <motion.div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default PremiumLogo;