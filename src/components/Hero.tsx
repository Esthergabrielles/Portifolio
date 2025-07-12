import React, { useEffect, useState } from 'react';
import { ChevronDown, Download, Mail, MapPin, Phone, Sparkles, Star, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { usePortfolioData } from '../hooks/usePortfolioData';

const Hero: React.FC = () => {
  const { data: portfolioData } = usePortfolioData();
  const { loading } = usePortfolioData();

  if (loading) {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
        <div className="animate-pulse text-center">
          <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
          <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-2"></div>
          <div className="h-6 bg-gray-300 rounded w-48 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
        </div>
      </section>
    );
  }

  const personalInfo = portfolioData?.personalInfo;

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/cv-esther-gabrielle.pdf';
    link.download = 'CV_Esther_Gabrielle_QA.pdf';
    link.click();
  };

  const handleContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900">
        <div className="absolute inset-0 bg-mesh-gradient opacity-30"></div>
        <div className="absolute inset-0 bg-pattern-dots opacity-20"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/10 text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 180, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          >
            {['🔍', '🐛', '⚡', '🎯', '📋', '✅', '🚀', '💎', '🔧', '📊'][Math.floor(Math.random() * 10)]}
          </motion.div>
        ))}
      </div>

      <div className="container-12 relative z-10">
        <div className="col-span-12 text-center">
          <AnimatedSection animation="slide-up">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Premium Profile Image */}
              <motion.div
                className="mb-12"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-75 animate-pulse-glow"></div>
                  <motion.img
                    src={personalInfo?.profile_image || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'}
                    alt={personalInfo?.name || 'Esther Gabrielle'}
                    className="relative w-48 h-48 rounded-full object-cover shadow-premium-xl border-4 border-white/20 backdrop-blur-sm"
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ duration: 0.3 }}
                    key={personalInfo?.profile_image}
                  />
                  <motion.div
                    className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-premium"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-white font-bold text-lg">QA</span>
                  </motion.div>
                </div>
              </motion.div>

              {/* Premium Name and Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-12"
              >
                <h1 className="text-6xl md:text-8xl font-poppins font-bold text-white mb-6 leading-tight">
                  Olá, sou a{' '}
                  <span className="gradient-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                    {personalInfo?.name || 'Esther Gabrielle'}
                  </span>
                </h1>
                
                <h2 className="text-3xl md:text-5xl font-poppins font-semibold text-white/90 mb-8">
                  <span className="text-yellow-400">{personalInfo?.title || 'QA Junior'}</span> especializada em{' '}
                  <span className="text-pink-400">testes de qualidade</span>
                  <br />
                  e <span className="text-purple-400">processos organizacionais</span>
                </h2>
              </motion.div>

              {/* Premium Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-16 font-inter"
              >
                {personalInfo?.description || 'Iniciando minha carreira em QA com paixão por encontrar bugs e garantir qualidade. Sempre em busca de aprender e crescer na área de tecnologia.'}
              </motion.p>

              {/* Premium Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-6 justify-center mb-20"
              >
                <motion.button
                  onClick={handleContact}
                  className="btn-primary group"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Mail className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                  Vamos Conversar
                  <Sparkles className="w-5 h-5 group-hover:scale-125 transition-transform duration-300" />
                </motion.button>
                
                <motion.button
                  onClick={handleDownloadCV}
                  className="btn-secondary group"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download className="w-6 h-6 group-hover:-translate-y-1 transition-transform duration-300" />
                  Download CV
                </motion.button>
              </motion.div>

              {/* Premium Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
              >
                {[
                  { icon: Star, label: 'Disponível para novos projetos', value: 'Projetos de Estudo', color: 'from-blue-500 to-cyan-500' },
                  { icon: Zap, label: 'Dedicação aos Estudos', value: '93% Progresso QA', color: 'from-emerald-500 to-teal-500' },
                  { icon: Sparkles, label: 'Ano de Aprendizado', value: '2024', color: 'from-purple-500 to-pink-500' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="stat-card group"
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                  >
                    <div className={`stat-icon bg-gradient-to-r ${stat.color}`}>
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="stat-value">
                      {stat.value}
                    </h3>
                    <p className="stat-label">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Premium Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/70 mb-16"
              >
                <div className="flex items-center gap-3 group">
                  <div className="p-2 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors duration-300">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="font-inter">{personalInfo?.location || 'Santa Bárbara d\'Oeste, SP'}</span>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="p-2 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors duration-300">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="font-inter">{personalInfo?.phone || '(19) 98926-1419'}</span>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="p-2 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors duration-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="font-inter">{personalInfo?.email || 'esthergabriellesouza@gmail.com'}</span>
                </div>
              </motion.div>

              {/* Premium Scroll Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.6 }}
                className="flex flex-col items-center"
              >
                <p className="text-white/60 font-inter mb-6 text-lg">Explore meu portfólio</p>
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="cursor-pointer group"
                  onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <div className="p-4 bg-white/10 rounded-full group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                    <ChevronDown className="w-8 h-8 text-white/60 group-hover:text-white transition-colors duration-300" />
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Hero;