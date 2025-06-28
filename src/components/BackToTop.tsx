import React from 'react';
import { ChevronUp } from 'lucide-react';
import { useScrollPosition } from '../hooks/useScrollPosition';

const BackToTop: React.FC = () => {
  const scrollY = useScrollPosition();
  const isVisible = scrollY > 400;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`back-to-top ${isVisible ? 'visible' : ''} 
        bg-primary-500 hover:bg-primary-600 text-white 
        w-12 h-12 rounded-full shadow-lg hover:shadow-xl
        flex items-center justify-center
        transition-all duration-300 ease-in-out
        hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
      aria-label="Voltar ao topo"
    >
      <ChevronUp className="w-6 h-6" />
    </button>
  );
};

export default BackToTop;