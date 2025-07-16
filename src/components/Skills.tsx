import React, { useState, useEffect } from 'react';
import {
  Bot, Search, Globe, Zap, Shield, Smartphone, Lightbulb, Users,
  MessageCircle, Brain, Eye, Clock, Award, TrendingUp, Star, Trophy, FileText
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toolLogos } from '../data/portfolio';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { usePortfolioData } from '../hooks/usePortfolioData';
import AnimatedSection from './AnimatedSection';
import PremiumCard from './PremiumCard';
import PremiumLoadingSpinner from './PremiumLoadingSpinner';

const iconMap: { [key: string]: React.ElementType } = {
  Bot, Search, Globe, Zap, Shield, Smartphone, Lightbulb, Users,
  MessageCircle, Brain, Eye, Clock, FileText, Star, Award, Trophy, TrendingUp
};

const Skills: React.FC = () => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.3,
    triggerOnce: true,
  });

  const { data: portfolioData, loading } = usePortfolioData();
  const [activeCategory, setActiveCategory] = useState<'technical' | 'documentation' | 'soft'>('technical');

  const allSkills = portfolioData?.skills || [];

  const technicalSkills = allSkills.filter(skill => skill.category === 'technical');
  const qaDocumentations = allSkills.filter(skill => skill.category === 'documentation');
  const softSkills = allSkills.filter(skill => skill.category === 'soft');

  const skillCategories = [
    { id: 'technical', label: 'Arsenal Técnico', emoji: '⚡', count: technicalSkills.length },
    { id: 'documentation', label: 'Documentação QA', emoji: '📋', count: qaDocumentations.length },
    { id: 'soft', label: 'Superpoderes Pessoais', emoji: '🧠', count: softSkills.length }
  ];

  const achievements = [
    { icon: Trophy, label: 'Tecnologias', value: technicalSkills.length.toString(), description: 'Em desenvolvimento' },
    { icon: FileText, label: 'Documentações QA', value: qaDocumentations.length.toString(), description: 'Tipos dominados' },
    { icon: Star, label: 'Progresso QA', value: '93%', description: 'No bootcamp atual' },
    { icon: Award, label: 'Experiência', value: '2+', description: 'Anos em processos administrativos' }
  ];

  const getSkillColor = (level: number) => {
    if (level >= 90) return { bg: 'from-emerald-500 to-emerald-600', text: 'text-emerald-500', badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' };
    if (level >= 80) return { bg: 'from-blue-500 to-blue-600', text: 'text-blue-500', badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' };
    if (level >= 70) return { bg: 'from-amber-500 to-amber-600', text: 'text-amber-500', badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' };
    return { bg: 'from-red-500 to-red-600', text: 'text-red-500', badge: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' };
  };

  const getSkillLabel = (level: number) => {
    if (level >= 90) return 'Ninja 🥷';
    if (level >= 80) return 'Expert 🎯';
    if (level >= 70) return 'Avançado 🚀';
    return 'Aprendendo 📚';
  };

  const getCurrentSkills = () => {
    switch (activeCategory) {
      case 'technical': return technicalSkills;
      case 'documentation': return qaDocumentations;
      case 'soft': return softSkills;
      default: return technicalSkills;
    }
  };

  const SkillCard: React.FC<{ skill: any; delay: number; isActive: boolean }> = ({ skill, delay, isActive }) => {
    const Icon = iconMap[skill.icon] || Lightbulb;
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
      if (isIntersecting && !animated && isActive) {
        const timer = setTimeout(() => setAnimated(true), delay);
        return () => clearTimeout(timer);
      }
    }, [isIntersecting, animated, delay, isActive]);

    const colors = getSkillColor(skill.level);
    const toolLogo = toolLogos[skill.name];

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: delay * 0.1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.02, y: -8 }}
      >
        <PremiumCard
          variant="premium"
          padding="xl"
          className="group cursor-pointer h-full"
          interactive={true}
          animated={true}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-6">
              <motion.div
                className={`bg-gradient-to-r ${colors.bg} p-5 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 relative overflow-hidden`}
                whileHover={{ rotate: 5 }}
              >
                {toolLogo ? (
                  <div className="logo-container w-8 h-8">
                    <img
                      src={toolLogo}
                      alt={skill.name}
                      className="logo-image w-full h-full object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.parentElement?.querySelector('.logo-fallback');
                        if (fallback) {
                          (fallback as HTMLElement).style.display = 'flex';
                        }
                      }}
                    />
                    <div className="logo-fallback hidden items-center justify-center w-full h-full">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                ) : (
                  <Icon className="w-8 h-8 text-white" />
                )}
              </motion.div>
              <div>
                <h4 className="font-bold text-xl text-slate-900 dark:text-white font-inter mb-2">
                  {skill.name}
                </h4>
                <span className={`text-sm font-medium px-4 py-2 rounded-full ${colors.badge}`}>
                  {getSkillLabel(skill.level)}
                </span>
              </div>
            </div>
            <div className="text-right">
              <motion.span
                className={`text-4xl font-bold ${colors.text} font-poppins`}
                initial={{ scale: 0 }}
                animate={{ scale: animated ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {skill.level}%
              </motion.span>
            </div>
          </div>

          <div className="relative">
            <div className="progress-bar-premium w-full h-5 overflow-hidden shadow-inner">
              <motion.div
                className={`progress-fill-premium bg-gradient-to-r ${colors.bg} h-5 rounded-full shadow-sm relative overflow-hidden`}
                initial={{ width: 0 }}
                animate={{ width: animated ? `${skill.level}%` : '0%' }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: [-100, 200] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </div>

            <div className="flex justify-between mt-3 text-xs text-slate-500 dark:text-slate-400 font-inter">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>
        </PremiumCard>
      </motion.div>
    );
  };

  const SoftSkillBadge: React.FC<{ skill: any; delay: number; isActive: boolean }> = ({ skill, delay, isActive }) => {
    const Icon = iconMap[skill.icon] || Lightbulb;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: delay * 0.1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.05, y: -10 }}
      >
        <PremiumCard
          variant="premium"
          padding="xl"
          className="text-center group cursor-pointer relative overflow-hidden h-full"
          interactive={true}
          animated={true}
        >
          <motion.div
            className="bg-gradient-to-br from-primary-500 to-primary-600 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:shadow-2xl relative z-10"
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <Icon className="w-12 h-12 text-white" />
          </motion.div>

          <h4 className="font-bold text-2xl text-slate-900 dark:text-white mb-6 font-inter relative z-10">
            {skill.name}
          </h4>

          <div className="flex items-center justify-center gap-2 mb-6 relative z-10">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className={`w-4 h-4 rounded-full ${
                  i < Math.floor(skill.level / 20) ? 'bg-primary-500' : 'bg-slate-300 dark:bg-slate-600'
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: isActive ? 1 : 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              />
            ))}
          </div>

          <div className="text-2xl font-bold text-primary-500 font-poppins relative z-10">
            {skill.level}%
          </div>
        </PremiumCard>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <section id="skills" className="section-spacing bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-accent-500/5" />
        
        <div className="container-12 relative z-10">
          <div className="col-span-12 text-center">
            <PremiumLoadingSpinner 
              size="xl" 
              variant="orbit" 
              text="Carregando habilidades..." 
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" ref={ref} className="section-spacing bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-black relative overflow-hidden">
      {/* Premium Background Pattern */}
      <div className="absolute inset-0 bg-pattern-grid opacity-30" />
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
                Meu Arsenal Completo
              </h2>
              <div className="w-32 h-2 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto mb-12 rounded-full shadow-glow" />
              <PremiumCard
                variant="glass"
                padding="xl"
                className="max-w-5xl mx-auto"
              >
                <p className="text-2xl md:text-3xl text-slate-700 dark:text-slate-300 leading-relaxed font-inter">
                  Ferramentas, tecnologias e habilidades que estou desenvolvendo para me tornar uma profissional QA completa
                </p>
              </PremiumCard>
            </motion.div>
          </AnimatedSection>
        </div>

        {/* Stats Premium */}
        <div className="col-span-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -8 }}
              >
                <PremiumCard
                  variant="premium"
                  padding="xl"
                  className="text-center group"
                  interactive={true}
                  animated={true}
                >
                  <motion.div 
                    className="bg-gradient-to-r from-primary-500 to-primary-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    <achievement.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 font-poppins">
                    {achievement.value}
                  </h3>
                  <p className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2 font-inter">
                    {achievement.label}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-inter">
                    {achievement.description}
                  </p>
                </PremiumCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Category Selector Premium */}
        <div className="col-span-12 mb-16">
          <div className="flex flex-wrap justify-center gap-4">
            {skillCategories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id as any)}
                className={`px-8 py-4 rounded-2xl font-inter font-bold transition-all duration-300 flex items-center gap-3 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-premium scale-105'
                    : 'bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:scale-105'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-2xl">{category.emoji}</span>
                <span>{category.label}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                  activeCategory === category.id 
                    ? 'bg-white/20 text-white' 
                    : 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                }`}>
                  {category.count}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Skills Display */}
        <div className="col-span-12">
          <AnimatedSection animation="slide-up" delay={1}>
            {activeCategory === 'soft' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {getCurrentSkills().map((skill, index) => (
                  <SoftSkillBadge 
                    key={skill.id} 
                    skill={skill} 
                    delay={index} 
                    isActive={true}
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {getCurrentSkills().map((skill, index) => (
                  <SkillCard 
                    key={skill.id} 
                    skill={skill} 
                    delay={index} 
                    isActive={true}
                  />
                ))}
              </div>
            )}
          </AnimatedSection>
        </div>

        {/* Motivation Section Premium */}
        <div className="col-span-12 mt-16">
          <motion.div
            className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-12 text-white relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.05)_49%,rgba(255,255,255,0.05)_51%,transparent_52%)] bg-[length:20px_20px]" />
            
            <div className="relative z-10 text-center">
              <motion.div
                className="flex justify-center mb-6"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Lightbulb className="w-16 h-16 text-yellow-300" />
              </motion.div>
              
              <h3 className="text-3xl md:text-4xl font-poppins font-bold mb-6">
                Aprendizado Contínuo é Minha Paixão 🎓
              </h3>
              <p className="text-xl mb-8 max-w-3xl mx-auto font-inter opacity-90 leading-relaxed">
                Cada dia é uma oportunidade de aprender algo novo. Meu objetivo é sempre evoluir e me tornar uma profissional QA cada vez melhor, combinando minha experiência administrativa com conhecimentos técnicos.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold mb-2">93%</div>
                  <div className="text-sm opacity-80">Progresso no Bootcamp QA</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">2+</div>
                  <div className="text-sm opacity-80">Anos em Processos</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">∞</div>
                  <div className="text-sm opacity-80">Sede de Aprender</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;