import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCw, Download, Maximize2, Eye, FileText, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DocumentViewerProps {
  document: {
    id: string;
    name: string;
    url: string;
    type: 'pdf' | 'image' | 'doc';
    description?: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ document, isOpen, onClose }) => {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  if (!document) return null;

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);
  const handleReset = () => {
    setZoom(1);
    setRotation(0);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = document.url;
    link.download = `${document.name.replace(/\s+/g, '_')}.${document.type}`;
    link.click();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const renderDocumentContent = () => {
    switch (document.type) {
      case 'pdf':
        return (
          <iframe
            src={`${document.url}#toolbar=1&navpanes=1&scrollbar=1&page=1&view=FitH`}
            className="w-full h-full border-0 rounded-xl"
            title={document.name}
            style={{
              transform: `scale(${zoom}) rotate(${rotation}deg)`,
              transformOrigin: 'center center'
            }}
          />
        );
      
      case 'image':
        return (
          <img
            src={document.url}
            alt={document.name}
            className="max-w-none"
            style={{
              transform: `scale(${zoom}) rotate(${rotation}deg)`,
              transformOrigin: 'center center'
            }}
          />
        );
      
      case 'doc':
        return (
          <div className="w-full h-full flex items-center justify-center bg-white rounded-xl">
            <div className="text-center p-8">
              <FileText className="w-24 h-24 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">{document.name}</h3>
              <p className="text-gray-600 mb-6">
                Documento do Word não pode ser visualizado diretamente.
              </p>
              <div className="space-y-3">
                <button
                  onClick={handleDownload}
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center gap-2 mx-auto"
                >
                  <Download className="w-5 h-5" />
                  Baixar Documento
                </button>
                <button
                  onClick={() => window.open(document.url, '_blank')}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-300 flex items-center gap-2 mx-auto"
                >
                  <ExternalLink className="w-5 h-5" />
                  Abrir em Nova Aba
                </button>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-xl">
            <div className="text-center p-8">
              <FileText className="w-24 h-24 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Tipo de arquivo não suportado para visualização</p>
            </div>
          </div>
        );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative bg-white dark:bg-neutral-800 rounded-3xl max-w-7xl w-full h-[90vh] overflow-hidden shadow-2xl border border-neutral-200 dark:border-neutral-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0 mr-4">
                  <h3 className="text-2xl font-poppins font-bold truncate">
                    {document.name}
                  </h3>
                  {document.description && (
                    <p className="text-white/90 font-inter mt-1">
                      {document.description}
                    </p>
                  )}
                </div>
                
                {/* Controls */}
                <div className="flex items-center gap-2">
                  {document.type !== 'doc' && (
                    <>
                      <motion.button
                        onClick={handleZoomOut}
                        className="p-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-300"
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
                        className="p-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title="Aumentar Zoom"
                      >
                        <ZoomIn className="w-5 h-5" />
                      </motion.button>
                      
                      {document.type === 'image' && (
                        <motion.button
                          onClick={handleRotate}
                          className="p-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          title="Rotacionar"
                        >
                          <RotateCw className="w-5 h-5" />
                        </motion.button>
                      )}
                    </>
                  )}
                  
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
                    onClick={() => window.open(document.url, '_blank')}
                    className="p-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Abrir em Nova Aba"
                  >
                    <Maximize2 className="w-5 h-5" />
                  </motion.button>
                  
                  <motion.button
                    onClick={onClose}
                    className="p-3 bg-red-500/30 backdrop-blur-sm rounded-xl hover:bg-red-500/50 transition-all duration-300 ml-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Fechar"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Document Viewer */}
            <div className="h-[calc(90vh-120px)] bg-gray-50 dark:bg-neutral-900 overflow-auto">
              <div className="flex items-center justify-center min-h-full p-8">
                {renderDocumentContent()}
              </div>
            </div>

            {/* Footer with Actions */}
            <div className="bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    Tipo: {document.type.toUpperCase()}
                  </span>
                  {document.type !== 'doc' && (
                    <motion.button
                      onClick={handleReset}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      whileHover={{ scale: 1.05 }}
                    >
                      Resetar Visualização
                    </motion.button>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  <motion.button
                    onClick={handleDownload}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DocumentViewer;