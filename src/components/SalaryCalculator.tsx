// [Atualizado para incluir seleção de contrato, modalidade e cidades]
import React, { useState, useEffect } from 'react';
import {
  Calculator, DollarSign, Award, Check, Zap, Target, Star, BarChart3, UserCheck, MapPin
} from 'lucide-react';
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

interface PositionDetails {
  id: string;
  label: string;
  description: string;
  whyFit: string;
  icon: React.ElementType;
  color: string;
}

const SalaryCalculator: React.FC = () => {
  const [selectedPosition, setSelectedPosition] = useState('');
  const [selectedContractType, setSelectedContractType] = useState('');
  const [selectedModality, setSelectedModality] = useState('');
  const [currentSalary, setCurrentSalary] = useState<SalaryRange | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
    'Analista de Requisitos Júnior': {
      'CLT': {
        'Presencial': { min: 4000, max: 6000, currency: 'BRL' },
        'Híbrido': { min: 4500, max: 6500, currency: 'BRL' },
        'Remoto': { min: 5000, max: 7000, currency: 'BRL' }
      },
      'PJ': {
        'Presencial': { min: 5000, max: 7500, currency: 'BRL' },
        'Híbrido': { min: 5500, max: 8000, currency: 'BRL' },
        'Remoto': { min: 6000, max: 8500, currency: 'BRL' }
      }
    },
    'Customer Success Técnico': {
      'CLT': {
        'Presencial': { min: 4000, max: 6000, currency: 'BRL' },
        'Híbrido': { min: 4500, max: 6500, currency: 'BRL' },
        'Remoto': { min: 5000, max: 7000, currency: 'BRL' }
      },
      'PJ': {
        'Presencial': { min: 5500, max: 7500, currency: 'BRL' },
        'Híbrido': { min: 6000, max: 8000, currency: 'BRL' },
        'Remoto': { min: 6500, max: 8500, currency: 'BRL' }
      }
    }
  };

  const positions: PositionDetails[] = [
    {
      id: 'QA Tester Júnior',
      label: 'QA Tester Júnior',
      description: 'Execução de testes manuais, API, automação e participação em sprints',
      whyFit: 'Você já pratica testes funcionais, API com Postman e automação com Playwright. Usa Jira/TestRail, participa de sprints e documenta bugs, estando pronta para atuar com qualidade de software.',
      icon: Award,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'Analista de Requisitos Júnior',
      label: 'Analista de Requisitos Júnior',
      description: 'Documentação, critérios de aceite, análise de requisitos e comunicação com o time',
      whyFit: 'Você já atua com testes baseados em requisitos, usa Jira, valida dados com SQL, participa de sprints e possui ótima comunicação técnica. Essa base sustenta bem um cargo funcional.',
      icon: Target,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'Customer Success Técnico',
      label: 'Customer Success Técnico',
      description: 'Atendimento consultivo de produtos digitais com visão técnica e foco em sucesso do cliente',
      whyFit: 'Você tem experiência como SDR, analista comercial e CS. Já lidou com ERP, CRM e suporte a usuários, além de ter excelente comunicação e visão técnica em produtos.',
      icon: UserCheck,
      color: 'from-sky-500 to-sky-600'
    }
  ];

  const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(value);

  useEffect(() => {
    if (selectedPosition && selectedContractType && selectedModality) {
      const data = salaryData[selectedPosition]?.[selectedContractType]?.[selectedModality];
      if (data) {
        setCurrentSalary(data);
        setShowResult(true);
        setErrorMessage('');
      }
    } else {
      setShowResult(false);
      setCurrentSalary(null);
      if (selectedPosition || selectedContractType || selectedModality) {
        setErrorMessage('Por favor, selecione todas as opções.');
      } else {
        setErrorMessage('');
      }
    }
  }, [selectedPosition, selectedContractType, selectedModality]);

  const resetCalculator = () => {
    setSelectedPosition('');
    setSelectedContractType('');
    setSelectedModality('');
    setShowResult(false);
    setCurrentSalary(null);
    setErrorMessage('');
  };

  const selected = positions.find(p => p.id === selectedPosition);
  const showCities = selectedModality === 'Presencial' || selectedModality === 'Híbrido';

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-black rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-emerald-500 to-green-600 rounded-xl shadow-lg">
          <Calculator className="text-white w-8 h-8" />
        </div>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Calculadora Salarial</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-xl mx-auto text-base">Baseada na minha jornada em Qualidade de Software, Requisitos e Produtos Digitais</p>
      </motion.div>

      <div className="mb-6">
        <h2 className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-2">Tipo de Contrato</h2>
        <div className="flex gap-3">
          {['CLT', 'PJ'].map(type => (
            <button key={type} onClick={() => setSelectedContractType(type)} className={`px-4 py-2 rounded-full border ${selectedContractType === type ? 'bg-green-600 text-white' : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-white'} transition`}>{type}</button>
          ))}
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-2">Modalidade</h2>
        <div className="flex gap-3">
          {['Presencial', 'Híbrido', 'Remoto'].map(mod => (
            <button key={mod} onClick={() => setSelectedModality(mod)} className={`px-4 py-2 rounded-full border ${selectedModality === mod ? 'bg-green-600 text-white' : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-white'} transition`}>{mod}</button>
          ))}
        </div>

        {showCities && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="mt-4 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <MapPin className="w-4 h-4 text-green-600" /> Disponível para atuar em: <span className="font-semibold">Americana/SP</span> e <span className="font-semibold">Santa Bárbara d'Oeste/SP</span>
          </motion.div>
        )}
      </div>

      {/* POSIÇÕES */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-green-500" /> Selecione sua função
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {positions.map(({ id, label, description, icon: Icon, color }) => (
            <button
              key={id}
              onClick={() => setSelectedPosition(id)}
              className={`
                relative group rounded-3xl border p-5 flex items-start gap-4 transition-all duration-300 text-left shadow-sm hover:shadow-xl hover:border-green-500
                ${selectedPosition === id ? 'border-green-500 bg-gradient-to-br from-green-50 to-white dark:from-green-900/30 dark:to-green-800/10' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'}
              `}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r ${color} shadow-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">{label}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
              </div>
              {selectedPosition === id && (
                <div className="absolute top-3 right-3 text-green-500">
                  <Check className="w-5 h-5" />
                </div>
              )}
            </button>
          ))}
        </div>

        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="mt-6 bg-slate-100 dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-600">
            <h4 className="font-semibold text-slate-800 dark:text-white text-sm mb-1">Por que você se encaixa nessa vaga:</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300">{selected.whyFit}</p>
          </motion.div>
        )}
      </div>

      {errorMessage && (
        <p className="text-sm text-red-500 text-center mb-6 font-medium">{errorMessage}</p>
      )}

      <AnimatePresence>
        {showResult && currentSalary && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-10 rounded-2xl border border-green-300 dark:border-green-700 bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-slate-900 p-6 shadow-lg text-center"
          >
            <DollarSign className="w-8 h-8 mx-auto text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-green-700 dark:text-green-300 mb-1">Faixa Salarial</h3>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">{formatCurrency(currentSalary.min)} - {formatCurrency(currentSalary.max)}</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Média estimada: {formatCurrency((currentSalary.min + currentSalary.max) / 2)}</p>
            <button
              onClick={resetCalculator}
              className="mt-6 px-6 py-2 rounded-full bg-green-600 hover:bg-green-700 text-white font-medium transition-all duration-300 shadow-md"
            >
              Calcular novamente
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SalaryCalculator;
