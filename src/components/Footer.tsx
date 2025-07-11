import React from 'react';
import { usePortfolioData } from '../hooks/usePortfolioData';

const Footer: React.FC = () => {
  const { data: portfolioData, loading } = usePortfolioData();

  if (loading) {
    return (
      <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white section-spacing relative overflow-hidden">
        <div className="container-12 relative z-10">
          <div className="col-span-12 text-center">
            <div className="animate-pulse">
              <div className="w-20 h-20 bg-gray-600 rounded-3xl mx-auto mb-8"></div>
              <div className="h-8 bg-gray-600 rounded w-64 mx-auto mb-6"></div>
              <div className="h-6 bg-gray-600 rounded w-96 mx-auto mb-8"></div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  const personalInfo = portfolioData?.personalInfo;

  return (
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
              {personalInfo?.name ? personalInfo.name.split(' ').map(n => n[0]).join('').slice(0, 2) : 'EG'}
            </div>
            <h3 className="text-3xl font-poppins font-bold mb-6">
              {personalInfo?.name || 'Esther Gabrielle'}
            </h3>
            <p className="text-slate-300 font-inter text-xl max-w-3xl mx-auto leading-relaxed mb-8">
              {personalInfo?.description || 'Transformando ideias em realidade através de testes de qualidade excepcional. Cada bug encontrado é um problema evitado, cada teste é um passo rumo à perfeição.'}
            </p>
            
            {/* Social Links */}
            <div className="flex justify-center gap-6 mb-12">
              {[
                { name: 'LinkedIn', href: 'https://linkedin.com/in/esthergabrielle', icon: '💼' },
                { name: 'GitHub', href: 'https://github.com/Esthergabrielles', icon: '🔗' },
                { name: 'Email', href: `mailto:${personalInfo?.email || 'esthergabriellesouza@gmail.com'}`, icon: '📧' }
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
                © 2024 {personalInfo?.name || 'Esther Gabrielle'}. Todos os direitos reservados.
              </p>
              <p className="text-slate-400 font-inter">
                Desenvolvido com <span className="text-red-400">❤️</span> e muita atenção aos detalhes
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;