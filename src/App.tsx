import React, { useState } from 'react';
import { useDarkMode } from './hooks/useDarkMode';
import WelcomeScreen from './components/WelcomeScreen';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import BackToTop from './components/BackToTop';

function App() {
  const { isDark, toggleDarkMode } = useDarkMode();
  const [showWelcome, setShowWelcome] = useState(true);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
  };

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
        <Skills />
        <Certificates />
        <Contact />
        <BackToTop />
        
        {/* Enhanced Footer */}
        <footer className="bg-gradient-to-br from-neutral-900 via-black to-neutral-800 text-white section-spacing relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(47,128,237,0.1),transparent_50%)]" />
          </div>
          
          <div className="container-12 relative z-10">
            <div className="col-span-12 text-center">
              <div className="mb-8">
                <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center font-poppins font-bold text-2xl mx-auto mb-6 shadow-2xl">
                  ES
                </div>
                <h3 className="text-2xl font-poppins font-bold mb-4">Esther Souza</h3>
                <p className="text-neutral-400 font-inter text-lg max-w-2xl mx-auto leading-relaxed">
                  QA Engineer dedicada a garantir excelência em produtos digitais através de 
                  testes rigorosos e metodologias ágeis.
                </p>
              </div>
              
              <div className="border-t border-neutral-700 pt-8">
                <p className="text-neutral-400 font-inter">
                  © 2024 Esther Souza. Desenvolvido com ❤️ e atenção aos detalhes. 
                  <br className="sm:hidden" />
                  <span className="text-primary-400 font-medium">Qualidade em cada pixel.</span>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;