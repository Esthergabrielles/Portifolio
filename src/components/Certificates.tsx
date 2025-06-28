import React, { useState } from 'react';
import { Award, Calendar, ExternalLink, Download, CheckCircle, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { certificates } from '../data/portfolio';
import Modal from './Modal';
import AnimatedSection from './AnimatedSection';
import { Certificate } from '../types';

const Certificates: React.FC = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Testing', 'Agile', 'Automation', 'API Testing'];

  const filteredCertificates = filter === 'All' 
    ? certificates 
    : certificates.filter(cert => cert.category === filter);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Testing': return 'from-blue-500 to-blue-600';
      case 'Agile': return 'from-green-500 to-green-600';
      case 'Automation': return 'from-purple-500 to-purple-600';
      case 'API Testing': return 'from-orange-500 to-orange-600';
      default: return 'from-primary-500 to-primary-600';
    }
  };

  return (
    <section id="certificates" className="section-spacing bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-800 dark:via-neutral-900 dark:to-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(47,128,237,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_48%,rgba(47,128,237,0.03)_49%,rgba(47,128,237,0.03)_51%,transparent_52%)] bg-[length:50px_50px]" />
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
              <h2 className="text-5xl md:text-6xl font-poppins font-bold text-neutral-900 dark:text-white mb-6">
                Certificações
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-primary-600 mx-auto mb-8 rounded-full" />
              <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 max-w-4xl mx-auto leading-relaxed font-inter">
                Certificações e cursos que complementam minha formação e demonstram 
                comprometimento com aprendizado contínuo e excelência profissional
              </p>
            </motion.div>
          </AnimatedSection>
        </div>

        {/* Stats */}
        <div className="col-span-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Certificações', value: certificates.length, icon: Award },
              { label: 'Instituições', value: '4+', icon: Star },
              { label: 'Horas de Estudo', value: '200+', icon: CheckCircle },
              { label: 'Áreas de Expertise', value: categories.length - 1, icon: ExternalLink }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/80 dark:bg-neutral-800/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 p-6 rounded-2xl shadow-lg text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-1 font-poppins">
                  {stat.value}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300 font-inter text-sm">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="col-span-12 element-spacing">
          <AnimatedSection animation="slide-up" delay={1}>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-6 py-3 rounded-xl font-inter font-semibold transition-all duration-300 ${
                    filter === category
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-xl scale-105'
                      : 'bg-white/80 dark:bg-neutral-800/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:scale-105'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Certificates Grid */}
        <div className="col-span-12">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            layout
          >
            <AnimatePresence mode="wait">
              {filteredCertificates.map((certificate, index) => (
                <motion.div
                  key={certificate.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedCertificate(certificate)}
                >
                  <motion.div
                    className="bg-white/80 dark:bg-neutral-800/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                    whileHover={{ y: -10, scale: 1.02 }}
                  >
                    <div className="relative overflow-hidden">
                      <motion.img
                        src={certificate.image}
                        alt={certificate.name}
                        className="w-full h-40 object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <motion.div
                        className="absolute top-3 right-3 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ExternalLink className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                      </motion.div>
                      <motion.div
                        className={`absolute bottom-3 left-3 bg-gradient-to-r ${getCategoryColor(certificate.category)} text-white px-3 py-1 rounded-full opacity-0 group-hover:opacity-100`}
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <span className="text-xs font-medium">{certificate.category}</span>
                      </motion.div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Award className="w-4 h-4 text-primary-500" />
                        <span className={`text-xs px-2 py-1 bg-gradient-to-r ${getCategoryColor(certificate.category)} text-white rounded-full font-medium`}>
                          {certificate.category}
                        </span>
                      </div>
                      
                      <h3 className="font-bold text-neutral-900 dark:text-white mb-3 text-lg line-clamp-2 font-inter group-hover:text-primary-500 transition-colors duration-300">
                        {certificate.name}
                      </h3>
                      
                      <p className="text-neutral-600 dark:text-neutral-300 mb-3 font-inter font-medium">
                        {certificate.issuer}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400 text-sm font-inter">
                          <Calendar className="w-4 h-4" />
                          {certificate.date}
                        </div>
                        <motion.div
                          className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full"
                          whileHover={{ scale: 1.05 }}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Certificate Details Modal */}
        <Modal isOpen={!!selectedCertificate} onClose={() => setSelectedCertificate(null)}>
          {selectedCertificate && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="mb-8">
                <motion.img
                  src={selectedCertificate.image}
                  alt={selectedCertificate.name}
                  className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              
              <div className="flex items-center justify-center gap-3 mb-6">
                <Award className="w-8 h-8 text-primary-500" />
                <span className={`px-4 py-2 bg-gradient-to-r ${getCategoryColor(selectedCertificate.category)} text-white rounded-full font-semibold font-inter`}>
                  {selectedCertificate.category}
                </span>
              </div>
              
              <h3 className="text-3xl font-poppins font-bold text-neutral-900 dark:text-white mb-4">
                {selectedCertificate.name}
              </h3>
              
              <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-6 font-inter">
                Emitido por: <strong className="text-primary-500">{selectedCertificate.issuer}</strong>
              </p>
              
              <div className="flex items-center justify-center gap-3 mb-8 text-neutral-500 dark:text-neutral-400 font-inter">
                <Calendar className="w-6 h-6" />
                <span className="text-lg">Concluído em {selectedCertificate.date}</span>
              </div>

              <div className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 p-6 rounded-2xl border border-primary-200 dark:border-primary-700">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-lg font-semibold text-neutral-900 dark:text-white">Certificação Verificada</span>
                </div>
                <p className="text-neutral-700 dark:text-neutral-300 font-inter">
                  Esta certificação foi concluída com sucesso e representa conhecimento validado na área de {selectedCertificate.category}.
                </p>
              </div>
            </motion.div>
          )}
        </Modal>
      </div>
    </section>
  );
};

export default Certificates;