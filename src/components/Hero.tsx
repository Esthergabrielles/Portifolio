import React, { useEffect, useState } from 'react';
import { ChevronDown, Download, Mail, MapPin, Phone, Sparkles, Star, Zap, ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePortfolioData } from '../hooks/usePortfolioData';
import PremiumButton from './PremiumButton';
import PremiumCard from './PremiumCard';
import PremiumBadge from './PremiumBadge';
import PremiumLoadingSpinner from './PremiumLoadingSpinner';

const Hero: React.FC = () => {
  const { data: portfolioData, loading } = usePortfolioData();
  const [typedText, setTypedText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  const phrases = [
    'QA Tester Júnior',
    'Especialista em Testes',
    'Caçadora de Bugs',
    'Garantia de Qualidade'
  ];

  // Typing animation effect
  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    let currentIndex = 0;
    let isDeleting = false;

    const typeInterval = setInterval(() => {
      if (!isDeleting) {
        setTypedText(currentPhrase.substring(0, currentIndex + 1));
        currentIndex++;
        
        if (currentIndex === currentPhrase.length) {
          setTimeout(() => {
            isDeleting = true;
          }, 2000);
        }
      } else {
        setTypedText(currentPhrase.substring(0, currentIndex - 1));
        currentIndex--;
        
        if (currentIndex === 0) {
          isDeleting = false;
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearInterval(typeInterval);
  }, [currentPhraseIndex]);

  if (loading) {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
        <PremiumLoadingSpinner 
          size="xl" 
          variant="orbit" 
          text="Carregando portfólio..." 
        />
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

  const handleWatchDemo = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 bg-pattern-dots opacity-20 dark:opacity-10" />
        
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary-400/30 to-accent-400/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-accent-400/30 to-primary-400/30 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary-200 dark:text-primary-800 text-2xl"
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

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-6xl mx-auto">
          {/* Profile Section */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Premium Profile Image */}
            <motion.div
              className="relative inline-block mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring", bounce: 0.4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 rounded-full blur-2xl opacity-75 animate-pulse-glow"></div>
              <motion.img
                src={personalInfo?.profile_image || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'}
                alt={personalInfo?.name || 'Esther Gabrielle'}
                className="relative w-48 h-48 rounded-full object-cover shadow-premium-xl border-4 border-white/20 backdrop-blur-sm"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.3 }}
                key={personalInfo?.profile_image}
              />
              
              {/* Status Badge */}
              <motion.div
                className="absolute -bottom-4 -right-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8, type: "spring", bounce: 0.6 }}
              >
                <PremiumBadge 
                  variant="gradient" 
                  size="lg" 
                  icon={Zap}
                  glow={true}
                  animated={true}
                >
                  QA Expert
                </PremiumBadge>
              </motion.div>
            </motion.div>

            {/* Name and Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8"
            >
              <h1 className="text-6xl md:text-8xl font-poppins font-bold text-neutral-900 dark:text-white mb-6 leading-tight">
                Olá, sou a{' '}
                <span className="text-gradient bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600 bg-clip-text text-transparent">
                  {personalInfo?.name?.split(' ')[0] || 'Esther'}
                </span>
              </h1>
              
              <div className="text-3xl md:text-5xl font-poppins font-semibold text-neutral-700 dark:text-neutral-300 mb-8">
                <span className="text-primary-600 dark:text-primary-400">
                  {typedText}
                </span>
                <motion.span
                  className="inline-block w-1 h-12 bg-primary-500 ml-2"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <br />
                <span className="text-accent-600 dark:text-accent-400">especializada em qualidade</span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-12"
            >
              <PremiumCard 
                variant="glass" 
                padding="lg" 
                className="max-w-4xl mx-auto"
                animated={true}
              >
                <p className="text-xl md:text-2xl text-neutral-700 dark:text-neutral-300 leading-relaxed font-inter">
                  {personalInfo?.description || 'Iniciando minha carreira em QA com paixão por encontrar bugs e garantir qualidade. Sempre em busca de aprender e crescer na área de tecnologia.'}
                </p>
              </PremiumCard>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            >
              <PremiumButton
                variant="gradient"
                size="xl"
                icon={Mail}
                glow={true}
                animated={true}
                onClick={handleContact}
              >
                Vamos Conversar
              </PremiumButton>
              
              <PremiumButton
                variant="outline"
                size="xl"
                icon={Download}
                animated={true}
                onClick={handleDownloadCV}
              >
                Download CV
              </PremiumButton>

              <PremiumButton
                variant="ghost"
                size="xl"
                icon={Play}
                animated={true}
                onClick={handleWatchDemo}
              >
                Ver Projetos
              </PremiumButton>
            </motion.div>

            {/* Premium Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            >
              {[
                { 
                  icon: Star, 
                  label: 'Projetos de Estudo', 
                  value: '5+', 
                  color: 'from-blue-500 to-cyan-500',
                  description: 'Projetos práticos desenvolvidos'
                },
                { 
                  icon: Zap, 
                  label: 'Progresso QA Bootcamp', 
                  value: '93%', 
                  color: 'from-emerald-500 to-teal-500',
                  description: 'Dedicação aos estudos'
                },
                { 
                  icon: Sparkles, 
                  label: 'Certificações', 
                  value: '15+', 
                  color: 'from-purple-500 to-pink-500',
                  description: 'Certificados conquistados'
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                >
                  <PremiumCard 
                    variant="glass" 
                    padding="lg" 
                    interactive={true}
                    glow={true}
                    className="text-center group"
                  >
                    <div className={`bg-gradient-to-r ${stat.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2 font-poppins">
                      {stat.value}
                    </h3>
                    <p className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 mb-2 font-inter">
                      {stat.label}
                    </p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 font-inter">
                      {stat.description}
                    </p>
                  </PremiumCard>
                </motion.div>
              ))}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-8 text-neutral-600 dark:text-neutral-400 mb-16"
            >
              {[
                { icon: MapPin, text: personalInfo?.location || 'Santa Bárbara d\'Oeste, SP' },
                { icon: Phone, text: personalInfo?.phone || '(19) 98926-1419' },
                { icon: Mail, text: personalInfo?.email || 'esthergabriellesouza@gmail.com' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 group cursor-pointer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-3 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-xl group-hover:bg-primary-50 dark:group-hover:bg-primary-950 transition-colors duration-300 shadow-lg">
                    <item.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <span className="font-inter font-medium group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="flex flex-col items-center"
            >
              <p className="text-neutral-500 dark:text-neutral-400 font-inter mb-6 text-lg">
                Explore meu portfólio
              </p>
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="cursor-pointer group"
                onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <div className="p-4 glass rounded-full group-hover:bg-primary-50 dark:group-hover:bg-primary-950 transition-all duration-300 group-hover:scale-110 shadow-lg">
                  <ChevronDown className="w-8 h-8 text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors duration-300" />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;