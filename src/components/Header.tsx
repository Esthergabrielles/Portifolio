import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { useLanguage } from '../hooks/useLanguage';
import { t } from '../data/translations';
import DarkModeToggle from './DarkModeToggle';
import LanguageToggle from './LanguageToggle';

interface HeaderProps {
  isDark: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDark, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 50;
  const { language, toggleLanguage } = useLanguage();

  const menuItems = [
    { href: '#about', label: t('about', language) },
    { href: '#projects', label: t('projects', language) },
    { href: '#skills', label: t('skills', language) },
    { href: '#courses', label: t('courses', language) },
    { href: '#certificates', label: t('certificates', language) },
    { href: '#contact', label: t('contact', language) }
  ];

  const handleMenuClick = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadCV = () => {
    const cvFile = language === 'en' ? '/cv-esther-gabrielle-en.pdf' : '/cv-esther-gabrielle.pdf';
    const link = document.createElement('a');
    link.href = cvFile;
    link.download = language === 'en' ? 'CV-Esther-Gabrielle-EN.pdf' : 'CV-Esther-Gabrielle.pdf';
    link.click();
  };

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
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled 
          ? 'bg-neutral-900/95 backdrop-blur-lg border-b border-neutral-800 shadow-2xl' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-12">
        <div className="col-span-12 flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white w-14 h-14 rounded-xl flex items-center justify-center font-poppins font-bold text-xl shadow-lg cursor-pointer">
                EG
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-500 rounded-xl blur opacity-30 -z-10" />
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item, index) => (
              <motion.button
                key={item.href}
                onClick={() => handleMenuClick(item.href)}
                className="relative text-neutral-300 hover:text-white transition-colors duration-300 font-inter font-medium text-lg group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {item.label}
                <motion.span 
                  className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <LanguageToggle language={language} toggle={toggleLanguage} />
            <DarkModeToggle isDark={isDark} toggle={toggleDarkMode} />
            <motion.button
              onClick={handleDownloadCV}
              className="hidden md:block relative bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-inter font-semibold shadow-lg overflow-hidden group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <span className="relative z-10">{t('downloadCV', language)}</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
            <motion.button
              onClick={() => handleMenuClick('#contact')}
              className="hidden md:block relative bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl font-inter font-semibold shadow-lg overflow-hidden group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <span className="relative z-10">{t('hireMe', language)}</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            {/* Mobile menu button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 rounded-xl bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 text-neutral-300 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed inset-0 top-20 bg-neutral-900/98 backdrop-blur-lg z-50"
            >
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="p-8 space-y-6"
              >
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.href}
                    onClick={() => handleMenuClick(item.href)}
                    className="block w-full text-left px-6 py-4 text-2xl text-neutral-300 hover:text-white hover:bg-neutral-800/50 rounded-xl transition-all duration-300 font-inter font-medium"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
                <motion.button
                  onClick={handleDownloadCV}
                  className="block w-full text-left px-6 py-4 mt-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-inter font-semibold text-xl"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                >
                  {t('downloadCV', language)}
                </motion.button>
                <motion.button
                  onClick={() => handleMenuClick('#contact')}
                  className="block w-full text-left px-6 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-inter font-semibold text-xl"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                  whileHover={{ scale: 1.02 }}
                >
                  {t('hireMe', language)}
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;