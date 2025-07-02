import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Shield, Zap, Target, CheckCircle } from "lucide-react";

interface WelcomeScreenProps {
  onComplete: () => void;
}

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { icon: Shield, label: "Inicializando Sistema QA", color: "from-blue-500 to-blue-600" },
    { icon: Target, label: "Carregando Ferramentas", color: "from-purple-500 to-purple-600" },
    { icon: Zap, label: "Configurando Ambiente", color: "from-green-500 to-green-600" },
    { icon: CheckCircle, label: "Sistema Pronto", color: "from-emerald-500 to-emerald-600" }
  ];

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          setTimeout(() => {
            setShowWelcome(false);
            setTimeout(onComplete, 800);
          }, 1000);
          return prev;
        }
      });
    }, 800);

    return () => clearInterval(stepInterval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {showWelcome && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 h-screen w-full overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-black"
        >
          {/* Tech Grid Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(99,102,241,0.1)_49%,rgba(99,102,241,0.1)_51%,transparent_52%)] bg-[length:40px_40px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.15),transparent_50%)]" />
          </div>

          {/* Floating Tech Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-indigo-400/20 text-lg"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, 20, -20],
                  opacity: [0.1, 0.3, 0.1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
              >
                {['🔧', '⚡', '🎯', '🛡️', '🔍', '📊', '💻', '🚀'][i % 8]}
              </motion.div>
            ))}
          </div>

          {/* Content Container */}
          <div className="relative z-10 flex h-full items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center max-w-2xl mx-auto px-8"
            >
              {/* Professional Logo */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-12"
              >
                <div className="relative mx-auto w-32 h-32">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl shadow-2xl">
                    <div className="absolute inset-2 bg-slate-900 rounded-2xl flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="text-6xl"
                      >
                        ⚡
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Orbital Elements */}
                  {[0, 120, 240].map((rotation, index) => (
                    <motion.div
                      key={index}
                      className="absolute inset-0"
                      animate={{ rotate: rotation + 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: index * 0.5 }}
                    >
                      <div className="absolute -top-2 left-1/2 w-4 h-4 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full transform -translate-x-1/2 shadow-lg" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Main Title */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mb-8"
              >
                <h1 className="text-5xl md:text-6xl font-poppins font-bold text-white mb-4">
                  QA
                  <motion.span
                    className="ml-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      backgroundSize: "200% 200%"
                    }}
                  >
                    Portfolio
                  </motion.span>
                </h1>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="text-xl text-slate-300 font-inter"
                >
                  Quality Assurance • Testing Excellence • Process Innovation
                </motion.p>
              </motion.div>

              {/* Progress Steps */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="mb-12"
              >
                <div className="flex justify-center items-center gap-8 mb-8">
                  {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = index <= currentStep;
                    const isCompleted = index < currentStep;
                    
                    return (
                      <motion.div
                        key={index}
                        className="flex flex-col items-center gap-3"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                          opacity: isActive ? 1 : 0.3,
                          scale: isActive ? 1 : 0.8
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ${
                            isCompleted 
                              ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' 
                              : isActive 
                                ? `bg-gradient-to-r ${step.color}` 
                                : 'bg-slate-700'
                          }`}
                          animate={isActive ? {
                            scale: [1, 1.1, 1],
                            boxShadow: [
                              "0 0 20px rgba(99, 102, 241, 0.3)",
                              "0 0 40px rgba(99, 102, 241, 0.6)",
                              "0 0 20px rgba(99, 102, 241, 0.3)"
                            ]
                          } : {}}
                          transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </motion.div>
                        
                        <span className={`text-sm font-medium ${
                          isActive ? 'text-white' : 'text-slate-500'
                        }`}>
                          {step.label}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Progress Bar */}
                <div className="w-full max-w-md mx-auto">
                  <div className="bg-slate-700 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-slate-400">
                    <span>0%</span>
                    <span>25%</span>
                    <span>50%</span>
                    <span>75%</span>
                    <span>100%</span>
                  </div>
                </div>
              </motion.div>

              {/* Current Step Display */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <p className="text-lg text-indigo-300 font-medium">
                    {steps[currentStep]?.label}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Tech Specs */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.5 }}
                className="mt-12 grid grid-cols-3 gap-6 text-center"
              >
                {[
                  { label: "Testes", value: "100%" },
                  { label: "Qualidade", value: "A+" },
                  { label: "Performance", value: "⚡" }
                ].map((spec, index) => (
                  <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
                    <div className="text-2xl font-bold text-white mb-1">{spec.value}</div>
                    <div className="text-sm text-slate-400">{spec.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Loading Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(30)].map((_, i) => (
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
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}