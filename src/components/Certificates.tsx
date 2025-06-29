import React, { useState } from 'react';
import { Award, Calendar, ExternalLink, Download, CheckCircle, Star, Trophy, Medal, Search, Filter, Eye, X, ZoomIn, RotateCw, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { certificates, brandLogos } from '../data/portfolio';
import AnimatedSection from './AnimatedSection';
import CertificateModal from './CertificateModal';
import { Certificate } from '../types';
import { useLanguage } from '../hooks/useLanguage';
import { t } from '../data/translations';

const Certificates: React.FC = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const { language } = useLanguage();

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
    { icon: Award, label: t('activeCertifications', language), value: certificates.length, color: 'text-blue-500' },
    { icon: Star, label: t('institutions', language), value: '2', color: 'text-yellow-500' },
    { icon: CheckCircle, label: t('expertiseAreas', language), value: categories.length - 1, color: 'text-green-500' },
    { icon: Trophy, label: t('studyHours', language), value: '400+', color: 'text-purple-500' }
  ];

  const handleCertificateClick = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setShowCertificateModal(true);
  };

  const closeCertificateModal = () => {
    setShowCertificateModal(false);
    setSelectedCertificate(null);
  };

  // Get brand logo for issuer
  const getIssuerLogo = (issuer: string) => {
    return brandLogos[issuer] || null;
  };

  return (
    <section id="certificates" className="section-spacing bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-800 dark:via-neutral-900 dark:to-black relative overflow-hidden">
      {/* Background Pattern Premium */}
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
                {t('digitalTrophies', language)} 🏆
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-primary-600 mx-auto mb-8 rounded-full" />
              <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 max-w-4xl mx-auto leading-relaxed font-inter">
                {t('certificatesSubtitle', language)}
              </p>
            </motion.div>
          </AnimatedSection>
        </div>

        {/* Stats Premium */}
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

        {/* Search and Filter Premium */}
        <div className="col-span-12 mb-12">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search Premium */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder={t('searchCertifications', language)}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/80 dark:bg-neutral-800/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 font-inter"
              />
            </div>

            {/* Filter Buttons Premium */}
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

        {/* Certificates Grid Premium */}
        <div className="col-span-12">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            layout
          >
            <AnimatePresence mode="wait">
              {filteredCertificates.map((certificate, index) => {
                const CategoryIcon = getCategoryIcon(certificate.category);
                const categoryColor = getCategoryColor(certificate.category);
                const issuerLogo = getIssuerLogo(certificate.issuer);
                
                return (
                  <motion.div
                    key={certificate.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group cursor-pointer"
                    onClick={() => handleCertificateClick(certificate)}
                  >
                    <motion.div
                      className="bg-white/90 dark:bg-neutral-800/60 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full"
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
                        
                        {/* Overlay Premium */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Verified Badge Premium */}
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

                        {/* Category Badge Premium */}
                        <motion.div
                          className={`absolute bottom-2 left-2 bg-gradient-to-r ${categoryColor} text-white px-2 py-1 rounded-full flex items-center gap-1 opacity-0 group-hover:opacity-100`}
                          initial={{ y: 10, opacity: 0 }}
                          whileHover={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <CategoryIcon className="w-3 h-3" />
                          <span className="text-xs font-medium">{certificate.category}</span>
                        </motion.div>

                        {/* Hover Icon Premium */}
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
                        {/* Issuer with Logo */}
                        <div className="flex items-center gap-2 mb-3">
                          {issuerLogo && (
                            <img 
                              src={issuerLogo} 
                              alt={certificate.issuer}
                              className="w-6 h-6 object-contain rounded"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                          )}
                          <p className="text-neutral-600 dark:text-neutral-300 font-inter text-xs font-medium">
                            {certificate.issuer}
                          </p>
                        </div>

                        <h3 className="font-bold text-neutral-900 dark:text-white mb-2 text-sm line-clamp-2 font-inter group-hover:text-primary-500 transition-colors duration-300">
                          {certificate.name}
                        </h3>
                        
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
                {t('noCertificatesFound', language)}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                {t('adjustFilters', language)}
              </p>
            </motion.div>
          )}
        </div>

        {/* Certificate Modal Premium */}
        <CertificateModal 
          certificate={selectedCertificate}
          isOpen={showCertificateModal}
          onClose={closeCertificateModal}
        />

        {/* Achievement Section Premium */}
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
                {t('collectingKnowledge', language)} 📚
              </h3>
              <p className="text-xl mb-8 max-w-3xl mx-auto font-inter opacity-90 leading-relaxed">
                {t('coursesMotivation', language)}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold mb-2">{certificates.length}</div>
                  <div className="text-sm opacity-80">{t('conqueredCertifications', language)}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">400+</div>
                  <div className="text-sm opacity-80">{t('studyHours', language)}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">∞</div>
                  <div className="text-sm opacity-80">{t('knowledgeThirst', language)}</div>
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