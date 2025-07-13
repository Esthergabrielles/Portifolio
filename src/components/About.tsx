import React from 'react';
import { Award, Users, Target, Lightbulb, MessageCircle, Clock, Sparkles, Star, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { usePortfolioData } from '../hooks/usePortfolioData';
import PremiumCard from './PremiumCard';

const About: React.FC = () => {
  const { data: portfolioData, loading } = usePortfolioData();

  // Experiências padrão caso não haja dados
  const defaultExperiences = [
    {
      icon: Award,
      title: 'Formação em Andamento',
      description: 'Estudando Quality Assurance com foco em testes e processos',
      gradient: 'from-blue-500 to-cyan-500',
      delay: 0
    },
    {
      icon: Users,
      title: 'Projetos de Estudo',
      description: 'Aplicando conhecimentos em projetos práticos e simulações',
      gradient: 'from-emerald-500 to-green-500',
      delay: 0.2
    },
    {
      icon: Target,
      title: 'Foco em Aprendizado',
      description: 'Dedicação total ao desenvolvimento de habilidades em QA',
      gradient: 'from-purple-500 to-pink-500',
      delay: 0.4
    }
  ];

  // Usar dados do Supabase ou fallback para dados padrão
  const personalInfo = portfolioData?.personalInfo;
  const softSkills = portfolioData?.skills?.filter(skill => skill.category === 'soft') || [];

  if (loading) {
    return (
      <section id="about" className="section-spacing relative overflow-hidden">
        {/* Premium Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />
        <div className="absolute inset-0 bg-pattern-dots opacity-30" />
        
        <div className="container-12 relative z-10">
          <div className="col-span-12 text-center">
            <div className="animate-pulse">
              <div className="h-16 bg-slate-300 dark:bg-slate-600 rounded-2xl mb-6"></div>
              <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-xl mb-12"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="h-[500px] bg-slate-200 dark:bg-slate-700 rounded-3xl"></div>
                <div className="space-y-8">
                  <div className="h-40 bg-slate-200 dark:bg-slate-700 rounded-3xl"></div>
                  <div className="h-60 bg-slate-200 dark:bg-slate-700 rounded-3xl"></div>
                  <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded-3xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="section-spacing relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />
      <div className="absolute inset-0 bg-pattern-dots opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-accent-500/5" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="container-12 relative z-10">
        <div className="col-span-12 text-center element-spacing">
          <AnimatedSection animation="slide-up">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-6xl md:text-7xl font-poppins font-black mb-8 gradient-text">
                Sobre Mim
              </h2>
              <div className="w-32 h-2 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto mb-12 rounded-full shadow-glow" />
              <PremiumCard
                variant="glass"
                padding="xl"
                className="max-w-5xl mx-auto"
              >
                <p className="text-2xl md:text-3xl text-slate-700 dark:text-slate-300 leading-relaxed font-inter">
                  {personalInfo?.description || 'Iniciando minha jornada em QA com muita dedicação e vontade de aprender'}
                </p>
              </PremiumCard>
            </motion.div>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Section - Premium Design */}
          <div className="order-2 lg:order-1">
            <AnimatedSection animation="scale-in" delay={1}>
              <motion.div 
                className="relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                
                <PremiumCard
                  variant="premium"
                  padding="none"
                  className="relative overflow-hidden"
                >
                  <div className="relative overflow-hidden rounded-3xl">
                    <img
                      src={personalInfo?.profile_image || "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800"}
                      alt={personalInfo?.name || "Esther Gabrielle estudando"}
                      className="w-full h-[600px] object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* Premium Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Floating Icons */}
                    {[Sparkles, Star, Zap].map((Icon, index) => (
                      <motion.div
                        key={index}
                        className="absolute w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center shadow-premium opacity-0 group-hover:opacity-100"
                        style={{
                          top: `${20 + index * 25}%`,
                          right: `${10 + index * 15}%`,
                        }}
                        animate={{
                          y: [0, -10, 0],
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 3 + index,
                          repeat: Infinity,
                          delay: index * 0.5,
                        }}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </motion.div>
                    ))}
                  </div>
                </PremiumCard>
              </motion.div>
            </AnimatedSection>
          </div>

          {/* Content Section - Premium Layout */}
          <div className="order-1 lg:order-2 space-y-12">
            <AnimatedSection animation="slide-up" delay={2}>
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h3 className="text-4xl md:text-5xl font-poppins font-bold mb-8 gradient-text">
                  Minha Jornada
                </h3>
                <PremiumCard
                  variant="glass"
                  padding="xl"
                  className="mb-8"
                >
                  <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed mb-6 font-inter">
                    Sou uma profissional em formação na área de Quality Assurance, apaixonada por tecnologia e processos organizacionais. Estou dedicando meu tempo ao aprendizado de metodologias de teste e ferramentas de QA.
                  </p>
                  <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-inter">
                    Meu objetivo é me tornar uma especialista em garantir a qualidade de software, contribuindo para o desenvolvimento de produtos excepcionais.
                  </p>
                </PremiumCard>
              </motion.div>
            </AnimatedSection>

            {/* Experiences - Premium Cards */}
            <AnimatedSection animation="slide-up" delay={3}>
              <div className="space-y-8">
                <h4 className="text-3xl font-poppins font-bold gradient-text">
                  Áreas de Estudo
                </h4>
                {defaultExperiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: exp.delay }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <PremiumCard
                      variant="premium"
                      padding="xl"
                      className="group cursor-pointer"
                      interactive={true}
                    >
                      <div className="flex items-start space-x-6">
                        <div className={`w-16 h-16 bg-gradient-to-r ${exp.gradient} rounded-2xl flex items-center justify-center shadow-premium group-hover:scale-110 group-hover:shadow-glow transition-all duration-300`}>
                          <exp.icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-bold text-slate-900 dark:text-white mb-3 font-inter text-xl group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                            {exp.title}
                          </h5>
                          <p className="text-slate-600 dark:text-slate-300 font-inter leading-relaxed text-lg">
                            {exp.description}
                          </p>
                        </div>
                      </div>
                    </PremiumCard>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            {/* Soft Skills - Premium Tags */}
            <AnimatedSection animation="slide-up" delay={4}>
              <div>
                <h4 className="text-3xl font-poppins font-bold mb-8 gradient-text">
                  Competências
                </h4>
                <PremiumCard
                  variant="glass"
                  padding="xl"
                >
                  <div className="flex flex-wrap gap-4">
                    {softSkills.length > 0 ? (
                      softSkills.map((skill, index) => (
                        <motion.span
                          key={skill.id}
                          className="px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-2xl font-semibold font-inter shadow-premium hover:shadow-glow hover:scale-105 transition-all duration-300 cursor-pointer"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          whileHover={{ y: -3 }}
                        >
                          {skill.name}
                        </motion.span>
                      ))
                    ) : (
                      // Fallback para soft skills padrão se não houver dados
                      ['Atenção aos Detalhes', 'Organização', 'Pensamento Analítico', 'Resolução de Problemas', 'Comunicação', 'Vontade de Aprender'].map((skill, index) => (
                        <motion.span
                          key={index}
                          className="px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-2xl font-semibold font-inter shadow-premium hover:shadow-glow hover:scale-105 transition-all duration-300 cursor-pointer"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          whileHover={{ y: -3 }}
                        >
                          {skill}
                        </motion.span>
                      ))
                    )}
                  </div>
                </PremiumCard>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;