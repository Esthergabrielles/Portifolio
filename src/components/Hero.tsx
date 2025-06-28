import React from 'react';
import { ArrowRight, Download, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const Hero: React.FC = () => {
  const handleContactClick = () => {
    const element = document.querySelector('#contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-black pt-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(47,128,237,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(47,128,237,0.05)_49%,rgba(47,128,237,0.05)_51%,transparent_52%)] bg-[length:20px_20px]" />
      </div>

      <div className="container-12 relative z-10">
        <div className="col-span-12 text-center">
          {/* Profile Image */}
          <AnimatedSection animation="scale-in" className="element-spacing">
            <motion.div 
              className="relative mx-auto w-48 h-48 mb-12"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary-400 to-primary-600 p-1">
                <img
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"
                  alt="Esther Souza"
                  className="w-full h-full object-cover rounded-full"
                  loading="eager"
                />
              </div>
              <motion.div
                className="absolute -top-2 -right-2 w-8 h-8 bg-primary-400 rounded-full flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4 text-white" />
              </motion.div>
            </motion.div>
          </AnimatedSection>

          {/* Text Content */}
          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="slide-up" delay={1} className="element-spacing">
              <motion.h1 
                className="font-poppins text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Olá, sou a{' '}
                <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                  Esther
                </span>
              </motion.h1>
            </AnimatedSection>
            
            <AnimatedSection animation="slide-up" delay={2} className="element-spacing">
              <motion.p 
                className="text-2xl md:text-3xl text-neutral-300 mb-8 leading-relaxed font-inter"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                QA Engineer especializada em garantir{' '}
                <span className="text-primary-400 font-semibold">excelência</span>{' '}
                em produtos digitais
              </motion.p>
            </AnimatedSection>

            <AnimatedSection animation="slide-up" delay={3} className="element-spacing">
              <motion.p 
                className="text-lg text-neutral-400 mb-12 max-w-2xl mx-auto font-inter leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Transicionei minha carreira para tecnologia através da Mate Academy, 
                combinando experiência em atendimento ao cliente com expertise técnica 
                em testes de software para entregar produtos de qualidade excepcional.
              </motion.p>
            </AnimatedSection>

            {/* CTA Buttons */}
            <AnimatedSection animation="slide-up" delay={4}>
              <motion.div 
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <motion.button
                  onClick={handleContactClick}
                  className="group relative bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-xl font-inter font-semibold text-lg shadow-xl flex items-center gap-3 overflow-hidden"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="relative z-10">Entre em Contato</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
                
                <motion.button 
                  className="group relative bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 text-neutral-300 px-8 py-4 rounded-xl font-inter font-semibold text-lg flex items-center gap-3 overflow-hidden"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="relative z-10">Download CV</span>
                  <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300 relative z-10" />
                  <motion.div
                    className="absolute inset-0 bg-neutral-700/30"
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

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary-400/20 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;