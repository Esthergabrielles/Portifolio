import React from 'react';
import { Award, Trophy, Star, Target, TrendingUp, Users, Calendar, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const Achievements: React.FC = () => {
  const achievements = [
    {
      icon: Award,
      title: 'Funcionária Destaque',
      organization: 'Destra Gestão de Terceiros',
      date: '2024',
      description: 'Reconhecida como Funcionária Destaque em Novembro/2024 por excelência em auditorias documentais.',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20'
    },
    {
      icon: Star,
      title: 'Progresso Excepcional em QA',
      organization: 'Mate Academy',
      date: '2024',
      description: 'Alcançou 93% de progresso no Bootcamp QA Engineer, demonstrando dedicação e aprendizado acelerado.',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20'
    },
    {
      icon: Target,
      title: 'Melhoria de Processos',
      organization: 'Destra Gestão de Terceiros',
      date: '2023-2024',
      description: 'Implementou melhorias em PGR x PCMSO, reduzindo significativamente não conformidades.',
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20'
    },
    {
      icon: TrendingUp,
      title: 'Transição de Carreira',
      organization: 'Desenvolvimento Pessoal',
      date: '2024',
      description: 'Transição bem-sucedida da área administrativa para tecnologia, focando em Quality Assurance.',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20'
    }
  ];

  const certifications = [
    {
      name: 'Funcionária Destaque',
      issuer: 'Destra Gestão de Terceiros',
      date: 'Nov/2024',
      level: 'Reconhecimento',
      color: 'from-yellow-500 to-yellow-600',
      image: 'https://media.licdn.com/dms/image/v2/D4D2DAQGKEjQoUJ5LVQ/profile-treasury-document-cover-images_480/B4DZcc9E5yIAAw-/0/1748537463719?e=1751742000&v=beta&t=mgnBVzWH59-_wnr-X-Y0fROaS3AXvAMYlB7a3zj_IdY'
    },
    {
      name: 'Funcionária Destaque',
      issuer: 'Destra Gestão de Terceiros',
      date: 'Mai/2025',
      level: 'Reconhecimento',
      color: 'from-yellow-500 to-yellow-600',
      image: 'https://media.licdn.com/dms/image/v2/D4D2DAQFa8NrCQg313A/profile-treasury-document-cover-images_480/B4DZcc9fJiGYAw-/0/1748537571028?e=1751742000&v=beta&t=UnsdPBZ4LvsHjgFuK6ZKrrBxyqx6Wuop5Fzeq2Mqnzc'
    },
    {
      name: 'CST Gestão Comercial',
      issuer: 'Estácio',
      date: '2023',
      level: 'Completo',
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'Bootcamp QA Engineer',
      issuer: 'Mate Academy',
      date: '2024',
      level: '93% Completo',
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  const metrics = [
    { icon: Users, label: 'Experiência Profissional', value: '2+', description: 'Anos em processos administrativos' },
    { icon: CheckCircle, label: 'Cursos Ativos', value: '2', description: 'QA e FullStack Python' },
    { icon: TrendingUp, label: 'Progresso QA', value: '93%', description: 'No bootcamp atual' },
    { icon: Calendar, label: 'Dedicação', value: '100%', description: 'Aos estudos em tecnologia' }
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
                Marcos importantes que refletem dedicação, evolução profissional e 
                comprometimento com a excelência em tudo que faço
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
              Reconhecimentos & Conquistas
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
              Formação & Certificações
            </h3>
            
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  onMouseEnter={(e) => {
                    if (cert.image) {
                      // Show certificate preview on hover
                      const tooltip = document.createElement('div');
                      tooltip.className = 'fixed z-50 pointer-events-none bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-4 max-w-sm';
                      tooltip.innerHTML = `
                        <img src="${cert.image}" alt="${cert.name}" class="w-full h-32 object-cover rounded-xl mb-3" />
                        <h4 class="font-bold text-slate-900 dark:text-white mb-2">${cert.name}</h4>
                        <p class="text-slate-600 dark:text-slate-300 text-sm">${cert.issuer} • ${cert.date}</p>
                      `;
                      
                      const rect = e.currentTarget.getBoundingClientRect();
                      tooltip.style.left = `${Math.min(rect.right + 20, window.innerWidth - 400)}px`;
                      tooltip.style.top = `${rect.top}px`;
                      
                      document.body.appendChild(tooltip);
                      
                      // Store reference for cleanup
                      (e.currentTarget as any)._tooltip = tooltip;
                    }
                  }}
                  onMouseLeave={(e) => {
                    const tooltip = (e.currentTarget as any)._tooltip;
                    if (tooltip) {
                      document.body.removeChild(tooltip);
                      (e.currentTarget as any)._tooltip = null;
                    }
                  }}
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
                  Pronta para novos desafios!
                </h3>
                <p className="text-xl mb-8 max-w-3xl mx-auto font-inter opacity-90">
                  Minha jornada está apenas começando. Estou ansiosa para aplicar meus conhecimentos 
                  e continuar crescendo em uma equipe que valorize dedicação e aprendizado contínuo.
                </p>
                <motion.button
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-10 py-5 rounded-2xl font-inter font-semibold text-lg shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Vamos Conversar
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