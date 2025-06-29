import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NameAnimation: React.FC = () => {
  const [animationPhase, setAnimationPhase] = useState<'name' | 'initials' | 'egg' | 'cracking' | 'chick'>('name');
  const [showSparkles, setShowSparkles] = useState(false);
  const [eggCracks, setEggCracks] = useState<number[]>([]);

  useEffect(() => {
    const sequence = async () => {
      // Fase 1: Mostrar nome completo (3s)
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Fase 2: Transformar em iniciais (2s)
      setAnimationPhase('initials');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Fase 3: Formar ovo (1.5s)
      setAnimationPhase('egg');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Fase 4: Rachar o ovo (2s)
      setAnimationPhase('cracking');
      setShowSparkles(true);
      
      // Adicionar rachaduras progressivamente
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          setEggCracks(prev => [...prev, i]);
        }, i * 300);
      }
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Fase 5: Pintinho sai (permanente)
      setAnimationPhase('chick');
      setShowSparkles(false);
      
      // Reiniciar após 5 segundos
      setTimeout(() => {
        setAnimationPhase('name');
        setEggCracks([]);
        setShowSparkles(false);
      }, 5000);
    };

    sequence();
    
    // Repetir a animação a cada 15 segundos
    const interval = setInterval(sequence, 15000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex items-center justify-center h-32 mb-8">
      <AnimatePresence mode="wait">
        {/* Fase 1: Nome Completo */}
        {animationPhase === 'name' && (
          <motion.div
            key="name"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1 
              className="font-poppins text-6xl md:text-8xl font-bold text-white leading-tight"
              animate={{
                textShadow: [
                  "0 0 20px rgba(99, 102, 241, 0.5)",
                  "0 0 40px rgba(99, 102, 241, 0.8)",
                  "0 0 20px rgba(99, 102, 241, 0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.span
                className="inline-block"
                animate={{ 
                  color: ["#ffffff", "#6366f1", "#a855f7", "#ec4899", "#ffffff"]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                Esther
              </motion.span>
              <br />
              <motion.span
                className="inline-block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Gabrielle
              </motion.span>
            </motion.h1>
          </motion.div>
        )}

        {/* Fase 2: Iniciais */}
        {animationPhase === 'initials' && (
          <motion.div
            key="initials"
            initial={{ opacity: 0, scale: 2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-8"
          >
            <motion.div
              className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center font-poppins font-bold text-4xl text-white shadow-2xl"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              E
            </motion.div>
            <motion.div
              className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center font-poppins font-bold text-4xl text-white shadow-2xl"
              animate={{
                rotate: [0, -360],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              G
            </motion.div>
          </motion.div>
        )}

        {/* Fase 3: Ovo */}
        {animationPhase === 'egg' && (
          <motion.div
            key="egg"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.div
              className="w-32 h-40 bg-gradient-to-b from-white via-yellow-50 to-yellow-100 rounded-full shadow-2xl border-4 border-yellow-200 relative overflow-hidden"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {/* Padrão do ovo */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-yellow-100/50 to-yellow-200/30 rounded-full" />
              
              {/* Brilho do ovo */}
              <motion.div
                className="absolute top-4 left-6 w-8 h-12 bg-white/60 rounded-full blur-sm"
                animate={{
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Pontos decorativos */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-300/40 rounded-full"
                  style={{
                    left: `${20 + (i % 3) * 25}%`,
                    top: `${25 + Math.floor(i / 3) * 20}%`,
                  }}
                  animate={{
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Fase 4: Ovo Rachando */}
        {animationPhase === 'cracking' && (
          <motion.div
            key="cracking"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="relative"
          >
            <motion.div
              className="w-32 h-40 bg-gradient-to-b from-white via-yellow-50 to-yellow-100 rounded-full shadow-2xl border-4 border-yellow-200 relative overflow-hidden"
              animate={{
                y: [0, -5, 0]
              }}
              transition={{ duration: 0.3, repeat: Infinity }}
            >
              {/* Padrão do ovo */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-yellow-100/50 to-yellow-200/30 rounded-full" />
              
              {/* Rachaduras */}
              <AnimatePresence>
                {eggCracks.map((crack, index) => (
                  <motion.div
                    key={crack}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute bg-gray-600 rounded-full"
                    style={{
                      width: '2px',
                      height: `${15 + index * 8}px`,
                      left: `${45 + index * 8}%`,
                      top: `${30 + index * 10}%`,
                      transform: `rotate(${index * 25 - 30}deg)`,
                      transformOrigin: 'center'
                    }}
                  />
                ))}
              </AnimatePresence>
              
              {/* Efeito de luz saindo das rachaduras */}
              {eggCracks.length > 2 && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-300/30 via-orange-300/30 to-yellow-300/30 rounded-full"
                  animate={{
                    opacity: [0, 0.8, 0]
                  }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              )}
            </motion.div>
          </motion.div>
        )}

        {/* Fase 5: Pintinho */}
        {animationPhase === 'chick' && (
          <motion.div
            key="chick"
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.6 }}
            className="relative"
          >
            {/* Cascas do ovo */}
            <motion.div
              className="absolute -left-8 top-4 w-12 h-16 bg-gradient-to-b from-white to-yellow-100 rounded-full border-2 border-yellow-200"
              initial={{ x: 0, rotate: 0 }}
              animate={{ x: -20, rotate: -45 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <motion.div
              className="absolute -right-8 top-4 w-12 h-16 bg-gradient-to-b from-white to-yellow-100 rounded-full border-2 border-yellow-200"
              initial={{ x: 0, rotate: 0 }}
              animate={{ x: 20, rotate: 45 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            
            {/* Pintinho */}
            <motion.div
              className="relative"
              animate={{
                y: [0, -8, 0],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {/* Corpo do pintinho */}
              <div className="w-24 h-24 bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-full shadow-xl relative">
                {/* Textura fofa */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/50 to-transparent rounded-full" />
                
                {/* Olhinhos */}
                <div className="absolute top-6 left-6 flex gap-2">
                  <motion.div
                    className="w-3 h-3 bg-black rounded-full relative"
                    animate={{
                      scale: [1, 0.8, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full" />
                  </motion.div>
                  <motion.div
                    className="w-3 h-3 bg-black rounded-full relative"
                    animate={{
                      scale: [1, 0.8, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.1 }}
                  >
                    <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full" />
                  </motion.div>
                </div>
                
                {/* Biquinho */}
                <motion.div
                  className="absolute top-10 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-3 border-transparent border-t-orange-400"
                  animate={{
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                
                {/* Bochechas rosadas */}
                <div className="absolute top-8 left-3 w-2 h-2 bg-pink-300/60 rounded-full" />
                <div className="absolute top-8 right-3 w-2 h-2 bg-pink-300/60 rounded-full" />
                
                {/* Topete */}
                <motion.div
                  className="absolute -top-2 left-1/2 transform -translate-x-1/2"
                  animate={{
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-1 h-4 bg-yellow-500 rounded-full transform rotate-12" />
                  <div className="w-1 h-3 bg-yellow-500 rounded-full transform -rotate-12 absolute -right-1 top-0" />
                  <div className="w-1 h-3 bg-yellow-500 rounded-full absolute -left-1 top-1" />
                </motion.div>
              </div>
              
              {/* Asinhas */}
              <motion.div
                className="absolute top-8 -left-2 w-4 h-6 bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-full transform -rotate-12"
                animate={{
                  rotate: [-12, -25, -12]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.div
                className="absolute top-8 -right-2 w-4 h-6 bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-full transform rotate-12"
                animate={{
                  rotate: [12, 25, 12]
                }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              />
              
              {/* Patinhas */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                <div className="w-2 h-3 bg-orange-400 rounded-full" />
                <div className="w-2 h-3 bg-orange-400 rounded-full" />
              </div>
            </motion.div>
            
            {/* Efeito de nascimento - corações */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-pink-400 text-lg"
                  style={{
                    left: `${30 + i * 15}%`,
                    top: `${20 + (i % 2) * 40}%`,
                  }}
                  animate={{
                    y: [0, -30, -60],
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5],
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeOut"
                  }}
                >
                  💕
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sparkles durante a quebra do ovo */}
      <AnimatePresence>
        {showSparkles && (
          <>
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-yellow-300 text-xl pointer-events-none"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [1, 1, 0],
                  x: [0, (Math.cos(i * 30 * Math.PI / 180) * 60)],
                  y: [0, (Math.sin(i * 30 * Math.PI / 180) * 60)],
                  rotate: [0, 360]
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.5,
                  ease: "easeOut",
                  delay: i * 0.1
                }}
              >
                ✨
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NameAnimation;