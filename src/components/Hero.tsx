import React, { useEffect, useState } from 'react';
import { ChevronDown, Download, Mail, MapPin, Phone } from 'lucide-react';
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

  // Usar dados do Supabase
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
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.03)_49%,rgba(255,255,255,0.03)_51%,transparent_52%)] bg-[length:20px_20px]" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
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
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          >
            {['🔍', '🐛', '⚡', '🎯', '📋', '✅', '🚀', '💎'][Math.floor(Math.random() * 8)]}
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
              {/* Profile Image */}
              <motion.div
                className="mb-8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="relative inline-block">
                  <motion.img
                    src={personalInfo?.profile_image || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'}
                    alt={personalInfo?.name || 'Esther Gabrielle'}
                    className="w-40 h-40 rounded-full object-cover shadow-2xl border-4 border-white/20 backdrop-blur-sm"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    key={personalInfo?.profile_image} // Force re-render when image changes
                  />
                  <motion.div
                    className="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-white font-bold text-sm">QA</span>
                  </motion.div>
                </div>
              </motion.div>

              {/* Name and Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-8"
              >
                <h1 className="text-5xl md:text-7xl font-poppins font-bold text-white mb-4 leading-tight">
                  Olá, sou a{' '}
                  <span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                    {personalInfo?.name || 'Esther Gabrielle'}
                  </span>
                </h1>
                
                <h2 className="text-2xl md:text-4xl font-poppins font-semibold text-white/90 mb-6">
                  <span className="text-yellow-400">{personalInfo?.title || 'QA Junior'}</span> especializada em{' '}
                  <span className="text-pink-400">testes de qualidade</span>
                  <br />
                  e <span className="text-purple-400">processos organizacionais</span>
                </h2>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-12 font-inter"
              >
                {personalInfo?.description || 'Iniciando minha carreira em QA com paixão por encontrar bugs e garantir qualidade. Sempre em busca de aprender e crescer na área de tecnologia.'}
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
              >
                <motion.button
                  onClick={handleContact}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-10 py-5 rounded-2xl font-inter font-bold text-lg shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 flex items-center justify-center gap-3"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Mail className="w-6 h-6" />
                  Vamos Conversar
                </motion.button>
                
                <motion.button
                  onClick={handleDownloadCV}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-10 py-5 rounded-2xl font-inter font-bold text-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-3"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download className="w-6 h-6" />
                  Download CV
                </motion.button>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
              >
                {[
                  { icon: '🎯', label: 'Disponível para novos projetos', value: 'Projetos de Estudo' },
                  { icon: '📚', label: 'Dedicação aos Estudos', value: '93% Progresso QA' },
                  { icon: '🚀', label: 'Ano de Aprendizado', value: '2024' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-3xl mb-3">{stat.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-2 font-poppins">
                      {stat.value}
                    </h3>
                    <p className="text-white/70 font-inter">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/70 mb-12"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span className="font-inter">{personalInfo?.location || 'Santa Bárbara d\'Oeste, SP'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  <span className="font-inter">{personalInfo?.phone || '(19) 98926-1419'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  <span className="font-inter">{personalInfo?.email || 'esthergabriellesouza@gmail.com'}</span>
                </div>
              </motion.div>

              {/* Scroll Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="flex flex-col items-center"
              >
                <p className="text-white/60 font-inter mb-4">Explore meu portfólio</p>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="cursor-pointer"
                  onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <ChevronDown className="w-8 h-8 text-white/60 hover:text-white transition-colors duration-300" />
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