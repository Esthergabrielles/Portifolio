import React from 'react';
import { ArrowRight, Sparkles, Award, TrendingUp, Download, ExternalLink, Star, Trophy, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const Hero: React.FC = () => {
  const handleContactClick = () => {
    const element = document.querySelector('#contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadCV = () => {
    // Simular download do CV
    alert('Download do CV iniciado!\n\nEm produção, este seria um arquivo PDF real.');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-indigo-50/30 to-purple-100/30 dark:from-slate-900 dark:via-slate-800 dark:to-black pt-16 overflow-hidden">
      {/* Premium Background Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(99,102,241,0.05)_49%,rgba(99,102,241,0.05)_51%,transparent_52%)] bg-[length:20px_20px]" />
      </div>

      {/* Floating Elements Premium */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-gradient-to-r from-indigo-400/30 to-purple-400/30 rounded-full shadow-lg"
            style={{
              left: `${15 + i * 8}%`,
              top: `${25 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-40, 40, -40],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.4, 0.8],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="container-12 relative z-10">
        <div className="col-span-12 text-center">
          {/* Profile Section Premium */}
          <AnimatedSection animation="scale-in" className="element-spacing">
            <motion.div 
              className="relative mx-auto w-64 h-64 mb-16"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-3 shadow-2xl">
                <div className="w-full h-full rounded-full overflow-hidden bg-white p-2">
                  <img
                    src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop"
                    alt="Esther Gabrielle - QA Professional"
                    className="w-full h-full object-cover rounded-full"
                    loading="eager"
                  />
                </div>
              </div>
              
              {/* Floating Badges Premium */}
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <Award className="w-8 h-8 text-white" />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -left-4 w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-2xl"
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, -180, -360] 
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <Sparkles className="w-7 h-7 text-white" />
              </motion.div>
              
              <motion.div
                className="absolute top-1/2 -right-8 w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-2xl"
                animate={{ 
                  y: [-10, 10, -10],
                  rotate: [0, 180, 360] 
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <Target className="w-6 h-6 text-white" />
              </motion.div>
            </motion.div>
          </AnimatedSection>

          {/* Text Content Premium */}
          <div className="max-w-6xl mx-auto">
            <AnimatedSection animation="slide-up" delay={1} className="element-spacing">
              <motion.div
                className="flex items-center justify-center gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 backdrop-blur-sm border border-emerald-500/30 px-6 py-3 rounded-full shadow-lg">
                  <motion.div 
                    className="w-3 h-3 bg-emerald-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-emerald-700 dark:text-emerald-300 font-inter font-semibold text-lg">
                    Disponível para novos projetos
                  </span>
                </div>
              </motion.div>
              
              <motion.h1 
                className="font-poppins text-6xl md:text-8xl lg:text-9xl font-bold text-slate-800 dark:text-white mb-8 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Olá, sou a{' '}
                <motion.span 
                  className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    backgroundSize: "200% 200%"
                  }}
                >
                  Esther Gabrielle
                </motion.span>
              </motion.h1>
            </AnimatedSection>
            
            <AnimatedSection animation="slide-up" delay={2} className="element-spacing">
              <motion.div
                className="mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl lg:text-6xl text-slate-700 dark:text-slate-300 mb-6 leading-relaxed font-inter font-light">
                  QA Junior especializada em{' '}
                  <motion.span 
                    className="text-indigo-600 dark:text-indigo-400 font-semibold relative"
                    whileHover={{ scale: 1.05 }}
                  >
                    testes de qualidade
                    <motion.div
                      className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1, delay: 1 }}
                    />
                  </motion.span>{' '}
                  e processos organizacionais
                </h2>
                <div className="w-40 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 mx-auto rounded-full" />
              </motion.div>
            </AnimatedSection>

            <AnimatedSection animation="slide-up" delay={3} className="element-spacing">
              <motion.p 
                className="text-2xl md:text-3xl text-slate-600 dark:text-slate-300 mb-16 max-w-4xl mx-auto font-inter leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Iniciando minha carreira em QA com paixão por encontrar bugs e garantir qualidade. 
                Sempre em busca de aprender e crescer na área de tecnologia.
              </motion.p>
            </AnimatedSection>

            {/* Stats Premium */}
            <AnimatedSection animation="slide-up" delay={4} className="element-spacing">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                {[
                  { number: '5+', label: 'Projetos de Estudo', icon: TrendingUp, color: 'from-blue-500 to-blue-600' },
                  { number: '95%', label: 'Dedicação aos Estudos', icon: Award, color: 'from-emerald-500 to-emerald-600' },
                  { number: '1+', label: 'Ano de Aprendizado', icon: Sparkles, color: 'from-purple-500 to-purple-600' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center group"
                    whileHover={{ scale: 1.05, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-3xl p-8 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300 shadow-xl hover:shadow-2xl">
                      <motion.div
                        className={`bg-gradient-to-r ${stat.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl`}
                        whileHover={{ rotate: 10, scale: 1.1 }}
                      >
                        <stat.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3 className="text-4xl font-bold text-slate-800 dark:text-white mb-3 font-poppins">{stat.number}</h3>
                      <p className="text-slate-600 dark:text-slate-300 font-inter text-lg">{stat.label}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatedSection>

            {/* CTA Buttons Premium */}
            <AnimatedSection animation="slide-up" delay={5}>
              <motion.div 
                className="flex flex-col sm:flex-row gap-8 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <motion.button
                  onClick={handleContactClick}
                  className="group relative bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-12 py-6 rounded-2xl font-inter font-bold text-xl shadow-2xl flex items-center gap-4 overflow-hidden hover:shadow-indigo-500/25"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="relative z-10">Vamos Conversar</span>
                  <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>

                <motion.button
                  onClick={handleDownloadCV}
                  className="group relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-12 py-6 rounded-2xl font-inter font-bold text-xl shadow-xl flex items-center gap-4 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <Download className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
                  <span>Download CV</span>
                  <ExternalLink className="w-5 h-5 opacity-60" />
                </motion.button>
              </motion.div>
            </AnimatedSection>

            {/* Scroll Indicator Premium */}
            <AnimatedSection animation="slide-up" delay={6}>
              <motion.div
                className="mt-20 flex flex-col items-center gap-3 text-slate-500 dark:text-slate-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2 }}
              >
                <motion.span 
                  className="text-sm font-inter"
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Explore meu trabalho
                </motion.span>
                <motion.div
                  className="w-6 h-10 border-2 border-slate-400 dark:border-slate-500 rounded-full flex justify-center"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.div
                    className="w-1 h-3 bg-slate-400 dark:bg-slate-500 rounded-full mt-2"
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </motion.div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;