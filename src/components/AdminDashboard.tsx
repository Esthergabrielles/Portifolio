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

interface AdminDashboardProps {
  onLogout: () => void;
}

interface PortfolioData {
  projects: any[];
  certificates: any[];
  skills: any[];
  courses: any[];
  achievements: any[];
  personalInfo: any;
  postmanCollections: any[];
  feedbacks: any[];
}

interface PostmanCollection {
  id: string;
  name: string;
  description: string;
  fileName: string;
  uploadDate: string;
  requests: any[];
  data: any;
}

interface Feedback {
  id: string;
  rating: number;
  category: string;
  feedback: string;
  timestamp: Date;
  userAgent: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'projects' | 'certificates' | 'skills' | 'courses' | 'achievements' | 'personal' | 'postman' | 'feedbacks' | 'settings'>('dashboard');
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    projects: [],
    certificates: [],
    skills: [],
    courses: [],
    achievements: [],
    personalInfo: {},
    postmanCollections: [],
    feedbacks: []
  });
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Carregar dados do localStorage na inicialização
  useEffect(() => {
    loadPortfolioData();
  }, []);

  // Auto-save a cada 30 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      if (portfolioData && Object.keys(portfolioData).length > 0) {
        savePortfolioData();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [portfolioData]);

  const loadPortfolioData = () => {
    try {
      const savedData = localStorage.getItem('portfolioData');
      if (savedData) {
        const data = JSON.parse(savedData);
        setPortfolioData(data);
      } else {
        loadInitialData();
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      loadInitialData();
    }
  };

  const loadInitialData = async () => {
    try {
      const { projects } = await import('../data/portfolio');
      const { certificates } = await import('../data/portfolio');
      const { technicalSkills, qaDocumentations, softSkills } = await import('../data/portfolio');
      
      const initialData: PortfolioData = {
        projects: projects || [],
        certificates: certificates || [],
        skills: [...(technicalSkills || []), ...(qaDocumentations || []), ...(softSkills || [])],
        courses: [
          {
            id: '1',
            name: 'Quality Assurance',
            institution: 'Mate Academy',
            progress: 95,
            status: 'in-progress',
            category: 'Tecnologia',
            startDate: '2024',
            expectedEnd: 'Dezembro 2024',
            description: 'Formação completa em Quality Assurance com foco em testes automatizados e metodologias ágeis.',
            skills: ['Testes Automatizados', 'Selenium', 'API Testing', 'Metodologias Ágeis', 'Bug Tracking'],
            color: 'from-purple-500 to-purple-600'
          },
          {
            id: '2',
            name: 'FullStack Python',
            institution: 'Mate Academy',
            progress: 15,
            status: 'in-progress',
            category: 'Desenvolvimento',
            startDate: '2024',
            expectedEnd: 'Junho 2025',
            description: 'Curso completo de desenvolvimento web com Python, Django, React e tecnologias modernas.',
            skills: ['Python', 'Django', 'React', 'PostgreSQL', 'APIs REST', 'DevOps'],
            color: 'from-yellow-500 to-yellow-600'
          }
        ],
        achievements: [
          {
            id: '1',
            title: 'Funcionária Destaque',
            organization: 'Destra Gestão de Terceiros',
            date: '2024',
            description: 'Reconhecida como Funcionária Destaque em Novembro/2024 por excelência em auditorias documentais.',
            type: 'recognition'
          }
        ],
        personalInfo: {
          name: 'Esther Gabrielle',
          title: 'QA Junior',
          description: 'Iniciando minha carreira em QA com paixão por encontrar bugs e garantir qualidade.',
          email: 'esthergabriellesouza@gmail.com',
          phone: '(19) 98926-1419',
          location: 'Santa Bárbara d\'Oeste, SP - Brasil',
          profileImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop'
        },
        postmanCollections: [],
        feedbacks: []
      };
      
      setPortfolioData(initialData);
      savePortfolioData(initialData);
    } catch (error) {
      console.error('Erro ao carregar dados iniciais:', error);
    }
  };

  const savePortfolioData = async (data?: PortfolioData) => {
    setSaveStatus('saving');
    try {
      const dataToSave = data || portfolioData;
      localStorage.setItem('portfolioData', JSON.stringify(dataToSave));
      
      // Simular delay de salvamento
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handleImageUpload = async (file: File, itemId?: string, field?: string) => {
    setUploadingImage(true);
    try {
      const imageUrl = URL.createObjectURL(file);
      
      if (itemId && field) {
        const updatedData = { ...portfolioData };
        const section = activeTab as keyof PortfolioData;
        if (Array.isArray(updatedData[section])) {
          const items = updatedData[section] as any[];
          const itemIndex = items.findIndex(item => item.id === itemId);
          if (itemIndex !== -1) {
            items[itemIndex] = { ...items[itemIndex], [field]: imageUrl };
            setPortfolioData(updatedData);
            await savePortfolioData(updatedData);
          }
        }
      }
      
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
      const updatedData = { ...portfolioData };
      updatedData.personalInfo.profileImage = imageUrl;
      setPortfolioData(updatedData);
      await savePortfolioData(updatedData);
      setUploadingImage(false);
      return imageUrl;
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      setUploadingImage(false);
      throw error;
    }
  };

  const handleAddItem = (newItem: any) => {
    const updatedData = { ...portfolioData };
    const section = activeTab as keyof PortfolioData;
    
    if (Array.isArray(updatedData[section])) {
      const items = updatedData[section] as any[];
      const itemWithId = { ...newItem, id: Date.now().toString() };
      items.push(itemWithId);
      setPortfolioData(updatedData);
      savePortfolioData(updatedData);
    }
    
    setShowAddForm(false);
  };

  const handleEditItem = (updatedItem: any) => {
    const updatedData = { ...portfolioData };
    const section = activeTab as keyof PortfolioData;
    
    if (Array.isArray(updatedData[section])) {
      const items = updatedData[section] as any[];
      const itemIndex = items.findIndex(item => item.id === updatedItem.id);
      if (itemIndex !== -1) {
        items[itemIndex] = updatedItem;
        setPortfolioData(updatedData);
        savePortfolioData(updatedData);
      }
    }
    
    setEditingItem(null);
  };

  const handleDeleteItem = (itemId: string) => {
    if (confirm('Tem certeza que deseja excluir este item?')) {
      const updatedData = { ...portfolioData };
      const section = activeTab as keyof PortfolioData;
      
      if (Array.isArray(updatedData[section])) {
        const items = updatedData[section] as any[];
        const filteredItems = items.filter(item => item.id !== itemId);
        (updatedData[section] as any[]) = filteredItems;
        setPortfolioData(updatedData);
        savePortfolioData(updatedData);
      }
    }
  };

  const handlePostmanUpload = async (file: File) => {
    try {
      const text = await file.text();
      const collectionData = JSON.parse(text);
      
      if (!collectionData.info || !collectionData.info.name) {
        throw new Error('Arquivo não é uma coleção válida do Postman');
      }

      const newCollection: PostmanCollection = {
        id: Date.now().toString(),
        name: collectionData.info.name,
        description: collectionData.info.description || '',
        fileName: file.name,
        uploadDate: new Date().toISOString(),
        requests: extractRequests(collectionData),
        data: collectionData
      };

      const updatedData = { ...portfolioData };
      updatedData.postmanCollections.push(newCollection);
      setPortfolioData(updatedData);
      await savePortfolioData(updatedData);
      
      alert('Coleção Postman importada com sucesso!');
    } catch (error) {
      console.error('Erro ao importar coleção:', error);
      alert('Erro ao importar coleção. Verifique se o arquivo é válido.');
    }
  };

  const extractRequests = (collection: any): any[] => {
    const requests: any[] = [];
    
    const processItem = (item: any) => {
      if (item.request) {
        requests.push({
          id: item.id || Date.now().toString(),
          name: item.name,
          method: item.request.method,
          url: typeof item.request.url === 'string' ? item.request.url : item.request.url?.raw || '',
          headers: item.request.header || [],
          body: item.request.body || null
        });
      }
      
      if (item.item && Array.isArray(item.item)) {
        item.item.forEach(processItem);
      }
    };
    
    if (collection.item && Array.isArray(collection.item)) {
      collection.item.forEach(processItem);
    }
    
    return requests;
  };

  const handleBackup = () => {
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
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          setPortfolioData(data);
          savePortfolioData(data);
          alert('Backup restaurado com sucesso!');
        } catch (error) {
          alert('Erro ao restaurar backup. Arquivo inválido.');
        }
      };
      reader.readAsText(file);
    }
  };

  const getStats = () => {
    return {
      totalProjects: portfolioData.projects.length,
      totalCertificates: portfolioData.certificates.length,
      totalSkills: portfolioData.skills.length,
      totalCourses: portfolioData.courses.length,
      totalAchievements: portfolioData.achievements.length,
      postmanCollections: portfolioData.postmanCollections.length,
      totalFeedbacks: portfolioData.feedbacks?.length || 0,
      avgRating: portfolioData.feedbacks?.length > 0 
        ? (portfolioData.feedbacks.reduce((acc: number, f: any) => acc + f.rating, 0) / portfolioData.feedbacks.length).toFixed(1)
        : 0,
      avgCourseProgress: portfolioData.courses.length > 0 
        ? Math.round(portfolioData.courses.reduce((acc, course) => acc + (course.progress || 0), 0) / portfolioData.courses.length)
        : 0
    };
  };

  const stats = getStats();

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart, count: 0 },
    { id: 'projects', label: 'Projetos', icon: Folder, count: portfolioData.projects.length },
    { id: 'certificates', label: 'Certificados', icon: Award, count: portfolioData.certificates.length },
    { id: 'skills', label: 'Habilidades', icon: Settings, count: portfolioData.skills.length },
    { id: 'courses', label: 'Cursos', icon: FileText, count: portfolioData.courses.length },
    { id: 'achievements', label: 'Conquistas', icon: Trophy, count: portfolioData.achievements.length },
    { id: 'personal', label: 'Dados Pessoais', icon: User, count: 1 },
    { id: 'postman', label: 'Coleções Postman', icon: Send, count: portfolioData.postmanCollections.length },
    { id: 'feedbacks', label: 'Avaliações', icon: MessageCircle, count: portfolioData.feedbacks?.length || 0 },
    { id: 'settings', label: 'Configurações', icon: Settings, count: 0 }
  ];

  const filteredData = () => {
    const currentData = portfolioData[activeTab as keyof PortfolioData];
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
          { label: 'Projetos', value: stats.totalProjects, icon: Folder, color: 'from-blue-500 to-blue-600', change: '+2 este mês' },
          { label: 'Certificados', value: stats.totalCertificates, icon: Award, color: 'from-green-500 to-green-600', change: '+5 este mês' },
          { label: 'Avaliações', value: stats.totalFeedbacks, icon: MessageCircle, color: 'from-purple-500 to-purple-600', change: `Média: ${stats.avgRating}⭐` },
          { label: 'Progresso Médio', value: `${stats.avgCourseProgress}%`, icon: TrendingUp, color: 'from-orange-500 to-orange-600', change: '+15% este mês' }
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
              <span className="text-xs text-green-400 font-medium">{stat.change}</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-slate-400 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Atividade Recente</h3>
          <div className="space-y-4">
            {[
              { action: 'Certificado adicionado', item: 'QA Ethics', time: '2 horas atrás', icon: Award, color: 'text-green-400' },
              { action: 'Projeto atualizado', item: 'E-commerce Testing', time: '1 dia atrás', icon: Folder, color: 'text-blue-400' },
              { action: 'Habilidade melhorada', item: 'Postman', time: '2 dias atrás', icon: TrendingUp, color: 'text-purple-400' },
              { action: 'Curso progredido', item: 'QA Bootcamp', time: '3 dias atrás', icon: FileText, color: 'text-orange-400' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700/50 transition-colors">
                <div className={`${activity.color}`}>
                  <activity.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm">{activity.action}</p>
                  <p className="text-slate-400 text-xs">{activity.item}</p>
                </div>
                <span className="text-slate-500 text-xs">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Metas de Progresso</h3>
          <div className="space-y-4">
            {[
              { label: 'Certificações QA', current: 15, target: 20, color: 'bg-green-500' },
              { label: 'Projetos Práticos', current: 3, target: 5, color: 'bg-blue-500' },
              { label: 'Habilidades Técnicas', current: 12, target: 15, color: 'bg-purple-500' },
              { label: 'Cursos Concluídos', current: 1, target: 3, color: 'bg-orange-500' }
            ].map((goal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white">{goal.label}</span>
                  <span className="text-slate-400">{goal.current}/{goal.target}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className={`${goal.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${(goal.current / goal.target) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
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
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-2xl font-bold text-yellow-400">{stats.avgRating}⭐</div>
            <div className="text-sm text-slate-400">Média Geral</div>
          </div>
        </div>
      </div>

      {portfolioData.feedbacks && portfolioData.feedbacks.length > 0 ? (
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
                <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-xs">
                  {feedback.category}
                </span>
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

  const renderItemForm = (item: any = {}, isEditing: boolean = false) => {
    const [formData, setFormData] = useState(item);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (isEditing) {
        handleEditItem(formData);
      } else {
        handleAddItem(formData);
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
            {/* Campos específicos por tipo */}
            {activeTab === 'projects' && (
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
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-300">Tecnologias (separadas por vírgula)</label>
                  <input
                    type="text"
                    value={Array.isArray(formData.technologies) ? formData.technologies.join(', ') : ''}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value.split(', ').filter(t => t.trim()) })}
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
            )}

            {/* Upload de Imagem */}
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

  const renderContent = () => {
    if (activeTab === 'dashboard') {
      return renderDashboard();
    }

    if (activeTab === 'feedbacks') {
      return renderFeedbacks();
    }

    if (activeTab === 'postman') {
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Coleções Postman</h2>
            <div className="flex gap-3">
              <label className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors cursor-pointer flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Coleção
                <input
                  type="file"
                  accept=".json"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handlePostmanUpload(file);
                  }}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="grid gap-6">
            {portfolioData.postmanCollections.map((collection) => (
              <div key={collection.id} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{collection.name}</h3>
                    <p className="text-slate-400">{collection.description}</p>
                    <p className="text-sm text-slate-500">
                      {collection.requests.length} requisições • Arquivo: {collection.fileName}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteItem(collection.id)}
                    className="text-red-400 hover:text-red-300 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2 mb-4">
                  {collection.requests.slice(0, 5).map((request, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 bg-slate-700/50 rounded">
                      <span className={`px-2 py-1 text-xs font-bold rounded ${
                        request.method === 'GET' ? 'bg-green-100 text-green-800' :
                        request.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                        request.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                        request.method === 'DELETE' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {request.method}
                      </span>
                      <span className="font-medium text-white">{request.name}</span>
                      <span className="text-sm text-slate-400 truncate">{request.url}</span>
                    </div>
                  ))}
                  {collection.requests.length > 5 && (
                    <p className="text-sm text-slate-400">
                      +{collection.requests.length - 5} mais requisições...
                    </p>
                  )}
                </div>
              </div>
            ))}

            {portfolioData.postmanCollections.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                <Send className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Nenhuma coleção Postman importada</p>
                <p className="text-sm">Faça upload de um arquivo .json do Postman</p>
              </div>
            )}
          </div>
        </div>
      );
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
                    src={portfolioData.personalInfo.profileImage || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'}
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
                  value={portfolioData.personalInfo.name || ''}
                  onChange={(e) => {
                    const updatedData = { ...portfolioData };
                    updatedData.personalInfo.name = e.target.value;
                    setPortfolioData(updatedData);
                  }}
                  className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Título</label>
                <input
                  type="text"
                  value={portfolioData.personalInfo.title || ''}
                  onChange={(e) => {
                    const updatedData = { ...portfolioData };
                    updatedData.personalInfo.title = e.target.value;
                    setPortfolioData(updatedData);
                  }}
                  className="w-full p-3 border border-slate-600 rounded-lg bg-slate-700 text-white"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2 text-slate-300">Descrição</label>
                <textarea
                  value={portfolioData.personalInfo.description || ''}
                  onChange={(e) => {
                    const updatedData = { ...portfolioData };
                    updatedData.personalInfo.description = e.target.value;
                    setPortfolioData(updatedData);
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
                    value={portfolioData.personalInfo.email || ''}
                    onChange={(e) => {
                      const updatedData = { ...portfolioData };
                      updatedData.personalInfo.email = e.target.value;
                      setPortfolioData(updatedData);
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
                    value={portfolioData.personalInfo.phone || ''}
                    onChange={(e) => {
                      const updatedData = { ...portfolioData };
                      updatedData.personalInfo.phone = e.target.value;
                      setPortfolioData(updatedData);
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
                    value={portfolioData.personalInfo.location || ''}
                    onChange={(e) => {
                      const updatedData = { ...portfolioData };
                      updatedData.personalInfo.location = e.target.value;
                      setPortfolioData(updatedData);
                    }}
                    className="w-full pl-10 pr-3 py-3 border border-slate-600 rounded-lg bg-slate-700 text-white"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={() => savePortfolioData()}
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
                  <h3 className="text-lg font-bold text-white">{item.name || item.title}</h3>
                  <p className="text-slate-400">
                    {item.company || item.issuer || item.organization || item.description}
                  </p>
                  {item.image && (
                    <img src={item.image} alt="" className="w-20 h-20 object-cover rounded mt-2" />
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
                onClick={() => savePortfolioData()}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Salvar Tudo
              </button>
              
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