import React, { useEffect, useState } from 'react';
import { ChevronDown, Download, Mail, MapPin, Phone, Play } from 'lucide-react';
import { motion } from 'framer-motion';
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
      <section id="home" className="min-h-screen flex items-center justify-center bg-white">
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
    <section id="home" className="min-h-screen flex items-center justify-center bg-white pt-32">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Main Content */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Profile Image - Clean and Simple */}
            <motion.div
              className="relative inline-block mb-12"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring", bounce: 0.4 }}
            >
              <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg border-4 border-white mx-auto">
                <img
                  src={personalInfo?.profile_image || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'}
                  alt={personalInfo?.name || 'Esther Gabrielle'}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Name and Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mb-12"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-poppins font-bold mb-6 leading-tight text-slate-900">
                {personalInfo?.name?.split(' ')[0] || 'Esther'}{' '}
                <span className="text-primary-600">
                  {personalInfo?.name?.split(' ')[1] || 'Gabrielle'}
                </span>
              </h1>
              
              <div className="text-2xl md:text-3xl lg:text-4xl font-poppins font-medium text-slate-600 mb-8">
                <span className="text-primary-600">
                  {typedText}
                </span>
                <motion.span
                  className="inline-block w-1 h-8 bg-primary-500 ml-2"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mb-16"
            >
              <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-inter">
                {personalInfo?.description || 'Iniciando minha carreira em QA com paixão por encontrar bugs e garantir qualidade. Sempre em busca de aprender e crescer na área de tecnologia.'}
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="flex flex-col sm:flex-row gap-6 justify-center mb-20"
            >
              <PremiumButton
                variant="primary"
                size="lg"
                icon={Mail}
                onClick={handleContact}
              >
                Vamos Conversar
              </PremiumButton>
              
              <PremiumButton
                variant="outline"
                size="lg"
                icon={Download}
                onClick={handleDownloadCV}
              >
                Download CV
              </PremiumButton>

              <PremiumButton
                variant="ghost"
                size="lg"
                icon={Play}
                onClick={handleWatchDemo}
              >
                Ver Projetos
              </PremiumButton>
            </motion.div>

            {/* Stats - Clean Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
            >
              {[
                { 
                  label: 'Projetos de Estudo', 
                  value: '5+', 
                  description: 'Projetos práticos desenvolvidos'
                },
                { 
                  label: 'Progresso QA Bootcamp', 
                  value: '93%', 
                  description: 'Dedicação aos estudos'
                },
                { 
                  label: 'Certificações', 
                  value: '15+', 
                  description: 'Certificados conquistados'
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.4 + index * 0.2 }}
                >
                  <PremiumCard 
                    variant="default" 
                    padding="xl" 
                    className="text-center border border-slate-200 hover:border-primary-300 transition-colors duration-300"
                  >
                    <h3 className="text-4xl font-bold text-slate-900 mb-3 font-poppins">
                      {stat.value}
                    </h3>
                    <p className="text-lg font-semibold text-slate-700 mb-2 font-inter">
                      {stat.label}
                    </p>
                    <p className="text-sm text-slate-500 font-inter">
                      {stat.description}
                    </p>
                  </PremiumCard>
                </motion.div>
              ))}
            </motion.div>

            {/* Contact Info - Clean Layout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-8 text-slate-600 mb-20"
            >
              {[
                { icon: MapPin, text: personalInfo?.location || 'Santa Bárbara d\'Oeste, SP' },
                { icon: Phone, text: personalInfo?.phone || '(19) 98926-1419' },
                { icon: Mail, text: personalInfo?.email || 'esthergabriellesouza@gmail.com' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-3 bg-primary-100 rounded-xl">
                    <item.icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <span className="font-inter font-medium text-lg">
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
              <p className="text-slate-500 font-inter mb-6 text-lg">
                Explore meu portfólio
              </p>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="cursor-pointer"
                onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <div className="p-4 bg-slate-100 hover:bg-primary-100 rounded-full transition-colors duration-300">
                  <ChevronDown className="w-6 h-6 text-slate-600" />
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