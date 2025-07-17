import React from 'react';
import { motion } from 'framer-motion';

interface EggChickLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const EggChickLogo: React.FC<EggChickLogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16', 
    lg: 'w-20 h-20'
  };

  const chickSize = {
    sm: 'w-8 h-8',
    md: 'w-14 h-14',
    lg: 'w-16 h-16'
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className} relative flex items-center justify-center cursor-pointer`}
      whileHover={{ scale: 1.08, rotate: 3 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Container Premium com Gradiente Profissional */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 rounded-3xl shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/50 to-cyan-500/50 rounded-3xl blur opacity-60 -z-10" />
        {/* Borda interna premium */}
        <div className="absolute inset-1 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
      </div>

      {/* Pintinho Junior Profissional */}
      <motion.div
        className={`${chickSize[size]} relative z-10`}
        animate={{
          y: [0, -2, 0],
          rotate: [0, 1, -1, 0]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Corpo do pintinho com gradiente premium e textura */}
        <div className={`${chickSize[size]} bg-gradient-to-b from-yellow-200 via-yellow-300 to-yellow-400 rounded-full shadow-xl relative overflow-hidden border-2 border-yellow-100`}>
          {/* Textura premium com múltiplas camadas */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/80 via-transparent to-yellow-500/30 rounded-full" />
          <div className="absolute top-1 left-2 w-4 h-5 bg-gradient-to-br from-white/90 to-white/50 rounded-full blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/20 to-transparent rounded-full" />
          
          {/* Olhinhos grandes e expressivos (Junior) */}
          <div className={`absolute flex gap-1 ${
            size === 'sm' ? 'top-2 left-2' : 
            size === 'md' ? 'top-3 left-3' : 
            'top-4 left-4'
          }`}>
            <motion.div
              className={`bg-black rounded-full relative shadow-lg ${
                size === 'sm' ? 'w-2 h-2' : 
                size === 'md' ? 'w-2.5 h-2.5' : 
                'w-3 h-3'
              }`}
              animate={{ 
                scale: [1, 0.7, 1],
                y: [0, 1, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              {/* Brilho nos olhos */}
              <div className={`absolute bg-white rounded-full ${
                size === 'sm' ? 'w-0.5 h-0.5 top-0 left-0.5' : 
                size === 'md' ? 'w-1 h-1 top-0.5 left-0.5' : 
                'w-1 h-1 top-0.5 left-1'
              }`} />
              <div className={`absolute bg-white/60 rounded-full ${
                size === 'sm' ? 'w-0.5 h-0.5 bottom-0 right-0' : 
                size === 'md' ? 'w-0.5 h-0.5 bottom-0 right-0' : 
                'w-0.5 h-0.5 bottom-0 right-0'
              }`} />
            </motion.div>
            <motion.div
              className={`bg-black rounded-full relative shadow-lg ${
                size === 'sm' ? 'w-2 h-2' : 
                size === 'md' ? 'w-2.5 h-2.5' : 
                'w-3 h-3'
              }`}
              animate={{ 
                scale: [1, 0.7, 1],
                y: [0, 1, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.1 }}
            >
              {/* Brilho nos olhos */}
              <div className={`absolute bg-white rounded-full ${
                size === 'sm' ? 'w-0.5 h-0.5 top-0 left-0.5' : 
                size === 'md' ? 'w-1 h-1 top-0.5 left-0.5' : 
                'w-1 h-1 top-0.5 left-1'
              }`} />
              <div className={`absolute bg-white/60 rounded-full ${
                size === 'sm' ? 'w-0.5 h-0.5 bottom-0 right-0' : 
                size === 'md' ? 'w-0.5 h-0.5 bottom-0 right-0' : 
                'w-0.5 h-0.5 bottom-0 right-0'
              }`} />
            </motion.div>
          </div>
          
          {/* Biquinho premium com sombra */}
          <motion.div
            className={`absolute left-1/2 transform -translate-x-1/2 ${
              size === 'sm' ? 'top-3.5' : 
              size === 'md' ? 'top-5' : 
              'top-6'
            }`}
            animate={{ 
              scale: [1, 1.15, 1],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <div className={`w-0 h-0 border-l border-r border-t-3 border-transparent border-t-orange-500 shadow-lg filter drop-shadow-sm ${
              size === 'sm' ? 'border-l-1 border-r-1 border-t-2' : 
              size === 'md' ? 'border-l-2 border-r-2 border-t-3' : 
              'border-l-2 border-r-2 border-t-4'
            }`} />
          </motion.div>
          
          {/* Bochechas rosadas premium com gradiente */}
          <div className={`absolute bg-gradient-to-br from-pink-300/80 to-pink-400/60 rounded-full shadow-sm ${
            size === 'sm' ? 'w-1.5 h-1.5 top-2.5 left-1' : 
            size === 'md' ? 'w-2 h-2 top-4 left-2' : 
            'w-2.5 h-2.5 top-5 left-2.5'
          }`} />
          <div className={`absolute bg-gradient-to-br from-pink-300/80 to-pink-400/60 rounded-full shadow-sm ${
            size === 'sm' ? 'w-1.5 h-1.5 top-2.5 right-1' : 
            size === 'md' ? 'w-2 h-2 top-4 right-2' : 
            'w-2.5 h-2.5 top-5 right-2.5'
          }`} />
          
          {/* Topete Junior (mais fofo e pequeno) */}
          <motion.div
            className={`absolute left-1/2 transform -translate-x-1/2 ${
              size === 'sm' ? '-top-1' : 
              size === 'md' ? '-top-1.5' : 
              '-top-2'
            }`}
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 3.5, repeat: Infinity }}
          >
            <div className={`bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-full transform rotate-12 shadow-sm ${
              size === 'sm' ? 'w-0.5 h-2' : 
              size === 'md' ? 'w-1 h-2.5' : 
              'w-1.5 h-3'
            }`} />
            <div className={`bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-full transform -rotate-12 absolute -right-0.5 top-0 shadow-sm ${
              size === 'sm' ? 'w-0.5 h-1.5' : 
              size === 'md' ? 'w-1 h-2' : 
              'w-1.5 h-2.5'
            }`} />
            <div className={`bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-full absolute -left-0.5 shadow-sm ${
              size === 'sm' ? 'w-0.5 h-1.5 top-0.5' : 
              size === 'md' ? 'w-1 h-2 top-0.5' : 
              'w-1.5 h-2.5 top-1'
            }`} />
          </motion.div>
        </div>
        
        {/* Asinhas pequenas e fofas (Junior) */}
        <motion.div
          className={`absolute bg-gradient-to-b from-yellow-200 to-yellow-400 rounded-full transform -rotate-15 shadow-lg ${
            size === 'sm' ? 'w-2 h-2.5 top-2.5 -left-1' : 
            size === 'md' ? 'w-2.5 h-3 top-3.5 -left-1.5' : 
            'w-3 h-4 top-4.5 -left-2'
          }`}
          animate={{ 
            rotate: [-15, -30, -15],
            scale: [1, 0.9, 1]
          }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
        <motion.div
          className={`absolute bg-gradient-to-b from-yellow-200 to-yellow-400 rounded-full transform rotate-15 shadow-lg ${
            size === 'sm' ? 'w-2 h-2.5 top-2.5 -right-1' : 
            size === 'md' ? 'w-2.5 h-3 top-3.5 -right-1.5' : 
            'w-3 h-4 top-4.5 -right-2'
          }`}
          animate={{ 
            rotate: [15, 30, 15],
            scale: [1, 0.9, 1]
          }}
          transition={{ duration: 1.8, repeat: Infinity, delay: 0.3 }}
        />
        
        {/* Patinhas pequenas e fofas */}
        <div className={`absolute left-1/2 transform -translate-x-1/2 flex gap-1 ${
          size === 'sm' ? '-bottom-0.5' : 
          size === 'md' ? '-bottom-1' : 
          '-bottom-1.5'
        }`}>
          <div className={`bg-gradient-to-b from-orange-400 to-orange-500 rounded-full shadow-sm ${
            size === 'sm' ? 'w-1 h-1.5' : 
            size === 'md' ? 'w-1.5 h-2' : 
            'w-2 h-2.5'
          }`} />
          <div className={`bg-gradient-to-b from-orange-400 to-orange-500 rounded-full shadow-sm ${
            size === 'sm' ? 'w-1 h-1.5' : 
            size === 'md' ? 'w-1.5 h-2' : 
            'w-2 h-2.5'
          }`} />
        </div>
      </motion.div>

      {/* Badge "Junior" discreto */}
      <motion.div
        className={`absolute -bottom-1 -right-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-lg ${
          size === 'sm' ? 'text-xs px-1 py-0.5' : 
          size === 'md' ? 'text-xs px-2 py-0.5' : 
          'text-sm px-2 py-1'
        }`}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      >
        Jr
      </motion.div>

      {/* Partículas de aprendizado flutuando */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute ${
              size === 'sm' ? 'text-xs' : 
              size === 'md' ? 'text-sm' : 
              'text-base'
            }`}
            style={{
              left: `${25 + i * 15}%`,
              top: `${15 + i * 20}%`,
              color: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b'][i]
            }}
            animate={{
              y: [0, -20, -40],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
              rotate: [0, 360]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: i * 1.2,
              ease: "easeOut"
            }}
          >
            {['📚', '🎯', '💡', '⭐'][i]}
          </motion.div>
        ))}
      </motion.div>

      {/* Efeito de brilho premium no hover */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.3), rgba(255,255,255,0.1))',
          backgroundSize: '200% 200%'
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Pulso de energia Junior */}
      <motion.div
        className="absolute inset-0 rounded-3xl border-2 border-emerald-400/30"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

export default EggChickLogo;