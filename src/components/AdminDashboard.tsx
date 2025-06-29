import React, { useState, useEffect } from 'react';
import { 
  LogOut, Plus, Edit, Trash2, Save, X, Upload, Image, 
  FileText, Award, User, Settings, Database, Download,
  Eye, EyeOff, Camera, Link, Palette, Monitor, Smartphone,
  Mail, Phone, MapPin, Github, Linkedin, ExternalLink,
  Star, Trophy, Target, Clock, Users, MessageCircle,
  Brain, Lightbulb, Shield, Zap, Globe, Bot, Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AdminDashboardProps {
  onLogout: () => void;
}

interface Project {
  id: string;
  name: string;
  company: string;
  type: string;
  technologies: string[];
  description: string;
  image: string;
  details: string;
}

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  image: string;
  category: string;
  description?: string;
  skills?: string[];
}

interface ProfileSettings {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  profileImage: string;
  heroBackground: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  cvUrl: string;
  primaryColor: string;
  secondaryColor: string;
}

interface AboutSettings {
  aboutTitle: string;
  aboutSubtitle: string;
  aboutDescription1: string;
  aboutDescription2: string;
  myJourneyTitle: string;
  competenciesTitle: string;
  studyAreasTitle: string;
}

interface SkillsSettings {
  skillsTitle: string;
  skillsSubtitle: string;
  technicalArsenalTitle: string;
  qaDocumentationsTitle: string;
  personalSuperpowersTitle: string;
  documentationSpecialtyTitle: string;
  documentationMotivation: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'certificates' | 'profile' | 'about' | 'skills' | 'settings'>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showCertificateForm, setShowCertificateForm] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Estados para configurações
  const [profileSettings, setProfileSettings] = useState<ProfileSettings>({
    name: 'Esther Gabrielle',
    title: 'QA Junior especializada em',
    subtitle: 'testes de qualidade e processos organizacionais',
    description: 'Iniciando minha carreira em QA com paixão por encontrar bugs e garantir qualidade. Sempre em busca de aprender e crescer na área de tecnologia.',
    profileImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    heroBackground: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1920',
    location: 'Santa Bárbara d\'Oeste, SP - Brasil',
    email: 'esthergabriellesouza@gmail.com',
    phone: '(19) 98926-1419',
    linkedin: 'https://linkedin.com/in/esthergabrielle',
    github: 'https://github.com/Esthergabrielles',
    cvUrl: '/cv-esther-gabrielle.pdf',
    primaryColor: '#6366f1',
    secondaryColor: '#8b5cf6'
  });

  const [aboutSettings, setAboutSettings] = useState<AboutSettings>({
    aboutTitle: 'Sobre Mim',
    aboutSubtitle: 'Iniciando minha jornada em QA com muita dedicação e vontade de aprender',
    aboutDescription1: 'Sou uma profissional em formação na área de Quality Assurance, apaixonada por tecnologia e processos organizacionais. Estou dedicando meu tempo ao aprendizado de metodologias de teste e ferramentas de QA.',
    aboutDescription2: 'Meu objetivo é me tornar uma especialista em garantir a qualidade de software, contribuindo para o desenvolvimento de produtos excepcionais.',
    myJourneyTitle: 'Minha Jornada',
    competenciesTitle: 'Competências',
    studyAreasTitle: 'Áreas de Estudo'
  });

  const [skillsSettings, setSkillsSettings] = useState<SkillsSettings>({
    skillsTitle: 'Meu Arsenal Completo',
    skillsSubtitle: 'Ferramentas, tecnologias e habilidades que estou desenvolvendo para me tornar uma profissional QA completa',
    technicalArsenalTitle: 'Arsenal Técnico',
    qaDocumentationsTitle: 'Documentações QA',
    personalSuperpowersTitle: 'Superpoderes Pessoais',
    documentationSpecialtyTitle: 'Especialidade em Documentação',
    documentationMotivation: 'Cada documento é uma peça fundamental para garantir a qualidade. Minha paixão por documentação detalhada e processos bem estruturados é o que me diferencia como QA.'
  });

  // Tipos de projetos expandidos
  const projectTypes = [
    'Functional Testing',
    'Security Testing', 
    'API Testing',
    'Performance Testing',
    'Mobile Testing',
    'Automation Testing',
    'Usability Testing',
    'Integration Testing',
    'Regression Testing'
  ];

  // Categorias de certificados expandidas
  const certificateCategories = [
    'QA',
    'Programming',
    'Web Development',
    'Mobile Development',
    'Database',
    'Infrastructure',
    'Business',
    'Foundation',
    'Higher Education',
    'AI',
    'Sustainability',
    'Security',
    'Cloud Computing'
  ];

  // Carregar dados do localStorage
  useEffect(() => {
    const savedProjects = localStorage.getItem('admin_projects');
    const savedCertificates = localStorage.getItem('admin_certificates');
    const savedProfile = localStorage.getItem('admin_profile');
    const savedAbout = localStorage.getItem('admin_about');
    const savedSkills = localStorage.getItem('admin_skills');

    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
    if (savedCertificates) {
      setCertificates(JSON.parse(savedCertificates));
    }
    if (savedProfile) {
      setProfileSettings(JSON.parse(savedProfile));
    }
    if (savedAbout) {
      setAboutSettings(JSON.parse(savedAbout));
    }
    if (savedSkills) {
      setSkillsSettings(JSON.parse(savedSkills));
    }
  }, []);

  // Salvar dados no localStorage
  const saveData = () => {
    localStorage.setItem('admin_projects', JSON.stringify(projects));
    localStorage.setItem('admin_certificates', JSON.stringify(certificates));
    localStorage.setItem('admin_profile', JSON.stringify(profileSettings));
    localStorage.setItem('admin_about', JSON.stringify(aboutSettings));
    localStorage.setItem('admin_skills', JSON.stringify(skillsSettings));
  };

  // Função para simular upload de arquivo
  const simulateFileUpload = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      setIsUploading(true);
      setUploadProgress(0);
      
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            // Simular URL do arquivo uploadado
            const fakeUrl = `https://example.com/uploads/${file.name}`;
            resolve(fakeUrl);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    });
  };

  // Função para upload de imagem
  const handleImageUpload = async (file: File, callback: (url: string) => void) => {
    try {
      const url = await simulateFileUpload(file);
      callback(url);
    } catch (error) {
      console.error('Erro no upload:', error);
      alert('Erro ao fazer upload da imagem');
    }
  };

  // Componente de Upload de Imagem
  const ImageUploader: React.FC<{
    currentImage: string;
    onImageChange: (url: string) => void;
    label: string;
  }> = ({ currentImage, onImageChange, label }) => {
    const [imageUrl, setImageUrl] = useState(currentImage);
    const [useUpload, setUseUpload] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleImageUpload(file, (url) => {
          setImageUrl(url);
          onImageChange(url);
        });
      }
    };

    const handleUrlChange = (url: string) => {
      setImageUrl(url);
      onImageChange(url);
    };

    return (
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        
        {/* Preview da imagem */}
        {imageUrl && (
          <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
            <img 
              src={imageUrl} 
              alt="Preview" 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Toggle entre Upload e URL */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setUseUpload(false)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              !useUpload 
                ? 'bg-indigo-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <Link className="w-4 h-4 inline mr-2" />
            URL
          </button>
          <button
            type="button"
            onClick={() => setUseUpload(true)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              useUpload 
                ? 'bg-indigo-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <Upload className="w-4 h-4 inline mr-2" />
            Upload
          </button>
        </div>

        {/* Campo de entrada */}
        {useUpload ? (
          <div className="space-y-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-900 dark:file:text-indigo-300"
              disabled={isUploading}
            />
            {isUploading && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}
          </div>
        ) : (
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => handleUrlChange(e.target.value)}
            placeholder="Cole a URL da imagem aqui"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        )}
      </div>
    );
  };

  // Função para salvar projeto
  const saveProject = (project: Omit<Project, 'id'>) => {
    if (editingProject) {
      setProjects(projects.map(p => p.id === editingProject.id ? { ...project, id: editingProject.id } : p));
    } else {
      const newProject = { ...project, id: Date.now().toString() };
      setProjects([...projects, newProject]);
    }
    setEditingProject(null);
    setShowProjectForm(false);
    saveData();
  };

  // Função para salvar certificado
  const saveCertificate = (certificate: Omit<Certificate, 'id'>) => {
    if (editingCertificate) {
      setCertificates(certificates.map(c => c.id === editingCertificate.id ? { ...certificate, id: editingCertificate.id } : c));
    } else {
      const newCertificate = { ...certificate, id: Date.now().toString() };
      setCertificates([...certificates, newCertificate]);
    }
    setEditingCertificate(null);
    setShowCertificateForm(false);
    saveData();
  };

  // Função para deletar projeto
  const deleteProject = (id: string) => {
    if (confirm('Tem certeza que deseja deletar este projeto?')) {
      setProjects(projects.filter(p => p.id !== id));
      saveData();
    }
  };

  // Função para deletar certificado
  const deleteCertificate = (id: string) => {
    if (confirm('Tem certeza que deseja deletar este certificado?')) {
      setCertificates(certificates.filter(c => c.id !== id));
      saveData();
    }
  };

  // Função para exportar backup
  const exportBackup = () => {
    const backup = {
      projects,
      certificates,
      profileSettings,
      aboutSettings,
      skillsSettings,
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(backup, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  // Função para importar backup
  const importBackup = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const backup = JSON.parse(e.target?.result as string);
        
        if (backup.projects) setProjects(backup.projects);
        if (backup.certificates) setCertificates(backup.certificates);
        if (backup.profileSettings) setProfileSettings(backup.profileSettings);
        if (backup.aboutSettings) setAboutSettings(backup.aboutSettings);
        if (backup.skillsSettings) setSkillsSettings(backup.skillsSettings);
        
        saveData();
        alert('Backup importado com sucesso!');
      } catch (error) {
        alert('Erro ao importar backup. Verifique se o arquivo está correto.');
      }
    };
    reader.readAsText(file);
  };

  // Função para logout
  const handleLogout = () => {
    if (confirm('Tem certeza que deseja sair?')) {
      localStorage.removeItem('admin_authenticated');
      localStorage.removeItem('admin_login_time');
      onLogout();
    }
  };

  // Formulário de Projeto
  const ProjectForm: React.FC = () => {
    const [formData, setFormData] = useState<Omit<Project, 'id'>>(
      editingProject || {
        name: '',
        company: '',
        type: projectTypes[0],
        technologies: [],
        description: '',
        image: '',
        details: ''
      }
    );

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      saveProject(formData);
    };

    const addTechnology = (tech: string) => {
      if (tech && !formData.technologies.includes(tech)) {
        setFormData({ ...formData, technologies: [...formData.technologies, tech] });
      }
    };

    const removeTechnology = (tech: string) => {
      setFormData({ 
        ...formData, 
        technologies: formData.technologies.filter(t => t !== tech) 
      });
    };

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {editingProject ? 'Editar Projeto' : 'Novo Projeto'}
            </h2>
            <button
              onClick={() => {
                setShowProjectForm(false);
                setEditingProject(null);
              }}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nome do Projeto
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Empresa/Cliente
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tipo de Teste
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  {projectTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Upload de Imagem */}
            <ImageUploader
              currentImage={formData.image}
              onImageChange={(url) => setFormData({ ...formData, image: url })}
              label="Imagem do Projeto"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Descrição
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Detalhes Completos
              </label>
              <textarea
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tecnologias
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.technologies.map(tech => (
                  <span
                    key={tech}
                    className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTechnology(tech)}
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Adicionar tecnologia"
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTechnology((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    const input = document.querySelector('input[placeholder="Adicionar tecnologia"]') as HTMLInputElement;
                    addTechnology(input.value);
                    input.value = '';
                  }}
                  className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => {
                  setShowProjectForm(false);
                  setEditingProject(null);
                }}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Salvar
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    );
  };

  // Formulário de Certificado
  const CertificateForm: React.FC = () => {
    const [formData, setFormData] = useState<Omit<Certificate, 'id'>>(
      editingCertificate || {
        name: '',
        issuer: '',
        date: '',
        image: '',
        category: certificateCategories[0],
        description: '',
        skills: []
      }
    );

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      saveCertificate(formData);
    };

    const addSkill = (skill: string) => {
      if (skill && !formData.skills?.includes(skill)) {
        setFormData({ 
          ...formData, 
          skills: [...(formData.skills || []), skill] 
        });
      }
    };

    const removeSkill = (skill: string) => {
      setFormData({ 
        ...formData, 
        skills: formData.skills?.filter(s => s !== skill) || []
      });
    };

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {editingCertificate ? 'Editar Certificado' : 'Novo Certificado'}
            </h2>
            <button
              onClick={() => {
                setShowCertificateForm(false);
                setEditingCertificate(null);
              }}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nome do Certificado
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Instituição
                </label>
                <input
                  type="text"
                  value={formData.issuer}
                  onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Data
                </label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  placeholder="Ex: 2024, Jan/2024, etc."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Categoria
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  {certificateCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Upload de Imagem do Certificado */}
            <ImageUploader
              currentImage={formData.image}
              onImageChange={(url) => setFormData({ ...formData, image: url })}
              label="Imagem do Certificado"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Descrição (Opcional)
              </label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Descrição do curso ou certificação..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Habilidades Desenvolvidas (Opcional)
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.skills?.map(skill => (
                  <span
                    key={skill}
                    className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Adicionar habilidade"
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkill((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    const input = document.querySelector('input[placeholder="Adicionar habilidade"]') as HTMLInputElement;
                    addSkill(input.value);
                    input.value = '';
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => {
                  setShowCertificateForm(false);
                  setEditingCertificate(null);
                }}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Salvar
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    );
  };

  // Aba de Configurações do Perfil
  const ProfileTab: React.FC = () => (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <User className="w-6 h-6" />
          Informações Pessoais
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nome Completo
            </label>
            <input
              type="text"
              value={profileSettings.name}
              onChange={(e) => setProfileSettings({ ...profileSettings, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Título Profissional
            </label>
            <input
              type="text"
              value={profileSettings.title}
              onChange={(e) => setProfileSettings({ ...profileSettings, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Subtítulo
            </label>
            <input
              type="text"
              value={profileSettings.subtitle}
              onChange={(e) => setProfileSettings({ ...profileSettings, subtitle: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Descrição
            </label>
            <textarea
              value={profileSettings.description}
              onChange={(e) => setProfileSettings({ ...profileSettings, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Upload de Foto de Perfil */}
        <div className="mt-8">
          <ImageUploader
            currentImage={profileSettings.profileImage}
            onImageChange={(url) => setProfileSettings({ ...profileSettings, profileImage: url })}
            label="Foto de Perfil"
          />
        </div>

        {/* Upload de Imagem de Fundo */}
        <div className="mt-8">
          <ImageUploader
            currentImage={profileSettings.heroBackground}
            onImageChange={(url) => setProfileSettings({ ...profileSettings, heroBackground: url })}
            label="Imagem de Fundo do Hero"
          />
        </div>
      </div>

      {/* Informações de Contato */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <Mail className="w-6 h-6" />
          Informações de Contato
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={profileSettings.email}
              onChange={(e) => setProfileSettings({ ...profileSettings, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Telefone
            </label>
            <input
              type="tel"
              value={profileSettings.phone}
              onChange={(e) => setProfileSettings({ ...profileSettings, phone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Localização
            </label>
            <input
              type="text"
              value={profileSettings.location}
              onChange={(e) => setProfileSettings({ ...profileSettings, location: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              URL do CV
            </label>
            <input
              type="url"
              value={profileSettings.cvUrl}
              onChange={(e) => setProfileSettings({ ...profileSettings, cvUrl: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              LinkedIn
            </label>
            <input
              type="url"
              value={profileSettings.linkedin}
              onChange={(e) => setProfileSettings({ ...profileSettings, linkedin: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              GitHub
            </label>
            <input
              type="url"
              value={profileSettings.github}
              onChange={(e) => setProfileSettings({ ...profileSettings, github: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Personalização Visual */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <Palette className="w-6 h-6" />
          Personalização Visual
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Cor Primária
            </label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={profileSettings.primaryColor}
                onChange={(e) => setProfileSettings({ ...profileSettings, primaryColor: e.target.value })}
                className="w-16 h-10 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={profileSettings.primaryColor}
                onChange={(e) => setProfileSettings({ ...profileSettings, primaryColor: e.target.value })}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Cor Secundária
            </label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={profileSettings.secondaryColor}
                onChange={(e) => setProfileSettings({ ...profileSettings, secondaryColor: e.target.value })}
                className="w-16 h-10 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={profileSettings.secondaryColor}
                onChange={(e) => setProfileSettings({ ...profileSettings, secondaryColor: e.target.value })}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={saveData}
          className="px-8 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors flex items-center gap-2 font-semibold"
        >
          <Save className="w-5 h-5" />
          Salvar Configurações
        </button>
      </div>
    </div>
  );

  // Aba de Configurações Sobre
  const AboutTab: React.FC = () => (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <FileText className="w-6 h-6" />
          Seção Sobre Mim
        </h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Título da Seção
            </label>
            <input
              type="text"
              value={aboutSettings.aboutTitle}
              onChange={(e) => setAboutSettings({ ...aboutSettings, aboutTitle: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Subtítulo
            </label>
            <input
              type="text"
              value={aboutSettings.aboutSubtitle}
              onChange={(e) => setAboutSettings({ ...aboutSettings, aboutSubtitle: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Primeira Descrição
            </label>
            <textarea
              value={aboutSettings.aboutDescription1}
              onChange={(e) => setAboutSettings({ ...aboutSettings, aboutDescription1: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Segunda Descrição
            </label>
            <textarea
              value={aboutSettings.aboutDescription2}
              onChange={(e) => setAboutSettings({ ...aboutSettings, aboutDescription2: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Título "Minha Jornada"
              </label>
              <input
                type="text"
                value={aboutSettings.myJourneyTitle}
                onChange={(e) => setAboutSettings({ ...aboutSettings, myJourneyTitle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Título "Competências"
              </label>
              <input
                type="text"
                value={aboutSettings.competenciesTitle}
                onChange={(e) => setAboutSettings({ ...aboutSettings, competenciesTitle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Título "Áreas de Estudo"
              </label>
              <input
                type="text"
                value={aboutSettings.studyAreasTitle}
                onChange={(e) => setAboutSettings({ ...aboutSettings, studyAreasTitle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={saveData}
          className="px-8 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors flex items-center gap-2 font-semibold"
        >
          <Save className="w-5 h-5" />
          Salvar Configurações
        </button>
      </div>
    </div>
  );

  // Aba de Configurações de Habilidades
  const SkillsTab: React.FC = () => (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <Star className="w-6 h-6" />
          Seção Habilidades
        </h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Título da Seção
            </label>
            <input
              type="text"
              value={skillsSettings.skillsTitle}
              onChange={(e) => setSkillsSettings({ ...skillsSettings, skillsTitle: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Subtítulo
            </label>
            <textarea
              value={skillsSettings.skillsSubtitle}
              onChange={(e) => setSkillsSettings({ ...skillsSettings, skillsSubtitle: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Título "Arsenal Técnico"
              </label>
              <input
                type="text"
                value={skillsSettings.technicalArsenalTitle}
                onChange={(e) => setSkillsSettings({ ...skillsSettings, technicalArsenalTitle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Título "Documentações QA"
              </label>
              <input
                type="text"
                value={skillsSettings.qaDocumentationsTitle}
                onChange={(e) => setSkillsSettings({ ...skillsSettings, qaDocumentationsTitle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Título "Superpoderes Pessoais"
              </label>
              <input
                type="text"
                value={skillsSettings.personalSuperpowersTitle}
                onChange={(e) => setSkillsSettings({ ...skillsSettings, personalSuperpowersTitle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Título "Especialidade em Documentação"
            </label>
            <input
              type="text"
              value={skillsSettings.documentationSpecialtyTitle}
              onChange={(e) => setSkillsSettings({ ...skillsSettings, documentationSpecialtyTitle: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Motivação sobre Documentação
            </label>
            <textarea
              value={skillsSettings.documentationMotivation}
              onChange={(e) => setSkillsSettings({ ...skillsSettings, documentationMotivation: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={saveData}
          className="px-8 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors flex items-center gap-2 font-semibold"
        >
          <Save className="w-5 h-5" />
          Salvar Configurações
        </button>
      </div>
    </div>
  );

  // Aba de Configurações Gerais
  const SettingsTab: React.FC = () => (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <Database className="w-6 h-6" />
          Gerenciamento de Dados
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Exportar Backup
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Faça backup de todos os seus dados (projetos, certificados, configurações)
            </p>
            <button
              onClick={exportBackup}
              className="w-full px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2 font-semibold"
            >
              <Download className="w-5 h-5" />
              Exportar Backup
            </button>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Importar Backup
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Restaure seus dados a partir de um arquivo de backup
            </p>
            <label className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 font-semibold cursor-pointer">
              <Upload className="w-5 h-5" />
              Importar Backup
              <input
                type="file"
                accept=".json"
                onChange={importBackup}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <Settings className="w-6 h-6" />
          Estatísticas
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {projects.length}
            </div>
            <div className="text-sm text-blue-700 dark:text-blue-300 font-medium">
              Projetos
            </div>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {certificates.length}
            </div>
            <div className="text-sm text-green-700 dark:text-green-300 font-medium">
              Certificados
            </div>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {new Set([...projects.map(p => p.type), ...certificates.map(c => c.category)]).size}
            </div>
            <div className="text-sm text-purple-700 dark:text-purple-300 font-medium">
              Categorias
            </div>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              {projects.reduce((acc, p) => acc + p.technologies.length, 0)}
            </div>
            <div className="text-sm text-orange-700 dark:text-orange-300 font-medium">
              Tecnologias
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'projects', label: 'Projetos', icon: FileText, count: projects.length },
    { id: 'certificates', label: 'Certificados', icon: Award, count: certificates.length },
    { id: 'profile', label: 'Perfil', icon: User, count: 0 },
    { id: 'about', label: 'Sobre', icon: MessageCircle, count: 0 },
    { id: 'skills', label: 'Habilidades', icon: Star, count: 0 },
    { id: 'settings', label: 'Configurações', icon: Settings, count: 0 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Painel Administrativo
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Gerencie seu portfólio
                </p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
              {tab.count > 0 && (
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  activeTab === tab.id
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Gerenciar Projetos
                </h2>
                <button
                  onClick={() => setShowProjectForm(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors font-semibold"
                >
                  <Plus className="w-5 h-5" />
                  Novo Projeto
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {project.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      {project.company}
                    </p>
                    <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-sm font-medium mb-4">
                      {project.type}
                    </span>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingProject(project);
                          setShowProjectForm(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
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
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Gerenciar Certificados
                </h2>
                <button
                  onClick={() => setShowCertificateForm(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors font-semibold"
                >
                  <Plus className="w-5 h-5" />
                  Novo Certificado
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((certificate) => (
                  <div
                    key={certificate.id}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <img
                      src={certificate.image}
                      alt={certificate.name}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {certificate.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      {certificate.issuer}
                    </p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {certificate.date}
                      </span>
                      <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                        {certificate.category}
                      </span>
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingCertificate(certificate);
                          setShowCertificateForm(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteCertificate(certificate.id)}
                        className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ProfileTab />
            </motion.div>
          )}

          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AboutTab />
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
              <SkillsTab />
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SettingsTab />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showProjectForm && <ProjectForm />}
        {showCertificateForm && <CertificateForm />}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;