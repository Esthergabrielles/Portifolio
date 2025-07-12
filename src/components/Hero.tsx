import React, { useEffect, useState } from 'react';
import { ChevronDown, Download, Mail, MapPin, Phone, Sparkles, Star, Zap, ArrowRight, Play, Heart, Award, Target } from 'lucide-react';
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
      <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dots opacity-30"></div>
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
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 bg-pattern-dots opacity-20 dark:opacity-10" />
        
        {/* Premium Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary-400/20 to-accent-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-accent-400/20 to-primary-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
        
        {/* Additional Floating Elements */}
        <motion.div
          className="absolute top-1/3 right-1/3 w-64 h-64 bg-gradient-to-r from-emerald-400/15 to-blue-400/15 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Floating QA Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary-200/40 dark:text-primary-800/40 text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-30, 30, -30],
              opacity: [0.1, 0.4, 0.1],
              rotate: [0, 180, 360],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: 6 + Math.random() * 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3,
            }}
          >
            {['🔍', '🐛', '⚡', '🎯', '📋', '✅', '🚀', '💎', '🔧', '📊', '🛡️', '⭐'][Math.floor(Math.random() * 12)]}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-6xl mx-auto">
          {/* Profile Section */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Premium Profile Image */}
            <motion.div
              className="relative inline-block mb-12"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring", bounce: 0.4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 rounded-full blur-2xl opacity-60 animate-pulse-glow"></div>
              <motion.div
                className="relative w-56 h-56 rounded-full overflow-hidden shadow-2xl border-4 border-white/30 dark:border-slate-800/30 backdrop-blur-sm"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={personalInfo?.profile_image || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'}
                  alt={personalInfo?.name || 'Esther Gabrielle'}
                  className="w-full h-full object-cover"
                  key={personalInfo?.profile_image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-500/20 via-transparent to-transparent"></div>
              </motion.div>
              
              {/* Status Badge */}
              <motion.div
                className="absolute -bottom-6 -right-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 1, type: "spring", bounce: 0.6 }}
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
              transition={{ duration: 1, delay: 0.6 }}
              className="mb-12"
            >
              <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-poppins font-bold mb-8 leading-tight">
                Olá, sou a{' '}
                <span className="text-gradient bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600 bg-clip-text text-transparent animate-gradient-x">
                  {personalInfo?.name?.split(' ')[0] || 'Esther'}
                </span>
              </h1>
              
              <div className="text-4xl md:text-5xl lg:text-6xl font-poppins font-semibold text-slate-700 dark:text-slate-300 mb-10">
                <span className="text-primary-600 dark:text-primary-400">
                  {typedText}
                </span>
                <motion.span
                  className="inline-block w-1 h-16 bg-primary-500 ml-3"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <br />
                <span className="text-accent-600 dark:text-accent-400 text-3xl md:text-4xl lg:text-5xl">
                  especializada em qualidade
                </span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mb-16"
            >
              <PremiumCard 
                variant="glass" 
                padding="xl" 
                className="max-w-5xl mx-auto backdrop-blur-premium"
                animated={true}
              >
                <p className="text-2xl md:text-3xl text-slate-700 dark:text-slate-300 leading-relaxed font-inter">
                  {personalInfo?.description || 'Iniciando minha carreira em QA com paixão por encontrar bugs e garantir qualidade. Sempre em busca de aprender e crescer na área de tecnologia.'}
                </p>
              </PremiumCard>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="flex flex-col sm:flex-row gap-8 justify-center mb-20"
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
              transition={{ duration: 1, delay: 1.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20"
            >
              {[
                { 
                  icon: Star, 
                  label: 'Projetos de Estudo', 
                  value: '5+', 
                  color: 'from-blue-500 to-cyan-500',
                  description: 'Projetos práticos desenvolvidos',
                  bgPattern: 'bg-pattern-dots'
                },
                { 
                  icon: Zap, 
                  label: 'Progresso QA Bootcamp', 
                  value: '93%', 
                  color: 'from-emerald-500 to-teal-500',
                  description: 'Dedicação aos estudos',
                  bgPattern: 'bg-pattern-grid'
                },
                { 
                  icon: Sparkles, 
                  label: 'Certificações', 
                  value: '15+', 
                  color: 'from-purple-500 to-pink-500',
                  description: 'Certificados conquistados',
                  bgPattern: 'bg-pattern-diagonal'
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.4 + index * 0.2 }}
                >
                  <PremiumCard 
                    variant="glass" 
                    padding="xl" 
                    interactive={true}
                    glow={true}
                    className="text-center group relative overflow-hidden backdrop-blur-premium"
                  >
                    <div className={`absolute inset-0 ${stat.bgPattern} opacity-5`}></div>
                    <div className={`bg-gradient-to-r ${stat.color} w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-500 relative z-10`}>
                      <stat.icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-3 font-poppins relative z-10">
                      {stat.value}
                    </h3>
                    <p className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-3 font-inter relative z-10">
                      {stat.label}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-inter relative z-10">
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
              transition={{ duration: 1, delay: 1.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-10 text-slate-600 dark:text-slate-400 mb-20"
            >
              {[
                { icon: MapPin, text: personalInfo?.location || 'Santa Bárbara d\'Oeste, SP', color: 'from-blue-500 to-blue-600' },
                { icon: Phone, text: personalInfo?.phone || '(19) 98926-1419', color: 'from-green-500 to-green-600' },
                { icon: Mail, text: personalInfo?.email || 'esthergabriellesouza@gmail.com', color: 'from-purple-500 to-purple-600' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4 group cursor-pointer"
                  whileHover={{ scale: 1.05, y: -3 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`p-4 bg-gradient-to-r ${item.color} rounded-2xl group-hover:shadow-xl transition-all duration-300 shadow-lg`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-inter font-medium text-lg group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
              className="flex flex-col items-center"
            >
              <p className="text-slate-500 dark:text-slate-400 font-inter mb-8 text-xl">
                Explore meu portfólio
              </p>
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="cursor-pointer group"
                onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <div className="p-5 glass rounded-full group-hover:bg-primary-50/80 dark:group-hover:bg-primary-950/80 transition-all duration-300 group-hover:scale-110 shadow-xl backdrop-blur-premium">
                  <ChevronDown className="w-10 h-10 text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors duration-300" />
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