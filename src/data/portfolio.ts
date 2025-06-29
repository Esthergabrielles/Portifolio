import { Project, Certificate, Skill } from '../types';

export const projects: Project[] = [
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

export const certificates: Certificate[] = [
  {
    id: '3',
    name: 'CURSO SUPERIOR DE TECNOLOGIA EM GESTÃO COMERCIAL',
    issuer: 'Estácio',
    date: '2023',
    image: 'https://media.licdn.com/dms/image/v2/D4D2DAQF8bLpce7587w/profile-treasury-document-cover-images_480/B4DZe32cusH4A4-/0/1751136194549?e=1751742000&v=beta&t=flR49sD5OZCLM3DiBEOwQEE9B0foXkOG-8fUyn1t30M',
    category: 'Higher Education',
    description: 'Diploma de curso superior em gestão comercial e estratégias de negócios.',
    skills: ['Gestão Comercial', 'Estratégias de Negócio', 'Liderança', 'Análise de Mercado']
  },
  {
    id: '4',
    name: 'MOBILE TESTING',
    issuer: 'Mate Academy',
    date: '2024',
    image: 'https://media.licdn.com/dms/image/v2/D4D2DAQE1EOxbdgl4GA/profile-treasury-document-cover-images_480/B4DZe32TmLHkBE-/0/1751136157019?e=1751742000&v=beta&t=v0CQ3LIWz88KE8dszedRB1dKRY3gMGPkETYm-AKoswA',
    category: 'QA',
    description: 'Certificação em testes de aplicações móveis, cobrindo metodologias e ferramentas específicas.',
    skills: ['Mobile Testing', 'Appium', 'Device Testing', 'UI/UX Testing']
  },
  {
    id: '5',
    name: 'GENAI ESSENTIALS',
    issuer: 'Mate Academy',
    date: '2024',
    image: 'https://media.licdn.com/dms/image/v2/D4D2DAQGyIaT_QCzpWQ/profile-treasury-document-cover-images_480/B4DZe315TEHAAw-/0/1751136049209?e=1751742000&v=beta&t=wqUg6ERHWfYlbfWQBtN9Y2m6ioz0w26SSMUd7rUcj0I',
    category: 'AI',
    description: 'Fundamentos de Inteligência Artificial Generativa e suas aplicações práticas.',
    skills: ['Inteligência Artificial', 'Machine Learning', 'GenAI', 'Automação Inteligente']
  },
  {
    id: '6',
    name: 'COMUNICAÇÃO EM NEGÓCIOS E MÍDIAS SOCIAIS',
    issuer: 'Mate Academy',
    date: '2024',
    image: 'https://media.licdn.com/dms/image/v2/D4D2DAQGeyTxppomi2Q/profile-treasury-document-cover-images_480/B4DZaEdfrKGcAw-/0/1745979048272?e=1751742000&v=beta&t=VwOMxtBmeI916CwPv9KZLTf0XFfllljb9rRF75UTTBg',
    category: 'Business',
    description: 'Certificação em comunicação empresarial e estratégias de mídias sociais para negócios.',
    skills: ['Comunicação Empresarial', 'Marketing Digital', 'Mídias Sociais', 'Estratégias de Conteúdo']
  },
  {
    id: '7',
    name: 'COURSE FUNDAMENTALS',
    issuer: 'Mate Academy',
    date: '2024',
    image: 'https://media.licdn.com/dms/image/v2/D4D2DAQEi7HkUhgIvcQ/profile-treasury-document-cover-images_480/B4DZaEelAPG8Aw-/0/1745979331461?e=1751742000&v=beta&t=Tah2hBhIu7o7JzEOwOF4My2EJQzqAm-avRwOaKU-DtU',
    category: 'Foundation',
    description: 'Fundamentos essenciais para desenvolvimento de carreira em tecnologia.',
    skills: ['Fundamentos de TI', 'Metodologias', 'Planejamento de Carreira', 'Soft Skills']
  },
  {
    id: '9',
    name: 'GESTÃO DE PROJETOS DE SUSTENTABILIDADE',
    issuer: 'Mate Academy',
    date: '2024',
    image: 'https://media.licdn.com/dms/image/v2/D4D2DAQE8MHpbIlhPHw/profile-treasury-document-images_800/B4DZaEdYugG0Ak-/1/1745979020047?e=1752105600&v=beta&t=aTezXDtJk4WcsnN5RAT58lAwMk-EtSrONU-LQKmlo_4',
    category: 'Sustainability',
    description: 'Certificação em gestão de projetos com foco em sustentabilidade ambiental.',
    skills: ['Gestão de Projetos', 'Sustentabilidade', 'ESG', 'Responsabilidade Social']
  },
  {
    id: '10',
    name: 'GIT AND TERMINAL — PRACTICE',
    issuer: 'Mate Academy',
    date: '2024',
    image: 'https://media.licdn.com/dms/image/v2/D4D2DAQFhsJ6tCuUKgw/profile-treasury-document-cover-images_480/B4DZaEd4VPH4Aw-/0/1745979148564?e=1751742000&v=beta&t=jPDj1ps0UKDyBQAOaRrBjtNUqUdUNrqXstaX7tHWG3g',
    category: 'Development',
    description: 'Certificação prática em controle de versão Git e uso de terminal.',
    skills: ['Git', 'Terminal', 'Controle de Versão', 'Command Line']
  },
  {
    id: '10b',
    name: 'GIT AND TERMINAL - Theory',
    issuer: 'Mate Academy',
    date: '2024',
    image: 'https://media.licdn.com/dms/image/v2/D4D2DAQGQQSwF09GY8A/profile-treasury-document-cover-images_480/B4DZaEdvEzGsAw-/0/1745979110663?e=1751742000&v=beta&t=hC-NWqmHaxrHKl8SzyLv-oxBW9qlZ81ClhkQfpAt0II',
    category: 'Development',
    description: 'Fundamentos teóricos de controle de versão Git e uso de terminal.',
    skills: ['Git Theory', 'Terminal Concepts', 'Version Control Theory', 'Command Line Fundamentals']
  },
  {
    id: '11',
    name: 'HOW THE WEB WORKS',
    issuer: 'Mate Academy',
    date: '2024',
    image: 'https://media.licdn.com/dms/image/v2/D4D2DAQG3NJsyFNMfGg/profile-treasury-document-cover-images_480/B4DZe8nyXWGkAw-/0/1751216236982?e=1751821200&v=beta&t=vziwaC5gq9U0BZNFEDePOpYCYTPNaw5r9iNQhjWaZmc',
    category: 'Web Development',
    description: 'Fundamentos sobre como a web funciona, protocolos e arquiteturas.',
    skills: ['HTTP/HTTPS', 'DNS', 'Arquitetura Web', 'Protocolos de Rede']
  },
  {
    id: '12',
    name: 'HTML + CSS BASICS',
    issuer: 'Mate Academy',
    date: '2024',
    image: 'https://media.licdn.com/dms/image/v2/D4D2DAQEfTNzWgYCffg/profile-treasury-document-cover-images_480/B4DZaSQByDHQAw-/0/1746210398224?e=1751742000&v=beta&t=X7Xjs1Wp8gUX44xiIh6TomfHg6rtqM53lBp6wZ6Oi18',
    category: 'Web Development',
    description: 'Fundamentos de HTML e CSS para desenvolvimento web.',
    skills: ['HTML5', 'CSS3', 'Responsive Design', 'Web Standards']
  },
  {
    id: '13',
    name: 'JAVASCRIPT BASICS EXTENDED',
    issuer: 'Mate Academy',
    date: '2024',
    image: 'https://media.licdn.com/dms/image/v2/D4D2DAQEgAYVfzfW0cA/profile-treasury-document-cover-images_480/B4DZadQp5EGwAw-/0/1746395111922?e=1751742000&v=beta&t=q3ZKeE_ZhRorYfvBvbF3NUQMGDYS2gcKPQdsm6AZmF8',
    category: 'Programming',
    description: 'Conceitos avançados de JavaScript para desenvolvimento web moderno.',
    skills: ['JavaScript ES6+', 'DOM Manipulation', 'Async/Await', 'Modern JS']
  },
  {
    id: '14',
    name: 'JAVASCRIPT BASICS',
    issuer: 'Mate Academy',
    date: '2024',
    image: 'https://media.licdn.com/dms/image/v2/D4D2DAQGPAjIOv7EA8g/profile-treasury-document-cover-images_480/B4DZaEc6bxG8A0-/0/1745978895074?e=1751742000&v=beta&t=E35klWdhbZoY2CDRVygG6K7aPrDmWsqyYaXFDhqOXX8',
    category: 'Programming',
    description: 'Fundamentos da linguagem JavaScript para iniciantes.',
    skills: ['JavaScript', 'Variáveis', 'Funções', 'Estruturas de Controle']
  },
  {
    id: '15',
    name: 'QA ETHICS',
    issuer: 'Mate Academy',
    date: '2024',
    image: 'https://media.licdn.com/dms/image/v2/D4D2DAQEeutMYJKN3rQ/profile-treasury-document-cover-images_480/B4DZb59Q9mHEA4-/0/1747950310333?e=1751742000&v=beta&t=OpFvtNiAdp4ivgBO8Ku4gF72uSew3eBBEzUU3YcN2Yw',
    category: 'QA',
    description: 'Ética profissional e responsabilidades em Quality Assurance.',
    skills: ['Ética Profissional', 'Responsabilidade', 'Confidencialidade', 'Integridade']
  },
  {
    id: '16',
    name: 'QA THEORY',
    issuer: 'Mate Academy',
    date: '2024',
    image: 'https://media.licdn.com/dms/image/v2/D4D2DAQFEFp5kZciIcg/profile-treasury-document-cover-images_480/B4DZaI5dTgGgA0-/0/1746053486694?e=1751821200&v=beta&t=15pXGhChW8Gq5t83MvXawPohigBSYc_3xrRzFBpchME',
    category: 'QA',
    description: 'Teoria fundamental de Quality Assurance e metodologias de teste.',
    skills: ['Teoria de QA', 'Metodologias de Teste', 'Ciclo de Vida', 'Documentação']
  },
  {
    id: '17',
    name: 'SQL BASICS',
    issuer: 'Mate Academy',
    date: '2024',
    image: 'https://media.licdn.com/dms/image/v2/D4D2DAQFM5zfA_DEZcQ/profile-treasury-document-cover-images_480/B4DZaEdLBrG0Aw-/0/1745978962970?e=1751742000&v=beta&t=Tlkx2zF9dzCdQ7OZhOALicFFkDQKPCzTAzHpFl3w7iI',
    category: 'Database',
    description: 'Fundamentos de SQL para manipulação e consulta de bancos de dados.',
    skills: ['SQL', 'Consultas', 'Joins', 'Database Design']
  },
  {
    id: '18',
    name: 'TESTING WEB APPLICATIONS',
    issuer: 'Mate Academy',
    date: '2024',
    image: 'https://media.licdn.com/dms/image/v2/D4D2DAQEOT5f5Oe8Jeg/profile-treasury-document-cover-images_480/B4DZayYxRYGwAw-/0/1746749560887?e=1751742000&v=beta&t=Pkdm83QAhOiW5I0dgSJQhL0Z_4cDj_kybq5Pw3mvqbI',
    category: 'QA',
    description: 'Técnicas específicas para teste de aplicações web modernas.',
    skills: ['Web Testing', 'Cross-browser Testing', 'UI Testing', 'Functional Testing']
  },
  {
    id: '19',
    name: 'WORKING WITH INFRASTRUCTURE',
    issuer: 'Mate Academy',
    date: '2024',
    image: 'https://media.licdn.com/dms/image/v2/D4D2DAQFrPyKART8jPA/profile-treasury-document-images_800/B4DZdwqauSGsAo-/1/1749941858066?e=1752105600&v=beta&t=1ByL-ycMXFNbP-r8V8LLS6QIYiiRE_09L9sMQ6qRTcs',
    category: 'Infrastructure',
    description: 'Conhecimentos sobre infraestrutura e DevOps para QA.',
    skills: ['DevOps', 'CI/CD', 'Docker', 'Cloud Infrastructure']
  }
];

// Logos oficiais de alta qualidade - URLs confiáveis e padronizados
export const brandLogos: { [key: string]: string } = {
  // Instituições Educacionais
  'Estácio': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Logo_Estacio.svg/200px-Logo_Estacio.svg.png',
  'Mate Academy': 'https://mate.academy/static/images/logo.svg',
  
  // Ferramentas QA e Gestão
  'Jira': 'https://cdn.worldvectorlogo.com/logos/jira-1.svg',
  'TestRail': 'https://www.gurock.com/images/brand/testrail-icon-color.svg',
  
  // Controle de Versão
  'Git': 'https://git-scm.com/images/logos/downloads/Git-Icon-1788C.svg',
  'GitHub': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
  
  // Testes de API
  'Postman': 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg',
  
  // Banco de Dados
  'DBeaver': 'https://dbeaver.io/wp-content/uploads/2015/09/beaver-head.png',
  'SQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  
  // Navegadores
  'Chrome': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg',
  
  // Linguagens
  'HTML': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  'CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  
  // Sistema Operacional
  'Windows': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg',
  
  // Metodologias
  'Scrum': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/trello/trello-plain.svg',
  
  // Automação
  'Selenium': 'https://selenium.dev/images/selenium_logo_square_green.png',
  'Appium': 'https://appium.io/docs/en/2.1/assets/images/appium-logo-horiz.png',
  
  // IDEs
  'Android Studio': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg',
  
  // Terminal
  'Terminal': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg'
};

// Mapeamento de logos das ferramentas com URLs padronizados
export const toolLogos: { [key: string]: string } = {
  // Ferramentas de QA e Gestão
  'Jira': 'https://cdn.worldvectorlogo.com/logos/jira-1.svg',
  'TestRail': 'https://www.gurock.com/images/brand/testrail-icon-color.svg',
  
  // Controle de Versão e Terminal
  'Git / GitHub': 'https://git-scm.com/images/logos/downloads/Git-Icon-1788C.svg',
  'Terminal Unix / Bash': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg',
  
  // Testes de API e Banco de Dados
  'Postman': 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg',
  'DBeaver': 'https://dbeaver.io/wp-content/uploads/2015/09/beaver-head.png',
  'SQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  
  // Desenvolvimento Web
  'Chrome DevTools': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg',
  'HTML / CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  
  // Dados e Formatos
  'XML / JSON': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/json/json-original.svg',
  
  // Sistema Operacional
  'Windows': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg',
  
  // Metodologias
  'Scrum / Kanban': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/trello/trello-plain.svg'
};

export const technicalSkills: Skill[] = [
  // Ferramentas de QA e Gestão
  { name: 'Jira', level: 90, icon: 'Bot' },
  { name: 'TestRail', level: 85, icon: 'Search' },
  
  // Controle de Versão e Terminal
  { name: 'Git / GitHub', level: 70, icon: 'Globe' },
  { name: 'Terminal Unix / Bash', level: 60, icon: 'Zap' },
  
  // Testes de API e Banco de Dados
  { name: 'Postman', level: 80, icon: 'Shield' },
  { name: 'DBeaver', level: 75, icon: 'Bot' },
  { name: 'SQL', level: 75, icon: 'Search' },
  
  // Desenvolvimento Web
  { name: 'Chrome DevTools', level: 80, icon: 'Eye' },
  { name: 'HTML / CSS', level: 70, icon: 'Globe' },
  { name: 'JavaScript', level: 50, icon: 'Zap' },
  
  // Dados e Formatos
  { name: 'XML / JSON', level: 75, icon: 'Shield' },
  
  // Sistema Operacional
  { name: 'Windows', level: 95, icon: 'Smartphone' },
  
  // Metodologias
  { name: 'Scrum / Kanban', level: 85, icon: 'Users' }
];

// Nova seção: Documentações de QA
export const qaDocumentations: Skill[] = [
  { name: 'Plano de Teste (Test Plan)', level: 85, icon: 'FileText' },
  { name: 'Casos de Teste (Test Cases)', level: 90, icon: 'Search' },
  { name: 'Procedimento de Teste', level: 80, icon: 'Globe' },
  { name: 'Matriz de Rastreabilidade (RTM)', level: 65, icon: 'Shield' },
  { name: 'Relatório de Execução de Teste', level: 80, icon: 'Eye' },
  { name: 'Relatório de Defeitos (Bug Report)', level: 95, icon: 'Zap' }
];

export const softSkills: Skill[] = [
  { name: 'Atenção aos Detalhes', level: 90, icon: 'Eye' },
  { name: 'Comunicação', level: 85, icon: 'MessageCircle' },
  { name: 'Organização', level: 88, icon: 'Users' },
  { name: 'Pensamento Analítico', level: 80, icon: 'Brain' },
  { name: 'Vontade de Aprender', level: 95, icon: 'Lightbulb' },
  { name: 'Trabalho em Equipe', level: 85, icon: 'Clock' }
];