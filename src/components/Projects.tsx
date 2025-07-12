import React, { useState } from 'react';
import { ExternalLink, Github, Eye, Award, TrendingUp, Shield, Zap, FileText, Code, TestTube, Bug, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioData } from '../hooks/usePortfolioData';
import AnimatedSection from './AnimatedSection';
import { Project } from '../types';
import ProjectDetailsPage from './ProjectDetailsPage';
import PostmanInterface from './PostmanInterface';

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [showPostmanInterface, setShowPostmanInterface] = useState(false);
  const { data: portfolioData, loading } = usePortfolioData();

  const testTypes = ['All', 'Functional Testing', 'Security Testing', 'API Testing', 'Performance Testing', 'Postman Collections'];

  // Usar dados do hook em vez de importação estática
  const projects = portfolioData?.projects || [];
  
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.type === filter);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Functional Testing': return Award;
      case 'Security Testing': return Shield;
      case 'API Testing': return ExternalLink;
      case 'Performance Testing': return Zap;
      case 'Postman Collections': return Send;
      default: return Eye;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Functional Testing': return 'from-blue-500 to-blue-600';
      case 'Security Testing': return 'from-red-500 to-red-600';
      case 'API Testing': return 'from-green-500 to-green-600';
      case 'Performance Testing': return 'from-yellow-500 to-yellow-600';
      case 'Postman Collections': return 'from-orange-500 to-orange-600';
      default: return 'from-primary-500 to-primary-600';
    }
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setShowProjectDetails(true);
  };

  const handlePostmanClick = () => {
    setShowPostmanInterface(true);
  };

  const closeProjectDetails = () => {
    setShowProjectDetails(false);
    setSelectedProject(null);
  };

  const closePostmanInterface = () => {
    setShowPostmanInterface(false);
  };

  if (loading) {
    return (
      <section id="projects" className="section-spacing bg-gradient-to-br from-neutral-100 via-white to-neutral-50 dark:from-black dark:via-neutral-900 dark:to-neutral-800 relative overflow-hidden">
        <div className="container-12 relative z-10">
          <div className="col-span-12 text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-300 rounded mb-4"></div>
              <div className="h-6 bg-gray-200 rounded mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-96 bg-gray-200 rounded-3xl"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (showProjectDetails && selectedProject) {
    return (
      <ProjectDetailsPage 
        project={selectedProject} 
        onClose={closeProjectDetails}
      />
    );
  }

  if (showPostmanInterface) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <motion.button
              onClick={closePostmanInterface}
              className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors bg-white/80 backdrop-blur-sm border border-neutral-200 px-4 py-2 rounded-xl shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.02, x: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              ← Voltar aos Projetos
            </motion.button>
          </div>
          <div className="h-[calc(100vh-120px)]">
            <PostmanInterface />
          </div>
        </div>
      </div>
    );
  }

  return (
    <section id="projects" className="section-spacing bg-gradient-to-br from-neutral-100 via-white to-neutral-50 dark:from-black dark:via-neutral-900 dark:to-neutral-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(47,128,237,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(30deg,transparent_48%,rgba(47,128,237,0.03)_49%,rgba(47,128,237,0.03)_51%,transparent_52%)] bg-[length:60px_60px]" />
      </div>

      <div className="container-12 relative z-10">
        <div className="col-span-12 text-center element-spacing">
          <AnimatedSection animation="slide-up">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-poppins font-bold text-neutral-900 dark:text-white mb-6">
               Projetos em Destaque
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-primary-600 mx-auto mb-8 rounded-full" />
              <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 max-w-4xl mx-auto leading-relaxed font-inter">
               Alguns dos projetos em que trabalhei, demonstrando expertise em diferentes tipos de testes e tecnologias de ponta
              </p>
            </motion.div>
          </AnimatedSection>
        </div>

        {/* Filter Buttons */}
        <div className="col-span-12 element-spacing">
          <AnimatedSection animation="slide-up" delay={1}>
            <div className="flex flex-wrap justify-center gap-3">
              {testTypes.map((type, index) => {
                const Icon = getTypeIcon(type);
                const typeColor = getTypeColor(type);
                return (
                  <motion.button
                    key={type}
                    onClick={() => {
                      if (type === 'Postman Collections') {
                        handlePostmanClick();
                      } else {
                        setFilter(type);
                      }
                    }}
                    className={`px-6 py-3 rounded-xl font-inter font-semibold transition-all duration-300 flex items-center gap-2 ${
                      filter === type
                        ? `bg-gradient-to-r ${typeColor} text-white shadow-xl scale-105`
                        : 'bg-white/80 dark:bg-neutral-800/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:scale-105'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-4 h-4" />
                    {type}
                    {type === 'Postman Collections' && (
                      <motion.span 
                        className="bg-orange-200 text-orange-800 px-2 py-1 rounded-full text-xs font-bold"
                        animate={{ 
                          scale: [1, 1.1, 1],
                          boxShadow: [
                            "0 0 0 0 rgba(251, 146, 60, 0.4)",
                            "0 0 0 10px rgba(251, 146, 60, 0)",
                            "0 0 0 0 rgba(251, 146, 60, 0)"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        LIVE
                      </motion.span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </AnimatedSection>
        </div>

        {/* Projects Grid */}
        <div className="col-span-12">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            layout
          >
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => {
                const TypeIcon = getTypeIcon(project.type);
                const typeColor = getTypeColor(project.type);
                
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <motion.div 
                      className="bg-white/80 dark:bg-neutral-800/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
                      whileHover={{ y: -10, scale: 1.02 }}
                      onClick={() => handleProjectClick(project)}
                    >
                      <div className="relative overflow-hidden">
                        <motion.img
                          src={project.image}
                          alt={project.name}
                          className="w-full h-56 object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <motion.div
                          className="absolute top-4 right-4 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100"
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1.1 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Eye className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                        </motion.div>
                        <motion.div
                          className={`absolute bottom-4 left-4 bg-gradient-to-r ${typeColor} text-white px-3 py-1 rounded-full flex items-center gap-2 opacity-0 group-hover:opacity-100`}
                          initial={{ y: 20, opacity: 0 }}
                          whileHover={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          <TypeIcon className="w-4 h-4" />
                          <span className="text-sm font-medium">{project.type}</span>
                        </motion.div>
                      </div>
                      
                      <div className="p-8">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm font-semibold text-primary-500 dark:text-primary-400 font-inter uppercase tracking-wide">
                            {project.company}
                          </span>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4 text-green-500" />
                            <span className="text-xs text-green-500 font-medium">Sucesso</span>
                          </div>
                        </div>
                        
                        <h3 className="text-2xl font-poppins font-bold text-neutral-900 dark:text-white mb-4 group-hover:text-primary-500 transition-colors duration-300">
                          {project.name}
                        </h3>
                        
                        <p className="text-neutral-600 dark:text-neutral-300 mb-6 line-clamp-2 font-inter leading-relaxed">
                          {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.technologies.slice(0, 3).map((tech, techIndex) => (
                            <motion.span
                              key={techIndex}
                              className="px-3 py-1 bg-gradient-to-r from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium font-inter border border-primary-200 dark:border-primary-700"
                              whileHover={{ scale: 1.05 }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="px-3 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 rounded-full text-sm font-inter">
                              +{project.technologies.length - 3} mais
                            </span>
                          )}
                        </div>
                        
                        <motion.button
                          className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 px-6 rounded-xl font-inter font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                         Ver Detalhes Completos
                          <ExternalLink className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Postman Collections Showcase */}
        <div className="col-span-12 mt-16">
          <motion.div
            className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-12 text-white relative overflow-hidden cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            onClick={handlePostmanClick}
          >
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.1)_49%,rgba(255,255,255,0.1)_51%,transparent_52%)] bg-[length:20px_20px]" />
            
            <div className="relative z-10 text-center">
              <motion.div
                className="flex justify-center mb-6"
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Send className="w-16 h-16 text-white" />
              </motion.div>
              
              <h3 className="text-3xl md:text-4xl font-poppins font-bold mb-6">
                Interface Postman Interativa 🚀
              </h3>
              <p className="text-xl mb-8 max-w-3xl mx-auto font-inter opacity-90 leading-relaxed">
                Explore uma réplica funcional do Postman com coleções reais importadas. 
                Teste APIs, execute requests e veja respostas em tempo real!
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-8">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                  <h4 className="text-2xl font-bold mb-2">Coleções Reais</h4>
                  <p className="opacity-90">Importadas do meu Postman pessoal</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                  <h4 className="text-2xl font-bold mb-2">100% Funcional</h4>
                  <p className="opacity-90">Execute requests reais</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                  <h4 className="text-2xl font-bold mb-2">Interface Idêntica</h4>
                  <p className="opacity-90">Experiência autêntica do Postman</p>
                </div>
              </div>

              <motion.div
                className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-8 py-4 rounded-2xl font-inter font-bold text-lg"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className="w-6 h-6" />
                Clique para Explorar
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;