import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Star, Heart, Coffee, Bug, Shield, Code, Database, Rocket, Trophy, Target } from 'lucide-react';

const InteractiveElements: React.FC = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; icon: React.ElementType; color: string }>>([]);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [konamiSequence, setKonamiSequence] = useState<string[]>([]);
  const [showSecretMessage, setShowSecretMessage] = useState(false);
  const [bugHuntMode, setBugHuntMode] = useState(false);
  const [foundBugs, setFoundBugs] = useState<number[]>([]);

  // Ícones QA temáticos
  const qaIcons = [Bug, Shield, Code, Database, Rocket, Trophy, Target, Sparkles, Zap, Star, Heart, Coffee];
  const colors = ['text-blue-400', 'text-purple-400', 'text-pink-400', 'text-yellow-400', 'text-green-400', 'text-red-400', 'text-indigo-400', 'text-orange-400'];

  // Sequência Konami para QA: ↑↑↓↓←→←→BA
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

  const createParticle = (e: MouseEvent) => {
    const newParticle = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
      icon: qaIcons[Math.floor(Math.random() * qaIcons.length)],
      color: colors[Math.floor(Math.random() * colors.length)]
    };

    setParticles(prev => [...prev, newParticle]);
    setClickCount(prev => prev + 1);

    // Remove particle after animation
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== newParticle.id));
    }, 2000);

    // Easter egg especial para QA - Bug Hunt Mode
    if (clickCount >= 19) { // 20 cliques
      setBugHuntMode(true);
      setClickCount(0);
      setTimeout(() => setBugHuntMode(false), 10000); // 10 segundos de bug hunt
    }
    // Easter egg normal após 10 cliques
    else if (clickCount >= 9) {
      setShowEasterEgg(true);
      setClickCount(0);
      setTimeout(() => setShowEasterEgg(false), 4000);
    }
  };

  // Konami Code Handler
  const handleKeyDown = (e: KeyboardEvent) => {
    const newSequence = [...konamiSequence, e.code].slice(-10);
    setKonamiSequence(newSequence);

    if (newSequence.join(',') === konamiCode.join(',')) {
      setShowSecretMessage(true);
      setKonamiSequence([]);
      setTimeout(() => setShowSecretMessage(false), 8000);
    }
  };

  // Bug Hunt - esconder bugs invisíveis pela tela
  const createHiddenBugs = () => {
    const bugs = [];
    for (let i = 0; i < 5; i++) {
      bugs.push({
        id: i,
        x: Math.random() * (window.innerWidth - 50),
        y: Math.random() * (window.innerHeight - 50)
      });
    }
    return bugs;
  };

  const [hiddenBugs] = useState(createHiddenBugs);

  const catchBug = (bugId: number) => {
    if (!foundBugs.includes(bugId)) {
      setFoundBugs(prev => [...prev, bugId]);
      
      if (foundBugs.length + 1 === hiddenBugs.length) {
        setTimeout(() => {
          alert('🎉 Parabéns! Você encontrou todos os bugs! Verdadeiro espírito QA! 🐛✨');
          setFoundBugs([]);
        }, 500);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', createParticle);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('click', createParticle);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [clickCount, konamiSequence]);

  // Easter Egg especial para desenvolvedores
  useEffect(() => {
    const checkDevTools = () => {
      if (window.outerHeight - window.innerHeight > 200 || window.outerWidth - window.innerWidth > 200) {
        console.log(`
🎯 Olá, fellow developer! 

Vejo que você está inspecionando meu código! 
Como uma futura QA, eu aprovo totalmente essa atitude investigativa! 🔍

Algumas curiosidades sobre este portfólio:
• Feito com React + TypeScript + Tailwind CSS
• Animações com Framer Motion
• Interface Postman funcional
• Easter eggs escondidos (você já encontrou alguns?)
• Modo escuro/claro
• Totalmente responsivo

Dicas de Easter Eggs:
1. Clique 10 vezes em qualquer lugar 🖱️
2. Clique 20 vezes para o Bug Hunt Mode 🐛
3. Use o código Konami: ↑↑↓↓←→←→BA 🎮
4. Procure por bugs invisíveis no Bug Hunt Mode

Se você é recrutador(a), isso mostra minha atenção aos detalhes! 😉
Se você é dev, espero que goste dos easter eggs! 🚀

- Esther Gabrielle, futura QA extraordinária ✨
        `);
      }
    };

    const interval = setInterval(checkDevTools, 3000);
    return () => clearInterval(interval);
  }, []);

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

      {/* Bug Hunt Mode */}
      <AnimatePresence>
        {bugHuntMode && (
          <>
            {/* Bug Hunt Notification */}
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: -50 }}
              className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-red-500 to-pink-500 text-white p-6 rounded-2xl shadow-2xl max-w-md text-center"
            >
              <div className="flex items-center gap-3 mb-2">
                <Bug className="w-8 h-8 animate-bounce" />
                <h3 className="font-bold text-xl">🐛 BUG HUNT MODE ATIVADO! 🐛</h3>
              </div>
              <p className="text-sm opacity-90 mb-2">
                Encontre os 5 bugs escondidos na tela! Você tem 10 segundos!
              </p>
              <p className="text-xs opacity-75">
                Bugs encontrados: {foundBugs.length}/5
              </p>
            </motion.div>

            {/* Hidden Bugs */}
            {hiddenBugs.map((bug) => (
              <motion.div
                key={bug.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: foundBugs.includes(bug.id) ? 0 : 0.7,
                  scale: foundBugs.includes(bug.id) ? 0 : 1,
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  rotate: { duration: 0.5, repeat: Infinity },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 }
                }}
                className="fixed z-50 cursor-pointer"
                style={{ left: bug.x, top: bug.y }}
                onClick={() => catchBug(bug.id)}
              >
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                  <Bug className="w-5 h-5 text-white" />
                </div>
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Easter Egg Normal */}
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
            <p className="text-sm opacity-90 mb-3">
              Você descobriu uma funcionalidade secreta! Como uma futura QA, eu adoro quando as pessoas exploram cada detalhe! ✨
            </p>
            <p className="text-xs opacity-75">
              💡 Dica: Tente clicar mais 10 vezes para algo especial...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Konami Code Secret Message */}
      <AnimatePresence>
        {showSecretMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0, rotateY: 180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0, rotateY: -180 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div
              className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 rounded-3xl shadow-2xl max-w-2xl text-white text-center relative overflow-hidden"
              animate={{
                boxShadow: [
                  "0 0 40px rgba(99, 102, 241, 0.5)",
                  "0 0 80px rgba(147, 51, 234, 0.8)",
                  "0 0 40px rgba(99, 102, 241, 0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
              
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center"
              >
                <Trophy className="w-12 h-12 text-yellow-300" />
              </motion.div>
              
              <h2 className="text-4xl font-bold mb-4">🎮 KONAMI CODE MASTER! 🎮</h2>
              <p className="text-xl mb-4">
                Você desbloqueou o segredo supremo! 
              </p>
              <p className="text-lg mb-6 opacity-90">
                Como uma verdadeira QA, você testou até os easter eggs mais obscuros! 
                Isso demonstra exatamente o tipo de atenção aos detalhes que eu trago para meus testes! 🔍✨
              </p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-white/10 p-3 rounded-lg">
                  <div className="font-bold">🏆 Achievement Unlocked</div>
                  <div>Konami Code Master</div>
                </div>
                <div className="bg-white/10 p-3 rounded-lg">
                  <div className="font-bold">🎯 QA Level</div>
                  <div>Expert Easter Egg Hunter</div>
                </div>
              </div>
              
              <p className="text-xs mt-4 opacity-75">
                "A true QA never stops testing, even the hidden features!" - Esther Gabrielle
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating QA Wisdom */}
      <motion.div
        className="fixed top-1/2 left-4 transform -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity duration-300 z-40"
        whileHover={{ scale: 1.1 }}
      >
        <div className="bg-slate-800/90 backdrop-blur-sm text-white p-3 rounded-lg shadow-lg max-w-xs">
          <p className="text-xs">
            💡 <strong>QA Tip:</strong> Sempre teste os edge cases! Você nunca sabe que easter eggs pode encontrar! 🐛✨
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default InteractiveElements;