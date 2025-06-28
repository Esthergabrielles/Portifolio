import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Award, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const Testimonials: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Carlos Silva',
      position: 'CTO',
      company: 'TechCorp Solutions',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      text: 'Esther transformou completamente nossa abordagem de QA. Sua expertise técnica e atenção aos detalhes resultaram em uma redução de 70% nos bugs em produção. Profissional excepcional!',
      project: 'E-commerce Platform',
      result: '70% redução de bugs'
    },
    {
      id: 2,
      name: 'Ana Rodrigues',
      position: 'Product Manager',
      company: 'FinanceBank',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      text: 'A metodologia da Esther é impressionante. Ela não apenas identifica problemas, mas propõe soluções estratégicas. Nosso time de desenvolvimento evoluiu significativamente trabalhando com ela.',
      project: 'Mobile Banking App',
      result: '40% melhoria na performance'
    },
    {
      id: 3,
      name: 'Roberto Santos',
      position: 'Tech Lead',
      company: 'MedTech Solutions',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      text: 'Trabalhar com a Esther foi um divisor de águas. Sua capacidade de automatizar testes complexos e criar frameworks robustos nos permitiu acelerar entregas sem comprometer qualidade.',
      project: 'Healthcare Management System',
      result: '50% redução no tempo de testes'
    },
    {
      id: 4,
      name: 'Mariana Costa',
      position: 'CEO',
      company: 'CloudTech Startup',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      text: 'Esther não é apenas uma QA Engineer, é uma parceira estratégica. Sua visão de produto e expertise técnica foram fundamentais para o sucesso do nosso lançamento.',
      project: 'SaaS Dashboard',
      result: '99.9% uptime alcançado'
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentTestimonial];

  return (
    <section id="testimonials" className="section-spacing bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_48%,rgba(99,102,241,0.03)_49%,rgba(99,102,241,0.03)_51%,transparent_52%)] bg-[length:50px_50px]" />
      </div>

      <div className="container-12 relative z-10">
        <div className="col-span-12 text-center element-spacing">
          <AnimatedSection animation="slide-up">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-poppins font-bold text-slate-900 dark:text-white mb-6">
                O que dizem sobre meu trabalho
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-indigo-400 to-purple-600 mx-auto mb-8 rounded-full" />
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed font-inter">
                Feedback real de clientes e parceiros que confiaram em minha expertise 
                para elevar a qualidade de seus produtos digitais
              </p>
            </motion.div>
          </AnimatedSection>
        </div>

        {/* Stats */}
        <div className="col-span-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Star, label: 'Avaliação Média', value: '5.0/5', color: 'from-yellow-500 to-yellow-600' },
              { icon: Award, label: 'Projetos Concluídos', value: '50+', color: 'from-blue-500 to-blue-600' },
              { icon: TrendingUp, label: 'Taxa de Satisfação', value: '100%', color: 'from-green-500 to-green-600' },
              { icon: Quote, label: 'Recomendações', value: '48', color: 'from-purple-500 to-purple-600' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 p-6 rounded-2xl shadow-lg text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className={`bg-gradient-to-r ${stat.color} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1 font-poppins">
                  {stat.value}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 font-inter text-sm">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main Testimonial */}
        <div className="col-span-12">
          <AnimatedSection animation="scale-in" delay={1}>
            <div className="relative max-w-5xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-12 shadow-2xl border border-slate-200 dark:border-slate-700 relative overflow-hidden"
                >
                  {/* Quote Icon */}
                  <div className="absolute top-8 left-8 w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Quote className="w-8 h-8 text-white" />
                  </div>

                  <div className="pt-8">
                    {/* Rating */}
                    <div className="flex justify-center mb-8">
                      {[...Array(current.rating)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <blockquote className="text-2xl md:text-3xl text-slate-700 dark:text-slate-300 font-inter leading-relaxed text-center mb-12 italic">
                      "{current.text}"
                    </blockquote>

                    {/* Client Info */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                      <div className="flex items-center gap-6">
                        <img
                          src={current.image}
                          alt={current.name}
                          className="w-20 h-20 rounded-full object-cover border-4 border-indigo-200 dark:border-indigo-800 shadow-lg"
                        />
                        <div className="text-center md:text-left">
                          <h4 className="text-xl font-poppins font-bold text-slate-900 dark:text-white">
                            {current.name}
                          </h4>
                          <p className="text-slate-600 dark:text-slate-400 font-inter">
                            {current.position}
                          </p>
                          <p className="text-indigo-600 dark:text-indigo-400 font-inter font-semibold">
                            {current.company}
                          </p>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-2xl border border-indigo-200 dark:border-indigo-800">
                        <h5 className="font-poppins font-bold text-slate-900 dark:text-white mb-2">
                          Projeto: {current.project}
                        </h5>
                        <p className="text-indigo-600 dark:text-indigo-400 font-inter font-semibold">
                          Resultado: {current.result}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-center items-center gap-6 mt-8">
                <motion.button
                  onClick={prevTestimonial}
                  className="w-12 h-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-indigo-50 dark:hover:bg-slate-700"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                </motion.button>

                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentTestimonial
                          ? 'bg-indigo-500 w-8'
                          : 'bg-slate-300 dark:bg-slate-600 hover:bg-indigo-300'
                      }`}
                    />
                  ))}
                </div>

                <motion.button
                  onClick={nextTestimonial}
                  className="w-12 h-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-indigo-50 dark:hover:bg-slate-700"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                </motion.button>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* CTA */}
        <div className="col-span-12 text-center mt-16">
          <AnimatedSection animation="slide-up" delay={2}>
            <motion.div
              className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 text-white"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl md:text-3xl font-poppins font-bold mb-4">
                Quer ser o próximo case de sucesso?
              </h3>
              <p className="text-xl mb-6 opacity-90 font-inter">
                Vamos conversar sobre como posso ajudar seu projeto a alcançar a excelência
              </p>
              <motion.button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-inter font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Iniciar Projeto
              </motion.button>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;