import React from 'react';
import { Heart, Linkedin, Github, Mail, ExternalLink, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
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
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">
      {/* Premium Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-pattern-grid"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>
      
      <div className="relative z-10 section-spacing">
        <div className="container-12">
          <div className="col-span-12">
            {/* Main Footer Content */}
            <div className="text-center mb-16">
              {/* Premium Logo */}
              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="relative inline-block group">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white w-24 h-24 rounded-3xl flex items-center justify-center font-poppins font-bold text-3xl shadow-premium-xl">
                    {personalInfo?.name ? personalInfo.name.split(' ').map(n => n[0]).join('').slice(0, 2) : 'EG'}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-3xl"
                      animate={{
                        x: [-100, 100],
                        opacity: [0, 0.5, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Name and Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h3 className="text-4xl font-poppins font-bold mb-6 gradient-text">
                  {personalInfo?.name || 'Esther Gabrielle'}
                </h3>
                <p className="text-slate-300 font-inter text-xl max-w-3xl mx-auto leading-relaxed mb-8">
                  {personalInfo?.description || 'Transformando ideias em realidade através de testes de qualidade excepcional. Cada bug encontrado é um problema evitado, cada teste é um passo rumo à perfeição.'}
                </p>
              </motion.div>
              
              {/* Premium Social Links */}
              <motion.div
                className="flex justify-center gap-6 mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {[
                  { 
                    name: 'LinkedIn', 
                    href: 'https://linkedin.com/in/esthergabrielle', 
                    icon: Linkedin,
                    color: 'from-blue-500 to-blue-600',
                    hoverColor: 'hover:from-blue-600 hover:to-blue-700'
                  },
                  { 
                    name: 'GitHub', 
                    href: 'https://github.com/Esthergabrielles', 
                    icon: Github,
                    color: 'from-gray-700 to-gray-800',
                    hoverColor: 'hover:from-gray-800 hover:to-gray-900'
                  },
                  { 
                    name: 'Email', 
                    href: `mailto:${personalInfo?.email || 'esthergabriellesouza@gmail.com'}`, 
                    icon: Mail,
                    color: 'from-emerald-500 to-emerald-600',
                    hoverColor: 'hover:from-emerald-600 hover:to-emerald-700'
                  }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`group relative w-16 h-16 bg-gradient-to-r ${social.color} ${social.hoverColor} rounded-2xl flex items-center justify-center shadow-premium transition-all duration-300 overflow-hidden`}
                    aria-label={social.name}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <social.icon className="w-8 h-8 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
                    {social.href.startsWith('http') && (
                      <ExternalLink className="absolute top-1 right-1 w-3 h-3 text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}
                  </motion.a>
                ))}
              </motion.div>
            </div>
            
            {/* Premium Divider */}
            <motion.div
              className="w-full h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent mb-12"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            />
            
            {/* Bottom Section */}
            <motion.div
              className="flex flex-col md:flex-row justify-between items-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 text-slate-400 font-inter">
                <span>© 2024 {personalInfo?.name || 'Esther Gabrielle'}. Todos os direitos reservados.</span>
              </div>
              
              <div className="flex items-center gap-2 text-slate-400 font-inter">
                <span>Desenvolvido com</span>
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Heart className="w-5 h-5 text-red-400 fill-current" />
                </motion.div>
                <span>e muita atenção aos detalhes</span>
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                </motion.div>
              </div>
            </motion.div>

            {/* Premium Back to Top */}
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              viewport={{ once: true }}
            >
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-2xl font-inter font-medium hover:bg-white/20 transition-all duration-300"
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ↑
                </motion.div>
                <span>Voltar ao topo</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;