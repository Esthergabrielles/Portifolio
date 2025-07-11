import React from 'react';
import { Award, Users, Target, Lightbulb, MessageCircle, Clock, Sparkles, Zap, Brain, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { usePortfolioData } from '../hooks/usePortfolioData';

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
      description: 'Estudando Quality Assurance com foco em testes e processos'
    },
    {
      icon: Users,
      title: 'Projetos de Estudo',
      description: 'Aplicando conhecimentos em projetos práticos e simulações'
    },
    {
      icon: Target,
      title: 'Foco em Aprendizado',
      description: 'Dedicação total ao desenvolvimento de habilidades em QA'
    }
  ];

  // Usar dados do Supabase ou fallback para dados padrão
  const personalInfo = portfolioData?.personalInfo;
  const softSkills = portfolioData?.skills?.filter(skill => skill.category === 'soft') || [];

  if (loading) {
    return (
      <section id="about" className="section-spacing bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-black relative overflow-hidden">
        <div className="container-12 relative z-10">
          <div className="col-span-12 text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-300 rounded mb-4"></div>
              <div className="h-6 bg-gray-200 rounded mb-8"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="h-96 bg-gray-200 rounded-3xl"></div>
                <div className="space-y-6">
                  <div className="h-32 bg-gray-200 rounded-2xl"></div>
                  <div className="h-48 bg-gray-200 rounded-2xl"></div>
                  <div className="h-24 bg-gray-200 rounded-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="section-spacing bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(47,128,237,0.1),transparent_50%)]" />
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
              <h2 className="text-5xl md:text-6xl font-poppins font-bold text-neutral-900 dark:text-white mb-6">
                Sobre Mim
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-primary-600 mx-auto mb-8 rounded-full" />
              <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed font-inter">
                {personalInfo?.description || 'Iniciando minha jornada em QA com muita dedicação e vontade de aprender'}
              </p>
            </motion.div>
          </AnimatedSection>
        </div>

        <div className="col-span-12 lg:col-span-6">
          <AnimatedSection animation="scale-in" delay={1}>
            <motion.div 
              className="relative element-spacing"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src={personalInfo?.profile_image || "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800"}
                  alt={personalInfo?.name || "Esther Gabrielle estudando"}
                  className="w-full h-[500px] object-cover"
                  key={personalInfo?.profile_image} // Force re-render when image changes
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-transparent" />
                <motion.div
                  className="absolute top-6 right-6 w-12 h-12 bg-primary-400/90 backdrop-blur-sm rounded-full flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-6 h-6 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>

        {/* Content */}
        <div className="col-span-12 lg:col-span-6 space-y-8">
          <AnimatedSection animation="slide-up" delay={2}>
            <motion.div 
              className="element-spacing"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-4xl font-poppins font-bold text-neutral-900 dark:text-white mb-6">
                Minha Jornada
              </h3>
              <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6 font-inter">
                {personalInfo?.description || 'Sou uma profissional em formação na área de Quality Assurance, apaixonada por tecnologia e processos organizacionais. Estou dedicando meu tempo ao aprendizado de metodologias de teste e ferramentas de QA.'}
              </p>
              <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed font-inter">
                Meu objetivo é me tornar uma especialista em garantir a qualidade de software, contribuindo para o desenvolvimento de produtos excepcionais.
              </p>
            </motion.div>
          </AnimatedSection>

          {/* Experiences */}
          <AnimatedSection animation="slide-up" delay={3}>
            <div className="space-y-6 element-spacing">
              <h4 className="text-2xl font-poppins font-bold text-neutral-900 dark:text-white">
                Áreas de Estudo
              </h4>
              {defaultExperiences.map((exp, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4 p-6 rounded-2xl bg-white/80 dark:bg-neutral-800/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 shadow-lg hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white p-3 rounded-xl shadow-lg">
                    <exp.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-neutral-900 dark:text-white mb-2 font-inter text-lg">
                      {exp.title}
                    </h5>
                    <p className="text-neutral-600 dark:text-neutral-300 font-inter leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          {/* Soft Skills - Agora dinâmico */}
          <AnimatedSection animation="slide-up" delay={4}>
            <div>
              <h4 className="text-2xl font-poppins font-bold text-neutral-900 dark:text-white mb-6">
                Competências
              </h4>
              <div className="flex flex-wrap gap-3">
                {softSkills.length > 0 ? (
                  softSkills.map((skill, index) => (
                    <motion.span
                      key={skill.id}
                      className="px-4 py-2 bg-gradient-to-r from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 text-primary-700 dark:text-primary-300 rounded-full font-medium font-inter border border-primary-200 dark:border-primary-700 shadow-sm"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      {skill.name}
                    </motion.span>
                  ))
                ) : (
                  // Fallback para soft skills padrão se não houver dados
                  ['Atenção aos Detalhes', 'Organização', 'Pensamento Analítico', 'Resolução de Problemas', 'Comunicação', 'Vontade de Aprender'].map((skill, index) => (
                    <motion.span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 text-primary-700 dark:text-primary-300 rounded-full font-medium font-inter border border-primary-200 dark:border-primary-700 shadow-sm"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05, y: -2 }}
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
    </section>
  );
};

export default About;