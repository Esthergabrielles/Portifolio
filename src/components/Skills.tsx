import React, { useState, useEffect } from 'react';
import { Bot, Search, Globe, Zap, Shield, Smartphone, Lightbulb, Users, MessageCircle, Brain, Eye, Clock, Award, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { technicalSkills, softSkills } from '../data/portfolio';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import AnimatedSection from './AnimatedSection';

const iconMap: { [key: string]: React.ElementType } = {
  Bot, Search, Globe, Zap, Shield, Smartphone, Lightbulb, Users, MessageCircle, Brain, Eye, Clock
};

const Skills: React.FC = () => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.3,
    triggerOnce: true,
  });

  const SkillBar: React.FC<{ skill: typeof technicalSkills[0]; delay: number }> = ({ skill, delay }) => {
    const Icon = iconMap[skill.icon];
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
      if (isIntersecting && !animated) {
        const timer = setTimeout(() => {
          setAnimated(true);
        }, delay);
        return () => clearTimeout(timer);
      }
    }, [isIntersecting, animated, delay]);

    const getSkillColor = (level: number) => {
      if (level >= 90) return 'from-green-500 to-green-600';
      if (level >= 80) return 'from-blue-500 to-blue-600';
      if (level >= 70) return 'from-yellow-500 to-yellow-600';
      return 'from-red-500 to-red-600';
    };

    const getSkillLabel = (level: number) => {
      if (level >= 90) return 'Expert';
      if (level >= 80) return 'Avançado';
      if (level >= 70) return 'Intermediário';
      return 'Básico';
    };
    
    return (
      <motion.div 
        className="mb-8 p-6 bg-white/80 dark:bg-neutral-800/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: delay * 0.1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.02, y: -5 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`bg-gradient-to-r ${getSkillColor(skill.level)} p-3 rounded-xl shadow-lg`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg text-neutral-900 dark:text-white font-inter">
                {skill.name}
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                  skill.level >= 90 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                  skill.level >= 80 ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                  skill.level >= 70 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                }`}>
                  {getSkillLabel(skill.level)}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-neutral-900 dark:text-white font-poppins">
              {skill.level}%
            </span>
          </div>
        </div>
        <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-3 overflow-hidden">
          <motion.div 
            className={`bg-gradient-to-r ${getSkillColor(skill.level)} h-3 rounded-full shadow-sm`}
            initial={{ width: 0 }}
            animate={{ width: animated ? `${skill.level}%` : '0%' }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          />
        </div>
      </motion.div>
    );
  };

  const SkillBadge: React.FC<{ skill: typeof softSkills[0]; delay: number }> = ({ skill, delay }) => {
    const Icon = iconMap[skill.icon];
    
    return (
      <motion.div
        className="bg-white/80 dark:bg-neutral-800/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group cursor-pointer"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: delay * 0.1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.05, y: -8 }}
      >
        <motion.div 
          className="bg-gradient-to-br from-primary-500 to-primary-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl"
          whileHover={{ rotate: 5, scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <Icon className="w-8 h-8 text-white" />
        </motion.div>
        <h4 className="font-bold text-lg text-neutral-900 dark:text-white mb-2 font-inter">
          {skill.name}
        </h4>
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className={`w-2 h-2 rounded-full mx-0.5 ${
                  i < Math.floor(skill.level / 20) ? 'bg-primary-500' : 'bg-neutral-300 dark:bg-neutral-600'
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              />
            ))}
          </div>
        </div>
        <div className="text-sm text-neutral-600 dark:text-neutral-400 font-inter">
          Nível {skill.level}%
        </div>
      </motion.div>
    );
  };

  return (
    <section id="skills" ref={ref} className="section-spacing bg-gradient-to-br from-white via-neutral-50 to-neutral-100 dark:from-neutral-900 dark:via-black dark:to-neutral-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(47,128,237,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(60deg,transparent_48%,rgba(47,128,237,0.03)_49%,rgba(47,128,237,0.03)_51%,transparent_52%)] bg-[length:40px_40px]" />
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
                Expertise Técnica
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-primary-600 mx-auto mb-8 rounded-full" />
              <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 max-w-4xl mx-auto leading-relaxed font-inter">
                Competências técnicas e comportamentais desenvolvidas ao longo da minha jornada em QA, 
                com foco em excelência e inovação
              </p>
            </motion.div>
          </AnimatedSection>
        </div>

        {/* Stats Cards */}
        <div className="col-span-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Award, label: 'Projetos Concluídos', value: '15+', color: 'from-blue-500 to-blue-600' },
              { icon: TrendingUp, label: 'Taxa de Sucesso', value: '98%', color: 'from-green-500 to-green-600' },
              { icon: Clock, label: 'Experiência', value: '2+ Anos', color: 'from-purple-500 to-purple-600' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/80 dark:bg-neutral-800/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 p-8 rounded-2xl shadow-lg text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className={`bg-gradient-to-r ${stat.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2 font-poppins">
                  {stat.value}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300 font-inter font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Technical Skills */}
        <div className="col-span-12 lg:col-span-7">
          <AnimatedSection animation="slide-up" delay={1}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-4xl font-poppins font-bold text-neutral-900 dark:text-white mb-12 text-center lg:text-left">
                Habilidades Técnicas
              </h3>
              <div className="space-y-6">
                {technicalSkills.map((skill, index) => (
                  <SkillBar key={skill.name} skill={skill} delay={index} />
                ))}
              </div>
            </motion.div>
          </AnimatedSection>
        </div>

        {/* Soft Skills */}
        <div className="col-span-12 lg:col-span-5">
          <AnimatedSection animation="slide-up" delay={2}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-4xl font-poppins font-bold text-neutral-900 dark:text-white mb-12 text-center lg:text-left">
                Soft Skills
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {softSkills.map((skill, index) => (
                  <SkillBadge key={skill.name} skill={skill} delay={index} />
                ))}
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Skills;