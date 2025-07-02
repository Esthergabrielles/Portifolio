import React, { useState, useEffect } from 'react';
import { 
  LogOut, Save, Upload, Download, Trash2, Edit, Plus, 
  Image, FileText, Award, User, Settings, Database,
  Eye, EyeOff, Check, X, AlertCircle, Folder, Send
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

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'certificates' | 'skills' | 'courses' | 'achievements' | 'personal' | 'postman' | 'settings'>('projects');
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    projects: [],
    certificates: [],
    skills: [],
    courses: [],
    achievements: [],
    personalInfo: {},
    postmanCollections: []
  });
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [uploadingImage, setUploadingImage] = useState(false);

  // Carregar dados do localStorage na inicialização
  useEffect(() => {
    loadPortfolioData();
  }, []);

  const loadPortfolioData = () => {
    try {
      const savedData = localStorage.getItem('portfolioData');
      if (savedData) {
        const data = JSON.parse(savedData);
        setPortfolioData(data);
      } else {
        // Carregar dados iniciais do portfolio
        loadInitialData();
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      loadInitialData();
    }
  };

  const loadInitialData = async () => {
    try {
      // Importar dados iniciais dos arquivos
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
        postmanCollections: []
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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
      // Simular upload de imagem (em produção, usar serviço real)
      const imageUrl = URL.createObjectURL(file);
      
      if (itemId && field) {
        // Atualizar imagem de item específico
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

  // Postman Collection Functions
  const handlePostmanUpload = async (file: File) => {
    try {
      const text = await file.text();
      const collectionData = JSON.parse(text);
      
      // Validar se é uma coleção válida do Postman
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

  const executeRequest = async (request: any) => {
    try {
      const startTime = Date.now();
      
      const response = await fetch(request.url, {
        method: request.method,
        headers: request.headers.reduce((acc: any, header: any) => {
          acc[header.key] = header.value;
          return acc;
        }, {}),
        body: request.body ? JSON.stringify(request.body) : undefined
      });
      
      const endTime = Date.now();
      const responseData = await response.text();
      
      return {
        status: response.status,
        statusText: response.statusText,
        time: endTime - startTime,
        data: responseData,
        headers: Object.fromEntries(response.headers.entries())
      };
    } catch (error) {
      return {
        status: 0,
        statusText: 'Network Error',
        time: 0,
        data: error.message,
        headers: {}
      };
    }
  };

  const executeCollection = async (collection: PostmanCollection) => {
    const results = [];
    for (const request of collection.requests) {
      const result = await executeRequest(request);
      results.push({ request: request.name, ...result });
    }
    return results;
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

  const tabs = [
    { id: 'projects', label: 'Projetos', icon: Folder, count: portfolioData.projects.length },
    { id: 'certificates', label: 'Certificados', icon: Award, count: portfolioData.certificates.length },
    { id: 'skills', label: 'Habilidades', icon: Settings, count: portfolioData.skills.length },
    { id: 'courses', label: 'Cursos', icon: FileText, count: portfolioData.courses.length },
    { id: 'achievements', label: 'Conquistas', icon: Award, count: portfolioData.achievements.length },
    { id: 'personal', label: 'Dados Pessoais', icon: User, count: 1 },
    { id: 'postman', label: 'Coleções Postman', icon: Send, count: portfolioData.postmanCollections.length },
    { id: 'settings', label: 'Configurações', icon: Settings, count: 0 }
  ];

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
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <h3 className="text-2xl font-bold mb-6">
            {isEditing ? 'Editar' : 'Adicionar'} {tabs.find(t => t.id === activeTab)?.label}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campos específicos por tipo */}
            {activeTab === 'projects' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Nome do Projeto</label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Empresa</label>
                  <input
                    type="text"
                    value={formData.company || ''}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Tipo</label>
                  <select
                    value={formData.type || ''}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full p-3 border rounded-lg"
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
                  <label className="block text-sm font-medium mb-2">Tecnologias (separadas por vírgula)</label>
                  <input
                    type="text"
                    value={Array.isArray(formData.technologies) ? formData.technologies.join(', ') : ''}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value.split(', ').filter(t => t.trim()) })}
                    className="w-full p-3 border rounded-lg"
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Descrição</label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-3 border rounded-lg h-24"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Detalhes</label>
                  <textarea
                    value={formData.details || ''}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full p-3 border rounded-lg h-32"
                  />
                </div>
              </>
            )}

            {activeTab === 'certificates' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Nome do Certificado</label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Instituição</label>
                  <input
                    type="text"
                    value={formData.issuer || ''}
                    onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Data</label>
                  <input
                    type="text"
                    value={formData.date || ''}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full p-3 border rounded-lg"
                    placeholder="2024"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Categoria</label>
                  <select
                    value={formData.category || ''}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-3 border rounded-lg"
                    required
                  >
                    <option value="">Selecione a categoria</option>
                    <option value="QA">QA</option>
                    <option value="Programming">Programming</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Business">Business</option>
                    <option value="Foundation">Foundation</option>
                    <option value="Higher Education">Higher Education</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Descrição</label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-3 border rounded-lg h-24"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Habilidades (separadas por vírgula)</label>
                  <input
                    type="text"
                    value={Array.isArray(formData.skills) ? formData.skills.join(', ') : ''}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value.split(', ').filter(s => s.trim()) })}
                    className="w-full p-3 border rounded-lg"
                    placeholder="JavaScript, React, Node.js"
                  />
                </div>
              </>
            )}

            {activeTab === 'skills' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Nome da Habilidade</label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Nível (0-100)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.level || 0}
                    onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Ícone</label>
                  <select
                    value={formData.icon || ''}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full p-3 border rounded-lg"
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
                  </select>
                </div>
              </>
            )}

            {/* Upload de Imagem */}
            <div>
              <label className="block text-sm font-medium mb-2">Imagem</label>
              <div className="space-y-3">
                {formData.image && (
                  <img src={formData.image} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUploadForForm}
                  className="w-full p-3 border rounded-lg"
                />
                {uploadingImage && <p className="text-sm text-blue-600">Fazendo upload...</p>}
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {isEditing ? 'Salvar Alterações' : 'Adicionar Item'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditingItem(null);
                  setShowAddForm(false);
                }}
                className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors"
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
    const currentData = portfolioData[activeTab as keyof PortfolioData];

    if (activeTab === 'postman') {
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Coleções Postman</h2>
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
              <div key={collection.id} className="bg-white dark:bg-slate-800 rounded-lg p-6 border">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{collection.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{collection.description}</p>
                    <p className="text-sm text-gray-500">
                      {collection.requests.length} requisições • Arquivo: {collection.fileName}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteItem(collection.id)}
                    className="text-red-600 hover:text-red-800 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2 mb-4">
                  {collection.requests.slice(0, 5).map((request, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-slate-700 rounded">
                      <span className={`px-2 py-1 text-xs font-bold rounded ${
                        request.method === 'GET' ? 'bg-green-100 text-green-800' :
                        request.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                        request.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                        request.method === 'DELETE' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {request.method}
                      </span>
                      <span className="font-medium">{request.name}</span>
                      <span className="text-sm text-gray-500 truncate">{request.url}</span>
                    </div>
                  ))}
                  {collection.requests.length > 5 && (
                    <p className="text-sm text-gray-500">
                      +{collection.requests.length - 5} mais requisições...
                    </p>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={async () => {
                      const results = await executeCollection(collection);
                      console.log('Resultados da execução:', results);
                      alert(`Coleção executada! ${results.length} requisições processadas.`);
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                  >
                    Executar Coleção
                  </button>
                </div>
              </div>
            ))}

            {portfolioData.postmanCollections.length === 0 && (
              <div className="text-center py-12 text-gray-500">
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
          <h2 className="text-2xl font-bold">Dados Pessoais</h2>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Nome</label>
                <input
                  type="text"
                  value={portfolioData.personalInfo.name || ''}
                  onChange={(e) => {
                    const updatedData = { ...portfolioData };
                    updatedData.personalInfo.name = e.target.value;
                    setPortfolioData(updatedData);
                  }}
                  className="w-full p-3 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Título</label>
                <input
                  type="text"
                  value={portfolioData.personalInfo.title || ''}
                  onChange={(e) => {
                    const updatedData = { ...portfolioData };
                    updatedData.personalInfo.title = e.target.value;
                    setPortfolioData(updatedData);
                  }}
                  className="w-full p-3 border rounded-lg"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Descrição</label>
                <textarea
                  value={portfolioData.personalInfo.description || ''}
                  onChange={(e) => {
                    const updatedData = { ...portfolioData };
                    updatedData.personalInfo.description = e.target.value;
                    setPortfolioData(updatedData);
                  }}
                  className="w-full p-3 border rounded-lg h-24"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={portfolioData.personalInfo.email || ''}
                  onChange={(e) => {
                    const updatedData = { ...portfolioData };
                    updatedData.personalInfo.email = e.target.value;
                    setPortfolioData(updatedData);
                  }}
                  className="w-full p-3 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Telefone</label>
                <input
                  type="text"
                  value={portfolioData.personalInfo.phone || ''}
                  onChange={(e) => {
                    const updatedData = { ...portfolioData };
                    updatedData.personalInfo.phone = e.target.value;
                    setPortfolioData(updatedData);
                  }}
                  className="w-full p-3 border rounded-lg"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Localização</label>
                <input
                  type="text"
                  value={portfolioData.personalInfo.location || ''}
                  onChange={(e) => {
                    const updatedData = { ...portfolioData };
                    updatedData.personalInfo.location = e.target.value;
                    setPortfolioData(updatedData);
                  }}
                  className="w-full p-3 border rounded-lg"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Foto de Perfil</label>
                <div className="space-y-3">
                  {portfolioData.personalInfo.profileImage && (
                    <img 
                      src={portfolioData.personalInfo.profileImage} 
                      alt="Profile" 
                      className="w-32 h-32 object-cover rounded-full" 
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        try {
                          const imageUrl = await handleImageUpload(file);
                          const updatedData = { ...portfolioData };
                          updatedData.personalInfo.profileImage = imageUrl;
                          setPortfolioData(updatedData);
                        } catch (error) {
                          alert('Erro ao fazer upload da imagem');
                        }
                      }
                    }}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={() => savePortfolioData()}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
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
          <h2 className="text-2xl font-bold">Configurações</h2>
          <div className="grid gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border">
              <h3 className="text-lg font-bold mb-4">Backup e Restauração</h3>
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
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {tabs.find(t => t.id === activeTab)?.label}
          </h2>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Adicionar
          </button>
        </div>

        <div className="grid gap-6">
          {Array.isArray(currentData) && currentData.map((item: any) => (
            <div key={item.id} className="bg-white dark:bg-slate-800 rounded-lg p-6 border">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-bold">{item.name || item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.company || item.issuer || item.organization || item.description}
                  </p>
                  {item.image && (
                    <img src={item.image} alt="" className="w-20 h-20 object-cover rounded mt-2" />
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingItem(item)}
                    className="text-blue-600 hover:text-blue-800 p-2"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="text-red-600 hover:text-red-800 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {Array.isArray(currentData) && currentData.length === 0 && (
            <div className="text-center py-12 text-gray-500">
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
              <h2 className="text-lg font-bold mb-6">Seções</h2>
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-300 flex items-center justify-between ${
                      activeTab === tab.id
                        ? 'bg-indigo-600 text-white'
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