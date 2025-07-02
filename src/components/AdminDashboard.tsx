import React, { useState, useEffect } from 'react';
import { LogOut, Upload, Download, Trash2, Edit, Eye, Plus, Save, X, Play, Folder, FileText, Settings, Database, Globe, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [activeTab, setActiveTab] = useState<'overview' | 'collections' | 'settings'>('overview');
  const [collections, setCollections] = useState<PostmanCollection[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<PostmanCollection | null>(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [importData, setImportData] = useState('');
  const [editingCollection, setEditingCollection] = useState<PostmanCollection | null>(null);

  // Carregar coleções do localStorage
  useEffect(() => {
    const savedCollections = localStorage.getItem('postman_collections');
    if (savedCollections) {
      setCollections(JSON.parse(savedCollections));
    } else {
      // Coleções de exemplo
      const exampleCollections: PostmanCollection[] = [
        {
          id: '1',
          name: 'JSONPlaceholder API',
          description: 'Coleção de testes para a API JSONPlaceholder',
          createdAt: '2024-01-15',
          updatedAt: '2024-01-20',
          variables: [
            { key: 'baseUrl', value: 'https://jsonplaceholder.typicode.com', type: 'default' },
            { key: 'apiKey', value: 'your-api-key-here', type: 'secret' }
          ],
          requests: [
            {
              id: 'req1',
              name: 'Get All Posts',
              method: 'GET',
              url: '{{baseUrl}}/posts',
              headers: [
                { key: 'Content-Type', value: 'application/json', enabled: true },
                { key: 'Authorization', value: 'Bearer {{apiKey}}', enabled: false }
              ],
              body: '',
              bodyType: 'none',
              description: 'Busca todos os posts disponíveis',
              tests: `
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response is an array", function () {
    pm.expect(pm.response.json()).to.be.an('array');
});
              `.trim()
            },
            {
              id: 'req2',
              name: 'Create New Post',
              method: 'POST',
              url: '{{baseUrl}}/posts',
              headers: [
                { key: 'Content-Type', value: 'application/json', enabled: true }
              ],
              body: JSON.stringify({
                title: 'Test Post',
                body: 'This is a test post created via API',
                userId: 1
              }, null, 2),
              bodyType: 'json',
              description: 'Cria um novo post',
              tests: `
pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

pm.test("Response has id", function () {
    pm.expect(pm.response.json()).to.have.property('id');
});
              `.trim()
            },
            {
              id: 'req3',
              name: 'Get Post by ID',
              method: 'GET',
              url: '{{baseUrl}}/posts/1',
              headers: [
                { key: 'Content-Type', value: 'application/json', enabled: true }
              ],
              body: '',
              bodyType: 'none',
              description: 'Busca um post específico por ID'
            }
          ]
        },
        {
          id: '2',
          name: 'User Management API',
          description: 'Testes para gerenciamento de usuários',
          createdAt: '2024-01-10',
          updatedAt: '2024-01-18',
          variables: [
            { key: 'baseUrl', value: 'https://jsonplaceholder.typicode.com', type: 'default' }
          ],
          requests: [
            {
              id: 'req4',
              name: 'Get All Users',
              method: 'GET',
              url: '{{baseUrl}}/users',
              headers: [
                { key: 'Content-Type', value: 'application/json', enabled: true }
              ],
              body: '',
              bodyType: 'none',
              description: 'Lista todos os usuários'
            },
            {
              id: 'req5',
              name: 'Get User by ID',
              method: 'GET',
              url: '{{baseUrl}}/users/1',
              headers: [
                { key: 'Content-Type', value: 'application/json', enabled: true }
              ],
              body: '',
              bodyType: 'none',
              description: 'Busca usuário por ID'
            }
          ]
        }
      ];
      setCollections(exampleCollections);
      localStorage.setItem('postman_collections', JSON.stringify(exampleCollections));
    }
  }, []);

  // Salvar coleções no localStorage
  const saveCollections = (newCollections: PostmanCollection[]) => {
    setCollections(newCollections);
    localStorage.setItem('postman_collections', JSON.stringify(newCollections));
  };

  // NOVA FUNÇÃO: Importar coleção do Postman
  const handleImportCollection = () => {
    try {
      const parsedData = JSON.parse(importData);
      
      // Converter formato Postman para nosso formato
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

      // Processar requests recursivamente
      const processItems = (items: any[], parentName = '') => {
        items.forEach(item => {
          if (item.request) {
            // É um request
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
            // É uma pasta, processar recursivamente
            processItems(item.item, item.name);
          }
        });
      };

      if (parsedData.item) {
        processItems(parsedData.item);
      }

      const updatedCollections = [...collections, newCollection];
      saveCollections(updatedCollections);
      
      setImportData('');
      setShowImportModal(false);
      
      alert(`Coleção "${newCollection.name}" importada com sucesso! ${newCollection.requests.length} requests encontrados.`);
    } catch (error) {
      alert('Erro ao importar coleção. Verifique se o JSON está no formato correto do Postman.');
      console.error('Erro na importação:', error);
    }
  };

  // Deletar coleção
  const handleDeleteCollection = (id: string) => {
    if (confirm('Tem certeza que deseja deletar esta coleção?')) {
      const updatedCollections = collections.filter(c => c.id !== id);
      saveCollections(updatedCollections);
    }
  };

  // Editar coleção
  const handleEditCollection = (collection: PostmanCollection) => {
    setEditingCollection({ ...collection });
    setShowEditModal(true);
  };

  // Salvar edição
  const handleSaveEdit = () => {
    if (editingCollection) {
      const updatedCollections = collections.map(c => 
        c.id === editingCollection.id ? { ...editingCollection, updatedAt: new Date().toISOString().split('T')[0] } : c
      );
      saveCollections(updatedCollections);
      setShowEditModal(false);
      setEditingCollection(null);
    }
  };

  // Exportar coleção
  const handleExportCollection = (collection: PostmanCollection) => {
    const exportData = {
      info: {
        name: collection.name,
        description: collection.description,
        schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
      },
      variable: collection.variables.map(v => ({
        key: v.key,
        value: v.value,
        type: v.type
      })),
      item: collection.requests.map(req => ({
        name: req.name,
        request: {
          method: req.method,
          header: req.headers.map(h => ({
            key: h.key,
            value: h.value,
            disabled: !h.enabled
          })),
          body: req.bodyType !== 'none' ? {
            mode: req.bodyType,
            raw: req.body
          } : undefined,
          url: {
            raw: req.url,
            host: req.url.split('/').slice(0, 3),
            path: req.url.split('/').slice(3)
          },
          description: req.description
        },
        event: [
          ...(req.tests ? [{
            listen: "test",
            script: {
              exec: req.tests.split('\n'),
              type: "text/javascript"
            }
          }] : []),
          ...(req.preRequestScript ? [{
            listen: "prerequest",
            script: {
              exec: req.preRequestScript.split('\n'),
              type: "text/javascript"
            }
          }] : [])
        ]
      }))
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${collection.name.replace(/\s+/g, '_')}.postman_collection.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_login_time');
    onLogout();
  };

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: Database },
    { id: 'collections', label: 'Coleções Postman', icon: Folder },
    { id: 'settings', label: 'Configurações', icon: Settings }
  ];

  const stats = [
    { label: 'Total de Coleções', value: collections.length, icon: Folder, color: 'from-blue-500 to-blue-600' },
    { label: 'Total de Requests', value: collections.reduce((acc, c) => acc + c.requests.length, 0), icon: Globe, color: 'from-green-500 to-green-600' },
    { label: 'Variáveis Configuradas', value: collections.reduce((acc, c) => acc + c.variables.length, 0), icon: Settings, color: 'from-purple-500 to-purple-600' },
    { label: 'Última Atualização', value: collections.length > 0 ? Math.max(...collections.map(c => new Date(c.updatedAt).getTime())) > 0 ? 'Hoje' : 'Nunca' : 'Nunca', icon: Zap, color: 'from-orange-500 to-orange-600' }
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
                  <p className="text-slate-400">Gerenciamento de Coleções Postman</p>
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
            <div className="flex gap-2">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-6 py-3 rounded-xl font-inter font-semibold transition-all duration-300 flex items-center gap-2 ${
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
                  <h2 className="text-3xl font-poppins font-bold mb-6">Visão Geral do Sistema</h2>
                  
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

                  {/* Recent Collections */}
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
                    <h3 className="text-xl font-poppins font-bold mb-4">Coleções Recentes</h3>
                    <div className="space-y-3">
                      {collections.slice(0, 5).map((collection) => (
                        <div key={collection.id} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-xl">
                          <div className="flex items-center gap-3">
                            <Folder className="w-5 h-5 text-indigo-400" />
                            <div>
                              <h4 className="font-semibold">{collection.name}</h4>
                              <p className="text-sm text-slate-400">{collection.requests.length} requests</p>
                            </div>
                          </div>
                          <span className="text-sm text-slate-400">{collection.updatedAt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Collections Tab */}
            {activeTab === 'collections' && (
              <motion.div
                key="collections"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-poppins font-bold">Gerenciar Coleções Postman</h2>
                  <motion.button
                    onClick={() => setShowImportModal(true)}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-inter font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Upload className="w-5 h-5" />
                    Importar Coleção
                  </motion.button>
                </div>

                {/* Collections Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {collections.map((collection, index) => (
                    <motion.div
                      key={collection.id}
                      className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-indigo-500/50 transition-all duration-300"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                          <Folder className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex gap-2">
                          <motion.button
                            onClick={() => handleEditCollection(collection)}
                            className="p-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-300 rounded-lg transition-all duration-300"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="Editar"
                          >
                            <Edit className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            onClick={() => handleExportCollection(collection)}
                            className="p-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-300 rounded-lg transition-all duration-300"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="Exportar"
                          >
                            <Download className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            onClick={() => handleDeleteCollection(collection.id)}
                            className="p-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 rounded-lg transition-all duration-300"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="Deletar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
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
                        onClick={() => setSelectedCollection(collection)}
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 px-4 rounded-xl font-inter font-semibold flex items-center justify-center gap-2 hover:from-indigo-600 hover:to-purple-700 transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Eye className="w-4 h-4" />
                        Ver Detalhes
                      </motion.button>
                    </motion.div>
                  ))}
                </div>

                {collections.length === 0 && (
                  <div className="text-center py-12">
                    <Folder className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Nenhuma coleção encontrada</h3>
                    <p className="text-slate-400 mb-6">Importe sua primeira coleção do Postman para começar</p>
                    <motion.button
                      onClick={() => setShowImportModal(true)}
                      className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-inter font-semibold"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Importar Primeira Coleção
                    </motion.button>
                  </div>
                )}
              </motion.div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-poppins font-bold">Configurações do Sistema</h2>
                
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
                  <h3 className="text-xl font-poppins font-bold mb-4">Gerenciamento de Dados</h3>
                  <div className="space-y-4">
                    <motion.button
                      onClick={() => {
                        const allData = {
                          collections,
                          exportDate: new Date().toISOString(),
                          version: '1.0'
                        };
                        const blob = new Blob([JSON.stringify(allData, null, 2)], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'postman_collections_backup.json';
                        a.click();
                        URL.revokeObjectURL(url);
                      }}
                      className="w-full bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-300 py-3 px-4 rounded-xl font-inter font-semibold flex items-center justify-center gap-2 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Download className="w-5 h-5" />
                      Exportar Backup Completo
                    </motion.button>
                    
                    <motion.button
                      onClick={() => {
                        if (confirm('Tem certeza que deseja limpar todas as coleções? Esta ação não pode ser desfeita.')) {
                          localStorage.removeItem('postman_collections');
                          setCollections([]);
                        }
                      }}
                      className="w-full bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 py-3 px-4 rounded-xl font-inter font-semibold flex items-center justify-center gap-2 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Trash2 className="w-5 h-5" />
                      Limpar Todas as Coleções
                    </motion.button>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
                  <h3 className="text-xl font-poppins font-bold mb-4">Informações do Sistema</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Versão:</span>
                      <span>1.0.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Última Sessão:</span>
                      <span>{new Date().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Armazenamento:</span>
                      <span>LocalStorage</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Import Modal - NOVA FUNCIONALIDADE */}
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
                    className="w-full h-64 p-4 bg-slate-700 border border-slate-600 rounded-xl text-white font-mono text-sm resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-xl font-inter font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
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

      {/* Edit Modal */}
      <AnimatePresence>
        {showEditModal && editingCollection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowEditModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-poppins font-bold">Editar Coleção</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nome da Coleção:</label>
                  <input
                    type="text"
                    value={editingCollection.name}
                    onChange={(e) => setEditingCollection({...editingCollection, name: e.target.value})}
                    className="w-full p-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Descrição:</label>
                  <textarea
                    value={editingCollection.description}
                    onChange={(e) => setEditingCollection({...editingCollection, description: e.target.value})}
                    className="w-full h-24 p-3 bg-slate-700 border border-slate-600 rounded-xl text-white resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex gap-3">
                  <motion.button
                    onClick={handleSaveEdit}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl font-inter font-semibold transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Salvar Alterações
                  </motion.button>
                  <motion.button
                    onClick={() => setShowEditModal(false)}
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

      {/* Collection Details Modal */}
      <AnimatePresence>
        {selectedCollection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedCollection(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-poppins font-bold">{selectedCollection.name}</h3>
                <button
                  onClick={() => setSelectedCollection(null)}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-2">Descrição:</h4>
                  <p className="text-slate-300">{selectedCollection.description}</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-3">Variáveis ({selectedCollection.variables.length}):</h4>
                  <div className="space-y-2">
                    {selectedCollection.variables.map((variable, index) => (
                      <div key={index} className="bg-slate-700/50 p-3 rounded-lg flex justify-between items-center">
                        <span className="font-mono text-sm">{variable.key}</span>
                        <span className="text-slate-400 text-sm">{variable.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-3">Requests ({selectedCollection.requests.length}):</h4>
                  <div className="space-y-3">
                    {selectedCollection.requests.map((request, index) => (
                      <div key={index} className="bg-slate-700/50 p-4 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded ${
                            request.method === 'GET' ? 'bg-green-500/20 text-green-300' :
                            request.method === 'POST' ? 'bg-orange-500/20 text-orange-300' :
                            request.method === 'PUT' ? 'bg-blue-500/20 text-blue-300' :
                            request.method === 'DELETE' ? 'bg-red-500/20 text-red-300' :
                            'bg-purple-500/20 text-purple-300'
                          }`}>
                            {request.method}
                          </span>
                          <span className="font-semibold">{request.name}</span>
                        </div>
                        <p className="text-sm text-slate-400 font-mono">{request.url}</p>
                        {request.description && (
                          <p className="text-sm text-slate-300 mt-2">{request.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
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