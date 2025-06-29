import React, { useState } from 'react';
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative bg-white dark:bg-neutral-800 rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl border border-neutral-200 dark:border-neutral-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 z-20">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-poppins font-bold">
                    {certificate.name}
                  </h3>
                  <p className="text-white/80 font-inter">
                    {certificate.issuer} • {certificate.date}
                  </p>
                </div>
                
                {/* Controls */}
                <div className="flex items-center gap-3">
                  <motion.button
                    onClick={handleZoomOut}
                    className="p-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-5 h-5" />
                  </motion.button>
                  
                  <span className="text-white/80 font-mono text-sm min-w-[60px] text-center">
                    {Math.round(zoom * 100)}%
                  </span>
                  
                  <motion.button
                    onClick={handleZoomIn}
                    className="p-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Zoom In"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </motion.button>
                  
                  <motion.button
                    onClick={handleRotate}
                    className="p-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Rotate"
                  >
                    <RotateCw className="w-5 h-5" />
                  </motion.button>
                  
                  <motion.button
                    onClick={handleDownload}
                    className="p-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Download"
                  >
                    <Download className="w-5 h-5" />
                  </motion.button>
                  
                  <motion.button
                    onClick={() => window.open(certificate.image, '_blank')}
                    className="p-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Open in New Tab"
                  >
                    <Maximize2 className="w-5 h-5" />
                  </motion.button>
                  
                  <motion.button
                    onClick={onClose}
                    className="p-3 bg-red-500/20 backdrop-blur-sm rounded-xl hover:bg-red-500/30 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Close"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Certificate Viewer */}
            <div className="flex h-[calc(95vh-120px)]">
              {/* Image Container */}
              <div className="flex-1 bg-neutral-100 dark:bg-neutral-900 overflow-auto">
                <div className="flex items-center justify-center min-h-full p-8">
                  <motion.div
                    className="bg-white rounded-2xl shadow-2xl overflow-hidden"
                    style={{
                      transform: `scale(${zoom}) rotate(${rotation}deg)`,
                      transformOrigin: 'center center'
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={certificate.image}
                      alt={certificate.name}
                      className="max-w-none w-auto h-auto"
                      style={{ 
                        maxWidth: 'none',
                        width: 'auto',
                        height: 'auto'
                      }}
                      onLoad={(e) => {
                        const img = e.target as HTMLImageElement;
                        const containerWidth = img.parentElement?.clientWidth || 800;
                        const containerHeight = img.parentElement?.clientHeight || 600;
                        const scaleX = (containerWidth - 100) / img.naturalWidth;
                        const scaleY = (containerHeight - 100) / img.naturalHeight;
                        const initialScale = Math.min(scaleX, scaleY, 1);
                        setZoom(initialScale);
                      }}
                    />
                  </motion.div>
                </div>
              </div>

              {/* Info Panel */}
              <div className="w-80 bg-white dark:bg-neutral-800 border-l border-neutral-200 dark:border-neutral-700 overflow-y-auto">
                <div className="p-6">
                  <h4 className="text-xl font-poppins font-bold text-neutral-900 dark:text-white mb-4">
                    Certificate Details
                  </h4>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">Issuer</p>
                      <p className="font-semibold text-neutral-900 dark:text-white">{certificate.issuer}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">Date</p>
                      <p className="font-semibold text-neutral-900 dark:text-white">{certificate.date}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">Category</p>
                      <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium">
                        {certificate.category}
                      </span>
                    </div>
                  </div>

                  {certificate.description && (
                    <div className="mb-6">
                      <h5 className="font-bold text-neutral-900 dark:text-white mb-2">Description</h5>
                      <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                        {certificate.description}
                      </p>
                    </div>
                  )}

                  {certificate.skills && certificate.skills.length > 0 && (
                    <div className="mb-6">
                      <h5 className="font-bold text-neutral-900 dark:text-white mb-3">Skills</h5>
                      <div className="flex flex-wrap gap-2">
                        {certificate.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <motion.button
                      onClick={() => window.open(certificate.image, '_blank')}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Original
                    </motion.button>
                    
                    <motion.button
                      onClick={handleDownload}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </motion.button>
                    
                    <motion.button
                      onClick={handleReset}
                      className="w-full flex items-center justify-center gap-2 bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 px-4 py-3 rounded-xl font-semibold hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Reset View
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