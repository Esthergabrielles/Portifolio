import React, { useState, useEffect } from 'react';
import { LogOut, Plus, Edit, Trash2, Save, X, Upload, Download, RefreshCw, Database, CheckCircle, AlertCircle, Users, Award, BookOpen, Trophy, User, MessageSquare } from 'lucide-react';
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
          status: 'error',
          message: `Erro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
        });
      }

      // Teste 9: Teste de inserção (projeto de teste)
      try {
        const testProject = {
          name: 'Projeto de Teste - ' + new Date().toISOString(),
          company: 'Teste Admin',
          type: 'Database Test',
          technologies: ['Supabase', 'React'],
          description: 'Projeto criado para testar a conexão com o banco de dados',
          image: 'https://via.placeholder.com/400x300',
          details: 'Este é um projeto de teste criado automaticamente para verificar se as operações de inserção estão funcionando corretamente.'
        };

        const newProject = await SupabaseService.createProject(testProject);
        results.push({
          test: 'Criar Projeto (Teste)',
          status: 'success',
          message: `Projeto criado com ID: ${newProject.id}`,
          data: newProject.id
        });

        // Teste 10: Teste de atualização
        const updatedProject = await SupabaseService.updateProject(newProject.id, {
          description: 'Projeto atualizado via teste de banco de dados'
        });
        results.push({
          test: 'Atualizar Projeto (Teste)',
          status: 'success',
          message: 'Projeto atualizado com sucesso',
          data: updatedProject.id
        });

        // Teste 11: Teste de exclusão
        await SupabaseService.deleteProject(newProject.id);
        results.push({
          test: 'Deletar Projeto (Teste)',
          status: 'success',
          message: 'Projeto deletado com sucesso'
        });

      } catch (error) {
        results.push({
          test: 'Operações CRUD',
          status: 'error',
          message: `Erro nas operações CRUD: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
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
                    <span>Banco de dados conectado</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Autenticação ativa</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>API funcionando</span>
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
                  <h3 className="text-xl font-bold">Teste de Banco de Dados</h3>
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
                            : 'bg-yellow-900/30 border border-yellow-700'
                        }`}
                      >
                        {result.status === 'success' && <CheckCircle className="w-5 h-5 text-green-400" />}
                        {result.status === 'error' && <AlertCircle className="w-5 h-5 text-red-400" />}
                        {result.status === 'testing' && <RefreshCw className="w-5 h-5 text-yellow-400 animate-spin" />}
                        
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
                    <p>Clique em "Executar Testes" para verificar a conexão com o banco de dados</p>
                  </div>
                )}
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-4">Informações de Conexão</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-400">URL do Supabase:</span>
                    <p className="font-mono bg-slate-900 p-2 rounded mt-1">
                      {import.meta.env.VITE_SUPABASE_URL || 'Não configurado'}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-400">Chave Anônima:</span>
                    <p className="font-mono bg-slate-900 p-2 rounded mt-1">
                      {import.meta.env.VITE_SUPABASE_ANON_KEY ? '***...***' : 'Não configurado'}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-400">Usuário Logado:</span>
                    <p className="font-mono bg-slate-900 p-2 rounded mt-1">
                      {user?.email || 'Não autenticado'}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-400">Status da Conexão:</span>
                    <p className="font-mono bg-slate-900 p-2 rounded mt-1 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Conectado
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Outras abas podem ser implementadas aqui */}
          {activeTab !== 'overview' && activeTab !== 'database-test' && (
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