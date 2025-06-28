import React, { useState, useEffect } from 'react';
import { Bot, Search, Globe, Zap, Shield, Smartphone, Lightbulb, Users, MessageCircle, Brain, Eye, Clock } from 'lucide-react';
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
    
    return (
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Icon className="w-5 h-5 text-primary-500" />
            <span className="font-medium text-neutral-900 dark:text-white font-inter">
              {skill.name}
            </span>
          </div>
          <span className="text-small text-neutral-600 dark:text-neutral-400 font-inter">
            {skill.level}%
          </span>
        </div>
        <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary-500 to-accent-blue h-2 rounded-full transition-all duration-1000 ease-out"
            style={{ 
              width: animated ? `${skill.level}%` : '0%',
            }}
          />
        </div>
      </div>
    );
  };

  const SkillBadge: React.FC<{ skill: typeof softSkills[0]; delay: number }> = ({ skill, delay }) => {
    const Icon = iconMap[skill.icon];
    
    return (
      <AnimatedSection animation="scale-in" delay={delay}>
        <div className="glass-card p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover-lift will-change-transform">
          <div className="bg-primary-100 dark:bg-primary-900/30 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-6 h-6 text-primary-500" />
          </div>
          <h4 className="font-semibold text-neutral-900 dark:text-white mb-1 font-inter">
            {skill.name}
          </h4>
          <div className="text-small text-neutral-600 dark:text-neutral-400 font-inter">
            Nível {skill.level}%
          </div>
        </div>
      </AnimatedSection>
    );
  };

  return (
    <section id="skills" ref={ref} className="section-spacing bg-white dark:bg-neutral-900">
      <div className="container-12">
        <div className="col-span-12 text-center element-spacing">
          <AnimatedSection animation="slide-up">
            <h2 className="text-display font-poppins text-neutral-900 dark:text-white mb-4">
              Habilidades
            </h2>
            <p className="text-h2 text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
              Competências técnicas e comportamentais desenvolvidas ao longo da minha jornada em QA
            </p>
          </AnimatedSection>
        </div>

        {/* Technical Skills */}
        <div className="col-span-12 lg:col-span-6">
          <AnimatedSection animation="slide-up" delay={1}>
            <h3 className="text-h1 font-poppins text-neutral-900 dark:text-white mb-8 text-center">
              Habilidades Técnicas
            </h3>
            <div className="space-y-4">
              {technicalSkills.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} delay={index * 200} />
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Soft Skills */}
        <div className="col-span-12 lg:col-span-6">
          <AnimatedSection animation="slide-up" delay={2}>
            <h3 className="text-h1 font-poppins text-neutral-900 dark:text-white mb-8 text-center">
              Soft Skills
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {softSkills.map((skill, index) => (
                <SkillBadge key={skill.name} skill={skill} delay={index + 3} />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Skills;