import React, { useState, useEffect } from 'react';
import { 
  LogOut, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Upload, 
  Download, 
  Settings, 
  User, 
  Award, 
  BookOpen, 
  Target, 
  Trophy,
  Eye,
  EyeOff,
  Search,
  Filter,
  RefreshCw,
  BarChart3,
  Users,
  MessageSquare,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { usePortfolioData } from '../hooks/usePortfolioData';
import PremiumButton from './PremiumButton';
import PremiumCard from './PremiumCard';
import PremiumLoadingSpinner from './PremiumLoadingSpinner';

interface AdminDashboardProps {
  onLogout: () => void;
}

type TabType = 'overview' | 'personal' | 'projects' | 'certificates' | 'skills' | 'courses' | 'achievements' | 'feedbacks';

interface EditingItem {
  type: TabType;
  item: any;
  isNew: boolean;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const { user, signOut } = useAuth();
  const { data, loading, saving, createItem, updateItem, deleteItem, uploadImage } = usePortfolioData();
  
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [editingItem, setEditingItem] = useState<EditingItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const handleLogout = async () => {
    await signOut();
    onLogout();
  };

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: BarChart3, color: 'from-blue-500 to-blue-600' },
    { id: 'personal', label: 'Informações Pessoais', icon: User, color: 'from-green-500 to-green-600' },
    { id: 'projects', label: 'Projetos', icon: Target, color: 'from-purple-500 to-purple-600' },
    { id: 'certificates', label: 'Certificados', icon: Award, color: 'from-orange-500 to-orange-600' },
    { id: 'skills', label: 'Habilidades', icon: Star, color: 'from-pink-500 to-pink-600' },
    { id: 'courses', label: 'Cursos', icon: BookOpen, color: 'from-indigo-500 to-indigo-600' },
    { id: 'achievements', label: 'Conquistas', icon: Trophy, color: 'from-yellow-500 to-yellow-600' },
    { id: 'feedbacks', label: 'Feedbacks', icon: MessageSquare, color: 'from-red-500 to-red-600' }
  ];

  const handleSave = async (formData: any) => {
    if (!editingItem) return;

    try {
      if (editingItem.isNew) {
        await createItem(editingItem.type, formData);
      } else {
        await updateItem(editingItem.type, editingItem.item.id, formData);
      }
      setEditingItem(null);
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar. Tente novamente.');
    }
  };

  const handleDelete = async (type: TabType, id: string) => {
    try {
      await deleteItem(type, id);
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error('Erro ao deletar:', error);
      alert('Erro ao deletar. Tente novamente.');
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      const result = await uploadImage(file);
      if (result.success) {
        return result.url;
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Erro no upload:', error);
      alert('Erro no upload da imagem. Tente novamente.');
      return null;
    }
  };

  const getStats = () => {
    return {
      projects: data?.projects?.length || 0,
      certificates: data?.certificates?.length || 0,
      skills: data?.skills?.length || 0,
      courses: data?.courses?.length || 0,
      achievements: data?.achievements?.length || 0,
      feedbacks: data?.feedbacks?.length || 0
    };
  };

  const renderOverview = () => {
    const stats = getStats();
    
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(stats).map(([key, value], index) => {
            const tab = tabs.find(t => t.id === key || (key === 'feedbacks' && t.id === 'feedbacks'));
            if (!tab) return null;
            
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <PremiumCard
                  variant="default"
                  padding="lg"
                  className="text-center hover:shadow-xl transition-all duration-300"
                  interactive
                  onClick={() => setActiveTab(key as TabType)}
                >
                  <div className={`bg-gradient-to-r ${tab.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <tab.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-2 font-poppins">
                    {value}
                  </h3>
                  <p className="text-slate-600 font-inter font-medium">
                    {tab.label}
                  </p>
                </PremiumCard>
              </motion.div>
            );
          })}
        </div>

        <PremiumCard variant="default" padding="lg">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Informações do Sistema</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-slate-700 mb-2">Usuário Logado</h4>
              <p className="text-slate-600">{user?.email}</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-700 mb-2">Último Login</h4>
              <p className="text-slate-600">{new Date().toLocaleString('pt-BR')}</p>
            </div>
          </div>
        </PremiumCard>
      </div>
    );
  };

  const renderPersonalInfo = () => {
    const personalInfo = data?.personalInfo;
    
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-slate-900">Informações Pessoais</h3>
          <PremiumButton
            variant="primary"
            icon={Edit}
            onClick={() => setEditingItem({
              type: 'personal',
              item: personalInfo || {},
              isNew: !personalInfo
            })}
          >
            Editar
          </PremiumButton>
        </div>

        {personalInfo ? (
          <PremiumCard variant="default" padding="lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img
                  src={personalInfo.profile_image}
                  alt={personalInfo.name}
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <label className="font-semibold text-slate-700">Nome:</label>
                  <p className="text-slate-600">{personalInfo.name}</p>
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Título:</label>
                  <p className="text-slate-600">{personalInfo.title}</p>
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Email:</label>
                  <p className="text-slate-600">{personalInfo.email}</p>
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Telefone:</label>
                  <p className="text-slate-600">{personalInfo.phone}</p>
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Localização:</label>
                  <p className="text-slate-600">{personalInfo.location}</p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <label className="font-semibold text-slate-700">Descrição:</label>
              <p className="text-slate-600 mt-2">{personalInfo.description}</p>
            </div>
          </PremiumCard>
        ) : (
          <PremiumCard variant="default" padding="lg" className="text-center">
            <p className="text-slate-600 mb-4">Nenhuma informação pessoal cadastrada</p>
            <PremiumButton
              variant="primary"
              icon={Plus}
              onClick={() => setEditingItem({
                type: 'personal',
                item: {},
                isNew: true
              })}
            >
              Adicionar Informações
            </PremiumButton>
          </PremiumCard>
        )}
      </div>
    );
  };

  const renderDataList = (type: TabType, items: any[], title: string) => {
    const filteredItems = items?.filter(item => {
      const matchesSearch = !searchTerm || 
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.title?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterCategory === 'all' || 
        item.category === filterCategory ||
        item.type === filterCategory;
      
      return matchesSearch && matchesFilter;
    }) || [];

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <PremiumButton
              variant="primary"
              icon={Plus}
              onClick={() => setEditingItem({
                type,
                item: {},
                isNew: true
              })}
            >
              Adicionar
            </PremiumButton>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <PremiumLoadingSpinner size="lg" text="Carregando..." />
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <PremiumCard variant="default" padding="lg" className="hover:shadow-lg transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-slate-900 mb-2">
                        {item.name || item.title}
                      </h4>
                      {item.company && (
                        <p className="text-slate-600 mb-1">{item.company}</p>
                      )}
                      {item.issuer && (
                        <p className="text-slate-600 mb-1">{item.issuer}</p>
                      )}
                      {item.organization && (
                        <p className="text-slate-600 mb-1">{item.organization}</p>
                      )}
                      {item.institution && (
                        <p className="text-slate-600 mb-1">{item.institution}</p>
                      )}
                      {item.description && (
                        <p className="text-slate-500 text-sm mt-2 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                      {item.level && (
                        <div className="mt-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-600">Nível:</span>
                            <div className="flex-1 bg-slate-200 rounded-full h-2">
                              <div 
                                className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${item.level}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium text-slate-700">{item.level}%</span>
                          </div>
                        </div>
                      )}
                      {item.progress !== undefined && (
                        <div className="mt-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-600">Progresso:</span>
                            <div className="flex-1 bg-slate-200 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${item.progress}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium text-slate-700">{item.progress}%</span>
                          </div>
                        </div>
                      )}
                      {item.rating && (
                        <div className="mt-2 flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < item.rating ? 'text-yellow-400 fill-current' : 'text-slate-300'
                              }`}
                            />
                          ))}
                          <span className="text-sm text-slate-600 ml-2">({item.rating}/5)</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <PremiumButton
                        variant="outline"
                        size="sm"
                        icon={Edit}
                        onClick={() => setEditingItem({
                          type,
                          item,
                          isNew: false
                        })}
                      >
                        Editar
                      </PremiumButton>
                      
                      <PremiumButton
                        variant="outline"
                        size="sm"
                        icon={Trash2}
                        onClick={() => setShowDeleteConfirm(item.id)}
                        className="text-red-600 border-red-300 hover:bg-red-50"
                      >
                        Excluir
                      </PremiumButton>
                    </div>
                  </div>
                </PremiumCard>
              </motion.div>
            ))}
          </div>
        ) : (
          <PremiumCard variant="default" padding="lg" className="text-center">
            <p className="text-slate-600 mb-4">Nenhum item encontrado</p>
            <PremiumButton
              variant="primary"
              icon={Plus}
              onClick={() => setEditingItem({
                type,
                item: {},
                isNew: true
              })}
            >
              Adicionar {title.slice(0, -1)}
            </PremiumButton>
          </PremiumCard>
        )}
      </div>
    );
  };

  const renderEditForm = () => {
    if (!editingItem) return null;

    const { type, item, isNew } = editingItem;
    const [formData, setFormData] = useState(item);
    const [uploading, setUploading] = useState(false);

    const handleInputChange = (field: string, value: any) => {
      setFormData((prev: any) => ({ ...prev, [field]: value }));
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setUploading(true);
      try {
        const url = await handleImageUpload(file);
        if (url) {
          handleInputChange('image', url);
        }
      } catch (error) {
        console.error('Erro no upload:', error);
      } finally {
        setUploading(false);
      }
    };

    const renderFormFields = () => {
      switch (type) {
        case 'personal':
          return (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Nome</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Título</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Descrição</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Telefone</label>
                <input
                  type="text"
                  value={formData.phone || ''}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Localização</label>
                <input
                  type="text"
                  value={formData.location || ''}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Imagem de Perfil</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                {uploading && <p className="text-sm text-blue-600 mt-1">Fazendo upload...</p>}
                {formData.profile_image && (
                  <img src={formData.profile_image} alt="Preview" className="mt-2 w-20 h-20 rounded-full object-cover" />
                )}
              </div>
            </div>
          );

        case 'projects':
          return (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Nome do Projeto</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Empresa</label>
                <input
                  type="text"
                  value={formData.company || ''}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tipo</label>
                <select
                  value={formData.type || ''}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Selecione um tipo</option>
                  <option value="Functional Testing">Functional Testing</option>
                  <option value="API Testing">API Testing</option>
                  <option value="Mobile Testing">Mobile Testing</option>
                  <option value="Security Testing">Security Testing</option>
                  <option value="Performance Testing">Performance Testing</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tecnologias (separadas por vírgula)</label>
                <input
                  type="text"
                  value={Array.isArray(formData.technologies) ? formData.technologies.join(', ') : ''}
                  onChange={(e) => handleInputChange('technologies', e.target.value.split(', ').filter(t => t.trim()))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Descrição</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Detalhes</label>
                <textarea
                  value={formData.details || ''}
                  onChange={(e) => handleInputChange('details', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Imagem</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                {uploading && <p className="text-sm text-blue-600 mt-1">Fazendo upload...</p>}
                {formData.image && (
                  <img src={formData.image} alt="Preview" className="mt-2 w-32 h-20 rounded object-cover" />
                )}
              </div>
            </div>
          );

        case 'skills':
          return (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Nome da Habilidade</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Nível (0-100)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.level || 0}
                  onChange={(e) => handleInputChange('level', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Categoria</label>
                <select
                  value={formData.category || ''}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Selecione uma categoria</option>
                  <option value="technical">Técnica</option>
                  <option value="documentation">Documentação</option>
                  <option value="soft">Soft Skills</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Ícone</label>
                <input
                  type="text"
                  value={formData.icon || ''}
                  onChange={(e) => handleInputChange('icon', e.target.value)}
                  placeholder="Ex: Bot, Search, Globe, etc."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          );

        default:
          return (
            <div className="text-center py-8">
              <p className="text-slate-600">Formulário não implementado para este tipo de item.</p>
            </div>
          );
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={() => setEditingItem(null)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-slate-900">
              {isNew ? 'Adicionar' : 'Editar'} {tabs.find(t => t.id === type)?.label}
            </h3>
            <button
              onClick={() => setEditingItem(null)}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-slate-500" />
            </button>
          </div>

          {renderFormFields()}

          <div className="flex gap-3 mt-8">
            <PremiumButton
              variant="primary"
              icon={Save}
              onClick={() => handleSave(formData)}
              disabled={saving}
              className="flex-1"
            >
              {saving ? 'Salvando...' : 'Salvar'}
            </PremiumButton>
            
            <PremiumButton
              variant="outline"
              onClick={() => setEditingItem(null)}
              className="flex-1"
            >
              Cancelar
            </PremiumButton>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const renderDeleteConfirm = () => {
    if (!showDeleteConfirm) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={() => setShowDeleteConfirm(null)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Confirmar Exclusão</h3>
            <p className="text-slate-600 mb-6">
              Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita.
            </p>
            <div className="flex gap-3">
              <PremiumButton
                variant="outline"
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1"
              >
                Cancelar
              </PremiumButton>
              <PremiumButton
                variant="primary"
                onClick={() => handleDelete(activeTab, showDeleteConfirm)}
                className="flex-1 bg-red-600 hover:bg-red-700"
                disabled={saving}
              >
                {saving ? 'Excluindo...' : 'Excluir'}
              </PremiumButton>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <PremiumLoadingSpinner size="xl" text="Carregando painel administrativo..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Painel Administrativo</h1>
              <p className="text-slate-600">Gerencie o conteúdo do seu portfólio</p>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600">
                Logado como: <strong>{user?.email}</strong>
              </span>
              <PremiumButton
                variant="outline"
                icon={LogOut}
                onClick={handleLogout}
              >
                Sair
              </PremiumButton>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto py-4">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`px-6 py-3 rounded-xl font-inter font-semibold transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderOverview()}
            </motion.div>
          )}

          {activeTab === 'personal' && (
            <motion.div
              key="personal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderPersonalInfo()}
            </motion.div>
          )}

          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderDataList('projects', data?.projects || [], 'Projetos')}
            </motion.div>
          )}

          {activeTab === 'certificates' && (
            <motion.div
              key="certificates"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderDataList('certificates', data?.certificates || [], 'Certificados')}
            </motion.div>
          )}

          {activeTab === 'skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderDataList('skills', data?.skills || [], 'Habilidades')}
            </motion.div>
          )}

          {activeTab === 'courses' && (
            <motion.div
              key="courses"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderDataList('courses', data?.courses || [], 'Cursos')}
            </motion.div>
          )}

          {activeTab === 'achievements' && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderDataList('achievements', data?.achievements || [], 'Conquistas')}
            </motion.div>
          )}

          {activeTab === 'feedbacks' && (
            <motion.div
              key="feedbacks"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderDataList('feedbacks', data?.feedbacks || [], 'Feedbacks')}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {editingItem && renderEditForm()}
        {showDeleteConfirm && renderDeleteConfirm()}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;