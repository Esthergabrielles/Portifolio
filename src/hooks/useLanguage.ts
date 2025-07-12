import { useState, useEffect } from 'react';
import { translations } from '../data/translations'; // ajuste o caminho se necessário

export type Language = 'pt' | 'en';

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language');
      return (saved as Language) || 'pt';
    }
    return 'pt';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'pt' ? 'en' : 'pt'));
  };

  const t = (key: string): string => {
    return translations[language]?.[key] ?? key;
  };

  return { language, toggleLanguage, t };
};
