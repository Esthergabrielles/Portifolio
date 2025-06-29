import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NameAnimation from './NameAnimation';

const LoadingScreen: React.FC = () => {
  const [currentWord, setCurrentWord] = useState('Carregando');
  const [showError, setShowError] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  // Simulação de erro sendo detectado e corrigido (como um QA faria)
  useEffect(() => {
    const sequence = [
      { word: 'Carregando', delay: 1000 },
      { word: 'Carregand0', delay: 500, isError: true }, // Erro detectado!
      { word: 'Carregando', delay: 800, isFixed: true }, // Erro corrigido!
    ];

    let timeoutId: NodeJS.Timeout;
    let currentIndex = 0;

    const runSequence = () => {
      if (currentIndex < sequence.length) {
        const step = sequence[currentIndex];
        
        timeoutId = setTimeout(() => {
          setCurrentWord(step.word);
          
          if (step.isError) {
            setShowError(true);
          } else if (step.isFixed) {
            setShowError(false);
            setIsFixed(true);
          }
          
          currentIndex++;
          runSequence();
        }, step.delay);
      }
    };

    runSequence();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(99,102,241,0.05)_49%,rgba(99,102,241,0.05)_51%,transparent_52%)] bg-[length:20px_20px]" />
      </div>

      {/* Floating QA Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-indigo-400/20 text-2xl"
            style={{
              left: `${10 + i * 8}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          >
            {['🐛', '✅', '🔍', '⚡', '🎯', '🛡️'][i % 6]}
          </motion.div>
        ))}
      </div>

      <div className="text-center relative z-10">
        {/* Animação do Nome com Ovo e Pintinho */}
        <div className="mb-12">
          <NameAnimation />
        </div>
        
        {/* Loading Text com Animação QA */}
        <div className="mb-8">
          <motion.div
            className="text-2xl md:text-3xl font-poppins font-bold text-white mb-4 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={currentWord}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  color: showError ? '#ef4444' : isFixed ? '#10b981' : '#ffffff'
                }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="inline-block"
              >
                {currentWord}
              </motion.span>
            </AnimatePresence>
            
            {/* Cursor piscando */}
            <motion.span
              className="inline-block w-1 h-8 bg-indigo-400 ml-2"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>

          {/* Indicador de Status QA */}
          <AnimatePresence>
            {showError && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center justify-center gap-2 text-red-400 mb-4"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  🐛
                </motion.div>
                <span className="font-inter text-lg">Bug detectado! Corrigindo...</span>
              </motion.div>
            )}
            
            {isFixed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-2 text-green-400 mb-4"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, repeat: 2 }}
                >
                  ✅
                </motion.div>
                <span className="font-inter text-lg">Bug corrigido! Qualidade garantida.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Progress Bar QA Style */}
        <div className="w-80 mx-auto mb-8">
          <div className="bg-slate-700 rounded-full h-3 overflow-hidden shadow-inner">
            <motion.div 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full shadow-sm relative overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 3, ease: "easeInOut" }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: [-100, 300] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </div>
          
          {/* Progress Steps */}
          <div className="flex justify-between mt-3 text-xs text-slate-400 font-inter">
            <span>Iniciando testes...</span>
            <span>Verificando qualidade...</span>
            <span>Pronto!</span>
          </div>
        </div>
        
        {/* QA Loading Messages */}
        <motion.div
          className="text-slate-300 font-inter text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Executando testes de qualidade...
          </motion.p>
        </motion.div>

        {/* QA Metrics */}
        <motion.div
          className="grid grid-cols-3 gap-6 mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          {[
            { label: 'Testes', value: '100%', icon: '🎯' },
            { label: 'Qualidade', value: '✓', icon: '🛡️' },
            { label: 'Performance', value: 'A+', icon: '⚡' }
          ].map((metric, index) => (
            <motion.div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4"
              animate={{ 
                scale: [1, 1.05, 1],
                borderColor: ['rgba(71, 85, 105, 1)', 'rgba(99, 102, 241, 0.5)', 'rgba(71, 85, 105, 1)']
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: index * 0.3 
              }}
            >
              <div className="text-2xl mb-1">{metric.icon}</div>
              <div className="text-indigo-400 font-bold text-lg">{metric.value}</div>
              <div className="text-slate-400 text-sm">{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Particles QA */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-indigo-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;