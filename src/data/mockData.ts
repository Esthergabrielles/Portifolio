import { Project, Certificate, Skill, Course, Achievement, PersonalInfo } from '../types';

// Dados de exemplo para o portfólio
export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Projeto de Estudo - E-commerce',
    company: 'Projeto Acadêmico',
    type: 'Functional Testing',
    technologies: ['Selenium', 'TestRail', 'Postman'],
    description: 'Projeto de estudo focado em testes funcionais de uma plataforma e-commerce simulada.',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    details: 'Desenvolvimento de casos de teste para funcionalidades básicas de e-commerce, incluindo cadastro, login e carrinho de compras. Foco no aprendizado de metodologias de teste.'
  },
  {
    id: '2',
    name: 'Simulação - App Mobile',
    company: 'Projeto de Curso',
    type: 'Mobile Testing',
    technologies: ['Appium', 'Android Studio'],
    description: 'Simulação de testes em aplicativo mobile para aprendizado de ferramentas.',
    image: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=800',
    details: 'Projeto prático do curso de QA focado em testes de aplicações mobile, explorando diferentes cenários de uso e validação de interface.'
  },
  {
    id: '3',
    name: 'Estudo de API Testing',
    company: 'Autoestudo',
    type: 'API Testing',
    technologies: ['Postman', 'Newman'],
    description: 'Projeto pessoal para aprender testes de API e integração.',
    image: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=800',
    details: 'Estudo prático de testes de API utilizando Postman, criação de coleções de testes e automação básica com Newman.'
  }
];

export const mockCertificates: Certificate[] = [
  {
    id: '1',
    name: 'CURSO SUPERIOR DE TECNOLOGIA EM GESTÃO COMERCIAL',
    issuer: 'Estácio',
    date: '2023',
    image: 'https://media.licdn.com/dms/image/v2/D4D2DAQF8bLpce7587w/profile-treasury-document-cover-images_480/B4DZe32cusH4A4-/0/1751136194549?e=1751742000&v=beta&t=flR49sD5OZCLM3DiBEOwQEE9B0foXkOG-8fUyn1t30M',
    category: 'Higher Education',
    description: 'Diploma de curso superior em gestão comercial e estratégias de negócios.',
    skills: ['Gestão Comercial', 'Estratégias de Negócio', 'Liderança', 'Análise de Mercado']
  },
  {
    id: '2',
    name: 'MOBILE TESTING',
    issuer: 'Mate Academy',
    date: '2024',
    image: 'https://media.licdn.com/dms/image/v2/D4D2DAQE1EOxbdgl4GA/profile-treasury-document-cover-images_480/B4DZe32TmLHkBE-/0/1751136157019?e=1751742000&v=beta&t=v0CQ3LIWz88KE8dszedRB1dKRY3gMGPkETYm-AKoswA',
    category: 'QA',
    description: 'Certificação em testes de aplicações móveis, cobrindo metodologias e ferramentas específicas.',
    skills: ['Mobile Testing', 'Appium', 'Device Testing', 'UI/UX Testing']
  },
  {
    id: '3',
    name: 'QA THEORY',
    issuer: 'Mate Academy',
    date: '2024',
    image: 'https://media.licdn.com/dms/image/v2/D4D2DAQFEFp5kZciIcg/profile-treasury-document-cover-images_480/B4DZaI5dTgGgA0-/0/1746053486694?e=1751821200&v=beta&t=15pXGhChW8Gq5t83MvXawPohigBSYc_3xrRzFBpchME',
    category: 'QA',
    description: 'Teoria fundamental de Quality Assurance e metodologias de teste.',
    skills: ['Teoria de QA', 'Metodologias de Teste', 'Ciclo de Vida', 'Documentação']
  },
  {
    id: '4',
    name: 'JAVASCRIPT BASICS',
    issuer: 'Mate Academy',
    date: '2024',
    image: 'https://media.licdn.com/dms/image/v2/D4D2DAQGPAjIOv7EA8g/profile-treasury-document-cover-images_480/B4DZaEc6bxG8A0-/0/1745978895074?e=1751742000&v=beta&t=E35klWdhbZoY2CDRVygG6K7aPrDmWsqyYaXFDhqOXX8',
    category: 'Programming',
    description: 'Fundamentos da linguagem JavaScript para iniciantes.',
    skills: ['JavaScript', 'Variáveis', 'Funções', 'Estruturas de Controle']
  }
];

