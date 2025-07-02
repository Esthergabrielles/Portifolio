import React, { useState, useEffect } from 'react';
import { LogOut, Upload, Download, Trash2, Edit, Eye, Plus, Save, X, Play, Folder, FileText, Settings, Database, Globe, Zap, Image, User, Award, BookOpen, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, certificates, technicalSkills, qaDocumentations, softSkills } from '../data/portfolio';
import { Project, Certificate, Skill } from '../types';

interface PostmanCollection {
  id: string;
  name: string;
  description: string;
  requests: PostmanRequest[];
  variables: PostmanVariable[];
  createdAt: string;
  updatedAt: string;
}

interface PostmanRequest {
  id: string;
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  headers: { key: string; value: string; enabled: boolean }[];
  body: string;
  bodyType: 'none' | 'json' | 'form-data' | 'x-www-form-urlencoded';
  description?: string;
  tests?: string;
  preRequestScript?: string;
}

interface PostmanVariable {
  key: string;
  value: string;
  type: 'default' | 'secret';
}

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'certificates' | 'skills' | 'postman' | 'profile'>('overview');
  
  // Estados para dados
  const [portfolioProjects, setPortfolioProjects] = useState<Project[]>(projects);
  const [portfolioCertificates, setPortfolioCertificates] = useState<Certificate[]>(certificates);
  const [portfolioTechnicalSkills, setPortfolioTechnicalSkills] = useState<Skill[]>(technicalSkills);
  const [portfolioQADocs, setPortfolioQADocs] = useState<Skill[]>(qaDocumentations);
  const [portfolioSoftSkills, setPortfolioSoftSkills] = useState<Skill[]>(softSkills);
  const [postmanCollections, setPostmanCollections] = useState<PostmanCollection[]>([]);
  
  // Estados para modais
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editingType, setEditingType] = useState<'project' | 'certificate' | 'skill' | 'postman'>('project');
  const [importData, setImportData] = useState('');

  // Estados para perfil
  const [profileData, setProfileData] = useState({
    name: 'Esther Gabrielle',
    title: 'QA Junior',
    description: 'Iniciando minha carreira em QA com paixão por encontrar bugs e garantir qualidade.',
    profileImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    email: 'esthergabriellesouza@gmail.com',
    phone: '(19) 98926-1419',
    location: 'Santa Bárbara d\'Oeste, SP - Brasil',
    linkedin: 'https://linkedin.com/in/esthergabrielle',
    github: 'https://github.com/Esthergabrielles'
  });

  // Carregar dados do localStorage
  useEffect(() => {
    const savedProjects = localStorage.getItem('portfolio_projects');
    const savedCertificates = localStorage.getItem('portfolio_certificates');
    const savedTechnicalSkills = localStorage.getItem('portfolio_technical_skills');
    const savedQADocs = localStorage.getItem('portfolio_qa_docs');
    const savedSoftSkills = localStorage.getItem('portfolio_soft_skills');
    const savedCollections = localStorage.getItem('postman_collections');
    const savedProfile = localStorage.getItem('portfolio_profile');

    if (savedProjects) setPortfolioProjects(JSON.parse(savedProjects));
    if (savedCertificates) setPortfolioCertificates(JSON.parse(savedCertificates));
    if (savedTechnicalSkills) setPortfolioTechnicalSkills(JSON.parse(savedTechnicalSkills));
    if (savedQADocs) setPortfolioQADocs(JSON.parse(savedQADocs));
    if (savedSoftSkills) setPortfolioSoftSkills(JSON.parse(savedSoftSkills));
    if (savedCollections) setPostmanCollections(JSON.parse(savedCollections));
    if (savedProfile) setProfileData(JSON.parse(savedProfile));
  }, []);

  // Salvar dados no localStorage
  const saveData = (type: string, data: any) => {
    localStorage.setItem(type, JSON.stringify(data));
  };

  // Upload de imagem
  const handleImageUpload = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    });
  };

  // Funções CRUD para Projetos
  const handleAddProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      company: '',
      type: 'Functional Testing',
      technologies: [],
      description: '',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
      details: ''
    };
    setEditingItem(newProject);
    setEditingType('project');
    setShowAddModal(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingItem({ ...project });
    setEditingType('project');
    setShowEditModal(true);
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('Tem certeza que deseja deletar este projeto?')) {
      const updatedProjects = portfolioProjects.filter(p => p.id !== id);
      setPortfolioProjects(updatedProjects);
      saveData('portfolio_projects', updatedProjects);
    }
  };

  const handleSaveProject = () => {
    if (showAddModal) {
      const updatedProjects = [...portfolioProjects, editingItem];
      setPortfolioProjects(updatedProjects);
      saveData('portfolio_projects', updatedProjects);
    } else {
      const updatedProjects = portfolioProjects.map(p => 
        p.id === editingItem.id ? editingItem : p
      );
      setPortfolioProjects(updatedProjects);
      saveData('portfolio_projects', updatedProjects);
    }
    setShowEditModal(false);
    setShowAddModal(false);
    setEditingItem(null);
  };

  // Funções CRUD para Certificados
  const handleAddCertificate = () => {
    const newCertificate: Certificate = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: new Date().getFullYear().toString(),
      image: 'https://via.placeholder.com/400x300',
      category: 'QA',
      description: '',
      skills: []
    };
    setEditingItem(newCertificate);
    setEditingType('certificate');
    setShowAddModal(true);
  };

  const handleEditCertificate = (certificate: Certificate) => {
    setEditingItem({ ...certificate });
    setEditingType('certificate');
    setShowEditModal(true);
  };

  const handleDeleteCertificate = (id: string) => {
    if (confirm('Tem certeza que deseja deletar este certificado?')) {
      const updatedCertificates = portfolioCertificates.filter(c => c.id !== id);
      setPortfolioCertificates(updatedCertificates);
      saveData('portfolio_certificates', updatedCertificates);
    }
  };

  const handleSaveCertificate = () => {
    if (showAddModal) {
      const updatedCertificates = [...portfolioCertificates, editingItem];
      setPortfolioCertificates(updatedCertificates);
      saveData('portfolio_certificates', updatedCertificates);
    } else {
      const updatedCertificates = portfolioCertificates.map(c => 
        c.id === editingItem.id ? editingItem : c
      );
      setPortfolioCertificates(updatedCertificates);
      saveData('portfolio_certificates', updatedCertificates);
    }
    setShowEditModal(false);
    setShowAddModal(false);
    setEditingItem(null);
  };

  // Funções CRUD para Skills
  const handleAddSkill = (skillType: 'technical' | 'qa' | 'soft') => {
    const newSkill: Skill = {
      name: '',
      level: 50,
      icon: 'Bot'
    };
    setEditingItem({ ...newSkill, skillType });
    setEditingType('skill');
    setShowAddModal(true);
  };

  const handleEditSkill = (skill: Skill, skillType: 'technical' | 'qa' | 'soft') => {
    setEditingItem({ ...skill, skillType });
    setEditingType('skill');
    setShowEditModal(true);
  };

  const handleDeleteSkill = (name: string, skillType: 'technical' | 'qa' | 'soft') => {
    if (confirm('Tem certeza que deseja deletar esta habilidade?')) {
      if (skillType === 'technical') {
        const updated = portfolioTechnicalSkills.filter(s => s.name !== name);
        setPortfolioTechnicalSkills(updated);
        saveData('portfolio_technical_skills', updated);
      } else if (skillType === 'qa') {
        const updated = portfolioQADocs.filter(s => s.name !== name);
        setPortfolioQADocs(updated);
        saveData('portfolio_qa_docs', updated);
      } else {
        const updated = portfolioSoftSkills.filter(s => s.name !== name);
        setPortfolioSoftSkills(updated);
        saveData('portfolio_soft_skills', updated);
      }
    }
  };

  const handleSaveSkill = () => {
    const { skillType, ...skillData } = editingItem;
    
    if (skillType === 'technical') {
      if (showAddModal) {
        const updated = [...portfolioTechnicalSkills, skillData];
        setPortfolioTechnicalSkills(updated);
        saveData('portfolio_technical_skills', updated);
      } else {
        const updated = portfolioTechnicalSkills.map(s => 
          s.name === skillData.name ? skillData : s
        );
        setPortfolioTechnicalSkills(updated);
        saveData('portfolio_technical_skills', updated);
      }
    } else if (skillType === 'qa') {
      if (showAddModal) {
        const updated = [...portfolioQADocs, skillData];
        setPortfolioQADocs(updated);
        saveData('portfolio_qa_docs', updated);
      } else {
        const updated = portfolioQADocs.map(s => 
          s.name === skillData.name ? skillData : s
        );
        setPortfolioQADocs(updated);
        saveData('portfolio_qa_docs', updated);
      }
    } else {
      if (showAddModal) {
        const updated = [...portfolioSoftSkills, skillData];
        setPortfolioSoftSkills(updated);
        saveData('portfolio_soft_skills', updated);
      } else {
        const updated = portfolioSoftSkills.map(s => 
          s.name === skillData.name ? skillData : s
        );
        setPortfolioSoftSkills(updated);
        saveData('portfolio_soft_skills', updated);
      }
    }
    
    setShowEditModal(false);
    setShowAddModal(false);
    setEditingItem(null);
  };

  // Importar coleção do Postman
  const handleImportCollection = () => {
    try {
      const parsedData = JSON.parse(importData);
      
      const newCollection: PostmanCollection = {
        id: Date.now().toString(),
        name: parsedData.info?.name || 'Coleção Importada',
        description: parsedData.info?.description || '',
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        variables: parsedData.variable?.map((v: any) => ({
          key: v.key,
          value: v.value,
          type: v.type || 'default'
        })) || [],
        requests: []
      };

      const processItems = (items: any[]) => {
        items.forEach(item => {
          if (item.request) {
            const request: PostmanRequest = {
              id: Date.now().toString() + Math.random(),
              name: item.name,
              method: item.request.method,
              url: typeof item.request.url === 'string' ? item.request.url : item.request.url?.raw || '',
              headers: item.request.header?.map((h: any) => ({
                key: h.key,
                value: h.value,
                enabled: !h.disabled
              })) || [],
              body: item.request.body?.raw || '',
              bodyType: item.request.body?.mode || 'none',
              description: item.request.description || '',
              tests: item.event?.find((e: any) => e.listen === 'test')?.script?.exec?.join('\n') || '',
              preRequestScript: item.event?.find((e: any) => e.listen === 'prerequest')?.script?.exec?.join('\n') || ''
            };
            newCollection.requests.push(request);
          } else if (item.item) {
            processItems(item.item);
          }
        });
      };

      if (parsedData.item) {
        processItems(parsedData.item);
      }

      const updatedCollections = [...postmanCollections, newCollection];
      setPostmanCollections(updatedCollections);
      saveData('postman_collections', updatedCollections);
      
      setImportData('');
      setShowImportModal(false);
      
      alert(`Coleção "${newCollection.name}" importada com sucesso! ${newCollection.requests.length} requests encontrados.`);
    } catch (error) {
      alert('Erro ao importar coleção. Verifique se o JSON está no formato correto do Postman.');
      console.error('Erro na importação:', error);
    }
  };

  const handleDeleteCollection = (id: string) => {
    if (confirm('Tem certeza que deseja deletar esta coleção?')) {
      const updatedCollections = postmanCollections.filter(c => c.id !== id);
      setPostmanCollections(updatedCollections);
      saveData('postman_collections', updatedCollections);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_login_time');
    onLogout();
  };

  const handleProfileImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = await handleImageUpload(file);
      const updatedProfile = { ...profileData, profileImage: imageUrl };
      setProfileData(updatedProfile);
      saveData('portfolio_profile', updatedProfile);
    }
  };

  const handleSaveProfile = () => {
    saveData('portfolio_profile', profileData);
    alert('Perfil atualizado com sucesso!');
  };

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: Database },
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'projects', label: 'Projetos', icon: Folder },
    { id: 'certificates', label: 'Certificados', icon: Award },
    { id: 'skills', label: 'Habilidades', icon: Zap },
    { id: 'postman', label: 'Postman', icon: Globe }
  ];

  const stats = [
    { label: 'Total de Projetos', value: portfolioProjects.length, icon: Folder, color: 'from-blue-500 to-blue-600' },
    { label: 'Total de Certificados', value: portfolioCertificates.length, icon: Award, color: 'from-green-500 to-green-600' },
    { label: 'Habilidades Técnicas', value: portfolioTechnicalSkills.length, icon: Zap, color: 'from-purple-500 to-purple-600' },
    { label: 'Coleções Postman', value: postmanCollections.length, icon: Globe, color: 'from-orange-500 to-orange-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm">
        <div className="container-12">
          <div className="col-span-12 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-poppins font-bold">Painel Administrativo</h1>
                  <p className="text-slate-400">Gerenciamento Completo do Portfólio</p>
                </div>
              </div>
              
              <motion.button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 px-4 py-2 rounded-xl transition-all duration-300"
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

      {/* Navigation */}
      <div className="border-b border-slate-700 bg-slate-800/30">
        <div className="container-12">
          <div className="col-span-12 py-4">
            <div className="flex gap-2 overflow-x-auto">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-6 py-3 rounded-xl font-inter font-semibold transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
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
      </div>

      {/* Content */}
      <div className="container-12 py-8">
        <div className="col-span-12">
          <AnimatePresence mode="wait">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-poppins font-bold mb-6">Visão Geral do Portfólio</h2>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={index}
                        className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                      >
                        <div className={`bg-gradient-to-r ${stat.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                          <stat.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2 font-poppins">{stat.value}</h3>
                        <p className="text-slate-400 font-inter">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
                    <h3 className="text-xl font-poppins font-bold mb-4">Ações Rápidas</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <motion.button
                        onClick={handleAddProject}
                        className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-300 p-4 rounded-xl transition-all duration-300 flex items-center gap-3"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Plus className="w-5 h-5" />
                        Adicionar Projeto
                      </motion.button>
                      <motion.button
                        onClick={handleAddCertificate}
                        className="bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-300 p-4 rounded-xl transition-all duration-300 flex items-center gap-3"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Plus className="w-5 h-5" />
                        Adicionar Certificado
                      </motion.button>
                      <motion.button
                        onClick={() => setShowImportModal(true)}
                        className="bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/30 text-orange-300 p-4 rounded-xl transition-all duration-300 flex items-center gap-3"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Upload className="w-5 h-5" />
                        Importar Postman
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-poppins font-bold">Gerenciar Perfil</h2>
                  <motion.button
                    onClick={handleSaveProfile}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-inter font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Save className="w-5 h-5" />
                    Salvar Perfil
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Profile Image */}
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
                    <h3 className="text-xl font-poppins font-bold mb-4">Foto de Perfil</h3>
                    <div className="text-center">
                      <div className="relative inline-block mb-4">
                        <img
                          src={profileData.profileImage}
                          alt="Profile"
                          className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
                        />
                        <label className="absolute bottom-0 right-0 bg-indigo-500 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-600 transition-colors">
                          <Camera className="w-4 h-4" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleProfileImageUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                      <p className="text-slate-400 text-sm">Clique no ícone para alterar a foto</p>
                    </div>
                  </div>

                  {/* Profile Info */}
                  <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
                    <h3 className="text-xl font-poppins font-bold mb-4">Informações Pessoais</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Nome</label>
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                          className="w-full p-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Título</label>
                        <input
                          type="text"
                          value={profileData.title}
                          onChange={(e) => setProfileData({...profileData, title: e.target.value})}
                          className="w-full p-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          className="w-full p-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Telefone</label>
                        <input
                          type="text"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                          className="w-full p-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Localização</label>
                        <input
                          type="text"
                          value={profileData.location}
                          onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                          className="w-full p-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">LinkedIn</label>
                        <input
                          type="url"
                          value={profileData.linkedin}
                          onChange={(e) => setProfileData({...profileData, linkedin: e.target.value})}
                          className="w-full p-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Descrição</label>
                        <textarea
                          value={profileData.description}
                          onChange={(e) => setProfileData({...profileData, description: e.target.value})}
                          rows={3}
                          className="w-full p-3 bg-slate-700 border border-slate-600 rounded-xl text-white resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-poppins font-bold">Gerenciar Projetos</h2>
                  <motion.button
                    onClick={handleAddProject}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-inter font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus className="w-5 h-5" />
                    Adicionar Projeto
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {portfolioProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-indigo-500/50 transition-all duration-300"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <div className="relative mb-4">
                        <img
                          src={project.image}
                          alt={project.name}
                          className="w-full h-32 object-cover rounded-xl"
                        />
                        <label className="absolute top-2 right-2 bg-indigo-500 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-600 transition-colors">
                          <Camera className="w-4 h-4" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const imageUrl = await handleImageUpload(file);
                                const updatedProjects = portfolioProjects.map(p => 
                                  p.id === project.id ? { ...p, image: imageUrl } : p
                                );
                                setPortfolioProjects(updatedProjects);
                                saveData('portfolio_projects', updatedProjects);
                              }
                            }}
                            className="hidden"
                          />
                        </label>
                      </div>
                      
                      <h3 className="text-xl font-poppins font-bold mb-2">{project.name}</h3>
                      <p className="text-slate-400 mb-4 text-sm line-clamp-2">{project.description}</p>
                      
                      <div className="flex gap-2">
                        <motion.button
                          onClick={() => handleEditProject(project)}
                          className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-300 py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Edit className="w-4 h-4" />
                          Editar
                        </motion.button>
                        <motion.button
                          onClick={() => handleDeleteProject(project.id)}
                          className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 py-2 px-3 rounded-lg transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Certificates Tab */}
            {activeTab === 'certificates' && (
              <motion.div
                key="certificates"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-poppins font-bold">Gerenciar Certificados</h2>
                  <motion.button
                    onClick={handleAddCertificate}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-inter font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus className="w-5 h-5" />
                    Adicionar Certificado
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {portfolioCertificates.map((certificate, index) => (
                    <motion.div
                      key={certificate.id}
                      className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-indigo-500/50 transition-all duration-300"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <div className="relative mb-4">
                        <img
                          src={certificate.image}
                          alt={certificate.name}
                          className="w-full h-32 object-cover rounded-xl"
                        />
                        <label className="absolute top-2 right-2 bg-indigo-500 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-600 transition-colors">
                          <Camera className="w-4 h-4" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const imageUrl = await handleImageUpload(file);
                                const updatedCertificates = portfolioCertificates.map(c => 
                                  c.id === certificate.id ? { ...c, image: imageUrl } : c
                                );
                                setPortfolioCertificates(updatedCertificates);
                                saveData('portfolio_certificates', updatedCertificates);
                              }
                            }}
                            className="hidden"
                          />
                        </label>
                      </div>
                      
                      <h3 className="text-xl font-poppins font-bold mb-2 line-clamp-2">{certificate.name}</h3>
                      <p className="text-slate-400 mb-2">{certificate.issuer}</p>
                      <p className="text-slate-500 mb-4 text-sm">{certificate.date}</p>
                      
                      <div className="flex gap-2">
                        <motion.button
                          onClick={() => handleEditCertificate(certificate)}
                          className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-300 py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Edit className="w-4 h-4" />
                          Editar
                        </motion.button>
                        <motion.button
                          onClick={() => handleDeleteCertificate(certificate.id)}
                          className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 py-2 px-3 rounded-lg transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Skills Tab */}
            {activeTab === 'skills' && (
              <motion.div
                key="skills"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <h2 className="text-3xl font-poppins font-bold">Gerenciar Habilidades</h2>

                {/* Technical Skills */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-poppins font-bold">Habilidades Técnicas</h3>
                    <motion.button
                      onClick={() => handleAddSkill('technical')}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-xl font-inter font-semibold flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Plus className="w-4 h-4" />
                      Adicionar
                    </motion.button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {portfolioTechnicalSkills.map((skill, index) => (
                      <div key={skill.name} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{skill.name}</h4>
                          <p className="text-slate-400 text-sm">{skill.level}%</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditSkill(skill, 'technical')}
                            className="p-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteSkill(skill.name, 'technical')}
                            className="p-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* QA Documentation Skills */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-poppins font-bold">Documentações QA</h3>
                    <motion.button
                      onClick={() => handleAddSkill('qa')}
                      className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-xl font-inter font-semibold flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Plus className="w-4 h-4" />
                      Adicionar
                    </motion.button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {portfolioQADocs.map((skill, index) => (
                      <div key={skill.name} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{skill.name}</h4>
                          <p className="text-slate-400 text-sm">{skill.level}%</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditSkill(skill, 'qa')}
                            className="p-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteSkill(skill.name, 'qa')}
                            className="p-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Soft Skills */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-poppins font-bold">Soft Skills</h3>
                    <motion.button
                      onClick={() => handleAddSkill('soft')}
                      className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-xl font-inter font-semibold flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Plus className="w-4 h-4" />
                      Adicionar
                    </motion.button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {portfolioSoftSkills.map((skill, index) => (
                      <div key={skill.name} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{skill.name}</h4>
                          <p className="text-slate-400 text-sm">{skill.level}%</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditSkill(skill, 'soft')}
                            className="p-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteSkill(skill.name, 'soft')}
                            className="p-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Postman Tab */}
            {activeTab === 'postman' && (
              <motion.div
                key="postman"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-poppins font-bold">Coleções Postman</h2>
                  <motion.button
                    onClick={() => setShowImportModal(true)}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-inter font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Upload className="w-5 h-5" />
                    Importar Coleção
                  </motion.button>
                </div>

                {postmanCollections.length === 0 ? (
                  <div className="text-center py-12">
                    <Folder className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Nenhuma coleção encontrada</h3>
                    <p className="text-slate-400 mb-6">Importe sua primeira coleção do Postman para começar</p>
                    <motion.button
                      onClick={() => setShowImportModal(true)}
                      className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-inter font-semibold"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Importar Primeira Coleção
                    </motion.button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {postmanCollections.map((collection, index) => (
                      <motion.div
                        key={collection.id}
                        className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-orange-500/50 transition-all duration-300"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -5 }}
                      >
                        <div className="bg-gradient-to-r from-orange-500 to-orange-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                          <Folder className="w-6 h-6 text-white" />
                        </div>
                        
                        <h3 className="text-xl font-poppins font-bold mb-2">{collection.name}</h3>
                        <p className="text-slate-400 mb-4 text-sm line-clamp-2">{collection.description}</p>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-400">Requests:</span>
                            <span className="font-semibold">{collection.requests.length}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-400">Variáveis:</span>
                            <span className="font-semibold">{collection.variables.length}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-400">Atualizado:</span>
                            <span className="font-semibold">{collection.updatedAt}</span>
                          </div>
                        </div>
                        
                        <motion.button
                          onClick={() => handleDeleteCollection(collection.id)}
                          className="w-full bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 py-2 px-4 rounded-xl font-inter font-semibold flex items-center justify-center gap-2 transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Trash2 className="w-4 h-4" />
                          Deletar
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Modals */}
      {/* Import Modal */}
      <AnimatePresence>
        {showImportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowImportModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-poppins font-bold">Importar Coleção Postman</h3>
                <button
                  onClick={() => setShowImportModal(false)}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Cole o JSON da coleção exportada do Postman:
                  </label>
                  <textarea
                    value={importData}
                    onChange={(e) => setImportData(e.target.value)}
                    placeholder="Cole aqui o JSON da coleção..."
                    className="w-full h-64 p-4 bg-slate-700 border border-slate-600 rounded-xl text-white font-mono text-sm resize-none"
                  />
                </div>
                
                <div className="bg-slate-700/50 p-4 rounded-xl">
                  <h4 className="font-semibold mb-2">Como exportar do Postman:</h4>
                  <ol className="text-sm text-slate-300 space-y-1 list-decimal list-inside">
                    <li>Abra o Postman</li>
                    <li>Clique nos três pontos (...) ao lado da coleção</li>
                    <li>Selecione "Export"</li>
                    <li>Escolha "Collection v2.1" e clique em "Export"</li>
                    <li>Copie o conteúdo do arquivo JSON e cole acima</li>
                  </ol>
                </div>
                
                <div className="flex gap-3">
                  <motion.button
                    onClick={handleImportCollection}
                    disabled={!importData.trim()}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-4 rounded-xl font-inter font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Importar Coleção
                  </motion.button>
                  <motion.button
                    onClick={() => setShowImportModal(false)}
                    className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-inter font-semibold transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancelar
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit/Add Modal */}
      <AnimatePresence>
        {(showEditModal || showAddModal) && editingItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => {
              setShowEditModal(false);
              setShowAddModal(false);
              setEditingItem(null);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-poppins font-bold">
                  {showAddModal ? 'Adicionar' : 'Editar'} {
                    editingType === 'project' ? 'Projeto' :
                    editingType === 'certificate' ? 'Certificado' :
                    'Habilidade'
                  }
                </h3>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setShowAddModal(false);
                    setEditingItem(null);
                  }}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                {editingType === 'project' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">Nome do Projeto:</label>
                      <input
                        type="text"
                        value={editingItem.name || ''}
                        onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Empresa:</label>
                      <input
                        type="text"
                        value={editingItem.company || ''}
                        onChange={(e) => setEditingItem({...editingItem, company: e.target.value})}
                        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Tipo:</label>
                      <select
                        value={editingItem.type || ''}
                        onChange={(e) => setEditingItem({...editingItem, type: e.target.value})}
                        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
                      >
                        <option value="Functional Testing">Functional Testing</option>
                        <option value="Security Testing">Security Testing</option>
                        <option value="API Testing">API Testing</option>
                        <option value="Performance Testing">Performance Testing</option>
                        <option value="Mobile Testing">Mobile Testing</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Tecnologias (separadas por vírgula):</label>
                      <input
                        type="text"
                        value={editingItem.technologies?.join(', ') || ''}
                        onChange={(e) => setEditingItem({...editingItem, technologies: e.target.value.split(', ').filter(t => t.trim())})}
                        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Descrição:</label>
                      <textarea
                        value={editingItem.description || ''}
                        onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                        className="w-full h-24 p-3 bg-slate-700 border border-slate-600 rounded-xl text-white resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Detalhes:</label>
                      <textarea
                        value={editingItem.details || ''}
                        onChange={(e) => setEditingItem({...editingItem, details: e.target.value})}
                        className="w-full h-24 p-3 bg-slate-700 border border-slate-600 rounded-xl text-white resize-none"
                      />
                    </div>
                  </>
                )}

                {editingType === 'certificate' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">Nome do Certificado:</label>
                      <input
                        type="text"
                        value={editingItem.name || ''}
                        onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Instituição:</label>
                      <input
                        type="text"
                        value={editingItem.issuer || ''}
                        onChange={(e) => setEditingItem({...editingItem, issuer: e.target.value})}
                        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Data:</label>
                      <input
                        type="text"
                        value={editingItem.date || ''}
                        onChange={(e) => setEditingItem({...editingItem, date: e.target.value})}
                        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Categoria:</label>
                      <select
                        value={editingItem.category || ''}
                        onChange={(e) => setEditingItem({...editingItem, category: e.target.value})}
                        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
                      >
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
                      <label className="block text-sm font-medium mb-2">Descrição:</label>
                      <textarea
                        value={editingItem.description || ''}
                        onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                        className="w-full h-24 p-3 bg-slate-700 border border-slate-600 rounded-xl text-white resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Habilidades (separadas por vírgula):</label>
                      <input
                        type="text"
                        value={editingItem.skills?.join(', ') || ''}
                        onChange={(e) => setEditingItem({...editingItem, skills: e.target.value.split(', ').filter(s => s.trim())})}
                        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
                      />
                    </div>
                  </>
                )}

                {editingType === 'skill' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">Nome da Habilidade:</label>
                      <input
                        type="text"
                        value={editingItem.name || ''}
                        onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Nível (0-100):</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={editingItem.level || 0}
                        onChange={(e) => setEditingItem({...editingItem, level: parseInt(e.target.value)})}
                        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Ícone:</label>
                      <select
                        value={editingItem.icon || ''}
                        onChange={(e) => setEditingItem({...editingItem, icon: e.target.value})}
                        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
                      >
                        <option value="Bot">Bot</option>
                        <option value="Search">Search</option>
                        <option value="Globe">Globe</option>
                        <option value="Zap">Zap</option>
                        <option value="Shield">Shield</option>
                        <option value="Smartphone">Smartphone</option>
                        <option value="Lightbulb">Lightbulb</option>
                        <option value="Users">Users</option>
                        <option value="MessageCircle">MessageCircle</option>
                        <option value="Brain">Brain</option>
                        <option value="Eye">Eye</option>
                        <option value="Clock">Clock</option>
                        <option value="FileText">FileText</option>
                      </select>
                    </div>
                  </>
                )}
                
                <div className="flex gap-3 pt-4">
                  <motion.button
                    onClick={
                      editingType === 'project' ? handleSaveProject :
                      editingType === 'certificate' ? handleSaveCertificate :
                      handleSaveSkill
                    }
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-xl font-inter font-semibold transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {showAddModal ? 'Adicionar' : 'Salvar Alterações'}
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      setShowEditModal(false);
                      setShowAddModal(false);
                      setEditingItem(null);
                    }}
                    className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-inter font-semibold transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancelar
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;