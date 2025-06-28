import React from 'react';
import { ArrowRight, Download, Sparkles, Award, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { t } from '../data/translations';
import AnimatedSection from './AnimatedSection';

const Hero: React.FC = () => {
  const { language } = useLanguage();

  const handleContactClick = () => {
    const element = document.querySelector('#contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadCV = () => {
    const cvFile = language === 'en' ? '/cv-esther-gabrielle-en.pdf' : '/cv-esther-gabrielle.pdf';
    const link = document.createElement('a');
    link.href = cvFile;
    link.download = language === 'en' ? 'CV-Esther-Gabrielle-EN.pdf' : 'CV-Esther-Gabrielle.pdf';
    link.click();
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-black pt-16 overflow-hidden">
      {/* Premium Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(99,102,241,0.05)_49%,rgba(99,102,241,0.05)_51%,transparent_52%)] bg-[length:20px_20px]" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-indigo-400/20 rounded-full"
            style={{
              left: `${15 + i * 12}%`,
              top: `${25 + i * 8}%`,
            }}
            animate={{
              y: [-30, 30, -30],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="container-12 relative z-10">
        <div className="col-span-12 text-center">
          {/* Profile Section */}
          <AnimatedSection animation="scale-in" className="element-spacing">
            <motion.div 
              className="relative mx-auto w-56 h-56 mb-12"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-2 shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop"
                  alt="Esther Gabrielle - Technology Professional"
                  className="w-full h-full object-cover rounded-full"
                  loading="eager"
                />
              </div>
              <motion.div
                className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Award className="w-6 h-6 text-white" />
              </motion.div>
              <motion.div
                className="absolute -bottom-3 -left-3 w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360] 
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="w-5 h-5 text-white" />
              </motion.div>
            </motion.div>
          </AnimatedSection>

          {/* Text Content */}
          <div className="max-w-5xl mx-auto">
            <AnimatedSection animation="slide-up" delay={1} className="element-spacing">
              <motion.div
                className="flex items-center justify-center gap-3 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="flex items-center gap-2 bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-emerald-300 font-inter font-medium text-sm">
                    {t('availableForProjects', language)}
                  </span>
                </div>
              </motion.div>
              
              <motion.h1 
                className="font-poppins text-6xl md:text-8xl font-bold text-white mb-8 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {t('hello', language)}{' '}
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Esther Gabrielle
                </span>
              </motion.h1>
            </AnimatedSection>
            
            <AnimatedSection animation="slide-up" delay={2} className="element-spacing">
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl text-slate-200 mb-4 leading-relaxed font-inter font-light">
                  {t('qaSpecialist', language)}{' '}
                  <span className="text-indigo-400 font-semibold">{t('qualityTesting', language)}</span>{' '}
                  {t('organizationalProcesses', language)}
                </h2>
                <div className="w-32 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 mx-auto rounded-full" />
              </motion.div>
            </AnimatedSection>

            <AnimatedSection animation="slide-up" delay={3} className="element-spacing">
              <motion.p 
                className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto font-inter leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                {t('heroDescription', language)}
              </motion.p>
            </AnimatedSection>

            {/* Stats */}
            <AnimatedSection animation="slide-up" delay={4} className="element-spacing">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                {[
                  { number: '5+', label: t('studyProjects', language), icon: TrendingUp },
                  { number: '95%', label: t('dedicationToStudies', language), icon: Award },
                  { number: '1+', label: t('learningYear', language), icon: Sparkles }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-indigo-500/50 transition-all duration-300">
                      <stat.icon className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
                      <h3 className="text-3xl font-bold text-white mb-2 font-poppins">{stat.number}</h3>
                      <p className="text-slate-300 font-inter">{stat.label}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatedSection>

            {/* CTA Buttons */}
            <AnimatedSection animation="slide-up" delay={5}>
              <motion.div 
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <motion.button
                  onClick={handleContactClick}
                  className="group relative bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-10 py-5 rounded-2xl font-inter font-semibold text-lg shadow-2xl flex items-center gap-3 overflow-hidden hover:shadow-indigo-500/25"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="relative z-10">{t('letsChat', language)}</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
                
                <motion.button 
                  onClick={handleDownloadCV}
                  className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 text-slate-200 px-10 py-5 rounded-2xl font-inter font-semibold text-lg flex items-center gap-3 overflow-hidden hover:border-indigo-500/50"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="relative z-10">{t('downloadCV', language)}</span>
                  <Download className="w-6 h-6 group-hover:translate-y-1 transition-transform duration-300 relative z-10" />
                  <motion.div
                    className="absolute inset-0 bg-slate-700/30"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;