export const mockSkills: Skill[] = [
  // Technical Skills
  { id: '1', name: 'Jira', level: 90, icon: 'Bot', category: 'technical' },
  { id: '2', name: 'TestRail', level: 85, icon: 'Search', category: 'technical' },
  { id: '3', name: 'Postman', level: 80, icon: 'Shield', category: 'technical' },
  { id: '4', name: 'Git / GitHub', level: 70, icon: 'Globe', category: 'technical' },
  { id: '5', name: 'SQL', level: 75, icon: 'Search', category: 'technical' },
  { id: '6', name: 'Chrome DevTools', level: 80, icon: 'Eye', category: 'technical' },
  { id: '7', name: 'HTML / CSS', level: 70, icon: 'Globe', category: 'technical' },
  { id: '8', name: 'JavaScript', level: 50, icon: 'Zap', category: 'technical' },
  
  // Documentation Skills
  { id: '9', name: 'Plano de Teste (Test Plan)', level: 85, icon: 'FileText', category: 'documentation' },
  { id: '10', name: 'Casos de Teste (Test Cases)', level: 90, icon: 'Search', category: 'documentation' },
  { id: '11', name: 'Relatório de Defeitos (Bug Report)', level: 95, icon: 'Zap', category: 'documentation' },
  { id: '12', name: 'Matriz de Rastreabilidade (RTM)', level: 65, icon: 'Shield', category: 'documentation' },
  { id: '13', name: 'Relatório de Execução de Teste', level: 80, icon: 'Eye', category: 'documentation' },
  { id: '14', name: 'Procedimento de Teste', level: 80, icon: 'Globe', category: 'documentation' },
  
  // Soft Skills
  { id: '15', name: 'Atenção aos Detalhes', level: 90, icon: 'Eye', category: 'soft' },
  { id: '16', name: 'Comunicação', level: 85, icon: 'MessageCircle', category: 'soft' },
  { id: '17', name: 'Organização', level: 88, icon: 'Users', category: 'soft' },
  { id: '18', name: 'Pensamento Analítico', level: 80, icon: 'Brain', category: 'soft' },
  { id: '19', name: 'Vontade de Aprender', level: 95, icon: 'Lightbulb', category: 'soft' },
  { id: '20', name: 'Trabalho em Equipe', level: 85, icon: 'Clock', category: 'soft' }
];

export const mockCourses: Course[] = [
  {
    id: '1',
    name: 'QA Engineer Bootcamp',
    institution: 'Mate Academy',
    progress: 93,
    status: 'in-progress',
    category: 'QA',
    startDate: '2024-01-15',
    expectedEnd: '2024-06-15',
    completedDate: null,
    description: 'Bootcamp intensivo de Quality Assurance cobrindo testes manuais, automação e metodologias ágeis.',
    skills: ['Manual Testing', 'Test Automation', 'API Testing', 'Mobile Testing'],
    color: 'from-blue-500 to-blue-600',
    logo: 'https://mate.academy/static/images/logo.svg'
  },
  {
    id: '2',
    name: 'FullStack Python',
    institution: 'Mate Academy',
    progress: 45,
    status: 'in-progress',
    category: 'Programming',
    startDate: '2024-03-01',
    expectedEnd: '2024-12-01',
    completedDate: null,
    description: 'Curso completo de desenvolvimento Python para web.',
    skills: ['Python', 'Django', 'PostgreSQL', 'REST APIs'],
    color: 'from-green-500 to-green-600',
    logo: 'https://mate.academy/static/images/logo.svg'
  }
];

export const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Funcionária Destaque',
    organization: 'Destra Gestão de Terceiros',
    date: '2024',
    description: 'Reconhecida como Funcionária Destaque em Novembro/2024 por excelência em auditorias documentais.',
    type: 'recognition'
  },
  {
    id: '2',
    title: 'Progresso Excepcional em QA',
    organization: 'Mate Academy',
    date: '2024',
    description: 'Alcançou 93% de progresso no Bootcamp QA Engineer, demonstrando dedicação e aprendizado acelerado.',
    type: 'academic'
  },
  {
    id: '3',
    title: 'Melhoria de Processos',
    organization: 'Destra Gestão de Terceiros',
    date: '2023-2024',
    description: 'Implementou melhorias em PGR x PCMSO, reduzindo significativamente não conformidades.',
    type: 'professional'
  }
];

export const mockPersonalInfo: PersonalInfo = {
  id: '1',
  name: 'Esther Gabrielle de Oliveira de Souza',
  title: 'QA Tester Júnior',
  description: 'Especialista em testes de software e automação',
  email: 'esthergabriellesouza@gmail.com',
  phone: '(19) 98926-1419',
  location: 'Santa Bárbara d\'Oeste, SP - Brasil',
  profileImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'
};