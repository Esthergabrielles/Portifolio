import React, { useState } from 'react';
import { Award, Calendar, ExternalLink } from 'lucide-react';
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

  return (
    <section id="certificates" className="section-spacing bg-neutral-50 dark:bg-neutral-800">
      <div className="container-12">
        <div className="col-span-12 text-center element-spacing">
          <AnimatedSection animation="slide-up">
            <h2 className="text-display font-poppins text-neutral-900 dark:text-white mb-4">
              Certificados
            </h2>
            <p className="text-h2 text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
              Certificações e cursos que complementam minha formação e demonstram 
              comprometimento com aprendizado contínuo
            </p>
          </AnimatedSection>
        </div>

        {/* Filter Buttons */}
        <div className="col-span-12 element-spacing">
          <AnimatedSection animation="slide-up" delay={1}>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-lg font-inter font-medium transition-all duration-300 hover-lift will-change-transform ${
                    filter === category
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'glass-card text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Certificates Grid */}
        <div className="col-span-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCertificates.map((certificate, index) => (
              <AnimatedSection key={certificate.id} animation="scale-in" delay={index + 2}>
                <div
                  className="glass-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer hover-lift will-change-transform"
                  onClick={() => setSelectedCertificate(certificate)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={certificate.image}
                      alt={certificate.name}
                      className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300 will-change-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
                      <ExternalLink className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-4 h-4 text-primary-500" />
                      <span className="text-xs px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full font-inter">
                        {certificate.category}
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-neutral-900 dark:text-white mb-2 text-small line-clamp-2 font-inter">
                      {certificate.name}
                    </h3>
                    
                    <p className="text-neutral-600 dark:text-neutral-300 text-small mb-2 font-inter">
                      {certificate.issuer}
                    </p>
                    
                    <div className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400 text-xs font-inter">
                      <Calendar className="w-3 h-3" />
                      {certificate.date}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Certificate Details Modal */}
        <Modal isOpen={!!selectedCertificate} onClose={() => setSelectedCertificate(null)}>
          {selectedCertificate && (
            <div className="text-center">
              <div className="mb-6">
                <img
                  src={selectedCertificate.image}
                  alt={selectedCertificate.name}
                  className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                />
              </div>
              
              <div className="flex items-center justify-center gap-2 mb-4">
                <Award className="w-6 h-6 text-primary-500" />
                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-small font-medium font-inter">
                  {selectedCertificate.category}
                </span>
              </div>
              
              <h3 className="text-h1 font-poppins text-neutral-900 dark:text-white mb-2">
                {selectedCertificate.name}
              </h3>
              
              <p className="text-body text-neutral-600 dark:text-neutral-300 mb-4 font-inter">
                Emitido por: <strong>{selectedCertificate.issuer}</strong>
              </p>
              
              <div className="flex items-center justify-center gap-2 text-neutral-500 dark:text-neutral-400 font-inter">
                <Calendar className="w-5 h-5" />
                <span>Concluído em {selectedCertificate.date}</span>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
};

export default Certificates;