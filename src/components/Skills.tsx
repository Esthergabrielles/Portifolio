import React, { useState, useEffect } from 'react';
import { Bot, Search, Globe, Zap, Shield, Smartphone, Lightbulb, Users, MessageCircle, Brain, Eye, Clock, Award, TrendingUp, Star, Trophy } from 'lucide-react';
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

  const [activeCategory, setActiveCategory] = useState<'technical' | 'soft'>('technical');

  const skillCategories = [
    { id: 'technical', label: 'Arsenal Técnico', emoji: '⚡', count: technicalSkills.length },
    { id: 'soft', label: 'Superpoderes Pessoais', emoji: '🧠', count: softSkills.length }
  ];

  const achievements = [
    { icon: Trophy, label: 'Tecnologias', value: '6', description: 'Em desenvolvimento' },
    { icon: Star, label: 'Progresso QA', value: '93%', description: 'No bootcamp atual' },
    { icon: Award, label: 'Experiência', value: '2+', description: 'Anos em processos administrativos' }
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
      if (level >= 90) return 'Ninja 🥷';
      if (level >= 80) return 'Expert 🎯';
      if (level >= 70) return 'Avançado 🚀';
      return 'Aprendendo 📚';
    };

    const colors = getSkillColor(skill.level);
    
    return (
      <motion.div 
        className="bg-white/80 dark:bg-neutral-800/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 group"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: delay * 0.1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.02, y: -8 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <motion.div 
              className={`bg-gradient-to-r ${colors.bg} p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
              whileHover={{ rotate: 5 }}
            >
              <Icon className="w-7 h-7 text-white" />
            </motion.div>
            <div>
              <h4 className="font-bold text-xl text-neutral-900 dark:text-white font-inter">
                {skill.name}
              </h4>
              <span className={`text-sm font-medium px-3 py-1 rounded-full ${colors.badge}`}>
                {getSkillLabel(skill.level)}
              </span>
            </div>
          </div>
          <div className="text-right">
            <motion.span 
              className={`text-3xl font-bold ${colors.text} font-poppins`}
              initial={{ scale: 0 }}
              animate={{ scale: animated ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {skill.level}%
            </motion.span>
          </div>
        </div>
        
        <div className="relative">
          <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-4 overflow-hidden shadow-inner">
            <motion.div 
              className={`bg-gradient-to-r ${colors.bg} h-4 rounded-full shadow-sm relative overflow-hidden`}
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
        </div>
      </motion.div>
    );
  };

  const SoftSkillBadge: React.FC<{ skill: typeof softSkills[0]; delay: number; isActive: boolean }> = ({ skill, delay, isActive }) => {
    const Icon = iconMap[skill.icon];
    
    return (
      <motion.div
        className="bg-white/80 dark:bg-neutral-800/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 text-center group cursor-pointer relative overflow-hidden"
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
          className="bg-gradient-to-br from-primary-500 to-primary-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl relative z-10"
          whileHover={{ rotate: 10, scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <Icon className="w-10 h-10 text-white" />
        </motion.div>
        
        <h4 className="font-bold text-xl text-neutral-900 dark:text-white mb-4 font-inter relative z-10">
          {skill.name}
        </h4>
        
        <div className="flex items-center justify-center gap-1 mb-4 relative z-10">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i < Math.floor(skill.level / 20) ? 'bg-primary-500' : 'bg-neutral-300 dark:bg-neutral-600'
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: isActive ? 1 : 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            />
          ))}
        </div>
        
        <div className="text-lg font-bold text-primary-500 font-poppins relative z-10">
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
                Meu Arsenal Completo 🎯
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-primary-600 mx-auto mb-8 rounded-full" />
              <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 max-w-4xl mx-auto leading-relaxed font-inter">
                Ferramentas, tecnologias e habilidades que estou desenvolvendo para 
                me tornar uma profissional QA completa
              </p>
            </motion.div>
          </AnimatedSection>
        </div>

        {/* Achievements */}
        <div className="col-span-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="bg-white/80 dark:bg-neutral-800/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 p-8 rounded-3xl shadow-lg text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -8 }}
              >
                <motion.div 
                  className="bg-gradient-to-r from-primary-500 to-primary-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <achievement.icon className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-4xl font-bold text-neutral-900 dark:text-white mb-2 font-poppins">
                  {achievement.value}
                </h3>
                <p className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 mb-2 font-inter">
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
            <div className="bg-white/80 dark:bg-neutral-800/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 rounded-2xl p-2 shadow-lg">
              {skillCategories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id as 'technical' | 'soft')}
                  className={`px-8 py-4 rounded-xl font-inter font-semibold transition-all duration-300 flex items-center gap-3 ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-xl'
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-xl">{category.emoji}</span>
                  {category.label}
                  <span className={`text-xs px-2 py-1 rounded-full ${
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
                Aprendizado Contínuo é Minha Paixão 🎓
              </h3>
              <p className="text-xl mb-8 max-w-3xl mx-auto font-inter opacity-90 leading-relaxed">
                Cada dia é uma oportunidade de aprender algo novo. Meu objetivo é sempre 
                evoluir e me tornar uma profissional QA cada vez melhor, combinando 
                minha experiência administrativa com conhecimentos técnicos.
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