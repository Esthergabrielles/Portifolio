import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useScrollPosition } from '../hooks/useScrollPosition';
import DarkModeToggle from './DarkModeToggle';

interface HeaderProps {
  isDark: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDark, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 50;

  const menuItems = [
    { href: '#about', label: 'Sobre' },
    { href: '#projects', label: 'Projetos' },
    { href: '#skills', label: 'Habilidades' },
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
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'glass-card shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container-12">
        <div className="col-span-12 flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="bg-primary-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-poppins font-bold text-lg hover:scale-105 transition-transform duration-300 cursor-pointer shadow-lg">
              ES
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleMenuClick(item.href)}
                className="text-neutral-700 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300 font-inter font-medium relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <DarkModeToggle isDark={isDark} toggle={toggleDarkMode} />
            <button
              onClick={() => handleMenuClick('#contact')}
              className="hidden md:block bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-all duration-300 font-inter font-medium shadow-lg hover:shadow-xl hover:scale-105"
            >
              Contrate-me
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-lg glass-card hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300 ${isMenuOpen ? 'hamburger-open' : ''}`}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className="hamburger-line w-6 h-0.5 bg-neutral-700 dark:bg-neutral-300 block mb-1"></span>
                <span className="hamburger-line w-6 h-0.5 bg-neutral-700 dark:bg-neutral-300 block mb-1"></span>
                <span className="hamburger-line w-6 h-0.5 bg-neutral-700 dark:bg-neutral-300 block"></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 top-16 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="glass-card h-full w-full animate-fade-in">
              <div className="p-6 space-y-4">
                {menuItems.map((item, index) => (
                  <button
                    key={item.href}
                    onClick={() => handleMenuClick(item.href)}
                    className={`block w-full text-left px-4 py-3 text-neutral-700 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-all duration-300 font-inter font-medium animate-slide-up animate-stagger-${index + 1}`}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => handleMenuClick('#contact')}
                  className="block w-full text-left px-4 py-3 mt-6 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all duration-300 font-inter font-medium animate-slide-up animate-stagger-4"
                >
                  Contrate-me
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;