import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import InteractiveElements from './components/InteractiveElements';
import AdminRoute from './components/AdminRoute';
import FeedbackModal from './components/FeedbackModal';

function App() {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  // Detectar quando o usuário está prestes a sair da página
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Verificar se não estamos na rota admin
      if (!window.location.pathname.includes('/admin')) {
        setShowFeedbackModal(true);
        e.preventDefault();
        e.returnValue = '';
      }
    };

    // Detectar tentativa de fechar aba/navegar para outro site
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Detectar mudança de visibilidade da página (usuário mudou de aba)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && !window.location.pathname.includes('/admin')) {
        // Pequeno delay para não interferir com navegação interna
        setTimeout(() => {
          if (document.visibilityState === 'hidden') {
            setShowFeedbackModal(true);
          }
        }, 1000);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <Router>
      <Routes>
        {/* Rota Administrativa */}
        <Route path="/admin" element={<AdminRoute />} />
        
        {/* Rota Principal do Portfólio */}
        <Route path="/" element={
          <div className="min-h-screen">
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
                      Transformando ideias em realidade através de testes de qualidade excepcional. Cada bug encontrado é um problema evitado, cada teste é um passo rumo à perfeição.
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
                        © 2024 Esther Gabrielle. Todos os direitos reservados.
                      </p>
                      <p className="text-slate-400 font-inter">
                        Desenvolvido com <span className="text-red-400">❤️</span> e muita atenção aos detalhes
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </footer>

            {/* Modal de Feedback */}
            <FeedbackModal 
              isOpen={showFeedbackModal} 
              onClose={() => setShowFeedbackModal(false)} 
            />
          </div>
        } />
        
        {/* Redirect para home se rota não encontrada */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;