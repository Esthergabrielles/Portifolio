import React from 'react';
import { Moon, Sun, Sparkles, Zap, Star, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DarkModeToggleProps {
  isDark: boolean;
  toggle: () => void;
  variant?: 'default' | 'premium';
  size?: 'sm' | 'md' | 'lg';
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ 
  isDark, 
  toggle, 
  variant = 'premium',
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-14 h-14'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <motion.button
      onClick={toggle}
      className={`relative ${sizeClasses[size]} rounded-2xl transition-all duration-500 overflow-hidden group ${
        isDark 
          ? 'bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 border border-slate-600/50 text-yellow-400 shadow-xl hover:shadow-yellow-400/25' 
          : 'bg-gradient-to-br from-white via-slate-50 to-slate-100 border border-slate-300/50 text-slate-700 shadow-lg hover:shadow-slate-400/25'
      }`}
      whileHover={{ scale: 1.05, rotate: 2 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle dark mode"
    >
      {/* Premium Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className={`absolute inset-0 bg-pattern-grid ${isDark ? 'text-yellow-400' : 'text-slate-600'}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Premium Background Animation */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${
          isDark 
            ? 'from-yellow-400/20 via-orange-400/20 to-yellow-400/20' 
            : 'from-blue-400/20 via-purple-400/20 to-blue-400/20'
        }`}
        animate={{
          x: isDark ? ['-100%', '100%'] : ['100%', '-100%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              isDark ? 'bg-yellow-400' : 'bg-slate-600'
            }`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main Icon Container */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="sun"
              initial={{ rotate: -180, opacity: 0, scale: 0 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 180, opacity: 0, scale: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="relative"
            >
              {/* Sun with Premium Glow */}
              <motion.div
                className="relative"
                animate={{
                  filter: [
                    "drop-shadow(0 0 10px rgba(251, 191, 36, 0.5))",
                    "drop-shadow(0 0 20px rgba(251, 191, 36, 0.8))",
                    "drop-shadow(0 0 10px rgba(251, 191, 36, 0.5))"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <Sun className={iconSizes[size]} />
                </motion.div>
              </motion.div>

              {/* Premium Sun Rays */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-0.5 h-3 bg-current rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                    transformOrigin: '50% 12px',
                    transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
                  }}
                  animate={{
                    scaleY: [0.5, 1, 0.5],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}

              {/* Premium Sparkles around Sun */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${-15 + i * 10}px`,
                    top: `${-10 + (i % 2) * 20}px`,
                  }}
                  animate={{
                    rotate: [0, 360],
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.4,
                  }}
                >
                  <Sparkles className="w-2 h-2 text-yellow-300" />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 180, opacity: 0, scale: 0 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -180, opacity: 0, scale: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="relative"
            >
              {/* Moon with Premium Glow */}
              <motion.div
                className="relative"
                animate={{
                  filter: [
                    "drop-shadow(0 0 10px rgba(100, 116, 139, 0.5))",
                    "drop-shadow(0 0 20px rgba(100, 116, 139, 0.8))",
                    "drop-shadow(0 0 10px rgba(100, 116, 139, 0.5))"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  animate={{ 
                    rotate: [0, -10, 10, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  <Moon className={iconSizes[size]} />
                </motion.div>
              </motion.div>

              {/* Premium Stars around Moon */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-current rounded-full"
                  style={{
                    left: `${-12 + i * 6}px`,
                    top: `${-8 + (i % 2) * 16}px`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}

              {/* Premium Constellation Effect */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-0.5 h-0.5 bg-current rounded-full"
                    style={{
                      left: `${30 + i * 20}%`,
                      top: `${25 + i * 15}%`,
                    }}
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.8,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Premium Border Glow */}
      <motion.div
        className={`absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
          isDark ? 'border-yellow-400/50' : 'border-slate-400/50'
        }`}
        animate={{
          borderColor: isDark 
            ? ['rgba(251, 191, 36, 0.5)', 'rgba(251, 191, 36, 0.8)', 'rgba(251, 191, 36, 0.5)']
            : ['rgba(100, 116, 139, 0.5)', 'rgba(100, 116, 139, 0.8)', 'rgba(100, 116, 139, 0.5)']
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Premium Ripple Effect on Click */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        initial={{ scale: 0, opacity: 0.5 }}
        animate={{ scale: 0, opacity: 0.5 }}
        whileTap={{ scale: 2, opacity: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background: isDark 
            ? 'radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(100, 116, 139, 0.3) 0%, transparent 70%)'
        }}
      />

      {/* Premium Mode Indicator */}
      <motion.div
        className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
        animate={{
          backgroundColor: isDark ? '#fbbf24' : '#64748b',
          scale: [1, 1.2, 1],
        }}
        transition={{
          backgroundColor: { duration: 0.3 },
          scale: { duration: 2, repeat: Infinity }
        }}
      />

      {/* Premium Tooltip */}
      <motion.div
        className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        initial={{ y: 10 }}
        whileHover={{ y: 0 }}
      >
        <div className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap shadow-lg ${
          isDark 
            ? 'bg-slate-800 text-yellow-400 border border-slate-600' 
            : 'bg-white text-slate-700 border border-slate-300'
        }`}>
          {isDark ? '☀️ Modo Claro' : '🌙 Modo Escuro'}
        </div>
      </motion.div>
    </motion.button>
  );
};

export default DarkModeToggle;