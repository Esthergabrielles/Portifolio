import React from 'react';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { motion } from 'framer-motion';

const BackToTop: React.FC = () => {
  const scrollY = useScrollPosition();
  const isVisible = scrollY > 400;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-40 transition-all duration-300 ${
        isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      animate={{ 
        boxShadow: [
          "0 0 20px rgba(99, 102, 241, 0.3)",
          "0 0 40px rgba(99, 102, 241, 0.6)",
          "0 0 20px rgba(99, 102, 241, 0.3)"
        ]
      }}
      transition={{ 
        boxShadow: { duration: 2, repeat: Infinity },
        scale: { duration: 0.2 },
        rotate: { duration: 0.3 }
      }}
      aria-label="Voltar ao topo"
      title="Voltar ao topo com estilo!"
    >
      <div className="relative w-14 h-14 rounded-full shadow-2xl flex items-center justify-center overflow-hidden">
        {/* Foguete com fundo transparente */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full" />
        
        {/* Foguete SVG customizado */}
        <motion.svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="relative z-10"
          animate={{ y: [-1, 1, -1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
            fill="white"
            stroke="white"
            strokeWidth="0.5"
          />
          <motion.path
            d="M8 12L10 14L8 16"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <motion.path
            d="M16 12L14 14L16 16"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
          />
        </motion.svg>
        
        {/* Efeito de propulsão */}
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-6 bg-gradient-to-t from-orange-400 via-yellow-400 to-transparent rounded-full opacity-70"
          animate={{ 
            scaleY: [0.8, 1.2, 0.8],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
        
        {/* Efeito de brilho */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"
          animate={{
            x: [-100, 100],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    </motion.button>
  );
};

export default BackToTop;