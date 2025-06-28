import React, { useState, useEffect } from 'react';
import { useDarkMode } from './hooks/useDarkMode';
import { useLanguage } from './hooks/useLanguage';
import WelcomeScreen from './components/WelcomeScreen';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Process from './components/Process';
import Skills from './components/Skills';
import Courses from './components/Courses';
import Certificates from './components/Certificates';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import BackToTop from './components/BackToTop';
import LoadingScreen from './components/LoadingScreen';
import InteractiveElements from './components/InteractiveElements';
import { t } from './data/translations';

function App() {
  const { isDark, toggleDarkMode } = useDarkMode();
  const { language } = useLanguage();
  const [showWelcome, setShowWelcome] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      {/* Welcome Screen */}
      {showWelcome && <WelcomeScreen onComplete={handleWelcomeComplete} />}
      
      {/* Main Portfolio Content */}
      <div className={`min-h-screen transition-all duration-1000 ${isDark ? 'dark' : ''} ${showWelcome ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        <Header isDark={isDark} toggleDarkMode={toggleDarkMode} />
        <Hero />
        <About />
        <Projects />
        <Process />
        <Skills />
        <Courses />
        <Certificates />
        <Achievements />
        <Contact />
        <BackToTop />
        <InteractiveElements />
        
        {/* Premium Footer */}
        <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white section-spacing relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(99,102,241,0.1),transparent_50%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(99,102,241,0.03)_49%,rgba(99,102,241,0.03)_51%,transparent_52%)] bg-[length:20px_20px]" />
          </div>
          
          <div className="container-12 relative z-10">
            <div className="col-span-12 text-center">
              <div className="mb-12">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white w-20 h-20 rounded-3xl flex items-center justify-center font-poppins font-bold text-3xl mx-auto mb-8 shadow-2xl">
                  EG
                </div>
                <h3 className="text-3xl font-poppins font-bold mb-6">Esther Gabrielle</h3>
                <p className="text-slate-300 font-inter text-xl max-w-3xl mx-auto leading-relaxed mb-8">
                  {t('footerDescription', language)}
                </p>
                
                {/* Social Links */}
                <div className="flex justify-center gap-6 mb-12">
                  {[
                    { name: 'LinkedIn', href: 'https://linkedin.com/in/esthergabrielle', icon: '💼' },
                    { name: 'GitHub', href: 'https://github.com/Esthergabrielles', icon: '🔗' },
                    { name: 'Email', href: 'mailto:esthergabriellesouza@gmail.com', icon: '📧' }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target={social.href.startsWith('http') ? '_blank' : undefined}
                      rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="w-12 h-12 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl flex items-center justify-center text-xl hover:bg-indigo-500 hover:border-indigo-400 transition-all duration-300 hover:scale-110"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-slate-700 pt-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-slate-400 font-inter">
                    © 2024 Esther Gabrielle. {t('allRightsReserved', language)}
                  </p>
                  <p className="text-slate-400 font-inter">
                    {t('developedWith', language)} <span className="text-red-400">❤️</span> {t('attentionToDetail', language)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;