import React from 'react';
import { Moon, Sun, Sparkles, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DarkModeToggleProps {
  isDark: boolean;
  toggle: () => void;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ isDark, toggle }) => {
  return (
    <motion.button
      onClick={toggle}
      className="relative p-4 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 border border-slate-300 dark:border-slate-600 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden group"
      whileHover={{ scale: 1.05, rotate: 2 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle dark mode"
    >
      {/* Background Gradient Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-yellow-400/20 dark:from-blue-400/20 dark:via-purple-400/20 dark:to-blue-400/20"
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
              isDark ? 'bg-blue-400' : 'bg-yellow-400'
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
      <div className="relative z-10 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ opacity: 0, rotate: -180, scale: 0 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 180, scale: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="relative"
            >
              {/* Moon with Glow */}
              <motion.div
                className="relative"
                animate={{
                  filter: [
                    "drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))",
                    "drop-shadow(0 0 20px rgba(59, 130, 246, 0.8))",
                    "drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Moon className="w-6 h-6 text-blue-400" />
              </motion.div>

              {/* Stars around Moon */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-300 rounded-full"
                  style={{
                    left: `${-10 + i * 8}px`,
                    top: `${-8 + (i % 2) * 16}px`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}

              {/* Crescent Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent rounded-full"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ opacity: 0, rotate: 180, scale: 0 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -180, scale: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="relative"
            >
              {/* Sun with Glow */}
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
                <Sun className="w-6 h-6 text-yellow-500" />
              </motion.div>

              {/* Sun Rays */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-0.5 h-3 bg-yellow-400 rounded-full"
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

              {/* Sparkles around Sun */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${-15 + i * 15}px`,
                    top: `${-10 + (i % 2) * 20}px`,
                  }}
                  animate={{
                    rotate: [0, 360],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.4,
                  }}
                >
                  <Sparkles className="w-2 h-2 text-yellow-400" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Ripple Effect on Click */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        initial={{ scale: 0, opacity: 0.5 }}
        animate={{ scale: 0, opacity: 0.5 }}
        whileTap={{ scale: 2, opacity: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background: isDark 
            ? 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, transparent 70%)'
        }}
      />

      {/* Hover Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: isDark
            ? 'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))'
            : 'linear-gradient(45deg, rgba(251, 191, 36, 0.1), rgba(249, 115, 22, 0.1))'
        }}
      />

      {/* Lightning Effect for Mode Switch */}
      <AnimatePresence>
        {isDark && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute top-1 right-1"
          >
            <motion.div
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: 1,
              }}
            >
              <Zap className="w-3 h-3 text-purple-400" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mode Label */}
      <motion.div
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ y: 10 }}
        whileHover={{ y: 0 }}
      >
        <span className="text-xs font-medium text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800 px-2 py-1 rounded-lg shadow-lg whitespace-nowrap">
          {isDark ? 'Modo Claro' : 'Modo Escuro'}
        </span>
      </motion.div>
    </motion.button>
  );
};

export default DarkModeToggle;