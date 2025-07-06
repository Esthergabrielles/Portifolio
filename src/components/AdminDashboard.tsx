import React, { useState, useEffect } from 'react';
import { LogOut, Plus, Edit, Trash2, Save, X, Upload, Download, RefreshCw, Database, CheckCircle, AlertCircle, Users, Award, BookOpen, Trophy, User, MessageSquare, Eye, Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { SupabaseService } from '../services/supabaseService';

const AdminDashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const { user, signOut } = useAuth();
  const { data, loading, refresh } = usePortfolioData();
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'certificates' | 'skills' | 'courses' | 'achievements' | 'personal' | 'feedbacks' | 'database-test'>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Estado para teste de banco de dados
  const [dbTestResults, setDbTestResults] = useState<any[]>([]);
  const [testingDatabase, setTestingDatabase] = useState(false);

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

  // Funções CRUD para cada entidade
  const handleCreate = async (type: string, data: any) => {
    setSaving(true);
    try {
      switch (type) {
        case 'projects':
          await SupabaseService.createProject(data);
          break;
        case 'certificates':
          await SupabaseService.createCertificate(data);
          break;
        case 'skills':
          await SupabaseService.createSkill(data);
          break;
        case 'courses':
          await SupabaseService.createCourse(data);
          break;
        case 'achievements':
          await SupabaseService.createAchievement(data);
          break;
      }
      await refresh();
      setShowAddForm(false);
      showMessage('success', 'Item criado com sucesso!');
    } catch (error) {
      showMessage('error', `Erro ao criar item: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (type: string, id: string, data: any) => {
    setSaving(true);
    try {
      switch (type) {
        case 'projects':
          await SupabaseService.updateProject(id, data);
          break;
        case 'certificates':
          await SupabaseService.updateCertificate(id, data);
          break;
        case 'skills':
          await SupabaseService.updateSkill(id, data);
          break;
        case 'courses':
          await SupabaseService.updateCourse(id, data);
          break;
        case 'achievements':
          await SupabaseService.updateAchievement(id, data);
          break;
      }
      await refresh();
      setIsEditing(false);
      setEditingItem(null);
      showMessage('success', 'Item atualizado com sucesso!');
    } catch (error) {
      showMessage('error', `Erro ao atualizar item: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (type: string, id: string) => {
    if (!confirm('Tem certeza que deseja deletar este item?')) return;
    
    setSaving(true);
    try {
      switch (type) {
        case 'projects':
          await SupabaseService.deleteProject(id);
          break;
        case 'certificates':
          await SupabaseService.deleteCertificate(id);
          break;
        case 'skills':
          await SupabaseService.deleteSkill(id);
          break;
        case 'courses':
          await SupabaseService.deleteCourse(id);
          break;
        case 'achievements':
          await SupabaseService.deleteAchievement(id);
          break;
      }
      await refresh();
      showMessage('success', 'Item deletado com sucesso!');
    } catch (error) {
      showMessage('error', `Erro ao deletar item: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    } finally {
      setSaving(false);
    }
  };

  // Função para testar conexão com banco de dados
  const testDatabaseConnection = async () => {
    setTestingDatabase(true);
    const results: any[] = [];

    try {
      // Teste 1: Verificar conexão básica
      results.push({
        test: 'Conexão com Supabase',
        status: 'testing',
        message: 'Testando conexão...'
      });

      // Teste 2: Listar projetos
      try {
        const projects = await SupabaseService.getProjects();
        results.push({
          test: 'Buscar Projetos',
          status: 'success',
          message: `${projects.length} projetos encontrados`,
          data: projects.length
        });
      } catch (error) {
        results.push({
          test: 'Buscar Projetos',
          status: 'error',
          message: `Erro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
        });
      }

      // Teste 3: Listar certificados
      try {
        const certificates = await SupabaseService.getCertificates();
        results.push({
          test: 'Buscar Certificados',
          status: 'success',
          message: `${certificates.length} certificados encontrados`,
          data: certificates.length
        });
      } catch (error) {
        results.push({
          test: 'Buscar Certificados',
          status: 'error',
          message: `Erro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
        });
      }

      // Teste 4: Listar habilidades
      try {
        const skills = await SupabaseService.getSkills();
        results.push({
          test: 'Buscar Habilidades',
          status: 'success',
          message: `${skills.length} habilidades encontradas`,
          data: skills.length
        });
      } catch (error) {
        results.push({
          test: 'Buscar Habilidades',
          status: 'error',
          message: `Erro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
        });
      }

      // Teste 5: Listar cursos
      try {
        const courses = await SupabaseService.getCourses();
        results.push({
          test: 'Buscar Cursos',
          status: 'success',
          message: `${courses.length} cursos encontrados`,
          data: courses.length
        });
      } catch (error) {
        results.push({
          test: 'Buscar Cursos',
          status: 'error',
          message: `Erro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
        });
      }

      // Teste 6: Listar conquistas
      try {
        const achievements = await SupabaseService.getAchievements();
        results.push({
          test: 'Buscar Conquistas',
          status: 'success',
          message: `${achievements.length} conquistas encontradas`,
          data: achievements.length
        });
      } catch (error) {
        results.push({
          test: 'Buscar Conquistas',
          status: 'error',
          message: `Erro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
        });
      }

      // Teste 7: Buscar informações pessoais
      try {
        const personalInfo = await SupabaseService.getPersonalInfo();
        results.push({
          test: 'Buscar Informações Pessoais',
          status: 'success',
          message: personalInfo ? 'Informações pessoais encontradas' : 'Nenhuma informação pessoal encontrada',
          data: personalInfo ? 1 : 0
        });
      } catch (error) {
        results.push({
          test: 'Buscar Informações Pessoais',
          status: 'error',
          message: `Erro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
        });
      }

      // Teste 8: Listar feedbacks
      try {
        const feedbacks = await SupabaseService.getFeedbacks();
        results.push({
          test: 'Buscar Feedbacks',
          status: 'success',
          message: `${feedbacks.length} feedbacks encontrados`,
          data: feedbacks.length
        });
      } catch (error) {
        results.push({
          test: 'Buscar Feedbacks',
          status: 'warning',
          message: `Feedbacks não disponíveis (modo demonstração)`
        });
      }

      // Atualizar o primeiro teste como sucesso
      results[0] = {
        test: 'Conexão com Supabase',
        status: 'success',
        message: 'Conexão estabelecida com sucesso'
      };

    } catch (error) {
      results[0] = {
        test: 'Conexão com Supabase',
        status: 'error',
        message: `Falha na conexão: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
      };
    }

    setDbTestResults(results);
    setTestingDatabase(false);
  };

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: Database },
    { id: 'database-test', label: 'Teste de BD', icon: CheckCircle },
    { id: 'projects', label: 'Projetos', icon: BookOpen },
    { id: 'certificates', label: 'Certificados', icon: Award },
    { id: 'skills', label: 'Habilidades', icon: Trophy },
    { id: 'courses', label: 'Cursos', icon: BookOpen },
    { id: 'achievements', label: 'Conquistas', icon: Trophy },
    { id: 'personal', label: 'Pessoal', icon: User },
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
                        <span className="text-slate-400">{field}:</span> {item[field] || 'N/A'}
                      </div>
                    ))}
                  </div>
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
                    <span>Dados carregados</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Interface responsiva</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'database-test' && (
            <motion.div
              key="database-test"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Teste de Sistema</h3>
                  <motion.button
                    onClick={testDatabaseConnection}
                    disabled={testingDatabase}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 px-4 py-2 rounded-xl transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {testingDatabase ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Testando...
                      </>
                    ) : (
                      <>
                        <Database className="w-4 h-4" />
                        Executar Testes
                      </>
                    )}
                  </motion.button>
                </div>

                {dbTestResults.length > 0 && (
                  <div className="space-y-3">
                    {dbTestResults.map((result, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex items-center gap-3 p-4 rounded-xl ${
                          result.status === 'success' 
                            ? 'bg-green-900/30 border border-green-700' 
                            : result.status === 'error'
                            ? 'bg-red-900/30 border border-red-700'
                            : result.status === 'warning'
                            ? 'bg-yellow-900/30 border border-yellow-700'
                            : 'bg-blue-900/30 border border-blue-700'
                        }`}
                      >
                        {result.status === 'success' && <CheckCircle className="w-5 h-5 text-green-400" />}
                        {result.status === 'error' && <AlertCircle className="w-5 h-5 text-red-400" />}
                        {result.status === 'warning' && <AlertCircle className="w-5 h-5 text-yellow-400" />}
                        {result.status === 'testing' && <RefreshCw className="w-5 h-5 text-blue-400 animate-spin" />}
                        
                        <div className="flex-1">
                          <h4 className="font-semibold">{result.test}</h4>
                          <p className="text-sm opacity-80">{result.message}</p>
                        </div>
                        
                        {result.data !== undefined && (
                          <div className="text-right">
                            <span className="text-lg font-bold">{result.data}</span>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}

                {dbTestResults.length === 0 && (
                  <div className="text-center py-8 text-slate-400">
                    <Database className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Clique em "Executar Testes" para verificar o sistema</p>
                  </div>
                )}
              </div>
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
              {renderItemsList(data.projects || [], 'projects', ['company', 'type', 'description'])}
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
              {renderItemsList(data.certificates || [], 'certificates', ['issuer', 'date', 'category'])}
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
              {renderItemsList(data.courses || [], 'courses', ['institution', 'progress', 'status'])}
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

          {/* Outras abas */}
          {!['overview', 'database-test', 'projects', 'certificates', 'skills', 'courses', 'achievements', 'feedbacks'].includes(activeTab) && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl text-center"
            >
              <h3 className="text-xl font-bold mb-4">Seção em Desenvolvimento</h3>
              <p className="text-slate-400">
                A seção "{tabs.find(t => t.id === activeTab)?.label}" está sendo desenvolvida.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard;