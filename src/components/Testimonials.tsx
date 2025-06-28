import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Award, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const Testimonials: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Ana Silva',
      position: 'Gerente de TI',
      company: 'Destra Gestão de Terceiros',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      text: 'Esther demonstra excelente atenção aos detalhes e organização em suas atividades. Sua dedicação aos estudos em QA é notável e promissora.',
      project: 'Auditorias Documentais',
      result: 'Redução de não conformidades'
    },
    {
      id: 2,
      name: 'Carlos Rodrigues',
      position: 'Coordenador de Projetos',
      company: 'QYON TECH',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      text: 'Durante seu período como SDR, Esther mostrou grande capacidade analítica e organização. Suas habilidades são transferíveis para QA.',
      project: 'Gestão de CRM',
      result: 'Melhoria nos processos comerciais'
    },
    {
      id: 3,
      name: 'Marina Costa',
      position: 'Instrutora QA',
      company: 'Mate Academy',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      text: 'Esther é uma aluna dedicada e aplicada. Seu progresso no curso de QA tem sido consistente e ela demonstra real paixão pela área.',
      project: 'Bootcamp QA Engineer',
      result: '93% de progresso no curso'
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
                Feedback real de colegas e supervisores que acompanharam minha 
                dedicação e evolução profissional
              </p>
            </motion.div>
          </AnimatedSection>
        </div>

        {/* Stats */}
        <div className="col-span-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Star, label: 'Avaliação Média', value: '5.0/5', color: 'from-yellow-500 to-yellow-600' },
              { icon: Award, label: 'Reconhecimentos', value: '2x', color: 'from-blue-500 to-blue-600' },
              { icon: TrendingUp, label: 'Evolução', value: 'Constante', color: 'from-green-500 to-green-600' },
              { icon: Quote, label: 'Recomendações', value: '3', color: 'from-purple-500 to-purple-600' }
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
                          Contexto: {current.project}
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
                Pronta para contribuir com seu time!
              </h3>
              <p className="text-xl mb-6 opacity-90 font-inter">
                Vamos conversar sobre como posso aplicar minha dedicação e conhecimentos em seu projeto
              </p>
              <motion.button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-inter font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Iniciar Conversa
              </motion.button>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;