import React, { useState, useEffect } from 'react';
import { 
  LogOut, Save, Upload, Download, Trash2, Edit, Plus, 
  Image, FileText, Award, User, Settings, Database,
  Eye, EyeOff, Check, X, AlertCircle, Folder, Send,
  Search, Filter, Calendar, TrendingUp, BarChart,
  Zap, Shield, Globe, Smartphone, Bot, MessageCircle,
  Brain, Lightbulb, Users, Clock, Target, Star, Trophy,
  Camera, Mail, Phone, MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioData } from '../hooks/usePortfolioData';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'projects' | 'certificates' | 'skills' | 'courses' | 'achievements' | 'personal' | 'postman' | 'feedbacks' | 'settings'>('dashboard');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const { data: portfolioData, loading, saving, updateData, addItem, updateItem, deleteItem } = usePortfolioData();

  const handleImageUpload = async (file: File): Promise<string> => {
    setUploadingImage(true);
    try {
      const imageUrl = URL.createObjectURL(file);
      setUploadingImage(false);
      return imageUrl;
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      setUploadingImage(false);
      throw error;
    }
  };

  const handleProfileImageUpload = async (file: File) => {
    setUploadingImage(true);
    try {
      const imageUrl = URL.createObjectURL(file);
      
      if (portfolioData) {
        await updateData({
          ...portfolioData,
          personalInfo: { 
            ...portfolioData.personalInfo, 
            profileImage: imageUrl 
          }
        });
        
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2000);
      }
      
      setUploadingImage(false);
      return imageUrl;
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
      setUploadingImage(false);
      throw error;
    }
  };

  const handleAddItem = async (newItem: any) => {
    setSaveStatus('saving');
    try {
      const success = await addItem(activeTab as keyof typeof portfolioData, newItem);
      if (success) {
        setSaveStatus('saved');
        setShowAddForm(false);
        setTimeout(() => setSaveStatus('idle'), 2000);
      } else {
        setSaveStatus('error');
        setTimeout(() => setSaveStatus('idle'), 3000);
      }
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handleEditItem = async (updatedItem: any) => {
    setSaveStatus('saving');
    try {
      const success = await updateItem(activeTab as keyof typeof portfolioData, updatedItem.id, updatedItem);
      if (success) {
        setSaveStatus('saved');
        setEditingItem(null);
        setTimeout(() => setSaveStatus('idle'), 2000);
      } else {
        setSaveStatus('error');
        setTimeout(() => setSaveStatus('idle'), 3000);
      }
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    if (confirm('Tem certeza que deseja excluir este item?')) {
      setSaveStatus('saving');
      try {
        const success = await deleteItem(activeTab as keyof typeof portfolioData, itemId);
        if (success) {
          setSaveStatus('saved');
          setTimeout(() => setSaveStatus('idle'), 2000);
        } else {
          setSaveStatus('error');
          setTimeout(() => setSaveStatus('idle'), 3000);
        }
      } catch (error) {
        setSaveStatus('error');
        setTimeout(() => setSaveStatus('idle'), 3000);
      }
    }
  };

  const handleBackup = () => {
    if (!portfolioData) return;
    const dataStr = JSON.stringify(portfolioData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleRestore = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          await updateData(data);
          alert('Backup restaurado com sucesso!');
        } catch (error) {
          alert('Erro ao restaurar backup. Arquivo inválido.');
        }
      };
      reader.readAsText(file);
    }
  };

  const getStats = () => {
    if (!portfolioData) return { totalProjects: 0, totalCertificates: 0, totalSkills: 0, totalCourses: 0, totalAchievements: 0, totalFeedbacks: 0 };
    
    return {
      totalProjects: portfolioData.projects?.length || 0,
      totalCertificates: portfolioData.certificates?.length || 0,
      totalSkills: portfolioData.skills?.length || 0,
      totalCourses: portfolioData.courses?.length || 0,
      totalAchievements: portfolioData.achievements?.length || 0,
      totalFeedbacks: portfolioData.feedbacks?.length || 0,
    };
  };

  const stats = getStats();

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart, count: 0 },
    { id: 'projects', label: 'Projetos', icon: Folder, count: stats.totalProjects },
    { id: 'certificates', label: 'Certificados', icon: Award, count: stats.totalCertificates },
    { id: 'skills', label: 'Habilidades', icon: Settings, count: stats.totalSkills },
    { id: 'courses', label: 'Cursos', icon: FileText, count: stats.totalCourses },
    { id: 'achievements', label: 'Conquistas', icon: Trophy, count: stats.totalAchievements },
    { id: 'personal', label: 'Dados Pessoais', icon: User, count: 1 },
    { id: 'feedbacks', label: 'Avaliações', icon: MessageCircle, count: stats.totalFeedbacks },
    { id: 'settings', label: 'Configurações', icon: Settings, count: 0 }
  ];

  const filteredData = () => {
    if (!portfolioData) return [];
    const currentData = portfolioData[activeTab as keyof typeof portfolioData];
    if (!Array.isArray(currentData)) return [];
    
    return currentData.filter(item => {
      const matchesSearch = searchTerm === '' || 
        (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.company && item.company.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesFilter = filterCategory === 'all' || 
        (item.category && item.category === filterCategory) ||
        (item.type && item.type === filterCategory);
      
      return matchesSearch && matchesFilter;
    });
  };

  const renderItemForm = (item: any = {}, isEditing: boolean = false) => {
    const [formData, setFormData] = useState(item);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      // Processar dados específicos por tipo
      let processedData = { ...formData };
      
      if (activeTab === 'projects') {
        if (typeof processedData.technologies === 'string') {
          processedData.technologies = processedData.technologies.split(',').map((t: string) => t.trim()).filter(Boolean);
        }
      } else if (activeTab === 'certificates') {
        if (typeof processedData.skills === 'string') {
          processedData.skills = processedData.skills.split(',').map((s: string) => s.trim()).filter(Boolean);
        }
      } else if (activeTab === 'courses') {
        if (typeof processedData.skills === 'string') {
          processedData.skills = processedData.skills.split(',').map((s: string) => s.trim()).filter(Boolean);
        }
        processedData.progress = parseInt(processedData.progress) || 0;
      } else if (activeTab === 'skills') {
        processedData.level = parseInt(processedData.level) || 0;
      }

      if (isEditing) {
        handleEditItem(processedData);
      } else {
        handleAddItem(processedData);
      }
    };

    const handleImageUploadForForm = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        try {
          const imageUrl = await handleImageUpload(file);
          setFormData({ ...formData, image: imageUrl });
        } catch (error) {
          alert('Erro ao fazer upload da imagem');
        }
      }
    };

    const renderFormFields = () => {
      switch (activeTab) {
        case 'projects':
          return (
            <>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Nome do Projeto</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Empresa</label>
                <input
                  type="text"
                  value={formData.company || ''}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Tipo</label>
                <select
                  value={formData.type || ''}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700 text-white"
                  required
                >
                  <option value="">Selecione o tipo</option>
                  <option value="Functional Testing">Functional Testing</option>
                  <option value="Security Testing">Security Testing</option>
                  <option value="API Testing">API Testing</option>
                  <option value="Performance Testing">Performance Testing</option>
                  <option value="Mobile Testing">Mobile Testing</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Tecnologias (separadas por vírgula)</label>
                <input
                  type="text"
                  value={Array.isArray(formData.technologies) ? formData.technologies.join(', ') : formData.technologies || ''}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700 text-white"
                  placeholder="React, Node.js, MongoDB"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Descrição</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700 text-white h-24"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Detalhes</label>
                <textarea
                  value={formData.details || ''}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700 text-white h-32"
                />
              </div>
            </>
          );

        case 'certificates':
          return (
            <>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Nome do Certificado</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Instituição</label>
                <input
                  type="text"
                  value={formData.issuer || ''}
                  onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                  className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Data</label>
                <input
                  type="text"
                  value={formData.date || ''}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700 text-white"
                  placeholder="2024"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Categoria</label>
                <select
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700 text-white"
                  required
                >
                  <option value="">Selecione a categoria</option>
                  <option value="QA">QA</option>
                  <option value="Programming">Programming</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Business">Business</option>
                  <option value="Foundation">Foundation</option>
                  <option value="Database">Database</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Sustainability">Sustainability</option>
                  <option value="Higher Education">Higher Education</option>
                  <option value="AI">AI</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Descrição</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700 text-white h-24"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Habilidades (separadas por vírgula)</label>
                <input
                  type="text"
                  value={Array.isArray(formData.skills) ? formData.skills.join(', ') : formData.skills || ''}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700 text-white"
                  placeholder="JavaScript, React, Node.js"
                />
              </div>
            </>
          );

        case 'skills':
          return (
            <>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Nome da Habilidade</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Nível (0-100)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.level || ''}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Ícone (nome do Lucide)</label>
                <input
                  type="text"
                  value={formData.icon || ''}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700 text-white"
                  placeholder="Bot, Search, Globe, etc."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Categoria</label>
                <select
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700 text-white"
                  required
                >
                  <option value="">Selecione a categoria</option>
                  <option value="technical">Técnica</option>
                  <option value="documentation">Documentação</option>
                  <option value="soft">Soft Skills</option>
                </select>
              </div>
            </>
          );

        case 'courses':
          return (
            <>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Nome do Curso</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Instituição</label>
                <input
                  type="text"
                  value={formData.institution || ''}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Progresso (0-100)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.progress || ''}
                  onChange={(e) => setFormData({ ...formData, progress: e.target.value })}
                  className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Status</label>
                <select
                  value={formData.status || ''}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700 text-white"
                  required
                >
                  <option value="">Selecione o status</option>
                  <option value="in-progress">Em Andamento</option>
                  <option value="completed">Concluído</option>
                  <option value="paused">Pausado</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Categoria</label>
                <input
                  type="text"
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700 text-white"
                  placeholder="Tecnologia, Desenvolvimento, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Data de Início</label>
                <input
                  type="text"
                  value={formData.startDate || ''}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700 text-white"
                  placeholder="2024"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Previsão de Término</label>
                <input
                  type="text"
                  value={formData.expectedEnd || ''}
                  onChange={(e) => setFormData({ ...formData, expectedEnd: e.target.value })}
                  className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700 text-white"
                  placeholder="Dezembro 2024"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Descrição</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700 text-white h-24"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Habilidades (separadas por vírgula)</label>
                <input
                  type="text"
                  value={Array.isArray(formData.skills) ? formData.skills.join(', ') : formData.skills || ''}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700 text-white"
                  placeholder="React, Node.js, MongoDB"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Cor (classes Tailwind)</label>
                <select
                  value={formData.color || ''}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700 text-white"
                >
                  <option value="">Selecione uma cor</option>
                  <option value="from-purple-500 to-purple-600">Roxo</option>
                  <option value="from-blue-500 to-blue-600">Azul</option>
                  <option value="from-green-500 to-green-600">Verde</option>
                  <option value="from-yellow-500 to-yellow-600">Amarelo</option>
                  <option value="from-red-500 to-red-600">Vermelho</option>
                  <option value="from-indigo-500 to-indigo-600">Índigo</option>
                </select>
              </div>
            </>
          );

        case 'achievements':
          return (
            <>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Título</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Organização</label>
                <input
                  type="text"
                  value={formData.organization || ''}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Data</label>
                <input
                  type="text"
                  value={formData.date || ''}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700 text-white"
                  placeholder="2024"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Tipo</label>
                <select
                  value={formData.type || ''}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700 text-white"
                  required
                >
                  <option value="">Selecione o tipo</option>
                  <option value="recognition">Reconhecimento</option>
                  <option value="award">Prêmio</option>
                  <option value="certification">Certificação</option>
                  <option value="achievement">Conquista</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Descrição</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700 text-white h-24"
                  required
                />
              </div>
            </>
          );

        default:
          return null;
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <div className="bg-slate-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-700">
          <h3 className="text-2xl font-bold mb-6 text-white">
            {isEditing ? 'Editar' : 'Adicionar'} {tabs.find(t => t.id === activeTab)?.label}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {renderFormFields()}

            {/* Upload de Imagem (para projetos e certificados) */}
            {(activeTab === 'projects' || activeTab === 'certificates') && (
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Imagem</label>
                <div className="space-y-3">
                  {formData.image && (
                    <img src={formData.image} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUploadForForm}
                    className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700 text-white"
                  />
                  {uploadingImage && <p className="text-sm text-blue-400">Fazendo upload...</p>}
                </div>
              </div>
            )}

            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300"
              >
                {isEditing ? 'Salvar Alterações' : 'Adicionar Item'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditingItem(null);
                  setShowAddForm(false);
                }}
                className="flex-1 bg-slate-600 text-white py-3 px-6 rounded-lg hover:bg-slate-700 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    );
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-poppins font-bold text-white mb-2">
          Dashboard Administrativo
        </h2>
        <p className="text-slate-300">
          Visão geral do seu portfólio e estatísticas importantes
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Projetos', value: stats.totalProjects, icon: Folder, color: 'from-blue-500 to-blue-600' },
          { label: 'Certificados', value: stats.totalCertificates, icon: Award, color: 'from-green-500 to-green-600' },
          { label: 'Habilidades', value: stats.totalSkills, icon: Zap, color: 'from-purple-500 to-purple-600' },
          { label: 'Cursos', value: stats.totalCourses, icon: FileText, color: 'from-orange-500 to-orange-600' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:bg-slate-800/70 transition-all duration-300"
            whileHover={{ scale: 1.02, y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`bg-gradient-to-r ${stat.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-slate-400 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Ações Rápidas</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Novo Projeto', icon: Plus, tab: 'projects', color: 'from-blue-500 to-blue-600' },
            { label: 'Adicionar Certificado', icon: Award, tab: 'certificates', color: 'from-green-500 to-green-600' },
            { label: 'Nova Habilidade', icon: Zap, tab: 'skills', color: 'from-purple-500 to-purple-600' },
            { label: 'Backup Dados', icon: Download, action: handleBackup, color: 'from-orange-500 to-orange-600' }
          ].map((action, index) => (
            <motion.button
              key={index}
              onClick={() => action.tab ? setActiveTab(action.tab as any) : action.action?.()}
              className={`bg-gradient-to-r ${action.color} text-white p-4 rounded-xl hover:scale-105 transition-all duration-300 flex flex-col items-center gap-2`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <action.icon className="w-6 h-6" />
              <span className="text-sm font-medium">{action.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFeedbacks = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Avaliações dos Visitantes</h2>
      </div>

      {portfolioData?.feedbacks && portfolioData.feedbacks.length > 0 ? (
        <div className="grid gap-6">
          {portfolioData.feedbacks.map((feedback: any, index: number) => (
            <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-slate-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-slate-400">
                    {new Date(feedback.timestamp).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-xs">
                    {feedback.category}
                  </span>
                  <button
                    onClick={() => handleDeleteItem(feedback.id)}
                    className="text-red-400 hover:text-red-300 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {feedback.feedback && (
                <p className="text-slate-300 mb-3">{feedback.feedback}</p>
              )}
              
              <div className="text-xs text-slate-500">
                {feedback.userAgent}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-slate-400">
          <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>Nenhuma avaliação recebida ainda</p>
          <p className="text-sm">As avaliações dos visitantes aparecerão aqui</p>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    if (activeTab === 'dashboard') {
      return renderDashboard();
    }

    if (activeTab === 'feedbacks') {
      return renderFeedbacks();
    }

    if (activeTab === 'personal') {
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Dados Pessoais</h2>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
            {/* Foto de Perfil */}
            <div className="mb-8">
              <label className="block text-sm font-medium mb-4 text-slate-300">Foto de Perfil</label>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <img
                    src={portfolioData?.personalInfo?.profileImage || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-slate-600"
                  />
                  {uploadingImage && (
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </div>
                <div>
                  <label className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 cursor-pointer flex items-center gap-2">
                    <Camera className="w-4 h-4" />
                    Alterar Foto
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          try {
                            await handleProfileImageUpload(file);
                          } catch (error) {
                            alert('Erro ao fazer upload da imagem');
                          }
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-slate-400 mt-2">
                    Recomendado: 400x400px, formato JPG ou PNG
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Nome</label>
                <input
                  type="text"
                  value={portfolioData?.personalInfo?.name || ''}
                  onChange={(e) => {
                    if (portfolioData) {
                      updateData({
                        ...portfolioData,
                        personalInfo: { ...portfolioData.personalInfo, name: e.target.value }
                      });
                    }
                  }}
                  className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Título</label>
                <input
                  type="text"
                  value={portfolioData?.personalInfo?.title || ''}
                  onChange={(e) => {
                    if (portfolioData) {
                      updateData({
                        ...portfolioData,
                        personalInfo: { ...portfolioData.personalInfo, title: e.target.value }
                      });
                    }
                  }}
                  className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700 text-white"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2 text-slate-300">Descrição</label>
                <textarea
                  value={portfolioData?.personalInfo?.description || ''}
                  onChange={(e) => {
                    if (portfolioData) {
                      updateData({
                        ...portfolioData,
                        personalInfo: { ...portfolioData.personalInfo, description: e.target.value }
                      });
                    }
                  }}
                  className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700 text-white h-24"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={portfolioData?.personalInfo?.email || ''}
                    onChange={(e) => {
                      if (portfolioData) {
                        updateData({
                          ...portfolioData,
                          personalInfo: { ...portfolioData.personalInfo, email: e.target.value }
                        });
                      }
                    }}
                    className="w-full pl-10 pr-3 py-3 border border-slate-600 rounded-lg bg-slate-700 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Telefone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={portfolioData?.personalInfo?.phone || ''}
                    onChange={(e) => {
                      if (portfolioData) {
                        updateData({
                          ...portfolioData,
                          personalInfo: { ...portfolioData.personalInfo, phone: e.target.value }
                        });
                      }
                    }}
                    className="w-full pl-10 pr-3 py-3 border border-slate-600 rounded-lg bg-slate-700 text-white"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2 text-slate-300">Localização</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={portfolioData?.personalInfo?.location || ''}
                    onChange={(e) => {
                      if (portfolioData) {
                        updateData({
                          ...portfolioData,
                          personalInfo: { ...portfolioData.personalInfo, location: e.target.value }
                        });
                      }
                    }}
                    className="w-full pl-10 pr-3 py-3 border border-slate-600 rounded-lg bg-slate-700 text-white"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={() => {
                  setSaveStatus('saved');
                  setTimeout(() => setSaveStatus('idle'), 2000);
                }}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Salvar Dados Pessoais
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === 'settings') {
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Configurações</h2>
          <div className="grid gap-6">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4 text-white">Backup e Restauração</h3>
              <div className="flex gap-4">
                <button
                  onClick={handleBackup}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Fazer Backup
                </button>
                <label className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Restaurar Backup
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleRestore}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-white">
            {tabs.find(t => t.id === activeTab)?.label}
          </h2>
          
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Adicionar
            </button>
          </div>
        </div>

        <div className="grid gap-6">
          {filteredData().map((item: any) => (
            <div key={item.id} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 hover:bg-slate-800/70 transition-all duration-300">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white">
                    {item.name || item.title}
                  </h3>
                  <p className="text-slate-400">
                    {item.company || item.issuer || item.organization || item.institution || item.description}
                  </p>
                  {item.image && (
                    <img src={item.image} alt="" className="w-20 h-20 object-cover rounded mt-2" />
                  )}
                  {item.level && (
                    <div className="mt-2">
                      <span className="text-sm text-slate-300">Nível: {item.level}%</span>
                    </div>
                  )}
                  {item.progress && (
                    <div className="mt-2">
                      <span className="text-sm text-slate-300">Progresso: {item.progress}%</span>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingItem(item)}
                    className="text-blue-400 hover:text-blue-300 p-2"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="text-red-400 hover:text-red-300 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredData().length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <p>Nenhum item encontrado</p>
              <p className="text-sm">Clique em "Adicionar" para criar o primeiro item</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center">
        <div className="text-white text-xl">Carregando dados...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl">
                EG
              </div>
              <div>
                <h1 className="text-2xl font-bold">Painel Administrativo</h1>
                <p className="text-slate-400">Gerenciamento de Conteúdo</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Status de Salvamento */}
              <div className="flex items-center gap-2">
                {saveStatus === 'saving' && (
                  <div className="flex items-center gap-2 text-blue-400">
                    <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm">Salvando...</span>
                  </div>
                )}
                {saveStatus === 'saved' && (
                  <div className="flex items-center gap-2 text-green-400">
                    <Check className="w-4 h-4" />
                    <span className="text-sm">Salvo!</span>
                  </div>
                )}
                {saveStatus === 'error' && (
                  <div className="flex items-center gap-2 text-red-400">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">Erro ao salvar</span>
                  </div>
                )}
              </div>
              
              <button
                onClick={onLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 sticky top-24">
              <h2 className="text-lg font-bold mb-6 text-white">Seções</h2>
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-300 flex items-center justify-between ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <tab.icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </div>
                    {tab.count > 0 && (
                      <span className="bg-slate-600 text-white text-xs px-2 py-1 rounded-full">
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {editingItem && renderItemForm(editingItem, true)}
        {showAddForm && renderItemForm()}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;