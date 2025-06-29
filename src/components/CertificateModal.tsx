import React, { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, RotateCw, Download, Maximize2, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Certificate } from '../types';

interface CertificateModalProps {
  certificate: Certificate | null;
  isOpen: boolean;
  onClose: () => void;
}

const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, isOpen, onClose }) => {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  // Gerenciamento do scroll e overflow do body
  useEffect(() => {
    if (isOpen) {
      // Salva a posição atual do scroll
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      // Restaura o scroll
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      // Cleanup
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Reset zoom e rotation quando o modal fecha
  useEffect(() => {
    if (!isOpen) {
      setZoom(1);
      setRotation(0);
    }
  }, [isOpen]);

  if (!certificate) return null;

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);
  const handleReset = () => {
    setZoom(1);
    setRotation(0);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = certificate.image;
    link.download = `${certificate.name.replace(/\s+/g, '_')}_Certificate.pdf`;
    link.click();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            margin: 0,
            padding: '1rem'
          }}
          onClick={handleBackdropClick}
        >
          {/* Backdrop Premium */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />

          {/* Modal Content - Totalmente Centralizado */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ 
              duration: 0.4, 
              ease: [0.4, 0, 0.2, 1],
              type: "spring",
              damping: 25,
              stiffness: 300
            }}
            className="relative bg-white dark:bg-neutral-800 rounded-3xl w-full max-w-7xl h-[90vh] overflow-hidden shadow-2xl border border-neutral-200 dark:border-neutral-700 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Premium */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0 mr-4">
                  <h3 className="text-2xl md:text-3xl font-poppins font-bold truncate">
                    {certificate.name}
                  </h3>
                  <p className="text-white/90 font-inter text-lg mt-1">
                    {certificate.issuer} • {certificate.date}
                  </p>
                </div>
                
                {/* Controls Premium */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <motion.button
                    onClick={handleZoomOut}
                    className="p-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-300 shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Diminuir Zoom"
                  >
                    <ZoomOut className="w-5 h-5" />
                  </motion.button>
                  
                  <div className="text-white/90 font-mono text-sm min-w-[60px] text-center bg-white/10 px-3 py-2 rounded-lg">
                    {Math.round(zoom * 100)}%
                  </div>
                  
                  <motion.button
                    onClick={handleZoomIn}
                    className="p-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-300 shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Aumentar Zoom"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </motion.button>
                  
                  <motion.button
                    onClick={handleRotate}
                    className="p-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-300 shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Rotacionar"
                  >
                    <RotateCw className="w-5 h-5" />
                  </motion.button>
                  
                  <motion.button
                    onClick={handleDownload}
                    className="p-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-300 shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Download"
                  >
                    <Download className="w-5 h-5" />
                  </motion.button>
                  
                  <motion.button
                    onClick={() => window.open(certificate.image, '_blank')}
                    className="p-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-300 shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Abrir em Nova Aba"
                  >
                    <Maximize2 className="w-5 h-5" />
                  </motion.button>
                  
                  <motion.button
                    onClick={onClose}
                    className="p-3 bg-red-500/30 backdrop-blur-sm rounded-xl hover:bg-red-500/50 transition-all duration-300 shadow-lg ml-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Fechar"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Certificate Viewer */}
            <div className="flex flex-1 min-h-0">
              {/* Image Container Premium */}
              <div className="flex-1 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 overflow-auto">
                <div className="flex items-center justify-center min-h-full p-8">
                  <motion.div
                    className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700"
                    style={{
                      transform: `scale(${zoom}) rotate(${rotation}deg)`,
                      transformOrigin: 'center center'
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={certificate.image}
                      alt={certificate.name}
                      className="block max-w-none"
                      style={{ 
                        width: 'auto',
                        height: 'auto',
                        minWidth: '600px',
                        maxWidth: '1200px'
                      }}
                      onLoad={(e) => {
                        const img = e.target as HTMLImageElement;
                        const container = img.closest('.overflow-auto');
                        if (container) {
                          const containerWidth = container.clientWidth - 100;
                          const containerHeight = container.clientHeight - 100;
                          const scaleX = containerWidth / img.naturalWidth;
                          const scaleY = containerHeight / img.naturalHeight;
                          const initialScale = Math.min(scaleX, scaleY, 1);
                          setZoom(Math.max(initialScale * 0.9, 0.5));
                        }
                      }}
                      onError={(e) => {
                        console.error('Erro ao carregar imagem do certificado:', e);
                      }}
                    />
                  </motion.div>
                </div>
              </div>

              {/* Info Panel Premium */}
              <div className="w-80 bg-white dark:bg-neutral-800 border-l border-neutral-200 dark:border-neutral-700 overflow-y-auto flex-shrink-0">
                <div className="p-6">
                  <h4 className="text-xl font-poppins font-bold text-neutral-900 dark:text-white mb-6">
                    Detalhes do Certificado
                  </h4>
                  
                  <div className="space-y-6 mb-8">
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 rounded-2xl border border-indigo-200 dark:border-indigo-800">
                      <p className="text-sm text-indigo-600 dark:text-indigo-400 mb-1 font-semibold">Instituição</p>
                      <p className="font-bold text-neutral-900 dark:text-white text-lg">{certificate.issuer}</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800">
                      <p className="text-sm text-emerald-600 dark:text-emerald-400 mb-1 font-semibold">Data de Conclusão</p>
                      <p className="font-bold text-neutral-900 dark:text-white text-lg">{certificate.date}</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-4 rounded-2xl border border-amber-200 dark:border-amber-800">
                      <p className="text-sm text-amber-600 dark:text-amber-400 mb-1 font-semibold">Categoria</p>
                      <span className="inline-block px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full text-sm font-bold shadow-lg">
                        {certificate.category}
                      </span>
                    </div>
                  </div>

                  {certificate.description && (
                    <div className="mb-8">
                      <h5 className="font-bold text-neutral-900 dark:text-white mb-3 text-lg">Sobre o Curso</h5>
                      <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed bg-neutral-50 dark:bg-neutral-700/50 p-4 rounded-xl">
                        {certificate.description}
                      </p>
                    </div>
                  )}

                  {certificate.skills && certificate.skills.length > 0 && (
                    <div className="mb-8">
                      <h5 className="font-bold text-neutral-900 dark:text-white mb-4 text-lg">Habilidades Desenvolvidas</h5>
                      <div className="flex flex-wrap gap-2">
                        {certificate.skills.map((skill, index) => (
                          <motion.span
                            key={index}
                            className="px-3 py-2 bg-gradient-to-r from-neutral-100 to-neutral-200 dark:from-neutral-700 dark:to-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-xl text-xs font-medium border border-neutral-300 dark:border-neutral-600"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons Premium */}
                  <div className="space-y-4">
                    <motion.button
                      onClick={() => window.open(certificate.image, '_blank')}
                      className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ExternalLink className="w-5 h-5" />
                      Ver Original
                    </motion.button>
                    
                    <motion.button
                      onClick={handleDownload}
                      className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Download className="w-5 h-5" />
                      Download
                    </motion.button>
                    
                    <motion.button
                      onClick={handleReset}
                      className="w-full flex items-center justify-center gap-3 bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 px-6 py-4 rounded-xl font-semibold hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Resetar Visualização
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CertificateModal;