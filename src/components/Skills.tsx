import React, { useState, useEffect } from 'react';
import { Bot, Search, Globe, Zap, Shield, Smartphone, Lightbulb, Users, MessageCircle, Brain, Eye, Clock, Award, TrendingUp, Star, Trophy, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { technicalSkills, qaDocumentations, softSkills, toolLogos } from '../data/portfolio';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useLanguage } from '../hooks/useLanguage';
import { t } from '../data/translations';
import AnimatedSection from './AnimatedSection';

const iconMap: { [key: string]: React.ElementType } = {
  Bot, Search, Globe, Zap, Shield, Smartphone, Lightbulb, Users, MessageCircle, Brain, Eye, Clock, FileText
};

const Skills: React.FC = () => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.3,
    triggerOnce: true,
  });
  const { language } = useLanguage();

  const [activeCategory, setActiveCategory] = useState<'technical' | 'documentation' | 'soft'>('technical');

  const skillCategories = [
    { id: 'technical', label: t('technicalArsenal', language), emoji: '⚡', count: technicalSkills.length },
    { id: 'documentation', label: t('qaDocumentations', language), emoji: '📋', count: qaDocumentations.length },
    { id: 'soft', label: t('personalSuperpowers', language), emoji: '🧠', count: softSkills.length }
  ];

  const achievements = [
    { icon: Trophy, label: t('technologies', language), value: technicalSkills.length.toString(), description: t('inDevelopment', language) },
    { icon: FileText, label: t('qaDocumentations', language), value: qaDocumentations.length.toString(), description: 'Tipos dominados' },
    { icon: Star, label: t('qaProgress', language), value: '93%', description: t('currentBootcamp', language) },
    { icon: Award, label: t('experience', language), value: '2+', description: t('administrativeProcesses', language) }
  ];

  const SkillCard: React.FC<{ skill: typeof technicalSkills[0]; delay: number; isActive: boolean }> = ({ skill, delay, isActive }) => {
    const Icon = iconMap[skill.icon];
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
      if (isIntersecting && !animated && isActive) {
        const timer = setTimeout(() => {
          setAnimated(true);
        }, delay);
        return () => clearTimeout(timer);
      }
    }, [isIntersecting, animated, delay, isActive]);

    const getSkillColor = (level: number) => {
      if (level >= 90) return { bg: 'from-emerald-500 to-emerald-600', text: 'text-emerald-500', badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' };
      if (level >= 80) return { bg: 'from-blue-500 to-blue-600', text: 'text-blue-500', badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' };
      if (level >= 70) return { bg: 'from-amber-500 to-amber-600', text: 'text-amber-500', badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' };
      return { bg: 'from-red-500 to-red-600', text: 'text-red-500', badge: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' };
    };

    const getSkillLabel = (level: number) => {
      if (level >= 90) return `${t('ninja', language)} 🥷`;
      if (level >= 80) return `${t('expert', language)} 🎯`;
      if (level >= 70) return `${t('advanced', language)} 🚀`;
      return `${t('learning', language)} 📚`;
    };

    const colors = getSkillColor(skill.level);
    const toolLogo = toolLogos[skill.name];
    
    return (
      <motion.div 
        className="bg-white/90 dark:bg-neutral-800/60 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: delay * 0.1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.02, y: -8 }}
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
                      // Fallback para ícone se a imagem falhar
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.parentElement?.querySelector('.logo-fallback');
                      if (fallback) {
                        (fallback as HTMLElement).style.display = 'flex';
                      }
                    }}
                  />
                  <div className="logo-fallback hidden">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              ) : (
                <Icon className="w-8 h-8 text-white" />
              )}
            </motion.div>
            <div>
              <h4 className="font-bold text-xl text-neutral-900 dark:text-white font-inter mb-2">
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
          
          {/* Progress milestones */}
          <div className="flex justify-between mt-3 text-xs text-neutral-500 dark:text-neutral-400 font-inter">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
        </div>
      </motion.div>
    );
  };

  const SoftSkillBadge: React.FC<{ skill: typeof softSkills[0]; delay: number; isActive: boolean }> = ({ skill, delay, isActive }) => {
    const Icon = iconMap[skill.icon];
    
    return (
      <motion.div
        className="bg-white/90 dark:bg-neutral-800/60 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 text-center group cursor-pointer relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: delay * 0.1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.05, y: -10 }}
      >
        {/* Hover Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
        />
        
        <motion.div 
          className="bg-gradient-to-br from-primary-500 to-primary-600 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:shadow-2xl relative z-10"
          whileHover={{ rotate: 10, scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <Icon className="w-12 h-12 text-white" />
        </motion.div>
        
        <h4 className="font-bold text-2xl text-neutral-900 dark:text-white mb-6 font-inter relative z-10">
          {skill.name}
        </h4>
        
        <div className="flex items-center justify-center gap-2 mb-6 relative z-10">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className={`w-4 h-4 rounded-full ${
                i < Math.floor(skill.level / 20) ? 'bg-primary-500' : 'bg-neutral-300 dark:bg-neutral-600'
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
                {t('completeArsenal', language)} 🎯
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-primary-600 mx-auto mb-8 rounded-full" />
              <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 max-w-4xl mx-auto leading-relaxed font-inter">
                {t('skillsSubtitle', language)}
              </p>
            </motion.div>
          </AnimatedSection>
        </div>

        {/* Achievements */}
        <div className="col-span-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="bg-white/90 dark:bg-neutral-800/60 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 p-10 rounded-3xl shadow-xl text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -8 }}
              >
                <motion.div 
                  className="bg-gradient-to-r from-primary-500 to-primary-600 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:shadow-2xl"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <achievement.icon className="w-12 h-12 text-white" />
                </motion.div>
                <h3 className="text-5xl font-bold text-neutral-900 dark:text-white mb-3 font-poppins">
                  {achievement.value}
                </h3>
                <p className="text-xl font-semibold text-neutral-700 dark:text-neutral-300 mb-3 font-inter">
                  {achievement.label}
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 font-inter">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Category Selector */}
        <div className="col-span-12 mb-12">
          <div className="flex justify-center">
            <div className="bg-white/90 dark:bg-neutral-800/60 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 rounded-3xl p-3 shadow-xl">
              {skillCategories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id as 'technical' | 'documentation' | 'soft')}
                  className={`px-10 py-5 rounded-2xl font-inter font-semibold transition-all duration-300 flex items-center gap-4 text-lg ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-xl'
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-2xl">{category.emoji}</span>
                  {category.label}
                  <span className={`text-sm px-3 py-1 rounded-full ${
                    activeCategory === category.id
                      ? 'bg-white/20 text-white'
                      : 'bg-neutral-200 dark:bg-neutral-600 text-neutral-600 dark:text-neutral-300'
                  }`}>
                    {category.count}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Display */}
        <div className="col-span-12">
          {activeCategory === 'technical' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {technicalSkills.map((skill, index) => (
                <SkillCard 
                  key={skill.name} 
                  skill={skill} 
                  delay={index} 
                  isActive={activeCategory === 'technical'}
                />
              ))}
            </div>
          ) : activeCategory === 'documentation' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {qaDocumentations.map((skill, index) => (
                <SkillCard 
                  key={skill.name} 
                  skill={skill} 
                  delay={index} 
                  isActive={activeCategory === 'documentation'}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {softSkills.map((skill, index) => (
                <SoftSkillBadge 
                  key={skill.name} 
                  skill={skill} 
                  delay={index} 
                  isActive={activeCategory === 'soft'}
                />
              ))}
            </div>
          )}
        </div>

        {/* Motivation Section */}
        <div className="col-span-12 mt-16">
          <motion.div
            className="bg-gradient-to-r from-primary-500 to-purple-600 rounded-3xl p-12 text-white text-center relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.1)_49%,rgba(255,255,255,0.1)_51%,transparent_52%)] bg-[length:20px_20px]" />
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-poppins font-bold mb-6">
                {t('documentationSpecialty', language)} 📋
              </h3>
              <p className="text-xl mb-8 max-w-3xl mx-auto font-inter opacity-90 leading-relaxed">
                {t('documentationMotivation', language)}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold mb-2">95%</div>
                  <div className="text-sm opacity-80">Bug Reports</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">90%</div>
                  <div className="text-sm opacity-80">Test Cases</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">85%</div>
                  <div className="text-sm opacity-80">Test Plans</div>
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