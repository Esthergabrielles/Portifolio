import React, { useState, useEffect } from 'react';
import { BookOpen, GraduationCap, Clock, Award, TrendingUp, Play, Pause, RotateCcw, Star, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import AnimatedSection from './AnimatedSection';

interface Course {
  id: string;
  name: string;
  institution: string;
  progress: number;
  status: 'completed' | 'in-progress' | 'paused';
  logo: string;
  category: string;
  startDate: string;
  expectedEnd?: string;
  completedDate?: string;
  description: string;
  skills: string[];
  color: string;
  bgColor: string;
}

const Courses: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [animateProgress, setAnimateProgress] = useState(false);
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.3,
    triggerOnce: true,
  });

  const courses: Course[] = [
    {
      id: '1',
      name: 'Técnico em Recursos Humanos',
      institution: 'SENAC',
      progress: 60,
      status: 'paused',
      logo: 'https://tampamania.com.br/site/wp-content/uploads/2018/04/senac-faculdade-df.jpg',
      category: 'Gestão',
      startDate: '2022',
      description: 'Formação técnica focada em gestão de pessoas, recrutamento e desenvolvimento organizacional.',
      skills: ['Recrutamento', 'Gestão de Pessoas', 'Legislação Trabalhista', 'Desenvolvimento Organizacional'],
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20'
    },
    {
      id: '2',
      name: 'Técnico em Segurança do Trabalho',
      institution: 'SENAC',
      progress: 60,
      status: 'paused',
      logo: 'https://tampamania.com.br/site/wp-content/uploads/2018/04/senac-faculdade-df.jpg',
      category: 'Segurança',
      startDate: '2022',
      description: 'Curso técnico voltado para prevenção de acidentes e promoção da segurança no ambiente de trabalho.',
      skills: ['Prevenção de Acidentes', 'Normas Regulamentadoras', 'Ergonomia', 'Gestão de Riscos'],
      color: 'from-red-500 to-red-600',
      bgColor: 'from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20'
    },
    {
      id: '3',
      name: 'CST Gestão Comercial',
      institution: 'Estácio',
      progress: 100,
      status: 'completed',
      logo: 'https://images.seeklogo.com/logo-png/23/1/universidade-estacio-de-sa-logo-png_seeklogo-236721.png',
      category: 'Superior',
      startDate: '2021',
      completedDate: '2023',
      description: 'Curso superior de tecnologia com foco em estratégias comerciais, vendas e gestão de negócios.',
      skills: ['Estratégias Comerciais', 'Gestão de Vendas', 'Marketing', 'Análise de Mercado'],
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20'
    },
    {
      id: '4',
      name: 'Quality Assurance',
      institution: 'Mate Academy',
      progress: 95,
      status: 'in-progress',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMlpdzYE4XS_4cXdXDM7VhyFLQeSyYNYmuTg&s',
      category: 'Tecnologia',
      startDate: '2024',
      expectedEnd: 'Dezembro 2024',
      description: 'Formação completa em Quality Assurance com foco em testes automatizados e metodologias ágeis.',
      skills: ['Testes Automatizados', 'Selenium', 'API Testing', 'Metodologias Ágeis', 'Bug Tracking'],
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20'
    },
    {
      id: '5',
      name: 'FullStack Python',
      institution: 'Mate Academy',
      progress: 15,
      status: 'in-progress',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMlpdzYE4XS_4cXdXDM7VhyFLQeSyYNYmuTg&s',
      category: 'Desenvolvimento',
      startDate: '2024',
      expectedEnd: 'Junho 2025',
      description: 'Curso completo de desenvolvimento web com Python, Django, React e tecnologias modernas.',
      skills: ['Python', 'Django', 'React', 'PostgreSQL', 'APIs REST', 'DevOps'],
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20'
    }
  ];

  useEffect(() => {
    if (isIntersecting) {
      const timer = setTimeout(() => {
        setAnimateProgress(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isIntersecting]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return Award;
      case 'in-progress': return Play;
      case 'paused': return Pause;
      default: return BookOpen;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-500';
      case 'in-progress': return 'text-blue-500';
      case 'paused': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Concluído';
      case 'in-progress': return 'Em Andamento';
      case 'paused': return 'Pausado';
      default: return 'Não Iniciado';
    }
  };

  const stats = [
    { icon: GraduationCap, label: 'Cursos Ativos', value: courses.filter(c => c.status !== 'paused').length, color: 'text-blue-500' },
    { icon: Award, label: 'Concluídos', value: courses.filter(c => c.status === 'completed').length, color: 'text-green-500' },
    { icon: TrendingUp, label: 'Progresso Médio', value: `${Math.round(courses.reduce((acc, c) => acc + c.progress, 0) / courses.length)}%`, color: 'text-purple-500' },
    { icon: Target, label: 'Instituições', value: [...new Set(courses.map(c => c.institution))].length, color: 'text-orange-500' }
  ];

  const ProgressBar: React.FC<{ course: Course; delay: number }> = ({ course, delay }) => {
    const StatusIcon = getStatusIcon(course.status);
    
    return (
      <motion.div
        className={`bg-gradient-to-br ${course.bgColor} border border-neutral-200 dark:border-neutral-700 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: delay * 0.1 }}
        viewport={{ once: true }}
        whileHover={{ y: -8, scale: 1.02 }}
        onClick={() => setSelectedCourse(course)}
      >
        <div className="flex items-center gap-4 mb-6">
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <img
              src={course.logo}
              alt={course.institution}
              className="w-16 h-16 rounded-2xl object-cover shadow-lg"
            />
            <motion.div
              className={`absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r ${course.color} rounded-full flex items-center justify-center shadow-lg`}
              whileHover={{ scale: 1.2 }}
            >
              <StatusIcon className="w-4 h-4 text-white" />
            </motion.div>
          </motion.div>
          
          <div className="flex-1">
            <h3 className="font-bold text-lg text-neutral-900 dark:text-white font-inter group-hover:text-primary-500 transition-colors duration-300">
              {course.name}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300 font-inter font-medium">
              {course.institution}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                course.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                course.status === 'in-progress' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
              }`}>
                {getStatusLabel(course.status)}
              </span>
            </div>
          </div>
          
          <div className="text-right">
            <motion.span 
              className={`text-3xl font-bold bg-gradient-to-r ${course.color} bg-clip-text text-transparent font-poppins`}
              initial={{ scale: 0 }}
              animate={{ scale: animateProgress ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {course.progress}%
            </motion.span>
          </div>
        </div>
        
        <div className="relative mb-4">
          <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-4 overflow-hidden shadow-inner">
            <motion.div 
              className={`bg-gradient-to-r ${course.color} h-4 rounded-full shadow-sm relative overflow-hidden`}
              initial={{ width: 0 }}
              animate={{ width: animateProgress ? `${course.progress}%` : '0%' }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 + delay * 0.1 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: [-100, 200] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </div>
          
          {/* Progress milestones */}
          <div className="flex justify-between mt-2 text-xs text-neutral-500 dark:text-neutral-400">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {course.skills.slice(0, 3).map((skill, index) => (
            <motion.span
              key={index}
              className={`px-3 py-1 bg-gradient-to-r ${course.color} text-white rounded-full text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity duration-300`}
              whileHover={{ scale: 1.05 }}
            >
              {skill}
            </motion.span>
          ))}
          {course.skills.length > 3 && (
            <span className="px-3 py-1 bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 rounded-full text-sm">
              +{course.skills.length - 3}
            </span>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <section id="courses" ref={ref} className="section-spacing bg-gradient-to-br from-white via-neutral-50 to-neutral-100 dark:from-neutral-900 dark:via-black dark:to-neutral-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(47,128,237,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(47,128,237,0.03)_49%,rgba(47,128,237,0.03)_51%,transparent_52%)] bg-[length:30px_30px]" />
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
                Minha Jornada de Aprendizado 📚
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-primary-600 mx-auto mb-8 rounded-full" />
              <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 max-w-4xl mx-auto leading-relaxed font-inter">
                Cada curso é um degrau na escada do conhecimento. Aqui está minha evolução acadêmica 
                e profissional, sempre em busca da excelência
              </p>
            </motion.div>
          </AnimatedSection>
        </div>

        {/* Stats */}
        <div className="col-span-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/80 dark:bg-neutral-800/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 p-8 rounded-3xl shadow-lg text-center group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -8 }}
              >
                <motion.div 
                  className="bg-gradient-to-r from-primary-500 to-primary-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2 font-poppins">
                  {stat.value}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300 font-inter font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="col-span-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses.map((course, index) => (
              <ProgressBar key={course.id} course={course} delay={index} />
            ))}
          </div>
        </div>

        {/* Course Details Modal */}
        <AnimatePresence>
          {selectedCourse && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => setSelectedCourse(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-neutral-800 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={selectedCourse.logo}
                    alt={selectedCourse.institution}
                    className="w-20 h-20 rounded-2xl object-cover shadow-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-2xl font-poppins font-bold text-neutral-900 dark:text-white mb-2">
                      {selectedCourse.name}
                    </h3>
                    <p className="text-lg text-neutral-600 dark:text-neutral-300 font-inter font-medium">
                      {selectedCourse.institution}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        selectedCourse.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                        selectedCourse.status === 'in-progress' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                        'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                      }`}>
                        {getStatusLabel(selectedCourse.status)}
                      </span>
                      <span className="text-sm text-neutral-500 dark:text-neutral-400">
                        {selectedCourse.category}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedCourse(null)}
                    className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200"
                  >
                    ✕
                  </button>
                </div>

                {/* Progress */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-neutral-900 dark:text-white">Progresso</span>
                    <span className={`text-2xl font-bold bg-gradient-to-r ${selectedCourse.color} bg-clip-text text-transparent`}>
                      {selectedCourse.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-4">
                    <div 
                      className={`bg-gradient-to-r ${selectedCourse.color} h-4 rounded-full transition-all duration-1000`}
                      style={{ width: `${selectedCourse.progress}%` }}
                    />
                  </div>
                </div>

                <p className="text-neutral-700 dark:text-neutral-300 mb-6 font-inter leading-relaxed">
                  {selectedCourse.description}
                </p>

                {/* Timeline */}
                <div className="mb-6">
                  <h4 className="font-bold text-neutral-900 dark:text-white mb-3">Timeline</h4>
                  <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-300">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Início: {selectedCourse.startDate}</span>
                    </div>
                    {selectedCourse.completedDate && (
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-green-500" />
                        <span>Concluído: {selectedCourse.completedDate}</span>
                      </div>
                    )}
                    {selectedCourse.expectedEnd && !selectedCourse.completedDate && (
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-blue-500" />
                        <span>Previsão: {selectedCourse.expectedEnd}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h4 className="font-bold text-neutral-900 dark:text-white mb-3">Habilidades Desenvolvidas</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCourse.skills.map((skill, index) => (
                      <span
                        key={index}
                        className={`px-3 py-2 bg-gradient-to-r ${selectedCourse.color} text-white rounded-full text-sm font-medium`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Motivation Section */}
        <div className="col-span-12 mt-16">
          <motion.div
            className="bg-gradient-to-r from-primary-500 to-purple-600 rounded-3xl p-12 text-white text-center relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.1)_49%,rgba(255,255,255,0.1)_51%,transparent_52%)] bg-[length:20px_20px]" />
            
            <div className="relative z-10">
              <motion.div
                className="flex justify-center mb-6"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <GraduationCap className="w-16 h-16 text-yellow-300" />
              </motion.div>
              
              <h3 className="text-3xl md:text-4xl font-poppins font-bold mb-6">
                Aprendizado Contínuo é Minha Paixão 🎓
              </h3>
              <p className="text-xl mb-8 max-w-3xl mx-auto font-inter opacity-90 leading-relaxed">
                Cada curso é uma nova aventura, cada certificação é uma conquista. 
                Meu objetivo é sempre estar um passo à frente, dominando as tecnologias 
                mais modernas e as melhores práticas do mercado.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold mb-2">500+</div>
                  <div className="text-sm opacity-80">Horas de Estudo</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">3</div>
                  <div className="text-sm opacity-80">Instituições</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">∞</div>
                  <div className="text-sm opacity-80">Sede de Conhecimento</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Courses;