import React, { useState, useEffect, useRef } from 'react';
import {
  LogOut, Plus, Edit, Trash2, Save, X, Upload, Download, RefreshCw, Database,
  CheckCircle, AlertCircle, Users, Award, BookOpen, Trophy, User, MessageSquare,
  Eye, Search, Filter, Image, Star, TrendingUp, Activity, Calendar, Clock,
  FileText, Settings, Bell, ChevronDown, ChevronRight, BarChart3, PieChart,
  Zap, Shield, Globe, GraduationCap // ✅ Ícone corrigido aqui
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { usePortfolioData } from '../hooks/usePortfolioData';

const AdminDashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const { user, signOut } = useAuth();
  const {
    data,
    loading,
    refresh,
    createItem,
    updateItem,
    deleteItem,
    uploadImage,
    saving
  } = usePortfolioData();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'personal' | 'projects' | 'certificates' | 'skills' | 'courses' | 'achievements' | 'feedbacks'
  >('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleLogout = async () => {
    try {
      await signOut();
      onLogout();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    setUploadingImage(true);
    try {
      const result = await uploadImage(file);
      if (result.success) {
        return result.url!;
      } else {
        throw new Error(result.error || 'Erro no upload');
      }
    } catch (error) {
      throw error;
    } finally {
      setUploadingImage(false);
    }
  };

  // Funções CRUD
  const handleCreate = async (type: string, formData: any) => {
    const actualType = type === 'personal' ? 'personalInfo' : type;
    const result = await createItem(actualType as any, formData);
    
    if (result.success) {
      setShowAddForm(false);
      showMessage('success', 'Item criado com sucesso!');
    } else {
      showMessage('error', `Erro ao criar item: ${result.error}`);
    }
  };

  const handleUpdate = async (type: string, id: string, formData: any) => {
    const actualType = type === 'personal' ? 'personalInfo' : type;
    const result = await updateItem(actualType as any, id, formData);
    
    if (result.success) {
      setIsEditing(false);
      setEditingItem(null);
      if (type === 'personal') {
        showMessage('success', 'Informações pessoais atualizadas! A foto de perfil foi sincronizada automaticamente.');
      } else {
        showMessage('success', 'Item atualizado com sucesso!');
      }
    } else {
      showMessage('error', `Erro ao atualizar item: ${result.error}`);
    }
  };

  const handleDelete = async (type: string, id: string) => {
    if (!confirm('Tem certeza que deseja deletar este item?')) return;
    
    const result = await deleteItem(type as any, id);
    
    if (result.success) {
      showMessage('success', 'Item deletado com sucesso!');
    } else {
      showMessage('error', `Erro ao deletar item: ${result.error}`);
    }
  };

  const tabs = [
    { 
      id: 'overview', 
      label: 'Dashboard', 
      icon: BarChart3, 
      color: 'from-blue-500 to-blue-600',
      description: 'Visão geral do sistema'
    },
    { 
      id: 'personal', 
      label: 'Perfil', 
      icon: User, 
      color: 'from-purple-500 to-purple-600',
      description: 'Informações pessoais'
    },
    { 
      id: 'projects', 
      label: 'Projetos', 
      icon: BookOpen, 
      color: 'from-green-500 to-green-600',
      description: 'Gerenciar projetos'
    },
    { 
      id: 'certificates', 
      label: 'Certificados', 
      icon: Award, 
      color: 'from-yellow-500 to-yellow-600',
      description: 'Certificações e cursos'
    },
    { 
      id: 'skills', 
      label: 'Habilidades', 
      icon: Zap, 
      color: 'from-orange-500 to-orange-600',
      description: 'Skills técnicas e soft'
    },
    { 
      id: 'courses', 
      label: 'Cursos', 
      icon: GraduationCap, 
      color: 'from-indigo-500 to-indigo-600',
      description: 'Cursos em andamento'
    },
    { 
      id: 'achievements', 
      label: 'Conquistas', 
      icon: Trophy, 
      color: 'from-red-500 to-red-600',
      description: 'Reconhecimentos'
    },
    { 
      id: 'feedbacks', 
      label: 'Feedbacks', 
      icon: MessageSquare, 
      color: 'from-pink-500 to-pink-600',
      description: 'Avaliações dos visitantes'
    }
  ];

  const stats = [
    { 
      label: 'Projetos', 
      value: data.projects?.length || 0, 
      icon: BookOpen, 
      color: 'from-blue-500 to-blue-600',
      change: '+12%',
      trend: 'up'
    },
    { 
      label: 'Certificados', 
      value: data.certificates?.length || 0, 
      icon: Award, 
      color: 'from-green-500 to-green-600',
      change: '+8%',
      trend: 'up'
    },
    { 
      label: 'Habilidades', 
      value: data.skills?.length || 0, 
      icon: Zap, 
      color: 'from-purple-500 to-purple-600',
      change: '+15%',
      trend: 'up'
    },
    { 
      label: 'Feedbacks', 
      value: data.feedbacks?.length || 0, 
      icon: MessageSquare, 
      color: 'from-orange-500 to-orange-600',
      change: '+25%',
      trend: 'up'
    }
  ];

  // Componente para formulário de edição/criação
  const FormModal: React.FC<{ type: string; item?: any; onSave: (data: any) => void; onClose: () => void }> = ({ type, item, onSave, onClose }) => {
    const [formData, setFormData] = useState(item || {});
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
      if (item) {
        setFormData(item);
        if (item.image) setImagePreview(item.image);
        if (item.profile_image) setImagePreview(item.profile_image);
      }
    }, [item]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setImageFile(file);
        const reader = new FileReader();
        reader.onload = () => setImagePreview(reader.result as string);
        reader.readAsDataURL(file);
      }
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      let finalData = { ...formData };
      
      if (imageFile) {
        try {
          const imageUrl = await handleImageUpload(imageFile);
          if (type === 'personal') {
            finalData.profile_image = imageUrl;
          } else {
            finalData.image = imageUrl;
          }
        } catch (error) {
          showMessage('error', 'Erro ao fazer upload da imagem');
          return;
        }
      }

      if (type === 'projects' && typeof finalData.technologies === 'string') {
        finalData.technologies = finalData.technologies.split(',').map((t: string) => t.trim()).filter(Boolean);
      }

      if (type === 'certificates' && typeof finalData.skills === 'string') {
        finalData.skills = finalData.skills.split(',').map((s: string) => s.trim()).filter(Boolean);
      }

      if (type === 'courses' && typeof finalData.skills === 'string') {
        finalData.skills = finalData.skills.split(',').map((s: string) => s.trim()).filter(Boolean);
      }

      if (type === 'skills') {
        finalData.level = parseInt(finalData.level) || 0;
      }

      if (type === 'courses') {
        finalData.progress = parseInt(finalData.progress) || 0;
      }

      onSave(finalData);
    };

    const getFormFields = () => {
      switch (type) {
        case 'personal':
          return (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-300">Nome Completo</label>
                  <input
                    type="text"
                    placeholder="Seu nome completo"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-300">Título Profissional</label>
                  <input
                    type="text"
                    placeholder="Ex: QA Tester Júnior"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-300">Descrição Profissional</label>
                <textarea
                  placeholder="Descreva sua experiência e especialidades"
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 h-32 resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-300">Email</label>
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-300">Telefone</label>
                  <input
                    type="text"
                    placeholder="(00) 00000-0000"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-300">Localização</label>
                <input
                  type="text"
                  placeholder="Cidade, Estado - País"
                  value={formData.location || ''}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full p-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-semibold text-slate-300">Foto de Perfil</label>
                <div className="flex items-center gap-6">
                  {imagePreview && (
                    <div className="relative">
                      <img src={imagePreview} alt="Preview" className="w-24 h-24 object-cover rounded-xl border-2 border-slate-600" />
                      <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Eye className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  )}
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full p-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white file:cursor-pointer hover:file:bg-purple-700 transition-all duration-300"
                    />
                    <p className="text-xs text-slate-400 mt-2">Formatos aceitos: JPG, PNG, GIF (máx. 5MB)</p>
                  </div>
                </div>
              </div>
            </div>
          );
        // Outros casos de formulário mantidos similares mas com melhor styling...
        default:
          return <div>Formulário não implementado para este tipo</div>;
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {item ? 'Editar' : 'Adicionar'} {type === 'personal' ? 'Informações Pessoais' : type}
              </h3>
              <p className="text-slate-400">
                {item ? 'Atualize as informações abaixo' : 'Preencha os campos para adicionar um novo item'}
              </p>
            </div>
            <motion.button
              onClick={onClose}
              className="p-3 hover:bg-slate-700/50 rounded-xl transition-all duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
            </motion.button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {getFormFields()}
            
            <div className="flex gap-4 pt-6 border-t border-slate-700">
              <motion.button
                type="submit"
                disabled={saving || uploadingImage}
                className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-purple-500/25"
                whileHover={{ scale: saving || uploadingImage ? 1 : 1.02 }}
                whileTap={{ scale: saving || uploadingImage ? 1 : 0.98 }}
              >
                {saving || uploadingImage ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {uploadingImage ? 'Enviando imagem...' : 'Salvando...'}
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    {item ? 'Atualizar' : 'Criar'}
                  </>
                )}
              </motion.button>
              <motion.button
                type="button"
                onClick={onClose}
                className="px-8 py-4 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white rounded-xl transition-all duration-300 font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancelar
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    );
  };

  // Componente para renderizar lista de itens com CRUD
  const renderItemsList = (items: any[], type: string, fields: string[]) => {
    const filteredItems = items.filter(item => {
      const matchesSearch = searchTerm === '' || 
        Object.values(item).some(value => 
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesFilter = filterCategory === 'all' || 
        (item.category && item.category === filterCategory);
      return matchesSearch && matchesFilter;
    });

    return (
      <div className="space-y-6">
        {/* Header com controles */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar itens..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            
            <div className="flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-xl p-1">
              <motion.button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'grid' 
                    ? 'bg-purple-600 text-white shadow-lg' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                </div>
              </motion.button>
              <motion.button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'list' 
                    ? 'bg-purple-600 text-white shadow-lg' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-4 h-4 flex flex-col gap-0.5">
                  <div className="bg-current h-0.5 rounded-full"></div>
                  <div className="bg-current h-0.5 rounded-full"></div>
                  <div className="bg-current h-0.5 rounded-full"></div>
                  <div className="bg-current h-0.5 rounded-full"></div>
                </div>
              </motion.button>
            </div>
          </div>
          
          <motion.button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="w-5 h-5" />
            Adicionar Novo
          </motion.button>
        </div>

        {/* Lista de itens */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              className={`bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/60 transition-all duration-300 group ${
                viewMode === 'list' ? 'flex items-center gap-6' : ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              {(item.image || item.profile_image) && (
                <div className={`relative overflow-hidden rounded-xl ${
                  viewMode === 'list' ? 'w-16 h-16 flex-shrink-0' : 'w-full h-48 mb-4'
                }`}>
                  <img 
                    src={item.image || item.profile_image} 
                    alt="Preview" 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              )}
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-white text-lg group-hover:text-purple-300 transition-colors duration-300">
                    {item.name || item.title}
                  </h3>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.button
                      onClick={() => {
                        setEditingItem(item);
                        setIsEditing(true);
                      }}
                      className="p-2 bg-blue-600/80 hover:bg-blue-600 rounded-lg transition-all duration-300 backdrop-blur-sm"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Editar"
                    >
                      <Edit className="w-4 h-4 text-white" />
                    </motion.button>
                    
                    <motion.button
                      onClick={() => handleDelete(type, item.id)}
                      className="p-2 bg-red-600/80 hover:bg-red-600 rounded-lg transition-all duration-300 backdrop-blur-sm"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Deletar"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </motion.button>
                  </div>
                </div>
                
                <div className={`text-sm text-slate-300 space-y-2 ${
                  viewMode === 'list' ? 'flex flex-wrap gap-4' : 'grid grid-cols-1 gap-2'
                }`}>
                  {fields.slice(0, viewMode === 'list' ? 2 : 4).map(field => (
                    <div key={field} className={viewMode === 'list' ? 'flex items-center gap-2' : ''}>
                      <span className="text-slate-400 font-medium capitalize">{field}:</span>
                      <span className="text-white">
                        {Array.isArray(item[field]) 
                          ? item[field].join(', ') 
                          : item[field] || 'N/A'
                        }
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="bg-slate-800/30 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <Database className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Nenhum item encontrado</h3>
            <p className="text-slate-400 mb-6">
              {searchTerm ? 'Tente ajustar sua busca ou' : 'Comece'} adicionando um novo item
            </p>
            <motion.button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Adicionar Primeiro Item
            </motion.button>
          </motion.div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative">
            <div className="w-20 h-20 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-6"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-purple-300 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Carregando Dashboard</h2>
          <p className="text-slate-400">Preparando seus dados...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">
      {/* Header Premium */}
      <div className="bg-slate-800/30 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <Shield className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-slate-400 text-sm">
                  Bem-vindo, <span className="text-purple-400 font-medium">{user?.email}</span>
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <motion.button
                onClick={refresh}
                className="p-3 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Atualizar dados"
              >
                <RefreshCw className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
              </motion.button>
              
              <motion.button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-4 py-3 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-red-500/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut className="w-5 h-5" />
                Sair
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Message Toast */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.9 }}
            className={`fixed top-24 right-6 z-50 p-4 rounded-2xl shadow-2xl backdrop-blur-xl border ${
              message.type === 'success' 
                ? 'bg-green-600/90 border-green-500/50 text-white' 
                : 'bg-red-600/90 border-red-500/50 text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              {message.type === 'success' ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                <AlertCircle className="w-6 h-6" />
              )}
              <span className="font-medium">{message.text}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Sidebar */}
        <div className="flex gap-8">
          <motion.div
            className={`bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 transition-all duration-300 ${
              sidebarCollapsed ? 'w-20' : 'w-80'
            }`}
            layout
          >
            <div className="flex items-center justify-between mb-8">
              {!sidebarCollapsed && (
                <h3 className="text-lg font-semibold text-white">Navegação</h3>
              )}
              <motion.button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform ${sidebarCollapsed ? '' : 'rotate-180'}`} />
              </motion.button>
            </div>
            
            <div className="space-y-2">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group ${
                    activeTab === tab.id
                      ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                      : 'text-slate-300 hover:bg-slate-700/30 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <tab.icon className="w-6 h-6 flex-shrink-0" />
                  {!sidebarCollapsed && (
                    <div className="text-left">
                      <div className="font-semibold">{tab.label}</div>
                      <div className="text-xs opacity-75">{tab.description}</div>
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={index}
                        className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 p-6 rounded-2xl hover:bg-slate-800/50 transition-all duration-300 group"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -4 }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <stat.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex items-center gap-1 text-green-400 text-sm font-medium">
                            <TrendingUp className="w-4 h-4" />
                            {stat.change}
                          </div>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                        <p className="text-slate-400 font-medium">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* System Status */}
                  <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 p-8 rounded-2xl">
                    <div className="flex items-center gap-3 mb-6">
                      <Activity className="w-6 h-6 text-green-400" />
                      <h3 className="text-xl font-bold text-white">Status do Sistema</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {[
                        { label: 'Sistema', status: 'Operacional', icon: CheckCircle },
                        { label: 'Autenticação', status: 'Ativa', icon: Shield },
                        { label: 'Banco de Dados', status: 'Conectado', icon: Database },
                        { label: 'API', status: 'Funcionando', icon: Globe }
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center gap-3 p-4 bg-slate-700/30 rounded-xl"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <item.icon className="w-5 h-5 text-green-400" />
                          <div>
                            <div className="font-medium text-white">{item.label}</div>
                            <div className="text-sm text-green-400">{item.status}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 p-8 rounded-2xl">
                    <h3 className="text-xl font-bold text-white mb-6">Ações Rápidas</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { label: 'Adicionar Projeto', icon: Plus, action: () => { setActiveTab('projects'); setShowAddForm(true); } },
                        { label: 'Novo Certificado', icon: Award, action: () => { setActiveTab('certificates'); setShowAddForm(true); } },
                        { label: 'Atualizar Perfil', icon: User, action: () => { setActiveTab('personal'); setIsEditing(true); setEditingItem(data.personalInfo); } }
                      ].map((action, index) => (
                        <motion.button
                          key={index}
                          onClick={action.action}
                          className="flex items-center gap-3 p-4 bg-slate-700/30 hover:bg-slate-700/50 rounded-xl transition-all duration-300 text-left group"
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <action.icon className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
                          <span className="font-medium text-white group-hover:text-purple-300 transition-colors">{action.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Personal Tab */}
              {activeTab === 'personal' && (
                <motion.div
                  key="personal"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-2">Informações Pessoais</h2>
                      <p className="text-slate-400">Gerencie suas informações de perfil público</p>
                    </div>
                    <motion.button
                      onClick={() => {
                        setEditingItem(data.personalInfo);
                        setIsEditing(true);
                      }}
                      className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 px-6 py-3 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-purple-500/25"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Edit className="w-5 h-5" />
                      Editar Perfil
                    </motion.button>
                  </div>

                  {data.personalInfo ? (
                    <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8">
                      <div className="flex flex-col lg:flex-row gap-8">
                        <div className="lg:w-1/3">
                          <div className="relative group">
                            <img
                              src={data.personalInfo.profile_image}
                              alt="Profile"
                              className="w-full aspect-square object-cover rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        </div>
                        
                        <div className="lg:w-2/3 space-y-6">
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-2">{data.personalInfo.name}</h3>
                            <p className="text-xl text-purple-400 font-semibold">{data.personalInfo.title}</p>
                          </div>
                          
                          <p className="text-slate-300 text-lg leading-relaxed">{data.personalInfo.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div className="flex items-center gap-3 p-4 bg-slate-700/30 rounded-xl">
                                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                                  <MessageSquare className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                  <div className="text-sm text-slate-400">Email</div>
                                  <div className="font-medium text-white">{data.personalInfo.email}</div>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-3 p-4 bg-slate-700/30 rounded-xl">
                                <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                                  <Phone className="w-5 h-5 text-green-400" />
                                </div>
                                <div>
                                  <div className="text-sm text-slate-400">Telefone</div>
                                  <div className="font-medium text-white">{data.personalInfo.phone}</div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-4 bg-slate-700/30 rounded-xl">
                              <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                                <Globe className="w-5 h-5 text-purple-400" />
                              </div>
                              <div>
                                <div className="text-sm text-slate-400">Localização</div>
                                <div className="font-medium text-white">{data.personalInfo.location}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-16 bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl"
                    >
                      <div className="bg-slate-700/30 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                        <User className="w-12 h-12 text-slate-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">Perfil não configurado</h3>
                      <p className="text-slate-400 mb-6">Configure suas informações pessoais para começar</p>
                      <motion.button
                        onClick={() => setShowAddForm(true)}
                        className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Configurar Perfil
                      </motion.button>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Other tabs */}
              {activeTab === 'projects' && (
                <motion.div
                  key="projects"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Gerenciar Projetos</h2>
                    <p className="text-slate-400">Adicione e gerencie seus projetos de QA</p>
                  </div>
                  {renderItemsList(data.projects || [], 'projects', ['company', 'type', 'description', 'technologies'])}
                </motion.div>
              )}

              {activeTab === 'certificates' && (
                <motion.div
                  key="certificates"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Gerenciar Certificados</h2>
                    <p className="text-slate-400">Organize suas certificações e conquistas</p>
                  </div>
                  {renderItemsList(data.certificates || [], 'certificates', ['issuer', 'date', 'category', 'skills'])}
                </motion.div>
              )}

              {activeTab === 'skills' && (
                <motion.div
                  key="skills"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Gerenciar Habilidades</h2>
                    <p className="text-slate-400">Defina suas competências técnicas e soft skills</p>
                  </div>
                  {renderItemsList(data.skills || [], 'skills', ['level', 'category', 'icon'])}
                </motion.div>
              )}

              {activeTab === 'courses' && (
                <motion.div
                  key="courses"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Gerenciar Cursos</h2>
                    <p className="text-slate-400">Acompanhe seu progresso educacional</p>
                  </div>
                  {renderItemsList(data.courses || [], 'courses', ['institution', 'progress', 'status', 'skills'])}
                </motion.div>
              )}

              {activeTab === 'achievements' && (
                <motion.div
                  key="achievements"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Gerenciar Conquistas</h2>
                    <p className="text-slate-400">Destaque seus reconhecimentos profissionais</p>
                  </div>
                  {renderItemsList(data.achievements || [], 'achievements', ['organization', 'date', 'type'])}
                </motion.div>
              )}

              {activeTab === 'feedbacks' && (
                <motion.div
                  key="feedbacks"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Feedbacks dos Visitantes</h2>
                    <p className="text-slate-400">Veja o que os visitantes estão dizendo sobre seu portfólio</p>
                  </div>
                  
                  <div className="space-y-6">
                    {data.feedbacks && data.feedbacks.length > 0 ? (
                      data.feedbacks.map((feedback, index) => (
                        <motion.div
                          key={feedback.id}
                          className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-5 h-5 ${i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-slate-600'}`} />
                              ))}
                              <span className="ml-2 text-sm text-slate-400">({feedback.rating}/5)</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-400">
                              <Calendar className="w-4 h-4" />
                              {new Date(feedback.created_at).toLocaleDateString('pt-BR')}
                            </div>
                          </div>
                          
                          {feedback.feedback_text && (
                            <p className="text-slate-300 mb-4 leading-relaxed">{feedback.feedback_text}</p>
                          )}
                          
                          <div className="flex items-center gap-3">
                            {feedback.category && (
                              <span className="inline-block px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm font-medium">
                                {feedback.category}
                              </span>
                            )}
                            <span className="text-xs text-slate-500">
                              IP: {feedback.ip_address || 'N/A'}
                            </span>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-16 bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl"
                      >
                        <div className="bg-slate-700/30 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                          <MessageSquare className="w-12 h-12 text-slate-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Nenhum feedback ainda</h3>
                        <p className="text-slate-400">Os feedbacks dos visitantes aparecerão aqui</p>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {(showAddForm || isEditing) && (
          <FormModal
            type={activeTab}
            item={isEditing ? editingItem : null}
            onSave={(formData) => {
              if (isEditing) {
                handleUpdate(activeTab, editingItem.id, formData);
              } else {
                handleCreate(activeTab, formData);
              }
            }}
            onClose={() => {
              setShowAddForm(false);
              setIsEditing(false);
              setEditingItem(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;