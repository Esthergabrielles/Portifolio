import React from 'react';
import { Award, Users, Target, Lightbulb, MessageCircle, Clock } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const About: React.FC = () => {
  const experiences = [
    {
      icon: Award,
      title: 'Formação Mate Academy',
      description: 'Transição completa para tecnologia com foco em QA Engineering'
    },
    {
      icon: Users,
      title: 'Experiência em Atendimento',
      description: 'Background sólido em relacionamento com clientes e resolução de problemas'
    },
    {
      icon: Target,
      title: 'Foco em Qualidade',
      description: 'Especialização em testes funcionais, automação e performance'
    }
  ];

  const softSkills = [
    'Comunicação Eficaz',
    'Trabalho em Equipe',
    'Pensamento Crítico',
    'Resolução de Problemas',
    'Atenção aos Detalhes',
    'Gerenciamento de Tempo'
  ];

  return (
    <section id="about" className="section-spacing bg-white dark:bg-neutral-900">
      <div className="container-12">
        <div className="col-span-12 text-center element-spacing">
          <AnimatedSection animation="slide-up">
            <h2 className="text-display font-poppins text-neutral-900 dark:text-white mb-4">
              Sobre Mim
            </h2>
            <p className="text-h2 text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
              Uma profissional dedicada que transformou experiência em atendimento ao cliente 
              em expertise técnica em Quality Assurance
            </p>
          </AnimatedSection>
        </div>

        <div className="col-span-12 lg:col-span-6">
          {/* Image */}
          <AnimatedSection animation="scale-in" delay={1}>
            <div className="relative element-spacing">
              <img
                src="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Esther trabalhando"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover hover-lift will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/10 to-transparent rounded-2xl"></div>
            </div>
          </AnimatedSection>
        </div>

        {/* Content */}
        <div className="col-span-12 lg:col-span-6 space-y-8">
          <AnimatedSection animation="slide-up" delay={2}>
            <div className="element-spacing">
              <h3 className="text-h1 font-poppins text-neutral-900 dark:text-white mb-4">
                Minha Jornada Profissional
              </h3>
              <p className="text-body text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
                Após anos trabalhando em atendimento ao cliente, descobri minha paixão por tecnologia 
                e qualidade de software. A transição para QA Engineer através da Mate Academy me 
                permitiu combinar minha experiência em resolver problemas e entender necessidades 
                do usuário com conhecimento técnico em testes de software.
              </p>
              <p className="text-body text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Hoje, utilizo essa combinação única para garantir que produtos digitais não apenas 
                funcionem corretamente, mas também proporcionem uma experiência excepcional aos usuários.
              </p>
            </div>
          </AnimatedSection>

          {/* Experiences */}
          <AnimatedSection animation="slide-up" delay={3}>
            <div className="space-y-6 element-spacing">
              <h4 className="text-h2 font-poppins text-neutral-900 dark:text-white">
                Experiências Principais
              </h4>
              {experiences.map((exp, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-lg glass-card hover-lift transition-all duration-300">
                  <div className="bg-primary-500 text-white p-2 rounded-lg">
                    <exp.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-neutral-900 dark:text-white mb-1 font-inter">
                      {exp.title}
                    </h5>
                    <p className="text-small text-neutral-600 dark:text-neutral-300">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Soft Skills */}
          <AnimatedSection animation="slide-up" delay={4}>
            <div>
              <h4 className="text-h2 font-poppins text-neutral-900 dark:text-white mb-4">
                Soft Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {softSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 glass-card text-primary-700 dark:text-primary-300 rounded-full text-small font-medium hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-all duration-300 hover-lift will-change-transform"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default About;