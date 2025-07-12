import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { useDarkMode } from '../hooks/useDarkMode';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 50;
  const { isDark, toggleDarkMode } = useDarkMode();

  const menuItems = [
    { href: '#about', label: 'Sobre' },
    { href: '#projects', label: 'Projetos' },
    { href: '#skills', label: 'Habilidades' },
    { href: '#courses', label: 'Cursos' },
    { href: '#certificates', label: 'Certificados' },
    { href: '#contact', label: 'Contato' }
  ];

  const handleMenuClick = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-slate-700/50 shadow-premium' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-12">
        <div className="col-span-12 flex items-center justify-between h-20">
          {/* Premium Logo */}
          <motion.div 
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white w-14 h-14 rounded-3xl flex items-center justify-center font-poppins font-bold text-xl shadow-premium">
                <span className="relative z-10">EG</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-3xl"
                  animate={{
                    x: [-100, 100],
                    opacity: [0, 0.5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2">
            {menuItems.map((item, index) => (
              <motion.button
                key={item.href}
                onClick={() => handleMenuClick(item.href)}
                className="nav-link"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {item.label}
              </motion.button>
            ))}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-3">
            {/* Premium Dark Mode Toggle */}
            <motion.button
              onClick={toggleDarkMode}
              className="relative p-3 rounded-2xl bg-gray-100/80 dark:bg-slate-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-slate-700/50 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 group overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle dark mode"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10"
                  >
                    <Sun className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10"
                  >
                    <Moon className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Premium CTA Button */}
            <motion.button
              onClick={() => handleMenuClick('#contact')}
              className="hidden md:block relative overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-500 bg-size-200 text-white px-6 py-3 rounded-2xl font-inter font-semibold shadow-premium group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Contrate-me
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            {/* Premium Mobile menu button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative p-3 rounded-2xl bg-gray-100/80 dark:bg-slate-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-slate-700/50 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 group overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
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
                    transition={{ duration: 0.2 }}
                    className="relative z-10"
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Premium Mobile Navigation Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed inset-0 top-20 bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl z-40"
            >
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="p-8 space-y-2"
              >
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.href}
                    onClick={() => handleMenuClick(item.href)}
                    className="block w-full text-left px-6 py-4 text-2xl text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-slate-800/50 rounded-2xl transition-all duration-300 font-inter font-medium group"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ x: 10, scale: 1.02 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      {item.label}
                    </div>
                  </motion.button>
                ))}
                
                <motion.button
                  onClick={() => handleMenuClick('#contact')}
                  className="block w-full text-left px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl font-inter font-semibold text-xl mt-6 shadow-premium"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6" />
                    Contrate-me
                  </div>
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