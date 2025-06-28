import React, { useState } from 'react';
import { ExternalLink, Github, Eye, Award, TrendingUp, Shield, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/portfolio';
import Modal from './Modal';
import AnimatedSection from './AnimatedSection';
import { Project } from '../types';

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const testTypes = ['All', 'Functional Testing', 'Security Testing', 'API Testing', 'Performance Testing'];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.type === filter);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Functional Testing': return Award;
      case 'Security Testing': return Shield;
      case 'API Testing': return ExternalLink;
      case 'Performance Testing': return Zap;
      default: return Eye;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Functional Testing': return 'from-blue-500 to-blue-600';
      case 'Security Testing': return 'from-red-500 to-red-600';
      case 'API Testing': return 'from-green-500 to-green-600';
      case 'Performance Testing': return 'from-yellow-500 to-yellow-600';
      default: return 'from-primary-500 to-primary-600';
    }
  };

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
                Alguns dos projetos em que trabalhei, demonstrando expertise em diferentes 
                tipos de testes e tecnologias de ponta
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
                return (
                  <motion.button
                    key={type}
                    onClick={() => setFilter(type)}
                    className={`px-6 py-3 rounded-xl font-inter font-semibold transition-all duration-300 flex items-center gap-2 ${
                      filter === type
                        ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-xl scale-105'
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
                      onClick={() => setSelectedProject(project)}
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

        {/* Project Details Modal */}
        <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)}>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative mb-8">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.name}
                  className="w-full h-80 object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
                <div className="absolute bottom-6 left-6">
                  <span className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${getTypeColor(selectedProject.type)} text-white rounded-full font-medium`}>
                    {React.createElement(getTypeIcon(selectedProject.type), { className: "w-4 h-4" })}
                    {selectedProject.type}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-poppins font-bold text-neutral-900 dark:text-white">
                  {selectedProject.name}
                </h3>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span className="text-green-500 font-medium">Projeto Concluído</span>
                </div>
              </div>
              
              <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-2 font-inter">
                <strong className="text-primary-500">Cliente:</strong> {selectedProject.company}
              </p>
              
              <p className="text-neutral-700 dark:text-neutral-300 mb-8 leading-relaxed font-inter text-lg">
                {selectedProject.details}
              </p>
              
              <div className="mb-8">
                <h4 className="text-xl font-poppins font-bold text-neutral-900 dark:text-white mb-4">
                  Tecnologias e Ferramentas
                </h4>
                <div className="flex flex-wrap gap-3">
                  {selectedProject.technologies.map((tech, index) => (
                    <motion.span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 text-primary-700 dark:text-primary-300 rounded-full font-medium font-inter border border-primary-200 dark:border-primary-700"
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

              <div className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 p-6 rounded-2xl border border-primary-200 dark:border-primary-700">
                <h4 className="text-lg font-poppins font-bold text-neutral-900 dark:text-white mb-2">
                  Resultados Alcançados
                </h4>
                <p className="text-neutral-700 dark:text-neutral-300 font-inter">
                  Projeto executado com sucesso, garantindo alta qualidade e satisfação do cliente através de testes abrangentes e metodologias ágeis.
                </p>
              </div>
            </motion.div>
          )}
        </Modal>
      </div>
    </section>
  );
};

export default Projects;