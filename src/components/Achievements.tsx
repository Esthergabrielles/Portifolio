import React from 'react';
import { Award, Trophy, Star, Target, TrendingUp, Users, Calendar, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const Achievements: React.FC = () => {
  const achievements = [
    {
      icon: Trophy,
      title: 'Excellence in QA Award',
      organization: 'Tech Excellence Awards 2024',
      date: '2024',
      description: 'Reconhecimento pela excelência em Quality Assurance e inovação em metodologias de teste.',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20'
    },
    {
      icon: Star,
      title: 'Top QA Professional',
      organization: 'Brazilian QA Community',
      date: '2024',
      description: 'Eleita uma das principais profissionais de QA do Brasil pela comunidade técnica.',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20'
    },
    {
      icon: Target,
      title: 'Zero Defect Delivery',
      organization: 'Multiple Projects',
      date: '2023-2024',
      description: 'Entrega de 15+ projetos consecutivos sem bugs críticos em produção.',
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20'
    },
    {
      icon: TrendingUp,
      title: 'Performance Optimization',
      organization: 'Client Projects',
      date: '2024',
      description: 'Melhoria média de 45% na performance de aplicações através de testes especializados.',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20'
    }
  ];

  const certifications = [
    {
      name: 'ISTQB Advanced Level',
      issuer: 'ISTQB',
      date: '2024',
      level: 'Advanced',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      name: 'Certified Agile Testing Professional',
      issuer: 'Agile Alliance',
      date: '2024',
      level: 'Professional',
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'Security Testing Specialist',
      issuer: 'OWASP',
      date: '2023',
      level: 'Specialist',
      color: 'from-red-500 to-red-600'
    },
    {
      name: 'Test Automation Expert',
      issuer: 'Selenium Academy',
      date: '2023',
      level: 'Expert',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const metrics = [
    { icon: Users, label: 'Clientes Satisfeitos', value: '50+', description: 'Taxa de satisfação de 100%' },
    { icon: CheckCircle, label: 'Projetos Entregues', value: '75+', description: 'Todos dentro do prazo' },
    { icon: TrendingUp, label: 'Bugs Prevenidos', value: '2000+', description: 'Identificados antes da produção' },
    { icon: Calendar, label: 'Anos de Experiência', value: '3+', description: 'Em Quality Assurance' }
  ];

  return (
    <section id="achievements" className="section-spacing bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-black dark:via-slate-900 dark:to-slate-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(99,102,241,0.03)_49%,rgba(99,102,241,0.03)_51%,transparent_52%)] bg-[length:30px_30px]" />
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
                Conquistas & Reconhecimentos
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-indigo-400 to-purple-600 mx-auto mb-8 rounded-full" />
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed font-inter">
                Marcos importantes que refletem dedicação, excelência técnica e 
                impacto positivo na comunidade de Quality Assurance
              </p>
            </motion.div>
          </AnimatedSection>
        </div>

        {/* Key Metrics */}
        <div className="col-span-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <AnimatedSection key={index} animation="scale-in" delay={index * 0.1}>
                <motion.div
                  className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 p-8 rounded-2xl shadow-lg text-center group"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <metric.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 font-poppins">
                    {metric.value}
                  </h3>
                  <p className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2 font-inter">
                    {metric.label}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-inter">
                    {metric.description}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Awards & Achievements */}
        <div className="col-span-12 lg:col-span-8">
          <AnimatedSection animation="slide-up" delay={1}>
            <h3 className="text-3xl md:text-4xl font-poppins font-bold text-slate-900 dark:text-white mb-12">
              Prêmios & Reconhecimentos
            </h3>
            
            <div className="space-y-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  className={`bg-gradient-to-r ${achievement.bgColor} border border-slate-200 dark:border-slate-700 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 group`}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, x: 10 }}
                >
                  <div className="flex items-start gap-6">
                    <div className={`bg-gradient-to-r ${achievement.color} w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                      <achievement.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <h4 className="text-2xl font-poppins font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                          {achievement.title}
                        </h4>
                        <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-slate-700 px-3 py-1 rounded-full">
                          {achievement.date}
                        </span>
                      </div>
                      
                      <p className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-3 font-inter">
                        {achievement.organization}
                      </p>
                      
                      <p className="text-slate-600 dark:text-slate-400 font-inter leading-relaxed">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Certifications */}
        <div className="col-span-12 lg:col-span-4">
          <AnimatedSection animation="slide-up" delay={2}>
            <h3 className="text-3xl md:text-4xl font-poppins font-bold text-slate-900 dark:text-white mb-12">
              Certificações
            </h3>
            
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03, y: -5 }}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`bg-gradient-to-r ${cert.color} w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 dark:text-white font-inter text-lg line-clamp-2">
                        {cert.name}
                      </h4>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 dark:text-slate-300 font-inter font-medium">
                        {cert.issuer}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-inter">
                        {cert.date}
                      </p>
                    </div>
                    <span className={`text-xs px-3 py-1 bg-gradient-to-r ${cert.color} text-white rounded-full font-medium`}>
                      {cert.level}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Call to Action */}
        <div className="col-span-12 text-center mt-16">
          <AnimatedSection animation="slide-up" delay={3}>
            <motion.div
              className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-12 text-white relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.05)_49%,rgba(255,255,255,0.05)_51%,transparent_52%)] bg-[length:20px_20px]" />
              
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-poppins font-bold mb-6">
                  Pronto para alcançar novos patamares de qualidade?
                </h3>
                <p className="text-xl mb-8 max-w-3xl mx-auto font-inter opacity-90">
                  Vamos trabalhar juntos para transformar seu produto em um case de sucesso 
                  reconhecido pela excelência e inovação.
                </p>
                <motion.button
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-10 py-5 rounded-2xl font-inter font-semibold text-lg shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Iniciar Colaboração
                </motion.button>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Achievements;