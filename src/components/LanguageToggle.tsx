import React from 'react';
import { Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { Language } from '../hooks/useLanguage';

interface LanguageToggleProps {
  language: Language;
  toggle: () => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ language, toggle }) => {
  return (
    <motion.button
      onClick={toggle}
      className="relative p-3 rounded-xl bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 text-neutral-300 hover:text-white transition-all duration-300 overflow-hidden group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle language"
      title={language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
    >
      <div className="flex items-center gap-2">
        <Globe className="w-5 h-5" />
        <span className="text-sm font-medium uppercase">
          {language === 'pt' ? 'EN' : 'PT'}
        </span>
      </div>
      
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-green-400/20"
        initial={{ x: '-100%' }}
        whileHover={{ x: 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};

export default LanguageToggle;