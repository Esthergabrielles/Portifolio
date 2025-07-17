import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-in' | 'slide-up' | 'scale-in';
  delay?: number;
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
  const delayClass = delay > 0 ? `animate-stagger-${Math.min(delay, 4)}` : '';

  return (
    <div
      ref={ref}
      className={`${animationClass} ${delayClass} ${className}`}
      style={{ animationDelay: delay > 4 ? `${delay * 0.2}s` : undefined }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;