import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, MapPin, Briefcase, Clock, TrendingUp, Star, Award, Zap, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SalaryRange {
  min: number;
  max: number;
  currency: string;
}

interface SalaryData {
  [position: string]: {
    [contractType: string]: {
      [modality: string]: SalaryRange;
    };
  };
}

const SalaryCalculator: React.FC = () => {
  const [selectedPosition, setSelectedPosition] = useState('');
  const [selectedContractType, setSelectedContractType] = useState('');
  const [selectedModality, setSelectedModality] = useState('');
  const [currentSalary, setCurrentSalary] = useState<SalaryRange | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  // Dados salariais baseados no mercado brasileiro para QA
  const salaryData: SalaryData = {
    'QA Tester Júnior': {
      'CLT': {
        'Presencial': { min: 3500, max: 5500, currency: 'BRL' },
        'Híbrido': { min: 4000, max: 6000, currency: 'BRL' },
        'Remoto': { min: 4500, max: 6500, currency: 'BRL' }
      },
      'PJ': {
        'Presencial': { min: 4500, max: 7000, currency: 'BRL' },
        'Híbrido': { min: 5000, max: 7500, currency: 'BRL' },
        'Remoto': { min: 5500, max: 8000, currency: 'BRL' }
      }
    },
    'QA Tester Pleno': {
      'CLT': {
        'Presencial': { min: 6000, max: 9000, currency: 'BRL' },
        'Híbrido': { min: 6500, max: 9500, currency: 'BRL' },
        'Remoto': { min: 7000, max: 10000, currency: 'BRL' }
      },
      'PJ': {
        'Presencial': { min: 7500, max: 11000, currency: 'BRL' },
        'Híbrido': { min: 8000, max: 12000, currency: 'BRL' },
        'Remoto': { min: 8500, max: 13000, currency: 'BRL' }
      }
    },
    'QA Analyst': {
      'CLT': {
        'Presencial': { min: 5000, max: 7500, currency: 'BRL' },
        'Híbrido': { min: 5500, max: 8000, currency: 'BRL' },
        'Remoto': { min: 6000, max: 8500, currency: 'BRL' }
      },
      'PJ': {
        'Presencial': { min: 6500, max: 9500, currency: 'BRL' },
        'Híbrido': { min: 7000, max: 10000, currency: 'BRL' },
        'Remoto': { min: 7500, max: 10500, currency: 'BRL' }
      }
    },
    'QA Automation': {
      'CLT': {
        'Presencial': { min: 7000, max: 11000, currency: 'BRL' },
        'Híbrido': { min: 7500, max: 12000, currency: 'BRL' },
        'Remoto': { min: 8000, max: 13000, currency: 'BRL' }
      },
      'PJ': {
        'Presencial': { min: 9000, max: 14000, currency: 'BRL' },
        'Híbrido': { min: 9500, max: 15000, currency: 'BRL' },
        'Remoto': { min: 10000, max: 16000, currency: 'BRL' }
      }
    }
  };

  const positions = [
    { 
      id: 'QA Tester Júnior', 
      label: 'QA Tester Júnior', 
      description: 'Posição atual - Iniciando carreira em QA',
      icon: Star,
      color: 'from-green-500 to-green-600'
    },
    { 
      id: 'QA Tester Pleno', 
      label: 'QA Tester Pleno', 
      description: 'Próximo objetivo - Com experiência consolidada',
      icon: TrendingUp,
      color: 'from-blue-500 to-blue-600'
    },
    { 
      id: 'QA Analyst', 
      label: 'QA Analyst', 
      description: 'Foco em análise e estratégia de testes',
      icon: Target,
      color: 'from-purple-500 to-purple-600'
    },
    { 
      id: 'QA Automation', 
      label: 'QA Automation', 
      description: 'Especialização em automação de testes',
      icon: Zap,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const contractTypes = [
    { 
      id: 'CLT', 
      label: 'CLT', 
      description: 'Consolidação das Leis do Trabalho',
      benefits: ['Vale Alimentação', 'Plano de Saúde', 'Férias', '13º Salário']
    },
    { 
      id: 'PJ', 
      label: 'Pessoa Jurídica', 
      description: 'Contrato como prestador de serviços',
      benefits: ['Maior flexibilidade', 'Valores mais altos', 'Autonomia']
    }
  ];

  const modalities = [
    { 
      id: 'Presencial', 
      label: 'Presencial', 
      description: 'Trabalho no escritório da empresa',
      icon: Briefcase
    },
    { 
      id: 'Híbrido', 
      label: 'Híbrido', 
      description: 'Combinação de presencial e remoto',
      icon: Clock
    },
    { 
      id: 'Remoto', 
      label: 'Remoto', 
      description: 'Trabalho 100% à distância',
      icon: MapPin
    }
  ];

  useEffect(() => {
    if (selectedPosition && selectedContractType && selectedModality) {
      const salary = salaryData[selectedPosition]?.[selectedContractType]?.[selectedModality];
      if (salary) {
        setCurrentSalary(salary);
        setShowResult(true);
        setAnimationStep(0);
        
        // Animação sequencial
        const timer = setTimeout(() => setAnimationStep(1), 500);
        return () => clearTimeout(timer);
      }
    } else {
      setShowResult(false);
      setCurrentSalary(null);
    }
  }, [selectedPosition, selectedContractType, selectedModality]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getProgressPercentage = () => {
    if (!currentSalary) return 0;
    const total = currentSalary.max - currentSalary.min;
    const current = (currentSalary.min + currentSalary.max) / 2;
    return ((current - currentSalary.min) / total) * 100;
  };

  const resetCalculator = () => {
    setSelectedPosition('');
    setSelectedContractType('');
    setSelectedModality('');
    setShowResult(false);
    setCurrentSalary(null);
    setAnimationStep(0);
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-black rounded-3xl p-8 shadow-premium border border-slate-200 dark:border-slate-700">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl"
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Calculator className="w-10 h-10 text-white" />
        </motion.div>
        
        <h3 className="text-3xl font-poppins font-bold text-slate-900 dark:text-white mb-4">
          💰 Calculadora de Expectativa Salarial
        </h3>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Descubra minha faixa salarial baseada na posição, tipo de contratação e modalidade de trabalho
        </p>
      </div>

      {/* Step 1: Position Selection */}
      <div className="mb-8">
        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Award className="w-6 h-6 text-primary-500" />
          1. Escolha a Posição
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {positions.map((position) => {
            const Icon = position.icon;
            return (
              <motion.button
                key={position.id}
                onClick={() => setSelectedPosition(position.id)}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                  selectedPosition === position.id
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-lg scale-105'
                    : 'border-slate-200 dark:border-slate-700 hover:border-primary-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start gap-4">
                  <div className={`bg-gradient-to-r ${position.color} w-12 h-12 rounded-xl flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-slate-900 dark:text-white mb-1">
                      {position.label}
                    </h5>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {position.description}
                    </p>
                  </div>
                  {selectedPosition === position.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center"
                    >
                      <motion.div
                        className="w-2 h-2 bg-white rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    </motion.div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Contract Type Selection */}
      <AnimatePresence>
        {selectedPosition && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8"
          >
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-primary-500" />
              2. Tipo de Contratação
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contractTypes.map((contract) => (
                <motion.button
                  key={contract.id}
                  onClick={() => setSelectedContractType(contract.id)}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                    selectedContractType === contract.id
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-lg scale-105'
                      : 'border-slate-200 dark:border-slate-700 hover:border-primary-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h5 className="font-bold text-slate-900 dark:text-white mb-2">
                    {contract.label}
                  </h5>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    {contract.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {contract.benefits.map((benefit, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 3: Modality Selection */}
      <AnimatePresence>
        {selectedPosition && selectedContractType && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8"
          >
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-primary-500" />
              3. Modalidade de Trabalho
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {modalities.map((modality) => {
                const Icon = modality.icon;
                return (
                  <motion.button
                    key={modality.id}
                    onClick={() => setSelectedModality(modality.id)}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 text-center ${
                      selectedModality === modality.id
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-lg scale-105'
                        : 'border-slate-200 dark:border-slate-700 hover:border-primary-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-8 h-8 text-primary-500 mx-auto mb-3" />
                    <h5 className="font-bold text-slate-900 dark:text-white mb-2">
                      {modality.label}
                    </h5>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {modality.description}
                    </p>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {showResult && currentSalary && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.1)_49%,rgba(255,255,255,0.1)_51%,transparent_52%)] bg-[length:20px_20px]" />
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: animationStep >= 1 ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-center mb-6"
              >
                <DollarSign className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
                <h4 className="text-3xl font-bold mb-2">Faixa Salarial Encontrada! 🎉</h4>
                <p className="text-lg opacity-90">
                  Para {selectedPosition} • {selectedContractType} • {selectedModality}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: animationStep >= 1 ? 1 : 0, y: animationStep >= 1 ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-center mb-8"
              >
                <div className="text-5xl font-bold mb-4">
                  {formatCurrency(currentSalary.min)} - {formatCurrency(currentSalary.max)}
                </div>
                <div className="text-xl opacity-90">
                  Média: {formatCurrency((currentSalary.min + currentSalary.max) / 2)}
                </div>
              </motion.div>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: animationStep >= 1 ? 1 : 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="bg-white/20 rounded-full h-4 mb-6 overflow-hidden"
              >
                <motion.div
                  className="bg-yellow-300 h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: animationStep >= 1 ? `${getProgressPercentage()}%` : 0 }}
                  transition={{ duration: 1.5, delay: 1 }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: animationStep >= 1 ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 1.5 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                  <div className="text-2xl font-bold mb-1">{formatCurrency(currentSalary.min)}</div>
                  <div className="text-sm opacity-80">Mínimo</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                  <div className="text-2xl font-bold mb-1">{formatCurrency((currentSalary.min + currentSalary.max) / 2)}</div>
                  <div className="text-sm opacity-80">Expectativa</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                  <div className="text-2xl font-bold mb-1">{formatCurrency(currentSalary.max)}</div>
                  <div className="text-sm opacity-80">Máximo</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: animationStep >= 1 ? 1 : 0, y: animationStep >= 1 ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 2 }}
                className="text-center mt-6"
              >
                <button
                  onClick={resetCalculator}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 mx-auto"
                >
                  <Calculator className="w-5 h-5" />
                  Calcular Novamente
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Footer */}
      <div className="mt-8 text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          💡 <strong>Nota:</strong> Valores baseados em pesquisa de mercado brasileiro para área de QA (2024/2025)
        </p>
      </div>
    </div>
  );
};

export default SalaryCalculator;