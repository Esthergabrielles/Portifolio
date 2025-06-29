import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Star, Heart, Coffee } from 'lucide-react';

const InteractiveElements: React.FC = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; icon: React.ElementType; color: string }>>([]);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const icons = [Sparkles, Zap, Star, Heart, Coffee];
  const colors = ['text-blue-400', 'text-purple-400', 'text-pink-400', 'text-yellow-400', 'text-green-400', 'text-red-400'];

  const createParticle = (e: MouseEvent) => {
    const newParticle = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
      icon: icons[Math.floor(Math.random() * icons.length)],
      color: colors[Math.floor(Math.random() * colors.length)]
    };

    setParticles(prev => [...prev, newParticle]);
    setClickCount(prev => prev + 1);

    // Remove particle after animation
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== newParticle.id));
    }, 2000);

    // Easter egg after 10 clicks
    if (clickCount >= 9) {
      setShowEasterEgg(true);
      setClickCount(0);
      setTimeout(() => setShowEasterEgg(false), 3000);
    }
  };

  useEffect(() => {
    document.addEventListener('click', createParticle);
    return () => document.removeEventListener('click', createParticle);
  }, [clickCount]);

  return (
    <>
      {/* Click Particles */}
      <AnimatePresence>
        {particles.map((particle) => {
          const Icon = particle.icon;
          return (
            <motion.div
              key={particle.id}
              initial={{ 
                x: particle.x - 12, 
                y: particle.y - 12, 
                scale: 0, 
                opacity: 1 
              }}
              animate={{ 
                x: particle.x - 12 + (Math.random() - 0.5) * 100,
                y: particle.y - 12 - Math.random() * 100,
                scale: [0, 1.5, 0],
                opacity: [1, 1, 0],
                rotate: Math.random() * 360
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className={`fixed pointer-events-none z-50 ${particle.color}`}
              style={{ left: 0, top: 0 }}
            >
              <Icon className="w-6 h-6" />
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Easter Egg */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: -50 }}
            className="fixed bottom-8 left-8 z-50 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-2xl shadow-2xl max-w-sm"
          >
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-6 h-6" />
              <h3 className="font-bold">Easter Egg Encontrado! 🎉</h3>
            </div>
            <p className="text-sm opacity-90">
              Você descobriu uma funcionalidade secreta! Obrigada por explorar meu portfólio com tanto carinho! ✨
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default InteractiveElements;