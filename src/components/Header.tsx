import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { useDarkMode } from '../hooks/useDarkMode';
import PremiumLogo from './PremiumLogo';
import PremiumButton from './PremiumButton';
import DarkModeToggle from './DarkModeToggle';

const menuItems = [
  { href: '#about', label: 'Sobre', id: 'about' },
  { href: '#projects', label: 'Projetos', id: 'projects' },
  { href: '#skills', label: 'Habilidades', id: 'skills' },
  { href: '#courses', label: 'Cursos', id: 'courses' },
  { href: '#certificates', label: 'Certificados', id: 'certificates' },
  { href: '#contact', label: 'Contato', id: 'contact' }
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 50;
  const { isDark, toggleDarkMode } = useDarkMode();

  const handleMenuClick = (href: string, id: string) => {
    setIsMenuOpen(false);
    setActiveSection(id);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = href;
    }
  };

  const handleLogoClick = () => {
    setActiveSection('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const current = menuItems.find(item => {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      setActiveSection(current?.id || 'home');
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700 shadow-lg'
            : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm'
        }`}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-20 px-6">
            <motion.div
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <PremiumLogo size="md" onClick={handleLogoClick} animated={true} />
            </motion.div>

            <nav className="hidden lg:flex items-center space-x-2">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.href}
                  onClick={() => handleMenuClick(item.href, item.id)}
                  className={`relative px-6 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 shadow-md ring-1 ring-primary-400/30'
                      : 'text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -2, scale: 1.02 }}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute bottom-1 left-1/2 w-2 h-2 bg-primary-500 rounded-full shadow-lg"
                      layoutId="activeIndicator"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      style={{ x: '-50%' }}
                    />
                  )}
                </motion.button>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <DarkModeToggle isDark={isDark} toggle={toggleDarkMode} variant="premium" size="md" />
              <div className="hidden md:block">
                <PremiumButton
                  variant="gradient"
                  size="md"
                  icon={Sparkles}
                  glow={true}
                  onClick={() => handleMenuClick('#contact', 'contact')}
                >
                  Contrate-me
                </PremiumButton>
              </div>
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden relative p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 group overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-navigation"
              >
                <motion.div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-accent-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10"
                    >
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10"
                    >
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-navigation"
            role="menu"
            initial={{ clipPath: 'circle(0% at 90% 10%)' }}
            animate={{ clipPath: 'circle(150% at 90% 10%)' }}
            exit={{ clipPath: 'circle(0% at 90% 10%)' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="lg:hidden fixed inset-0 top-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg z-40 border-t border-slate-200 dark:border-slate-700"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="p-8 space-y-3"
            >
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.href}
                  onClick={() => handleMenuClick(item.href, item.id)}
                  className={`block w-full text-left px-8 py-5 text-xl font-medium rounded-2xl transition-all duration-300 group ${
                    activeSection === item.id
                      ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 shadow-lg'
                      : 'text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeSection === item.id
                        ? 'bg-primary-500 scale-100'
                        : 'bg-slate-300 dark:bg-slate-600 scale-0 group-hover:scale-100'
                    }`} />
                    {item.label}
                  </div>
                </motion.button>
              ))}

              <motion.div
                className="pt-8"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <PremiumButton
                  variant="gradient"
                  size="lg"
                  icon={Sparkles}
                  fullWidth={true}
                  glow={true}
                  onClick={() => handleMenuClick('#contact', 'contact')}
                >
                  Contrate-me
                </PremiumButton>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
