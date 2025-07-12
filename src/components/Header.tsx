import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Sparkles, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { useDarkMode } from '../hooks/useDarkMode';
import PremiumLogo from './PremiumLogo';
import PremiumButton from './PremiumButton';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 50;
  const { isDark, toggleDarkMode } = useDarkMode();

  const menuItems = [
    { href: '#about', label: 'Sobre', id: 'about' },
    { href: '#projects', label: 'Projetos', id: 'projects' },
    { href: '#skills', label: 'Habilidades', id: 'skills' },
    { href: '#courses', label: 'Cursos', id: 'courses' },
    { href: '#certificates', label: 'Certificados', id: 'certificates' },
    { href: '#contact', label: 'Contato', id: 'contact' }
  ];

  const handleMenuClick = (href: string, id: string) => {
    setIsMenuOpen(false);
    setActiveSection(id);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogoClick = () => {
    setActiveSection('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = menuItems.map(item => item.id);
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      } else if (scrollY < 100) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY, menuItems]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'glass border-b border-white/10 shadow-2xl backdrop-blur-premium' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-24 px-6">
            {/* Premium Logo */}
            <motion.div 
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <PremiumLogo 
                size="md" 
                onClick={handleLogoClick}
                animated={true}
              />
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.href}
                  onClick={() => handleMenuClick(item.href, item.id)}
                  className={`relative px-6 py-3 text-sm font-medium rounded-2xl transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-primary-600 dark:text-primary-400 bg-primary-50/80 dark:bg-primary-950/80 shadow-lg backdrop-blur-sm'
                      : 'text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 backdrop-blur-sm'
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -2, scale: 1.02 }}
                >
                  {item.label}
                  
                  {/* Active Indicator */}
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

            {/* Right side controls */}
            <div className="flex items-center space-x-4">
              {/* Premium Dark Mode Toggle */}
              <motion.button
                onClick={toggleDarkMode}
                className="relative p-4 rounded-2xl glass border border-white/10 text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 group overflow-hidden backdrop-blur-premium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle dark mode"
              >
                {/* Background Animation */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-accent-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{
                    background: [
                      'linear-gradient(45deg, rgba(14,165,233,0.1) 0%, rgba(217,70,239,0.1) 100%)',
                      'linear-gradient(225deg, rgba(217,70,239,0.1) 0%, rgba(14,165,233,0.1) 100%)',
                      'linear-gradient(45deg, rgba(14,165,233,0.1) 0%, rgba(217,70,239,0.1) 100%)'
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                <AnimatePresence mode="wait">
                  {isDark ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="relative z-10"
                    >
                      <Sun className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="relative z-10"
                    >
                      <Moon className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Premium CTA Button */}
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

              {/* Premium Mobile menu button */}
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden relative p-4 rounded-2xl glass border border-white/10 text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 group overflow-hidden backdrop-blur-premium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle menu"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-accent-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

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
                      <X className="w-6 h-6" />
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
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Premium Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:hidden fixed inset-0 top-24 glass z-40 backdrop-blur-premium"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="p-8 space-y-3"
            >
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.href}
                  onClick={() => handleMenuClick(item.href, item.id)}
                  className={`block w-full text-left px-8 py-5 text-xl font-medium rounded-3xl transition-all duration-300 group ${
                    activeSection === item.id
                      ? 'text-primary-600 dark:text-primary-400 bg-primary-50/80 dark:bg-primary-950/80 shadow-xl'
                      : 'text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/80'
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