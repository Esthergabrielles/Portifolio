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
      <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark' : ''} ${showWelcome ? 'opacity-0' : 'opacity-100'} transition-opacity duration-1000`}>
        <Header isDark={isDark} toggleDarkMode={toggleDarkMode} />
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Certificates />
        <Contact />
        <BackToTop />
        
        {/* Footer */}
        <footer className="bg-neutral-900 dark:bg-black text-white section-spacing">
          <div className="container-12">
            <div className="col-span-12 text-center">
              <p className="text-neutral-400 font-inter">
                © 2024 Esther Souza. Desenvolvido com ❤️ para demonstrar qualidade em cada detalhe.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;