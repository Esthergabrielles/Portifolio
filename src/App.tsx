import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDarkMode } from './hooks/useDarkMode';
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
import AdminRoute from './components/AdminRoute';
import Footer from './components/Footer';
import DarkModeToggle from './components/DarkModeToggle';
import InteractiveElements from './components/InteractiveElements';

function App() {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <Router>
      {/* Interactive Elements (Easter Eggs) */}
      <InteractiveElements />
      
      {/* Floating Dark Mode Toggle */}
      <DarkModeToggle 
        isDark={isDark} 
        toggle={toggleDarkMode} 
        variant="floating" 
        size="lg" 
      />
      
      <Routes>
        {/* Rota Administrativa */}
        <Route path="/admin" element={<AdminRoute />} />
        
        {/* Rota Principal do Portfólio */}
        <Route path="/" element={
          <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
            <Header />
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
            <Footer />
          </div>
        } />
        
        {/* Redirect para home se rota não encontrada */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;