import React from 'react';
import { motion } from 'framer-motion';

interface EggChickLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const EggChickLogo: React.FC<EggChickLogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14', 
    lg: 'w-20 h-20'
  };

  const chickSize = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const eggSize = {
    sm: 'w-6 h-8',
    md: 'w-8 h-10',
    lg: 'w-12 h-14'
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className} relative flex items-center justify-center cursor-pointer`}
      whileHover={{ scale: 1.05, rotate: 2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {/* Container com gradiente de fundo */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl blur opacity-30 -z-10" />
      </div>

      {/* Pintinho fofo */}
      <motion.div
        className={`${chickSize[size]} relative z-10`}
        animate={{
          y: [0, -2, 0],
          rotate: [0, 1, -1, 0]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Corpo do pintinho */}
        <div className={`${chickSize[size]} bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-full shadow-lg relative overflow-hidden`}>
          {/* Textura fofa */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/50 to-transparent rounded-full" />
          
          {/* Olhinhos */}
          <div className={`absolute flex gap-1 ${
            size === 'sm' ? 'top-1.5 left-1.5' : 
            size === 'md' ? 'top-2.5 left-2.5' : 
            'top-3 left-3'
          }`}>
            <motion.div
              className={`bg-black rounded-full relative ${
                size === 'sm' ? 'w-1 h-1' : 
                size === 'md' ? 'w-1.5 h-1.5' : 
                'w-2 h-2'
              }`}
              animate={{ scale: [1, 0.8, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className={`absolute bg-white rounded-full ${
                size === 'sm' ? 'w-0.5 h-0.5 top-0 left-0' : 
                size === 'md' ? 'w-0.5 h-0.5 top-0.5 left-0.5' : 
                'w-1 h-1 top-0.5 left-0.5'
              }`} />
            </motion.div>
            <motion.div
              className={`bg-black rounded-full relative ${
                size === 'sm' ? 'w-1 h-1' : 
                size === 'md' ? 'w-1.5 h-1.5' : 
                'w-2 h-2'
              }`}
              animate={{ scale: [1, 0.8, 1] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.1 }}
            >
              <div className={`absolute bg-white rounded-full ${
                size === 'sm' ? 'w-0.5 h-0.5 top-0 left-0' : 
                size === 'md' ? 'w-0.5 h-0.5 top-0.5 left-0.5' : 
                'w-1 h-1 top-0.5 left-0.5'
              }`} />
            </motion.div>
          </div>
          
          {/* Biquinho */}
          <motion.div
            className={`absolute left-1/2 transform -translate-x-1/2 w-0 h-0 border-l border-r border-t-2 border-transparent border-t-orange-400 ${
              size === 'sm' ? 'top-2.5 border-l-1 border-r-1' : 
              size === 'md' ? 'top-4 border-l-1 border-r-1' : 
              'top-5 border-l-2 border-r-2'
            }`}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Bochechas rosadas */}
          <div className={`absolute bg-pink-300/60 rounded-full ${
            size === 'sm' ? 'w-1 h-1 top-2 left-1' : 
            size === 'md' ? 'w-1.5 h-1.5 top-3 left-1.5' : 
            'w-2 h-2 top-4 left-2'
          }`} />
          <div className={`absolute bg-pink-300/60 rounded-full ${
            size === 'sm' ? 'w-1 h-1 top-2 right-1' : 
            size === 'md' ? 'w-1.5 h-1.5 top-3 right-1.5' : 
            'w-2 h-2 top-4 right-2'
          }`} />
          
          {/* Topete fofo */}
          <motion.div
            className={`absolute left-1/2 transform -translate-x-1/2 ${
              size === 'sm' ? '-top-0.5' : 
              size === 'md' ? '-top-1' : 
              '-top-1.5'
            }`}
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <div className={`bg-yellow-500 rounded-full transform rotate-12 ${
              size === 'sm' ? 'w-0.5 h-2' : 
              size === 'md' ? 'w-0.5 h-3' : 
              'w-1 h-4'
            }`} />
            <div className={`bg-yellow-500 rounded-full transform -rotate-12 absolute -right-0.5 top-0 ${
              size === 'sm' ? 'w-0.5 h-1.5' : 
              size === 'md' ? 'w-0.5 h-2' : 
              'w-1 h-3'
            }`} />
            <div className={`bg-yellow-500 rounded-full absolute -left-0.5 ${
              size === 'sm' ? 'w-0.5 h-1.5 top-0.5' : 
              size === 'md' ? 'w-0.5 h-2 top-0.5' : 
              'w-1 h-3 top-1'
            }`} />
          </motion.div>
        </div>
        
        {/* Asinhas batendo */}
        <motion.div
          className={`absolute bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-full transform -rotate-12 ${
            size === 'sm' ? 'w-2 h-3 top-2 -left-1' : 
            size === 'md' ? 'w-3 h-4 top-3 -left-1' : 
            'w-4 h-5 top-4 -left-2'
          }`}
          animate={{ rotate: [-12, -25, -12] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.div
          className={`absolute bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-full transform rotate-12 ${
            size === 'sm' ? 'w-2 h-3 top-2 -right-1' : 
            size === 'md' ? 'w-3 h-4 top-3 -right-1' : 
            'w-4 h-5 top-4 -right-2'
          }`}
          animate={{ rotate: [12, 25, 12] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
        />
        
        {/* Patinhas */}
        <div className={`absolute left-1/2 transform -translate-x-1/2 flex gap-1 ${
          size === 'sm' ? '-bottom-0.5' : 
          size === 'md' ? '-bottom-1' : 
          '-bottom-1.5'
        }`}>
          <div className={`bg-orange-400 rounded-full ${
            size === 'sm' ? 'w-1 h-1.5' : 
            size === 'md' ? 'w-1 h-2' : 
            'w-1.5 h-2.5'
          }`} />
          <div className={`bg-orange-400 rounded-full ${
            size === 'sm' ? 'w-1 h-1.5' : 
            size === 'md' ? 'w-1 h-2' : 
            'w-1.5 h-2.5'
          }`} />
        </div>
      </motion.div>

      {/* Casca do ovo decorativa (opcional) */}
      <motion.div
        className={`absolute bg-gradient-to-b from-white to-yellow-100 border border-yellow-200 rounded-full transform -rotate-45 opacity-20 ${
          size === 'sm' ? 'w-3 h-4 -bottom-1 -left-2' : 
          size === 'md' ? 'w-4 h-5 -bottom-1 -left-3' : 
          'w-6 h-7 -bottom-2 -left-4'
        }`}
        animate={{
          rotate: [-45, -50, -45],
          opacity: [0.2, 0.1, 0.2]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className={`absolute bg-gradient-to-b from-white to-yellow-100 border border-yellow-200 rounded-full transform rotate-45 opacity-20 ${
          size === 'sm' ? 'w-3 h-4 -bottom-1 -right-2' : 
          size === 'md' ? 'w-4 h-5 -bottom-1 -right-3' : 
          'w-6 h-7 -bottom-2 -right-4'
        }`}
        animate={{
          rotate: [45, 50, 45],
          opacity: [0.2, 0.1, 0.2]
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
      />

      {/* Partículas de amor flutuando */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute text-pink-400 ${
              size === 'sm' ? 'text-xs' : 
              size === 'md' ? 'text-sm' : 
              'text-base'
            }`}
            style={{
              left: `${30 + i * 20}%`,
              top: `${20 + i * 15}%`,
            }}
            animate={{
              y: [0, -15, -30],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
              rotate: [0, 180]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeOut"
            }}
          >
            💕
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default EggChickLogo;