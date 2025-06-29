import React, { useState } from 'react';
import { ArrowLeft, FileText, Code, TestTube, Bug, Download, ExternalLink, Calendar, User, Target, CheckCircle, Award, Zap, Shield, Eye, Play, Pause, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';
import DocumentViewer from './DocumentViewer';

interface ProjectDetailsPageProps {
  project: Project;
  onClose: () => void;
}

const ProjectDetailsPage: React.FC<ProjectDetailsPageProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'documentation' | 'testing' | 'results'>('overview');
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [showDocumentViewer, setShowDocumentViewer] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: Eye, color: 'from-blue-500 to-blue-600' },
    { id: 'documentation', label: 'Documentação', icon: FileText, color: 'from-green-500 to-green-600' },
    { id: 'testing', label: 'Testes Realizados', icon: TestTube, color: 'from-purple-500 to-purple-600' },
    { id: 'results', label: 'Resultados', icon: Award, color: 'from-orange-500 to-orange-600' }
  ];

  const documentationTypes = [
    {
      id: 'test-plan',
      name: 'Plano de Teste',
      description: 'Documento que define escopo, abordagem, recursos e cronograma dos testes',
      icon: FileText,
      template: 'Template_Plano_de_Teste.pdf',
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      type: 'pdf' as const,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'test-cases',
      name: 'Casos de Teste',
      description: 'Conjunto de condições e variáveis para validar um requisito',
      icon: CheckCircle,
      template: 'Template_Casos_de_Teste.xlsx',
      url: 'https://file-examples.com/storage/fe68c8c7c66b2b9c7e8c7e8/2017/10/file_example_XLS_10.xls',
      type: 'doc' as const,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'bug-report',
      name: 'Relatório de Defeitos',
      description: 'Documento detalhado de falhas encontradas durante os testes',
      icon: Bug,
      template: 'Template_Bug_Report.pdf',
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      type: 'pdf' as const,
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'test-execution',
      name: 'Relatório de Execução',
      description: 'Resultado consolidado da execução dos testes',
      icon: Play,
      template: 'Template_Execucao_Teste.pdf',
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      type: 'pdf' as const,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'rtm',
      name: 'Matriz de Rastreabilidade',
      description: 'Mapeia requisitos com casos de teste para garantir cobertura',
      icon: Target,
      template: 'Template_RTM.xlsx',
      url: 'https://file-examples.com/storage/fe68c8c7c66b2b9c7e8c7e8/2017/10/file_example_XLS_10.xls',
      type: 'doc' as const,
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      id: 'test-procedure',
      name: 'Procedimento de Teste',
      description: 'Passo a passo detalhado para executar um teste específico',
      icon: Code,
      template: 'Template_Procedimento_Teste.pdf',
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      type: 'pdf' as const,
      color: 'from-cyan-500 to-cyan-600'
    }
  ];

  const testingActivities = [
    {
      phase: 'Planejamento',
      activities: ['Análise de Requisitos', 'Criação do Plano de Teste', 'Definição de Estratégia'],
      status: 'completed',
      duration: '2 dias'
    },
    {
      phase: 'Design de Testes',
      activities: ['Criação de Casos de Teste', 'Revisão de Casos', 'Preparação de Dados'],
      status: 'completed',
      duration: '3 dias'
    },
    {
      phase: 'Execução',
      activities: ['Testes Funcionais', 'Testes de Regressão', 'Documentação de Bugs'],
      status: 'completed',
      duration: '5 dias'
    },
    {
      phase: 'Relatórios',
      activities: ['Relatório de Execução', 'Métricas de Qualidade', 'Recomendações'],
      status: 'completed',
      duration: '1 dia'
    }
  ];

  const projectResults = [
    { metric: 'Casos de Teste Executados', value: '45', icon: TestTube, color: 'text-blue-500' },
    { metric: 'Bugs Encontrados', value: '12', icon: Bug, color: 'text-red-500' },
    { metric: 'Taxa de Sucesso', value: '96%', icon: CheckCircle, color: 'text-green-500' },
    { metric: 'Cobertura de Testes', value: '89%', icon: Target, color: 'text-purple-500' }
  ];

  const handleDocumentView = (doc: any) => {
    setSelectedDocument({
      id: doc.id,
      name: doc.name,
      url: doc.url,
      type: doc.type,
      description: doc.description
    });
    setShowDocumentViewer(true);
  };

  const handleDocumentDownload = (template: string) => {
    // Simular download de template
    const link = document.createElement('a');
    link.href = '#';
    link.download = template;
    alert(`Download iniciado: ${template}\n\nEm produção, este seria um arquivo real de template de documentação QA.`);
  };

  const closeDocumentViewer = () => {
    setShowDocumentViewer(false);
    setSelectedDocument(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100"
    >
      {/* Header Premium */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-lg border-b border-neutral-200 shadow-lg">
        <div className="container-12">
          <div className="col-span-12 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={onClose}
                  className="p-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft className="w-6 h-6 text-neutral-700" />
                </motion.button>
                
                <div>
                  <h1 className="text-3xl font-poppins font-bold text-neutral-900">
                    {project.name}
                  </h1>
                  <p className="text-neutral-600">
                    {project.company} • {project.type}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full font-medium text-sm">
                  Projeto Concluído
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-[88px] z-30 bg-white/90 backdrop-blur-sm border-b border-neutral-200">
        <div className="container-12">
          <div className="col-span-12 py-4">
            <div className="flex gap-2 overflow-x-auto">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-6 py-3 rounded-xl font-inter font-semibold transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
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
      <div className="container-12 py-12">
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
                {/* Project Image */}
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h2 className="text-2xl font-poppins font-bold mb-2">{project.name}</h2>
                    <p className="text-lg opacity-90">{project.company}</p>
                  </div>
                </div>

                {/* Project Info Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white/80 backdrop-blur-sm border border-neutral-200 rounded-2xl p-8">
                      <h3 className="text-2xl font-poppins font-bold text-neutral-900 mb-4">
                        Descrição do Projeto
                      </h3>
                      <p className="text-neutral-700 font-inter leading-relaxed text-lg">
                        {project.details}
                      </p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm border border-neutral-200 rounded-2xl p-8">
                      <h3 className="text-2xl font-poppins font-bold text-neutral-900 mb-6">
                        Tecnologias Utilizadas
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {project.technologies.map((tech, index) => (
                          <motion.span
                            key={index}
                            className="px-4 py-2 bg-gradient-to-r from-primary-100 to-primary-200 text-primary-700 rounded-full font-medium font-inter border border-primary-200"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-white/80 backdrop-blur-sm border border-neutral-200 rounded-2xl p-6">
                      <h4 className="font-bold text-lg text-neutral-900 mb-4">
                        Informações do Projeto
                      </h4>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <User className="w-5 h-5 text-primary-500" />
                          <div>
                            <p className="text-sm text-neutral-500">Cliente</p>
                            <p className="font-medium text-neutral-900">{project.company}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <TestTube className="w-5 h-5 text-primary-500" />
                          <div>
                            <p className="text-sm text-neutral-500">Tipo de Teste</p>
                            <p className="font-medium text-neutral-900">{project.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-primary-500" />
                          <div>
                            <p className="text-sm text-neutral-500">Status</p>
                            <p className="font-medium text-green-600">Concluído</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Documentation Tab */}
            {activeTab === 'documentation' && (
              <motion.div
                key="documentation"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-poppins font-bold text-neutral-900 mb-4">
                    Documentação QA Profissional
                  </h2>
                  <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                    Templates e modelos de documentação que utilizo em projetos reais de Quality Assurance
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {documentationTypes.map((doc, index) => (
                    <motion.div
                      key={doc.id}
                      className="bg-white/80 backdrop-blur-sm border border-neutral-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                    >
                      <div className={`bg-gradient-to-r ${doc.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <doc.icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-poppins font-bold text-neutral-900 mb-3 group-hover:text-primary-500 transition-colors duration-300">
                        {doc.name}
                      </h3>
                      
                      <p className="text-neutral-600 mb-6 font-inter leading-relaxed">
                        {doc.description}
                      </p>
                      
                      <div className="space-y-3">
                        <motion.button
                          onClick={() => handleDocumentView(doc)}
                          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl font-inter font-semibold flex items-center justify-center gap-2 hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Eye className="w-5 h-5" />
                          Visualizar
                        </motion.button>
                        
                        <motion.button
                          onClick={() => handleDocumentDownload(doc.template)}
                          className="w-full bg-gradient-to-r from-neutral-100 to-neutral-200 text-neutral-700 py-3 px-4 rounded-xl font-inter font-semibold flex items-center justify-center gap-2 hover:from-primary-500 hover:to-primary-600 hover:text-white transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Download className="w-5 h-5" />
                          Download Template
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-primary-500 to-purple-600 rounded-3xl p-8 text-white text-center">
                  <h3 className="text-2xl font-poppins font-bold mb-4">
                    Documentação Personalizada
                  </h3>
                  <p className="text-lg mb-6 opacity-90">
                    Todos os templates podem ser personalizados conforme as necessidades específicas do seu projeto
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-3xl font-bold mb-2">6</div>
                      <div className="text-sm opacity-80">Tipos de Documentos</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold mb-2">100%</div>
                      <div className="text-sm opacity-80">Personalizáveis</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold mb-2">ISO</div>
                      <div className="text-sm opacity-80">Padrões Seguidos</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Testing Tab */}
            {activeTab === 'testing' && (
              <motion.div
                key="testing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-poppins font-bold text-neutral-900 mb-4">
                    Processo de Testes Executado
                  </h2>
                  <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                    Metodologia estruturada aplicada neste projeto para garantir máxima qualidade
                  </p>
                </div>

                <div className="space-y-6">
                  {testingActivities.map((activity, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/80 backdrop-blur-sm border border-neutral-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="bg-gradient-to-r from-green-500 to-green-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                            <CheckCircle className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-poppins font-bold text-neutral-900">
                              {activity.phase}
                            </h3>
                            <p className="text-neutral-600">
                              Duração: {activity.duration}
                            </p>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          Concluído
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {activity.activities.map((act, actIndex) => (
                          <div
                            key={actIndex}
                            className="bg-neutral-50 p-4 rounded-xl"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="font-medium text-neutral-900 text-sm">
                                {act}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Results Tab */}
            {activeTab === 'results' && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-poppins font-bold text-neutral-900 mb-4">
                    Resultados Alcançados
                  </h2>
                  <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                    Métricas e indicadores de qualidade obtidos durante a execução do projeto
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  {projectResults.map((result, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/80 backdrop-blur-sm border border-neutral-200 p-8 rounded-2xl shadow-lg text-center group"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <div className="bg-gradient-to-r from-primary-500 to-primary-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <result.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold text-neutral-900 mb-2 font-poppins">
                        {result.value}
                      </h3>
                      <p className="text-neutral-600 font-inter font-medium">
                        {result.metric}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 text-white">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-poppins font-bold mb-4">
                      Projeto Concluído com Sucesso! 🎉
                    </h3>
                    <p className="text-xl opacity-90">
                      Todos os objetivos de qualidade foram alcançados dentro do prazo estabelecido
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                      <h4 className="text-2xl font-bold mb-2">Qualidade</h4>
                      <p className="opacity-90">96% de taxa de sucesso nos testes executados</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                      <h4 className="text-2xl font-bold mb-2">Prazo</h4>
                      <p className="opacity-90">Entregue dentro do cronograma estabelecido</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                      <h4 className="text-2xl font-bold mb-2">Satisfação</h4>
                      <p className="opacity-90">Cliente totalmente satisfeito com os resultados</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Document Viewer Modal */}
      <DocumentViewer
        document={selectedDocument}
        isOpen={showDocumentViewer}
        onClose={closeDocumentViewer}
      />
    </motion.div>
  );
};

export default ProjectDetailsPage;