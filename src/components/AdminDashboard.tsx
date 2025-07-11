import React, { useState, useEffect, useRef } from 'react';
import { LogOut, Plus, Edit, Trash2, Save, X, Upload, Download, RefreshCw, Database, CheckCircle, AlertCircle, Users, Award, BookOpen, Trophy, User, MessageSquare, Eye, Search, Filter, Image } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { usePortfolioData } from '../hooks/usePortfolioData';

const AdminDashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const { user, signOut } = useAuth();
  const { data, loading, refresh, createItem, updateItem, deleteItem, uploadImage, saving } = usePortfolioData();
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'certificates' | 'skills' | 'courses' | 'achievements' | 'personal' | 'feedbacks'>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [uploadingImage, setUploadingImage] = useState(false);
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
    const result = await createItem(type as any, formData);
    
    if (result.success) {
      setShowAddForm(false);
      showMessage('success', 'Item criado com sucesso!');
    } else {
      showMessage('error', `Erro ao criar item: ${result.error}`);
    }
  };

  const handleUpdate = async (type: string, id: string, formData: any) => {
    const result = await updateItem(type as any, id, formData);
    
    if (result.success) {
      setIsEditing(false);
      setEditingItem(null);
      showMessage('success', 'Item atualizado com sucesso!');
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
    { id: 'overview', label: 'Visão Geral', icon: Database },
    { id: 'personal', label: 'Pessoal', icon: User },
    { id: 'projects', label: 'Projetos', icon: BookOpen },
    { id: 'certificates', label: 'Certificados', icon: Award },
    { id: 'skills', label: 'Habilidades', icon: Trophy },
    { id: 'courses', label: 'Cursos', icon: BookOpen },
    { id: 'achievements', label: 'Conquistas', icon: Trophy },
    { id: 'feedbacks', label: 'Feedbacks', icon: MessageSquare }
  ];

  const stats = [
    { label: 'Projetos', value: data.projects?.length || 0, icon: BookOpen, color: 'from-blue-500 to-blue-600' },
    { label: 'Certificados', value: data.certificates?.length || 0, icon: Award, color: 'from-green-500 to-green-600' },
    { label: 'Habilidades', value: data.skills?.length || 0, icon: Trophy, color: 'from-purple-500 to-purple-600' },
    { label: 'Cursos', value: data.courses?.length || 0, icon: BookOpen, color: 'from-orange-500 to-orange-600' },
    { label: 'Conquistas', value: data.achievements?.length || 0, icon: Trophy, color: 'from-red-500 to-red-600' },
    { label: 'Feedbacks', value: data.feedbacks?.length || 0, icon: MessageSquare, color: 'from-indigo-500 to-indigo-600' }
  ];

  // Componente para formulário de edição/criação
  const FormModal: React.FC<{ type: string; item?: any; onSave: (data: any) => void; onClose: () => void }> = ({ type, item, onSave, onClose }) => {
    const [formData, setFormData] = useState(item || {});
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
      if (item) {
        setFormData(item);
        // Set preview for existing images
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
      
      // Upload de imagem se necessário
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

      // Processar arrays para projetos
      if (type === 'projects' && typeof finalData.technologies === 'string') {
        finalData.technologies = finalData.technologies.split(',').map((t: string) => t.trim()).filter(Boolean);
      }

      // Processar arrays para certificados
      if (type === 'certificates' && typeof finalData.skills === 'string') {
        finalData.skills = finalData.skills.split(',').map((s: string) => s.trim()).filter(Boolean);
      }

      // Processar arrays para cursos
      if (type === 'courses' && typeof finalData.skills === 'string') {
        finalData.skills = finalData.skills.split(',').map((s: string) => s.trim()).filter(Boolean);
      }

      // Converter números
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
            <>
              <input
                type="text"
                placeholder="Nome"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                required
              />
              <input
                type="text"
                placeholder="Título"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                required
              />
              <textarea
                placeholder="Descrição"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white h-24"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                required
              />
              <input
                type="text"
                placeholder="Telefone"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                required
              />
              <input
                type="text"
                placeholder="Localização"
                value={formData.location || ''}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                required
              />
              <div>
                <label className="block text-white mb-2">Foto de Perfil</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                />
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" className="mt-2 w-20 h-20 object-cover rounded-lg" />
                )}
              </div>
            </>
          );
        case 'projects':
          return (
            <>
              <input
                type="text"
                placeholder="Nome do Projeto"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                required
              />
              <input
                type="text"
                placeholder="Empresa"
                value={formData.company || ''}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                required
              />
              <select
                value={formData.type || ''}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                required
              >
                <option value="">Selecione o tipo</option>
                <option value="Functional Testing">Functional Testing</option>
                <option value="API Testing">API Testing</option>
                <option value="Mobile Testing">Mobile Testing</option>
                <option value="Security Testing">Security Testing</option>
                <option value="Performance Testing">Performance Testing</option>
              </select>
              <input
                type="text"
                placeholder="Tecnologias (separadas por vírgula)"
                value={Array.isArray(formData.technologies) ? formData.technologies.join(', ') : formData.technologies || ''}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
              />
              <textarea
                placeholder="Descrição"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white h-24"
                required
              />
              <textarea
                placeholder="Detalhes"
                value={formData.details || ''}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white h-32"
                required
              />
              <div>
                <label className="block text-white mb-2">Imagem do Projeto</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                />
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-20 object-cover rounded-lg" />
                )}
              </div>
            </>
          );
        case 'certificates':
          return (
            <>
              <input
                type="text"
                placeholder="Nome do Certificado"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                required
              />
              <input
                type="text"
                placeholder="Instituição"
                value={formData.issuer || ''}
                onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                required
              />
              <input
                type="text"
                placeholder="Data"
                value={formData.date || ''}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                required
              />
              <select
                value={formData.category || ''}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                required
              >
                <option value="">Selecione a categoria</option>
                <option value="QA">QA</option>
                <option value="Programming">Programming</option>
                <option value="Web Development">Web Development</option>
                <option value="Business">Business</option>
                <option value="Higher Education">Higher Education</option>
                <option value="AI">AI</option>
                <option value="Database">Database</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Sustainability">Sustainability</option>
                <option value="Foundation">Foundation</option>
                <option value="Development">Development</option>
              </select>
              <textarea
                placeholder="Descrição"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white h-24"
              />
              <input
                type="text"
                placeholder="Habilidades (separadas por vírgula)"
                value={Array.isArray(formData.skills) ? formData.skills.join(', ') : formData.skills || ''}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
              />
              <div>
                <label className="block text-white mb-2">Imagem do Certificado</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                />
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-20 object-cover rounded-lg" />
                )}
              </div>
            </>
          );
        case 'skills':
          return (
            <>
              <input
                type="text"
                placeholder="Nome da Habilidade"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                required
              />
              <input
                type="number"
                placeholder="Nível (0-100)"
                min="0"
                max="100"
                value={formData.level || ''}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                required
              />
              <select
                value={formData.category || ''}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                required
              >
                <option value="">Selecione a categoria</option>
                <option value="technical">Técnica</option>
                <option value="documentation">Documentação</option>
                <option value="soft">Soft Skills</option>
              </select>
              <select
                value={formData.icon || ''}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                required
              >
                <option value="">Selecione um ícone</option>
                <option value="Bot">Bot</option>
                <option value="Search">Search</option>
                <option value="Globe">Globe</option>
                <option value="Zap">Zap</option>
                <option value="Shield">Shield</option>
                <option value="Eye">Eye</option>
                <option value="FileText">FileText</option>
                <option value="MessageCircle">MessageCircle</option>
                <option value="Users">Users</option>
                <option value="Brain">Brain</option>
                <option value="Lightbulb">Lightbulb</option>
                <option value="Clock">Clock</option>
              </select>
            </>
          );
        case 'courses':
          return (
            <>
              <input
                type="text"
                placeholder="Nome do Curso"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                required
              />
              <input
                type="text"
                placeholder="Instituição"
                value={formData.institution || ''}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                required
              />
              <input
                type="number"
                placeholder="Progresso (0-100)"
                min="0"
                max="100"
                value={formData.progress || ''}
                onChange={(e) => setFormData({ ...formData, progress: e.target.value })}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                required
              />
              <select
                value={formData.status || ''}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                required
              >
                <option value="">Selecione o status</option>
                <option value="completed">Concluído</option>
                <option value="in-progress">Em Andamento</option>
                <option value="paused">Pausado</option>
              </select>
              <input
                type="text"
                placeholder="Categoria"
                value={formData.category || ''}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                required
              />
              <input
                type="text"
                placeholder="Data de Início (ex: 2024-01-15)"
                value={formData.start_date || ''}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                required
              />
              <input
                type="text"
                placeholder="Data Prevista de Conclusão (ex: 2024-06-15)"
                value={formData.expected_end || ''}
                onChange={(e) => setFormData({ ...formData, expected_end: e.target.value })}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
              />
              <input
                type="text"
                placeholder="Data de Conclusão (se concluído)"
                value={formData.completed_date || ''}
                onChange={(e) => setFormData({ ...formData, completed_date: e.target.value })}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
              />
              <textarea
                placeholder="Descrição"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white h-24"
              />
              <input
                type="text"
                placeholder="Habilidades (separadas por vírgula)"
                value={Array.isArray(formData.skills) ? formData.skills.join(', ') : formData.skills || ''}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
              />
              <input
                type="text"
                placeholder="Cor do gradiente (ex: from-blue-500 to-blue-600)"
                value={formData.color || ''}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
              />
              <input
                type="url"
                placeholder="URL do logo da instituição"
                value={formData.logo || ''}
                onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
              />
            </>
          );
        case 'achievements':
          return (
            <>
              <input
                type="text"
                placeholder="Título"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                required
              />
              <input
                type="text"
                placeholder="Organização"
                value={formData.organization || ''}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                required
              />
              <input
                type="text"
                placeholder="Data"
                value={formData.date || ''}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                required
              />
              <select
                value={formData.type || ''}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                required
              >
                <option value="">Selecione o tipo</option>
                <option value="recognition">Reconhecimento</option>
                <option value="academic">Acadêmico</option>
                <option value="professional">Profissional</option>
              </select>
              <textarea
                placeholder="Descrição"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white h-32"
                required
              />
            </>
          );
        default:
          return null;
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-slate-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">
              {item ? 'Editar' : 'Adicionar'} {type}
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {getFormFields()}
            
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={saving || uploadingImage}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                {saving || uploadingImage ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {uploadingImage ? 'Enviando imagem...' : 'Salvando...'}
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Salvar
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors"
              >
                Cancelar
              </button>
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
      <div className="space-y-4">
        {/* Controles de busca e filtro */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Adicionar
          </button>
        </div>

        {/* Lista de itens */}
        <div className="grid gap-4">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4"
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-2">{item.name || item.title}</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm text-slate-300">
                    {fields.slice(0, 4).map(field => (
                      <div key={field}>
                        <span className="text-slate-400">{field}:</span> {
                          Array.isArray(item[field]) 
                            ? item[field].join(', ') 
                            : item[field] || 'N/A'
                        }
                      </div>
                    ))}
                  </div>
                  {(item.image || item.profile_image) && (
                    <img 
                      src={item.image || item.profile_image} 
                      alt="Preview" 
                      className="mt-2 w-16 h-16 object-cover rounded-lg" 
                    />
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingItem(item);
                      setIsEditing(true);
                    }}
                    className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    title="Editar"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => handleDelete(type, item.id)}
                    className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                    title="Deletar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-8 text-slate-400">
            <Database className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Nenhum item encontrado</p>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl">Carregando dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-poppins font-bold">Painel Administrativo</h1>
              <p className="text-slate-400">Bem-vindo, {user?.email}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <motion.button
                onClick={refresh}
                className="p-3 bg-slate-700 hover:bg-slate-600 rounded-xl transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Atualizar dados"
              >
                <RefreshCw className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl transition-colors"
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

      {/* Message */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-20 right-6 z-50 p-4 rounded-xl shadow-lg ${
              message.type === 'success' 
                ? 'bg-green-600 text-white' 
                : 'bg-red-600 text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              {message.type === 'success' ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              {message.text}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`bg-gradient-to-r ${stat.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{stat.value}</h3>
                        <p className="text-slate-400">{stat.label}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-4">Status do Sistema</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Sistema funcionando</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Autenticação ativa</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Dados sincronizados</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>CRUD funcional</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Informações Pessoais */}
          {activeTab === 'personal' && (
            <motion.div
              key="personal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Informações Pessoais</h2>
                <button
                  onClick={() => {
                    setEditingItem(data.personalInfo);
                    setIsEditing(true);
                  }}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Editar
                </button>
              </div>

              {data.personalInfo ? (
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-6">
                    <img
                      src={data.personalInfo.profile_image}
                      alt="Profile"
                      className="w-32 h-32 object-cover rounded-xl"
                    />
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-white">{data.personalInfo.name}</h3>
                        <p className="text-indigo-400">{data.personalInfo.title}</p>
                      </div>
                      <p className="text-slate-300">{data.personalInfo.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-400">Email:</span> {data.personalInfo.email}
                        </div>
                        <div>
                          <span className="text-slate-400">Telefone:</span> {data.personalInfo.phone}
                        </div>
                        <div className="md:col-span-2">
                          <span className="text-slate-400">Localização:</span> {data.personalInfo.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400">
                  <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhuma informação pessoal encontrada</p>
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="mt-4 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors"
                  >
                    Adicionar Informações
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* Projetos */}
          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="text-2xl font-bold mb-6">Gerenciar Projetos</h2>
              {renderItemsList(data.projects || [], 'projects', ['company', 'type', 'description', 'technologies'])}
            </motion.div>
          )}

          {/* Certificados */}
          {activeTab === 'certificates' && (
            <motion.div
              key="certificates"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="text-2xl font-bold mb-6">Gerenciar Certificados</h2>
              {renderItemsList(data.certificates || [], 'certificates', ['issuer', 'date', 'category', 'skills'])}
            </motion.div>
          )}

          {/* Habilidades */}
          {activeTab === 'skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="text-2xl font-bold mb-6">Gerenciar Habilidades</h2>
              {renderItemsList(data.skills || [], 'skills', ['level', 'category', 'icon'])}
            </motion.div>
          )}

          {/* Cursos */}
          {activeTab === 'courses' && (
            <motion.div
              key="courses"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="text-2xl font-bold mb-6">Gerenciar Cursos</h2>
              {renderItemsList(data.courses || [], 'courses', ['institution', 'progress', 'status', 'skills'])}
            </motion.div>
          )}

          {/* Conquistas */}
          {activeTab === 'achievements' && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="text-2xl font-bold mb-6">Gerenciar Conquistas</h2>
              {renderItemsList(data.achievements || [], 'achievements', ['organization', 'date', 'type'])}
            </motion.div>
          )}

          {/* Feedbacks */}
          {activeTab === 'feedbacks' && (
            <motion.div
              key="feedbacks"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="text-2xl font-bold mb-6">Feedbacks dos Visitantes</h2>
              <div className="space-y-4">
                {data.feedbacks && data.feedbacks.length > 0 ? (
                  data.feedbacks.map((feedback) => (
                    <div key={feedback.id} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-lg ${i < feedback.rating ? 'text-yellow-400' : 'text-slate-600'}`}>
                              ⭐
                            </span>
                          ))}
                        </div>
                        <span className="text-sm text-slate-400">
                          {new Date(feedback.created_at).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      {feedback.feedback_text && (
                        <p className="text-slate-300 mb-2">{feedback.feedback_text}</p>
                      )}
                      {feedback.category && (
                        <span className="inline-block px-2 py-1 bg-slate-700 text-slate-300 rounded text-sm">
                          {feedback.category}
                        </span>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-slate-400">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhum feedback recebido ainda</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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