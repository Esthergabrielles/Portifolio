import React, { useState } from 'react';
import { Award, Calendar, ExternalLink, Download, CheckCircle, Star, Trophy, Medal, Search, Filter, Eye, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { certificates } from '../data/portfolio';
import AnimatedSection from './AnimatedSection';
import { Certificate } from '../types';

const Certificates: React.FC = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  const categories = ['All', 'QA', 'Programming', 'Web Development', 'Business', 'Foundation', 'Database', 'Infrastructure', 'Sustainability', 'Higher Education', 'AI'];

  const filteredCertificates = certificates.filter(cert => {
    const matchesFilter = filter === 'All' || cert.category === filter;
    const matchesSearch = cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.issuer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'QA': return Trophy;
      case 'Programming': return Star;
      case 'Web Development': return Award;
      case 'Business': return Medal;
      case 'Foundation': return CheckCircle;
      case 'Database': return Award;
      case 'Infrastructure': return Trophy;
      case 'Sustainability': return Star;
      case 'Higher Education': return Medal;
      case 'AI': return Star;
      default: return Award;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'QA': return 'from-blue-500 to-blue-600';
      case 'Programming': return 'from-green-500 to-green-600';
      case 'Web Development': return 'from-purple-500 to-purple-600';
      case 'Business': return 'from-orange-500 to-orange-600';
      case 'Foundation': return 'from-indigo-500 to-indigo-600';
      case 'Database': return 'from-cyan-500 to-cyan-600';
      case 'Infrastructure': return 'from-red-500 to-red-600';
      case 'Sustainability': return 'from-emerald-500 to-emerald-600';
      case 'Higher Education': return 'from-violet-500 to-violet-600';
      case 'AI': return 'from-pink-500 to-pink-600';
      default: return 'from-primary-500 to-primary-600';
    }
  };

  const stats = [
    { icon: Award, label: 'Certificações Ativas', value: certificates.length, color: 'text-blue-500' },
    { icon: Star, label: 'Instituições', value: '2', color: 'text-yellow-500' },
    { icon: CheckCircle, label: 'Áreas de Expertise', value: categories.length - 1, color: 'text-green-500' },
    { icon: Trophy, label: 'Horas de Estudo', value: '400+', color: 'text-purple-500' }
  ];

  const handleCertificateClick = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setShowCertificateModal(true);
  };

  const closeCertificateModal = () => {
    setShowCertificateModal(false);
    setSelectedCertificate(null);
  };

  // Modal que aparece no hover
  const HoverModal: React.FC<{ certificate: Certificate; position: { x: number; y: number } }> = ({ certificate, position }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      transition={{ duration: 0.2 }}
      className="fixed z-50 pointer-events-none"
      style={{
        left: Math.min(position.x + 20, window.innerWidth - 400),
        top: Math.min(position.y - 100, window.innerHeight - 300),
      }}
    >
      <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-700 p-6 max-w-sm backdrop-blur-sm">
        <div className="relative mb-4">
          <img
            src={certificate.image}
            alt={certificate.name}
            className="w-full h-32 object-cover rounded-xl"
          />
          <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
            <CheckCircle className="w-4 h-4" />
          </div>
        </div>
        
        <h4 className="font-bold text-lg text-neutral-900 dark:text-white mb-2 line-clamp-2">
          {certificate.name}
        </h4>
        
        <p className="text-neutral-600 dark:text-neutral-300 mb-3 font-medium">
          {certificate.issuer}
        </p>
        
        {certificate.description && (
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3 line-clamp-2">
            {certificate.description}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {certificate.date}
          </span>
          <span className={`text-xs px-2 py-1 bg-gradient-to-r ${getCategoryColor(certificate.category)} text-white rounded-full`}>
            {certificate.category}
          </span>
        </div>
      </div>
    </motion.div>
  );

  // Modal de visualização do certificado
  const CertificateModal: React.FC = () => {
    if (!selectedCertificate) return null;

    return (
      <AnimatePresence>
        {showCertificateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={closeCertificateModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-neutral-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header do Modal */}
              <div className="sticky top-0 bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 p-6 rounded-t-3xl z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`bg-gradient-to-r ${getCategoryColor(selectedCertificate.category)} w-12 h-12 rounded-xl flex items-center justify-center shadow-lg`}>
                      {React.createElement(getCategoryIcon(selectedCertificate.category), { className: "w-6 h-6 text-white" })}
                    </div>
                    <div>
                      <h3 className="text-2xl font-poppins font-bold text-neutral-900 dark:text-white">
                        Certificado Digital
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-300 font-inter">
                        {selectedCertificate.issuer} • {selectedCertificate.date}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={closeCertificateModal}
                    className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200"
                  >
                    <X className="w-6 h-6 text-neutral-600 dark:text-neutral-300" />
                  </button>
                </div>
              </div>

              {/* Conteúdo do Modal */}
              <div className="p-8">
                {/* Imagem Real do Certificado */}
                <div className="relative mb-8">
                  <div className="bg-white dark:bg-neutral-900 rounded-2xl p-4 shadow-2xl border border-neutral-200 dark:border-neutral-700">
                    <img
                      src={selectedCertificate.image}
                      alt={selectedCertificate.name}
                      className="w-full h-auto object-contain rounded-xl cursor-zoom-in"
                      onClick={() => window.open(selectedCertificate.image, '_blank')}
                    />
                  </div>
                  <div className="absolute top-2 right-2 bg-green-500 text-white p-2 rounded-full shadow-lg">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                </div>

                {/* Informações do Certificado */}
                <div className="bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 border-2 border-neutral-200 dark:border-neutral-700 rounded-2xl p-8 mb-6">
                  <div className="text-center mb-6">
                    <div className={`bg-gradient-to-r ${getCategoryColor(selectedCertificate.category)} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl`}>
                      {React.createElement(getCategoryIcon(selectedCertificate.category), { className: "w-8 h-8 text-white" })}
                    </div>
                    <h2 className="text-3xl font-poppins font-bold text-neutral-900 dark:text-white mb-2">
                      {selectedCertificate.name}
                    </h2>
                    <p className="text-xl text-neutral-600 dark:text-neutral-300 font-inter">
                      {selectedCertificate.issuer}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="text-center">
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2 font-inter uppercase tracking-wide">
                        Data de Conclusão
                      </p>
                      <p className="text-lg font-semibold text-neutral-900 dark:text-white font-inter">
                        {selectedCertificate.date}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2 font-inter uppercase tracking-wide">
                        Categoria
                      </p>
                      <span className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${getCategoryColor(selectedCertificate.category)} text-white rounded-full font-semibold`}>
                        {React.createElement(getCategoryIcon(selectedCertificate.category), { className: "w-4 h-4" })}
                        {selectedCertificate.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Informações Adicionais */}
                {selectedCertificate.description && (
                  <div className="bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 rounded-2xl p-6 mb-6">
                    <h4 className="font-bold text-lg text-neutral-900 dark:text-white mb-3 font-inter">
                      Sobre o Curso
                    </h4>
                    <p className="text-neutral-700 dark:text-neutral-300 font-inter leading-relaxed">
                      {selectedCertificate.description}
                    </p>
                  </div>
                )}

                {/* Habilidades */}
                {selectedCertificate.skills && selectedCertificate.skills.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-bold text-lg text-neutral-900 dark:text-white mb-4 font-inter">
                      Habilidades Desenvolvidas
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {selectedCertificate.skills.map((skill, index) => (
                        <span
                          key={index}
                          className={`px-4 py-2 bg-gradient-to-r ${getCategoryColor(selectedCertificate.category)} text-white rounded-full font-medium font-inter shadow-lg`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ações */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    onClick={() => window.open(selectedCertificate.image, '_blank')}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-inter font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ExternalLink className="w-5 h-5" />
                    Ver Certificado Original
                  </motion.button>
                  <motion.button
                    onClick={closeCertificateModal}
                    className="flex items-center justify-center gap-2 bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 px-6 py-3 rounded-xl font-inter font-semibold hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Fechar
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
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
                Meus Troféus Digitais 🏆
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-primary-600 mx-auto mb-8 rounded-full" />
              <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 max-w-4xl mx-auto leading-relaxed font-inter">
                Cada certificação é uma batalha vencida, uma nova habilidade desbloqueada. 
                Clique nos certificados para visualizar em detalhes!
              </p>
            </motion.div>
          </AnimatedSection>
        </div>

        {/* Stats */}
        <div className="col-span-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/80 dark:bg-neutral-800/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 p-8 rounded-3xl shadow-lg text-center group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -8 }}
              >
                <motion.div 
                  className="bg-gradient-to-r from-primary-500 to-primary-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2 font-poppins">
                  {stat.value}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300 font-inter font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="col-span-12 mb-12">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Buscar certificações..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/80 dark:bg-neutral-800/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 font-inter"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category, index) => {
                const Icon = getCategoryIcon(category);
                return (
                  <motion.button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`px-4 py-2 rounded-xl font-inter font-semibold transition-all duration-300 flex items-center gap-2 ${
                      filter === category
                        ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg scale-105'
                        : 'bg-white/80 dark:bg-neutral-800/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:scale-105'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-4 h-4" />
                    {category}
                    {filter === category && (
                      <motion.span
                        className="bg-white/20 text-white px-2 py-1 rounded-full text-xs"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {filteredCertificates.length}
                      </motion.span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="col-span-12">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            layout
          >
            <AnimatePresence mode="wait">
              {filteredCertificates.map((certificate, index) => {
                const CategoryIcon = getCategoryIcon(certificate.category);
                const categoryColor = getCategoryColor(certificate.category);
                
                return (
                  <motion.div
                    key={certificate.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group cursor-pointer"
                    onMouseEnter={(e) => {
                      setHoveredCard(certificate.id);
                      setSelectedCertificate(certificate);
                    }}
                    onMouseLeave={() => {
                      setHoveredCard(null);
                      setSelectedCertificate(null);
                    }}
                    onClick={() => handleCertificateClick(certificate)}
                  >
                    <motion.div
                      className="bg-white/80 dark:bg-neutral-800/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full"
                      whileHover={{ y: -8, scale: 1.02 }}
                    >
                      <div className="relative overflow-hidden h-32">
                        <motion.img
                          src={certificate.image}
                          alt={certificate.name}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.4 }}
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Verified Badge */}
                        <motion.div
                          className="absolute top-2 right-2 bg-green-500 text-white p-1.5 rounded-full shadow-lg"
                          animate={{ 
                            scale: hoveredCard === certificate.id ? [1, 1.2, 1] : 1,
                            rotate: hoveredCard === certificate.id ? [0, 10, -10, 0] : 0
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          <CheckCircle className="w-3 h-3" />
                        </motion.div>

                        {/* Category Badge */}
                        <motion.div
                          className={`absolute bottom-2 left-2 bg-gradient-to-r ${categoryColor} text-white px-2 py-1 rounded-full flex items-center gap-1 opacity-0 group-hover:opacity-100`}
                          initial={{ y: 10, opacity: 0 }}
                          whileHover={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <CategoryIcon className="w-3 h-3" />
                          <span className="text-xs font-medium">{certificate.category}</span>
                        </motion.div>

                        {/* Hover Icon */}
                        <motion.div
                          className="absolute top-2 left-2 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm p-1.5 rounded-full opacity-0 group-hover:opacity-100"
                          initial={{ scale: 0, rotate: -180 }}
                          whileHover={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Eye className="w-3 h-3 text-neutral-700 dark:text-neutral-300" />
                        </motion.div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-bold text-neutral-900 dark:text-white mb-2 text-sm line-clamp-2 font-inter group-hover:text-primary-500 transition-colors duration-300">
                          {certificate.name}
                        </h3>
                        
                        <p className="text-neutral-600 dark:text-neutral-300 mb-3 font-inter text-xs font-medium">
                          {certificate.issuer}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400 text-xs font-inter">
                            <Calendar className="w-3 h-3" />
                            {certificate.date}
                          </div>
                          
                          <motion.div
                            className="flex items-center gap-1"
                            whileHover={{ scale: 1.1 }}
                          >
                            <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 p-1 rounded-full">
                              <CheckCircle className="w-3 h-3" />
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* No results message */}
          {filteredCertificates.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <Search className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                Nenhuma certificação encontrada
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                Tente ajustar os filtros ou termo de busca
              </p>
            </motion.div>
          )}
        </div>

        {/* Hover Modal */}
        <AnimatePresence>
          {selectedCertificate && hoveredCard && !showCertificateModal && (
            <HoverModal 
              certificate={selectedCertificate} 
              position={{ x: 0, y: 0 }} 
            />
          )}
        </AnimatePresence>

        {/* Certificate Modal */}
        <CertificateModal />

        {/* Achievement Section */}
        <div className="col-span-12 mt-16">
          <motion.div
            className="bg-gradient-to-r from-primary-500 to-purple-600 rounded-3xl p-12 text-white text-center relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.1)_49%,rgba(255,255,255,0.1)_51%,transparent_52%)] bg-[length:20px_20px]" />
            
            <div className="relative z-10">
              <motion.div
                className="flex justify-center mb-6"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Trophy className="w-16 h-16 text-yellow-300" />
              </motion.div>
              
              <h3 className="text-3xl md:text-4xl font-poppins font-bold mb-6">
                Colecionando Conhecimento 📚
              </h3>
              <p className="text-xl mb-8 max-w-3xl mx-auto font-inter opacity-90 leading-relaxed">
                Cada certificação representa horas de dedicação e aprendizado. 
                Minha coleção continua crescendo, sempre em busca de novas habilidades 
                e conhecimentos que me tornem uma profissional ainda melhor.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold mb-2">{certificates.length}</div>
                  <div className="text-sm opacity-80">Certificações Conquistadas</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">400+</div>
                  <div className="text-sm opacity-80">Horas de Estudo</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">∞</div>
                  <div className="text-sm opacity-80">Sede de Aprender</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Certificates;