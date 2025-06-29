import React from 'react';
import { Rocket } from 'lucide-react';
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
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center">
        <Rocket className="w-6 h-6" />
      </div>
    </motion.button>
  );
};

export default BackToTop;