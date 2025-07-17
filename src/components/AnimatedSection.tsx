import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-in' | 'slide-up' | 'scale-in';
  delay?: number; // delay em segundos
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  animation = 'slide-up',
  delay = 0,
}) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  const animationClass = isIntersecting ? `animate-${animation}` : 'opacity-0';

  const style = delay > 0 ? { animationDelay: `${delay}s` } : undefined;

  return (
    <div
      ref={ref}
      className={`${animationClass} ${className}`.trim()}
      style={style}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
