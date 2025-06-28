import React from 'react';
import { Search, FileText, Cog, CheckCircle, BarChart, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const Process: React.FC = () => {
  const steps = [
    {
      icon: Search,
      title: 'Análise & Descoberta',
      description: 'Compreensão profunda dos requisitos, objetivos de negócio e expectativas dos usuários.',
      details: ['Análise de requisitos', 'Mapeamento de user stories', 'Identificação de riscos'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: FileText,
      title: 'Planejamento Estratégico',
      description: 'Desenvolvimento de estratégia de testes personalizada e documentação detalhada.',
      details: ['Estratégia de testes', 'Casos de teste', 'Cronograma de execução'],
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Cog,
      title: 'Implementação & Automação',
      description: 'Configuração de ambientes, implementação de testes automatizados e manuais.',
      details: ['Setup de ambiente', 'Automação de testes', 'Testes manuais'],
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: CheckCircle,
      title: 'Execução & Validação',
      description: 'Execução sistemática de testes com foco na identificação de bugs e melhorias.',
      details: ['Execução de testes', 'Reporte de bugs', 'Validação de fixes'],
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: BarChart,
      title: 'Análise & Relatórios',
      description: 'Análise detalhada dos resultados com insights acionáveis e métricas de qualidade.',
      details: ['Métricas de qualidade', 'Relatórios detalhados', 'Recomendações'],
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Rocket,
      title: 'Entrega & Suporte',
      description: 'Acompanhamento pós-entrega e suporte contínuo para garantir excelência.',
      details: ['Deploy assistido', 'Monitoramento', 'Suporte contínuo'],
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

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
                Processo de Trabalho
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-indigo-400 to-purple-600 mx-auto mb-8 rounded-full" />
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed font-inter">
                Metodologia estruturada e comprovada para entregar resultados excepcionais 
                em cada projeto de Quality Assurance
              </p>
            </motion.div>
          </AnimatedSection>
        </div>

        {/* Process Steps */}
        <div className="col-span-12">
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-200 via-purple-200 to-indigo-200 dark:from-indigo-800 dark:via-purple-800 dark:to-indigo-800 transform -translate-y-1/2 z-0" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
              {steps.map((step, index) => (
                <AnimatedSection key={index} animation="scale-in" delay={index * 0.2}>
                  <motion.div
                    className="group relative"
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Step Number */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                      <div className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                        {index + 1}
                      </div>
                    </div>
                    
                    <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-3xl p-8 pt-12 shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
                      <div className={`bg-gradient-to-r ${step.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="text-2xl font-poppins font-bold text-slate-900 dark:text-white mb-4 text-center">
                        {step.title}
                      </h3>
                      
                      <p className="text-slate-600 dark:text-slate-300 mb-6 font-inter leading-relaxed text-center">
                        {step.description}
                      </p>
                      
                      <ul className="space-y-3">
                        {step.details.map((detail, detailIndex) => (
                          <motion.li
                            key={detailIndex}
                            className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-inter"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: detailIndex * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <div className={`w-2 h-2 bg-gradient-to-r ${step.color} rounded-full flex-shrink-0`} />
                            {detail}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>

        {/* Process Benefits */}
        <div className="col-span-12 mt-20">
          <AnimatedSection animation="slide-up" delay={1}>
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-12 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.05)_49%,rgba(255,255,255,0.05)_51%,transparent_52%)] bg-[length:20px_20px]" />
              
              <div className="relative z-10 text-center">
                <h3 className="text-3xl md:text-4xl font-poppins font-bold mb-8">
                  Por que este processo funciona?
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      title: 'Eficiência Comprovada',
                      description: 'Redução de 60% no tempo de identificação de bugs',
                      icon: '⚡'
                    },
                    {
                      title: 'Qualidade Garantida',
                      description: '99.8% de taxa de sucesso em projetos entregues',
                      icon: '🎯'
                    },
                    {
                      title: 'Transparência Total',
                      description: 'Relatórios detalhados e comunicação constante',
                      icon: '📊'
                    }
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      className="text-center"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-4xl mb-4">{benefit.icon}</div>
                      <h4 className="text-xl font-poppins font-bold mb-3">{benefit.title}</h4>
                      <p className="text-slate-300 font-inter">{benefit.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Process;