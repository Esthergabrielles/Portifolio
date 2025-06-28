import React from 'react';
import { Shield, Zap, Globe, Smartphone, Bot, Search, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const Services: React.FC = () => {
  const services = [
    {
      icon: Shield,
      title: 'Testes de Segurança',
      description: 'Identificação e mitigação de vulnerabilidades para proteger seus dados e usuários.',
      features: ['Penetration Testing', 'OWASP Compliance', 'Security Audits'],
      color: 'from-red-500 to-red-600',
      bgColor: 'from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20'
    },
    {
      icon: Zap,
      title: 'Testes de Performance',
      description: 'Otimização de velocidade e escalabilidade para experiências fluidas.',
      features: ['Load Testing', 'Stress Testing', 'Performance Monitoring'],
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20'
    },
    {
      icon: Globe,
      title: 'Testes de API',
      description: 'Validação completa de endpoints e integração entre sistemas.',
      features: ['REST API Testing', 'GraphQL Testing', 'Integration Testing'],
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20'
    },
    {
      icon: Smartphone,
      title: 'Testes Mobile',
      description: 'Garantia de qualidade em aplicações iOS e Android.',
      features: ['Cross-platform Testing', 'Device Compatibility', 'UX Testing'],
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20'
    },
    {
      icon: Bot,
      title: 'Automação de Testes',
      description: 'Implementação de suítes automatizadas para eficiência máxima.',
      features: ['Selenium WebDriver', 'CI/CD Integration', 'Test Frameworks'],
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20'
    },
    {
      icon: Search,
      title: 'Testes Funcionais',
      description: 'Validação completa de funcionalidades e requisitos de negócio.',
      features: ['Manual Testing', 'User Acceptance Testing', 'Regression Testing'],
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20'
    }
  ];

  return (
    <section id="services" className="section-spacing bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(99,102,241,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(30deg,transparent_48%,rgba(99,102,241,0.03)_49%,rgba(99,102,241,0.03)_51%,transparent_52%)] bg-[length:60px_60px]" />
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
                Serviços Especializados
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-indigo-400 to-purple-600 mx-auto mb-8 rounded-full" />
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed font-inter">
                Soluções completas em Quality Assurance para garantir excelência 
                em cada aspecto do seu produto digital
              </p>
            </motion.div>
          </AnimatedSection>
        </div>

        {/* Services Grid */}
        <div className="col-span-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <AnimatedSection key={index} animation="scale-in" delay={index * 0.2}>
                <motion.div
                  className="group h-full"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`bg-gradient-to-br ${service.bgColor} border border-slate-200 dark:border-slate-700 rounded-3xl p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden`}>
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                    
                    <div className="relative z-10">
                      <div className={`bg-gradient-to-br ${service.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="text-2xl font-poppins font-bold text-slate-900 dark:text-white mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                        {service.title}
                      </h3>
                      
                      <p className="text-slate-600 dark:text-slate-300 mb-6 font-inter leading-relaxed">
                        {service.description}
                      </p>
                      
                      <ul className="space-y-3 mb-8">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-inter">
                            <div className={`w-2 h-2 bg-gradient-to-r ${service.color} rounded-full`} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <motion.button
                        className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-inter font-semibold group-hover:gap-3 transition-all duration-300"
                        whileHover={{ x: 5 }}
                      >
                        Saiba mais
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="col-span-12 text-center mt-16">
          <AnimatedSection animation="slide-up" delay={1}>
            <motion.div
              className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.1)_49%,rgba(255,255,255,0.1)_51%,transparent_52%)] bg-[length:20px_20px]" />
              
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-poppins font-bold mb-6">
                  Pronto para elevar a qualidade do seu produto?
                </h3>
                <p className="text-xl mb-8 max-w-2xl mx-auto font-inter opacity-90">
                  Vamos discutir como posso ajudar a transformar sua visão em realidade 
                  com testes de qualidade excepcional.
                </p>
                <motion.button
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-inter font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3 mx-auto"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Iniciar Conversa
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Services;