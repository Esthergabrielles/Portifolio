import React, { useState } from 'react';
import { Star, Send, X, Heart, ThumbsUp, MessageCircle, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SupabaseService } from '../services/supabaseService';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [category, setCategory] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const categories = [
    { id: 'design', label: 'Design & UX', icon: '🎨' },
    { id: 'content', label: 'Conteúdo', icon: '📝' },
    { id: 'technical', label: 'Aspectos Técnicos', icon: '⚙️' },
    { id: 'overall', label: 'Impressão Geral', icon: '✨' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) return;
    
    setSubmitting(true);
    
    try {
      await SupabaseService.createFeedback({
        rating,
        feedback_text: feedback || null,
        category: category || null,
        ip_address: null, // Pode ser obtido via API externa se necessário
        user_agent: navigator.userAgent
      });
      
      setSubmitted(true);
      
      // Fechar modal após 3 segundos
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setRating(0);
        setFeedback('');
        setCategory('');
      }, 3000);
    } catch (error) {
      console.error('Erro ao enviar feedback:', error);
      alert('Erro ao enviar feedback. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  const getRatingText = (stars: number) => {
    switch (stars) {
      case 1: return 'Precisa melhorar 😔';
      case 2: return 'Pode ser melhor 🤔';
      case 3: return 'Bom trabalho! 😊';
      case 4: return 'Muito bom! 😍';
      case 5: return 'Excepcional! 🤩';
      default: return 'Clique nas estrelas para avaliar';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white dark:bg-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            {!submitted ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      Sua opinião importa! 💝
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 mt-1">
                      Como foi sua experiência no meu portfólio?
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-500" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Rating */}
                  <div className="text-center">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                      {getRatingText(hoveredStar || rating)}
                    </p>
                    <div className="flex justify-center gap-2 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoveredStar(star)}
                          onMouseLeave={() => setHoveredStar(0)}
                          className="p-1"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Star
                            className={`w-8 h-8 transition-colors ${
                              star <= (hoveredStar || rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-slate-300 dark:text-slate-600'
                            }`}
                          />
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                      Sobre o que você gostaria de comentar?
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setCategory(cat.id)}
                          className={`p-3 rounded-xl border-2 transition-all text-sm font-medium ${
                            category === cat.id
                              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300'
                              : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <div className="text-lg mb-1">{cat.icon}</div>
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Feedback Text */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Compartilhe seus pensamentos (opcional)
                    </label>
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="O que mais chamou sua atenção? Sugestões? Elogios? Críticas construtivas?"
                      className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                      rows={4}
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={rating === 0 || submitting}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: rating > 0 && !submitting ? 1.02 : 1 }}
                    whileTap={{ scale: rating > 0 && !submitting ? 0.98 : 1 }}
                  >
                    {submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Enviar Feedback
                      </>
                    )}
                  </motion.button>
                </form>

                <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-4">
                  Seu feedback me ajuda a melhorar continuamente! 🚀
                </p>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 0.6, repeat: 2 }}
                  className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Heart className="w-10 h-10 text-white" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Muito obrigada! 🙏
                </h3>
                
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  Seu feedback é muito valioso para mim! Como uma futura QA, eu sei que o feedback é essencial para a melhoria contínua.
                </p>
                
                <div className="flex justify-center gap-4 text-2xl">
                  <motion.span
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    🎉
                  </motion.span>
                  <motion.span
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    ✨
                  </motion.span>
                  <motion.span
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    🚀
                  </motion.span>
                </div>
                
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
                  Fechando automaticamente...
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FeedbackModal;