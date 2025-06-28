import React, { useState } from 'react';
import { Search, FileText, Cog, CheckCircle, BarChart, Rocket, Play, Pause, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const Process: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = [
    {
      icon: Search,
      title: 'Investigação Inicial',
      subtitle: 'Como um detetive digital',
      description: 'Mergulho fundo no seu projeto para entender cada detalhe, como se fosse resolver um mistério.',
      details: ['Análise de requisitos detalhada', 'Mapeamento de user stories', 'Identificação de pontos críticos'],
      color: 'from-blue-500 to-blue-600',
      emoji: '🔍',
      duration: '1-2 dias',
      deliverable: 'Relatório de Análise Inicial'
    },
    {
      icon: FileText,
      title: 'Estratégia de Batalha',
      subtitle: 'Planejando cada movimento',
      description: 'Crio um plano de ataque personalizado, como um general preparando para a vitória.',
      details: ['Estratégia de testes customizada', 'Casos de teste detalhados', 'Cronograma otimizado'],
      color: 'from-green-500 to-green-600',
      emoji: '📋',
      duration: '2-3 dias',
      deliverable: 'Plano de Testes Estratégico'
    },
    {
      icon: Cog,
      title: 'Preparação do Arsenal',
      subtitle: 'Montando as ferramentas',
      description: 'Configuro todo o ambiente e ferramentas, como um artesão preparando suas melhores peças.',
      details: ['Setup de ambiente completo', 'Automação inteligente', 'Configuração de ferramentas'],
      color: 'from-purple-500 to-purple-600',
      emoji: '⚙️',
      duration: '1-2 dias',
      deliverable: 'Ambiente de Testes Configurado'
    },
    {
      icon: CheckCircle,
      title: 'Caça aos Bugs',
      subtitle: 'A parte mais emocionante',
      description: 'Aqui é onde a mágica acontece! Encontro problemas que ninguém imagina que existem.',
      details: ['Execução sistemática de testes', 'Documentação detalhada de bugs', 'Validação de correções'],
      color: 'from-orange-500 to-orange-600',
      emoji: '🎯',
      duration: '3-5 dias',
      deliverable: 'Relatório de Bugs e Evidências'
    },
    {
      icon: BarChart,
      title: 'Análise Inteligente',
      subtitle: 'Transformando dados em insights',
      description: 'Analiso tudo que encontrei e transformo em informações valiosas para seu negócio.',
      details: ['Métricas de qualidade', 'Relatórios executivos', 'Recomendações estratégicas'],
      color: 'from-red-500 to-red-600',
      emoji: '📊',
      duration: '1-2 dias',
      deliverable: 'Dashboard de Qualidade'
    },
    {
      icon: Rocket,
      title: 'Lançamento Seguro',
      subtitle: 'Missão cumprida!',
      description: 'Acompanho o lançamento e fico de olho para garantir que tudo funcione perfeitamente.',
      details: ['Deploy assistido', 'Monitoramento pós-lançamento', 'Suporte contínuo'],
      color: 'from-indigo-500 to-indigo-600',
      emoji: '🚀',
      duration: 'Contínuo',
      deliverable: 'Sistema em Produção'
    }
  ];

  const processStats = [
    { label: 'Tempo Médio de Projeto', value: '2-3 semanas', icon: '⏱️' },
    { label: 'Taxa de Sucesso', value: '99.8%', icon: '🎯' },
    { label: 'Bugs Prevenidos', value: '95%', icon: '🛡️' },
    { label: 'Satisfação do Cliente', value: '100%', icon: '😊' }
  ];

  const startAnimation = () => {
    setIsPlaying(true);
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep = (currentStep + 1) % steps.length;
      setActiveStep(currentStep);
      if (currentStep === 0) {
        setIsPlaying(false);
        clearInterval(interval);
      }
    }, 2000);
  };

  return (
    <section id="process" className="section-spacing bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-black dark:via-slate-900 dark:to-slate-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(99,102,241,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(60deg,transparent_48%,rgba(99,102,241,0.03)_49%,rgba(99,102,241,0.03)_51%,transparent_52%)] bg-[length:40px_40px]" />
      </div>

      <div className="container-12 relative z-10">
        <div className="col-span-12 text-center element-spacing">
          <AnimatedSection animation="slide-up">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-poppins font-bold text-slate-900 dark:text-white mb-6">
                Minha Receita Secreta 🧪
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-indigo-400 to-purple-600 mx-auto mb-8 rounded-full" />
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed font-inter">
                Cada projeto é uma aventura única. Aqui está meu processo testado e aprovado 
                para transformar seu produto em um case de sucesso
              </p>
            </motion.div>
          </AnimatedSection>
        </div>

        {/* Process Stats */}
        <div className="col-span-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {processStats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 p-6 rounded-2xl shadow-lg text-center group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-3xl mb-3">{stat.icon}</div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 font-poppins">
                  {stat.value}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 font-inter text-sm">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interactive Process Controls */}
        <div className="col-span-12 mb-12">
          <div className="flex justify-center gap-4">
            <motion.button
              onClick={startAnimation}
              disabled={isPlaying}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl font-inter font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isPlaying ? 'Pausar' : 'Ver Processo em Ação'}
            </motion.button>
            
            <motion.button
              onClick={() => setActiveStep(0)}
              className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-6 py-3 rounded-xl font-inter font-semibold flex items-center gap-2 hover:bg-slate-300 dark:hover:bg-slate-600 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <RotateCcw className="w-5 h-5" />
              Reiniciar
            </motion.button>
          </div>
        </div>

        {/* Process Steps */}
        <div className="col-span-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Steps Navigation */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-4">
                {steps.map((step, index) => {
                  const StepIcon = step.icon;
                  return (
                    <motion.button
                      key={index}
                      onClick={() => setActiveStep(index)}
                      className={`w-full text-left p-4 rounded-2xl transition-all duration-300 ${
                        activeStep === index
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl scale-105'
                          : 'bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                      whileHover={{ x: activeStep === index ? 0 : 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          activeStep === index 
                            ? 'bg-white/20' 
                            : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                        }`}>
                          <StepIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold font-inter">
                            {step.title}
                          </h4>
                          <p className={`text-sm ${
                            activeStep === index ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'
                          }`}>
                            {step.duration}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Step Details */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-3xl p-8 shadow-xl"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div 
                      className={`bg-gradient-to-r ${steps[activeStep].color} w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {(() => {
                        const CurrentIcon = steps[activeStep].icon;
                        return <CurrentIcon className="w-8 h-8 text-white" />;
                      })()}
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-poppins font-bold text-slate-900 dark:text-white">
                          {steps[activeStep].title}
                        </h3>
                        <span className="text-3xl">{steps[activeStep].emoji}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 font-inter font-medium">
                        {steps[activeStep].subtitle}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 font-inter leading-relaxed">
                    {steps[activeStep].description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-3 font-inter">
                        O que faço nesta etapa:
                      </h4>
                      <ul className="space-y-2">
                        {steps[activeStep].details.map((detail, index) => (
                          <motion.li
                            key={index}
                            className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-inter"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            {detail}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-3 font-inter">
                        Você recebe:
                      </h4>
                      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 rounded-2xl border border-indigo-200 dark:border-indigo-800">
                        <div className="flex items-center gap-2 mb-2">
                          <Rocket className="w-5 h-5 text-indigo-500" />
                          <span className="font-semibold text-slate-900 dark:text-white font-inter">
                            Entregável
                          </span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 font-inter">
                          {steps[activeStep].deliverable}
                        </p>
                      </div>
                      
                      <div className="mt-4 text-center">
                        <span className="text-sm text-slate-500 dark:text-slate-400 font-inter">
                          ⏱️ Duração: <strong>{steps[activeStep].duration}</strong>
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Real Success Stories */}
        <div className="col-span-12 mt-16">
          <motion.div
            className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-12 text-white relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.05)_49%,rgba(255,255,255,0.05)_51%,transparent_52%)] bg-[length:20px_20px]" />
            
            <div className="relative z-10 text-center">
              <h3 className="text-3xl md:text-4xl font-poppins font-bold mb-8">
                Experiências Reais 📈
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Auditoria Documental',
                    description: 'Implementei melhorias em PGR x PCMSO, reduzindo não conformidades na Destra',
                    emoji: '📋'
                  },
                  {
                    title: 'Bootcamp QA',
                    description: '93% de progresso no curso, dominando testes manuais e automação',
                    emoji: '🎯'
                  },
                  {
                    title: 'Funcionária Destaque',
                    description: 'Reconhecida por excelência em processos administrativos',
                    emoji: '🏆'
                  }
                ].map((story, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-4xl mb-4">{story.emoji}</div>
                    <h4 className="text-xl font-poppins font-bold mb-3">{story.title}</h4>
                    <p className="text-slate-300 font-inter">{story.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Process;