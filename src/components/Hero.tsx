import React, { useEffect, useState } from 'react';
import { ChevronDown, Download, Mail, MapPin, Phone, Play, Sparkles, Star, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioData } from '../hooks/usePortfolioData';
import PremiumButton from './PremiumButton';
import PremiumCard from './PremiumCard';
import PremiumLoadingSpinner from './PremiumLoadingSpinner';

const Hero: React.FC = () => {
  const { data: portfolioData, loading } = usePortfolioData();
  const [typedText, setTypedText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  const phrases = [
    'QA Tester Júnior',
    'Especialista em Testes',
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
      <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden">
        {/* Premium Background Pattern */}
        <div className="absolute inset-0 bg-pattern-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-accent-500/5" />
        
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
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-32">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
      <div className="absolute inset-0 bg-pattern-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-accent-500/5" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="container-12 relative z-10">
        <div className="col-span-12">
          {/* Main Content */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Profile Image - Premium Design */}
            <motion.div
              className="relative inline-block mb-16"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.3, type: "spring", bounce: 0.4 }}
            >
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full blur-2xl opacity-30 scale-110" />
                
                {/* Main Image Container */}
                <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-premium border-4 border-white/50 dark:border-slate-800/50 backdrop-blur-sm">
                  <img
                    src={personalInfo?.profile_image || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'}
                    alt={personalInfo?.name || 'Esther Gabrielle'}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-500/20 to-transparent" />
                </div>
                
                {/* Floating Icons */}
                {[Sparkles, Star, Zap].map((Icon, index) => (
                  <motion.div
                    key={index}
                    className="absolute w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center shadow-lg"
                    style={{
                      top: `${20 + index * 30}%`,
                      right: index % 2 === 0 ? '-10px' : 'auto',
                      left: index % 2 === 1 ? '-10px' : 'auto',
                    }}
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3 + index,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Name and Title - Premium Typography */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mb-16"
            >
              <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-poppins font-black mb-8 leading-none">
                <span className="block">
                  {personalInfo?.name?.split(' ')[0] || 'Esther'}
                </span>
                <span className="block gradient-text">
                  {personalInfo?.name?.split(' ')[1] || 'Gabrielle'}
                </span>
              </h1>
              
              <div className="text-3xl md:text-4xl lg:text-5xl font-poppins font-bold text-slate-600 dark:text-slate-300 mb-8">
                <span className="gradient-text">
                  {typedText}
                </span>
                <motion.span
                  className="inline-block w-1 h-12 bg-gradient-to-b from-primary-500 to-accent-500 ml-3 rounded-full"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>
            </motion.div>

            {/* Description - Premium Styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mb-20"
            >
              <PremiumCard
                variant="glass"
                padding="xl"
                className="max-w-5xl mx-auto"
              >
                <p className="text-xl md:text-2xl lg:text-3xl text-slate-700 dark:text-slate-300 leading-relaxed font-inter">
                  {personalInfo?.description || 'Iniciando minha carreira em QA com paixão por encontrar bugs e garantir qualidade. Sempre em busca de aprender e crescer na área de tecnologia.'}
                </p>
              </PremiumCard>
            </motion.div>

            {/* Action Buttons - Premium Design */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="flex flex-col sm:flex-row gap-8 justify-center mb-24"
            >
              <PremiumButton
                variant="gradient"
                size="xl"
                icon={Mail}
                onClick={handleContact}
                glow={true}
                animated={true}
              >
                Vamos Conversar
              </PremiumButton>
              
              <PremiumButton
                variant="outline"
                size="xl"
                icon={Download}
                onClick={handleDownloadCV}
                animated={true}
              >
                Download CV
              </PremiumButton>

              <PremiumButton
                variant="ghost"
                size="xl"
                icon={Play}
                onClick={handleWatchDemo}
                animated={true}
              >
                Ver Projetos
              </PremiumButton>
            </motion.div>

            {/* Stats - Premium Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
            >
              {[
                { 
                  label: 'Projetos de Estudo', 
                  value: '5+', 
                  description: 'Projetos práticos desenvolvidos',
                  gradient: 'from-blue-500 to-cyan-500'
                },
                { 
                  label: 'Progresso QA Bootcamp', 
                  value: '93%', 
                  description: 'Dedicação aos estudos',
                  gradient: 'from-purple-500 to-pink-500'
                },
                { 
                  label: 'Certificações', 
                  value: '15+', 
                  description: 'Certificados conquistados',
                  gradient: 'from-green-500 to-emerald-500'
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.4 + index * 0.2 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <PremiumCard 
                    variant="premium" 
                    padding="xl" 
                    className="text-center group cursor-pointer"
                    interactive={true}
                    animated={true}
                  >
                    <div className={`w-20 h-20 bg-gradient-to-r ${stat.gradient} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-premium group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-3xl font-bold text-white">{stat.value}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 font-poppins">
                      {stat.label}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 font-inter">
                      {stat.description}
                    </p>
                  </PremiumCard>
                </motion.div>
              ))}
            </motion.div>

            {/* Contact Info - Premium Layout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.8 }}
              className="mb-24"
            >
              <PremiumCard
                variant="glass"
                padding="xl"
                className="max-w-4xl mx-auto"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { icon: MapPin, text: personalInfo?.location || 'Santa Bárbara d\'Oeste, SP', gradient: 'from-red-500 to-pink-500' },
                    { icon: Phone, text: personalInfo?.phone || '(19) 98926-1419', gradient: 'from-green-500 to-emerald-500' },
                    { icon: Mail, text: personalInfo?.email || 'esthergabriellesouza@gmail.com', gradient: 'from-blue-500 to-cyan-500' }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex flex-col items-center text-center group cursor-pointer"
                      whileHover={{ scale: 1.05, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={`w-16 h-16 bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                        <item.icon className="w-8 h-8 text-white" />
                      </div>
                      <span className="font-inter font-semibold text-lg text-slate-700 dark:text-slate-300">
                        {item.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </PremiumCard>
            </motion.div>

            {/* Scroll Indicator - Premium Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
              className="flex flex-col items-center"
            >
              <p className="text-slate-500 dark:text-slate-400 font-inter mb-8 text-xl font-medium">
                Explore meu portfólio
              </p>
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="cursor-pointer group"
                onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 rounded-full flex items-center justify-center shadow-premium group-hover:shadow-glow transition-all duration-300 group-hover:scale-110">
                  <ChevronDown className="w-8 h-8 text-white" />
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