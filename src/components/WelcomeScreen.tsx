import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Bug, Search, AlertTriangle, CheckCircle, Shield, Zap } from "lucide-react";

interface WelcomeScreenProps {
  onComplete: () => void;
}

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [progress, setProgress] = useState(0);

  // Ciclo de vida do bug de forma profissional e criativa
  const bugLifecyclePhases = [
    {
      id: 'discovery',
      icon: Search,
      title: 'Descoberta',
      description: 'Identificando potenciais problemas',
      color: 'from-blue-500 to-blue-600',
      bgGlow: 'rgba(59, 130, 246, 0.3)',
      emoji: '🔍'
    },
    {
      id: 'analysis',
      icon: Bug,
      title: 'Análise',
      description: 'Investigando a natureza do defeito',
      color: 'from-orange-500 to-orange-600',
      bgGlow: 'rgba(249, 115, 22, 0.3)',
      emoji: '🐛'
    },
    {
      id: 'classification',
      icon: AlertTriangle,
      title: 'Classificação',
      description: 'Determinando severidade e prioridade',
      color: 'from-yellow-500 to-yellow-600',
      bgGlow: 'rgba(234, 179, 8, 0.3)',
      emoji: '⚠️'
    },
    {
      id: 'resolution',
      icon: Zap,
      title: 'Resolução',
      description: 'Aplicando correções eficazes',
      color: 'from-purple-500 to-purple-600',
      bgGlow: 'rgba(147, 51, 234, 0.3)',
      emoji: '⚡'
    },
    {
      id: 'verification',
      icon: CheckCircle,
      title: 'Verificação',
      description: 'Validando a solução implementada',
      color: 'from-green-500 to-green-600',
      bgGlow: 'rgba(34, 197, 94, 0.3)',
      emoji: '✅'
    },
    {
      id: 'protection',
      icon: Shield,
      title: 'Proteção',
      description: 'Sistema protegido e otimizado',
      color: 'from-emerald-500 to-emerald-600',
      bgGlow: 'rgba(16, 185, 129, 0.3)',
      emoji: '🛡️'
    }
  ];

  useEffect(() => {
    const phaseInterval = setInterval(() => {
      setCurrentPhase(prev => {
        if (prev < bugLifecyclePhases.length - 1) {
          return prev + 1;
        } else {
          clearInterval(phaseInterval);
          setTimeout(() => {
            setShowWelcome(false);
            setTimeout(onComplete, 800);
          }, 1500);
          return prev;
        }
      });
    }, 1200);

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const targetProgress = ((currentPhase + 1) / bugLifecyclePhases.length) * 100;
        if (prev < targetProgress) {
          return Math.min(prev + 2, targetProgress);
        }
        return prev;
      });
    }, 50);

    return () => {
      clearInterval(phaseInterval);
      clearInterval(progressInterval);
    };
  }, [currentPhase, onComplete]);

  const currentPhaseData = bugLifecyclePhases[currentPhase];

  return (
    <AnimatePresence>
      {showWelcome && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 h-screen w-full overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-black"
        >
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.15),transparent_50%)]" />
            <motion.div 
              className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(99,102,241,0.05)_49%,rgba(99,102,241,0.05)_51%,transparent_52%)] bg-[length:60px_60px]"
              animate={{ 
                backgroundPosition: ['0px 0px', '60px 60px'],
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />
          </div>

          {/* Floating Bug Icons */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-indigo-400/10 text-4xl"
                style={{
                  left: `${10 + i * 8}%`,
                  top: `${15 + (i % 3) * 30}%`,
                }}
                animate={{
                  y: [-30, 30, -30],
                  opacity: [0.1, 0.3, 0.1],
                  rotate: [0, 360],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 8 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
              >
                {['🐛', '🔍', '⚡', '🛡️', '✅', '🎯'][i % 6]}
              </motion.div>
            ))}
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex h-full items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center max-w-4xl mx-auto px-8"
            >
              {/* Professional Logo */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-16"
              >
                <div className="relative mx-auto w-40 h-40">
                  {/* Main Logo Container */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl shadow-2xl"
                    animate={{
                      boxShadow: [
                        "0 0 40px rgba(99, 102, 241, 0.4)",
                        "0 0 80px rgba(147, 51, 234, 0.6)",
                        "0 0 40px rgba(99, 102, 241, 0.4)"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <div className="absolute inset-3 bg-slate-900 rounded-2xl flex items-center justify-center overflow-hidden">
                      {/* Animated QA Symbol */}
                      <motion.div
                        className="text-6xl font-bold text-white"
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        QA
                      </motion.div>
                      
                      {/* Scanning Line Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity, 
                          ease: "linear",
                          repeatDelay: 1
                        }}
                      />
                    </div>
                  </motion.div>
                  
                  {/* Orbital Bug Lifecycle Icons */}
                  {bugLifecyclePhases.map((phase, index) => {
                    const angle = (index * 60) - 90; // Start from top
                    const radius = 80;
                    const x = Math.cos(angle * Math.PI / 180) * radius;
                    const y = Math.sin(angle * Math.PI / 180) * radius;
                    const isActive = index <= currentPhase;
                    
                    return (
                      <motion.div
                        key={phase.id}
                        className="absolute"
                        style={{
                          left: '50%',
                          top: '50%',
                          transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`
                        }}
                        animate={{
                          scale: isActive ? [1, 1.3, 1] : [0.8, 0.9, 0.8],
                          opacity: isActive ? 1 : 0.3,
                        }}
                        transition={{ 
                          duration: 1, 
                          repeat: Infinity,
                          delay: index * 0.2
                        }}
                      >
                        <div 
                          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                            isActive 
                              ? `bg-gradient-to-r ${phase.color}` 
                              : 'bg-slate-700'
                          }`}
                          style={{
                            boxShadow: isActive ? `0 0 20px ${phase.bgGlow}` : 'none'
                          }}
                        >
                          <phase.icon className="w-6 h-6 text-white" />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Title and Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mb-12"
              >
                <h1 className="text-6xl md:text-7xl font-poppins font-bold text-white mb-6">
                  Quality
                  <motion.span
                    className="ml-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      backgroundSize: "200% 200%"
                    }}
                  >
                    Assurance
                  </motion.span>
                </h1>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="text-2xl text-slate-300 font-inter font-light"
                >
                  Ciclo de Vida Profissional • Excelência em Testes • Inovação Contínua
                </motion.p>
              </motion.div>

              {/* Current Phase Display */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="mb-12"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPhase}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.1, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-8 max-w-2xl mx-auto"
                  >
                    <div className="flex items-center justify-center gap-6 mb-6">
                      <motion.div
                        className={`w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-r ${currentPhaseData.color} shadow-lg`}
                        animate={{
                          scale: [1, 1.1, 1],
                          boxShadow: [
                            `0 0 20px ${currentPhaseData.bgGlow}`,
                            `0 0 40px ${currentPhaseData.bgGlow}`,
                            `0 0 20px ${currentPhaseData.bgGlow}`
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <currentPhaseData.icon className="w-10 h-10 text-white" />
                      </motion.div>
                      
                      <div className="text-left">
                        <h3 className="text-3xl font-poppins font-bold text-white mb-2">
                          {currentPhaseData.title}
                        </h3>
                        <p className="text-slate-300 font-inter text-lg">
                          {currentPhaseData.description}
                        </p>
                      </div>
                      
                      <motion.div
                        className="text-6xl"
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {currentPhaseData.emoji}
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Progress Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="mb-8"
              >
                <div className="max-w-2xl mx-auto">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-slate-400 font-inter font-medium">
                      Progresso do Sistema
                    </span>
                    <span className="text-indigo-400 font-inter font-bold text-lg">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  
                  <div className="relative">
                    <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden shadow-inner">
                      <motion.div
                        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-4 rounded-full shadow-sm relative overflow-hidden"
                        style={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Shimmer Effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          animate={{ x: [-100, 200] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />
                      </motion.div>
                    </div>
                    
                    {/* Phase Markers */}
                    <div className="flex justify-between mt-3">
                      {bugLifecyclePhases.map((phase, index) => (
                        <div
                          key={phase.id}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index <= currentPhase
                              ? `bg-gradient-to-r ${phase.color} shadow-lg`
                              : 'bg-slate-600'
                          }`}
                          style={{
                            boxShadow: index <= currentPhase ? `0 0 10px ${phase.bgGlow}` : 'none'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* System Status */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.5 }}
                className="grid grid-cols-3 gap-6 max-w-2xl mx-auto"
              >
                {[
                  { label: "Qualidade", value: "A+", icon: "🎯" },
                  { label: "Segurança", value: "100%", icon: "🛡️" },
                  { label: "Performance", value: "⚡", icon: "🚀" }
                ].map((metric, index) => (
                  <motion.div
                    key={index}
                    className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 text-center"
                    animate={{
                      scale: [1, 1.05, 1],
                      borderColor: [
                        'rgba(71, 85, 105, 1)',
                        'rgba(99, 102, 241, 0.5)',
                        'rgba(71, 85, 105, 1)'
                      ]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      delay: index * 0.5 
                    }}
                  >
                    <div className="text-3xl mb-2">{metric.icon}</div>
                    <div className="text-2xl font-bold text-white mb-1 font-poppins">
                      {metric.value}
                    </div>
                    <div className="text-sm text-slate-400 font-inter">
                      {metric.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Completion Animation */}
          {currentPhase === bugLifecyclePhases.length - 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <motion.div
                className="w-96 h-96 border-4 border-green-400 rounded-full"
                animate={{
                  scale: [1, 2, 3],
                  opacity: [1, 0.5, 0],
                }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}