import React from 'react';
import { Award, Users, Target, Lightbulb, MessageCircle, Clock } from 'lucide-react';
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
      color: 'text-blue-600'
    },
    {
      icon: Users,
      title: 'Projetos de Estudo',
      description: 'Aplicando conhecimentos em projetos práticos e simulações',
      color: 'text-emerald-600'
    },
    {
      icon: Target,
      title: 'Foco em Aprendizado',
      description: 'Dedicação total ao desenvolvimento de habilidades em QA',
      color: 'text-purple-600'
    }
  ];

  // Usar dados do Supabase ou fallback para dados padrão
  const personalInfo = portfolioData?.personalInfo;
  const softSkills = portfolioData?.skills?.filter(skill => skill.category === 'soft') || [];

  if (loading) {
    return (
      <section id="about" className="section bg-white">
        <div className="container">
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
    <section id="about" className="section bg-white">
      <div className="container">
        <div className="text-center mb-20">
          <AnimatedSection animation="slide-up">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-poppins font-bold text-slate-900 mb-8">
                Sobre Mim
              </h2>
              <div className="w-24 h-1 bg-primary-500 mx-auto mb-8 rounded-full" />
              <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-inter">
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
                  variant="default"
                  padding="none"
                  className="overflow-hidden border border-slate-200"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={personalInfo?.profile_image || "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800"}
                      alt={personalInfo?.name || "Esther Gabrielle estudando"}
                      className="w-full h-[600px] object-cover"
                    />
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
                <h3 className="text-3xl md:text-4xl font-poppins font-bold text-slate-900 mb-8">
                  Minha Jornada
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed mb-8 font-inter">
                  Sou uma profissional em formação na área de Quality Assurance, apaixonada por tecnologia e processos organizacionais. Estou dedicando meu tempo ao aprendizado de metodologias de teste e ferramentas de QA.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed font-inter">
                  Meu objetivo é me tornar uma especialista em garantir a qualidade de software, contribuindo para o desenvolvimento de produtos excepcionais.
                </p>
              </motion.div>
            </AnimatedSection>

            {/* Experiences */}
            <AnimatedSection animation="slide-up" delay={3}>
              <div className="space-y-6">
                <h4 className="text-2xl font-poppins font-bold text-slate-900">
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
                      variant="default"
                      padding="lg"
                      className="border border-slate-200 hover:border-primary-300 transition-colors duration-300"
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 bg-primary-100 rounded-xl ${exp.color}`}>
                          <exp.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-bold text-slate-900 mb-2 font-inter text-lg">
                            {exp.title}
                          </h5>
                          <p className="text-slate-600 font-inter leading-relaxed">
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
                <h4 className="text-2xl font-poppins font-bold text-slate-900 mb-6">
                  Competências
                </h4>
                <div className="flex flex-wrap gap-3">
                  {softSkills.length > 0 ? (
                    softSkills.map((skill, index) => (
                      <motion.span
                        key={skill.id}
                        className="px-4 py-2 bg-primary-100 text-primary-700 rounded-xl font-medium font-inter border border-primary-200"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {skill.name}
                      </motion.span>
                    ))
                  ) : (
                    // Fallback para soft skills padrão se não houver dados
                    ['Atenção aos Detalhes', 'Organização', 'Pensamento Analítico', 'Resolução de Problemas', 'Comunicação', 'Vontade de Aprender'].map((skill, index) => (
                      <motion.span
                        key={index}
                        className="px-4 py-2 bg-primary-100 text-primary-700 rounded-xl font-medium font-inter border border-primary-200"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
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