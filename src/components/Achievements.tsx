import React from 'react';
import { Award, Trophy, Star, Target, TrendingUp, Users, Calendar, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { usePortfolioData } from '../hooks/usePortfolioData';

const Achievements: React.FC = () => {
  const { data: portfolioData, loading } = usePortfolioData();

  // Usar dados do Supabase
  const achievements = portfolioData?.achievements || [];
  const certificates = portfolioData?.certificates || [];
  const courses = portfolioData?.courses || [];
  const personalInfo = portfolioData?.personalInfo;

  // Calcular métricas dinâmicas
  const activeCourses = courses.filter(course => course.status !== 'paused').length;
  const completedCourses = courses.filter(course => course.status === 'completed').length;
  const qaBootcampProgress = courses.find(course => course.name.toLowerCase().includes('qa'))?.progress || 0;
  const totalCertificates = certificates.length;

  const metrics = [
    { icon: Users, label: 'Experiência Profissional', value: '2+', description: 'Anos em processos administrativos' },
    { icon: CheckCircle, label: 'Cursos Ativos', value: activeCourses.toString(), description: 'Cursos em andamento' },
    { icon: TrendingUp, label: 'Progresso QA', value: `${qaBootcampProgress}%`, description: 'No bootcamp atual' },
    { icon: Calendar, label: 'Certificados', value: totalCertificates.toString(), description: 'Certificações obtidas' }
  ];

  // Certificações para exibir (limitado a 4 mais recentes)
  const recentCertifications = certificates.slice(0, 4).map(cert => ({
    name: cert.name,
    issuer: cert.issuer,
    date: cert.date,
    level: cert.category === 'Higher Education' ? 'Completo' : 'Certificado',
    color: cert.category === 'QA' ? 'from-blue-500 to-blue-600' : 
           cert.category === 'Programming' ? 'from-green-500 to-green-600' :
           cert.category === 'Higher Education' ? 'from-purple-500 to-purple-600' :
           'from-indigo-500 to-indigo-600',
    image: cert.image
  }));

  if (loading) {
    return (
      <section id="achievements" className="section-spacing bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-black dark:via-slate-900 dark:to-slate-800 relative overflow-hidden">
        <div className="container-12 relative z-10">
          <div className="col-span-12 text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-300 rounded mb-4"></div>
              <div className="h-6 bg-gray-200 rounded mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
                ))}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
                  ))}
                </div>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-24 bg-gray-200 rounded-2xl"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

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

        {/* Key Metrics - Agora dinâmico */}
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

        {/* Awards & Achievements - Agora dinâmico */}
        <div className="col-span-12 lg:col-span-8">
          <AnimatedSection animation="slide-up" delay={1}>
            <h3 className="text-3xl md:text-4xl font-poppins font-bold text-slate-900 dark:text-white mb-12">
              Reconhecimentos & Conquistas
            </h3>
            
            <div className="space-y-6">
              {achievements.length > 0 ? (
                achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 group"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02, x: 10 }}
                  >
                    <div className="flex items-start gap-6">
                      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        <Award className="w-8 h-8 text-white" />
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
                ))
              ) : (
                // Fallback se não houver conquistas
                <div className="text-center py-8 text-slate-500">
                  <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Conquistas serão exibidas aqui quando adicionadas pelo admin</p>
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>

        {/* Certifications - Agora dinâmico */}
        <div className="col-span-12 lg:col-span-4">
          <AnimatedSection animation="slide-up" delay={2}>
            <h3 className="text-3xl md:text-4xl font-poppins font-bold text-slate-900 dark:text-white mb-12">
              Formação & Certificações
            </h3>
            
            <div className="space-y-4">
              {recentCertifications.length > 0 ? (
                recentCertifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer relative overflow-hidden"
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
                ))
              ) : (
                // Fallback se não houver certificados
                <div className="text-center py-8 text-slate-500">
                  <Star className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Certificados serão exibidos aqui quando adicionados pelo admin</p>
                </div>
              )}
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
                  {personalInfo?.description || 'Minha jornada está apenas começando. Estou ansiosa para aplicar meus conhecimentos e continuar crescendo em uma equipe que valorize dedicação e aprendizado contínuo.'}
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