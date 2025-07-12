import React from 'react';
import { Award, Users, Target, Lightbulb, MessageCircle, Clock, Sparkles, Zap, Brain, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { usePortfolioData } from '../hooks/usePortfolioData';
import PremiumCard from './PremiumCard';

const iconMap: { [key: string]: React.ElementType } = {
  Award, Users, Target, Lightbulb, MessageCircle, Clock, Sparkles, Zap, Brain, Eye
};

const About: React.FC = () => {
  const { data: portfolioData, loading } = usePortfolioData();

  // Experiências padrão caso não haja dados
  const defaultExperiences = [
    {
      icon: Award,
      title: 'Formação em Andamento',
      description: 'Estudando Quality Assurance com foco em testes e processos',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Users,
      title: 'Projetos de Estudo',
      description: 'Aplicando conhecimentos em projetos práticos e simulações',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: Target,
      title: 'Foco em Aprendizado',
      description: 'Dedicação total ao desenvolvimento de habilidades em QA',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  // Usar dados do Supabase ou fallback para dados padrão
  const personalInfo = portfolioData?.personalInfo;
  const softSkills = portfolioData?.skills?.filter(skill => skill.category === 'soft') || [];

  if (loading) {
    return (
      <section id="about" className="section bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-black relative overflow-hidden">
        <div className="container relative z-10">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-16 bg-slate-300 rounded-2xl mb-6"></div>
              <div className="h-8 bg-slate-200 rounded-xl mb-12"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="h-[500px] bg-slate-200 rounded-3xl"></div>
                <div className="space-y-8">
                  <div className="h-40 bg-slate-200 rounded-3xl"></div>
                  <div className="h-60 bg-slate-200 rounded-3xl"></div>
                  <div className="h-32 bg-slate-200 rounded-3xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="section bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-black relative overflow-hidden">
      {/* Premium Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(14,165,233,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-pattern-grid" />
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-20">
          <AnimatedSection animation="slide-up">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-6xl md:text-7xl font-poppins font-bold text-slate-900 dark:text-white mb-8">
                Sobre Mim
              </h2>
              <div className="w-32 h-2 bg-gradient-to-r from-primary-400 to-primary-600 mx-auto mb-10 rounded-full" />
              <p className="text-2xl md:text-3xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed font-inter">
                {personalInfo?.description || 'Iniciando minha jornada em QA com muita dedicação e vontade de aprender'}
              </p>
            </motion.div>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Section */}
          <div className="order-2 lg:order-1">
            <AnimatedSection animation="scale-in" delay={1}>
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <PremiumCard
                  variant="premium"
                  padding="none"
                  className="overflow-hidden"
                  interactive={true}
                  glow={true}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={personalInfo?.profile_image || "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800"}
                      alt={personalInfo?.name || "Esther Gabrielle estudando"}
                      className="w-full h-[600px] object-cover"
                      key={personalInfo?.profile_image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-transparent" />
                    <motion.div
                      className="absolute top-8 right-8 w-16 h-16 bg-primary-400/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>
                </PremiumCard>
              </motion.div>
            </AnimatedSection>
          </div>

          {/* Content Section */}
          <div className="order-1 lg:order-2 space-y-10">
            <AnimatedSection animation="slide-up" delay={2}>
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h3 className="text-4xl md:text-5xl font-poppins font-bold text-slate-900 dark:text-white mb-8">
                  Minha Jornada
                </h3>
                <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 font-inter">
                  {personalInfo?.description || 'Sou uma profissional em formação na área de Quality Assurance, apaixonada por tecnologia e processos organizacionais. Estou dedicando meu tempo ao aprendizado de metodologias de teste e ferramentas de QA.'}
                </p>
                <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-inter">
                  Meu objetivo é me tornar uma especialista em garantir a qualidade de software, contribuindo para o desenvolvimento de produtos excepcionais.
                </p>
              </motion.div>
            </AnimatedSection>

            {/* Experiences */}
            <AnimatedSection animation="slide-up" delay={3}>
              <div className="space-y-8">
                <h4 className="text-3xl font-poppins font-bold text-slate-900 dark:text-white">
                  Áreas de Estudo
                </h4>
                {defaultExperiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <PremiumCard
                      variant="glass"
                      padding="lg"
                      interactive={true}
                      className="group"
                    >
                      <div className="flex items-start space-x-6">
                        <div className={`bg-gradient-to-br ${exp.color} text-white p-4 rounded-2xl shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                          <exp.icon className="w-8 h-8" />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-bold text-slate-900 dark:text-white mb-3 font-inter text-xl">
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

            {/* Soft Skills */}
            <AnimatedSection animation="slide-up" delay={4}>
              <div>
                <h4 className="text-3xl font-poppins font-bold text-slate-900 dark:text-white mb-8">
                  Competências
                </h4>
                <div className="flex flex-wrap gap-4">
                  {softSkills.length > 0 ? (
                    softSkills.map((skill, index) => (
                      <motion.span
                        key={skill.id}
                        className="px-6 py-3 bg-gradient-to-r from-primary-100/80 to-primary-200/80 dark:from-primary-900/40 dark:to-primary-800/40 text-primary-700 dark:text-primary-300 rounded-2xl font-medium font-inter border border-primary-200/60 dark:border-primary-700/60 shadow-lg backdrop-blur-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05, y: -3 }}
                      >
                        {skill.name}
                      </motion.span>
                    ))
                  ) : (
                    // Fallback para soft skills padrão se não houver dados
                    ['Atenção aos Detalhes', 'Organização', 'Pensamento Analítico', 'Resolução de Problemas', 'Comunicação', 'Vontade de Aprender'].map((skill, index) => (
                      <motion.span
                        key={index}
                        className="px-6 py-3 bg-gradient-to-r from-primary-100/80 to-primary-200/80 dark:from-primary-900/40 dark:to-primary-800/40 text-primary-700 dark:text-primary-300 rounded-2xl font-medium font-inter border border-primary-200/60 dark:border-primary-700/60 shadow-lg backdrop-blur-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05, y: -3 }}
                      >
                        {skill}
                      </motion.span>
                    ))
                  )}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;