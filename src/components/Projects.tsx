import React, { useState } from 'react';
import { ExternalLink, Github, Eye } from 'lucide-react';
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

  return (
    <section id="projects" className="section-spacing bg-neutral-50 dark:bg-neutral-800">
      <div className="container-12">
        <div className="col-span-12 text-center element-spacing">
          <AnimatedSection animation="slide-up">
            <h2 className="text-display font-poppins text-neutral-900 dark:text-white mb-4">
              Projetos
            </h2>
            <p className="text-h2 text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
              Alguns dos projetos em que trabalhei, demonstrando expertise em diferentes 
              tipos de testes e tecnologias
            </p>
          </AnimatedSection>
        </div>

        {/* Filter Buttons */}
        <div className="col-span-12 element-spacing">
          <AnimatedSection animation="slide-up" delay={1}>
            <div className="flex flex-wrap justify-center gap-2">
              {testTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-4 py-2 rounded-lg font-inter font-medium transition-all duration-300 hover-lift will-change-transform ${
                    filter === type
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'glass-card text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Projects Grid */}
        <div className="col-span-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <AnimatedSection key={project.id} animation="slide-up" delay={index + 2}>
                <div className="glass-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover-lift will-change-transform">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 will-change-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
                      <Eye className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-small font-medium text-primary-500 dark:text-primary-400 font-inter">
                        {project.company}
                      </span>
                      <span className="text-xs px-2 py-1 glass-card text-neutral-600 dark:text-neutral-300 rounded-full">
                        {project.type}
                      </span>
                    </div>
                    
                    <h3 className="text-h2 font-poppins text-neutral-900 dark:text-white mb-3">
                      {project.name}
                    </h3>
                    
                    <p className="text-body text-neutral-600 dark:text-neutral-300 mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded text-xs font-medium font-inter"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 glass-card text-neutral-600 dark:text-neutral-300 rounded text-xs font-inter">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                    
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="w-full bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600 transition-all duration-300 font-inter font-medium flex items-center justify-center gap-2 hover-lift will-change-transform"
                    >
                      Ver Detalhes
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Project Details Modal */}
        <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)}>
          {selectedProject && (
            <div>
              <img
                src={selectedProject.image}
                alt={selectedProject.name}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-h1 font-poppins text-neutral-900 dark:text-white">
                  {selectedProject.name}
                </h3>
                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-small font-medium font-inter">
                  {selectedProject.type}
                </span>
              </div>
              
              <p className="text-body text-neutral-600 dark:text-neutral-300 mb-4 font-inter">
                <strong>Empresa:</strong> {selectedProject.company}
              </p>
              
              <p className="text-body text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed font-inter">
                {selectedProject.details}
              </p>
              
              <div>
                <h4 className="text-h2 font-poppins text-neutral-900 dark:text-white mb-3">
                  Tecnologias Utilizadas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-small font-medium font-inter"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
};

export default Projects;