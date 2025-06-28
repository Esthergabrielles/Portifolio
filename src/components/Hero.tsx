import React from 'react';
import { ArrowRight, Download } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const Hero: React.FC = () => {
  const handleContactClick = () => {
    const element = document.querySelector('#contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 pt-16 section-spacing">
      <div className="container-12">
        <div className="col-span-12 text-center">
          {/* Profile Image */}
          <AnimatedSection animation="scale-in" className="element-spacing">
            <div className="relative mx-auto w-48 h-48 mb-8">
              <img
                src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"
                alt="Esther Souza"
                className="w-full h-full object-cover rounded-full shadow-2xl hover:scale-105 transition-transform duration-300 will-change-transform"
                loading="eager"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary-500/20 to-transparent"></div>
            </div>
          </AnimatedSection>

          {/* Text Content */}
          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="slide-up" delay={1} className="element-spacing">
              <h1 className="text-display font-poppins text-neutral-900 dark:text-white mb-6">
                Olá, sou a{' '}
                <span className="text-primary-500">Esther Souza</span>
              </h1>
            </AnimatedSection>
            
            <AnimatedSection animation="slide-up" delay={2} className="element-spacing">
              <p className="text-h1 text-neutral-600 dark:text-neutral-300 mb-8 leading-relaxed">
                QA Engineer especializada em garantir{' '}
                <span className="text-primary-500 font-semibold">excelência</span>{' '}
                em produtos digitais
              </p>
            </AnimatedSection>

            <AnimatedSection animation="slide-up" delay={3} className="element-spacing">
              <p className="text-body text-neutral-500 dark:text-neutral-400 mb-12 max-w-2xl mx-auto">
                Transicionei minha carreira para tecnologia através da Mate Academy, 
                combinando experiência em atendimento ao cliente com expertise técnica 
                em testes de software para entregar produtos de qualidade excepcional.
              </p>
            </AnimatedSection>

            {/* CTA Buttons */}
            <AnimatedSection animation="slide-up" delay={4}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={handleContactClick}
                  className="group bg-primary-500 text-white px-8 py-4 rounded-lg hover:bg-primary-600 transition-all duration-300 font-inter font-medium text-body shadow-lg hover:shadow-xl flex items-center gap-2 hover-lift will-change-transform"
                >
                  Entre em Contato
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                
                <button className="group glass-card text-neutral-700 dark:text-neutral-300 px-8 py-4 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300 font-inter font-medium text-body flex items-center gap-2 hover-lift will-change-transform">
                  Download CV
                  <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
                </button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;